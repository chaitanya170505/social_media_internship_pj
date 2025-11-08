import React, { useEffect, useState } from "react";
import "../styles/Alerts.css";

// AlertDashboard
// - Uses browser geolocation if allowed, otherwise falls back to default location (Eluru)
// - Fetches: Open-Meteo current weather + hourly precip, Open-Meteo Flood endpoint, and USGS recent earthquakes
// - No API keys required for the used endpoints

export default function Alerts() {
  const [pos, setPos] = useState({ latitude: 16.7107, longitude: 81.0952 }); // Default: Eluru
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [flood, setFlood] = useState(null);
  const [quakes, setQuakes] = useState([]);
  const [error, setError] = useState(null);

  // helper: get ISO date for N days ago
  const isoDaysAgo = (days) => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - days);
    return d.toISOString().split(".")[0] + "Z";
  };

  // get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser. Using default: Eluru.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPos({ latitude, longitude });
      },
      () => {
        setError("Location permission denied. Using default: Eluru.");
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, []);

  // fetch data when pos changes
  useEffect(() => {
    if (!pos) return;

    const controller = new AbortController();

    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1) Open-Meteo current weather + hourly precipitation
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${pos.latitude}&longitude=${pos.longitude}&current_weather=true&hourly=precipitation,temperature_2m&timezone=auto`;
        const wRes = await fetch(weatherUrl, { signal: controller.signal });
        const wJson = await wRes.json();
        setWeather(wJson);

        // 2) Open-Meteo flood endpoint (river discharge / flood guidance)
        const floodUrl = `https://api.open-meteo.com/v1/flood?latitude=${pos.latitude}&longitude=${pos.longitude}`;
        const fRes = await fetch(floodUrl, { signal: controller.signal });
        const fJson = await fRes.json();
        setFlood(fJson);

        // 3) USGS Earthquake API: past 7 days within 500km
        const starttime = isoDaysAgo(7);
        const usgsUrl = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${encodeURIComponent(starttime)}&latitude=${pos.latitude}&longitude=${pos.longitude}&maxradiuskm=500`;
        const qRes = await fetch(usgsUrl, { signal: controller.signal });
        const qJson = await qRes.json();
        setQuakes(qJson.features || []);

      } catch (err) {
        if (err.name !== 'AbortError') setError('Failed to fetch alert data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();

    return () => controller.abort();
  }, [pos]);

  const refresh = () => {
    if (pos) {
      // trigger re-fetch by setting pos again
      setPos({ ...pos });
    }
  };

  return (
    <div className="AlertDashboard">
  <div className="container">
    <header>
      <h1>Alert Dashboard</h1>
      <button onClick={refresh}>Refresh</button>
    </header>

    {error && <div className="warning">{error}</div>}

    {loading && <div className="card">Loading alert data...</div>}

    {weather && (
      <section className="card">
        <h2>Local Weather</h2>
        <div className="grid">
          <div>
            <p className="text-sm">Current</p>
            <p className="text-lg">{weather.current_weather?.temperature}°C • Wind {weather.current_weather?.windspeed} km/h</p>
          </div>
          <div>
            <p className="text-sm">Next hours precipitation (mm)</p>
            <p className="text-lg">{weather.hourly?.precipitation?.slice(0,6).join(', ') || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm">Timezone</p>
            <p className="text-lg">{weather.timezone}</p>
          </div>
        </div>
      </section>
    )}

    {flood && (
      <section className="card">
        <h2>Flood / River Info</h2>
        {flood.error ? (
          <div className="text-sm">No flood data available for this location.</div>
        ) : (
          <pre className="text-sm">{JSON.stringify(flood, null, 2)}</pre>
        )}
      </section>
    )}

    <section className="card">
      <h2>Recent Earthquakes (past 7 days, within 500 km)</h2>
      {quakes.length === 0 ? (
        <p className="text-sm">No recent earthquakes in the search radius.</p>
      ) : (
        <ul>
          {quakes.map(q => (
            <li key={q.id}>
              <div>
                <div>M {q.properties.mag} — {q.properties.place}</div>
                <div className="text-sm">{new Date(q.properties.time).toLocaleString()}</div>
              </div>
              <a href={q.properties.url} target="_blank" rel="noreferrer">Details</a>
            </li>
          ))}
        </ul>
      )}
    </section>

    <footer>
      Data sources: Open-Meteo (weather & flood), USGS Earthquake feeds. No API keys required.
    </footer>
  </div>
</div>

  );
}

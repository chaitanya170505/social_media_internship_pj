import { useState, useContext } from "react";
import { login as loginService, signup as signupService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import phoenixLogo from "../assets/phoenix.png";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginService({ email: formData.email, password: formData.password });
        login(res.data.user, res.data.token);
        navigate("/");
      } else {
        await signupService(formData);
        setIsLogin(true); // switch to login after signup
      }
    } catch (err) {
      alert(err.response?.data?.error || (isLogin ? "Login failed" : "Signup failed"));
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.brandSection}>
          <img src={phoenixLogo}  alt="Company Logo" style={styles.logo} /> 
          <h1 style={styles.brandTitle}>Welcome to VigilNet</h1>
          <p style={styles.brandSubtitle}>Your community's pulse, in one place.</p>
        </div>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>{isLogin ? "Login to your account" : "Create an account"}</h2>
            <p style={styles.formSubtitle}>
              {isLogin ? "Enter your credentials to access your dashboard." : "Join our community to start sharing."}
            </p>

            {!isLogin && (
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.button}>
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p style={styles.toggleText}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                style={styles.toggleLink}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #5277bbff, #2a5298)", // blue gradient
    padding: "20px",
    boxSizing: "border-box",
  },
  contentWrapper: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    overflow: "hidden",
    width: "800px",
    maxWidth: "90%",
  },
  brandSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e3c72",
    color: "#fff",
    padding: "40px",
    textAlign: "center",
  },
  logo: {
    width: "200px",
    marginBottom: "20px",
    borderRadius: "50%",
  },
  brandTitle: {
    fontSize: "2.5rem",
    margin: "0 0 10px 0",
    fontWeight: "600",
  },
  brandSubtitle: {
    fontSize: "1rem",
    margin: 0,
    opacity: 0.8,
  },
  formContainer: {
    flex: 1,
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
    color: "#1e3c72",
  },
  formSubtitle: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1e3c72",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
  toggleText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
  },
  toggleLink: {
    color: "#2a5298",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default AuthForm;
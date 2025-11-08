import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Privacy Policy</h1>

      <div style={{ marginTop: '20px' }}>
        <p>
          Welcome to **[Platform Name]**, a platform designed to facilitate the sharing of real-time local updates during emergencies, disasters, and community events in India. Your privacy is of paramount importance to us. This Privacy Policy outlines how we collect, use, disclose, and protect your digital personal data in accordance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and other applicable Indian laws.
        </p>
        <p>
          By accessing or using our platform, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
        </p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>1. Data We Collect</h2>
        <p>To provide a safe and effective service, we collect various types of personal data. The specific data collected will depend on how you interact with our platform.</p>
        <ul>
          <li><strong>Information You Provide to Us:</strong> Account Information, Profile Information, User-Generated Content, Communications.</li>
          <li><strong>Information We Collect Automatically:</strong> Location Data, Device and Usage Information.</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>2. How We Use Your Data</h2>
        <p>We use the collected personal data for the following lawful and specified purposes:</p>
        <ul>
          <li>To Provide and Improve the Service</li>
          <li>To Localize Content</li>
          <li>For Safety and Security</li>
          <li>To Communicate with You</li>
          <li>To Analyze Usage</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>3. Disclosure of Your Data</h2>
        <p>We will not sell or rent your personal data to third parties. We may, however, share your information in the following circumstances:</p>
        <ul>
          <li>With Your Consent</li>
          <li>For Public Safety</li>
          <li>With Service Providers</li>
          <li>For Legal Compliance</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>4. Your Rights and Choices</h2>
        <p>In compliance with the DPDP Act, you have the following rights regarding your personal data:</p>
        <ul>
          <li>Right to Access</li>
          <li>Right to Correction and Erasure</li>
          <li>Right to Grievance Redressal</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>5. Data Security</h2>
        <p>We have implemented reasonable technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or any wireless network can be guaranteed to be 100% secure.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>6. Data Retention</h2>
        <p>We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Upon withdrawal of your consent or termination of your account, we will erase your personal data in a timely and secure manner.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>7. Changes to this Policy</h2>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on this page or through other effective communication channels. Your continued use of the platform after the changes signifies your acceptance of the new policy.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '1.5em' }}>8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Grievance Officer at:</p>
        <p>
          <strong>[Name of Grievance Officer]</strong><br />
          <strong>[Email Address]</strong><br />
          <strong>[Physical Address (Optional)]</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
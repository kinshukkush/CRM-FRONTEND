import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    // Use environment variable for backend URL, fallback to localhost for development
    const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.spinner}></div>
        <h2 style={styles.text}>Redirecting to Google login...</h2>
        <p style={styles.subText}>Please wait while we connect you securely.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #0f0f15 20%, #1a1a2e 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', sans-serif",
  },
  card: {
    background: 'rgba(26,32,50,0.97)',
    borderRadius: '18px',
    padding: '2.5rem 3rem',
    textAlign: 'center',
    boxShadow: '0 12px 48px #60A5FA22',
    border: '1.5px solid #60A5FA33',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '6px solid rgba(255,255,255,0.13)',
    borderTop: '6px solid #60A5FA',
    borderRadius: '50%',
    marginBottom: '20px',
    animation: 'spin 1s linear infinite'
  },
  text: {
    color: '#60A5FA',
    fontWeight: '700',
    fontSize: '1.5rem',
    marginBottom: '8px'
  },
  subText: {
    color: '#b0bcea',
    fontSize: '1rem'
  }
};

// CSS animation for spinner
const animationStyles = `
@keyframes spin { 0% { transform: rotate(0deg);} 100% {transform:rotate(360deg);} }
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

export default LoginPage;

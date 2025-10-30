
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../utils/auth';

const Home = () => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const authenticate = async () => {
      try {
        console.log('Attempting to check authentication...');
        const userInfo = await checkAuth();
        
        if (!userInfo) {
          console.log('No user info, redirecting to login');
          setError('Authentication failed. Redirecting to login...');
          setTimeout(() => {
            window.location.href = `${backendUrl}/oauth2/authorization/google`;
          }, 2000);
        } else {
          console.log('User authenticated successfully:', userInfo);
          setUser(userInfo);
          setChecking(false);
        }
      } catch (err) {
        console.error('Error during authentication check:', err);
        setError('Failed to verify authentication. Please try again.');
        setChecking(false);
      }
    };
    
    authenticate();
  }, [backendUrl]);

  const logout = () => {
    window.location.href = `${backendUrl}/logout`;
  };

  if (checking || error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f0f15 0%, #1a1a2e 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
            background: 'rgba(26, 32, 50, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(96, 165, 250, 0.2)',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid rgba(255,255,255,0.1)',
              borderTop: '5px solid #60A5FA',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
          <p
            style={{
              color: error ? '#f87171' : '#e0e0e0',
              fontSize: '1.2rem',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            {error || 'Checking authentication...'}
          </p>
          {error && (
            <button
              onClick={() => window.location.href = `${backendUrl}/oauth2/authorization/google`}
              style={{
                padding: '12px 24px',
                background: '#60A5FA',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Try Login Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #0f0f15 0%, #1a1a2e 100%)',
        }}
      >
        <p style={{ color: '#e0e0e0', fontSize: '1.2rem' }}>No user data available</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>🚀</div>
            <span style={styles.brandText}>CampaignPro</span>
          </div>
          <div style={styles.navRight}>
            <div style={styles.userBadge}>
              <div style={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</div>
              <span style={styles.userNameText}>{user.name}</span>
            </div>
            <button onClick={logout} style={styles.logoutBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7Z" fill="#FF6B6B"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>✨ Smart Campaign Management</div>
          <h1 style={styles.heroTitle}>
            Drive Engagement with
            <br />
            <span style={styles.heroHighlight}>Data-Driven Campaigns</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Build, launch, and optimize marketing campaigns with intelligent audience targeting and real-time analytics
          </p>
          <div style={styles.heroCTA}>
            <button style={styles.primaryCTA} onClick={() => navigate('/campaigns/new')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: '8px'}}>
                <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
              </svg>
              Launch Campaign
            </button>
            <button style={styles.secondaryCTA} onClick={() => navigate('/campaigns/history')}>
              View Analytics
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginLeft: '8px'}}>
                <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#60A5FA"/>
              </svg>
            </button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.floatingCard1}>
            <div style={styles.miniStat}>
              <div style={styles.miniStatIcon}>📊</div>
              <div>
                <div style={styles.miniStatValue}>+47%</div>
                <div style={styles.miniStatLabel}>Engagement</div>
              </div>
            </div>
          </div>
          <div style={styles.floatingCard2}>
            <div style={styles.miniStat}>
              <div style={styles.miniStatIcon}>🎯</div>
              <div>
                <div style={styles.miniStatValue}>15.2K</div>
                <div style={styles.miniStatLabel}>Reached</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Everything You Need</h2>
          <p style={styles.sectionSubtitle}>Powerful tools to maximize your campaign performance</p>
        </div>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard} onClick={() => navigate('/campaigns/new')}>
            <div style={styles.featureIconBox} className="feature-blue">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18ZM8 13.01L10.01 15L15 10L13.99 8.99L10.01 12.97L9 11.96L8 13.01Z" fill="#60A5FA"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Campaign Builder</h3>
            <p style={styles.featureText}>Create sophisticated campaigns with advanced audience segmentation and custom rules</p>
            <div style={styles.featureArrow}>→</div>
          </div>

          <div style={styles.featureCard} onClick={() => navigate('/campaigns/history')}>
            <div style={styles.featureIconBox} className="feature-green">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#34D399"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>Performance Insights</h3>
            <p style={styles.featureText}>Track campaign metrics, analyze delivery rates, and measure ROI with detailed reports</p>
            <div style={styles.featureArrow}>→</div>
          </div>

          <div style={styles.featureCard} onClick={() => navigate('/ai/messages')}>
            <div style={styles.featureIconBox} className="feature-purple">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#A78BFA"/>
              </svg>
            </div>
            <h3 style={styles.featureTitle}>AI Messaging</h3>
            <p style={styles.featureText}>Generate compelling campaign messages powered by artificial intelligence</p>
            <div style={styles.featureArrow}>→</div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={styles.statIconCircle} className="stat-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#60A5FA"/>
              </svg>
            </div>
            <div style={styles.statNumber}>38</div>
            <div style={styles.statLabel}>Total Campaigns</div>
            <div style={styles.statTrend}>↑ 12% this month</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statIconCircle} className="stat-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#34D399"/>
              </svg>
            </div>
            <div style={styles.statNumber}>52.3K</div>
            <div style={styles.statLabel}>Audience Reached</div>
            <div style={styles.statTrend}>↑ 28% growth</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statIconCircle} className="stat-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="#A78BFA"/>
              </svg>
            </div>
            <div style={styles.statNumber}>94.7%</div>
            <div style={styles.statLabel}>Success Rate</div>
            <div style={styles.statTrend}>↑ +2.3% improved</div>
          </div>

          <div style={styles.statBox}>
            <div style={styles.statIconCircle} className="stat-orange">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#F59E0B"/>
              </svg>
            </div>
            <div style={styles.statNumber}>4.8</div>
            <div style={styles.statLabel}>Avg. Rating</div>
            <div style={styles.statTrend}>Based on feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  navbar: {
    background: 'rgba(15, 20, 35, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  brandIcon: {
    fontSize: '2rem',
  },
  brandText: {
    fontSize: '1.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(96, 165, 250, 0.1)',
    padding: '8px 16px',
    borderRadius: '30px',
    border: '1px solid rgba(96, 165, 250, 0.2)',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #60A5FA, #34D399)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0a0e27',
  },
  userNameText: {
    color: '#e0e0e0',
    fontWeight: '500',
  },
  logoutBtn: {
    background: 'rgba(255, 107, 107, 0.1)',
    border: '1px solid rgba(255, 107, 107, 0.2)',
    color: '#FF6B6B',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  hero: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '5rem 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '600px',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(167, 139, 250, 0.15)',
    color: '#C4B5FD',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '2rem',
    border: '1px solid rgba(167, 139, 250, 0.3)',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#a0a0c0',
    lineHeight: '1.7',
    marginBottom: '2.5rem',
  },
  heroCTA: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  primaryCTA: {
    background: 'linear-gradient(135deg, #60A5FA 0%, #5B96E8 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(96, 165, 250, 0.3)',
  },
  secondaryCTA: {
    background: 'transparent',
    color: '#60A5FA',
    border: '2px solid rgba(96, 165, 250, 0.3)',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  heroImage: {
    position: 'relative',
    height: '400px',
  },
  floatingCard1: {
    position: 'absolute',
    top: '20%',
    right: '10%',
    background: 'rgba(26, 32, 50, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(96, 165, 250, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    animation: 'float 3s ease-in-out infinite',
  },
  floatingCard2: {
    position: 'absolute',
    bottom: '15%',
    left: '5%',
    background: 'rgba(26, 32, 50, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1px solid rgba(52, 211, 153, 0.2)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    animation: 'float 3s ease-in-out infinite 1.5s',
  },
  miniStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  miniStatIcon: {
    fontSize: '2.5rem',
  },
  miniStatValue: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  miniStatLabel: {
    fontSize: '0.9rem',
    color: '#a0a0c0',
  },
  featuresSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '5rem 2rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    fontSize: '1.2rem',
    color: '#a0a0c0',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    background: 'rgba(26, 32, 50, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '2.5rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
  },
  featureIconBox: {
    width: '70px',
    height: '70px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '1rem',
  },
  featureText: {
    color: '#a0a0c0',
    lineHeight: '1.7',
    marginBottom: '1.5rem',
  },
  featureArrow: {
    fontSize: '1.5rem',
    color: '#60A5FA',
    opacity: 0.6,
    transition: 'all 0.3s ease',
  },
  statsSection: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '3rem 2rem 5rem',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  statBox: {
    background: 'rgba(26, 32, 50, 0.6)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  statIconCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#a0a0c0',
    marginBottom: '0.5rem',
  },
  statTrend: {
    fontSize: '0.85rem',
    color: '#34D399',
    fontWeight: '500',
  },
};

const animationStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @media (max-width: 768px) {
    .hero {
      grid-template-columns: 1fr !important;
      text-align: center;
    }
    .heroTitle {
      font-size: 2.5rem !important;
    }
    .heroImage {
      display: none !important;
    }
  }

  .logoutBtn:hover {
    background: rgba(255, 107, 107, 0.2) !important;
    transform: translateY(-2px);
  }

  .primaryCTA:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(96, 165, 250, 0.4) !important;
  }

  .secondaryCTA:hover {
    background: rgba(96, 165, 250, 0.1) !important;
    transform: translateY(-2px);
  }

  .featureCard:hover {
    transform: translateY(-8px);
    border-color: rgba(96, 165, 250, 0.3) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .featureCard:hover .featureArrow {
    opacity: 1 !important;
    transform: translateX(5px);
  }

  .feature-blue {
    background: rgba(96, 165, 250, 0.15) !important;
  }

  .feature-green {
    background: rgba(52, 211, 153, 0.15) !important;
  }

  .feature-purple {
    background: rgba(167, 139, 250, 0.15) !important;
  }

  .stat-blue {
    background: rgba(96, 165, 250, 0.15) !important;
  }

  .stat-green {
    background: rgba(52, 211, 153, 0.15) !important;
  }

  .stat-purple {
    background: rgba(167, 139, 250, 0.15) !important;
  }

  .stat-orange {
    background: rgba(245, 158, 11, 0.15) !important;
  }

  .statBox:hover {
    transform: translateY(-5px);
    border-color: rgba(96, 165, 250, 0.2) !important;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CampaignHistory = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const navigate = useNavigate(); 
//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await axios.get('/api/campaigns');
//         const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         const campaignsWithStats = await Promise.all(
//           sorted.map(async (c) => {
//             const statsRes = await axios.get(`/api/campaigns/stats/${c.id}`);
//             return {
//               ...c,
//               sent: statsRes.data.sent,
//               failed: statsRes.data.failed
//             };
//           })
//         );

//         setCampaigns(campaignsWithStats);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };

//     fetchCampaigns();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <h2 style={styles.heading}>Campaign History</h2>
//           <div style={styles.icon}>📋</div>
//           <button 
//           onClick={() => navigate('/')} 
//           style={styles.homeButton}
//         >
//           ← Back to Home
//         </button>
//         </div>

//         {campaigns.length === 0 ? (
//           <p style={styles.noData}>No campaigns found</p>
//         ) : (
//           <div style={styles.tableContainer}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   <th style={styles.th}>Name</th>
//                   <th style={styles.th}>Created At</th>
//                   <th style={styles.th}>Audience Size</th>
//                   <th style={styles.th}>Sent</th>
//                   <th style={styles.th}>Failed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {campaigns.map((c) => (
//                   <tr key={c.id} style={styles.row}>
//                     <td style={styles.td}>{c.name}</td>
//                     <td style={styles.td}>{new Date(c.createdAt).toLocaleString()}</td>
//                     <td style={{...styles.td, ...styles.center}}>{c.audienceSize}</td>
//                     <td style={{...styles.td, ...styles.center, ...styles.success}}>{c.sent}</td>
//                     <td style={{...styles.td, ...styles.center, ...styles.error}}>{c.failed}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
//     fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
//   },
//   topBar: {
//     background: 'rgba(15, 23, 42, 0.8)',
//     backdropFilter: 'blur(12px)',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//     padding: '1rem 2rem',
//     position: 'sticky',
//     top: 0,
//     zIndex: 100
//   },
//   topBarContent: {
//     maxWidth: '1400px',
//     margin: '0 auto',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   backBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     padding: '0.65rem 1.2rem',
//     background: 'rgba(148, 163, 184, 0.1)',
//     border: '1px solid rgba(148, 163, 184, 0.2)',
//     borderRadius: '8px',
//     color: '#cbd5e1',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     fontWeight: '500',
//     transition: 'all 0.2s'
//   },
//   headerInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem'
//   },
//   headerIcon: {
//     fontSize: '2.5rem'
//   },
//   pageTitle: {
//     color: '#f1f5f9',
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     margin: 0,
//     lineHeight: 1.2
//   },
//   pageSubtitle: {
//     color: '#94a3b8',
//     fontSize: '0.85rem',
//     margin: '0.3rem 0 0 0'
//   },
//   mainContent: {
//     maxWidth: '1400px',
//     margin: '0 auto',
//     padding: '2rem',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '2rem'
//   },
//   statsGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gap: '1.5rem'
//   },
//   statCard: {
//     background: 'rgba(30, 41, 59, 0.5)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '16px',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     padding: '1.5rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//     boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
//     transition: 'all 0.2s'
//   },
//   statIcon: {
//     width: '48px',
//     height: '48px',
//     borderRadius: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexShrink: 0
//   },
//   statContent: {
//     flex: 1
//   },
//   statValue: {
//     color: '#f1f5f9',
//     fontSize: '1.8rem',
//     fontWeight: '700',
//     lineHeight: 1
//   },
//   statLabel: {
//     color: '#94a3b8',
//     fontSize: '0.8rem',
//     marginTop: '0.3rem'
//   },
//   tableCard: {
//     background: 'rgba(30, 41, 59, 0.5)',
//     backdropFilter: 'blur(10px)',
//     borderRadius: '16px',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     overflow: 'hidden',
//     boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
//   },
//   tableContainer: {
//     overflowX: 'auto'
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse'
//   },
//   th: {
//     padding: '1.2rem 1.5rem',
//     textAlign: 'left',
//     background: 'rgba(15, 23, 42, 0.6)',
//     color: '#94a3b8',
//     fontWeight: '600',
//     fontSize: '0.85rem',
//     letterSpacing: '0.5px',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
//     textTransform: 'uppercase'
//   },
//   thContent: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   td: {
//     padding: '1.2rem 1.5rem',
//     color: '#cbd5e1',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
//     fontSize: '0.9rem'
//   },
//   row: {
//     transition: 'all 0.2s',
//     background: 'transparent'
//   },
//   campaignName: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '0.6rem',
//     fontWeight: '500',
//     color: '#f1f5f9'
//   },
//   campaignIcon: {
//     fontSize: '1.2rem'
//   },
//   dateTime: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '0.2rem'
//   },
//   date: {
//     color: '#f1f5f9',
//     fontSize: '0.9rem'
//   },
//   time: {
//     color: '#64748b',
//     fontSize: '0.8rem'
//   },
//   badge: {
//     display: 'inline-block',
//     padding: '0.4rem 0.9rem',
//     background: 'rgba(148, 163, 184, 0.15)',
//     border: '1px solid rgba(148, 163, 184, 0.3)',
//     borderRadius: '8px',
//     color: '#cbd5e1',
//     fontSize: '0.85rem',
//     fontWeight: '600'
//   },
//   successBadge: {
//     display: 'inline-block',
//     padding: '0.4rem 0.9rem',
//     background: 'rgba(52, 211, 153, 0.15)',
//     border: '1px solid rgba(52, 211, 153, 0.3)',
//     borderRadius: '8px',
//     color: '#34d399',
//     fontSize: '0.85rem',
//     fontWeight: '600'
//   },
//   errorBadge: {
//     display: 'inline-block',
//     padding: '0.4rem 0.9rem',
//     background: 'rgba(248, 113, 113, 0.15)',
//     border: '1px solid rgba(248, 113, 113, 0.3)',
//     borderRadius: '8px',
//     color: '#f87171',
//     fontSize: '0.85rem',
//     fontWeight: '600'
//   },
//   emptyState: {
//     padding: '4rem 2rem',
//     textAlign: 'center',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '1rem'
//   },
//   emptyIcon: {
//     fontSize: '4rem',
//     opacity: 0.5
//   },
//   emptyTitle: {
//     color: '#f1f5f9',
//     fontSize: '1.5rem',
//     fontWeight: '600',
//     margin: 0
//   },
//   emptyText: {
//     color: '#94a3b8',
//     fontSize: '0.95rem',
//     margin: 0,
//     maxWidth: '400px'
//   },
//   createBtn: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '0.9rem 1.8rem',
//     background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
//     border: 'none',
//     borderRadius: '10px',
//     color: 'white',
//     fontSize: '0.95rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s',
//     boxShadow: '0 4px 12px rgba(96, 165, 250, 0.3)',
//     marginTop: '0.5rem'
//   }
// };

// // Add hover styles
// const styleSheet = document.createElement('style');
// styleSheet.type = 'text/css';
// styleSheet.innerText = `
//   .backBtn:hover {
//     background: rgba(148, 163, 184, 0.2) !important;
//     border-color: rgba(148, 163, 184, 0.3) !important;
//   }
  
//   .tableRow:hover {
//     background: rgba(96, 165, 250, 0.05) !important;
//   }
  
//   .stat-blue {
//     background: rgba(96, 165, 250, 0.15);
//   }
  
//   .stat-green {
//     background: rgba(52, 211, 153, 0.15);
//   }
  
//   .stat-purple {
//     background: rgba(167, 139, 250, 0.15);
//   }
  
//   .stat-red {
//     background: rgba(248, 113, 113, 0.15);
//   }
  
//   .createBtn:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 16px rgba(96, 165, 250, 0.4) !important;
//   }
// `;
// document.head.appendChild(styleSheet);

// export default CampaignHistory;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Status color mapping for indicator dots
const statusColors = {
  active: '#34D399',
  completed: '#60A5FA',
  failed: '#F87171',
  pending: '#A78BFA'
};

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/campaigns');
        const sorted = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const campaignsWithStats = await Promise.all(
          sorted.map(async (c) => {
            const statsRes = await axios.get(`/api/campaigns/stats/${c.id}`);
            return {
              ...c,
              sent: statsRes.data.sent,
              failed: statsRes.data.failed,
              status: statsRes.data.status || 'pending',
              sentPercent: c.audienceSize ? Math.round((statsRes.data.sent / c.audienceSize) * 100) : 0
            };
          })
        );
        setCampaigns(campaignsWithStats);
      } catch (error) {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Helper for campaign type display
  const getTypeLabel = (type) => {
    if (type === 'promotional') return 'Promo';
    if (type === 'informational') return 'Info';
    if (type === 'engagement') return 'Engage';
    return 'Other';
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.heading}>Campaign History</h2>
          <div style={styles.icon}>📋</div>
          <button 
            onClick={() => navigate('/')} 
            style={styles.homeButton}
            className="smooth-btn"
          >
            ← Back to Home
          </button>
        </div>

        {loading ? (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <div style={styles.loadingText}>Loading campaigns...</div>
          </div>
        ) : campaigns.length === 0 ? (
          <p style={styles.noData}>No campaigns found</p>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Audience</th>
                  <th style={styles.th}>Sent</th>
                  <th style={styles.th}>Failed</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Sent %</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} style={styles.row} className="history-row">
                    <td style={styles.td}>
                      <span style={styles.nameWrapper}>
                        <span style={{
                          ...styles.statusDot,
                          background: statusColors[c.status] || '#A78BFA'
                        }}></span>
                        {c.name}
                      </span>
                    </td>
                    <td style={styles.td}>{new Date(c.createdAt).toLocaleString()}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.typeBadge,
                        background: c.campaignType === 'promotional' ? '#60A5FA14' :
                                    c.campaignType === 'engagement' ? '#34D39914' :
                                    c.campaignType === 'informational' ? '#A78BFA14' : '#a0a0c019',
                        color: statusColors[c.status] || '#A78BFA'
                      }}>{getTypeLabel(c.campaignType)}</span>
                    </td>
                    <td style={{...styles.td, ...styles.center}}>{c.audienceSize || 0}</td>
                    <td style={{...styles.td, ...styles.center, ...styles.success}}>
                      {c.sent}
                    </td>
                    <td style={{...styles.td, ...styles.center, ...styles.error}}>
                      {c.failed}
                    </td>
                    <td style={{...styles.td, ...styles.statusCell}}>
                      <span style={{
                        ...styles.statusLabel,
                        color: statusColors[c.status] || '#A78BFA'
                      }}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td style={{...styles.td, ...styles.center}}>
                      <span style={styles.percentBarWrap}>
                        <span 
                          style={{ 
                            ...styles.percentBar, 
                            width: `${c.sentPercent}%`, 
                            background: `linear-gradient(90deg, #60A5FA, #34D399)` 
                          }}
                        ></span>
                        <span style={styles.percentText}>{c.sentPercent}%</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Info */}
        <div style={styles.summarySection}>
          <div style={styles.summaryBox}>
            <div style={styles.summaryIcon}>💡</div>
            <div>
              <b style={{ fontSize: '1.03rem', color: '#A78BFA' }}>
                Total Campaigns: {campaigns.length}
              </b>
              <div style={{ color: '#b0bcea', fontSize: '0.97rem'}}>
                Highest Audience: {campaigns.length ? Math.max(...campaigns.map(c => c.audienceSize || 0)) : 0}
              </div>
              <div style={{ color: '#19c59b', fontSize: '0.97rem'}}>
                Best Sent %: {campaigns.length ? Math.max(...campaigns.map(c => c.sentPercent || 0)) : 0}%
              </div>
            </div>
          </div>
          <div style={styles.summaryBox}>
            <div style={styles.summaryIcon}>🏅</div>
            <div style={{ color: '#60A5FA', fontSize: '1.02rem', fontWeight: '500'}}>Keep optimizing for success!</div>
          </div>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    minHeight: '100vh',
    padding: '2.5rem',
    background: 'linear-gradient(135deg, #0f0f15 0%, #1a1a2e 100%)',
    display: 'flex', justifyContent: 'center',
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', sans-serif"
  },
  card: {
    background: '#121212',
    padding: '2.2rem 2.2rem 1.1rem',
    borderRadius: '18px',
    boxShadow: '0 14px 54px rgba(0,0,0,0.33)',
    width: '100%',
    maxWidth: '1280px',
    border: '1px solid rgba(255,255,255,0.07)'
  },
  header: {
    display: 'flex', alignItems: 'center',
    marginBottom: '2rem', borderBottom: '1.5px solid rgba(255,255,255,0.09)', paddingBottom: '1.15rem'
  },
  icon: { fontSize: '2rem', marginLeft: '14px', marginRight: '120px', opacity: 0.8 },
  heading: { color: '#e0e0e0', fontSize: '1.85rem', fontWeight: '700', margin: 0, letterSpacing: '0.55px' },
  tableContainer: {
    borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)',
    boxShadow: '0 6px 30px #60A5FA09', animation: 'fadeInSlide 0.9s'
  },
  table: { width: '100%', borderCollapse: 'collapse', background: '#1a1a1a' },
  homeButton: {
    padding: '0.63rem 1.22rem',
    backgroundColor: '#23254a3a',
    color: '#a0a0ff', border: '1px solid #3a3a6a',
    borderRadius: '7px', cursor: 'pointer',
    fontSize: '0.91rem', fontWeight: '500',
    transition: 'all 0.27s', display: 'flex',
    alignItems: 'center', gap: '0.34rem', marginLeft: 'auto'
  },
  th: {
    padding: '1.15rem 1.4rem',
    textAlign: 'left',
    background: '#1e1e2a',
    color: '#b0bcea',
    fontWeight: '600', fontSize: '0.98rem',
    letterSpacing: '0.55px',
    borderBottom: '1.5px solid rgba(255,255,255,0.10)'
  },
  td: {
    padding: '1.1rem 1.3rem',
    color: '#e0e0e0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '0.99rem', transition: 'background 0.22s'
  },
  center: { textAlign: 'center' },
  success: { color: '#34D399', fontWeight: '600' },
  error: { color: '#F87171', fontWeight: '600' },
  statusCell: { textAlign: 'center' },
  statusLabel: { fontWeight: 'bold', fontSize: '1rem', verticalAlign: 'middle' },
  statusDot: {
    display: 'inline-block', width: '11px', height: '11px',
    borderRadius: '50%', marginRight: '8px', verticalAlign: 'middle'
  },
  nameWrapper: { display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '1rem' },
  typeBadge: {
    display: 'inline-block', fontSize: '0.92rem', padding: '0.35rem 0.95rem',
    borderRadius: '9px', fontWeight: '600', letterSpacing: '0.6px'
  },
  percentBarWrap: {
    position: 'relative', display: 'inline-block', width: '68px', height: '8px',
    background: '#23235026', borderRadius: '5px', verticalAlign: 'middle'
  },
  percentBar: {
    display: 'inline-block', height: '100%', borderRadius: '5px',
    position: 'absolute', left: '0', top: '0'
  },
  percentText: {
    position: 'absolute', left: '50%', top: '-19px', fontSize: '0.93rem', color: '#A78BFA', fontWeight: '500', transform: 'translateX(-50%)'
  },
  noData: {
    textAlign: 'center', color: '#777', fontSize: '1.14rem', padding: '3rem',
    background: 'rgba(30,30,40,0.6)', borderRadius: '13px', margin: '1.5rem 0'
  },
  summarySection: { marginTop: '1.9rem', display: 'flex', gap: '2.7rem', flexWrap: 'wrap' },
  summaryBox: {
    background: 'rgba(167,139,250,0.10)', borderRadius: '13px', padding: '1.3rem 2.1rem',
    display: 'flex', gap: '1.2rem', alignItems: 'center', minWidth: '220px'
  },
  summaryIcon: {
    fontSize: '2.0rem', verticalAlign: 'middle',
    background: 'rgba(96,165,250,0.17)', borderRadius: '12px', padding: '6px'
  },
  loading: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '220px'
  },
  spinner: {
    border: '5px solid rgba(255,255,255,0.13)',
    borderTop: '5px solid #60A5FA',
    borderRadius: '50%', width: '40px', height: '40px',
    animation: 'spin 1s linear infinite', marginBottom: '15px'
  },
  loadingText: { color: '#b0bcea', fontSize: '1.2rem', fontWeight: '500' },
};

// Animation styles injection
const animationStyles = `
@keyframes spin { 0% { transform: rotate(0deg);} 100% {transform:rotate(360deg);} }
@keyframes fadeInSlide { 0% { opacity: 0; transform: translateY(23px);} 100% { opacity: 1; transform: translateY(0);} }
.smooth-btn:hover { filter: brightness(1.10); transform: translateY(-1.5px);}
.history-row:hover {background:#222238;}
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

export default CampaignHistory;

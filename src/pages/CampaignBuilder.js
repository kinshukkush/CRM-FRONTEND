import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CampaignBuilder = () => {
  const [rules, setRules] = useState([
    { field: 'totalSpend', operator: '>', value: '', condition: 'AND' }
  ]);
  const [audienceSize, setAudienceSize] = useState(null);
  const [campaignName, setCampaignName] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [campaignType, setCampaignType] = useState('promotional');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleRuleChange = (index, field, newValue) => {
    const updated = [...rules];
    updated[index][field] = newValue;
    setRules(updated);
  };

  const addRule = () => {
    setRules([
      ...rules,
      { field: 'totalSpend', operator: '>', value: '', condition: 'AND' }
    ]);
  };

  const removeRule = (index) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setRules(updated);
  };

  const fetchAudienceSize = async () => {
    try {
      setIsLoading(true);
      const processedRules = rules.map(rule => ({
        ...rule,
        value: rule.value === '' ? '' : Number(rule.value)
      }));

      const response = await axios.post(
        '/api/customers/filter',
        processedRules
      );

      // Handle both old format (number) and new format ({count: number})
      const count = typeof response.data === 'number' ? response.data : response.data.count;
      setAudienceSize(count);
    } catch (error) {
      console.error('Error fetching audience size:', error);
      setAudienceSize(0); // Set to 0 on error
    } finally {
      setIsLoading(false);
    }
  };

  const saveCampaign = async () => {
    try {
      setIsLoading(true);
      const payload = {
        name: campaignName.trim(),
        rules: rules.map(rule => ({
          ...rule,
          value: rule.value === '' ? '' : Number(rule.value)
        })),
        audienceSize: audienceSize || 0
      };

      const saveRes = await axios.post('/api/campaigns', payload);
      await axios.post('/api/campaigns/deliver', {
        campaignId: saveRes.data.id,
        rules: payload.rules
      });

      navigate('/campaigns/history');
    } catch (error) {
      console.error('Error saving campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.topBar}>
                <button onClick={() => navigate('/home')} style={styles.backBtn} className="backBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
          </svg>
          Back to Dashboard
        </button>
        <div style={styles.steps}>
          <div style={{...styles.step, ...styles.stepActive}}>
            <div style={styles.stepNumber}>1</div>
            <span>Details</span>
          </div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>2</div>
            <span>Rules</span>
          </div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>
            <div style={styles.stepNumber}>3</div>
            <span>Preview</span>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Panel - Form */}
        <div style={styles.leftPanel}>
          <div style={styles.card}>
            {/* Campaign Header */}
            <div style={styles.cardHeader}>
              <div style={styles.headerIcon}>🎯</div>
              <div>
                <h2 style={styles.cardTitle}>Campaign Setup</h2>
                <p style={styles.cardSubtitle}>Configure your marketing campaign details</p>
              </div>
            </div>

            {/* Basic Information */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>📝</span>
                Basic Information
              </h3>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Campaign Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Summer Sale 2025"
                  style={styles.input}
                />
                <div style={styles.hint}>Choose a memorable name for internal tracking</div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Campaign Type</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="promotional"
                      checked={campaignType === 'promotional'}
                      onChange={(e) => setCampaignType(e.target.value)}
                      style={styles.radio}
                    />
                    <div style={styles.radioCard} className="radioCard">
                      <div style={styles.radioIcon}>🎉</div>
                      <div>
                        <div style={styles.radioTitle}>Promotional</div>
                        <div style={styles.radioDesc}>Discounts & offers</div>
                      </div>
                    </div>
                  </label>
                  
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="informational"
                      checked={campaignType === 'informational'}
                      onChange={(e) => setCampaignType(e.target.value)}
                      style={styles.radio}
                    />
                    <div style={styles.radioCard} className="radioCard">
                      <div style={styles.radioIcon}>📢</div>
                      <div>
                        <div style={styles.radioTitle}>Informational</div>
                        <div style={styles.radioDesc}>Updates & news</div>
                      </div>
                    </div>
                  </label>

                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="engagement"
                      checked={campaignType === 'engagement'}
                      onChange={(e) => setCampaignType(e.target.value)}
                      style={styles.radio}
                    />
                    <div style={styles.radioCard} className="radioCard">
                      <div style={styles.radioIcon}>💬</div>
                      <div>
                        <div style={styles.radioTitle}>Engagement</div>
                        <div style={styles.radioDesc}>Surveys & feedback</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Campaign Message</label>
                <textarea
                  value={campaignMessage}
                  onChange={(e) => setCampaignMessage(e.target.value)}
                  placeholder="Enter your campaign message here..."
                  style={styles.textarea}
                  rows="4"
                />
                <div style={styles.characterCount}>
                  {campaignMessage.length}/160 characters
                </div>
              </div>
            </div>

            {/* Audience Targeting */}
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>👥</span>
                Audience Targeting
              </h3>
              <div style={styles.infoBox}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: '10px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="#60A5FA"/>
                </svg>
                <span>Define rules to segment and target your ideal audience</span>
              </div>
          
          <div style={styles.rulesContainer}>
            {rules.map((rule, index) => (
              <div key={index} style={styles.ruleBlock}>
                {index > 0 && (
                  <div style={styles.conditionContainer}>
                    <select
                      value={rule.condition}
                      onChange={(e) =>
                        handleRuleChange(index, 'condition', e.target.value)
                      }
                      style={styles.conditionSelect}
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                )}

                <div style={styles.ruleControls}>
                  <div style={styles.fieldGroup}>
                    <select
                      value={rule.field}
                      onChange={(e) =>
                        handleRuleChange(index, 'field', e.target.value)
                      }
                      style={styles.select}
                    >
                      <option value="totalSpend">Total Spend</option>
                      <option value="visits">Visits</option>
                      <option value="inactivity">Inactivity (days)</option>
                    </select>
                    
                    <select
                      value={rule.operator}
                      onChange={(e) =>
                        handleRuleChange(index, 'operator', e.target.value)
                      }
                      style={styles.operatorSelect}
                    >
                      <option value=">">&gt; (greater than)</option>
                      <option value="<">&lt; (less than)</option>
                      <option value="=">= (equal to)</option>
                    </select>
                  </div>
                  
                  <div style={styles.valueContainer}>
                    <input
                      type="number"
                      value={rule.value}
                      onChange={(e) =>
                        handleRuleChange(index, 'value', e.target.value)
                      }
                      placeholder="Value"
                      style={styles.inputSmall}
                    />
                    <button
                      onClick={() => removeRule(index)}
                      style={styles.removeBtn}
                      className="removeBtn"
                      title="Remove rule"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#F87171"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

              <button onClick={addRule} style={styles.addRuleBtn} className="addRuleBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight: '8px'}}>
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#60A5FA"/>
                </svg>
                Add Another Rule
              </button>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionSection}>
              <button 
                onClick={() => {
                  fetchAudienceSize();
                  setShowPreview(true);
                }} 
                style={styles.calculateBtn}
                className="calculateBtn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div style={styles.spinner}></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: '8px'}}>
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="#60A5FA"/>
                    </svg>
                    Calculate Audience
                  </>
                )}
              </button>

              <button
                onClick={saveCampaign}
                disabled={!campaignName.trim() || audienceSize === null || isLoading}
                className="launchBtn"
                style={{
                  ...styles.launchBtn,
                  opacity: (!campaignName.trim() || audienceSize === null) ? 0.5 : 1,
                  cursor: (!campaignName.trim() || audienceSize === null) ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <div style={styles.spinner}></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{marginRight: '8px'}}>
                      <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
                    </svg>
                    Launch Campaign
                  </>
                )}
              </button>
            </div>

            {/* Validation Messages */}
            {(!campaignName.trim() || audienceSize === null) && (
              <div style={styles.validationBox}>
                {!campaignName.trim() && (
                  <div style={styles.validationItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F59E0B"/>
                    </svg>
                    Campaign name is required
                  </div>
                )}
                {audienceSize === null && (
                  <div style={styles.validationItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F59E0B"/>
                    </svg>
                    Calculate audience size before launching
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview & Stats */}
        <div style={styles.rightPanel}>
          {/* Quick Stats */}
          <div style={styles.statsCard}>
            <h3 style={styles.statsTitle}>Campaign Overview</h3>
            
            <div style={styles.statItem} className="stat-blue">
              <div style={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="#60A5FA"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>
                  {audienceSize !== null ? audienceSize.toLocaleString() : '---'}
                </div>
                <div style={styles.statLabel}>Target Audience</div>
              </div>
            </div>

            <div style={styles.statItem} className="stat-green">
              <div style={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="#34D399"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>{rules.length}</div>
                <div style={styles.statLabel}>Targeting Rules</div>
              </div>
            </div>

            <div style={styles.statItem} className="stat-purple">
              <div style={styles.statIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#A78BFA"/>
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>
                  {audienceSize !== null ? Math.round(audienceSize * 0.947) : '---'}
                </div>
                <div style={styles.statLabel}>Est. Deliveries</div>
              </div>
            </div>
          </div>

          {/* Tips Card */}
          <div style={styles.tipsCard}>
            <h3 style={styles.tipsTitle}>💡 Pro Tips</h3>
            <div style={styles.tipsList}>
              <div style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                <span>Use multiple rules to create precise audience segments</span>
              </div>
              <div style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                <span>Test with smaller audiences before scaling up</span>
              </div>
              <div style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                <span>Keep messages clear and under 160 characters</span>
              </div>
              <div style={styles.tipItem}>
                <span style={styles.tipBullet}>•</span>
                <span>Review audience size before launching</span>
              </div>
            </div>
          </div>

          {/* Template Suggestions */}
          <div style={styles.templateCard}>
            <h3 style={styles.templateTitle}>📋 Quick Templates</h3>
            <div style={styles.templateList}>
              <button style={styles.templateBtn} className="templateBtn" onClick={() => {
                setRules([{ field: 'totalSpend', operator: '>', value: '1000', condition: 'AND' }]);
              }}>
                <span style={styles.templateEmoji}>💎</span>
                <span>High Spenders</span>
              </button>
              <button style={styles.templateBtn} className="templateBtn" onClick={() => {
                setRules([{ field: 'visits', operator: '<', value: '3', condition: 'AND' }]);
              }}>
                <span style={styles.templateEmoji}>🆕</span>
                <span>New Customers</span>
              </button>
              <button style={styles.templateBtn} className="templateBtn" onClick={() => {
                setRules([{ field: 'inactivity', operator: '>', value: '30', condition: 'AND' }]);
              }}>
                <span style={styles.templateEmoji}>😴</span>
                <span>Inactive Users</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
  },
  topBar: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1rem 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  topBarContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.65rem 1.2rem',
    background: 'rgba(148, 163, 184, 0.1)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#cbd5e1',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  stepProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(96, 165, 250, 0.2)',
    border: '2px solid #60a5fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#60a5fa',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  stepLine: {
    width: '40px',
    height: '2px',
    background: 'rgba(148, 163, 184, 0.3)'
  },
  mainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '2rem',
    alignItems: 'start'
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  rightPanel: {
    position: 'sticky',
    top: '100px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  card: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  headerIcon: {
    fontSize: '2.5rem'
  },
  cardTitle: {
    color: '#f1f5f9',
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: 0
  },
  cardSubtitle: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    margin: '0.3rem 0 0 0'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem'
  },
  sectionIcon: {
    fontSize: '1.3rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    color: '#cbd5e1',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.6rem'
  },
  required: {
    color: '#f87171'
  },
  input: {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  hint: {
    color: '#64748b',
    fontSize: '0.8rem',
    marginTop: '0.4rem'
  },
  characterCount: {
    color: '#64748b',
    fontSize: '0.8rem',
    marginTop: '0.4rem',
    textAlign: 'right'
  },
  radioGroup: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  radioLabel: {
    cursor: 'pointer'
  },
  radio: {
    display: 'none'
  },
  radioCard: {
    padding: '1rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '2px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  radioIcon: {
    fontSize: '1.8rem'
  },
  radioTitle: {
    color: '#f1f5f9',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  radioDesc: {
    color: '#94a3b8',
    fontSize: '0.75rem'
  },
  infoBox: {
    background: 'rgba(96, 165, 250, 0.1)',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    borderRadius: '8px',
    padding: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    color: '#93c5fd',
    fontSize: '0.85rem',
    marginBottom: '1.5rem'
  },
  rulesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem'
  },
  ruleBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.8rem',
    background: 'rgba(15, 23, 42, 0.4)',
    borderRadius: '10px',
    padding: '1rem',
    border: '1px solid rgba(148, 163, 184, 0.15)'
  },
  conditionContainer: {
    width: '85px'
  },
  conditionSelect: {
    width: '100%',
    padding: '0.6rem',
    background: 'rgba(96, 165, 250, 0.15)',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    borderRadius: '6px',
    color: '#60a5fa',
    fontSize: '0.85rem',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none'
  },
  ruleControls: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  fieldGroup: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1.5fr',
    gap: '0.8rem'
  },
  select: {
    padding: '0.7rem 0.9rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s'
  },
  operatorSelect: {
    padding: '0.7rem 0.9rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s'
  },
  valueContainer: {
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'center'
  },
  inputSmall: {
    flex: 1,
    padding: '0.7rem 0.9rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s'
  },
  removeBtn: {
    background: 'rgba(248, 113, 113, 0.1)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    flexShrink: 0
  },
  addRuleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '0.85rem',
    background: 'rgba(96, 165, 250, 0.1)',
    border: '2px dashed rgba(96, 165, 250, 0.4)',
    borderRadius: '10px',
    color: '#60a5fa',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  actionSection: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  },
  calculateBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: 'rgba(96, 165, 250, 0.15)',
    border: 'none',
    borderRadius: '10px',
    color: '#60a5fa',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  launchBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },
  validationBox: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: 'rgba(251, 146, 60, 0.1)',
    border: '1px solid rgba(251, 146, 60, 0.3)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem'
  },
  validationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: '#fbbf24',
    fontSize: '0.85rem'
  },
  statsCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
  },
  statsTitle: {
    color: '#f1f5f9',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1.5rem'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(15, 23, 42, 0.4)',
    borderRadius: '10px',
    marginBottom: '1rem'
  },
  statIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statContent: {
    flex: 1
  },
  statValue: {
    color: '#f1f5f9',
    fontSize: '1.4rem',
    fontWeight: '700',
    lineHeight: 1
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: '0.8rem',
    marginTop: '0.3rem'
  },
  tipsCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
  },
  tipsTitle: {
    color: '#f1f5f9',
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  tipsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  tipItem: {
    display: 'flex',
    gap: '0.7rem',
    color: '#cbd5e1',
    fontSize: '0.85rem',
    lineHeight: 1.5
  },
  tipBullet: {
    color: '#60a5fa',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    lineHeight: 1
  },
  templateCard: {
    background: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
  },
  templateTitle: {
    color: '#f1f5f9',
    fontSize: '1.05rem',
    fontWeight: '600',
    marginBottom: '1rem'
  },
  templateList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem'
  },
  templateBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.9rem',
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  templateEmoji: {
    fontSize: '1.3rem'
  },
  spinner: {
    border: '3px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    borderTop: '3px solid #60a5fa',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite'
  }
};

const animationStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input[type="radio"]:checked + .radioCard {
    border-color: #60a5fa !important;
    background: rgba(96, 165, 250, 0.15) !important;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #60a5fa !important;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }
  
  .backBtn:hover {
    background: rgba(148, 163, 184, 0.2) !important;
    border-color: rgba(148, 163, 184, 0.3) !important;
  }
  
  .addRuleBtn:hover {
    background: rgba(96, 165, 250, 0.2) !important;
    border-color: rgba(96, 165, 250, 0.5) !important;
  }
  
  .calculateBtn:hover {
    background: rgba(96, 165, 250, 0.25) !important;
    transform: translateY(-1px);
  }
  
  .launchBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4) !important;
  }
  
  .removeBtn:hover {
    background: rgba(248, 113, 113, 0.2) !important;
  }
  
  .templateBtn:hover {
    background: rgba(96, 165, 250, 0.1) !important;
    border-color: rgba(96, 165, 250, 0.3) !important;
    transform: translateX(4px);
  }
  
  .stat-blue .statIcon {
    background: rgba(96, 165, 250, 0.15);
  }
  
  .stat-green .statIcon {
    background: rgba(52, 211, 153, 0.15);
  }
  
  .stat-purple .statIcon {
    background: rgba(167, 139, 250, 0.15);
  }
`;

// Inject the animation styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = animationStyles;
document.head.appendChild(styleSheet);

export default CampaignBuilder;
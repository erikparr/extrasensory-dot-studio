'use client';

import { useState, useEffect } from 'react';

const API_URL = 'https://foam-api.extrasensory.studio/api/admin';

export default function FoamAdmin() {
  const [adminSecret, setAdminSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activePanel, setActivePanel] = useState('licenses');
  const [overview, setOverview] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  const api = async (endpoint) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'X-Admin-Secret': adminSecret }
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  };

  const apiPost = async (endpoint, data = {}) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'X-Admin-Secret': adminSecret,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return res.json();
  };

  const authenticate = async () => {
    try {
      setError('');
      await api('/overview');
      setAuthenticated(true);
      loadAll();
    } catch (e) {
      setError('Invalid admin secret');
    }
  };

  const loadAll = async () => {
    try {
      const [overviewData, licensesData, txnData, jobsData, alertsData] = await Promise.all([
        api('/overview'),
        api('/licenses?limit=50'),
        api('/transactions?limit=50'),
        api('/jobs?limit=50'),
        api('/alerts?limit=20')
      ]);
      setOverview(overviewData);
      setLicenses(licensesData.licenses || []);
      setTransactions(txnData.transactions || []);
      setJobs(jobsData.jobs || []);
      setAlerts(alertsData.alerts || []);
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  };

  const ackAlert = async (id) => {
    await apiPost(`/alerts/${id}/acknowledge`);
    const alertsData = await api('/alerts?limit=20');
    setAlerts(alertsData.alerts || []);
  };

  const formatTime = (iso) => {
    if (!iso) return '-';
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const today = overview?.today || {};
  const month = overview?.month || {};
  const charsToday = overview?.chars_today || 0;
  const charLimit = overview?.daily_char_limit || 250000;
  const charPct = Math.round((charsToday / charLimit) * 100);

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>FOAM Studio Admin</h1>

      {!authenticated ? (
        <div style={styles.authForm}>
          <input
            type="password"
            placeholder="Enter Admin Secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && authenticate()}
            style={styles.input}
          />
          <button onClick={authenticate} style={styles.authButton}>Connect</button>
          {error && <span style={{ color: '#ef4444', marginLeft: 10 }}>{error}</span>}
        </div>
      ) : (
        <div>
          <button onClick={loadAll} style={styles.refreshBtn}>Refresh</button>

          <h2 style={styles.h2}>Overview</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.label}>Active Licenses</div>
              <div style={styles.value}>{overview?.total_active_licenses || 0}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.label}>Today&apos;s Generations</div>
              <div style={styles.value}>{today.total_generations || 0}</div>
              <div style={styles.sub}>{today.successful_generations || 0} ok, {today.failed_generations || 0} failed</div>
            </div>
            <div style={{
              ...styles.statCard,
              borderColor: charPct >= 95 ? '#ef4444' : charPct >= 80 ? '#f59e0b' : '#333'
            }}>
              <div style={styles.label}>OpenAI TTS Usage</div>
              <div style={styles.value}>{charPct}%</div>
              <div style={styles.sub}>{charsToday.toLocaleString()} / {charLimit.toLocaleString()} chars</div>
              <a
                href="https://platform.openai.com/usage"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.externalLink}
              >
                View OpenAI Dashboard →
              </a>
            </div>
            <div style={{
              ...styles.statCard,
              borderColor: (overview?.recent_errors_24h || 0) > 0 ? '#ef4444' : '#333'
            }}>
              <div style={styles.label}>Errors (24h)</div>
              <div style={styles.value}>{overview?.recent_errors_24h || 0}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.label}>Month Credits</div>
              <div style={styles.value}>{month.credits_used || 0}</div>
              <div style={styles.sub}>of {month.credits_purchased || 0} purchased</div>
            </div>
          </div>

          <div style={styles.tabs}>
            {['licenses', 'transactions', 'jobs', 'alerts'].map(panel => (
              <button
                key={panel}
                onClick={() => setActivePanel(panel)}
                style={{
                  ...styles.tab,
                  ...(activePanel === panel ? styles.tabActive : {})
                }}
              >
                {panel.charAt(0).toUpperCase() + panel.slice(1)}
              </button>
            ))}
          </div>

          {activePanel === 'licenses' && (
            licenses.length === 0 ? (
              <div style={styles.noData}>No licenses yet</div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>License Key</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Created</th>
                    <th style={styles.th}>Balance</th>
                    <th style={styles.th}>Used</th>
                    <th style={styles.th}>Purchased</th>
                  </tr>
                </thead>
                <tbody>
                  {licenses.map(l => (
                    <tr key={l.license_key} style={styles.tr}>
                      <td style={styles.td}><code>{l.license_key}</code></td>
                      <td style={styles.td}>{l.email || '-'}</td>
                      <td style={styles.td}><span style={{...styles.badge, ...styles[`badge_${l.status}`]}}>{l.status}</span></td>
                      <td style={styles.td}>{formatTime(l.created_at)}</td>
                      <td style={styles.td}><strong>{l.balance}</strong></td>
                      <td style={styles.td}>{l.lifetime_used}</td>
                      <td style={styles.td}>{l.lifetime_purchased}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activePanel === 'transactions' && (
            transactions.length === 0 ? (
              <div style={styles.noData}>No transactions yet</div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>License</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Balance</th>
                    <th style={styles.th}>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i} style={styles.tr}>
                      <td style={styles.td}>{formatTime(t.created_at)}</td>
                      <td style={styles.td}><code>{t.license_key.substring(0, 15)}...</code></td>
                      <td style={styles.td}><span style={{...styles.badge, ...styles[`badge_${t.type}`]}}>{t.type}</span></td>
                      <td style={styles.td}>{t.amount > 0 ? '+' : ''}{t.amount}</td>
                      <td style={styles.td}>{t.balance_after}</td>
                      <td style={styles.td}>{t.reason || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activePanel === 'jobs' && (
            jobs.length === 0 ? (
              <div style={styles.noData}>No jobs yet</div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Time</th>
                    <th style={styles.th}>Job ID</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Credits</th>
                    <th style={styles.th}>Chars</th>
                    <th style={styles.th}>Text Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(j => (
                    <tr key={j.job_id} style={styles.tr}>
                      <td style={styles.td}>{formatTime(j.created_at)}</td>
                      <td style={styles.td}><code>{j.job_id.substring(0, 8)}...</code></td>
                      <td style={styles.td}><span style={{...styles.badge, ...styles[`badge_${j.status}`]}}>{j.status}</span></td>
                      <td style={styles.td}>{j.credits_charged}{j.credits_refunded ? ` (${j.credits_refunded} refunded)` : ''}</td>
                      <td style={styles.td}>{j.text_length}</td>
                      <td style={styles.td}>{(j.text_preview || '').substring(0, 30)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}

          {activePanel === 'alerts' && (
            alerts.length === 0 ? (
              <div style={styles.noData}>No alerts</div>
            ) : (
              alerts.map(a => (
                <div key={a.id} style={{
                  ...styles.alertItem,
                  borderLeftColor: a.severity === 'critical' ? '#ef4444' : a.severity === 'warning' ? '#f59e0b' : '#3b82f6'
                }}>
                  <div style={styles.alertHeader}>
                    <span style={styles.alertType}>{a.type} - {a.severity}</span>
                    <span style={styles.alertTime}>{formatTime(a.created_at)}</span>
                  </div>
                  <div style={styles.alertMessage}>{a.message}</div>
                  {a.license_key && <div style={{ color: '#666', fontSize: 12, marginTop: 5 }}>License: {a.license_key}</div>}
                  {!a.acknowledged ? (
                    <button onClick={() => ackAlert(a.id)} style={styles.ackButton}>Acknowledge</button>
                  ) : (
                    <span style={{ color: '#666', fontSize: 12 }}>Acknowledged</span>
                  )}
                </div>
              ))
            )
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    background: '#0f0f0f',
    color: '#e0e0e0',
    padding: 20,
    minHeight: '100vh',
  },
  h1: { color: '#fff', marginBottom: 20 },
  h2: { color: '#888', fontSize: 14, textTransform: 'uppercase', margin: '20px 0 10px' },
  authForm: {
    background: '#1a1a1a',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    border: '1px solid #333',
    borderRadius: 4,
    background: '#0f0f0f',
    color: '#fff',
  },
  authButton: {
    padding: '10px 20px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  refreshBtn: {
    float: 'right',
    padding: '8px 16px',
    background: '#333',
    border: 'none',
    color: '#888',
    borderRadius: 4,
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    background: '#1a1a1a',
    padding: 20,
    borderRadius: 8,
    border: '1px solid #333',
  },
  label: { color: '#888', fontSize: 12, textTransform: 'uppercase' },
  value: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginTop: 5 },
  sub: { color: '#666', fontSize: 12, marginTop: 5 },
  externalLink: {
    display: 'block',
    marginTop: 10,
    color: '#3b82f6',
    fontSize: 12,
    textDecoration: 'none',
  },
  tabs: {
    display: 'flex',
    gap: 5,
    marginBottom: 15,
    borderBottom: '1px solid #333',
    paddingBottom: 10,
  },
  tab: {
    padding: '8px 16px',
    background: 'transparent',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
    borderRadius: 4,
  },
  tabActive: {
    background: '#2563eb',
    color: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #333',
    background: '#252525',
    color: '#888',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  td: {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #333',
  },
  tr: {},
  badge: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
  },
  badge_active: { background: '#166534', color: '#86efac' },
  badge_trial: { background: '#854d0e', color: '#fde047' },
  badge_revoked: { background: '#7f1d1d', color: '#fca5a5' },
  badge_complete: { background: '#166534', color: '#86efac' },
  badge_error: { background: '#7f1d1d', color: '#fca5a5' },
  badge_queued: { background: '#854d0e', color: '#fde047' },
  badge_purchase: { background: '#166534', color: '#86efac' },
  badge_deduct: { background: '#7f1d1d', color: '#fca5a5' },
  badge_refund: { background: '#1e40af', color: '#93c5fd' },
  noData: { color: '#666', textAlign: 'center', padding: 40 },
  alertItem: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },
  alertHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 8 },
  alertType: { color: '#888', fontSize: 12, textTransform: 'uppercase' },
  alertTime: { color: '#666', fontSize: 12 },
  alertMessage: { color: '#fff' },
  ackButton: {
    marginTop: 10,
    padding: '5px 10px',
    background: '#333',
    border: 'none',
    color: '#888',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

/* ===== Root Variables ===== */
:root {
  --login-primary: #16a34a;
  --login-primary-light: #22c55e;
  --login-accent: #2a195c;
  --login-accent-light: #4f46e5;
  --login-surface: #ffffff;
  --login-text: #0f172a;
  --login-text-secondary: #64748b;
  --login-border: #e2e8f0;
  --login-bg: #f8fafc;
}

/* ===== Shell ===== */
.login-shell {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: hidden;
}

/* ===== Left Panel — Dark branded column ===== */
.login-left {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 48px;
  background: linear-gradient(160deg, #0c0a1a 0%, #1a1145 40%, #0f2518 100%);
  overflow: hidden;
  min-height: 100vh;
}

/* Animated gradient mesh overlay */
.login-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 600px 600px at 20% 20%, rgba(22,163,74,0.15) 0%, transparent 70%),
    radial-gradient(ellipse 500px 500px at 80% 80%, rgba(79,70,229,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 400px 400px at 60% 30%, rgba(42,25,92,0.18) 0%, transparent 60%);
  animation: meshShift 12s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes meshShift {
  0% { opacity: 0.8; transform: scale(1) rotate(0deg); }
  100% { opacity: 1; transform: scale(1.05) rotate(1deg); }
}

/* Grid lines overlay */
.login-left::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  z-index: 1;
}

.login-left-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* Logo area */
.login-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 60px;
}

.login-brand img {
  height: 36px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

/* Hero text */
.login-hero-text {
  max-width: 480px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-hero-h1 {
  font-size: 44px;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.12;
  margin: 0 0 16px;
  letter-spacing: -1.5px;
}

.login-hero-h1 .green {
  background: linear-gradient(135deg, #16a34a, #4ade80);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-hero-sub {
  font-size: 15px;
  color: rgba(255,255,255,0.55);
  line-height: 1.7;
  max-width: 400px;
  font-weight: 400;
}

/* Feature pills */
.login-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}

.login-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 100px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.7);
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.login-pill:hover {
  background: rgba(22,163,74,0.12);
  border-color: rgba(22,163,74,0.25);
  color: #4ade80;
}

.login-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 6px rgba(22,163,74,0.5);
}

/* Glass stat cards */
.login-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 48px;
}

.login-stat-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 16px;
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}

.login-stat-card:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.12);
  transform: translateY(-2px);
}

.login-stat-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.login-stat-icon.green {
  background: rgba(22,163,74,0.15);
  color: #4ade80;
}

.login-stat-icon.blue {
  background: rgba(59,130,246,0.15);
  color: #60a5fa;
}

.login-stat-icon.purple {
  background: rgba(139,92,246,0.15);
  color: #a78bfa;
}

.login-stat-val {
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.login-stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
  margin-top: 2px;
}

/* Bottom trust bar */
.login-trust {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: auto;
}

.login-trust-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  font-weight: 500;
}

.login-trust-badge svg {
  color: rgba(22,163,74,0.7);
}

/* Floating particles */
.login-particle {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.login-particle-1 {
  width: 4px;
  height: 4px;
  background: rgba(22,163,74,0.4);
  top: 15%;
  left: 75%;
  animation: particleFloat1 8s ease-in-out infinite;
}

.login-particle-2 {
  width: 3px;
  height: 3px;
  background: rgba(79,70,229,0.3);
  top: 60%;
  left: 85%;
  animation: particleFloat2 10s ease-in-out infinite;
}

.login-particle-3 {
  width: 5px;
  height: 5px;
  background: rgba(22,163,74,0.25);
  top: 80%;
  left: 25%;
  animation: particleFloat3 7s ease-in-out infinite;
}

.login-particle-4 {
  width: 3px;
  height: 3px;
  background: rgba(139,92,246,0.3);
  top: 30%;
  left: 60%;
  animation: particleFloat2 9s ease-in-out infinite 2s;
}

@keyframes particleFloat1 {
  0%, 100% { transform: translate(0, 0); opacity: 0.4; }
  50% { transform: translate(-15px, -25px); opacity: 0.8; }
}

@keyframes particleFloat2 {
  0%, 100% { transform: translate(0, 0); opacity: 0.3; }
  50% { transform: translate(20px, -20px); opacity: 0.7; }
}

@keyframes particleFloat3 {
  0%, 100% { transform: translate(0, 0); opacity: 0.25; }
  50% { transform: translate(-10px, -30px); opacity: 0.6; }
}

/* ===== Right Panel — Login Form ===== */
.login-right {
  flex: 0 0 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: var(--login-bg);
  position: relative;
}

/* Subtle top-right gradient blob */
.login-right::before {
  content: '';
  position: absolute;
  top: -80px;
  right: -80px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.login-card {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
}

/* Logo icon on card */
.login-card-logo {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
  border: 1px solid #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  box-shadow: 0 4px 12px rgba(22,163,74,0.08);
}

.login-card-logo img {
  height: 22px;
  object-fit: contain;
}

.login-card-h2 {
  font-size: 26px;
  font-weight: 800;
  color: var(--login-text);
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.login-card-sub {
  font-size: 14px;
  color: var(--login-text-secondary);
  margin: 0 0 32px;
  font-weight: 400;
  line-height: 1.5;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.login-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.login-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.login-input-icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
}

.login-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border: 1.5px solid var(--login-border);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--login-text);
  background: var(--login-surface);
  outline: none;
  transition: all 0.2s ease;
}

.login-input::placeholder {
  color: #a0aec0;
  font-weight: 400;
}

.login-input:focus {
  border-color: var(--login-primary);
  box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
}

.login-input:focus ~ .login-input-icon,
.login-input:focus + .login-input-icon {
  color: var(--login-primary);
}

.login-input-pwd {
  padding-right: 44px;
}

.login-eye-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
}

.login-eye-btn:hover {
  color: var(--login-primary);
  background: rgba(22,163,74,0.06);
}

/* Options row */
.login-opts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -4px;
}

.login-check-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}

.login-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--login-primary);
  cursor: pointer;
  border-radius: 4px;
}

.login-forgot {
  font-size: 13px;
  color: var(--login-primary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;
}

.login-forgot:hover {
  color: var(--login-primary-light);
}

/* Submit button */
.login-submit {
  width: 100%;
  padding: 13px 20px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--login-primary) 0%, #15803d 100%);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(22,163,74,0.25), 0 1px 3px rgba(22,163,74,0.1);
  position: relative;
  overflow: hidden;
  margin-top: 4px;
}

.login-submit::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%);
  opacity: 0;
  transition: opacity 0.2s;
}

.login-submit:hover::before {
  opacity: 1;
}

.login-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(22,163,74,0.3), 0 2px 6px rgba(22,163,74,0.15);
}

.login-submit:active {
  transform: translateY(0);
}

.login-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

/* Spinner */
.login-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: loginSpin 0.6s linear infinite;
}

@keyframes loginSpin {
  to { transform: rotate(360deg); }
}

/* Divider */
.login-divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--login-border);
}

/* Google button */
.login-google {
  width: 100%;
  padding: 12px 20px;
  border: 1.5px solid var(--login-border);
  border-radius: 10px;
  background: var(--login-surface);
  color: var(--login-text);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}

.login-google:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* Footer text */
.login-footer {
  font-size: 13px;
  color: var(--login-text-secondary);
  text-align: center;
  margin-top: 28px;
  font-weight: 400;
}

.login-footer a {
  color: var(--login-primary);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;
}

.login-footer a:hover {
  color: var(--login-primary-light);
}

/* ===== Responsive ===== */
@media (max-width: 1080px) {
  .login-right {
    flex: 0 0 460px;
  }
  .login-left {
    padding: 32px 36px;
  }
  .login-hero-h1 {
    font-size: 36px;
  }
  .login-stats {
    gap: 8px;
  }
}

@media (max-width: 900px) {
  .login-left {
    display: none;
  }
  .login-shell {
    justify-content: center;
    background: var(--login-bg);
  }
  .login-right {
    flex: 1;
    max-width: 100%;
    padding: 24px 20px;
  }
  .login-card {
    max-width: 420px;
  }
}
`;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Clear role session on mount
  useEffect(() => {
    localStorage.removeItem("evegah_role");
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/users`);
      
      if (response.ok) {
        const result = await response.json();
        const usersList = result.data || [];
        
        // Match user by email
        const matchedUser = usersList.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
        
        if (matchedUser) {
          const userRole = matchedUser.role;
          let evegahRole = 'employee';
          
          if (userRole === 'Super Admin' || userRole === 'Platform Admin') {
            evegahRole = 'admin';
          } else if (userRole === 'Zone Admin' || userRole === 'Operations Manager') {
            evegahRole = 'zone_manager';
          } else if (userRole === 'Franchise Manager') {
            evegahRole = 'first_time_franchise';
          }
          
          localStorage.setItem("evegah_role", evegahRole);
          localStorage.setItem("evegah_user_name", matchedUser.name);
          localStorage.setItem("evegah_user_email", matchedUser.email);
          if (matchedUser.avatar_url) {
            localStorage.setItem("evegah_user_avatar", matchedUser.avatar_url);
          }

          try {
            const resRoles = await fetch(`${apiUrl}/roles`);
            if (resRoles.ok) {
              const rolesResult = await resRoles.json();
              const matchedRole = rolesResult.data?.find((r: any) => 
                r.name.toLowerCase() === matchedUser.role.toLowerCase() || 
                r.code.toLowerCase() === matchedUser.role.toLowerCase()
              );
              if (matchedRole) {
                localStorage.setItem("evegah_user_permissions", JSON.stringify(matchedRole.permissions || {}));
              } else {
                localStorage.setItem("evegah_user_permissions", JSON.stringify({}));
              }
            }
          } catch (err) {
            console.error('Error fetching roles for permissions:', err);
          }
          
          window.dispatchEvent(new Event("evegah_role_changed"));
          router.push('/');
          return;
        }
      }
      
      // Fallback Demo accounts if no DB match found (for client verification ease)
      let roleVal = 'employee';
      if (email.includes('admin')) {
        roleVal = 'admin';
      } else if (email.includes('manager') || email.includes('zone')) {
        roleVal = 'zone_manager';
      } else if (email.includes('franchise')) {
        roleVal = 'first_time_franchise';
      }
      
      localStorage.setItem("evegah_role", roleVal);
      localStorage.setItem("evegah_user_name", email.split('@')[0].toUpperCase());
      localStorage.setItem("evegah_user_email", email);

      const allAccess = {
        Dashboard: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Riders: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Vehicles: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Battery: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        "IoT Devices": { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Payments: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Reports: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Alerts: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        "Zone Management": { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Franchise: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Settings: { access: true, create: true, view: true, edit: true, delete: true, export: true }
      };

      const employeeAccess = {
        Dashboard: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Riders: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Vehicles: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        Battery: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        "IoT Devices": { access: false, create: false, view: false, edit: false, delete: false, export: false },
        Payments: { access: false, create: false, view: false, edit: false, delete: false, export: false },
        Reports: { access: false, create: false, view: false, edit: false, delete: false, export: false },
        Alerts: { access: true, create: true, view: true, edit: true, delete: true, export: true },
        "Zone Management": { access: false, create: false, view: false, edit: false, delete: false, export: false },
        Franchise: { access: false, create: false, view: false, edit: false, delete: false, export: false },
        Settings: { access: false, create: false, view: false, edit: false, delete: false, export: false }
      };

      localStorage.setItem("evegah_user_permissions", JSON.stringify(roleVal === 'admin' || roleVal === 'zone_manager' ? allAccess : employeeAccess));
      
      window.dispatchEvent(new Event("evegah_role_changed"));
      router.push('/');
    } catch (err) {
      console.error(err);
      // Fallback on network error
      localStorage.setItem("evegah_role", "employee");
      localStorage.setItem("evegah_user_permissions", JSON.stringify({}));
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="login-shell">
        {/* ===== Left Panel ===== */}
        <div className="login-left">
          {/* Floating particles */}
          <div className="login-particle login-particle-1" />
          <div className="login-particle login-particle-2" />
          <div className="login-particle login-particle-3" />
          <div className="login-particle login-particle-4" />

          <div className="login-left-content">
            {/* Brand */}
            <div className="login-brand">
              <img src="/logo.png" alt="evegah" />
            </div>

            {/* Hero text */}
            <div className="login-hero-text">
              <h1 className="login-hero-h1">
                Powering Smart<br />
                <span className="green">Electric Mobility</span>
              </h1>
              <p className="login-hero-sub">
                Manage your entire EV fleet from one intelligent platform.
                Real-time tracking, smart analytics, and seamless operations.
              </p>

              {/* Feature pills */}
              <div className="login-features">
                <span className="login-pill">
                  <span className="login-pill-dot" />
                  Fleet Management
                </span>
                <span className="login-pill">
                  <span className="login-pill-dot" />
                  Smart Rentals
                </span>
                <span className="login-pill">
                  <span className="login-pill-dot" />
                  Battery Tracking
                </span>
                <span className="login-pill">
                  <span className="login-pill-dot" />
                  Live Analytics
                </span>
              </div>

              {/* Stats cards */}
              <div className="login-stats">
                <div className="login-stat-card">
                  <div className="login-stat-icon green">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="login-stat-val">2.4K+</div>
                  <div className="login-stat-label">Active Vehicles</div>
                </div>
                <div className="login-stat-card">
                  <div className="login-stat-icon blue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="login-stat-val">18</div>
                  <div className="login-stat-label">Active Zones</div>
                </div>
                <div className="login-stat-card">
                  <div className="login-stat-icon purple">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div className="login-stat-val">99.8%</div>
                  <div className="login-stat-label">Uptime</div>
                </div>
              </div>
            </div>

            {/* Trust bar */}
            <div className="login-trust">
              <span className="login-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 11 11 13 15 9" />
                </svg>
                SSL Encrypted
              </span>
              <span className="login-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                SOC 2 Compliant
              </span>
              <span className="login-trust-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                99.9% Uptime
              </span>
            </div>
          </div>
        </div>

        {/* ===== Right Panel — Login Card ===== */}
        <div className="login-right">
          <div className="login-card">
            <div className="login-card-logo">
              <img src="/logo.png" alt="evegah" />
            </div>

            <h2 className="login-card-h2">Welcome back</h2>
            <p className="login-card-sub">Sign in to access your evegah dashboard</p>

            <form onSubmit={handleLoginSubmit} className="login-form">
              {/* Email */}
              <div className="login-field">
                <label className="login-label">Email address</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input 
                    id="login-email"
                    type="email" 
                    placeholder="you@company.com" 
                    className="login-input" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-field">
                <label className="login-label">Password</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input 
                    id="login-password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    className="login-input login-input-pwd" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="login-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="login-opts">
                <label className="login-check-label">
                  <input type="checkbox" className="login-checkbox" defaultChecked />
                  Remember me
                </label>
                <a href="#" className="login-forgot" onClick={(e) => { e.preventDefault(); alert('Please contact system administrator to reset password.'); }}>
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button id="login-submit-btn" type="submit" className="login-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="login-divider">or continue with</div>

              {/* Google */}
              <button 
                id="login-google-btn"
                type="button" 
                className="login-google"
                onClick={() => {
                  localStorage.setItem("evegah_role", "admin");
                  window.dispatchEvent(new Event("evegah_role_changed"));
                  router.push('/');
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Sign in with Google
              </button>

              {/* Footer */}
              <div className="login-footer">
                Don&apos;t have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact system administrator to request account creation.'); }}>
                  Contact Admin
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';


/* ── Evegah Logo ── */
export const EvegahLogo = ({ height = 40, dark = false }: { height?: number; dark?: boolean }) => (
  <Image
    src="/logo.png"
    alt="Evegah"
    width={160}
    height={42}
    style={{
      height: height,
      width: 'auto',
      objectFit: 'contain',
      display: 'block',
      filter: dark ? 'brightness(0) invert(1)' : 'none',
    }}
    priority
  />
);

/* ── SVG Icons (no emojis) ── */
const strokeBase = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const Ic = (p: React.SVGProps<SVGSVGElement>) => <svg width="16" height="16" viewBox="0 0 24 24" {...strokeBase} {...p} />;

const icons: Record<string, React.ReactNode> = {
  dashboard: <Ic><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></Ic>,
  reg:       <Ic><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></Ic>,
  vehicle:   <Ic><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Ic>,
  renter:    <Ic><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Ic>,
  battery:   <Ic><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="7" y1="12" x2="11" y2="8"/><line x1="11" y1="8" x2="11" y2="12"/><line x1="11" y1="12" x2="15" y2="12"/></Ic>,
  reports:   <Ic><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ic>,
  alerts:    <Ic><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Ic>,
  zone:      <Ic><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></Ic>,
  franchise: <Ic><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Ic>,
  usersrole: <Ic><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></Ic>,
  announcements: <Ic><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></Ic>,
  payment:   <Ic><rect x="2" y="5" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="10" x2="22" y2="10"/></Ic>,
  co2:       <Ic><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 21 3c-1 5.5-2.5 7.5-6.1 11.8A7 7 0 0 1 11 20z"/><path d="M9 11l3 3"/></Ic>,
  iot:       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/><path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2"/></svg>,
  settings:  <Ic><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></Ic>,
  chevdown:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  chevup:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>,
  phone:     <Ic><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></Ic>,
  headset:   <Ic><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></Ic>,
  logout:    <Ic><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></Ic>,
};

/* ── Nav config ── */
interface NavGroup {
  key: string; icon: string; label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV: NavGroup[] = [
  { key: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/' },
  { key: 'reg', icon: 'reg', label: 'Registrations', children: [
    { label: 'New Ride', href: '/new-rider' },
    { label: 'Retain Ride', href: '/retain-rider' },
    { label: 'Return Ride', href: '/return-ride' },
    { label: 'Vehicles', href: '/Extend Ride' },
    { label: 'Franchise Users', href: '/franchise-users' },
  ]},
  { key: 'vehicles', icon: 'vehicle', label: 'Vehicles', children: [
    { label: 'Vehicle List', href: '/vehicles/all' },
    { label: 'Map', href: '/vehicles/map' },
    { label: 'Active Rides', href: '/vehicles/active' },
    { label: 'History', href: '/vehicles/history' },
    { label: 'Vehicle Details', href: '/vehicles/detail' },
  ]},
  { key: 'renters', icon: 'renter', label: 'Riders', href: '/renters' },
  { key: 'battery', icon: 'battery', label: 'Battery', children: [
    { label: 'Battery Inventory', href: '/battery/inventory' },
    { label: 'Battery Inward', href: '/battery/inward' },
    { label: 'Battery List', href: '/battery/list' },
    { label: 'Swap History', href: '/battery/swap-history' },
  ]},
  { key: 'iot', icon: 'iot', label: 'IoT Devices', children: [
    { label: 'Inward', href: '/iot-devices/inward' },
    { label: 'Installed Devices', href: '/iot-devices/installed' },
    { label: 'Device Alerts', href: '/iot-devices/alerts' },
    { label: 'Device Map', href: '/iot-devices/map' },
  ]},
  { key: 'payment', icon: 'payment', label: 'Payments', children: [
    { label: 'Payment History', href: '/payment/history' },
    { label: 'Deposit Refunds', href: '/payment/refund' },
  ]},
  { key: 'reports', icon: 'reports', label: 'Reports', href: '/reports' },
  { key: 'alerts', icon: 'alerts', label: 'Alerts', href: '/alerts' },
  { key: 'zone', icon: 'zone', label: 'Zone Management', href: '/zones' },
  { key: 'franchise', icon: 'franchise', label: 'Franchise', children: [
    { label: 'Franchise Detail', href: '/franchise/detail' },
    { label: 'Subscription Packages', href: '/franchise/packages' },
    { label: 'Subscriptions', href: '/franchise/subscriptions' },
    { label: 'Transactions', href: '/franchise/transactions' },
    { label: 'Expenses', href: '/franchise/expenses' },
  ]},
  { key: 'usersrole', icon: 'usersrole', label: 'Users & Roles', children: [
    { label: 'Users', href: '/users' },
    { label: 'Roles', href: '/roles' },
  ]},
  { key: 'announcements', icon: 'announcements', label: 'Announcements', href: '/announcements' },
  { key: 'co2', icon: 'co2', label: 'Co2 Saving', href: '/co2-saving' },
  { key: 'settings', icon: 'settings', label: 'Settings', href: '/settings' },
];

/* ── CSS ── */
const CSS = `
/* ====== WHITE THEME (default) ====== */
.ev-sb {
  position: fixed; inset: 0 auto 0 0; width: 230px;
  background: #fff; border-right: 1px solid #E5E7EB;
  display: flex; flex-direction: column; z-index: 100;
  overflow: hidden;
  transition: background 0.3s, border-color 0.3s;
}

/* Hide scrollbar globally for sidebar nav */
.ev-sb-nav {
  flex: 1; padding: 8px 0;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.ev-sb-nav::-webkit-scrollbar { display: none; }

.ev-sb-logo {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px 13px;
  border-bottom: 1px solid #E5E7EB; flex-shrink: 0;
  transition: border-color 0.3s;
}

/* Theme toggle image button */
.ev-sb-theme-toggle {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; background: none; border: none;
  border-radius: 8px;
  transition: background 0.2s;
  padding: 0;
  flex-shrink: 0;
}
.ev-sb-theme-toggle:hover { background: rgba(0,0,0,0.06); }
.ev-sb-theme-toggle img {
  width: 26px; height: 26px; object-fit: contain;
}

.ev-sb-ni {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 16px; font-size: 12.5px; font-weight: 500;
  color: #374151; cursor: pointer; position: relative;
  transition: background .15s, color .15s;
  border-radius: 0; justify-content: space-between;
}
.ev-sb-ni:hover { background: #F9FAFB; }
.ev-sb-ni.act { background: #EEF2FF; color: #2a195c; font-weight: 600; }
.ev-sb-ni.act::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px; background: #2a195c; border-radius: 0 2px 2px 0;
}
.ev-sb-ni-l { display: flex; align-items: center; gap: 10px; }
.ev-sb-ni-ic {
  width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ev-sb-sub { padding: 0 0 0 42px; }
.ev-sb-sub-item {
  display: block; padding: 6px 16px; font-size: 12px;
  color: #6B7280; cursor: pointer; transition: background .1s, color .1s; border-radius: 0;
}
.ev-sb-sub-item:hover { background: #F9FAFB; color: #2a195c; }
.ev-sb-sub-item.act {
  color: #2a195c; background: #F5F3FF; font-weight: 600;
  border-radius: 6px; margin: 1px 8px 1px 0;
}

/* Help box */
.ev-sb-help { padding: 16px; border-top: 1px solid #E5E7EB; flex-shrink: 0; }
.ev-sb-help-box {
  background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 12px;
  padding: 16px; display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 6px; margin-bottom: 12px;
}
.ev-sb-help-orb {
  width: 36px; height: 36px; background: #E9D5FF; color: #7C3AED;
  border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ev-sb-help-t { font-size: 12.5px; font-weight: 700; color: #0F172A; }
.ev-sb-help-s { font-size: 11px; color: #64748B; line-height: 1.4; margin: 0; }
.ev-sb-contact {
  width: 100%; padding: 8px 12px; background: #FFF; color: #7C3AED;
  border: 1.5px solid #7C3AED; border-radius: 8px; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  cursor: pointer; font-family: inherit; transition: all 0.15s;
}
.ev-sb-contact:hover { background: #7C3AED; color: #FFF; }

/* User row */
.ev-sb-user {
  display: flex; align-items: center; gap: 9px;
  padding: 12px 14px; border-top: 1px solid #E5E7EB; cursor: pointer; flex-shrink: 0;
}
.ev-sb-user-av {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
}
.ev-sb-user-name { font-size: 12.5px; font-weight: 600; color: #111827; }
.ev-sb-user-role { font-size: 11px; color: #9CA3AF; }

/* ====== DARK THEME ====== */
.ev-sb.dark {
  background: linear-gradient(180deg, #13102b 0%, #1a1145 50%, #0f2518 100%);
  border-right: 1px solid rgba(255,255,255,0.06);
}
.ev-sb.dark .ev-sb-logo { border-bottom: 1px solid rgba(255,255,255,0.07); }
.ev-sb.dark .ev-sb-theme-toggle:hover { background: rgba(255,255,255,0.08); }
.ev-sb.dark .ev-sb-ni { color: rgba(255,255,255,1); }
.ev-sb.dark .ev-sb-ni:hover { background: rgba(255,255,255,0.06); color: #fff; }
.ev-sb.dark .ev-sb-ni.act { background: rgba(22,163,74,0.12); color: #4ade80; }
.ev-sb.dark .ev-sb-ni.act::before { background: #16a34a; }
.ev-sb.dark .ev-sb-sub-item { color: rgba(255,255,255,0.7); }
.ev-sb.dark .ev-sb-sub-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
.ev-sb.dark .ev-sb-sub-item.act { color: #4ade80; background: rgba(22,163,74,0.1); }
.ev-sb.dark .ev-sb-help { border-top: 1px solid rgba(255,255,255,0.06); }
.ev-sb.dark .ev-sb-help-box { background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.2); }
.ev-sb.dark .ev-sb-help-orb { background: rgba(139,92,246,0.2); color: #c4b5fd; }
.ev-sb.dark .ev-sb-help-t { color: #fff; }
.ev-sb.dark .ev-sb-help-s { color: rgba(255,255,255,0.45); }
.ev-sb.dark .ev-sb-contact { background: rgba(124,58,237,0.15); color: #c4b5fd; border: 1.5px solid rgba(124,58,237,0.35); }
.ev-sb.dark .ev-sb-contact:hover { background: #7C3AED; color: #fff; border-color: #7C3AED; }
.ev-sb.dark .ev-sb-user { border-top: 1px solid rgba(255,255,255,0.06); }
.ev-sb.dark .ev-sb-user-name { color: #ffffff; }
.ev-sb.dark .ev-sb-user-role { color: rgba(255,255,255,0.45); }

/* ====== COLLAPSED STATE ====== */
body.sb-collapsed .ev-sb { width: 68px; }
body.sb-collapsed .ev-main { margin-left: 68px !important; }
body.sb-collapsed .ev-sb-ni-l span:not(.ev-sb-ni-ic),
body.sb-collapsed .ev-sb-ni-txt,
body.sb-collapsed .ev-sb-ni > span:last-child,
body.sb-collapsed .ev-sb-sub,
body.sb-collapsed .ev-sb-help,
body.sb-collapsed .ev-sb-user > div:nth-child(2),
body.sb-collapsed .ev-sb-user > button {
  display: none !important;
}
body.sb-collapsed .ev-sb-ni { justify-content: center; padding: 12px 0; }
body.sb-collapsed .ev-sb-ni-l { gap: 0; }
body.sb-collapsed .ev-sb-user { justify-content: center; padding: 12px 0; }
body.sb-collapsed .ev-sb-logo { justify-content: center; padding: 14px 0; }

.ev-sb-collapse-btn {
  display: none;
}
`;

interface SidebarProps { activePath?: string; isOpen?: boolean }

export default function Sidebar({ activePath, isOpen = true }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const active = activePath || pathname;

  const [userName, setUserName] = useState('Akash Verma');
  const [userRole, setUserRole] = useState('Zone Admin');
  const [userAvatar, setUserAvatar] = useState('');
  const [permissions, setPermissions] = useState<any>(null);
  const [sidebarTheme, setSidebarTheme] = useState<'white' | 'dark'>('white');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const loadSession = () => {
      const name = localStorage.getItem("evegah_user_name");
      const roleVal = localStorage.getItem("evegah_role");
      const avatar = localStorage.getItem("evegah_user_avatar");
      const theme = localStorage.getItem("evegah_sidebar_theme") as 'white' | 'dark' | null;
      const collapsedStr = localStorage.getItem("evegah_sidebar_collapsed");

      if (name) setUserName(name);
      if (avatar) setUserAvatar(avatar);
      if (theme) setSidebarTheme(theme);
      
      if (collapsedStr === 'true') {
        setIsCollapsed(true);
        document.body.classList.add('sb-collapsed');
      } else {
        setIsCollapsed(false);
        document.body.classList.remove('sb-collapsed');
      }

      if (roleVal === 'admin') setUserRole('Platform Admin');
      else if (roleVal === 'zone_manager') setUserRole('Zone Admin');
      else if (roleVal === 'first_time_franchise') setUserRole('Franchise Manager');
      else if (roleVal === 'employee') setUserRole('Employee');

      try {
        const storedPerms = localStorage.getItem("evegah_user_permissions");
        if (storedPerms) setPermissions(JSON.parse(storedPerms));
        else setPermissions(null);
      } catch (e) {
        console.error("Error loading permissions:", e);
      }
    };

    if (typeof window !== 'undefined') {
      loadSession();
      window.addEventListener("evegah_role_changed", loadSession);
      window.addEventListener("evegah_sidebar_theme_changed", loadSession);
      
      const handleToggle = () => {
        setIsCollapsed(prev => {
          const next = !prev;
          localStorage.setItem('evegah_sidebar_collapsed', String(next));
          if (next) document.body.classList.add('sb-collapsed');
          else document.body.classList.remove('sb-collapsed');
          return next;
        });
      };
      window.addEventListener("evegah_sidebar_toggle", handleToggle);

      return () => {
        window.removeEventListener("evegah_role_changed", loadSession);
        window.removeEventListener("evegah_sidebar_theme_changed", loadSession);
        window.removeEventListener("evegah_sidebar_toggle", handleToggle);
      };
    }
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem('evegah_sidebar_collapsed', String(next));
    if (next) document.body.classList.add('sb-collapsed');
    else document.body.classList.remove('sb-collapsed');
  };

  const handleLogout = () => {
    localStorage.removeItem("evegah_role");
    localStorage.removeItem("evegah_user_name");
    localStorage.removeItem("evegah_user_email");
    localStorage.removeItem("evegah_user_avatar");
    localStorage.removeItem("evegah_user_permissions");
    window.dispatchEvent(new Event("evegah_role_changed"));
    router.push('/login');
  };

  const KEY_MAP: Record<string, string> = {
    dashboard: 'Dashboard', reg: 'Dashboard', vehicles: 'Vehicles',
    renters: 'Riders', battery: 'Battery', iot: 'IoT Devices',
    payment: 'Payments', reports: 'Reports', alerts: 'Alerts',
    zone: 'Zone Management', franchise: 'Franchise', settings: 'Settings',
    usersrole: 'Settings', announcements: 'Dashboard', co2: 'Dashboard'
  };

  const filteredNav = NAV.filter(g => {
    if (!permissions) return true;
    const permKey = KEY_MAP[g.key];
    if (!permKey) return true;
    const permObj = permissions[permKey];
    if (permObj && permObj.access === false) return false;
    return true;
  });

  const defaultOpen = filteredNav.reduce((acc, g) => {
    if (g.children?.some(c => c.href === active)) acc[g.key] = true;
    return acc;
  }, {} as Record<string, boolean>);

  const [open, setOpen] = useState<Record<string, boolean>>(defaultOpen);
  const toggle = (key: string) => setOpen(p => ({ ...p, [key]: !p[key] }));

  const isDark = sidebarTheme === 'dark';
  const chevColor = isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <aside className={`ev-sb${isDark ? ' dark' : ''}`} style={{ display: isOpen ? undefined : 'none' }}>
        {/* Logo */}
        <div className="ev-sb-logo">
          {!isCollapsed ? (
            <EvegahLogo height={40} dark={isDark} />
          ) : (
            <img
              src={isDark ? '/assets/white_theme_toggle.png' : '/assets/black_theme_toggle.png'}
              alt="Logo"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Nav */}
        <nav className="ev-sb-nav">
          {filteredNav.map(g => {
            const isGroupActive = g.href === active || g.children?.some(c => c.href === active);
            const isOpenGroup = open[g.key];

            return (
              <div key={g.key}>
                {g.href ? (
                  <Link href={g.href} className={`ev-sb-ni ${isGroupActive ? 'act' : ''}`}>
                    <div className="ev-sb-ni-l">
                      <span className="ev-sb-ni-ic">{icons[g.icon]}</span>
                      <span className="ev-sb-ni-txt">{g.label}</span>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={`ev-sb-ni ${isGroupActive && !isOpenGroup ? 'act' : ''}`}
                    onClick={() => toggle(g.key)}
                  >
                    <div className="ev-sb-ni-l">
                      <span className="ev-sb-ni-ic">{icons[g.icon]}</span>
                      <span className="ev-sb-ni-txt">{g.label}</span>
                    </div>
                    <span style={{ color: chevColor }}>{isOpenGroup ? icons.chevup : icons.chevdown}</span>
                  </div>
                )}

                {g.children && isOpenGroup && (
                  <div className="ev-sb-sub">
                    {g.children.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`ev-sb-sub-item ${active === c.href ? 'act' : ''}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Help box */}
        <div className="ev-sb-help">
          <div className="ev-sb-help-box">
            <div className="ev-sb-help-orb">
              {icons.headset}
            </div>
            <div>
              <div className="ev-sb-help-t">Need Help?</div>
              <p className="ev-sb-help-s">Our support team is here to help you 24/7</p>
            </div>
          </div>
          <button className="ev-sb-contact">
            <span style={{ display: 'flex', alignItems: 'center' }}>{icons.phone}</span>
            Contact Support
          </button>
        </div>

        {/* User profile */}
        <div className="ev-sb-user">
          {userAvatar ? (
            <img
              src={userAvatar}
              className="ev-sb-user-av"
              style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              alt={userName}
            />
          ) : (
            <div className="ev-sb-user-av">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }} onClick={() => router.push('/settings')}>
            <div className="ev-sb-user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userName}</div>
            <div className="ev-sb-user-role">{userRole}</div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            style={{
              background: 'none', border: 'none',
              color: isDark ? 'rgba(239,68,68,0.8)' : '#EF4444',
              cursor: 'pointer', padding: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '6px', transition: 'background 0.2s', flexShrink: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.background = isDark ? 'rgba(239,68,68,0.12)' : '#FEE2E2'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            {icons.logout}
          </button>
        </div>
      </aside>
    </>
  );
}

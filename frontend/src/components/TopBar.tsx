"use client";

const CSS = `
.ev-tb{height:68px;background:#fff;border-bottom:1px solid #E5E7EB;display:flex;align-items:center;padding:0 22px;gap:12px;position:sticky;top:0;z-index:90;flex-shrink:0}
.ev-tb-hamburger{width:34px;height:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4.5px;cursor:pointer;flex-shrink:0}
.ev-tb-hamburger span{display:block;width:18px;height:2px;background:#6B7280;border-radius:2px}
.ev-tb-user{display:flex;align-items:center;gap:9px}
.ev-tb-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#8B5CF6);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0}
.ev-tb-hello{font-size:13.5px;font-weight:700;color:#111827}
.ev-tb-role{font-size:11px;color:#9CA3AF}
.ev-tb-spacer{flex:1}
.ev-tb-zone{display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid #E5E7EB;border-radius:8px;cursor:pointer;background:#fff}
.ev-tb-zone-t{font-size:12.5px;font-weight:500;color:#374151}
.ev-tb-bell{position:relative;width:36px;height:36px;background:#fff;border:1px solid #E5E7EB;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#6B7280;cursor:pointer;flex-shrink:0}
.ev-tb-bell-dot{position:absolute;top:-3px;right:-3px;width:15px;height:15px;background:#2a195c;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#fff;border:2px solid #fff}
`;

const IBell = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IPin = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IChevD = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface TopBarProps {
  title?: string;
  subtitle?: string;
  onToggle?: () => void;
}

export default function TopBar({
  title = "Hello, Akash",
  subtitle = "Zone Admin",
  onToggle,
}: TopBarProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="ev-tb">
        {/* Hamburger */}
        <div className="ev-tb-hamburger" onClick={() => onToggle?.()}>
          <span />
          <span />
          <span />
        </div>

        {/* User greeting */}
        <div className="ev-tb-user">
          <div className="ev-tb-av">AV</div>
          <div>
            <div className="ev-tb-hello">{title} 👋</div>
            <div className="ev-tb-role">{subtitle}</div>
          </div>
        </div>

        <div className="ev-tb-spacer" />

        {/* Zone selector */}
        <div className="ev-tb-zone">
          <span style={{ color: "#2a195c" }}>
            <IPin />
          </span>
          <span className="ev-tb-zone-t">Connaught Place Zone</span>
          <span style={{ color: "#9CA3AF" }}>
            <IChevD />
          </span>
        </div>

        {/* Bell */}
        <button className="ev-tb-bell">
          <IBell />
          <span className="ev-tb-bell-dot">1</span>
        </button>
      </header>
    </>
  );
}

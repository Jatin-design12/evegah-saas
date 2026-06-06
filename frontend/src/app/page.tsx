"use client";
import { useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

const CSS = `
.ev-shell{display:flex;min-height:100vh}
.ev-main{margin-left:230px;display:flex;flex-direction:column;min-height:100vh;background:#F3F4F9}
.ev-body{padding:20px 22px 70px;flex:1}

/* Stat Cards */
.ev-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.ev-sc{background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:15px 16px 13px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.ev-sc-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2px}
.ev-sc-ic{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ic-purple{background:#EEF2FF;color:#2a195c}
.ic-green{background:#DCFCE7;color:#16A34A}
.ic-orange{background:#FEF3C7;color:#D97706}
.ic-blue{background:#EFF6FF;color:#2563EB}
.ic-teal{background:#F0FDFA;color:#0D9488}
.ev-sc-tit{font-size:11.5px;font-weight:500;color:#6B7280}
.ev-sc-per{font-size:10.5px;color:#9CA3AF;margin-top:1px}
.ev-sc-val{font-size:28px;font-weight:800;color:#111827;line-height:1;margin:6px 0}
.ev-sc-bot{display:flex;align-items:center;justify-content:space-between}
.ev-sc-chg{display:flex;align-items:center;gap:3px;font-size:11.5px;font-weight:600}
.up{color:#16A34A}.dn{color:#DC2626}
.ev-sc-lbl{font-size:11px;color:#9CA3AF;margin-left:3px}

/* 2-column grid */
.ev-grid2{display:grid;grid-template-columns:1fr 276px;gap:18px;align-items:start}

/* Create Request */
.ev-cr-h{font-size:15.5px;font-weight:700;color:#111827}
.ev-cr-sh{font-size:12.5px;color:#6B7280;margin-top:3px;margin-bottom:14px}
.ev-cr-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:22px}
.ev-rc{background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:20px 14px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;transition:box-shadow .18s,border-color .18s,transform .15s}
.ev-rc:hover{box-shadow:0 4px 14px rgba(0,0,0,.1);border-color:#6366F1;transform:translateY(-1px)}
.ev-rc-orb{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:11px}
.orb-purple{background:#EEF2FF;color:#2a195c}
.orb-green{background:#DCFCE7;color:#16A34A}
.orb-orange{background:#FEF3C7;color:#D97706}
.orb-blue{background:#EFF6FF;color:#2563EB}
.orb-teal{background:#F0FDFA;color:#0D9488}
.ev-rc-tit{font-size:13px;font-weight:700;color:#111827;margin-bottom:5px}
.ev-rc-desc{font-size:11.5px;color:#6B7280;line-height:1.45;margin-bottom:11px}
.ev-rc-lnk{font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px}
.lnk-purple{color:#2a195c}.lnk-green{color:#16A34A}.lnk-orange{color:#D97706}.lnk-blue{color:#2563EB}.lnk-teal{color:#0D9488}

/* Table */
.ev-tcard{background:#fff;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden}
.ev-tcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #E5E7EB}
.ev-tcard-tit{font-size:14.5px;font-weight:700;color:#111827}
.ev-va{font-size:12px;font-weight:600;color:#2a195c}
.ev-dt{width:100%}
.ev-dt th{font-size:11px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em;text-align:left;padding:9px 18px;background:#FAFBFD;border-bottom:1px solid #E5E7EB}
.ev-dt td{padding:11px 18px;font-size:12.5px;color:#111827;border-bottom:1px solid #F3F4F6;vertical-align:middle}
.ev-dt tr:last-child td{border-bottom:none}
.ev-dt tr:hover td{background:#FAFBFC}
.ev-rid{font-family:'SFMono-Regular',Consolas,monospace;font-size:11.5px;color:#6B7280}
.ev-type-cell{display:flex;align-items:center;gap:8px}
.ev-type-ic{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ev-sbadge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11.5px;font-weight:600;white-space:nowrap}
.s-completed{background:#DCFCE7;color:#15803D}
.s-pending{background:#FEF9C3;color:#A16207}
.s-in_progress{background:#DBEAFE;color:#1D4ED8}
.ev-eye-btn{width:28px;height:28px;border:1px solid #E5E7EB;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#9CA3AF;background:#fff;cursor:pointer}
.ev-eye-btn:hover{border-color:#2a195c;color:#2a195c}
.ev-tcard-ft{display:flex;align-items:center;justify-content:space-between;padding:10px 18px;border-top:1px solid #E5E7EB}
.ev-tcard-ft-lbl{font-size:12px;color:#9CA3AF}
.ev-pg{display:flex;align-items:center;gap:3px}
.ev-pgb{width:28px;height:28px;border:1px solid #E5E7EB;border-radius:6px;background:#fff;font-size:12px;font-weight:500;color:#6B7280;display:flex;align-items:center;justify-content:center;cursor:pointer}
.ev-pgb.cur{background:#2a195c;color:#fff;border-color:#2a195c}

/* Right panel */
.ev-rp{display:flex;flex-direction:column;gap:14px}
.ev-pc{background:#fff;border:1px solid #E5E7EB;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.06);overflow:hidden}
.ev-pc-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 15px;border-bottom:1px solid #E5E7EB}
.ev-pc-tit{font-size:13.5px;font-weight:700;color:#111827}
.ev-pc-dt{font-size:11px;color:#9CA3AF}
.ev-sum-row{display:flex;align-items:center;justify-content:space-between;padding:9px 15px;border-bottom:1px solid #F3F4F6}
.ev-sum-row:last-of-type{border-bottom:none}
.ev-sum-l{display:flex;align-items:center;gap:8px}
.ev-sum-ic{width:20px;height:20px;border-radius:5px;display:flex;align-items:center;justify-content:center}
.ev-sum-lbl{font-size:12.5px;color:#6B7280}
.ev-sum-val{font-size:13px;font-weight:700;color:#111827}
.ev-pc-link{padding:10px 15px;border-top:1px solid #E5E7EB}
.ev-pc-link a{font-size:12px;font-weight:600;color:#2a195c;display:flex;align-items:center;gap:4px}
.ev-donut-wrap{padding:14px 15px;display:flex;flex-direction:column;align-items:center;gap:14px}
.ev-donut-rel{position:relative;width:140px;height:140px;display:flex;align-items:center;justify-content:center}
.ev-donut-center{position:absolute;text-align:center}
.ev-donut-num{font-size:22px;font-weight:800;color:#111827;line-height:1}
.ev-donut-lbl{font-size:10.5px;color:#9CA3AF;margin-top:2px}
.ev-legend{width:100%;display:flex;flex-direction:column;gap:6px}
.ev-leg{display:flex;align-items:center;justify-content:space-between}
.ev-leg-l{display:flex;align-items:center;gap:7px}
.ev-leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.ev-leg-lbl{font-size:12px;color:#6B7280}
.ev-leg-val{font-size:12px;font-weight:600;color:#111827}
.ev-leg-pct{font-size:10.5px;color:#9CA3AF;font-weight:400;margin-left:2px}
.ev-kn-row{display:flex;align-items:center;gap:10px;padding:10px 15px;border-bottom:1px solid #F3F4F6;cursor:pointer;transition:background .1s}
.ev-kn-row:last-of-type{border-bottom:none}
.ev-kn-row:hover{background:#FAFBFC}
.ev-kn-ic{width:32px;height:32px;background:#EEF2FF;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#2a195c;flex-shrink:0}
.ev-kn-t{font-size:12.5px;font-weight:600;color:#111827}
.ev-kn-s{font-size:11px;color:#9CA3AF;margin-top:1px}
.ev-kn-ft{padding:10px 15px;border-top:1px solid #E5E7EB;text-align:center}
.ev-kn-ft a{font-size:12px;font-weight:600;color:#2a195c;display:inline-flex;align-items:center;gap:4px}
.ev-fbar{position:fixed;bottom:0;left:230px;right:0;background:#FFFBEB;border-top:1px solid #FDE68A;padding:9px 22px;display:flex;align-items:center;justify-content:space-between;z-index:90}
.ev-fbar-l{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#92400E}
.ev-fbar-r{font-size:12px;font-weight:600;color:#2a195c;display:flex;align-items:center;gap:4px}
`;

/* ── icons ── */
const SI = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const Sv = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 24 24" {...SI} {...p} />
);

const IClip = () => (
  <Sv>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
  </Sv>
);
const ICheck = () => (
  <Sv>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Sv>
);
const IClock = () => (
  <Sv>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Sv>
);
const IUsers = () => (
  <Sv>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Sv>
);
const IUserP = () => (
  <Sv>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </Sv>
);
const IUserCh = () => (
  <Sv>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </Sv>
);
const IRot = () => (
  <Sv>
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.49" />
  </Sv>
);
const ICal = () => (
  <Sv>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="10" y1="16" x2="14" y2="16" />
  </Sv>
);
const IBat = () => (
  <Sv>
    <rect x="1" y="6" width="18" height="12" rx="2" />
    <line x1="23" y1="13" x2="23" y2="11" />
    <line x1="7" y1="12" x2="11" y2="8" />
    <line x1="11" y1="8" x2="11" y2="12" />
    <line x1="11" y1="12" x2="15" y2="12" />
  </Sv>
);
const IEye = () => (
  <Sv>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Sv>
);
const IBook = () => (
  <Sv>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </Sv>
);
const IDoc = () => (
  <Sv>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </Sv>
);
const IFAQ = () => (
  <Sv>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </Sv>
);
const IInfo = () => (
  <Sv>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Sv>
);
const ITrendU = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const ITrendD = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);
const IArr = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IChR = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IChL = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IExt = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const Spark = ({ pts, color }: { pts: string; color: string }) => (
  <svg width="82" height="34" viewBox="0 0 82 34" fill="none">
    <polyline
      points={pts}
      stroke={color}
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function DonutChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const DPR = window.devicePixelRatio || 2,
      SZ = 140;
    c.width = SZ * DPR;
    c.height = SZ * DPR;
    c.style.width = SZ + "px";
    c.style.height = SZ + "px";
    ctx.scale(DPR, DPR);
    const cx = SZ / 2,
      cy = SZ / 2,
      R = 56,
      r = 37;
    const slices = [
      { v: 96, color: "#22C55E" },
      { v: 28, color: "#3B82F6" },
      { v: 32, color: "#F59E0B" },
      { v: 12, color: "#EF4444" },
      { v: 20, color: "#6B7280" },
    ];
    let a = -Math.PI / 2;
    slices.forEach(({ v, color }) => {
      const da = (v / 208) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a, a + da);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      a += da;
    });
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    a = -Math.PI / 2;
    slices.forEach(({ v }) => {
      ctx.beginPath();
      ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
      a += (v / 208) * 2 * Math.PI;
    });
  }, []);
  return <canvas ref={ref} />;
}

const ROWS = [
  {
    id: "REQ-2024-0518-0012",
    type: "new_rider",
    name: "Amit Kumar",
    mob: "+91 98765 43210",
    st: "completed",
    d1: "May 18, 2024",
    d2: "10:30 AM",
  },
  {
    id: "REQ-2024-0518-0011",
    type: "retain_rider",
    name: "Neha Gupta",
    mob: "+91 91254 56789",
    st: "pending",
    d1: "May 18, 2024",
    d2: "09:45 AM",
  },
  {
    id: "REQ-2024-0518-0010",
    type: "return_ride",
    name: "Rohit Singh",
    mob: "+91 99876 54321",
    st: "in_progress",
    d1: "May 18, 2024",
    d2: "09:15 AM",
  },
  {
    id: "REQ-2024-0518-0009",
    type: "extend_ride",
    name: "Sneha Reddy",
    mob: "+91 87654 32109",
    st: "completed",
    d1: "May 18, 2024",
    d2: "08:30 AM",
  },
  {
    id: "REQ-2024-0518-0008",
    type: "battery_swap",
    name: "Vikram Patel",
    mob: "+91 78945 61230",
    st: "pending",
    d1: "May 18, 2024",
    d2: "08:05 AM",
  },
];
const T_CFG: Record<
  string,
  { label: string; ic: string; icon: React.ReactNode }
> = {
  new_rider: { label: "New Rider", ic: "ic-purple", icon: <IUserP /> },
  retain_rider: { label: "Retain Rider", ic: "ic-green", icon: <IUserCh /> },
  return_ride: { label: "Return Ride", ic: "ic-orange", icon: <IRot /> },
  extend_ride: { label: "Extend Ride", ic: "ic-blue", icon: <ICal /> },
  battery_swap: { label: "Battery Swap", ic: "ic-teal", icon: <IBat /> },
};
const S_LBL: Record<string, string> = {
  completed: "Completed",
  pending: "Pending",
  in_progress: "In Progress",
};

export default function Dashboard() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ev-shell">
        <Sidebar />
        <div className="ev-main">
          <TopBar />
          <div className="ev-body">
            {/* Stat Cards */}
            <div className="ev-stats">
              {[
                {
                  ic: <IClip />,
                  cls: "ic-purple",
                  tit: "Requests Created",
                  per: "This Month",
                  v: 128,
                  chg: 18.4,
                  up: true,
                  pts: "0,28 14,22 28,18 40,20 52,12 64,15 76,8 82,10",
                  clr: "#6366F1",
                },
                {
                  ic: <ICheck />,
                  cls: "ic-green",
                  tit: "Completed Requests",
                  per: "This Month",
                  v: 96,
                  chg: 16.7,
                  up: true,
                  pts: "0,30 14,24 28,18 40,14 52,18 64,10 76,13 82,6",
                  clr: "#22C55E",
                },
                {
                  ic: <IClock />,
                  cls: "ic-orange",
                  tit: "Pending Requests",
                  per: "Currently",
                  v: 32,
                  chg: 5.2,
                  up: false,
                  pts: "0,8 14,13 28,10 40,18 52,14 64,22 76,17 82,20",
                  clr: "#F59E0B",
                },
                {
                  ic: <IUsers />,
                  cls: "ic-teal",
                  tit: "Total Riders",
                  per: "Managed",
                  v: 356,
                  chg: 12.3,
                  up: true,
                  pts: "0,22 14,20 28,24 40,16 52,20 64,13 76,17 82,11",
                  clr: "#14B8A6",
                },
              ].map((c) => (
                <div className="ev-sc" key={c.tit}>
                  <div className="ev-sc-top">
                    <div>
                      <div className="ev-sc-tit">{c.tit}</div>
                      <div className="ev-sc-per">{c.per}</div>
                    </div>
                    <div className={`ev-sc-ic ${c.cls}`}>{c.ic}</div>
                  </div>
                  <div className="ev-sc-val">{c.v.toLocaleString()}</div>
                  <div className="ev-sc-bot">
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <span className={`ev-sc-chg ${c.up ? "up" : "dn"}`}>
                        {c.up ? <ITrendU /> : <ITrendD />}&nbsp;{c.chg}%
                      </span>
                      <span className="ev-sc-lbl">from last month</span>
                    </div>
                    <Spark pts={c.pts} color={c.clr} />
                  </div>
                </div>
              ))}
            </div>

            {/* 2-col grid */}
            <div className="ev-grid2">
              <div>
                {/* Create New Request */}
                <div className="ev-cr-h">Create New Request</div>
                <div className="ev-cr-sh">
                  Select the type of request you want to create on behalf of the
                  rider.
                </div>
                <div className="ev-cr-grid">
                  {[
                    {
                      oc: "orb-purple",
                      icon: <IUserP />,
                      tit: "New Rider",
                      desc: "Onboard a new rider and create a new ride.",
                      lnk: "Create New Rider",
                      lc: "lnk-purple",
                      href: "/new-rider",
                    },
                    {
                      oc: "orb-green",
                      icon: <IUserCh />,
                      tit: "Retain Rider",
                      desc: "Retain existing rider and start a new ride.",
                      lnk: "Retain Rider",
                      lc: "lnk-green",
                      href: "/retain-rider",
                    },
                    {
                      oc: "orb-orange",
                      icon: <IRot />,
                      tit: "Return Ride",
                      desc: "Complete the ride and initiate return.",
                      lnk: "Return Ride",
                      lc: "lnk-orange",
                      href: "/return-ride",
                    },
                    {
                      oc: "orb-blue",
                      icon: <ICal />,
                      tit: "Extend Ride",
                      desc: "Extend the current ride duration.",
                      lnk: "Extend Ride",
                      lc: "lnk-blue",
                      href: "/extend-ride",
                    },
                    {
                      oc: "orb-teal",
                      icon: <IBat />,
                      tit: "Battery Swap",
                      desc: "Request battery swap for active ride.",
                      lnk: "Battery Swap",
                      lc: "lnk-teal",
                      href: "/battery-swap",
                    },
                  ].map((c) => (
                    <a href={c.href} className="ev-rc" key={c.tit}>
                      <div className={`ev-rc-orb ${c.oc}`}>{c.icon}</div>
                      <div className="ev-rc-tit">{c.tit}</div>
                      <div className="ev-rc-desc">{c.desc}</div>
                      <span className={`ev-rc-lnk ${c.lc}`}>
                        {c.lnk} <IArr />
                      </span>
                    </a>
                  ))}
                </div>

                {/* Table */}
                <div className="ev-tcard">
                  <div className="ev-tcard-hdr">
                    <div className="ev-tcard-tit">My Recent Requests</div>
                    <a className="ev-va" href="/registrations">
                      View All
                    </a>
                  </div>
                  <table className="ev-dt">
                    <thead>
                      <tr>
                        <th>Request ID</th>
                        <th>Type</th>
                        <th>Rider Name</th>
                        <th>Mobile Number</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROWS.map((r) => {
                        const t = T_CFG[r.type];
                        return (
                          <tr key={r.id}>
                            <td className="ev-rid">{r.id}</td>
                            <td>
                              <div className="ev-type-cell">
                                <div className={`ev-type-ic ${t.ic}`}>
                                  {t.icon}
                                </div>
                                <span
                                  style={{ fontSize: 12.5, fontWeight: 500 }}
                                >
                                  {t.label}
                                </span>
                              </div>
                            </td>
                            <td style={{ fontWeight: 500 }}>{r.name}</td>
                            <td style={{ color: "#6B7280" }}>{r.mob}</td>
                            <td>
                              <span className={`ev-sbadge s-${r.st}`}>
                                {S_LBL[r.st]}
                              </span>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  color: "#111827",
                                }}
                              >
                                {r.d1}
                              </div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                                {r.d2}
                              </div>
                            </td>
                            <td>
                              <button className="ev-eye-btn">
                                <IEye />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="ev-tcard-ft">
                    <span className="ev-tcard-ft-lbl">
                      Showing 1 to 5 of 12 requests
                    </span>
                    <div className="ev-pg">
                      <button className="ev-pgb" disabled>
                        <IChL />
                      </button>
                      <button className="ev-pgb cur">1</button>
                      <button className="ev-pgb">2</button>
                      <button className="ev-pgb">3</button>
                      <button className="ev-pgb">
                        <IChR />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div className="ev-rp">
                <div className="ev-pc">
                  <div className="ev-pc-hdr">
                    <div className="ev-pc-tit">Today&apos;s Summary</div>
                    <div className="ev-pc-dt">May 18, 2024</div>
                  </div>
                  {[
                    {
                      ic: <IClip />,
                      cls: "ic-purple",
                      lbl: "Requests Created",
                      v: 12,
                    },
                    {
                      ic: <ICheck />,
                      cls: "ic-green",
                      lbl: "Requests Completed",
                      v: 8,
                    },
                    {
                      ic: <IClock />,
                      cls: "ic-orange",
                      lbl: "Pending Requests",
                      v: 4,
                    },
                    {
                      ic: <IBat />,
                      cls: "ic-teal",
                      lbl: "Battery Swap Requests",
                      v: 6,
                    },
                  ].map((s) => (
                    <div className="ev-sum-row" key={s.lbl}>
                      <div className="ev-sum-l">
                        <div className={`ev-sum-ic ${s.cls}`}>{s.ic}</div>
                        <span className="ev-sum-lbl">{s.lbl}</span>
                      </div>
                      <span className="ev-sum-val">{s.v}</span>
                    </div>
                  ))}
                  <div className="ev-pc-link">
                    <a href="/reports">
                      View Full Report <IArr />
                    </a>
                  </div>
                </div>

                <div className="ev-pc">
                  <div className="ev-pc-hdr">
                    <div className="ev-pc-tit">Request Status Overview</div>
                  </div>
                  <div className="ev-donut-wrap">
                    <div className="ev-donut-rel">
                      <DonutChart />
                      <div className="ev-donut-center">
                        <div className="ev-donut-num">208</div>
                        <div className="ev-donut-lbl">Total</div>
                      </div>
                    </div>
                    <div className="ev-legend">
                      {[
                        { c: "#22C55E", l: "Completed", v: 96, p: "46%" },
                        { c: "#3B82F6", l: "In Progress", v: 28, p: "13%" },
                        { c: "#F59E0B", l: "Pending", v: 32, p: "15%" },
                        { c: "#EF4444", l: "Cancelled", v: 12, p: "6%" },
                        { c: "#6B7280", l: "Rejected", v: 20, p: "10%" },
                      ].map((l) => (
                        <div className="ev-leg" key={l.l}>
                          <div className="ev-leg-l">
                            <div
                              className="ev-leg-dot"
                              style={{ background: l.c }}
                            />
                            <span className="ev-leg-lbl">{l.l}</span>
                          </div>
                          <span className="ev-leg-val">
                            {l.v}
                            <span className="ev-leg-pct"> ({l.p})</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ev-pc">
                  <div className="ev-pc-hdr">
                    <div className="ev-pc-tit">Knowledge &amp; Resources</div>
                  </div>
                  {[
                    {
                      ic: <IBook />,
                      t: "Rider Onboarding Guide",
                      s: "Learn how to onboard a new rider",
                    },
                    {
                      ic: <IDoc />,
                      t: "Ride Policies & Guidelines",
                      s: "View policies and important guidelines",
                    },
                    {
                      ic: <IFAQ />,
                      t: "FAQ",
                      s: "Get answers to common questions",
                    },
                  ].map((k) => (
                    <a className="ev-kn-row" href="/knowledge" key={k.t}>
                      <div className="ev-kn-ic">{k.ic}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="ev-kn-t">{k.t}</div>
                        <div className="ev-kn-s">{k.s}</div>
                      </div>
                      <span style={{ color: "#9CA3AF", display: "flex" }}>
                        <IChR />
                      </span>
                    </a>
                  ))}
                  <div className="ev-kn-ft">
                    <a href="/knowledge">
                      Visit Knowledge Base <IExt />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ev-fbar">
            <div className="ev-fbar-l">
              <span style={{ color: "#D97706", display: "flex" }}>
                <IInfo />
              </span>
              Make sure to collect all required documents and verify rider
              details before submitting any request.
            </div>
            <a className="ev-fbar-r" href="/knowledge/guidelines">
              View Guidelines <IArr />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

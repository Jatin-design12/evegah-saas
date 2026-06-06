'use client';
import { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import { AttendanceContent, AttendanceCSS } from '@/app/attendance/page';

/* ──────────────────────────────────────────────────────────────
   EMPLOYEE PROFILE · User Details
   ────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.ep-shell{display:flex;min-height:100vh;background:#F3F4F9;font-family:Inter,sans-serif;}
.ep-main{margin-left:0;display:flex;flex-direction:column;min-height:100vh;width:100%;}
.ep-page{flex:1;padding:0 28px 80px;}

/* breadcrumb */
.ep-bc{display:flex;align-items:center;gap:6px;padding:14px 0 0;font-size:12px;color:#9CA3AF;flex-wrap:wrap;}
.ep-bc a,.ep-bc-link{color:#9CA3AF;text-decoration:none;transition:color .15s;cursor:pointer;}
.ep-bc a:hover,.ep-bc-link:hover{color:#4F46E5;}
.ep-bc-sep{color:#D1D5DB;}
.ep-bc-cur{color:#4F46E5;font-weight:600;}

/* title row */
.ep-title-row{display:flex;align-items:flex-start;justify-content:space-between;margin:12px 0 18px;gap:16px;}
.ep-h1{font-size:22px;font-weight:800;color:#111827;margin:0 0 4px;}
.ep-sub{font-size:13px;color:#6B7280;margin:0;}
.ep-btn-row{display:flex;align-items:center;gap:10px;flex-shrink:0;}
.ep-actions-btn{display:flex;align-items:center;gap:6px;padding:9px 16px;background:#fff;border:1.5px solid #E5E7EB;border-radius:10px;font-size:13px;font-weight:600;color:#374151;cursor:pointer;font-family:inherit;transition:border-color .15s;}
.ep-actions-btn:hover{border-color:#4F46E5;color:#4F46E5;}
.ep-edit-btn{display:flex;align-items:center;gap:7px;padding:9px 20px;background:#4F46E5;border:none;border-radius:10px;font-size:13px;font-weight:700;color:#fff;cursor:pointer;font-family:inherit;transition:background .15s;}
.ep-edit-btn:hover{background:#4338CA;}

/* profile header card */
.ep-profile-card{background:#fff;border:1px solid #E5E7EB;border-radius:14px;padding:22px 24px;margin-bottom:0;box-shadow:0 1px 4px rgba(0,0,0,.06);display:flex;align-items:flex-start;gap:22px;}
.ep-avatar-wrap{width:100px;height:100px;border-radius:50%;overflow:hidden;flex-shrink:0;border:3px solid #E0E7FF;background:#EEF2FF;}
.ep-user-section{flex:1;min-width:0;}
.ep-user-name-row{display:flex;align-items:center;gap:10px;margin-bottom:4px;}
.ep-user-name{font-size:20px;font-weight:800;color:#111827;}
.ep-active-badge{background:#DCFCE7;color:#16A34A;border:1px solid #BBF7D0;border-radius:6px;font-size:11.5px;font-weight:700;padding:3px 10px;}
.ep-user-role{font-size:14px;color:#6B7280;margin-bottom:8px;}
.ep-user-meta{display:flex;flex-direction:column;gap:5px;}
.ep-meta-row{display:flex;align-items:center;gap:7px;font-size:13px;color:#374151;}
.ep-meta-label{color:#9CA3AF;font-size:12px;min-width:68px;}
.ep-meta-val{font-weight:600;color:#111827;}
.ep-meta-val.phone{font-size:14.5px;font-weight:800;}
.ep-date-section{display:flex;flex-direction:column;gap:10px;flex-shrink:0;min-width:240px;}
.ep-date-row{display:flex;align-items:flex-start;gap:9px;font-size:13px;}
.ep-date-ic{color:#9CA3AF;display:flex;flex-shrink:0;margin-top:1px;}
.ep-date-label{color:#6B7280;font-size:12px;white-space:nowrap;}
.ep-date-val{font-weight:600;color:#111827;font-size:12.5px;}

/* tabs */
.ep-tabs-bar{display:flex;align-items:center;background:#fff;border:1px solid #E5E7EB;border-radius:0 0 0 0;border-top:none;border-bottom:none;padding:0 24px;box-shadow:0 1px 0 #E5E7EB;margin-bottom:20px;}
.ep-tab{display:flex;align-items:center;gap:7px;padding:14px 18px;font-size:13.5px;font-weight:600;color:#6B7280;cursor:pointer;border-bottom:2.5px solid transparent;transition:color .15s,border-color .15s;user-select:none;white-space:nowrap;}
.ep-tab.active{color:#4F46E5;border-bottom-color:#4F46E5;}
.ep-tab:hover:not(.active){color:#374151;}
.ep-tabs-card{background:#fff;border:1px solid #E5E7EB;border-radius:0 0 14px 14px;box-shadow:0 1px 4px rgba(0,0,0,.06);border-top:none;}

/* main 2-col layout */
.ep-layout{display:grid;grid-template-columns:1fr 280px;gap:20px;align-items:start;}

/* card */
.ep-card{background:#fff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;margin-bottom:16px;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.ep-card-hdr{padding:16px 20px;border-bottom:1px solid #F3F4F6;display:flex;align-items:center;justify-content:space-between;}
.ep-card-title{font-size:14px;font-weight:700;color:#111827;}
.ep-card-sub{font-size:12px;color:#6B7280;margin-top:2px;}
.ep-card-body{padding:16px 20px;}

/* permissions summary */
.ep-perm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
.ep-perm-box{background:#FAFAFA;border:1px solid #E5E7EB;border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;}
.ep-perm-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ep-perm-num{font-size:22px;font-weight:800;color:#111827;line-height:1;}
.ep-perm-lbl{font-size:11.5px;color:#9CA3AF;margin-top:2px;}
.ep-view-link{display:flex;align-items:center;gap:4px;font-size:11.5px;color:#4F46E5;font-weight:600;cursor:pointer;margin-top:4px;}
.ep-view-link:hover{text-decoration:underline;}

/* module access */
.ep-module-sec-hdr{font-size:14px;font-weight:700;color:#111827;margin-bottom:4px;}
.ep-module-sec-sub{font-size:12px;color:#6B7280;margin-bottom:12px;}
.ep-module-table{width:100%;border-collapse:collapse;}
.ep-module-table th{text-align:left;font-size:11.5px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.05em;padding:8px 12px;background:#F9FAFB;border-bottom:1px solid #E5E7EB;}
.ep-module-table td{padding:10px 12px;border-bottom:1px solid #F3F4F6;font-size:13px;color:#374151;vertical-align:middle;}
.ep-module-table tr:last-child td{border-bottom:none;}
.ep-module-row-name{display:flex;align-items:center;gap:9px;font-weight:600;color:#111827;}
.ep-mod-ic{width:28px;height:28px;border-radius:7px;background:#EEF2FF;display:flex;align-items:center;justify-content:center;color:#4F46E5;flex-shrink:0;}
.ep-access-badge{border-radius:6px;font-size:11.5px;font-weight:700;padding:3px 10px;display:inline-block;}
.ep-access-full{background:#DCFCE7;color:#16A34A;}
.ep-access-viewedit{background:#EEF2FF;color:#4F46E5;}
.ep-access-viewonly{background:#FEF3C7;color:#92400E;}
.ep-access-restricted{background:#FEE2E2;color:#B91C1C;}
.ep-viewall-link{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;color:#4F46E5;font-weight:600;cursor:pointer;margin-top:10px;}
.ep-viewall-link:hover{text-decoration:underline;}

/* devices & sessions */
.ep-device-table{width:100%;border-collapse:collapse;margin-top:8px;}
.ep-device-table th{text-align:left;font-size:11.5px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.05em;padding:8px 0;border-bottom:1px solid #E5E7EB;}
.ep-device-table td{padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:12.5px;color:#374151;vertical-align:middle;}
.ep-device-table tr:last-child td{border-bottom:none;}
.ep-current-badge{background:#DCFCE7;color:#16A34A;border-radius:6px;font-size:11px;font-weight:700;padding:2px 8px;}

/* activity log tab */
.ep-filter-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px;}
.ep-search-wrap{position:relative;flex:1;min-width:180px;}
.ep-search-ic{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#9CA3AF;pointer-events:none;display:flex;}
.ep-search-inp{width:100%;padding:9px 12px 9px 34px;border:1.5px solid #E5E7EB;border-radius:9px;font-size:13px;color:#111827;outline:none;font-family:inherit;background:#fff;transition:border-color .15s;box-sizing:border-box;}
.ep-search-inp::placeholder{color:#9CA3AF;}
.ep-search-inp:focus{border-color:#4F46E5;box-shadow:0 0 0 3px rgba(79,70,229,.1);}
.ep-filter-sel{padding:9px 32px 9px 12px;border:1.5px solid #E5E7EB;border-radius:9px;font-size:13px;color:#374151;font-family:inherit;outline:none;background:#fff;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;cursor:pointer;transition:border-color .15s;}
.ep-filter-sel:focus{border-color:#4F46E5;}
.ep-date-filter{display:flex;align-items:center;gap:7px;padding:9px 14px;border:1.5px solid #E5E7EB;border-radius:9px;font-size:13px;color:#374151;cursor:pointer;white-space:nowrap;background:#fff;}
.ep-reset-btn{display:flex;align-items:center;gap:6px;padding:9px 16px;background:#fff;border:1.5px solid #E5E7EB;border-radius:9px;font-size:13px;font-weight:600;color:#374151;cursor:pointer;font-family:inherit;transition:border-color .15s;}
.ep-reset-btn:hover{border-color:#4F46E5;color:#4F46E5;}
.ep-act-table{width:100%;border-collapse:collapse;}
.ep-act-table th{text-align:left;font-size:11.5px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.05em;padding:10px 14px;background:#F9FAFB;border-bottom:1.5px solid #E5E7EB;}
.ep-act-table td{padding:12px 14px;border-bottom:1px solid #F3F4F6;font-size:12.5px;color:#374151;vertical-align:middle;}
.ep-act-table tr:hover td{background:#FAFAFA;}
.ep-act-badge{display:inline-flex;align-items:center;gap:5px;border-radius:7px;font-size:12px;font-weight:700;padding:4px 10px;}
.ep-act-login{background:#EEF2FF;color:#4F46E5;}
.ep-act-update{background:#DBEAFE;color:#2563EB;}
.ep-act-create{background:#DCFCE7;color:#16A34A;}
.ep-act-delete{background:#FEE2E2;color:#EF4444;}
.ep-act-user-row{display:flex;align-items:center;gap:7px;}
.ep-act-avatar{width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#4F46E5,#7C3AED);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#fff;flex-shrink:0;}
.ep-act-user-name{font-size:12px;font-weight:600;color:#111827;}
.ep-act-user-id{font-size:11px;color:#9CA3AF;}
.ep-pag-row{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-top:1px solid #F3F4F6;}
.ep-pag-info{font-size:12px;color:#9CA3AF;}
.ep-pag-btns{display:flex;align-items:center;gap:4px;}
.ep-pg-btn{min-width:30px;height:30px;border-radius:6px;border:1.5px solid #E5E7EB;background:#fff;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;color:#374151;cursor:pointer;padding:0 6px;font-family:inherit;transition:border-color .15s;}
.ep-pg-btn.active{background:#4F46E5;border-color:#4F46E5;color:#fff;}
.ep-pg-btn:hover:not(.active){border-color:#4F46E5;color:#4F46E5;}
.ep-per-page-sel{padding:5px 24px 5px 8px;border:1.5px solid #E5E7EB;border-radius:7px;font-size:12px;color:#374151;font-family:inherit;outline:none;background:#fff;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 6px center;}

/* right panel */
.ep-rp{display:flex;flex-direction:column;gap:14px;position:sticky;top:80px;}
.ep-rp-card{background:#fff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.ep-rp-hdr{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #E5E7EB;}
.ep-rp-title{font-size:13.5px;font-weight:700;color:#111827;}
.ep-rp-body{padding:12px 16px;}
.ep-rp-row{display:flex;align-items:flex-start;justify-content:space-between;padding:7px 0;border-bottom:1px solid #F9FAFB;font-size:12.5px;}
.ep-rp-row:last-child{border-bottom:none;}
.ep-rp-label{color:#6B7280;}
.ep-rp-val{font-weight:600;color:#111827;text-align:right;max-width:55%;}
.ep-role-badge{background:#EEF2FF;color:#4F46E5;border-radius:6px;font-size:11.5px;font-weight:700;padding:3px 10px;display:inline-block;}
.ep-act-list{padding:8px 0;}
.ep-act-item{display:flex;align-items:flex-start;gap:9px;padding:8px 16px;border-bottom:1px solid #F9FAFB;}
.ep-act-item:last-child{border-bottom:none;}
.ep-act-ic-wrap{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ep-act-text{font-size:12px;color:#374151;line-height:1.4;flex:1;}
.ep-act-time{font-size:11px;color:#9CA3AF;white-space:nowrap;margin-top:2px;}
.ep-viewall-btn{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:#4F46E5;cursor:pointer;}
.ep-viewall-btn:hover{text-decoration:underline;}
.ep-sec-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #F9FAFB;font-size:12.5px;}
.ep-sec-row:last-child{border-bottom:none;}
.ep-sec-label{color:#6B7280;}
.ep-sec-val{font-weight:600;color:#111827;}
.ep-sec-action{font-size:11.5px;color:#4F46E5;font-weight:600;cursor:pointer;}
.ep-sec-action:hover{text-decoration:underline;}
.ep-enabled-badge{background:#DCFCE7;color:#16A34A;border-radius:6px;font-size:11px;font-weight:700;padding:2px 8px;}
.ep-tabs-container{background:#fff;border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05);margin-bottom:0;}
`;

/* ── Icons ── */
const S={fill:'none',stroke:'currentColor',strokeWidth:2 as number,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
const SV=({s=14,children,...p}:{s?:number;children:React.ReactNode}&React.SVGProps<SVGSVGElement>)=>(
  <svg width={s} height={s} viewBox="0 0 24 24" {...S} {...p}>{children}</svg>
);
const IEdit    = ()=><SV s={13}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></SV>;
const IActions = ()=><SV s={13}><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></SV>;
const ILeft    = ()=><SV s={13}><polyline points="15 18 9 12 15 6"/></SV>;
const ICheck   = ({s=13}:{s?:number})=><SV s={s}><polyline points="20 6 9 17 4 12"/></SV>;
const IArr     = ({s=11}:{s?:number})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ISearch  = ()=><SV s={14}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></SV>;
const ICal     = ({s=14}:{s?:number})=><SV s={s}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></SV>;
const IRefresh = ()=><SV s={13}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></SV>;
const IMonitor = ()=><SV s={14}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></SV>;
const IPhone   = ()=><SV s={13}><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></SV>;
const IShield  = ()=><SV s={14}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></SV>;
const IGrid    = ()=><SV s={14}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></SV>;
const IBell    = ()=><SV s={14}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></SV>;
const IClip    = ()=><SV s={14}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></SV>;
const IBattery = ()=><SV s={14}><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="10" y2="11"/><polyline points="10 9 10 13 14 12 14 9"/></SV>;
const IUser    = ()=><SV s={14}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></SV>;
const IMail    = ()=><SV s={13}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></SV>;
const IKey     = ()=><SV s={14}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></SV>;
const ILock    = ()=><SV s={14}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></SV>;
const ILogin   = ()=><SV s={12}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></SV>;
const ITrash   = ()=><SV s={12}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></SV>;
const ICreate  = ()=><SV s={12}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></SV>;

/* ── Avatar SVG ── */
const AvatarSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:'100%',height:'100%'}}>
    <circle cx="60" cy="60" r="60" fill="#E8ECFF"/>
    {/* body */}
    <ellipse cx="60" cy="112" rx="42" ry="28" fill="#4F46E5"/>
    {/* collar */}
    <path d="M48 82 L60 92 L72 82 L68 76 L60 84 L52 76 Z" fill="#3730A3"/>
    {/* neck */}
    <rect x="53" y="66" width="14" height="18" rx="2" fill="#C68A52"/>
    {/* head */}
    <circle cx="60" cy="54" r="24" fill="#C68A52"/>
    {/* hair */}
    <path d="M36 44 Q38 26 60 24 Q82 26 84 44 Q80 30 60 32 Q40 30 36 44Z" fill="#1A1A1A"/>
    {/* ears */}
    <circle cx="36" cy="55" r="5" fill="#B5743A"/>
    <circle cx="84" cy="55" r="5" fill="#B5743A"/>
    {/* eyebrows */}
    <path d="M46 44 Q52 41 58 44" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M62 44 Q68 41 74 44" stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {/* eyes */}
    <circle cx="52" cy="51" r="3.5" fill="#111"/>
    <circle cx="68" cy="51" r="3.5" fill="#111"/>
    <circle cx="53" cy="50" r="1.2" fill="white" opacity="0.7"/>
    <circle cx="69" cy="50" r="1.2" fill="white" opacity="0.7"/>
    {/* nose */}
    <path d="M57 57 Q60 60 63 57" stroke="#A0652A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* mustache */}
    <path d="M50 63 Q60 61 70 63" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {/* beard */}
    <path d="M44 64 Q48 76 60 79 Q72 76 76 64 Q72 72 60 74 Q48 72 44 64Z" fill="#1A1A1A" opacity="0.85"/>
    {/* smile */}
    <path d="M54 66 Q60 69 66 66" stroke="#A0652A" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

/* ── Module data ── */
const MODULES = [
  { name:'Dashboard',    icon:<IGrid/>,    access:'Full Access',   cls:'ep-access-full'      },
  { name:'Riders',       icon:<IUser/>,    access:'Full Access',   cls:'ep-access-full'      },
  { name:'Battery',      icon:<IBattery/>, access:'View & Edit',   cls:'ep-access-viewedit'  },
  { name:'Reports',      icon:<IClip/>,    access:'View & Edit',   cls:'ep-access-viewedit'  },
  { name:'Finance',      icon:<IKey/>,     access:'View Only',     cls:'ep-access-viewonly'  },
  { name:'Alerts',       icon:<IBell/>,    access:'View & Edit',   cls:'ep-access-viewedit'  },
];

const ACTIVITY_LOG = [
  { dt:'20 May 2024, 09:15 AM', action:'Login',  actionCls:'ep-act-login',  module:'Authentication', detail:'User logged in to the system',                      ip:'103.21.244.12' },
  { dt:'20 May 2024, 08:45 AM', action:'Update', actionCls:'ep-act-update', module:'Riders',         detail:'Updated rider assignment for Rider ID: RD-1256',     ip:'103.21.244.12' },
  { dt:'19 May 2024, 06:20 PM', action:'Create', actionCls:'ep-act-create', module:'Reports',        detail:'Generated zone performance report',                  ip:'103.21.244.12' },
  { dt:'19 May 2024, 04:05 PM', action:'Update', actionCls:'ep-act-update', module:'Battery',        detail:'Updated battery inventory (Battery ID: BT-9876)',     ip:'103.21.244.12' },
  { dt:'18 May 2024, 11:30 AM', action:'Create', actionCls:'ep-act-create', module:'Support',        detail:'Created support ticket #ST-5582',                    ip:'103.21.244.12' },
  { dt:'18 May 2024, 10:10 AM', action:'Delete', actionCls:'ep-act-delete', module:'Alerts',         detail:'Deleted alert ID: AL-3342',                          ip:'103.21.244.12' },
  { dt:'17 May 2024, 07:40 PM', action:'Update', actionCls:'ep-act-update', module:'Vehicles',       detail:'Updated vehicle details (Vehicle ID: VH-7789)',       ip:'103.21.244.12' },
  { dt:'17 May 2024, 03:15 PM', action:'Login',  actionCls:'ep-act-login',  module:'Authentication', detail:'User logged out from the system',                    ip:'103.21.244.12' },
];

const ActionIcon = ({action}:{action:string}) => {
  if (action==='Login')  return <ILogin/>;
  if (action==='Update') return <IEdit/>;
  if (action==='Create') return <ICreate/>;
  if (action==='Delete') return <ITrash/>;
  return null;
};

/* ── Overview Tab ── */
function OverviewTab() {
  return (
    <div style={{padding:'20px 24px'}}>
      {/* Permissions Summary */}
      <div style={{marginBottom:22}}>
        <div style={{fontSize:14,fontWeight:700,color:'#111827',marginBottom:3}}>Permissions Summary</div>
        <div style={{fontSize:12,color:'#6B7280',marginBottom:14}}>Overview of role permissions assigned to this user</div>
        <div className="ep-perm-grid">
          {[
            {ic:<IGrid/>, num:8,  lbl:'Total Modules', sub:'View all modules', color:'#EEF2FF', icColor:'#4F46E5'},
            {ic:<ILock/>, num:42, lbl:'Permissions',   sub:'Total permissions', color:'#EFF6FF', icColor:'#2563EB'},
            {ic:<ICheck/>,num:38, lbl:'Granted',        sub:'Granted permissions', color:'#F0FDF4', icColor:'#16A34A'},
            {ic:<IBell/>, num:4,  lbl:'Restricted',     sub:'Restricted permissions', color:'#FEF2F2', icColor:'#EF4444'},
          ].map(b=>(
            <div key={b.lbl} className="ep-perm-box">
              <div className="ep-perm-icon" style={{background:b.color,color:b.icColor}}>{b.ic}</div>
              <div>
                <div className="ep-perm-num">{b.num}</div>
                <div className="ep-perm-lbl">{b.lbl}</div>
                <div className="ep-view-link"><IArr/> {b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Access */}
      <div style={{marginBottom:22}}>
        <div className="ep-module-sec-hdr">Module Access</div>
        <div className="ep-module-sec-sub">Access level by module</div>
        <table className="ep-module-table">
          <thead>
            <tr><th>Module</th><th>Access Level</th></tr>
          </thead>
          <tbody>
            {MODULES.map(m=>(
              <tr key={m.name}>
                <td>
                  <div className="ep-module-row-name">
                    <div className="ep-mod-ic">{m.icon}</div>
                    {m.name}
                  </div>
                </td>
                <td><span className={`ep-access-badge ${m.cls}`}>{m.access}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="ep-viewall-link">View all permissions <IArr/></button>
      </div>

      {/* Devices & Sessions */}
      <div>
        <div className="ep-module-sec-hdr">Devices &amp; Sessions</div>
        <div className="ep-module-sec-sub">Active sessions for this user</div>
        <table className="ep-device-table">
          <thead>
            <tr>
              <th>Device / Browser</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Last Active</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div style={{display:'flex',alignItems:'center',gap:8}}><IMonitor/> Chrome on Windows</div></td>
              <td>192.168.1.45</td>
              <td>New Delhi, India</td>
              <td>20 May 2024, 09:15 AM</td>
              <td><span className="ep-current-badge">Current</span></td>
            </tr>
            <tr>
              <td><div style={{display:'flex',alignItems:'center',gap:8}}><IPhone/> Chrome on Android</div></td>
              <td>103.21.244.12</td>
              <td>New Delhi, India</td>
              <td>19 May 2024, 06:45 PM</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button className="ep-viewall-link" style={{marginTop:10}}>View all sessions <IArr/></button>
      </div>
    </div>
  );
}

/* ── Activity Log Tab ── */
function ActivityLogTab() {
  return (
    <div style={{padding:'20px 24px'}}>
      {/* Filters */}
      <div className="ep-filter-row">
        <div className="ep-search-wrap">
          <span className="ep-search-ic"><ISearch/></span>
          <input className="ep-search-inp" placeholder="Search activities..."/>
        </div>
        <select className="ep-filter-sel"><option>All Actions</option><option>Login</option><option>Update</option><option>Create</option><option>Delete</option></select>
        <select className="ep-filter-sel"><option>All Modules</option><option>Authentication</option><option>Riders</option><option>Battery</option></select>
        <select className="ep-filter-sel"><option>All Performed By</option></select>
        <div className="ep-date-filter"><ICal s={13}/> 15 May 2024 – 21 May 2024</div>
        <button className="ep-reset-btn"><IRefresh/> Reset</button>
      </div>

      {/* Table */}
      <table className="ep-act-table">
        <thead>
          <tr>
            <th>Date &amp; Time ↕</th>
            <th>Action</th>
            <th>Module</th>
            <th>Details</th>
            <th>Performed By</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {ACTIVITY_LOG.map((a,i)=>(
            <tr key={i}>
              <td style={{whiteSpace:'nowrap',color:'#374151'}}>{a.dt}</td>
              <td>
                <span className={`ep-act-badge ${a.actionCls}`}>
                  <ActionIcon action={a.action}/> {a.action}
                </span>
              </td>
              <td>{a.module}</td>
              <td style={{maxWidth:220,color:'#6B7280'}}>{a.detail}</td>
              <td>
                <div className="ep-act-user-row">
                  <div className="ep-act-avatar">RS</div>
                  <div>
                    <div className="ep-act-user-name">Rohit Sharma</div>
                    <div className="ep-act-user-id">USR-002</div>
                  </div>
                </div>
              </td>
              <td style={{fontFamily:'monospace',fontSize:12}}>{a.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="ep-pag-row">
        <span className="ep-pag-info">Showing 1 to 8 of 42 activities</span>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div className="ep-pag-btns">
            {['«','‹','1','2','3','...','6','›'].map((p,i)=>(
              <button key={i} className={`ep-pg-btn ${p==='1'?'active':''}`}>{p}</button>
            ))}
          </div>
          <select className="ep-per-page-sel"><option>10 / page</option><option>25 / page</option><option>50 / page</option></select>
        </div>
      </div>
    </div>
  );
}

/* ── Permissions Tab ── */
function PermissionsTab() {
  return (
    <div style={{padding:'20px 24px'}}>
      <div style={{fontSize:14,fontWeight:700,color:'#111827',marginBottom:12}}>Role-based Permissions</div>
      {MODULES.map(m=>(
        <div key={m.name} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0',borderBottom:'1px solid #F3F4F6'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div className="ep-mod-ic">{m.icon}</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:'#111827'}}>{m.name}</div>
              <div style={{fontSize:12,color:'#9CA3AF'}}>Module permissions</div>
            </div>
          </div>
          <span className={`ep-access-badge ${m.cls}`}>{m.access}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Additional Info Tab ── */
function AdditionalInfoTab() {
  return (
    <div style={{padding:'0 24px'}}>
      <style dangerouslySetInnerHTML={{__html:AttendanceCSS}}/>
      <div style={{padding:'20px 0'}}>
        <AttendanceContent/>
      </div>
    </div>
  );
}

/* ── Right Panel ── */
function RightPanel() {
  const recentActivity = [
    {ic:<ILogin/>, icBg:'#EEF2FF', icColor:'#4F46E5', text:'Logged in to the system', time:'20 May 2024, 09:15 AM'},
    {ic:<IEdit/>,  icBg:'#DBEAFE', icColor:'#2563EB', text:'Updated rider assignment', time:'20 May 2024, 08:45 AM'},
    {ic:<ICreate/>,icBg:'#DCFCE7', icColor:'#16A34A', text:'Generated zone performance report', time:'19 May 2024, 06:20 PM'},
    {ic:<IEdit/>,  icBg:'#DBEAFE', icColor:'#2563EB', text:'Updated battery inventory', time:'19 May 2024, 04:05 PM'},
    {ic:<ICreate/>,icBg:'#DCFCE7', icColor:'#16A34A', text:'Created support ticket', time:'18 May 2024, 11:30 AM'},
  ];
  return (
    <div className="ep-rp">
      {/* Status */}
      <div className="ep-rp-card">
        <div className="ep-rp-body">
          <div className="ep-rp-row"><span className="ep-rp-label">Status</span><span className="ep-active-badge">● Active</span></div>
          <div className="ep-rp-row"><span className="ep-rp-label">Role</span><span className="ep-role-badge">Operations Manager</span></div>
          <div className="ep-rp-row"><span className="ep-rp-label">Zone / Scope</span><span className="ep-rp-val">Connaught Place Zone</span></div>
          <div className="ep-rp-row"><span className="ep-rp-label">Reporting To</span><span className="ep-rp-val">Akash Verma (Zone Admin)</span></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="ep-rp-card">
        <div className="ep-rp-hdr">
          <span className="ep-rp-title">Recent Activity</span>
          <button className="ep-viewall-btn">View All <IArr/></button>
        </div>
        <div className="ep-act-list">
          {recentActivity.map((a,i)=>(
            <div key={i} className="ep-act-item">
              <div className="ep-act-ic-wrap" style={{background:a.icBg,color:a.icColor}}>{a.ic}</div>
              <div>
                <div className="ep-act-text">{a.text}</div>
                <div className="ep-act-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Information */}
      <div className="ep-rp-card">
        <div className="ep-rp-hdr"><span className="ep-rp-title">Security Information</span></div>
        <div className="ep-rp-body">
          <div className="ep-sec-row">
            <span className="ep-sec-label">Password</span>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="ep-sec-val" style={{letterSpacing:2}}>•••••••••</span>
              <button className="ep-sec-action">Reset Password</button>
            </div>
          </div>
          <div className="ep-sec-row">
            <span className="ep-sec-label">Two Factor Auth</span>
            <span className="ep-enabled-badge">Enabled</span>
          </div>
          <div className="ep-sec-row">
            <span className="ep-sec-label">Failed Login Attempts</span>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="ep-sec-val">0</span>
              <button className="ep-sec-action">View Logs</button>
            </div>
          </div>
          <div className="ep-sec-row">
            <span className="ep-sec-label">Account Locked</span>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span className="ep-sec-val">No</span>
              <button className="ep-sec-action">View Logs</button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="ep-rp-card">
        <div className="ep-rp-hdr"><span className="ep-rp-title">Account Information</span></div>
        <div className="ep-rp-body">
          <div className="ep-rp-row"><span className="ep-rp-label">Language</span><span className="ep-rp-val">English</span></div>
          <div className="ep-rp-row"><span className="ep-rp-label">Date Format</span><span className="ep-rp-val">DD MMM YYYY</span></div>
          <div className="ep-rp-row"><span className="ep-rp-label">Time Zone</span><span className="ep-rp-val" style={{fontSize:11.5}}>(UTC+5:30) Asia/Kolkata</span></div>
        </div>
      </div>
    </div>
  );
}

/* ═══ PAGE ═══ */
export default function UserProfilePage() {
  const [tab, setTab] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(s => !s);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:CSS}}/>
      <div className="ep-shell">
        <Sidebar activePath="/users" isOpen={sidebarOpen} />
        <div className="ep-main" style={{ marginLeft: sidebarOpen ? 230 : 0, width: sidebarOpen ? 'calc(100% - 230px)' : '100%' }}>
          <TopBar/>
          <div className="ep-page">

            {/* Breadcrumb */}
            <div className="ep-bc">
              <Link href="/">Settings</Link><span className="ep-bc-sep">›</span>
              <a href="#">Users &amp; Roles</a><span className="ep-bc-sep">›</span>
              <a href="#">Users</a><span className="ep-bc-sep">›</span>
              <span className="ep-bc-cur">User Details</span>
            </div>

            {/* Title */}
            <div className="ep-title-row">
              <div>
                <h1 className="ep-h1">User Details</h1>
                <p className="ep-sub">View and manage user information, role, permissions and activity</p>
              </div>
              <div className="ep-btn-row">
                <button className="ep-actions-btn"><IActions/> Actions ▾</button>
                <button className="ep-edit-btn"><IEdit/> Edit User</button>
              </div>
            </div>

            {/* Profile Header */}
            <div className="ep-profile-card" style={{marginBottom:0,borderRadius:'14px 14px 0 0'}}>
              <div className="ep-avatar-wrap"><AvatarSVG/></div>
              <div className="ep-user-section">
                <div className="ep-user-name-row">
                  <span className="ep-user-name">Rohit Sharma</span>
                  <span className="ep-active-badge">Active</span>
                </div>
                <div className="ep-user-role">Operations Manager</div>
                <div className="ep-user-meta">
                  <div className="ep-meta-row"><span className="ep-meta-label">User ID</span><span className="ep-meta-val">USR-110</span></div>
                  <div className="ep-meta-row"><IMail/><span style={{fontSize:13,color:'#374151'}}>rohit.sharma@evegah.com</span></div>
                  <div className="ep-meta-row"><span className="ep-meta-label">Mobile Number</span></div>
                  <div className="ep-meta-val phone">+91 87654 32109</div>
                </div>
              </div>
              <div className="ep-date-section">
                {[
                  {ic:<ICal/>,    label:'Date of Joining',       val:'12 May 2024, 09:15 AM'},
                  {ic:<ILock/>,   label:'Last Login',            val:'20 May 2024, 09:15 AM'},
                  {ic:<IUser/>,   label:'Created By',            val:'Akash Verma'},
                  {ic:<IKey/>,    label:'Password Last Changed',  val:'12 May 2024, 09:16 AM'},
                ].map(d=>(
                  <div key={d.label} className="ep-date-row">
                    <span className="ep-date-ic">{d.ic}</span>
                    <div>
                      <div className="ep-date-label">{d.label}</div>
                      <div className="ep-date-val">{d.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs + Content */}
            <div className="ep-tabs-container">
              {/* Tab Bar */}
              <div style={{display:'flex',alignItems:'center',padding:'0 24px',borderBottom:'1px solid #E5E7EB'}}>
                {['Overview','Permissions','Activity Log','Additional Info'].map(t=>(
                  <div key={t} className={`ep-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>
                ))}
              </div>

              {/* Tab Content */}
              <div className="ep-layout">
                <div>
                  {tab==='Overview'      && <OverviewTab/>}
                  {tab==='Permissions'   && <PermissionsTab/>}
                  {tab==='Activity Log'  && <ActivityLogTab/>}
                  {tab==='Additional Info'&& <AdditionalInfoTab/>}
                </div>
                <div style={{padding:'20px 16px 20px 0'}}><RightPanel/></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

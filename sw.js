<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="theme-color" content="#080810">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>Bell</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.2/peerjs.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --bg:#080810;--s1:#0f0f1a;--s2:#16162a;
  --border:rgba(255,255,255,0.07);--border2:rgba(255,255,255,0.18);
  --text:#e8e8f5;--label:#d0c8ff;--hint:#8888b0;--muted:#3a3a55;--soft:#7070a0;
  --gold:#f0a500;--green:#2ecf72;--blue:#38c0e8;--red:#e04848;--wa:#25d366;
  --r:13px;--disp:'Bebas Neue',sans-serif;--mono:'IBM Plex Mono',monospace;
}
html,body{height:100%;overscroll-behavior:none}
body{font-family:var(--mono);background:var(--bg);color:var(--text);min-height:100%;display:flex;flex-direction:column;align-items:center;overflow-x:hidden;}
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(ellipse 80% 50% at 50% -10%,rgba(240,165,0,0.07),transparent),
             radial-gradient(ellipse 60% 40% at 100% 100%,rgba(56,192,232,0.04),transparent);}

.scr{display:none;position:relative;z-index:1;width:100%;max-width:440px;padding:28px 20px 50px;flex-direction:column;gap:18px;}
.scr.on{display:flex}

/* ── Setup ── */
.logo{font-family:var(--disp);font-size:4rem;letter-spacing:4px;color:var(--gold);text-align:center;line-height:1;text-shadow:0 0 40px rgba(240,165,0,0.3);}
.tagline{font-size:0.65rem;color:var(--hint);text-align:center;letter-spacing:3px;text-transform:uppercase;}
.notice{background:rgba(62,207,110,0.07);border:1px solid rgba(62,207,110,0.2);border-radius:var(--r);padding:11px 14px;font-size:0.7rem;color:var(--green);display:flex;align-items:center;justify-content:space-between;gap:8px;}
.notice button{background:none;border:none;color:var(--red);font-family:var(--mono);font-size:0.7rem;cursor:pointer;text-decoration:underline;white-space:nowrap}
.field{display:flex;flex-direction:column;gap:8px}
.lbl{font-size:0.72rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);font-weight:500;}
.sub-lbl{font-size:0.68rem;color:var(--hint);line-height:1.55;}
.roles{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.role{border:2px solid var(--border);border-radius:var(--r);padding:18px 10px 14px;text-align:center;cursor:pointer;transition:border-color .18s,background .18s;user-select:none;background:rgba(255,255,255,0.02);}
.role:active{transform:scale(.97)}
.role .ri{font-size:2rem;display:block;margin-bottom:6px}
.role .rn{font-family:var(--disp);font-size:1.3rem;letter-spacing:1px;color:var(--text)}
.role .rd{font-size:0.65rem;color:var(--hint);margin-top:3px}
.role.ah{border-color:var(--gold);background:rgba(240,165,0,0.07)}
.role.ag{border-color:var(--blue);background:rgba(56,192,232,0.07)}
input{width:100%;background:rgba(255,255,255,0.04);border:1.5px solid var(--border);border-radius:var(--r);padding:14px 15px;color:var(--text);font-family:var(--mono);font-size:0.9rem;outline:none;transition:border-color .18s,background .18s;}
input.code{letter-spacing:5px;text-align:center;font-size:1.1rem}
input:focus{border-color:rgba(240,165,0,0.5);background:rgba(240,165,0,0.03)}
input::placeholder{color:var(--soft);letter-spacing:1px;font-size:0.78rem}
.auto-badge{font-size:0.65rem;color:var(--green);display:none;padding:0 2px}
.auto-badge.on{display:block}
.divline{height:1px;background:rgba(255,255,255,0.1)}
.btn-go{width:100%;padding:16px;border-radius:var(--r);border:none;background:var(--gold);color:#000;font-family:var(--disp);font-size:1.4rem;letter-spacing:2px;cursor:pointer;transition:opacity .18s,transform .1s;margin-top:4px;}
.btn-go:active{transform:scale(.97)}.btn-go:disabled{opacity:.3;cursor:not-allowed}
.btn-ghost{background:none;border:none;color:var(--hint);font-family:var(--mono);font-size:0.65rem;text-align:center;cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:4px;}
.btn-ghost:hover{color:var(--red)}

/* ── Main ── */
#mainScr{padding-top:20px;padding-bottom:36px}
.topbar{display:flex;align-items:center;gap:8px}
.room-chip{flex:1;font-size:0.62rem;letter-spacing:2.5px;text-transform:uppercase;color:var(--hint);background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:20px;padding:5px 13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.room-chip b{color:var(--text);letter-spacing:3.5px}
.role-chip{font-size:0.6rem;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;border-radius:20px;padding:5px 12px;white-space:nowrap;flex-shrink:0;}
.role-chip.h{background:rgba(240,165,0,0.12);color:var(--gold);border:1px solid rgba(240,165,0,0.25)}
.role-chip.g{background:rgba(56,192,232,0.1);color:var(--blue);border:1px solid rgba(56,192,232,0.22)}
.sbar{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:10px;font-size:0.72rem;transition:all .3s;}
.sbar.wait{background:rgba(240,165,0,0.07);color:var(--gold);border:1px solid rgba(240,165,0,0.18)}
.sbar.ok{background:rgba(46,207,114,0.07);color:var(--green);border:1px solid rgba(46,207,114,0.18)}
.sbar.conn{background:rgba(56,192,232,0.07);color:var(--blue);border:1px solid rgba(56,192,232,0.18)}
.sbar.off{background:rgba(224,72,72,0.07);color:var(--red);border:1px solid rgba(224,72,72,0.18)}
.sdot{width:7px;height:7px;border-radius:50%;background:currentColor;flex-shrink:0}
.sdot.p{animation:blink 1.4s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.1}}
.rbar{font-size:0.66rem;color:var(--blue);text-align:center;display:none}
.rbar.on{display:block}
.bell-zone{display:flex;flex-direction:column;align-items:center;gap:18px;padding:16px 0;pointer-events:none}
.bell-wrap{position:relative;display:flex;align-items:center;justify-content:center;pointer-events:none}
.ring1,.ring2,.ring3{position:absolute;border-radius:50%;border:1px solid rgba(240,165,0,0.14);pointer-events:none;opacity:0}
.ring1{width:260px;height:260px}.ring2{width:315px;height:315px}.ring3{width:370px;height:370px}
.bell-wrap.ringing .ring1{animation:expand .9s ease-out forwards}
.bell-wrap.ringing .ring2{animation:expand .9s ease-out .11s forwards}
.bell-wrap.ringing .ring3{animation:expand .9s ease-out .22s forwards}
@keyframes expand{0%{opacity:.75;transform:scale(.65)}100%{opacity:0;transform:scale(1)}}
.bglow{position:absolute;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(240,165,0,0.18),transparent 70%);pointer-events:none;opacity:0;transition:opacity .5s}
.bell-wrap.ringing .bglow{opacity:1}
.bell{position:relative;z-index:2;width:200px;height:200px;border-radius:50%;border:none;cursor:pointer;user-select:none;-webkit-user-select:none;pointer-events:auto;background:radial-gradient(circle at 37% 33%,#ffd060,#b06800);box-shadow:0 20px 60px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.06),inset 0 2px 0 rgba(255,255,255,.22),inset 0 -3px 0 rgba(0,0,0,.35);font-size:4.8rem;display:flex;align-items:center;justify-content:center;transition:transform .1s,box-shadow .2s;}
.bell:not(.off):active{transform:scale(.88)}
.bell.off{background:radial-gradient(circle at 37% 33%,#282830,#141420);box-shadow:0 10px 30px rgba(0,0,0,.5);cursor:not-allowed}
.bell.swing{animation:swing .55s ease-in-out}
@keyframes swing{0%{transform:rotate(0) scale(1)}12%{transform:rotate(-22deg) scale(1.07)}28%{transform:rotate(22deg) scale(1.07)}44%{transform:rotate(-14deg)}60%{transform:rotate(14deg)}76%{transform:rotate(-7deg)}88%{transform:rotate(7deg)}100%{transform:rotate(0) scale(1)}}
.bell-cap{font-size:0.64rem;color:var(--hint);letter-spacing:2px;text-transform:uppercase;text-align:center;pointer-events:none}
.pills{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;min-height:20px;pointer-events:none}
.pill{font-size:0.62rem;color:var(--soft);background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:20px;padding:3px 10px}
.pill.alive{color:var(--green);border-color:rgba(46,207,114,0.22);background:rgba(46,207,114,0.05)}
.wa-wrap{display:flex;flex-direction:column;gap:8px}
.wa-lbl{font-size:0.64rem;letter-spacing:2px;text-transform:uppercase;color:var(--hint)}
.wa-row{display:flex;align-items:center;gap:10px;background:rgba(37,211,102,0.07);border:1px solid rgba(37,211,102,0.2);border-radius:var(--r);padding:13px 15px;cursor:pointer;transition:background .18s;}
.wa-row:active{transform:scale(.98)}
.wa-name{flex:1;font-size:0.85rem;color:var(--text)}
.wa-num{font-size:0.65rem;color:var(--wa);margin-top:2px}
.wa-ico{font-size:1.2rem}
.dt-row{display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;padding:2px 0}
.dt-row input{display:none}
.trk{width:36px;height:20px;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:10px;position:relative;transition:background .2s;flex-shrink:0}
.trk::after{content:'';position:absolute;top:3px;left:3px;width:12px;height:12px;border-radius:50%;background:var(--soft);transition:transform .2s,background .2s}
input:checked~.trk{background:rgba(240,165,0,0.2);border-color:rgba(240,165,0,0.4)}
input:checked~.trk::after{transform:translateX(16px);background:var(--gold)}
.dt-lbl{font-size:0.66rem;color:var(--label);letter-spacing:1.5px;text-transform:uppercase}
.dtpanel{display:none;flex-direction:column;gap:12px}.dtpanel.open{display:flex}
.notif-bar{background:rgba(56,192,232,0.07);border:1px solid rgba(56,192,232,0.18);border-radius:10px;padding:10px 14px;font-size:0.7rem;color:#7dd8e8;display:flex;align-items:center;justify-content:space-between;gap:10px;}
.notif-bar button{background:rgba(56,192,232,0.18);border:1px solid rgba(56,192,232,0.3);color:#7dd8e8;border-radius:8px;padding:5px 10px;font-size:0.66rem;cursor:pointer;font-family:var(--mono)}
.notif-bar.gone{display:none}
.log-box{background:rgba(255,255,255,0.025);border:1px solid var(--border);border-radius:10px;padding:10px 12px;min-height:48px;max-height:120px;overflow-y:auto;display:flex;flex-direction:column;gap:3px;}
.le{font-size:0.66rem;color:var(--soft)}.le.r{color:var(--gold)}.le.w{color:var(--wa)}.le.s{color:var(--muted)}
#flash{position:fixed;inset:0;z-index:999;pointer-events:none;opacity:0;transition:opacity .1s;background:radial-gradient(circle at center,rgba(240,165,0,0.22),transparent 65%);}
#flash.on{opacity:1}

/* ── Chat ── */
.chat-box{display:flex;flex-direction:column;border:2px solid rgba(160,140,255,0.2);border-radius:var(--r);overflow:hidden;background:#09091a;}
.chat-head{display:flex;align-items:center;justify-content:space-between;padding:11px 15px;background:#111128;border-bottom:2px solid rgba(160,140,255,0.15);}
.chat-head-lbl{font-size:0.72rem;letter-spacing:2px;text-transform:uppercase;color:#b0a8e8;font-weight:500;}
.chat-badge{background:var(--gold);color:#000;font-size:0.6rem;font-weight:700;padding:3px 9px;border-radius:20px;display:none;letter-spacing:0.5px;animation:badgePop .2s ease-out;}
@keyframes badgePop{0%{transform:scale(0.5)}100%{transform:scale(1)}}
.chat-badge.on{display:inline-block;}
.chat-msgs{height:240px;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:10px;background:#06060f;}
.chat-empty{font-size:0.72rem;color:#30304a;text-align:center;padding:85px 20px 0;letter-spacing:1px;line-height:1.6;}
.cmsg{display:flex;flex-direction:column;gap:5px;max-width:86%;}
.cmsg.me{align-self:flex-end;align-items:flex-end;}
.cmsg.them{align-self:flex-start;align-items:flex-start;}
.cmsg-meta{font-size:0.64rem;font-weight:600;padding:0 5px;letter-spacing:0.3px;}
.cmsg.me .cmsg-meta{color:rgba(240,185,0,0.9);}
.cmsg.them .cmsg-meta{color:#9090dd;}
.cmsg-bub{padding:10px 15px;border-radius:18px;font-size:0.88rem;line-height:1.55;word-break:break-word;font-family:var(--mono);}
.cmsg.me .cmsg-bub{background:linear-gradient(135deg,rgba(240,165,0,0.28),rgba(200,120,0,0.18));border:1.5px solid rgba(240,165,0,0.5);color:#ffe4a0;border-bottom-right-radius:5px;box-shadow:0 2px 12px rgba(240,165,0,0.1);}
.cmsg.them .cmsg-bub{background:linear-gradient(135deg,rgba(255,255,255,0.13),rgba(200,200,255,0.08));border:1.5px solid rgba(200,200,255,0.25);color:#eaeaff;border-bottom-left-radius:5px;box-shadow:0 2px 8px rgba(0,0,0,0.35);}
.chat-status{font-size:0.68rem;color:#30304a;text-align:center;padding:12px 14px;border-top:1px solid rgba(255,255,255,0.06);display:none;background:#06060f;}
.chat-status.on{display:block;}
.chat-inp-row{display:flex;border-top:2px solid rgba(160,140,255,0.15);background:#0e0e22;}
.chat-inp{flex:1;background:transparent;border:none;padding:13px 15px;color:#e8e8ff;font-family:var(--mono);font-size:0.86rem;outline:none;}
.chat-inp::placeholder{color:#2a2a50;font-size:0.78rem;}
.chat-send-btn{background:none;border:none;border-left:2px solid rgba(160,140,255,0.15);color:var(--gold);font-size:1.2rem;padding:0 18px;cursor:pointer;pointer-events:auto;flex-shrink:0;transition:background .15s,color .15s;}
.chat-send-btn:hover{background:rgba(240,165,0,0.1);}
.chat-send-btn:active{background:rgba(240,165,0,0.2);}
.chat-send-btn:disabled{color:#1e1e38;cursor:not-allowed;}

/* ═══════ BOTTOM NAV ═══════ */
.bottom-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;display:flex;background:#0a0a18;border-top:1.5px solid rgba(255,255,255,0.08);padding:6px 0 max(6px,env(safe-area-inset-bottom));}
.nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:none;cursor:pointer;padding:6px 0;opacity:0.45;transition:opacity .2s;-webkit-tap-highlight-color:transparent;}
.nav-btn.active{opacity:1;}
.nav-ico{font-size:1.3rem;line-height:1;}
.nav-lbl{font-family:var(--mono);font-size:0.58rem;letter-spacing:2px;text-transform:uppercase;color:var(--text);}
.nav-btn.active .nav-lbl{color:var(--gold);}

/* ═══════ TIMER SCREEN ═══════ */
#timerScr{padding-bottom:90px;align-items:center;gap:22px;}
#mainScr{padding-bottom:90px;}
.t-title{font-family:var(--disp);font-size:3.5rem;letter-spacing:6px;color:var(--gold);text-align:center;line-height:1;text-shadow:0 0 40px rgba(240,165,0,0.25);}
.t-sub{font-size:0.62rem;color:var(--hint);letter-spacing:3px;text-transform:uppercase;text-align:center;margin-top:-8px;}

/* Presets */
.t-presets{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;width:100%;}
.t-pre{font-family:var(--mono);font-size:0.78rem;letter-spacing:1px;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:8px;color:var(--hint);padding:7px 14px;cursor:pointer;transition:all .18s;}
.t-pre:active,.t-pre.sel{background:rgba(240,165,0,0.12);border-color:rgba(240,165,0,0.4);color:var(--gold);}

/* Adjuster */
.t-adjuster{display:flex;align-items:center;gap:16px;}
.t-unit{display:flex;flex-direction:column;align-items:center;gap:6px;}
.t-adj-btn{width:52px;height:52px;border-radius:26px;border:1.5px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.04);color:var(--text);font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;line-height:1;}
.t-adj-btn.t-min-adj{width:auto;min-width:64px;padding:0 12px;font-size:0.82rem;letter-spacing:0.5px;border-radius:26px;}
.t-adj-btn:active{background:rgba(240,165,0,0.15);border-color:var(--gold);color:var(--gold);transform:scale(0.92);}
.t-digits{font-family:var(--disp);font-size:3.2rem;letter-spacing:4px;color:var(--text);min-width:72px;text-align:center;line-height:1;}
.t-unit-lbl{font-size:0.58rem;letter-spacing:3px;text-transform:uppercase;color:var(--muted);}
.t-colon{font-family:var(--disp);font-size:3rem;color:var(--muted);padding-bottom:28px;line-height:1;}

/* Ring */
.t-ring-wrap{position:relative;width:220px;height:220px;flex-shrink:0;}
.t-ring-svg{width:220px;height:220px;transform:rotate(-90deg);}
.t-ring-bg{fill:none;stroke:rgba(255,255,255,0.06);stroke-width:10;}
.t-ring-prog{fill:none;stroke:var(--gold);stroke-width:10;stroke-linecap:round;
  stroke-dasharray:603;stroke-dashoffset:0;transition:stroke-dashoffset .9s linear,stroke .3s;}
.t-ring-prog.danger{stroke:var(--red);}
.t-ring-inner{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;}
.t-countdown{font-family:var(--disp);font-size:3.4rem;letter-spacing:3px;color:var(--text);line-height:1;}
.t-countdown.danger{color:var(--red);}
.t-ring-lbl{font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--hint);}

/* Controls */
.t-controls{display:flex;gap:14px;width:100%;}
.t-btn-reset{flex:1;padding:14px;border-radius:var(--r);border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:var(--hint);font-family:var(--disp);font-size:1.2rem;letter-spacing:2px;cursor:pointer;transition:all .18s;}
.t-btn-reset:active{background:rgba(255,255,255,0.08);}
.t-btn-start{flex:2;padding:14px;border-radius:var(--r);border:none;background:var(--gold);color:#000;font-family:var(--disp);font-size:1.4rem;letter-spacing:2px;cursor:pointer;transition:opacity .18s,transform .1s;box-shadow:0 4px 24px rgba(240,165,0,0.3);}
.t-btn-start:active{transform:scale(.97);}
.t-btn-start:disabled{opacity:.3;cursor:not-allowed;}
.t-btn-start.running{background:#e04848;box-shadow:0 4px 24px rgba(224,72,72,0.3);}

/* Notif hint */
.t-notif-hint{background:rgba(240,165,0,0.07);border:1px solid rgba(240,165,0,0.2);border-radius:10px;padding:10px 14px;font-size:0.68rem;color:#c88800;display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;}
.t-notif-hint button{background:rgba(240,165,0,0.2);border:1px solid rgba(240,165,0,0.35);color:var(--gold);border-radius:7px;padding:5px 12px;font-size:0.66rem;cursor:pointer;font-family:var(--mono);white-space:nowrap;}

/* Alarm overlay */
.t-alarm-active{
  position:fixed;inset:0;z-index:9999;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
  padding:40px 28px;
  background:rgba(6,0,0,0.96);
  backdrop-filter:blur(8px);
  animation:alarmBg 1s ease-in-out infinite;
}
@keyframes alarmBg{0%,100%{background:rgba(6,0,0,0.96)}50%{background:rgba(40,4,4,0.98)}}
.t-alarm-icon{font-size:5rem;animation:alarmShake .45s ease-in-out infinite;filter:drop-shadow(0 0 20px rgba(224,72,72,0.8));}
@keyframes alarmShake{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-18deg) scale(1.1)}75%{transform:rotate(18deg) scale(1.1)}}
.t-alarm-txt{font-family:var(--disp);font-size:3.6rem;letter-spacing:8px;color:var(--red);text-shadow:0 0 40px rgba(224,72,72,0.7);text-align:center;}
.t-alarm-sub{font-size:0.7rem;letter-spacing:3px;text-transform:uppercase;color:rgba(224,72,72,0.5);text-align:center;}
.t-alarm-stop{
  width:100%;max-width:320px;
  padding:20px;
  border-radius:var(--r);
  border:2px solid var(--red);
  background:rgba(224,72,72,0.18);
  color:#fff;
  font-family:var(--disp);font-size:1.8rem;letter-spacing:4px;
  cursor:pointer;
  transition:background .18s,transform .1s;
  box-shadow:0 0 30px rgba(224,72,72,0.3);
  animation:stopPulse 1s ease-in-out infinite;
}
@keyframes stopPulse{0%,100%{box-shadow:0 0 20px rgba(224,72,72,0.2)}50%{box-shadow:0 0 40px rgba(224,72,72,0.6)}}
.t-alarm-stop:active{background:rgba(224,72,72,0.45);transform:scale(.96);}

::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
</style>
</head>
<body>
<div id="flash"></div>
<div class="t-alarm-active" id="tAlarmActive" style="display:none">
  <div class="t-alarm-icon">⏰</div>
  <div class="t-alarm-txt">TIME'S UP!</div>
  <div class="t-alarm-sub">Your timer has finished</div>
  <button class="t-alarm-stop" id="tAlarmStopBtn">■ STOP ALARM</button>
</div>

<!-- ═══════ SETUP ═══════ -->
<div class="scr on" id="setupScr">
  <div style="height:8px"></div>
  <div class="logo">BELL</div>
  <div class="tagline">ring · connect · alert</div>

  <div class="notice" id="savedNotice" style="display:none">
    <span id="savedTxt"></span>
    <button onclick="hardReset()">Reset</button>
  </div>

  <div class="field">
    <div class="lbl">My Role</div>
    <div class="sub-lbl">Choose what this device does in the room</div>
    <div class="roles">
      <div class="role" id="rH" onclick="pickRole('host')">
        <span class="ri">⚓</span><div class="rn">HOST</div>
        <div class="rd">Receives rings from guests</div>
      </div>
      <div class="role" id="rG" onclick="pickRole('guest')">
        <span class="ri">📱</span><div class="rn">GUEST</div>
        <div class="rd">Rings the host bell</div>
      </div>
    </div>
  </div>

  <div class="field">
    <div class="lbl">Shared Room Code</div>
    <div class="sub-lbl">Same code for all devices in your group. Different groups use different codes.</div>
    <input class="code" type="text" id="roomIn" maxlength="14" placeholder="e.g.  MYBELL"
      oninput="this.value=this.value.toUpperCase().replace(/\s/g,'');onRoomInput()"
      onkeydown="if(event.key==='Enter')tryGo()">
  </div>

  <div class="field">
    <div class="lbl">This Device's Name</div>
    <div class="sub-lbl">Identifies this specific device. Multiple host devices share one WhatsApp number but each has its own name.</div>
    <input type="text" id="devIn" maxlength="18" placeholder="e.g.  Phone, Desktop, TV, Tablet"
      oninput="chk()" onkeydown="if(event.key==='Enter')tryGo()">
  </div>

  <div class="field">
    <div class="lbl">My WhatsApp Number</div>
    <div class="sub-lbl">Your own number — shown as offline fallback to the other side.</div>
    <input type="tel" id="myWaIn" placeholder="+60123456789" oninput="chk()">
  </div>

  <div class="divline"></div>

  <div class="field">
    <div class="lbl" id="otherLbl">Other Side's WhatsApp</div>
    <div class="sub-lbl" id="otherHint">For guests: auto-filled when you enter the room code if the host is online. Or enter manually.</div>
    <input type="tel" id="otherWaIn" placeholder="+60198765432" oninput="chk()">
    <div class="auto-badge" id="autoBadge">✓ Auto-filled from host</div>
  </div>

  <button class="btn-go" id="goBtn" onclick="tryGo()" disabled>START</button>
</div>

<!-- ═══════ MAIN ═══════ -->
<div class="scr" id="mainScr">
  <div class="topbar">
    <div class="room-chip">ROOM &nbsp;<b id="roomDis"></b></div>
    <div class="role-chip h" id="roleDis">⚓ HOST</div>
  </div>
  <div class="sbar wait" id="sbar"><div class="sdot p"></div><span id="sbarT">…</span></div>
  <div class="rbar" id="rbar"></div>
  <div class="bell-zone">
    <div class="pills" id="pills"></div>
    <div class="bell-wrap" id="bellWrap">
      <div class="bglow"></div>
      <div class="ring1"></div><div class="ring2"></div><div class="ring3"></div>
      <button class="bell off" id="bellBtn">🔔</button>
    </div>
    <div class="bell-cap" id="bellCap">waiting…</div>
  </div>
  <div class="wa-wrap" id="waWrap" style="display:none">
    <div class="wa-lbl" id="waLbl">offline — send whatsapp</div>
    <div class="wa-row" onclick="openWa()">
      <div class="wa-ico">💬</div>
      <div><div class="wa-name" id="waName">—</div><div class="wa-num" id="waNum">—</div></div>
    </div>
  </div>

  <!-- ── Chat ── -->
  <div class="chat-box">
    <div class="chat-head">
      <span class="chat-head-lbl">💬 Direct Message</span>
      <span class="chat-badge" id="chatBadge">NEW</span>
    </div>
    <div class="chat-msgs" id="chatMsgs">
      <div class="chat-empty" id="chatEmpty">Messages will appear here once connected</div>
    </div>
    <div class="chat-status on" id="chatStatus">Not connected — waiting for other side…</div>
    <div class="chat-inp-row" id="chatInputRow" style="display:none">
      <input class="chat-inp" id="chatIn" placeholder="Type a message…" maxlength="300"
        onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChat();}">
      <button class="chat-send-btn" id="chatSendBtn" onclick="sendChat()">➤</button>
    </div>
  </div>

  <label class="dt-row">
    <input type="checkbox" id="dtToggle" onchange="toggleDt(this.checked)">
    <div class="trk"></div><span class="dt-lbl">Show Details</span>
  </label>
  <div class="dtpanel" id="dtPanel">
    <div class="notif-bar" id="notifBar">
      <span>Allow notifications for background alerts</span>
      <button onclick="askNotif()">Allow</button>
    </div>
    <div class="log-box" id="log"><div class="le s">— log —</div></div>
    <button class="btn-ghost" onclick="hardReset()">Change room / reset setup</button>
  </div>
</div>

<!-- ═══════ TIMER ═══════ -->
<div class="scr" id="timerScr">
  <div style="height:4px"></div>
  <div class="t-title">TIMER</div>
  <div class="t-sub">Countdown alarm</div>

  <!-- Preset chips -->
  <div class="t-presets" id="tPresets">
    <button class="t-pre" onclick="setPreset(1)">1m</button>
    <button class="t-pre" onclick="setPreset(5)">5m</button>
    <button class="t-pre" onclick="setPreset(10)">10m</button>
    <button class="t-pre" onclick="setPreset(15)">15m</button>
    <button class="t-pre" onclick="setPreset(30)">30m</button>
    <button class="t-pre" onclick="setPreset(60)">1h</button>
  </div>

  <!-- Time adjuster -->
  <div class="t-adjuster" id="tAdjuster">
    <!-- Minutes -->
    <div class="t-unit">
      <button class="t-adj-btn t-min-adj" onclick="adjTime('min',1)">＋1m</button>
      <div class="t-digits" id="tMinDisplay">00</div>
      <div class="t-unit-lbl">MIN</div>
      <button class="t-adj-btn t-min-adj" onclick="adjTime('min',-1)">－1m</button>
    </div>
    <div class="t-colon">:</div>
    <!-- Seconds -->
    <div class="t-unit">
      <button class="t-adj-btn" onclick="adjTime('sec',10)">＋</button>
      <div class="t-digits" id="tSecDisplay">00</div>
      <div class="t-unit-lbl">SEC</div>
      <button class="t-adj-btn" onclick="adjTime('sec',-10)">－</button>
    </div>
  </div>

  <!-- Countdown ring -->
  <div class="t-ring-wrap" id="tRingWrap">
    <svg class="t-ring-svg" viewBox="0 0 220 220">
      <circle class="t-ring-bg" cx="110" cy="110" r="96"/>
      <circle class="t-ring-prog" id="tRingProg" cx="110" cy="110" r="96"/>
    </svg>
    <div class="t-ring-inner">
      <div class="t-countdown" id="tCountdown">00:00</div>
      <div class="t-ring-lbl" id="tRingLbl">set time above</div>
    </div>
  </div>

  <!-- Controls -->
  <div class="t-controls">
    <button class="t-btn-reset" id="tResetBtn" onclick="timerReset()">RESET</button>
    <button class="t-btn-start" id="tStartBtn" onclick="timerToggle()">START</button>
  </div>

  <!-- Alarm notification hint -->
  <div class="t-notif-hint" id="tNotifHint" style="display:none">
    <span>⚠️ Allow notifications so alarm fires when screen is off</span>
    <button onclick="askNotifTimer()">Allow</button>
  </div>

</div>

<!-- ═══════ BOTTOM NAV ═══════ -->
<nav class="bottom-nav" id="bottomNav" style="display:none">
  <button class="nav-btn active" id="navBell" onclick="switchTab('bell')">
    <span class="nav-ico">🔔</span>
    <span class="nav-lbl">Bell</span>
  </button>
  <button class="nav-btn" id="navTimer" onclick="switchTab('timer')">
    <span class="nav-ico">⏱</span>
    <span class="nav-lbl">Timer</span>
  </button>
</nav>
<script>
/* ═══════════════════════════════════════════════════════════
   DESIGN NOTES — how each issue is fixed
   ──────────────────────────────────────────────────────────
   FIX 1 — Guest connects before host:
     When host comes online it claims peer ID "BELL-{ROOM}-HOST".
     Guest retries peer.connect() every 3s but gets peer-unavailable.
     ROOT CAUSE: after peer-unavailable error, the peer object itself
     becomes stale — calling peer.connect() on it again silently fails.
     FIX: on every retry we DESTROY the peer and CREATE A NEW ONE,
     then call connect() fresh. This guarantees a clean attempt.

   FIX 2 — Mirror host shows "waiting" but rings:
     Mirror receives BELL relays from primary but its guestConns is
     empty (guests connect to primary, not mirror). So updateHostStatus()
     always showed "waiting". FIX: primary broadcasts guest count to
     mirrors via GUEST_STATUS message. Mirror uses this count for UI.

   FIX 3 — WA button shows late or not at all:
     evalWa() was only called in disconnect handlers. FIX: call it
     immediately on page load, on peer startup, on every state change.

   FIX 4 — Auto-fill host WA for guest:
     Host runs a second tiny peer "BELL-{ROOM}-INFO". When guest
     types room code, a temp peer connects to INFO peer, receives the
     host WA number, and auto-fills the field.
   ═══════════════════════════════════════════════════════════ */

const K={ROLE:'b_role',ROOM:'b_room',DEV:'b_dev',MWA:'b_mwa',OWA:'b_owa',DT:'b_dt'};
const ls=k=>localStorage.getItem(k);
const wr=(k,v)=>localStorage.setItem(k,v);
const rm=k=>localStorage.removeItem(k);

// Session config
let myRole=null,myRoom=null,myDev=null,myWa=null,otherWa=null,selRole=null;

// Host state
let isPrimary=false;
let peer=null;         // main peer
let infoPeer=null;     // host info peer (host only)
let guestConns={};     // peerId → {conn,dev}  — primary receives these
let mirrorConns={};    // peerId → conn        — primary receives these
let primaryConn=null;  // mirror → primary connection
let mirrorGuestCount=0;// mirror's cached guest count from primary

// Guest state
let guestPeer=null;    // separate peer object for guest (FIX 1: recreated each attempt)
let hostConn=null;
let gConnected=false;
let gRetryTimer=null;
let gRetryN=0;

let dying=false;

/* ── Audio ── */
let AC;
function getAC(){if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC;}
function playBell(v=1){
  const c=getAC();
  [[900,450,2.2,v],[1800,900,1.4,v*.1],[2700,1350,1,v*.06]].forEach(([f,f2,d,vol])=>{
    const o=c.createOscillator(),g=c.createGain();
    o.connect(g);g.connect(c.destination);o.type='sine';
    o.frequency.setValueAtTime(f,c.currentTime);
    o.frequency.exponentialRampToValueAtTime(f2,c.currentTime+d);
    g.gain.setValueAtTime(vol,c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+d);
    o.start();o.stop(c.currentTime+d);
  });
}
// Audio context is unlocked inside playBell() on actual bell taps only
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});

/* ── Peer ID helpers ── */
function clean(s){return s.toUpperCase().replace(/[^A-Z0-9]/g,'')}
function h32(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))&0x7fffffff;return h.toString(36).toUpperCase();}
function hostPID(room)   {return 'BL-'+clean(room)+'-H'}        // THE one fixed host ID
function infoPID(room)   {return 'BL-'+clean(room)+'-I'}        // host info broadcaster
function mirrorPID(room,dev){return 'BL-'+clean(room)+'-M'+h32(dev)} // mirror host
function guestPID(room,dev) {return 'BL-'+clean(room)+'-G'+h32(dev)} // guest

function pcfg(){return{host:'0.peerjs.com',port:443,secure:true,debug:0,config:{iceServers:[
  {urls:'stun:stun.l.google.com:19302'},
  {urls:'stun:stun1.l.google.com:19302'},
  {urls:'stun:stun2.l.google.com:19302'},
]}}}

/* ── Boot ── */
window.addEventListener('DOMContentLoaded',()=>{
  if(ls(K.DT)==='1'){document.getElementById('dtToggle').checked=true;document.getElementById('dtPanel').classList.add('open');}
  const role=ls(K.ROLE),room=ls(K.ROOM),dev=ls(K.DEV),mwa=ls(K.MWA),owa=ls(K.OWA);
  if(role&&room&&dev){
    selRole=role;markRole(role);
    document.getElementById('roomIn').value=room;
    document.getElementById('devIn').value=dev;
    document.getElementById('myWaIn').value=mwa||'';
    document.getElementById('otherWaIn').value=owa||'';
    document.getElementById('savedTxt').textContent=`${role==='host'?'⚓ Host':'📱 Guest'} · ${dev} · Room: ${room}`;
    document.getElementById('savedNotice').style.display='flex';
    updateOtherLabels(role);chk();
    setTimeout(tryGo,700);
  }
});

/* ── Setup ── */
function pickRole(r){selRole=r;markRole(r);updateOtherLabels(r);chk();}
function markRole(r){
  document.getElementById('rH').className='role'+(r==='host'?' ah':'');
  document.getElementById('rG').className='role'+(r==='guest'?' ag':'');
}
function updateOtherLabels(r){
  document.getElementById('otherLbl').textContent=r==='host'?"Guest's WhatsApp":"Host's WhatsApp";
  document.getElementById('otherHint').textContent=r==='host'
    ?"Message this when the guest is offline."
    :"Auto-filled when you enter room code if host is online. Or enter manually.";
}

let infoFetchTimer=null;
function onRoomInput(){
  chk();
  if(selRole!=='guest') return;
  const room=document.getElementById('roomIn').value.trim();
  if(room.length<2) return;
  clearTimeout(infoFetchTimer);
  // FIX 4: debounce then probe host info peer
  infoFetchTimer=setTimeout(()=>probeHostInfo(room),900);
}

// FIX 4: Guest probes host INFO peer to get host WA number
function probeHostInfo(room){
  const tid='BL-TMP-'+Math.random().toString(36).substr(2,8).toUpperCase();
  let tmp,done=false;
  try{tmp=new Peer(tid,pcfg());}catch(e){return;}
  const finish=()=>{done=true;try{tmp.destroy();}catch(e){}};
  const to=setTimeout(finish,8000);
  tmp.on('open',()=>{
    const c=tmp.connect(infoPID(room),{reliable:true});
    c.on('open',()=>c.send('wa?'));
    c.on('data',d=>{
      if(d&&d.wa){
        clearTimeout(to);
        document.getElementById('otherWaIn').value=d.wa;
        document.getElementById('autoBadge').classList.add('on');
        chk();finish();
      }
    });
    c.on('error',finish);
    c.on('close',finish);
  });
  tmp.on('error',finish);
}

function chk(){
  const ok=selRole&&document.getElementById('roomIn').value.trim().length>=2&&document.getElementById('devIn').value.trim().length>=1;
  const b=document.getElementById('goBtn');
  b.disabled=!ok;
  b.textContent=!selRole?'START':(selRole==='host'?'⚓ START AS HOST':'📱 START AS GUEST');
}

function tryGo(){
  const room=document.getElementById('roomIn').value.trim().toUpperCase();
  const dev=document.getElementById('devIn').value.trim();
  const mwa=document.getElementById('myWaIn').value.trim();
  const owa=document.getElementById('otherWaIn').value.trim();
  if(!selRole||room.length<2||dev.length<1)return;
  myRole=selRole;myRoom=room;myDev=dev;myWa=mwa||null;otherWa=owa||null;
  wr(K.ROLE,myRole);wr(K.ROOM,myRoom);wr(K.DEV,myDev);
  if(myWa)wr(K.MWA,myWa);else rm(K.MWA);
  if(otherWa)wr(K.OWA,otherWa);else rm(K.OWA);
  showMain();
  if(myRole==='host')startHost();
  else startGuest();
}

function hardReset(){
  dying=true;
  clearTimeout(gRetryTimer);clearTimeout(infoFetchTimer);
  if(peer)try{peer.destroy();}catch(e){}
  if(infoPeer)try{infoPeer.destroy();}catch(e){}
  if(guestPeer)try{guestPeer.destroy();}catch(e){}
  Object.keys(K).forEach(k=>rm(K[k]));
  location.reload();
}

/* ── Show main ── */
function showMain(){
  show('mainScr');
  showNav();
  document.getElementById('roomDis').textContent=myRoom;
  const rc=document.getElementById('roleDis');
  rc.textContent=(myRole==='host'?'⚓ ':'📱 ')+myDev;
  rc.className='role-chip '+(myRole==='host'?'h':'g');
  checkNotif();
  setChatEnabled(false); // enabled once connected
  // Fix 2: No self-ring on load — only ring other device on connect (see ANNOUNCE below)
  // FIX 3: evaluate WA immediately when screen loads
  setTimeout(evalWa,800);
}

/* ══════════════════════════════════════════════════
   HOST — PRIMARY
   Claims "BL-{ROOM}-H". All guests connect here.
   ══════════════════════════════════════════════════ */
function startHost(){
  const pid=hostPID(myRoom);
  lg(`Claiming primary: ${pid}`,'s');
  setSbar('conn','Starting host…');
  if(peer)try{peer.destroy();}catch(e){}
  peer=new Peer(pid,pcfg());

  peer.on('open',()=>{
    isPrimary=true;
    lg('Primary host online ✓','s');
    setSbar('wait','Waiting for guests…');
    setBell(false,'waiting for guests');
    renderPills();evalWa(); // FIX 3
    startInfoPeer();        // FIX 4
  });

  peer.on('connection',inc=>{
    const m=inc.metadata||{};
    if(m.type==='mirror') acceptMirror(inc,m.dev||'Mirror');
    else acceptGuest(inc,m.dev||'Guest');
  });

  peer.on('error',err=>{
    if(dying)return;
    lg('Host err: '+err.type,'s');
    if(err.type==='unavailable-id'){
      lg('Primary taken — starting as mirror','s');
      startMirror();
    } else {
      setSbar('off','Error — retrying in 4s');
      setTimeout(()=>{if(!dying)startHost();},4000);
    }
  });

  peer.on('disconnected',()=>{
    if(dying)return;
    try{peer.reconnect();}catch(e){setTimeout(()=>{if(!dying)startHost();},3000);}
  });
}

/* ── FIX 4: Info peer — answers host WA queries ── */
function startInfoPeer(){
  if(!myWa)return;
  if(infoPeer)try{infoPeer.destroy();}catch(e){}
  infoPeer=new Peer(infoPID(myRoom),pcfg());
  infoPeer.on('open',()=>lg('Info peer ready','s'));
  infoPeer.on('connection',c=>{
    c.on('data',d=>{
      if(d==='wa?'){try{c.send({wa:myWa});}catch(e){}setTimeout(()=>{try{c.close();}catch(e){}},500);}
    });
  });
  infoPeer.on('error',err=>lg('Info err: '+err.type+' (ok)','s'));
  infoPeer.on('disconnected',()=>{if(!dying)try{infoPeer.reconnect();}catch(e){}});
}

/* ── Accept mirror (extra host device) ── */
function acceptMirror(conn,dev){
  mirrorConns[conn.peer]=conn;
  conn.on('open',()=>{
    lg(`Mirror linked: ${dev}`,'s');
    updateHostStatus();
    // FIX 2: immediately tell mirror the current guest count
    sendToMirror(conn,{t:'GC',n:Object.keys(guestConns).length});
  });
  conn.on('data',d=>{
    // Mirror asking to ring all guests (host button on mirror device)
    if(d&&d.t==='RING_ALL'){ringAllGuests(dev);}
    // Mirror relaying a chat from its guests or its own message
    if(d&&d.t==='CHAT'){
      onReceiveChat(d);
      // Fan to all guests and other mirrors
      Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send(d);}catch(e){}});
      Object.entries(mirrorConns).forEach(([pid,mc])=>{if(pid!==conn.peer&&mc.open)try{mc.send(d);}catch(e){}});
    }
  });
  conn.on('close',()=>{delete mirrorConns[conn.peer];lg(`Mirror left: ${dev}`,'s');updateHostStatus();});
  conn.on('error',()=>{delete mirrorConns[conn.peer];updateHostStatus();});
}

/* ── Accept guest ── */
function acceptGuest(conn,dev){
  guestConns[conn.peer]={conn,dev};
  conn.on('open',()=>{
    lg(`Guest connected: ${dev}`,'s');
    updateHostStatus();
    broadcastGC();
    hideWa();
    setChatEnabled(true);
    // Fix: keep connection alive when screen off
    if(Object.keys(guestConns).length===1) acquireBellWakeLock();
    // Fix 3: ring the guest to announce host is here
    try{conn.send({t:'ANNOUNCE',from:myDev});}catch(e){}
  });
  conn.on('data',d=>{
    if(d==='BELL'){
      onReceiveBell(dev);
      broadcastToMirrors({t:'BELL',from:dev});
    }
    if(d&&d.t==='ANNOUNCE'){
      // guest arrived — ring host and all mirrors
      onReceiveBell(d.from||dev);
      broadcastToMirrors({t:'BELL',from:d.from||dev});
    }
    if(d&&d.t==='CHAT'){
      // Show on this host device
      onReceiveChat(d);
      // Fan to all other guests and mirrors
      Object.values(guestConns).forEach(g=>{if(g.conn!==conn&&g.conn.open)try{g.conn.send(d);}catch(e){}});
      broadcastToMirrors(d);
    }
  });
  conn.on('close',()=>{
    delete guestConns[conn.peer];
    lg(`Guest left: ${dev}`,'s');
    updateHostStatus();broadcastGC();evalWa(); // FIX 3
    if(Object.keys(guestConns).length===0){setChatEnabled(false);releaseBellWakeLock();}
  });
  conn.on('error',()=>{
    delete guestConns[conn.peer];
    updateHostStatus();broadcastGC();evalWa();
    if(Object.keys(guestConns).length===0){setChatEnabled(false);releaseBellWakeLock();}
  });
}

function broadcastGC(){
  const n=Object.keys(guestConns).length;
  Object.values(mirrorConns).forEach(c=>sendToMirror(c,{t:'GC',n}));
}
function broadcastToMirrors(pkg){
  Object.values(mirrorConns).forEach(c=>sendToMirror(c,pkg));
}
function sendToMirror(conn,pkg){
  if(conn&&conn.open)try{conn.send(pkg);}catch(e){}
}

function ringAllGuests(fromDev){
  Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send('BELL');}catch(e){}});
  broadcastToMirrors({t:'HOSTBELL'});
  doRingUI();
  lg(`🔔 ${fromDev||'Host'} rang all guests`,'');
}

function updateHostStatus(){
  const g=Object.keys(guestConns).length;
  const m=Object.keys(mirrorConns).length;
  if(g>0){
    setSbar('ok',`${g} guest${g>1?'s':''} online${m?' · '+m+' more host device'+(m>1?'s':''):''}` );
    setBell(true,'tap to ring all guests');
  } else {
    setSbar('wait','Waiting for guests…');
    setBell(false,'waiting for guests');
  }
  renderPills();
}

/* ══════════════════════════════════════════════════
   MIRROR HOST (extra host devices)
   ══════════════════════════════════════════════════ */
function startMirror(){
  const mid=mirrorPID(myRoom,myDev);
  lg(`Starting mirror: ${mid}`,'s');
  isPrimary=false;
  if(peer)try{peer.destroy();}catch(e){}
  peer=new Peer(mid,pcfg());

  peer.on('open',()=>{
    lg('Mirror peer ready ✓','s');
    setSbar('conn','Linking to primary host…');
    setBell(false,'linking…');
    linkToPrimary();
  });

  peer.on('error',err=>{
    if(dying)return;
    lg('Mirror err: '+err.type,'s');
    if(err.type==='unavailable-id'){
      // ID taken — add random suffix
      const alt='BL-'+clean(myRoom)+'-M'+Math.random().toString(36).substr(2,5).toUpperCase();
      if(peer)try{peer.destroy();}catch(e){}
      peer=new Peer(alt,pcfg());
      peer.on('open',()=>{isPrimary=false;linkToPrimary();});
      peer.on('error',e=>{lg('Alt mirror err: '+e.type,'s');setTimeout(()=>{if(!dying)startMirror();},4000);});
      peer.on('disconnected',()=>{if(!dying)try{peer.reconnect();}catch(e){startMirror();}});
    } else {
      setTimeout(()=>{if(!dying)startMirror();},4000);
    }
  });

  peer.on('disconnected',()=>{
    if(dying)return;
    try{peer.reconnect();}catch(e){setTimeout(()=>{if(!dying)startMirror();},3000);}
  });

  // Mirrors also accept direct guest connections (fallback)
  peer.on('connection',inc=>{
    const m=inc.metadata||{};
    if(m.type!=='mirror') acceptGuest(inc,m.dev||'Guest');
  });
}

function linkToPrimary(){
  if(dying)return;
  primaryConn=null;
  const pid=hostPID(myRoom);
  lg(`Mirror → primary: ${pid}`,'s');

  let c;
  try{c=peer.connect(pid,{reliable:true,metadata:{type:'mirror',dev:myDev}});}
  catch(e){lg('mirror connect threw: '+e,'s');setTimeout(()=>{if(!dying)linkToPrimary();},3000);return;}

  const to=setTimeout(()=>{
    if(!primaryConn){lg('Primary link timeout — retry','s');try{c.close();}catch(e){}setTimeout(()=>{if(!dying)linkToPrimary();},3000);}
  },10000);

  c.on('open',()=>{
    clearTimeout(to);
    primaryConn=c;
    lg('Linked to primary ✓','s');
    // FIX 2: status will be set when we receive GC message
    setSbar('wait','Waiting for guests…');
    setBell(false,'waiting for guests');
    evalWa();
    const hb=setInterval(()=>{if(c.open)try{c.send('ping');}catch(e){}else clearInterval(hb);},10000);
  });

  c.on('data',d=>{
    if(!d)return;
    // FIX 2: primary pushed guest count → update mirror UI correctly
    if(d.t==='GC'){
      mirrorGuestCount=d.n;
      if(d.n>0){
        setSbar('ok',`${d.n} guest${d.n>1?'s':''} connected`);
        setBell(true,'tap to ring all guests');
        setChatEnabled(true);
      } else {
        setSbar('wait','Waiting for guests…');
        setBell(false,'waiting for guests');
        setChatEnabled(false);
      }
      renderPills();evalWa();
    }
    // Bell relayed from primary (a guest rang)
    if(d.t==='BELL') onReceiveBell(d.from||'Guest');
    // Host bell from primary (host rang back)
    if(d.t==='HOSTBELL') onReceiveBell('Host');
    // Chat relayed from primary
    if(d.t==='CHAT'){
      onReceiveChat(d);
      // Also forward to any guests directly connected to this mirror
      Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send(d);}catch(e){}});
    }
  });

  c.on('close',()=>{
    clearTimeout(to);
    primaryConn=null;
    mirrorGuestCount=0;
    lg('Primary link lost — retry in 3s','s');
    setSbar('conn','Reconnecting to primary…');
    setBell(false,'reconnecting…');
    evalWa();
    setChatEnabled(false);
    setTimeout(()=>{if(!dying)linkToPrimary();},3000);
  });

  c.on('error',()=>{
    clearTimeout(to);
    primaryConn=null;
    mirrorGuestCount=0;
    setTimeout(()=>{if(!dying)linkToPrimary();},3000);
  });
}

/* ══════════════════════════════════════════════════
   SEND RING (bell button handler for both roles)
   ══════════════════════════════════════════════════ */
function sendRing(){
  if(myRole==='host'){
    if(isPrimary){
      ringAllGuests(myDev);
    } else {
      // Mirror tells primary to ring all guests
      if(primaryConn&&primaryConn.open){
        try{primaryConn.send({t:'RING_ALL'});}catch(e){}
      }
      // Also ring any local guests this mirror has accepted
      Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send('BELL');}catch(e){}});
      doRingUI();
      lg('🔔 You rang all guests','');
    }
  } else {
    // Guest → send BELL to host
    if(!hostConn||!hostConn.open)return;
    try{hostConn.send('BELL');}catch(e){return;}
    doRingUI();
    lg('🔔 You rang the host','');
  }
}

/* ══════════════════════════════════════════════════
   GUEST — FIX 1: Destroy + recreate peer on every retry
   ══════════════════════════════════════════════════ */
function startGuest(){
  if(dying)return;
  gRetryN=0;
  gConnected=false;
  hostConn=null;
  evalWa(); // FIX 3: show WA button right away if otherWa set
  doGuestAttempt();
}

function doGuestAttempt(){
  if(dying)return;
  clearTimeout(gRetryTimer);

  lg(`Guest attempt #${gRetryN+1}…`,'s');
  setSbar('conn',gRetryN===0?'Starting…':`Connecting… (attempt ${gRetryN+1})`);

  // FIX 1: Destroy old peer EVERY TIME before creating new one.
  // A peer that received peer-unavailable is permanently broken for
  // outgoing connections — we must start fresh.
  if(guestPeer){try{guestPeer.destroy();}catch(e){} guestPeer=null;}

  const gid=guestPID(myRoom,myDev);
  let p;
  try{p=new Peer(gid,pcfg());}
  catch(e){lg('Peer() threw: '+e,'s');schedRetry();return;}
  guestPeer=p;

  p.on('open',()=>{
    lg('Guest peer ready ✓','s');
    // Now connect to host
    doConnect(p);
  });

  p.on('error',err=>{
    if(dying)return;
    if(p!==guestPeer)return; // stale
    lg('Guest peer err: '+err.type,'s');
    if(err.type==='unavailable-id'){
      // Our guest ID clashes — recreate with random suffix
      try{p.destroy();}catch(e){}
      const alt=guestPID(myRoom,myDev)+Math.random().toString(36).substr(2,3).toUpperCase();
      let p2;
      try{p2=new Peer(alt,pcfg());}catch(e){schedRetry();return;}
      guestPeer=p2;
      p2.on('open',()=>doConnect(p2));
      p2.on('error',e2=>{if(p2===guestPeer){lg('Alt guest err: '+e2.type,'s');schedRetry();}});
      p2.on('disconnected',()=>{if(!dying&&p2===guestPeer)try{p2.reconnect();}catch(e){schedRetry();}});
    } else if(err.type==='peer-unavailable'){
      // Host not online yet — schedule retry with full peer recreation
      lg('Host not online yet','s');
      setBell(false,'host offline');
      evalWa(); // FIX 3
      schedRetry();
    } else {
      schedRetry();
    }
  });

  p.on('disconnected',()=>{
    if(dying||p!==guestPeer)return;
    try{p.reconnect();}catch(e){schedRetry();}
  });
}

function doConnect(p){
  if(dying||!p||p.destroyed)return;
  const pid=hostPID(myRoom);
  lg(`→ ${pid}`,'s');

  let c;
  try{c=p.connect(pid,{reliable:true,metadata:{dev:myDev,type:'guest'}});}
  catch(e){lg('connect() threw','s');schedRetry();return;}

  // Hard timeout — if no open in 8s, retry with fresh peer
  const to=setTimeout(()=>{
    if(!gConnected){lg('Conn timeout','s');try{c.close();}catch(e){}schedRetry();}
  },8000);

  c.on('open',()=>{
    clearTimeout(to);
    gConnected=true;
    hostConn=c;
    gRetryN=0;
    lg('✓ Connected to host!','s');
    setSbar('ok','Host connected 🎉');
    setBell(true,'tap to ring the host');
    renderPills();
    hideWa();
    setChatEnabled(true);
    acquireBellWakeLock(); // keep screen/connection alive
    // Fix 3: ring the host to announce guest has arrived
    try{c.send({t:'ANNOUNCE',from:myDev});}catch(e){}
    // Heartbeat — detect silent disconnects
    const hb=setInterval(()=>{
      if(!c.open){
        clearInterval(hb);
        if(gConnected){gConnected=false;hostConn=null;evalWa();schedRetry();}
      } else {
        try{c.send('ping');}catch(e){}
      }
    },8000);
  });

  c.on('data',d=>{
    if(d==='BELL') onReceiveBell('Host');
    if(d&&d.t==='CHAT') onReceiveChat(d);
    if(d&&d.t==='ANNOUNCE') onReceiveBell(d.from||'Host'); // host arrived — ring guest
  });

  c.on('close',()=>{
    clearTimeout(to);
    if(!gConnected)return;
    gConnected=false;hostConn=null;
    lg('Host disconnected','s');
    setSbar('off','Host offline');
    setBell(false,'host offline');
    renderPills();evalWa();schedRetry();
    setChatEnabled(false);
    releaseBellWakeLock();
  });

  c.on('error',err=>{
    clearTimeout(to);
    gConnected=false;hostConn=null;
    lg('Conn err: '+err.type,'s');
    evalWa();schedRetry();
    releaseBellWakeLock();
  });
}

// FIX 1: schedRetry always calls doGuestAttempt which destroys peer first
function schedRetry(){
  if(dying)return;
  clearTimeout(gRetryTimer);
  gRetryN++;
  const delay=3000;
  setSbar('conn',`Waiting for host… (retry ${gRetryN})`);
  showRBar(`Retry ${gRetryN} in 3s`);
  gRetryTimer=setTimeout(()=>{
    hideRBar();
    if(!dying&&!gConnected) doGuestAttempt(); // full peer recreation
  },delay);
}

/* ══════════════════════════════════════════════════
   RECEIVE BELL
   ══════════════════════════════════════════════════ */
function onReceiveBell(from){
  playBell();doRingUI();flashFn();
  if(navigator.vibrate)navigator.vibrate([200,80,200,80,400]);
  lg(`🔔 ${from} rang!`,'r');
  pushNotif('🔔 Bell',`${from} rang your bell!`);
  // Screen-off: ask SW to show notification immediately
  if(document.hidden && 'serviceWorker' in navigator && navigator.serviceWorker.controller){
    navigator.serviceWorker.controller.postMessage({
      type:'BELL_RING', from
    });
  }
}

/* ── Bell Wake Lock — keep connection alive when screen dims ── */
let bellWakeLock=null;
async function acquireBellWakeLock(){
  if('wakeLock' in navigator){
    try{
      bellWakeLock=await navigator.wakeLock.request('screen');
      bellWakeLock.addEventListener('release',()=>{
        bellWakeLock=null;
        // Re-acquire if still connected (screen turned off by system)
        if((myRole==='host'&&Object.keys(guestConns).length>0)||(myRole==='guest'&&gConnected)){
          setTimeout(acquireBellWakeLock,1000);
        }
      });
      lg('Wake lock acquired ✓','s');
    }catch(e){ lg('Wake lock unavailable','s'); }
  }
  // Web Lock keepalive so SW stays alive and PeerJS connection is maintained
  if('locks' in navigator){
    navigator.locks.request('bell-keepalive',{mode:'shared'},()=>new Promise(res=>{
      window._bellLockResolve=res;
    }));
  }
}
function releaseBellWakeLock(){
  if(bellWakeLock){try{bellWakeLock.release();}catch(e){} bellWakeLock=null;}
  if(window._bellLockResolve){window._bellLockResolve();window._bellLockResolve=null;}
}

/* ══════════════════════════════════════════════════
   WHATSAPP — FIX 3: evalWa() called everywhere
   ══════════════════════════════════════════════════ */
function evalWa(){
  if(!otherWa){hideWa();return;}
  let offline;
  if(myRole==='host') offline=Object.keys(guestConns).length===0;
  else offline=!gConnected;
  if(offline){
    document.getElementById('waLbl').textContent=myRole==='host'?'guest offline — send whatsapp':'host offline — send whatsapp';
    document.getElementById('waName').textContent=myRole==='host'?'Message Guest':'Message Host';
    document.getElementById('waNum').textContent=otherWa;
    document.getElementById('waWrap').style.display='flex';
  } else {
    hideWa();
  }
}
function hideWa(){document.getElementById('waWrap').style.display='none';}
function openWa(){
  if(!otherWa)return;
  const n=otherWa.replace(/[^\d]/g,'');
  window.open(`https://wa.me/${n}?text=${encodeURIComponent('COME SHARP')}`,'_blank');
  lg('📲 WhatsApp sent','w');
}

/* ══════════════════════════════════════════════════
   BELL UI
   ══════════════════════════════════════════════════ */
function setBell(on,cap){
  const b=document.getElementById('bellBtn'),c=document.getElementById('bellCap');
  if(on)b.classList.remove('off');else b.classList.add('off');
  if(cap)c.textContent=cap;
}
function doRingUI(){
  const b=document.getElementById('bellBtn'),w=document.getElementById('bellWrap');
  b.classList.remove('swing');void b.offsetWidth;b.classList.add('swing');
  w.classList.remove('ringing');void w.offsetWidth;w.classList.add('ringing');
  setTimeout(()=>{b.classList.remove('swing');w.classList.remove('ringing');},900);
}
function flashFn(){const f=document.getElementById('flash');f.classList.add('on');setTimeout(()=>f.classList.remove('on'),180);}

function renderPills(){
  const el=document.getElementById('pills');el.innerHTML='';
  if(myRole==='host'){
    const gc=Object.keys(guestConns).length,mc=Object.keys(mirrorConns).length;
    const gcDisplay=isPrimary?gc:mirrorGuestCount;
    if(gcDisplay===0&&mc===0){el.innerHTML='<span class="pill">no devices yet</span>';return;}
    for(let i=0;i<gcDisplay;i++)el.appendChild(mkPill('📱 Guest',true));
    for(let i=0;i<mc;i++)el.appendChild(mkPill('⚓ Host device',true));
    if(!isPrimary&&primaryConn)el.appendChild(mkPill('⚓ Primary',true));
  } else {
    el.appendChild(mkPill('⚓ Host',gConnected));
  }
}
function mkPill(lbl,alive){const p=document.createElement('span');p.className='pill'+(alive?' alive':'');p.textContent=lbl+(alive?' ●':' ○');return p;}

/* ── Misc helpers ── */
function setSbar(t,m){const e=document.getElementById('sbar');e.className='sbar '+t;const p=(t==='wait'||t==='conn')?' p':'';e.innerHTML=`<div class="sdot${p}"></div><span>${m}</span>`;}
function showRBar(m){const b=document.getElementById('rbar');b.textContent='↻ '+m;b.classList.add('on');}
function hideRBar(){document.getElementById('rbar').classList.remove('on');}
function lg(msg,type){
  const box=document.getElementById('log');
  const ph=box.querySelector('.s');if(ph&&box.children.length===1)ph.remove();
  const e=document.createElement('div');e.className='le '+(type||'');
  const t=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  e.textContent=`[${t}] ${msg}`;box.appendChild(e);
  while(box.children.length>80)box.removeChild(box.firstChild);
  box.scrollTop=box.scrollHeight;
}
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));document.getElementById(id).classList.add('on');}
function toggleDt(on){document.getElementById('dtPanel').classList.toggle('open',on);wr(K.DT,on?'1':'0');}
function checkNotif(){if(!('Notification'in window)||Notification.permission==='granted')document.getElementById('notifBar').classList.add('gone');}
function askNotif(){Notification.requestPermission().then(p=>{if(p==='granted')document.getElementById('notifBar').classList.add('gone');});}
function pushNotif(title,body){
  if(!('Notification'in window)||Notification.permission!=='granted')return;
  navigator.serviceWorker.ready
    .then(r=>r.showNotification(title,{body,vibrate:[200,100,200,100,200],tag:'bell',renotify:true,
      icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>'}))
    .catch(()=>{try{new Notification(title,{body});}catch(e){}});
}

/* ══════════════════════════════════════════════════
   CHAT
   ══════════════════════════════════════════════════ */
let chatUnread=0;
let chatVisible=true; // track if page is visible

function setChatEnabled(on){
  const status=document.getElementById('chatStatus');
  const row=document.getElementById('chatInputRow');
  if(on){
    status.classList.remove('on');
    row.style.display='flex';
  } else {
    status.textContent='Not connected — waiting for other side…';
    status.classList.add('on');
    row.style.display='none';
  }
}

function sendChat(){
  const inp=document.getElementById('chatIn');
  const txt=inp.value.trim();
  if(!txt)return;
  const pkg={t:'CHAT',msg:txt,from:myDev,ts:Date.now()};
  let sent=false;
  if(myRole==='host'){
    // Primary: send to all guests + relay to mirrors
    if(isPrimary){
      Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send(pkg);}catch(e){}});
      broadcastToMirrors(pkg);
      sent=true;
    } else {
      // Mirror: send to local guests + tell primary to relay
      Object.values(guestConns).forEach(g=>{if(g.conn.open)try{g.conn.send(pkg);}catch(e){}});
      if(primaryConn&&primaryConn.open)try{primaryConn.send(pkg);}catch(e){}
      sent=true;
    }
  } else {
    if(hostConn&&hostConn.open){try{hostConn.send(pkg);}catch(e){}sent=true;}
  }
  if(!sent)return;
  addChatMsg(txt,myDev,true);
  inp.value='';
}

function onReceiveChat(pkg){
  if(!pkg||!pkg.msg)return;
  addChatMsg(pkg.msg,pkg.from||'?',false);
  // If chat is offscreen or tab hidden, badge it
  if(document.hidden){
    chatUnread++;
    document.getElementById('chatBadge').textContent=chatUnread>9?'9+':chatUnread;
    document.getElementById('chatBadge').classList.add('on');
    pushNotif('💬 '+pkg.from,pkg.msg);
  }
}

function addChatMsg(text,from,isMe){
  const box=document.getElementById('chatMsgs');
  const empty=document.getElementById('chatEmpty');
  if(empty) empty.remove();

  const wrap=document.createElement('div');
  wrap.className='cmsg '+(isMe?'me':'them');

  const ts=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
  const meta=document.createElement('div');
  meta.className='cmsg-meta';
  // Always show device name as sender — use myDev for own messages
  meta.textContent=isMe?`${myDev}  ${ts}`:`${from}  ${ts}`;

  const bub=document.createElement('div');
  bub.className='cmsg-bub';
  bub.textContent=text;

  wrap.appendChild(meta);
  wrap.appendChild(bub);
  box.appendChild(wrap);

  while(box.children.length>200) box.removeChild(box.firstChild);
  box.scrollTop=box.scrollHeight;
}

// Clear unread badge when user taps chat area
document.addEventListener('DOMContentLoaded',()=>{
  // Bell button — only fires sendRing, strictly isolated
  const bellBtn=document.getElementById('bellBtn');
  // Use touchend to avoid 300ms delay on mobile and ghost click
  let bellTouchActive=false;
  bellBtn.addEventListener('touchstart',e=>{
    e.stopPropagation();
    bellTouchActive=true;
  },{passive:true});
  bellBtn.addEventListener('touchend',e=>{
    e.stopPropagation();
    e.preventDefault(); // prevent ghost click
    if(bellTouchActive){ bellTouchActive=false; sendRing(); }
  });
  bellBtn.addEventListener('touchcancel',()=>{ bellTouchActive=false; });
  // Desktop click fallback
  bellBtn.addEventListener('click',e=>{
    e.stopPropagation();
    if(!bellTouchActive) sendRing(); // touchend already handled it on mobile
  });

  // Alarm stop button — instant response on touch
  const stopBtn=document.getElementById('tAlarmStopBtn');
  stopBtn.addEventListener('touchend',e=>{e.preventDefault();stopAlarm();},{passive:false});
  stopBtn.addEventListener('click',stopAlarm);

  document.getElementById('chatMsgs')?.addEventListener('click',()=>{
    chatUnread=0;
    document.getElementById('chatBadge').classList.remove('on');
  });
  document.getElementById('chatIn')?.addEventListener('focus',()=>{
    chatUnread=0;
    document.getElementById('chatBadge').classList.remove('on');
  });
});

// ── Reconnect on tab focus
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'&&myRoom&&!dying){
    chatUnread=0;
    document.getElementById('chatBadge').classList.remove('on');
    if(myRole==='guest'&&!gConnected){clearTimeout(gRetryTimer);doGuestAttempt();}
  }
  // Timer: correct for drift when screen wakes
  if(document.visibilityState==='visible') timerVisibilityResume();
});

/* ══════════════════════════════════════════════════
   TAB NAVIGATION
   ══════════════════════════════════════════════════ */
let currentTab='bell';

function switchTab(tab){
  currentTab=tab;
  document.getElementById('navBell').classList.toggle('active',tab==='bell');
  document.getElementById('navTimer').classList.toggle('active',tab==='timer');
  // Only switch between main and timer screens (not setup)
  if(myRoom){ // only if setup is done
    if(tab==='bell'){
      document.getElementById('mainScr').classList.add('on');
      document.getElementById('timerScr').classList.remove('on');
    } else {
      document.getElementById('timerScr').classList.add('on');
      document.getElementById('mainScr').classList.remove('on');
      timerCheckNotif();
    }
  }
}

// Show nav once setup complete
function showNav(){
  document.getElementById('bottomNav').style.display='flex';
}

/* ══════════════════════════════════════════════════
   TIMER
   ══════════════════════════════════════════════════ */
let tTotalSec=0;      // total seconds set by user
let tRemainSec=0;     // seconds remaining
let tRunning=false;
let tInterval=null;
let tStartTime=null;  // wall-clock time when started (for drift correction)
let tExpireTime=null; // wall-clock timestamp when alarm should fire
let tAlarmNodes=[];   // Web Audio nodes for alarm
let tAlarmInterval=null;
let tPresetStep=1;    // minute step size — matches last chosen preset
const T_CIRC=2*Math.PI*96; // SVG circle circumference ~603

function setPreset(mins){
  timerReset();
  tTotalSec=mins*60;
  tRemainSec=tTotalSec;
  tPresetStep=mins; // remember this unit for +/- buttons
  updateAdjStepLabels();
  renderTimerDisplay();
  document.querySelectorAll('.t-pre').forEach(b=>{
    b.classList.toggle('sel', parseInt(b.textContent)===mins || (b.textContent==='1h'&&mins===60));
  });
}

function updateAdjStepLabels(){
  const label=tPresetStep>=60?'1h':(tPresetStep+'m');
  // update the +/- min buttons to show current step
  const btns=document.querySelectorAll('.t-min-adj');
  btns[0].textContent='＋'+label;
  btns[1].textContent='－'+label;
}

function adjTime(unit,delta){
  if(tRunning) return;
  if(unit==='min'){
    // delta is a sign (+1 or -1); multiply by preset step
    const step=delta>0?tPresetStep:-tPresetStep;
    let mins=Math.floor(tTotalSec/60)+step;
    mins=Math.max(0,Math.min(99*60/60,mins)); // cap at 99 min display
    tTotalSec=mins*60+(tTotalSec%60);
    // de-select presets only if we've drifted from a clean multiple
    const isClean=Object.values([1,5,10,15,30,60]).includes(Math.floor(tTotalSec/60)) && tTotalSec%60===0;
    document.querySelectorAll('.t-pre').forEach(b=>{
      const bm=b.textContent==='1h'?60:parseInt(b.textContent);
      b.classList.toggle('sel', isClean && bm===Math.floor(tTotalSec/60));
    });
  } else {
    let secs=(tTotalSec%60)+delta;
    if(secs<0){secs=50; let m=Math.floor(tTotalSec/60)-1; tTotalSec=Math.max(0,m)*60+secs;}
    else if(secs>=60){secs=0; let m=Math.floor(tTotalSec/60)+1; tTotalSec=Math.min(99,m)*60;}
    else tTotalSec=Math.floor(tTotalSec/60)*60+secs;
    document.querySelectorAll('.t-pre').forEach(b=>b.classList.remove('sel'));
  }
  tTotalSec=Math.max(0,tTotalSec);
  tRemainSec=tTotalSec;
  renderTimerDisplay();
}

function timerToggle(){
  if(tAlarmNodes.length) return; // alarm ringing — ignore
  if(!tTotalSec&&!tRemainSec) return;
  if(tRunning){
    timerPause();
  } else {
    timerStart();
  }
}

function timerStart(){
  if(!tRemainSec) tRemainSec=tTotalSec;
  if(!tRemainSec) return;
  tRunning=true;
  tStartTime=Date.now();
  tExpireTime=Date.now()+tRemainSec*1000;
  document.getElementById('tStartBtn').textContent='PAUSE';
  document.getElementById('tStartBtn').classList.add('running');
  document.getElementById('tAdjuster').style.opacity='0.35';
  document.getElementById('tAdjuster').style.pointerEvents='none';
  document.getElementById('tPresets').style.opacity='0.35';
  document.getElementById('tPresets').style.pointerEvents='none';
  // Schedule SW notification as backup for screen-off
  scheduleSwAlarm(tRemainSec);
  // Use Web Lock to prevent throttling on some browsers
  acquireWakeLock();
  tInterval=setInterval(timerTick,500);
  timerTick();
}

function timerPause(){
  tRunning=false;
  clearInterval(tInterval);tInterval=null;
  cancelSwAlarm();
  releaseWakeLock();
  document.getElementById('tStartBtn').textContent='RESUME';
  document.getElementById('tStartBtn').classList.remove('running');
}

function timerReset(){
  tRunning=false;
  clearInterval(tInterval);tInterval=null;
  stopAlarm();
  cancelSwAlarm();
  releaseWakeLock();
  tRemainSec=tTotalSec;
  tExpireTime=null;
  document.getElementById('tStartBtn').textContent='START';
  document.getElementById('tStartBtn').classList.remove('running');
  document.getElementById('tStartBtn').disabled=false;
  document.getElementById('tAdjuster').style.opacity='';
  document.getElementById('tAdjuster').style.pointerEvents='';
  document.getElementById('tPresets').style.opacity='';
  document.getElementById('tPresets').style.pointerEvents='';
  document.getElementById('tAlarmActive').style.display='none';
  renderTimerDisplay();
}

function timerTick(){
  if(!tRunning) return;
  // Drift-corrected remaining time
  const now=Date.now();
  tRemainSec=Math.max(0,Math.round((tExpireTime-now)/1000));
  renderTimerDisplay();
  if(tRemainSec<=0){
    clearInterval(tInterval);tInterval=null;
    tRunning=false;
    fireAlarm();
  }
}

// Called when screen wakes — correct for throttled timers
function timerVisibilityResume(){
  if(!tRunning||!tExpireTime) return;
  const now=Date.now();
  tRemainSec=Math.max(0,Math.round((tExpireTime-now)/1000));
  if(tRemainSec<=0){
    clearInterval(tInterval);tInterval=null;
    tRunning=false;
    fireAlarm();
  } else {
    renderTimerDisplay();
  }
}

function renderTimerDisplay(){
  const s=tRemainSec>0?tRemainSec:tTotalSec;
  const m=Math.floor(s/60);
  const sec=s%60;
  const str=(m<10?'0':'')+m+':'+(sec<10?'0':'')+sec;
  document.getElementById('tCountdown').textContent=str;
  document.getElementById('tMinDisplay').textContent=m<10?'0'+m:''+m;
  document.getElementById('tSecDisplay').textContent=sec<10?'0'+sec:''+sec;

  // Progress ring
  const prog=document.getElementById('tRingProg');
  const ratio=tTotalSec>0?(tRunning||tRemainSec<tTotalSec)?(tRemainSec/tTotalSec):1:1;
  const offset=T_CIRC*(1-ratio);
  prog.style.strokeDashoffset=offset;

  const danger=tRemainSec>0&&tRemainSec<=10&&tRunning;
  prog.classList.toggle('danger',danger);
  document.getElementById('tCountdown').classList.toggle('danger',danger);
  document.getElementById('tRingLbl').textContent=
    tRunning?'remaining':
    (tRemainSec<tTotalSec&&tRemainSec>0)?'paused':
    (tRemainSec===0&&tTotalSec>0)?'done':
    'set time above';
}

/* ── Alarm ── */
function fireAlarm(){
  // Show alarm UI
  document.getElementById('tAlarmActive').style.display='flex';
  document.getElementById('tAdjuster').style.opacity='0.2';
  document.getElementById('tPresets').style.opacity='0.2';
  document.getElementById('tStartBtn').disabled=true;
  document.getElementById('tRingLbl').textContent='ALARM!';
  document.getElementById('tCountdown').textContent='00:00';
  document.getElementById('tCountdown').classList.add('danger');
  document.getElementById('tRingProg').style.strokeDashoffset=T_CIRC;

  // Play loud repeating alarm sound
  playAlarmSound();
  tAlarmInterval=setInterval(playAlarmSound,2800);

  // Vibrate pattern
  if(navigator.vibrate) navigator.vibrate([500,200,500,200,500,200,800]);

  // Fire notification (works when tab backgrounded)
  fireAlarmNotification();
}

function playAlarmSound(){
  const c=getAC();
  const t=c.currentTime;
  // Loud harsh alarm: alternating two tones
  [[880,0,0.25],[880,0.3,0.25],[1100,0.6,0.25],[1100,0.9,0.25],[880,1.2,0.25],[1100,1.5,0.25]].forEach(([freq,when,dur])=>{
    const o=c.createOscillator();
    const g=c.createGain();
    const dist=c.createWaveShaper();
    // Slight distortion for harshness
    const curve=new Float32Array(256);
    for(let i=0;i<256;i++){const x=i*2/256-1;curve[i]=x*(Math.PI+200)/(Math.PI+200*Math.abs(x));}
    dist.curve=curve;
    o.connect(dist);dist.connect(g);g.connect(c.destination);
    o.type='sawtooth';
    o.frequency.setValueAtTime(freq,t+when);
    g.gain.setValueAtTime(0,t+when);
    g.gain.linearRampToValueAtTime(0.9,t+when+0.02);
    g.gain.setValueAtTime(0.9,t+when+dur-0.03);
    g.gain.linearRampToValueAtTime(0,t+when+dur);
    o.start(t+when);
    o.stop(t+when+dur);
    tAlarmNodes.push(o);
  });
}

function stopAlarm(){
  clearInterval(tAlarmInterval);tAlarmInterval=null;
  tAlarmNodes.forEach(n=>{try{n.stop();}catch(e){}});
  tAlarmNodes=[];
  if(navigator.vibrate) navigator.vibrate(0);
  document.getElementById('tAlarmActive').style.display='none';
  document.getElementById('tCountdown').classList.remove('danger');
}

/* ── Screen-off: Service Worker scheduled notification ── */
let swAlarmTimeout=null;

function scheduleSwAlarm(secs){
  cancelSwAlarm();
  // Post to SW to fire a notification after secs seconds
  if('serviceWorker'in navigator&&navigator.serviceWorker.controller){
    navigator.serviceWorker.controller.postMessage({
      type:'SCHEDULE_ALARM', delayMs:secs*1000
    });
  }
  // Also set a local timeout as primary (faster when tab is active)
  // The SW notification is the backup for screen-off
}

function cancelSwAlarm(){
  if('serviceWorker'in navigator&&navigator.serviceWorker.controller){
    navigator.serviceWorker.controller.postMessage({type:'CANCEL_ALARM'});
  }
}

function fireAlarmNotification(){
  if(!('Notification'in window)||Notification.permission!=='granted') return;
  navigator.serviceWorker.ready.then(reg=>{
    reg.showNotification('⏰ Timer Done!',{
      body:'Your countdown has finished. Tap to open.',
      vibrate:[500,200,500,200,800],
      tag:'timer-alarm',
      renotify:true,
      requireInteraction:true,
      icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⏰</text></svg>',
    });
  }).catch(()=>{
    try{new Notification('⏰ Timer Done!',{body:'Your countdown has finished.'});}catch(e){}
  });
}

/* ── Wake Lock (prevents screen from sleeping on some browsers) ── */
let wakeLock=null;
async function acquireWakeLock(){
  if('wakeLock'in navigator){
    try{
      wakeLock=await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release',()=>{ wakeLock=null; });
    }catch(e){}
  }
  // Web Locks API keepalive (keeps SW from being killed)
  if('locks'in navigator){
    navigator.locks.request('timer-keepalive',{mode:'shared'},()=>new Promise(res=>{
      // Held until releaseWakeLock() resolves it
      window._timerLockResolve=res;
    }));
  }
}
function releaseWakeLock(){
  if(wakeLock){try{wakeLock.release();}catch(e){} wakeLock=null;}
  if(window._timerLockResolve){window._timerLockResolve();window._timerLockResolve=null;}
}

/* ── Timer notification check ── */
function timerCheckNotif(){
  const hint=document.getElementById('tNotifHint');
  if(!('Notification'in window)||Notification.permission==='granted'){
    hint.style.display='none';
  } else {
    hint.style.display='flex';
  }
}
function askNotifTimer(){
  Notification.requestPermission().then(p=>{
    if(p==='granted') document.getElementById('tNotifHint').style.display='none';
  });
}

// Listen for SW alarm fire message
if('serviceWorker'in navigator){
  navigator.serviceWorker.addEventListener('message',e=>{
    if(e.data&&e.data.type==='ALARM_FIRED'){
      if(tRunning){ tRunning=false; clearInterval(tInterval); tInterval=null; fireAlarm(); }
    }
  });
}
</script>
</body>
</html>

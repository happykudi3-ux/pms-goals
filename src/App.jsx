import { useState, useEffect } from "react";

// ─── Theme ───────────────────────────────────────────────────────────────────
const T = {
  light: {
    bg: "#FAFAF8", surface: "#FFFFFF", sidebar: "#F0EFE9",
    border: "#E5E3DB", text: "#1A1A1A", muted: "#6B7280",
    input: "#FFFFFF", inputBorder: "#D1CFC5", hover: "#F5F4EF",
    tag: "#F3F4F6", tagText: "#374151", navBg: "#FFFFFF",
    sectionBg: "#F9F9F7", cardShadow: "0 1px 4px rgba(0,0,0,0.06)"
  },
  dark: {
    bg: "#0F1117", surface: "#1A1D27", sidebar: "#13151E",
    border: "#2A2D3A", text: "#F0F0F0", muted: "#8B8FA8",
    input: "#1F2235", inputBorder: "#3A3D4E", hover: "#1F2235",
    tag: "#252836", tagText: "#B0B3C6", navBg: "#13151E",
    sectionBg: "#161820", cardShadow: "0 1px 4px rgba(0,0,0,0.3)"
  }
};

// ─── Roles & Goals Data ───────────────────────────────────────────────────────
const ROLES = [
  { id:"fe",  emoji:"🖥️",  title:"Frontend Dev",         color:"#4F8EF7", goals:[
    {id:"fe1",cat:"Code Quality",   goal:"Achieve ≥85% code review approval rate on first submission",        metric:"% approvals",        target:"85%",         tl:"Quarterly",  type:"Performance"},
    {id:"fe2",cat:"Performance",    goal:"Reduce average page load time to under 2 seconds on key pages",     metric:"Load time",          target:"<2s",         tl:"H1",         type:"Performance"},
    {id:"fe3",cat:"Delivery",       goal:"Deliver sprint tasks on time with <10% carry-forward rate",         metric:"% on-time",          target:"90%",         tl:"Monthly",    type:"Performance"},
    {id:"fe4",cat:"Testing",        goal:"Maintain minimum 75% unit test coverage for all new components",    metric:"% coverage",         target:"75%",         tl:"Ongoing",    type:"Quality"},
    {id:"fe5",cat:"Collaboration",  goal:"Participate in at least 2 knowledge-sharing sessions per quarter",  metric:"Sessions",           target:"2/qtr",       tl:"Quarterly",  type:"Development"},
    {id:"fe6",cat:"Accessibility",  goal:"Ensure all new UI components meet WCAG 2.1 AA standards",          metric:"Compliance %",       target:"100%",        tl:"Ongoing",    type:"Quality"},
  ]},
  { id:"be",  emoji:"⚙️",  title:"Backend Dev",           color:"#22C55E", goals:[
    {id:"be1",cat:"Reliability",    goal:"Maintain API uptime of 99.9% for all production services",          metric:"Uptime %",           target:"99.9%",       tl:"Ongoing",    type:"Performance"},
    {id:"be2",cat:"Performance",    goal:"Reduce average API response time by 20% from current baseline",     metric:"Response time",      target:"-20%",        tl:"H1",         type:"Performance"},
    {id:"be3",cat:"Security",       goal:"Zero critical vulnerabilities unresolved beyond 48-hour SLA",       metric:"CVEs >48hr",         target:"0",           tl:"Ongoing",    type:"Quality"},
    {id:"be4",cat:"Code Quality",   goal:"Achieve ≥80% code review first-pass approval rate",                 metric:"% approvals",        target:"80%",         tl:"Quarterly",  type:"Performance"},
    {id:"be5",cat:"Documentation",  goal:"Ensure all APIs are documented in Swagger/Postman before release",  metric:"% documented",       target:"100%",        tl:"Ongoing",    type:"Quality"},
    {id:"be6",cat:"Development",    goal:"Complete one backend architecture or cloud certification",           metric:"Certs",              target:"1",           tl:"Annual",     type:"Development"},
  ]},
  { id:"fs",  emoji:"🔄",  title:"Fullstack Dev",          color:"#A855F7", goals:[
    {id:"fs1",cat:"Delivery",       goal:"Own and deliver 3 end-to-end features from design to deployment",   metric:"Features shipped",   target:"3",           tl:"Annual",     type:"Performance"},
    {id:"fs2",cat:"Code Quality",   goal:"Maintain ≥80% code review approval on both FE and BE submissions",  metric:"% approvals",        target:"80%",         tl:"Quarterly",  type:"Quality"},
    {id:"fs3",cat:"Performance",    goal:"Full-stack features meet budgets (FE <2s load, BE <200ms API)",      metric:"Both thresholds",    target:"100%",        tl:"Per feature",type:"Quality"},
    {id:"fs4",cat:"Testing",        goal:"Achieve 70%+ test coverage across all newly written code",           metric:"% coverage",         target:"70%",         tl:"Ongoing",    type:"Quality"},
    {id:"fs5",cat:"Collaboration",  goal:"Flag cross-stack blockers within 24hr of detection",                 metric:"Avg resolution",     target:"<24hr",       tl:"Ongoing",    type:"Performance"},
    {id:"fs6",cat:"Growth",         goal:"Mentor at least one junior developer through a full feature cycle",  metric:"Mentees guided",     target:"1",           tl:"Annual",     type:"Development"},
  ]},
  { id:"ux",  emoji:"🎨",  title:"UI/UX Designer",         color:"#F97316", goals:[
    {id:"ux1",cat:"Design System",  goal:"Build component library covering 80% of recurring UI patterns",     metric:"Components",         target:"80%",         tl:"H1",         type:"Performance"},
    {id:"ux2",cat:"User Research",  goal:"Conduct usability testing for at least 4 major features",           metric:"Research sessions",  target:"4",           tl:"Annual",     type:"Performance"},
    {id:"ux3",cat:"Delivery",       goal:"Deliver design handoffs at least 1 sprint ahead of dev cycle",      metric:"Lead time",          target:"1 sprint",    tl:"Ongoing",    type:"Quality"},
    {id:"ux4",cat:"Usability",      goal:"Improve SUS score by 10 points on key user flows",                  metric:"SUS score",          target:"+10 pts",     tl:"Annual",     type:"Impact"},
    {id:"ux5",cat:"Collaboration",  goal:"Zero design-to-dev rework due to unclear specs or missing assets",  metric:"Rework incidents",   target:"0",           tl:"Ongoing",    type:"Quality"},
    {id:"ux6",cat:"Growth",         goal:"Present one emerging design trend or tool to the team per quarter", metric:"Presentations",      target:"4/year",      tl:"Quarterly",  type:"Development"},
  ]},
  { id:"ec",  emoji:"🛒",  title:"Ecommerce Specialist",   color:"#EAB308", goals:[
    {id:"ec1",cat:"Conversion",     goal:"Increase website conversion rate by 15% from current baseline",     metric:"CVR %",              target:"+15%",        tl:"Annual",     type:"Impact"},
    {id:"ec2",cat:"Revenue",        goal:"Grow GMV by 20% year-over-year through platform optimization",      metric:"GMV growth",         target:"+20% YoY",    tl:"Annual",     type:"Impact"},
    {id:"ec3",cat:"Cart Recovery",  goal:"Reduce cart abandonment rate by 10% through UX & email flows",      metric:"Abandon rate",       target:"-10%",        tl:"H1",         type:"Performance"},
    {id:"ec4",cat:"Campaigns",      goal:"Plan and execute 12 product campaigns with per-campaign ROI",        metric:"Campaigns",          target:"12/year",     tl:"Monthly",    type:"Performance"},
    {id:"ec5",cat:"Listings",       goal:"100% of active listings have optimized titles, images, descriptions",metric:"% listings",         target:"100%",        tl:"Q1",         type:"Quality"},
    {id:"ec6",cat:"Analytics",      goal:"Submit monthly ecommerce performance report with insights",          metric:"Reports",            target:"12/year",     tl:"Monthly",    type:"Performance"},
  ]},
  { id:"ps",  emoji:"🖼️",  title:"Photoshop Specialist",   color:"#06B6D4", goals:[
    {id:"ps1",cat:"Delivery",       goal:"Deliver 95% of creative assets within agreed turnaround time",       metric:"% on-time",          target:"95%",         tl:"Monthly",    type:"Performance"},
    {id:"ps2",cat:"Quality",        goal:"Achieve <5% revision rate on delivered assets",                      metric:"Revision rate",      target:"<5%",         tl:"Quarterly",  type:"Quality"},
    {id:"ps3",cat:"Brand",          goal:"Ensure 100% of assets follow brand guidelines without exception",    metric:"Brand compliance",   target:"100%",        tl:"Ongoing",    type:"Quality"},
    {id:"ps4",cat:"Productivity",   goal:"Build reusable asset library of 50+ templates",                      metric:"Templates",          target:"50+",         tl:"Annual",     type:"Performance"},
    {id:"ps5",cat:"Volume",         goal:"Deliver minimum agreed assets per month per capacity plan",           metric:"Assets/month",       target:"Per plan",    tl:"Monthly",    type:"Performance"},
    {id:"ps6",cat:"Growth",         goal:"Learn and apply one new design tool or technique per quarter",        metric:"Skills added",       target:"4/year",      tl:"Quarterly",  type:"Development"},
  ]},
  { id:"wd",  emoji:"🌐",  title:"Web Developer",           color:"#10B981", goals:[
    {id:"wd1",cat:"Performance",    goal:"Achieve Google PageSpeed score of 85+ on all key landing pages",     metric:"PageSpeed",          target:"85+",         tl:"H1",         type:"Quality"},
    {id:"wd2",cat:"SEO",            goal:"Ensure all pages meet technical SEO standards (meta, schema, map)",  metric:"% compliant",        target:"100%",        tl:"Q1",         type:"Quality"},
    {id:"wd3",cat:"Uptime",         goal:"Maintain website uptime of 99.5% or higher",                         metric:"Uptime %",           target:"99.5%",       tl:"Ongoing",    type:"Performance"},
    {id:"wd4",cat:"Bug Resolution", goal:"Resolve all P1/P2 website bugs within 24 hours of reporting",        metric:"Resolution time",    target:"<24hr",       tl:"Ongoing",    type:"Quality"},
    {id:"wd5",cat:"Delivery",       goal:"Complete web update requests within 2 business days",                 metric:"Turnaround",         target:"<2 days",     tl:"Ongoing",    type:"Performance"},
    {id:"wd6",cat:"Security",       goal:"Conduct quarterly security audits and resolve all flagged issues",    metric:"Audits done",        target:"4/year",      tl:"Quarterly",  type:"Quality"},
  ]},
  { id:"pm",  emoji:"📋",  title:"Assoc. Product Manager", color:"#F43F5E", goals:[
    {id:"pm1",cat:"Roadmap",        goal:"Maintain a prioritized, clearly documented product backlog always",  metric:"Backlog review",     target:"Weekly",      tl:"Ongoing",    type:"Performance"},
    {id:"pm2",cat:"Feature Delivery",goal:"Ensure 80% of planned quarterly features are shipped on time",      metric:"% on time",          target:"80%",         tl:"Quarterly",  type:"Performance"},
    {id:"pm3",cat:"Stakeholders",   goal:"Conduct monthly product reviews with key stakeholders",              metric:"Reviews held",       target:"12/year",     tl:"Monthly",    type:"Performance"},
    {id:"pm4",cat:"User Research",  goal:"Gather user feedback for every major feature before & after launch", metric:"Features researched",target:"100%",        tl:"Per feature",type:"Quality"},
    {id:"pm5",cat:"Data",           goal:"Define and track success metrics for all features launched",          metric:"% with KPIs",        target:"100%",        tl:"Ongoing",    type:"Quality"},
    {id:"pm6",cat:"Growth",         goal:"Complete a PM certification or structured learning program",          metric:"Certs",              target:"1",           tl:"Annual",     type:"Development"},
  ]},
  { id:"hb",  emoji:"🤝",  title:"HRBP",                   color:"#8B5CF6", goals:[
    {id:"hb1",cat:"Retention",      goal:"Reduce voluntary attrition in assigned business units by 10%",       metric:"Attrition %",        target:"-10%",        tl:"Annual",     type:"Impact"},
    {id:"hb2",cat:"Engagement",     goal:"Achieve employee engagement score of 75%+ in pulse surveys",         metric:"Engagement score",   target:"75%+",        tl:"Bi-annual",  type:"Impact"},
    {id:"hb3",cat:"PMS",            goal:"Ensure 100% completion of goal-setting & mid-year reviews",          metric:"% completion",       target:"100%",        tl:"Per cycle",  type:"Performance"},
    {id:"hb4",cat:"Grievance",      goal:"Resolve all employee grievances within 10 working days",              metric:"Resolution time",    target:"<10 days",    tl:"Ongoing",    type:"Quality"},
    {id:"hb5",cat:"L&D",            goal:"Roll out 2 targeted training interventions per BU",                   metric:"Interventions",      target:"2/BU",        tl:"Annual",     type:"Performance"},
    {id:"hb6",cat:"Partnership",    goal:"Conduct structured check-ins with BU heads monthly",                  metric:"Check-ins",          target:"12/year",     tl:"Monthly",    type:"Performance"},
  ]},
  { id:"hr",  emoji:"👥",  title:"Asst. Manager HR",        color:"#EC4899", goals:[
    {id:"hr1",cat:"Recruitment",    goal:"Achieve average time-to-fill of under 30 days for all open roles",   metric:"Days to fill",       target:"<30 days",    tl:"Ongoing",    type:"Performance"},
    {id:"hr2",cat:"Onboarding",     goal:"Achieve 90%+ satisfaction score on new hire onboarding feedback",    metric:"Onboarding CSAT",    target:"90%+",        tl:"Per cohort", type:"Quality"},
    {id:"hr3",cat:"Compliance",     goal:"100% HR compliance with labour laws and internal HR policies",        metric:"Audit pass rate",    target:"100%",        tl:"Annual",     type:"Quality"},
    {id:"hr4",cat:"Talent Pipeline",goal:"Build a pre-screened talent pipeline for all critical roles",         metric:"Roles covered",      target:"100%",        tl:"Q2",         type:"Performance"},
    {id:"hr5",cat:"HR Operations",  goal:"Zero payroll or documentation errors in monthly HR processing",       metric:"Errors/cycle",       target:"0",           tl:"Monthly",    type:"Quality"},
    {id:"hr6",cat:"Employer Brand", goal:"Execute 2 employer branding initiatives (campus, social, events)",    metric:"Initiatives",        target:"2",           tl:"Annual",     type:"Performance"},
  ]},
  { id:"mk",  emoji:"📣",  title:"Marketing Manager",       color:"#F59E0B", goals:[
    {id:"mk1",cat:"Leads",          goal:"Generate qualified MQLs per quarter aligned to sales targets",        metric:"MQLs",               target:"Per target",  tl:"Quarterly",  type:"Impact"},
    {id:"mk2",cat:"Brand Awareness",goal:"Grow organic social media reach by 25% across primary channels",     metric:"Reach growth",       target:"+25%",        tl:"Annual",     type:"Impact"},
    {id:"mk3",cat:"Campaign ROI",   goal:"Achieve minimum 3x ROI on all paid marketing campaigns",              metric:"Campaign ROI",       target:"3x",          tl:"Per campaign",type:"Performance"},
    {id:"mk4",cat:"Content",        goal:"Publish minimum 8 high-quality content pieces per month",             metric:"Pieces/month",       target:"8+",          tl:"Monthly",    type:"Performance"},
    {id:"mk5",cat:"Email",          goal:"Maintain email open rate >25% and click-through rate >3%",            metric:"Open/CTR",           target:">25%/>3%",    tl:"Ongoing",    type:"Quality"},
    {id:"mk6",cat:"Analytics",      goal:"Submit monthly marketing performance dashboard with channel ROI",      metric:"Reports",            target:"12/year",     tl:"Monthly",    type:"Performance"},
  ]},
];

const STATUS_CFG = {
  "Not Started": { color:"#6B7280", bg:"#F3F4F6", bar:"#D1D5DB", dark_bg:"#1F2937" },
  "In Progress":  { color:"#2563EB", bg:"#EFF6FF", bar:"#3B82F6", dark_bg:"#1E3A5F" },
  "On Track":     { color:"#16A34A", bg:"#F0FDF4", bar:"#22C55E", dark_bg:"#14532D" },
  "At Risk":      { color:"#D97706", bg:"#FFFBEB", bar:"#F59E0B", dark_bg:"#451A03" },
  "Completed":    { color:"#7C3AED", bg:"#FAF5FF", bar:"#A855F7", dark_bg:"#3B0764" },
};
const TYPE_CFG = {
  Performance: { bg:"#EFF6FF", text:"#2563EB" },
  Quality:     { bg:"#F0FDF4", text:"#16A34A" },
  Impact:      { bg:"#FFF7ED", text:"#C2410C" },
  Development: { bg:"#FAF5FF", text:"#7C3AED" },
};
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CHECKIN_STATUS = ["On Track","Needs Attention","Blocked"];
const CHECKIN_COLORS = { "On Track":"#22C55E", "Needs Attention":"#F59E0B", "Blocked":"#EF4444" };

function clarityScore(goal) {
  let score = 0;
  if (/\d/.test(goal.target)) score += 25;
  if (goal.metric && goal.metric.length > 2) score += 25;
  if (goal.tl && goal.tl.length > 1) score += 25;
  if (goal.goal.length > 40) score += 25;
  return score;
}

function sentimentTag(text) {
  const t = text.toLowerCase();
  if (/(block|stuck|issue|problem|fail|miss|behind|risk|delay|cannot|can't)/i.test(t)) return { label:"⚠️ Concern", color:"#D97706" };
  if (/(complet|done|achiev|success|great|excellent|ahead|on track)/i.test(t)) return { label:"✅ Positive", color:"#16A34A" };
  return { label:"💬 Neutral", color:"#6B7280" };
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function PMS() {
  const [dark, setDark]             = useState(false);
  const [tab, setTab]               = useState("dashboard");
  const [role, setRole]             = useState("fe");
  const [expanded, setExpanded]     = useState(null);
  const [sidebarOpen, setSidebar]   = useState(true);
  const [goalData, setGoalData]     = useState({});
  const [midYearOpen, setMidYear]   = useState(false);
  const [editingGoal, setEditGoal]  = useState(null);
  const [editText, setEditText]     = useState("");
  const [aiLoading, setAiLoading]   = useState({});
  const [notifications, setNotifs]  = useState([
    { id:1, msg:"3 goals haven't been updated in 30+ days", type:"warn" },
    { id:2, msg:"May check-in is due for Frontend Dev team", type:"info" },
    { id:3, msg:"2 goals are marked At Risk — review needed", type:"danger" },
  ]);

  const c = dark ? T.dark : T.light;
  const currentRole = ROLES.find(r => r.id === role);

  const getGD = (id) => goalData[id] || {
    status:"Not Started", progress:0,
    selfRating:0, managerRating:0,
    acknowledged:false,
    evidence:[],
    comments:[], newComment:"", newAuthor:"",
    peerInputs:[], newPeer:"", newPeerComment:"",
    checkins:{},
    carryForward:false,
    aiSuggestion:"", aiLoading:false,
    midYearEdit:"",
  };

  const setGD = (id, updates) =>
    setGoalData(p => ({ ...p, [id]: { ...getGD(id), ...updates } }));

  const addComment = (gid) => {
    const d = getGD(gid);
    if (!d.newComment.trim()) return;
    setGD(gid, {
      comments:[...d.comments, { text:d.newComment.trim(), author:d.newAuthor.trim()||"Anonymous", date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) }],
      newComment:"", newAuthor:""
    });
  };

  const addPeer = (gid) => {
    const d = getGD(gid);
    if (!d.newPeerComment.trim()) return;
    setGD(gid, {
      peerInputs:[...d.peerInputs, { name:d.newPeer.trim()||"Peer", comment:d.newPeerComment.trim() }],
      newPeer:"", newPeerComment:""
    });
  };

  const checkAI = async (goal) => {
    setAiLoading(p => ({ ...p, [goal.id]:true }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:300,
          messages:[{ role:"user", content:`You are a performance management expert. Review this employee goal and give 2-3 short, specific improvement suggestions to make it more SMART (measurable, time-bound, achievable). Be concise.\n\nGoal: "${goal.goal}"\nCurrent metric: ${goal.metric}\nTarget: ${goal.target}\nTimeline: ${goal.tl}\n\nRespond in plain text, no markdown, max 3 bullet points starting with •` }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type==="text")?.text || "No suggestion available.";
      setGD(goal.id, { aiSuggestion: text });
    } catch(e) {
      setGD(goal.id, { aiSuggestion:"AI unavailable. Check your connection." });
    }
    setAiLoading(p => ({ ...p, [goal.id]:false }));
  };

  const suggestGoals = async (roleObj) => {
    setAiLoading(p => ({ ...p, [`role_${roleObj.id}`]:true }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:400,
          messages:[{ role:"user", content:`Suggest 3 additional SMART performance goals for a ${roleObj.title} in a tech company for 2025. Each goal should be specific, measurable, and realistic. Format: "• [Category]: [Goal] | Target: [metric]". Plain text only, no markdown.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type==="text")?.text || "";
      setGD(`ai_role_${roleObj.id}`, { aiSuggestion: text });
    } catch(e) {
      setGD(`ai_role_${roleObj.id}`, { aiSuggestion:"AI unavailable." });
    }
    setAiLoading(p => ({ ...p, [`role_${roleObj.id}`]:false }));
  };

  // ── Dashboard stats ──
  const allGoals = ROLES.flatMap(r => r.goals);
  const totalGoals = allGoals.length;
  const completed  = allGoals.filter(g => getGD(g.id).status === "Completed").length;
  const atRisk     = allGoals.filter(g => getGD(g.id).status === "At Risk").length;
  const pending    = allGoals.filter(g => !getGD(g.id).acknowledged).length;
  const avgProgress = Math.round(allGoals.reduce((s,g) => s+getGD(g.id).progress,0) / totalGoals);

  const inp = (style={}) => ({
    padding:"7px 10px", borderRadius:6,
    border:`1px solid ${c.inputBorder}`,
    background:c.input, color:c.text,
    fontSize:12, fontFamily:"Georgia,serif",
    outline:"none", width:"100%", boxSizing:"border-box",
    ...style
  });

  const btn = (bg, style={}) => ({
    background:bg, color:"#fff", border:"none",
    borderRadius:6, padding:"7px 16px",
    fontSize:12, fontWeight:600, cursor:"pointer",
    fontFamily:"Georgia,serif", ...style
  });

  // ── Layout ──
  return (
    <div style={{ fontFamily:"Georgia,serif", background:c.bg, minHeight:"100vh", display:"flex", flexDirection:"column", color:c.text }}>

      {/* Top Nav */}
      <div style={{ background:c.navBg, borderBottom:`1px solid ${c.border}`, padding:"0 24px", display:"flex", alignItems:"center", gap:0, height:52, flexShrink:0, boxShadow:c.cardShadow }}>
        <span style={{ fontWeight:700, fontSize:15, marginRight:32, whiteSpace:"nowrap" }}>🎯 PMS 2025</span>
        {[["dashboard","📊 Dashboard"],["goals","🎯 Goals"],["checkins","📅 Check-ins"]].map(([t,label]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            background:"none", border:"none", cursor:"pointer", padding:"0 16px",
            height:52, fontSize:13, fontWeight:tab===t?700:400,
            color:tab===t?c.text:c.muted, fontFamily:"Georgia,serif",
            borderBottom:tab===t?`2px solid ${c.text}`:"2px solid transparent",
          }}>{label}</button>
        ))}
        <div style={{ flex:1 }} />
        {/* Notification bell */}
        <div style={{ position:"relative", marginRight:16 }}>
          <span style={{ fontSize:20, cursor:"pointer" }}>🔔</span>
          {notifications.length > 0 && (
            <span style={{ position:"absolute", top:-4, right:-4, background:"#EF4444", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>
              {notifications.length}
            </span>
          )}
        </div>
        <button onClick={() => setDark(!dark)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, padding:"4px 8px", borderRadius:6, color:c.muted }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Notification banners */}
      {notifications.length > 0 && tab === "dashboard" && (
        <div style={{ background:dark?"#1A1D27":"#FEFCE8", borderBottom:`1px solid ${c.border}`, padding:"6px 24px", display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display:"flex", alignItems:"center", gap:6, background:n.type==="danger"?"#FEF2F2":n.type==="warn"?"#FFFBEB":"#EFF6FF", padding:"4px 12px", borderRadius:20, fontSize:11 }}>
              <span>{n.type==="danger"?"🔴":n.type==="warn"?"🟡":"🔵"}</span>
              <span style={{ color:n.type==="danger"?"#DC2626":n.type==="warn"?"#D97706":"#2563EB" }}>{n.msg}</span>
              <button onClick={() => setNotifs(p => p.filter(x=>x.id!==n.id))} style={{ background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",fontSize:12,padding:0 }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Main Body */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ── SIDEBAR (Goals & Checkins tabs) ── */}
        {(tab==="goals"||tab==="checkins") && (
          <div style={{ width:sidebarOpen?220:52, background:c.sidebar, borderRight:`1px solid ${c.border}`, transition:"width 0.25s", overflow:"hidden", flexShrink:0, display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"14px 8px 8px", display:"flex", alignItems:"center", gap:8 }}>
              <button onClick={()=>setSidebar(!sidebarOpen)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:16,color:c.muted,flexShrink:0,padding:4 }}>☰</button>
              {sidebarOpen && <span style={{ fontSize:12,fontWeight:700,color:c.text,whiteSpace:"nowrap" }}>Roles</span>}
            </div>
            <div style={{ flex:1,overflowY:"auto",padding:"0 6px" }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={()=>{setRole(r.id);setExpanded(null);}} style={{
                  width:"100%", background:role===r.id?c.hover:"transparent",
                  border:"none",borderRadius:6,padding:sidebarOpen?"7px 8px":"7px 0",
                  cursor:"pointer",display:"flex",alignItems:"center",gap:7,
                  textAlign:"left",marginBottom:1,justifyContent:sidebarOpen?"flex-start":"center",
                }}>
                  <span style={{ fontSize:15,flexShrink:0 }}>{r.emoji}</span>
                  {sidebarOpen && <span style={{ fontSize:12,fontWeight:role===r.id?700:400,color:role===r.id?c.text:c.muted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{r.title}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTENT ── */}
        <div style={{ flex:1,overflow:"auto" }}>

          {/* ════════════════ DASHBOARD TAB ════════════════ */}
          {tab==="dashboard" && (
            <div style={{ padding:"28px 32px" }}>
              <h2 style={{ margin:"0 0 4px",fontSize:22,fontWeight:700 }}>Team Performance Overview</h2>
              <p style={{ margin:"0 0 24px",color:c.muted,fontSize:13 }}>FY 2025 · All roles · Real-time</p>

              {/* KPI cards */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:28 }}>
                {[
                  { label:"Total Goals",    val:totalGoals,     icon:"🎯", color:"#4F8EF7" },
                  { label:"Completed",       val:completed,      icon:"✅", color:"#22C55E" },
                  { label:"At Risk",         val:atRisk,         icon:"⚠️", color:"#F59E0B" },
                  { label:"Avg Progress",    val:`${avgProgress}%`,icon:"📈",color:"#A855F7" },
                  { label:"Unacknowledged",  val:pending,        icon:"📌", color:"#F43F5E" },
                ].map(k => (
                  <div key={k.label} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:10,padding:"16px",boxShadow:c.cardShadow }}>
                    <div style={{ fontSize:22,marginBottom:6 }}>{k.icon}</div>
                    <div style={{ fontSize:24,fontWeight:700,color:k.color }}>{k.val}</div>
                    <div style={{ fontSize:12,color:c.muted,marginTop:2 }}>{k.label}</div>
                  </div>
                ))}
              </div>

              {/* Role health cards */}
              <h3 style={{ margin:"0 0 14px",fontSize:16,fontWeight:700 }}>Role Health Overview</h3>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12,marginBottom:28 }}>
                {ROLES.map(r => {
                  const rGoals = r.goals;
                  const rAvg = Math.round(rGoals.reduce((s,g)=>s+getGD(g.id).progress,0)/rGoals.length);
                  const rRisk = rGoals.filter(g=>getGD(g.id).status==="At Risk").length;
                  const rDone = rGoals.filter(g=>getGD(g.id).status==="Completed").length;
                  return (
                    <div key={r.id} onClick={()=>{setTab("goals");setRole(r.id);}} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:10,padding:16,cursor:"pointer",transition:"box-shadow 0.2s",boxShadow:c.cardShadow }}
                      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.12)"}
                      onMouseLeave={e=>e.currentTarget.style.boxShadow=c.cardShadow}>
                      <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                        <span style={{ fontSize:18 }}>{r.emoji}</span>
                        <span style={{ fontSize:13,fontWeight:600,color:c.text }}>{r.title}</span>
                      </div>
                      <div style={{ height:5,background:c.tag,borderRadius:99,overflow:"hidden",marginBottom:8 }}>
                        <div style={{ width:`${rAvg}%`,height:"100%",background:r.color,borderRadius:99,transition:"width 0.4s" }} />
                      </div>
                      <div style={{ display:"flex",justifyContent:"space-between",fontSize:11 }}>
                        <span style={{ color:c.muted }}>{rAvg}% avg progress</span>
                        <span style={{ color:rRisk>0?"#F59E0B":c.muted }}>{rRisk > 0 ? `⚠️ ${rRisk} at risk` : `✅ ${rDone} done`}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* At-risk goals */}
              {atRisk > 0 && (
                <>
                  <h3 style={{ margin:"0 0 14px",fontSize:16,fontWeight:700,color:"#D97706" }}>⚠️ Goals Needing Attention</h3>
                  <div style={{ background:c.surface,border:`1px solid #FDE68A`,borderRadius:10,overflow:"hidden",marginBottom:28 }}>
                    {allGoals.filter(g=>getGD(g.id).status==="At Risk").map((g,i) => {
                      const rr = ROLES.find(r=>r.goals.some(x=>x.id===g.id));
                      return (
                        <div key={g.id} style={{ padding:"12px 18px",borderBottom:i<atRisk-1?`1px solid ${c.border}`:"none",display:"flex",alignItems:"center",gap:12 }}>
                          <span style={{ fontSize:16 }}>{rr?.emoji}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:12,color:c.muted,marginBottom:2 }}>{rr?.title} · {g.cat}</div>
                            <div style={{ fontSize:13,color:c.text }}>{g.goal}</div>
                          </div>
                          <button onClick={()=>{setTab("goals");setRole(rr.id);setExpanded(g.id);}} style={{ ...btn("#D97706"),padding:"4px 12px",fontSize:11 }}>Review →</button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Mid-year window notice */}
              <div style={{ background:dark?"#1E3A5F":"#EFF6FF",border:`1px solid #BFDBFE`,borderRadius:10,padding:18,display:"flex",alignItems:"center",gap:16 }}>
                <span style={{ fontSize:28 }}>📝</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700,fontSize:14,color:"#1D4ED8",marginBottom:4 }}>Mid-Year Goal Editing Window — July 1–15</div>
                  <div style={{ fontSize:12,color:c.muted }}>Employees can revise goals during this window if business direction has changed. Go to any goal and click "Mid-Year Edit".</div>
                </div>
                <button onClick={()=>{setTab("goals");}} style={{ ...btn("#2563EB"),padding:"6px 14px",fontSize:12,whiteSpace:"nowrap" }}>Go to Goals</button>
              </div>
            </div>
          )}

          {/* ════════════════ GOALS TAB ════════════════ */}
          {tab==="goals" && (
            <div>
              {/* Role header */}
              <div style={{ padding:"28px 32px 18px",borderBottom:`1px solid ${c.border}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:6 }}>
                  <span style={{ fontSize:26 }}>{currentRole.emoji}</span>
                  <h2 style={{ margin:0,fontSize:22,fontWeight:700 }}>{currentRole.title}</h2>
                  <span style={{ background:dark?c.tag:"#F3F4F6",color:c.muted,padding:"2px 10px",borderRadius:20,fontSize:11 }}>FY 2025</span>
                </div>

                {/* Status summary pills */}
                <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:16 }}>
                  {Object.entries(STATUS_CFG).map(([s,cfg]) => {
                    const count = currentRole.goals.filter(g=>getGD(g.id).status===s).length;
                    return <div key={s} style={{ background:dark?cfg.dark_bg:cfg.bg,color:cfg.color,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600 }}>{s}: {count}</div>;
                  })}
                </div>

                {/* AI Suggest + Mid-year toggle */}
                <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                  <button onClick={()=>suggestGoals(currentRole)} style={{ ...btn("#7C3AED",{display:"flex",alignItems:"center",gap:6,fontSize:12}) }}>
                    {aiLoading[`role_${currentRole.id}`] ? "⏳ Thinking..." : "🤖 AI Suggest Goals"}
                  </button>
                  <button onClick={()=>setMidYear(!midYearOpen)} style={{ ...btn(midYearOpen?"#D97706":"#2563EB",{fontSize:12}) }}>
                    ✏️ {midYearOpen ? "Close Mid-Year Edit":"Open Mid-Year Edit"}
                  </button>
                </div>

                {/* AI suggestions for role */}
                {getGD(`ai_role_${currentRole.id}`).aiSuggestion && (
                  <div style={{ marginTop:12,background:dark?"#1A1D27":"#FAF5FF",border:`1px solid #DDD6FE`,borderRadius:8,padding:14 }}>
                    <div style={{ fontSize:11,fontWeight:700,color:"#7C3AED",marginBottom:6 }}>🤖 AI Suggested Additional Goals</div>
                    <pre style={{ margin:0,fontSize:12,color:c.text,whiteSpace:"pre-wrap",fontFamily:"Georgia,serif",lineHeight:1.7 }}>
                      {getGD(`ai_role_${currentRole.id}`).aiSuggestion}
                    </pre>
                  </div>
                )}
              </div>

              {/* Goal list */}
              <div style={{ padding:"20px 32px" }}>
                {currentRole.goals.map((goal) => {
                  const d = getGD(goal.id);
                  const sc = STATUS_CFG[d.status];
                  const tc = TYPE_CFG[goal.type];
                  const cs = clarityScore(goal);
                  const isOpen = expanded === goal.id;

                  return (
                    <div key={goal.id} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:10,marginBottom:12,overflow:"hidden",boxShadow:isOpen?`0 4px 20px rgba(0,0,0,${dark?0.3:0.08})`:c.cardShadow }}>

                      {/* ── Collapsed row ── */}
                      <div style={{ padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:14,cursor:"pointer",background:d.acknowledged?c.surface:(dark?"#1A1D27":"#FFFBEB") }}
                        onClick={()=>setExpanded(isOpen?null:goal.id)}>
                        <div style={{ marginTop:3,color:c.muted,fontSize:11,flexShrink:0,transition:"transform 0.2s",transform:isOpen?"rotate(90deg)":"rotate(0deg)" }}>▶</div>
                        <div style={{ flex:1,minWidth:0 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:5,flexWrap:"wrap" }}>
                            <span style={{ fontSize:11,fontWeight:700,color:currentRole.color,textTransform:"uppercase",letterSpacing:"0.04em" }}>{goal.cat}</span>
                            <span style={{ background:dark?c.tag:tc.bg,color:tc.text,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600 }}>{goal.type}</span>
                            {!d.acknowledged && <span style={{ background:"#FEF3C7",color:"#D97706",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600 }}>📌 Unacknowledged</span>}
                            {d.carryForward && <span style={{ background:"#F0FDF4",color:"#16A34A",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600 }}>↩️ Carry Forward</span>}
                            {d.comments.length>0 && <span style={{ background:c.tag,color:c.muted,padding:"2px 8px",borderRadius:20,fontSize:10 }}>💬 {d.comments.length}</span>}
                            {d.peerInputs.length>0 && <span style={{ background:c.tag,color:c.muted,padding:"2px 8px",borderRadius:20,fontSize:10 }}>👥 {d.peerInputs.length} peer</span>}
                            {/* Clarity score */}
                            <span style={{ background:cs>=75?(dark?"#14532D":"#F0FDF4"):cs>=50?(dark?"#451A03":"#FFFBEB"):(dark?"#1F2937":"#FEF2F2"), color:cs>=75?"#16A34A":cs>=50?"#D97706":"#EF4444", padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600 }}>
                              🎯 {cs}% clear
                            </span>
                          </div>
                          <div style={{ fontSize:13,color:c.text,lineHeight:1.55,marginBottom:8 }}>
                            {midYearOpen && d.midYearEdit ? <span>{d.midYearEdit} <span style={{ fontSize:11,color:"#D97706" }}>(edited)</span></span> : goal.goal}
                          </div>
                          {/* Progress bar */}
                          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                            <div style={{ flex:1,height:5,background:dark?"#374151":"#F3F4F6",borderRadius:99,overflow:"hidden" }}>
                              <div style={{ width:`${d.progress}%`,height:"100%",background:sc.bar,borderRadius:99,transition:"width 0.3s" }} />
                            </div>
                            <span style={{ fontSize:11,color:sc.color,fontWeight:700,minWidth:32 }}>{d.progress}%</span>
                            <span style={{ background:dark?sc.dark_bg:sc.bg,color:sc.color,padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600 }}>{d.status}</span>
                          </div>
                          {/* Rating gap indicator */}
                          {(d.selfRating>0||d.managerRating>0) && (
                            <div style={{ marginTop:6,fontSize:11,color:c.muted }}>
                              Self: <b style={{color:c.text}}>{"⭐".repeat(d.selfRating)||"—"}</b> · Manager: <b style={{color:c.text}}>{"⭐".repeat(d.managerRating)||"—"}</b>
                              {d.selfRating>0&&d.managerRating>0&&d.selfRating!==d.managerRating && (
                                <span style={{ marginLeft:8,background:"#FEF2F2",color:"#DC2626",padding:"1px 8px",borderRadius:20,fontWeight:600 }}>⚡ {Math.abs(d.selfRating-d.managerRating)} pt gap</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign:"right",flexShrink:0 }}>
                          <div style={{ fontSize:11,color:c.muted,marginBottom:2 }}>{goal.tl}</div>
                          <div style={{ fontSize:13,fontWeight:700,fontFamily:"monospace",color:c.text }}>{goal.target}</div>
                          <div style={{ fontSize:11,color:c.muted,marginTop:2 }}>{goal.metric}</div>
                        </div>
                      </div>

                      {/* ── Expanded panel ── */}
                      {isOpen && (
                        <div style={{ borderTop:`1px solid ${c.border}`,padding:"20px 18px 20px 46px",background:c.sectionBg }} onClick={e=>e.stopPropagation()}>
                          
                          {/* Row 1: Status + Progress */}
                          <div style={{ display:"flex",gap:28,flexWrap:"wrap",marginBottom:20 }}>
                            <div>
                              <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8,fontFamily:"monospace" }}>Status</div>
                              <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                                {Object.entries(STATUS_CFG).map(([s,cfg]) => (
                                  <button key={s} onClick={()=>setGD(goal.id,{status:s})} style={{ padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:d.status===s?`2px solid ${cfg.color}`:"2px solid transparent",background:d.status===s?(dark?cfg.dark_bg:cfg.bg):(dark?c.tag:"#F3F4F6"),color:d.status===s?cfg.color:c.muted,transition:"all 0.15s" }}>
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div style={{ minWidth:200 }}>
                              <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8,fontFamily:"monospace" }}>Progress — {d.progress}%</div>
                              <input type="range" min="0" max="100" step="10" value={d.progress} onChange={e=>setGD(goal.id,{progress:Number(e.target.value)})} style={{ width:"100%",accentColor:currentRole.color,cursor:"pointer" }} />
                              <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:c.muted,marginTop:2 }}>
                                <span>0%</span><span>50%</span><span>100%</span>
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Ratings + Acknowledge */}
                          <div style={{ display:"flex",gap:28,flexWrap:"wrap",marginBottom:20 }}>
                            <div>
                              <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8,fontFamily:"monospace" }}>Self Rating</div>
                              <div style={{ display:"flex",gap:4 }}>
                                {[1,2,3,4,5].map(n=>(
                                  <button key={n} onClick={()=>setGD(goal.id,{selfRating:n})} style={{ background:"none",border:"none",cursor:"pointer",fontSize:20,opacity:n<=d.selfRating?1:0.3 }}>⭐</button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8,fontFamily:"monospace" }}>Manager Rating</div>
                              <div style={{ display:"flex",gap:4 }}>
                                {[1,2,3,4,5].map(n=>(
                                  <button key={n} onClick={()=>setGD(goal.id,{managerRating:n})} style={{ background:"none",border:"none",cursor:"pointer",fontSize:20,opacity:n<=d.managerRating?1:0.3 }}>🌟</button>
                                ))}
                              </div>
                            </div>
                            <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",gap:8 }}>
                              <button onClick={()=>setGD(goal.id,{acknowledged:!d.acknowledged})} style={{ ...btn(d.acknowledged?"#16A34A":"#6B7280",{fontSize:11,display:"flex",alignItems:"center",gap:6}) }}>
                                {d.acknowledged ? "✅ Acknowledged" : "📌 Acknowledge Goal"}
                              </button>
                              <button onClick={()=>setGD(goal.id,{carryForward:!d.carryForward})} style={{ ...btn(d.carryForward?"#D97706":"#6B7280",{fontSize:11}) }}>
                                {d.carryForward ? "↩️ Carry Forward: ON" : "↩️ Mark Carry Forward"}
                              </button>
                            </div>
                          </div>

                          {/* Mid-year edit */}
                          {midYearOpen && (
                            <div style={{ marginBottom:20,background:dark?"#1A1D27":"#FFFBEB",border:`1px solid #FDE68A`,borderRadius:8,padding:14 }}>
                              <div style={{ fontSize:11,fontWeight:700,color:"#D97706",marginBottom:8,fontFamily:"monospace",textTransform:"uppercase" }}>✏️ Mid-Year Goal Edit</div>
                              <textarea value={d.midYearEdit||goal.goal} onChange={e=>setGD(goal.id,{midYearEdit:e.target.value})} rows={2}
                                style={{ ...inp(),resize:"vertical",background:dark?"#1F2235":c.input }} />
                              <div style={{ fontSize:11,color:c.muted,marginTop:4 }}>Edit the goal text to reflect business changes. Original is preserved for audit.</div>
                            </div>
                          )}

                          {/* Evidence */}
                          <div style={{ marginBottom:20 }}>
                            <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8,fontFamily:"monospace" }}>📎 Evidence / Proof</div>
                            <div style={{ display:"flex",gap:8,marginBottom:8,flexWrap:"wrap" }}>
                              {(d.evidence||[]).map((e,i)=>(
                                <div key={i} style={{ background:dark?c.tag:"#EFF6FF",color:"#2563EB",padding:"4px 10px",borderRadius:6,fontSize:12,display:"flex",alignItems:"center",gap:6 }}>
                                  📄 {e}
                                  <button onClick={()=>setGD(goal.id,{evidence:d.evidence.filter((_,j)=>j!==i)})} style={{ background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",fontSize:12,padding:0 }}>✕</button>
                                </div>
                              ))}
                            </div>
                            <div style={{ display:"flex",gap:8 }}>
                              <input id={`ev_${goal.id}`} placeholder="Paste link or filename (e.g. Q1_report.pdf)" style={{ ...inp(),flex:1 }} />
                              <button onClick={()=>{const v=document.getElementById(`ev_${goal.id}`).value.trim();if(v){setGD(goal.id,{evidence:[...(d.evidence||[]),v]});document.getElementById(`ev_${goal.id}`).value="";}}} style={{ ...btn("#2563EB",{whiteSpace:"nowrap",fontSize:12}) }}>Add</button>
                            </div>
                          </div>

                          {/* AI Goal Quality Check */}
                          <div style={{ marginBottom:20,background:dark?"#1A1D27":"#FAF5FF",border:`1px solid #DDD6FE`,borderRadius:8,padding:14 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:d.aiSuggestion?10:0 }}>
                              <div style={{ flex:1 }}>
                                <div style={{ fontSize:11,fontWeight:700,color:"#7C3AED",fontFamily:"monospace",textTransform:"uppercase" }}>🤖 AI Goal Quality Check</div>
                                <div style={{ fontSize:11,color:c.muted,marginTop:2 }}>AI reviews if this goal is SMART and suggests improvements</div>
                              </div>
                              <button onClick={()=>checkAI(goal)} style={{ ...btn("#7C3AED",{fontSize:11,whiteSpace:"nowrap"}) }}>
                                {aiLoading[goal.id] ? "⏳ Checking..." : "Check Goal"}
                              </button>
                            </div>
                            {d.aiSuggestion && (
                              <pre style={{ margin:0,fontSize:12,color:c.text,whiteSpace:"pre-wrap",fontFamily:"Georgia,serif",lineHeight:1.7,borderTop:`1px solid #DDD6FE`,paddingTop:10,marginTop:0 }}>
                                {d.aiSuggestion}
                              </pre>
                            )}
                          </div>

                          {/* Peer Input */}
                          <div style={{ marginBottom:20 }}>
                            <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,fontFamily:"monospace" }}>👥 Peer Input</div>
                            {d.peerInputs.map((p,i)=>(
                              <div key={i} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:8,padding:"10px 12px",marginBottom:8,display:"flex",gap:10,alignItems:"flex-start" }}>
                                <div style={{ width:28,height:28,borderRadius:"50%",background:"#8B5CF6",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0 }}>
                                  {p.name.charAt(0).toUpperCase()}
                                </div>
                                <div style={{ flex:1 }}>
                                  <div style={{ fontSize:12,fontWeight:600,color:c.text,marginBottom:3 }}>{p.name}</div>
                                  <div style={{ fontSize:13,color:c.text,lineHeight:1.5 }}>{p.comment}</div>
                                </div>
                              </div>
                            ))}
                            <div style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:8,padding:12 }}>
                              <input value={d.newPeer} onChange={e=>setGD(goal.id,{newPeer:e.target.value})} placeholder="Peer's name" style={{ ...inp({marginBottom:8}) }} />
                              <textarea value={d.newPeerComment} onChange={e=>setGD(goal.id,{newPeerComment:e.target.value})} placeholder="Add peer feedback on this goal..." rows={2} style={{ ...inp({resize:"vertical",marginBottom:8}) }} />
                              <div style={{ textAlign:"right" }}>
                                <button onClick={()=>addPeer(goal.id)} style={{ ...btn("#8B5CF6",{fontSize:12}) }}>Add Peer Input</button>
                              </div>
                            </div>
                          </div>

                          {/* Comments */}
                          <div>
                            <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,fontFamily:"monospace" }}>
                              💬 Manager/Employee Comments {d.comments.length>0&&`(${d.comments.length})`}
                            </div>
                            {d.comments.map((cm,i)=>{
                              const sent = sentimentTag(cm.text);
                              return (
                                <div key={i} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:8,padding:"10px 12px",marginBottom:8,display:"flex",gap:10,alignItems:"flex-start" }}>
                                  <div style={{ width:30,height:30,borderRadius:"50%",background:currentRole.color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0 }}>
                                    {cm.author.charAt(0).toUpperCase()}
                                  </div>
                                  <div style={{ flex:1 }}>
                                    <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap" }}>
                                      <span style={{ fontSize:12,fontWeight:600,color:c.text }}>{cm.author}</span>
                                      <span style={{ fontSize:11,color:c.muted }}>{cm.date}</span>
                                      <span style={{ fontSize:10,color:sent.color,fontWeight:600 }}>{sent.label}</span>
                                    </div>
                                    <div style={{ fontSize:13,color:c.text,lineHeight:1.5 }}>{cm.text}</div>
                                  </div>
                                  <button onClick={()=>setGD(goal.id,{comments:d.comments.filter((_,j)=>j!==i)})} style={{ background:"none",border:"none",cursor:"pointer",color:c.muted,fontSize:14,padding:"2px 4px" }}>✕</button>
                                </div>
                              );
                            })}
                            <div style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:8,padding:12 }}>
                              <input value={d.newAuthor} onChange={e=>setGD(goal.id,{newAuthor:e.target.value})} placeholder="Your name" style={{ ...inp({marginBottom:8}) }} />
                              <textarea value={d.newComment} onChange={e=>setGD(goal.id,{newComment:e.target.value})} placeholder="Add a progress update, blocker, or note…" rows={2}
                                onKeyDown={e=>{if(e.key==="Enter"&&(e.ctrlKey||e.metaKey))addComment(goal.id);}}
                                style={{ ...inp({resize:"vertical",marginBottom:8}) }} />
                              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                                <span style={{ fontSize:11,color:c.muted }}>Ctrl+Enter to post · Sentiment auto-detected</span>
                                <button onClick={()=>addComment(goal.id)} style={{ ...btn(currentRole.color,{fontSize:12}) }}>Post Comment</button>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════════════ CHECK-INS TAB ════════════════ */}
          {tab==="checkins" && (
            <div style={{ padding:"28px 32px" }}>
              <h2 style={{ margin:"0 0 4px",fontSize:22,fontWeight:700 }}>Monthly Check-ins</h2>
              <p style={{ margin:"0 0 24px",color:c.muted,fontSize:13 }}>{currentRole.emoji} {currentRole.title} · Quick 30-second updates per goal</p>

              {currentRole.goals.map(goal => {
                const d = getGD(goal.id);
                const checkins = d.checkins || {};
                return (
                  <div key={goal.id} style={{ background:c.surface,border:`1px solid ${c.border}`,borderRadius:10,marginBottom:14,overflow:"hidden",boxShadow:c.cardShadow }}>
                    <div style={{ padding:"14px 18px",borderBottom:`1px solid ${c.border}` }}>
                      <div style={{ fontSize:11,color:currentRole.color,fontWeight:700,textTransform:"uppercase",marginBottom:4 }}>{goal.cat}</div>
                      <div style={{ fontSize:13,color:c.text,lineHeight:1.5 }}>{goal.goal}</div>
                    </div>
                    <div style={{ padding:"14px 18px" }}>
                      <div style={{ fontSize:11,fontWeight:700,color:c.muted,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:12,fontFamily:"monospace" }}>Monthly Check-in Status</div>
                      <div style={{ display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8 }}>
                        {MONTHS.map(month => {
                          const val = checkins[month];
                          return (
                            <div key={month} style={{ textAlign:"center" }}>
                              <div style={{ fontSize:11,color:c.muted,marginBottom:6,fontWeight:600 }}>{month}</div>
                              <div style={{ display:"flex",flexDirection:"column",gap:3 }}>
                                {CHECKIN_STATUS.map(s => (
                                  <button key={s} onClick={()=>setGD(goal.id,{checkins:{...checkins,[month]:val===s?null:s}})}
                                    style={{ padding:"3px 0",borderRadius:4,border:"none",cursor:"pointer",fontSize:9,fontWeight:600,
                                      background:val===s?CHECKIN_COLORS[s]:(dark?"#1F2235":"#F3F4F6"),
                                      color:val===s?"#fff":c.muted,transition:"all 0.15s" }}>
                                    {s==="On Track"?"✓":s==="Needs Attention"?"!":"✕"}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display:"flex",gap:12,marginTop:12,fontSize:11 }}>
                        {CHECKIN_STATUS.map(s=>(
                          <div key={s} style={{ display:"flex",alignItems:"center",gap:4,color:c.muted }}>
                            <span style={{ width:10,height:10,borderRadius:2,background:CHECKIN_COLORS[s],display:"inline-block" }}></span>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

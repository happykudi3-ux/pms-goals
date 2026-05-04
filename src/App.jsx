import { useState } from "react";

const roles = [
  {
    id: "frontend", title: "Frontend Developer", emoji: "🖥️", color: "#4F8EF7",
    goals: [
      { id: "fe1", category: "Code Quality", goal: "Achieve ≥85% code review approval rate on first submission", metric: "% approvals", target: "85%", timeline: "Quarterly", type: "Performance" },
      { id: "fe2", category: "Performance", goal: "Reduce average page load time to under 2 seconds across all key pages", metric: "Load time (ms)", target: "<2s", timeline: "H1", type: "Performance" },
      { id: "fe3", category: "Delivery", goal: "Deliver assigned sprint tasks on time with <10% carry-forward rate", metric: "% on-time delivery", target: "90%", timeline: "Monthly", type: "Performance" },
      { id: "fe4", category: "Testing", goal: "Maintain minimum 75% unit test coverage for all new components", metric: "% test coverage", target: "75%", timeline: "Ongoing", type: "Quality" },
      { id: "fe5", category: "Collaboration", goal: "Participate in at least 2 knowledge-sharing sessions per quarter", metric: "Sessions attended", target: "2/quarter", timeline: "Quarterly", type: "Development" },
      { id: "fe6", category: "Accessibility", goal: "Ensure all new UI components meet WCAG 2.1 AA standards", metric: "Compliance %", target: "100%", timeline: "Ongoing", type: "Quality" },
    ]
  },
  {
    id: "backend", title: "Backend Developer", emoji: "⚙️", color: "#22C55E",
    goals: [
      { id: "be1", category: "Reliability", goal: "Maintain API uptime of 99.9% for all production services", metric: "Uptime %", target: "99.9%", timeline: "Ongoing", type: "Performance" },
      { id: "be2", category: "Performance", goal: "Reduce average API response time by 20% from current baseline", metric: "Response time (ms)", target: "-20%", timeline: "H1", type: "Performance" },
      { id: "be3", category: "Security", goal: "Zero critical vulnerabilities unresolved beyond 48-hour SLA", metric: "Critical CVEs open >48hr", target: "0", timeline: "Ongoing", type: "Quality" },
      { id: "be4", category: "Code Quality", goal: "Achieve ≥80% code review first-pass approval rate", metric: "% approvals", target: "80%", timeline: "Quarterly", type: "Performance" },
      { id: "be5", category: "Documentation", goal: "Ensure all APIs are documented in Swagger/Postman before release", metric: "% APIs documented", target: "100%", timeline: "Ongoing", type: "Quality" },
      { id: "be6", category: "Development", goal: "Complete one backend architecture or cloud certification", metric: "Certifications", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "fullstack", title: "Fullstack Developer", emoji: "🔄", color: "#A855F7",
    goals: [
      { id: "fs1", category: "Delivery", goal: "Own and deliver 3 end-to-end features from design to deployment", metric: "Features shipped", target: "3", timeline: "Annual", type: "Performance" },
      { id: "fs2", category: "Code Quality", goal: "Maintain ≥80% code review approval on both FE and BE submissions", metric: "% approvals", target: "80%", timeline: "Quarterly", type: "Quality" },
      { id: "fs3", category: "Performance", goal: "Ensure full-stack features meet performance budgets (FE <2s, BE <200ms)", metric: "Both thresholds met", target: "100%", timeline: "Per feature", type: "Quality" },
      { id: "fs4", category: "Testing", goal: "Achieve 70%+ test coverage across all newly written code", metric: "% coverage", target: "70%", timeline: "Ongoing", type: "Quality" },
      { id: "fs5", category: "Collaboration", goal: "Bridge frontend and backend standups — flag cross-stack blockers within 24hr", metric: "Avg blocker resolution time", target: "<24hr", timeline: "Ongoing", type: "Performance" },
      { id: "fs6", category: "Growth", goal: "Mentor at least one junior developer through a full feature cycle", metric: "Mentees guided", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "uiux", title: "UI/UX Designer", emoji: "🎨", color: "#F97316",
    goals: [
      { id: "ux1", category: "Design System", goal: "Build and document a component library covering 80% of recurring UI patterns", metric: "Components documented", target: "80%", timeline: "H1", type: "Performance" },
      { id: "ux2", category: "User Research", goal: "Conduct user research or usability testing for at least 4 major features", metric: "Research sessions", target: "4", timeline: "Annual", type: "Performance" },
      { id: "ux3", category: "Delivery", goal: "Deliver design handoffs at least 1 sprint ahead of development cycle", metric: "Handoff lead time", target: "1 sprint", timeline: "Ongoing", type: "Quality" },
      { id: "ux4", category: "Usability", goal: "Improve SUS (System Usability Score) by 10 points on key user flows", metric: "SUS score", target: "+10 pts", timeline: "Annual", type: "Impact" },
      { id: "ux5", category: "Collaboration", goal: "Zero design-to-dev rework due to unclear specs or missing assets", metric: "Rework incidents", target: "0", timeline: "Ongoing", type: "Quality" },
      { id: "ux6", category: "Growth", goal: "Explore and present one emerging design trend or tool to the team per quarter", metric: "Presentations", target: "4/year", timeline: "Quarterly", type: "Development" },
    ]
  },
  {
    id: "ecommerce", title: "Ecommerce Specialist", emoji: "🛒", color: "#EAB308",
    goals: [
      { id: "ec1", category: "Conversion", goal: "Increase website conversion rate by 15% from current baseline", metric: "CVR %", target: "+15%", timeline: "Annual", type: "Impact" },
      { id: "ec2", category: "Revenue", goal: "Grow GMV by 20% year-over-year through platform optimization", metric: "GMV growth", target: "+20% YoY", timeline: "Annual", type: "Impact" },
      { id: "ec3", category: "Cart Abandonment", goal: "Reduce cart abandonment rate by 10% through UX and email flows", metric: "Cart abandon %", target: "-10%", timeline: "H1", type: "Performance" },
      { id: "ec4", category: "Campaigns", goal: "Plan and execute 12 product campaigns with ROI tracking per campaign", metric: "Campaigns", target: "12/year", timeline: "Monthly", type: "Performance" },
      { id: "ec5", category: "Listings", goal: "Ensure 100% of active product listings have optimized titles, images, and descriptions", metric: "% listings optimized", target: "100%", timeline: "Q1", type: "Quality" },
      { id: "ec6", category: "Analytics", goal: "Submit monthly ecommerce performance report with actionable insights", metric: "Reports submitted", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
  {
    id: "photoshop", title: "Photoshop Specialist", emoji: "🖼️", color: "#06B6D4",
    goals: [
      { id: "ps1", category: "Delivery", goal: "Deliver 95% of creative assets within agreed turnaround time", metric: "% on-time delivery", target: "95%", timeline: "Monthly", type: "Performance" },
      { id: "ps2", category: "Quality", goal: "Achieve <5% revision rate on delivered assets", metric: "% revisions", target: "<5%", timeline: "Quarterly", type: "Quality" },
      { id: "ps3", category: "Brand Consistency", goal: "Ensure 100% of assets follow brand guidelines without exception", metric: "Brand guideline compliance", target: "100%", timeline: "Ongoing", type: "Quality" },
      { id: "ps4", category: "Productivity", goal: "Build a reusable asset library of 50+ templates to speed up production", metric: "Templates created", target: "50+", timeline: "Annual", type: "Performance" },
      { id: "ps5", category: "Volume", goal: "Deliver a minimum of [X] assets per month as per team capacity plan", metric: "Assets delivered/month", target: "Per plan", timeline: "Monthly", type: "Performance" },
      { id: "ps6", category: "Growth", goal: "Learn and apply one new design tool or technique per quarter", metric: "Skills added", target: "4/year", timeline: "Quarterly", type: "Development" },
    ]
  },
  {
    id: "webdev", title: "Web Developer", emoji: "🌐", color: "#10B981",
    goals: [
      { id: "wd1", category: "Performance", goal: "Achieve Google PageSpeed score of 85+ on all key landing pages", metric: "PageSpeed score", target: "85+", timeline: "H1", type: "Quality" },
      { id: "wd2", category: "SEO", goal: "Ensure all pages meet technical SEO standards (meta, schema, sitemap)", metric: "% pages compliant", target: "100%", timeline: "Q1", type: "Quality" },
      { id: "wd3", category: "Uptime", goal: "Maintain website uptime of 99.5% or higher", metric: "Uptime %", target: "99.5%", timeline: "Ongoing", type: "Performance" },
      { id: "wd4", category: "Bug Resolution", goal: "Resolve all P1/P2 website bugs within 24 hours of reporting", metric: "Avg resolution time", target: "<24hr", timeline: "Ongoing", type: "Quality" },
      { id: "wd5", category: "Delivery", goal: "Complete web update requests within 2 business days for standard changes", metric: "Avg turnaround", target: "<2 days", timeline: "Ongoing", type: "Performance" },
      { id: "wd6", category: "Security", goal: "Conduct quarterly security audits and resolve all flagged vulnerabilities", metric: "Audits completed", target: "4/year", timeline: "Quarterly", type: "Quality" },
    ]
  },
  {
    id: "apm", title: "Associate Product Manager", emoji: "📋", color: "#F43F5E",
    goals: [
      { id: "pm1", category: "Roadmap", goal: "Maintain a prioritized, clearly documented product backlog at all times", metric: "Backlog hygiene score", target: "Reviewed weekly", timeline: "Ongoing", type: "Performance" },
      { id: "pm2", category: "Feature Delivery", goal: "Ensure 80% of planned quarterly features are shipped on time", metric: "% features on time", target: "80%", timeline: "Quarterly", type: "Performance" },
      { id: "pm3", category: "Stakeholder Alignment", goal: "Conduct monthly product reviews with key stakeholders", metric: "Reviews held", target: "12/year", timeline: "Monthly", type: "Performance" },
      { id: "pm4", category: "User Research", goal: "Gather structured user feedback for every major feature before and after launch", metric: "Features with research", target: "100%", timeline: "Per feature", type: "Quality" },
      { id: "pm5", category: "Data", goal: "Define and track success metrics for all features launched", metric: "% features with KPIs", target: "100%", timeline: "Ongoing", type: "Quality" },
      { id: "pm6", category: "Growth", goal: "Complete a PM certification or structured learning program", metric: "Certifications", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "hrbp", title: "HRBP", emoji: "🤝", color: "#8B5CF6",
    goals: [
      { id: "hb1", category: "Retention", goal: "Reduce voluntary attrition in assigned business units by 10%", metric: "Attrition %", target: "-10%", timeline: "Annual", type: "Impact" },
      { id: "hb2", category: "Engagement", goal: "Achieve employee engagement score of 75%+ in pulse surveys", metric: "Engagement score", target: "75%+", timeline: "Bi-annual", type: "Impact" },
      { id: "hb3", category: "PMS", goal: "Ensure 100% completion of goal-setting and mid-year reviews across all BUs", metric: "% completion", target: "100%", timeline: "Per cycle", type: "Performance" },
      { id: "hb4", category: "Grievance", goal: "Resolve all employee grievances within 10 working days", metric: "Avg resolution time", target: "<10 days", timeline: "Ongoing", type: "Quality" },
      { id: "hb5", category: "L&D", goal: "Identify skill gaps and roll out at least 2 targeted training interventions per BU", metric: "Interventions delivered", target: "2/BU", timeline: "Annual", type: "Performance" },
      { id: "hb6", category: "Partnership", goal: "Conduct structured business partner check-ins with BU heads monthly", metric: "Check-ins completed", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
  {
    id: "hrmanager", title: "Asst. Manager HR", emoji: "👥", color: "#EC4899",
    goals: [
      { id: "hr1", category: "Recruitment", goal: "Achieve average time-to-fill of under 30 days for all open positions", metric: "Avg days to fill", target: "<30 days", timeline: "Ongoing", type: "Performance" },
      { id: "hr2", category: "Onboarding", goal: "Achieve 90%+ satisfaction score on new hire onboarding feedback", metric: "Onboarding CSAT", target: "90%+", timeline: "Per cohort", type: "Quality" },
      { id: "hr3", category: "Compliance", goal: "Ensure 100% HR compliance with labour laws and internal HR policies", metric: "Audit pass rate", target: "100%", timeline: "Annual", type: "Quality" },
      { id: "hr4", category: "Talent Pipeline", goal: "Build a pre-screened talent pipeline for all critical roles", metric: "Roles with pipeline", target: "100% critical roles", timeline: "Q2", type: "Performance" },
      { id: "hr5", category: "HR Operations", goal: "Ensure zero payroll or documentation errors in monthly HR processing", metric: "Errors per cycle", target: "0", timeline: "Monthly", type: "Quality" },
      { id: "hr6", category: "Employer Brand", goal: "Execute 2 employer branding initiatives (campus drives, social, events)", metric: "Initiatives", target: "2", timeline: "Annual", type: "Performance" },
    ]
  },
  {
    id: "marketing", title: "Marketing Manager", emoji: "📣", color: "#F59E0B",
    goals: [
      { id: "mk1", category: "Lead Generation", goal: "Generate qualified marketing leads per quarter aligned to sales targets", metric: "MQLs generated", target: "Per quarterly target", timeline: "Quarterly", type: "Impact" },
      { id: "mk2", category: "Brand Awareness", goal: "Grow organic social media reach by 25% across primary channels", metric: "Reach growth %", target: "+25%", timeline: "Annual", type: "Impact" },
      { id: "mk3", category: "Campaign ROI", goal: "Achieve minimum 3x ROI on paid marketing campaigns", metric: "Campaign ROI", target: "3x", timeline: "Per campaign", type: "Performance" },
      { id: "mk4", category: "Content", goal: "Publish a minimum of 8 high-quality content pieces per month", metric: "Content pieces/month", target: "8+", timeline: "Monthly", type: "Performance" },
      { id: "mk5", category: "Email Marketing", goal: "Maintain email open rate above 25% and click-through rate above 3%", metric: "Open rate / CTR", target: ">25% / >3%", timeline: "Ongoing", type: "Quality" },
      { id: "mk6", category: "Analytics", goal: "Submit monthly marketing performance dashboard with channel-wise ROI", metric: "Reports submitted", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
];

const statusConfig = {
  "Not Started": { color: "#6B7280", bg: "#F3F4F6", bar: "#D1D5DB" },
  "In Progress":  { color: "#2563EB", bg: "#EFF6FF", bar: "#3B82F6" },
  "On Track":     { color: "#16A34A", bg: "#F0FDF4", bar: "#22C55E" },
  "At Risk":      { color: "#D97706", bg: "#FFFBEB", bar: "#F59E0B" },
  "Completed":    { color: "#7C3AED", bg: "#FAF5FF", bar: "#A855F7" },
};

const typeColors = {
  Performance: { bg: "#EFF6FF", text: "#2563EB" },
  Quality:     { bg: "#F0FDF4", text: "#16A34A" },
  Impact:      { bg: "#FFF7ED", text: "#C2410C" },
  Development: { bg: "#FAF5FF", text: "#7C3AED" },
};

export default function PMSGoals() {
  const [activeRole, setActiveRole]     = useState("frontend");
  const [search, setSearch]             = useState("");
  const [sidebarOpen, setSidebarOpen]   = useState(true);
  const [expandedGoal, setExpandedGoal] = useState(null);
  const [goalData, setGoalData]         = useState({});

  const currentRole = roles.find(r => r.id === activeRole);

  const filteredGoals = currentRole.goals.filter(g =>
    g.goal.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  const getGoalData = (id) =>
    goalData[id] || { status: "Not Started", progress: 0, comments: [], newComment: "", newAuthor: "" };

  const updateGoalData = (id, updates) =>
    setGoalData(prev => ({ ...prev, [id]: { ...getGoalData(id), ...updates } }));

  const addComment = (goalId) => {
    const data = getGoalData(goalId);
    if (!data.newComment.trim()) return;
    updateGoalData(goalId, {
      comments: [...data.comments, {
        text:   data.newComment.trim(),
        author: data.newAuthor.trim() || "Anonymous",
        date:   new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      }],
      newComment: "",
      newAuthor: ""
    });
  };

  const deleteComment = (goalId, idx) => {
    const data = getGoalData(goalId);
    updateGoalData(goalId, { comments: data.comments.filter((_, i) => i !== idx) });
  };

  const roleStats = currentRole.goals.reduce((acc, g) => {
    const status = getGoalData(g.id).status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#FAFAF8", minHeight: "100vh", display: "flex", color: "#1A1A1A" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? 230 : 56,
        background: "#F0EFE9", borderRight: "1px solid #E5E3DB",
        transition: "width 0.25s ease", overflow: "hidden",
        flexShrink: 0, display: "flex", flexDirection: "column",
      }}>
        <div style={{ padding: "18px 10px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 4, borderRadius: 6, color: "#6B6B6B", flexShrink: 0 }}>
            ☰
          </button>
          {sidebarOpen && <span style={{ fontWeight: 700, fontSize: 13, color: "#1A1A1A", whiteSpace: "nowrap" }}>🎯 PMS Goals 2025</span>}
        </div>

        {sidebarOpen && (
          <div style={{ padding: "2px 10px 6px", color: "#9CA3AF", fontSize: 10, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>Roles</div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "0 6px" }}>
          {roles.map(role => (
            <button key={role.id}
              onClick={() => { setActiveRole(role.id); setExpandedGoal(null); }}
              style={{
                width: "100%", background: activeRole === role.id ? "#E8E6DE" : "transparent",
                border: "none", borderRadius: 6, padding: sidebarOpen ? "7px 8px" : "7px 0",
                cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
                textAlign: "left", marginBottom: 1, justifyContent: sidebarOpen ? "flex-start" : "center",
              }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{role.emoji}</span>
              {sidebarOpen && (
                <span style={{ fontSize: 12, fontWeight: activeRole === role.id ? 600 : 400, color: activeRole === role.id ? "#1A1A1A" : "#4B4B4B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {role.title}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Header */}
        <div style={{ padding: "32px 40px 20px", borderBottom: "1px solid #E5E3DB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>{currentRole.emoji}</span>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{currentRole.title}</h1>
          </div>
          <p style={{ margin: "0 0 14px", color: "#6B6B6B", fontSize: 13 }}>FY 2025 · {currentRole.goals.length} goals</p>

          {/* Status summary */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {Object.entries(statusConfig).map(([status, cfg]) => (
              <div key={status} style={{ background: cfg.bg, color: cfg.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                {status}: {roleStats[status] || 0}
              </div>
            ))}
          </div>

          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍  Search goals..."
            style={{ padding: "7px 12px", borderRadius: 6, border: "1px solid #D1CFC5", background: "#fff", fontSize: 13, fontFamily: "Georgia, serif", outline: "none", width: 300 }} />
        </div>

        {/* ── Goal Cards ── */}
        <div style={{ padding: "24px 40px" }}>
          {filteredGoals.map((goal) => {
            const data      = getGoalData(goal.id);
            const sc        = statusConfig[data.status];
            const tc        = typeColors[goal.type];
            const isOpen    = expandedGoal === goal.id;

            return (
              <div key={goal.id} style={{
                background: "#fff", border: "1px solid #E5E3DB", borderRadius: 10,
                marginBottom: 12, overflow: "hidden",
                boxShadow: isOpen ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
              }}>

                {/* ── Collapsed row (always visible) ── */}
                <div style={{ padding: "14px 18px", display: "flex", alignItems: "flex-start", gap: 14, cursor: "pointer" }}
                  onClick={() => setExpandedGoal(isOpen ? null : goal.id)}>

                  <div style={{ marginTop: 3, color: "#9CA3AF", fontSize: 11, flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>▶</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: currentRole.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>{goal.category}</span>
                      <span style={{ background: tc.bg, color: tc.text, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{goal.type}</span>
                      {data.comments.length > 0 && (
                        <span style={{ background: "#F3F4F6", color: "#6B7280", padding: "2px 8px", borderRadius: 20, fontSize: 10 }}>
                          💬 {data.comments.length}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.55, marginBottom: 8 }}>{goal.goal}</div>

                    {/* Progress bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, height: 5, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${data.progress}%`, height: "100%", background: sc.bar, borderRadius: 99, transition: "width 0.3s ease" }} />
                      </div>
                      <span style={{ fontSize: 11, color: sc.color, fontWeight: 700, minWidth: 32 }}>{data.progress}%</span>
                      <span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600 }}>{data.status}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 2 }}>{goal.timeline}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{goal.target}</div>
                  </div>
                </div>

                {/* ── Expanded panel ── */}
                {isOpen && (
                  <div style={{ borderTop: "1px solid #F0EFE9", padding: "20px 18px 20px 44px", background: "#FAFAF8" }}
                    onClick={e => e.stopPropagation()}>

                    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 24 }}>

                      {/* Status buttons */}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, fontFamily: "monospace" }}>
                          Update Status
                        </div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {Object.entries(statusConfig).map(([s, cfg]) => (
                            <button key={s} onClick={() => updateGoalData(goal.id, { status: s })}
                              style={{
                                padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                                border: data.status === s ? `2px solid ${cfg.color}` : "2px solid transparent",
                                background: data.status === s ? cfg.bg : "#F3F4F6",
                                color: data.status === s ? cfg.color : "#6B7280",
                                transition: "all 0.15s"
                              }}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Progress slider */}
                      <div style={{ minWidth: 220 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, fontFamily: "monospace" }}>
                          Progress — {data.progress}%
                        </div>
                        <input type="range" min="0" max="100" step="10" value={data.progress}
                          onChange={e => updateGoalData(goal.id, { progress: Number(e.target.value) })}
                          style={{ width: "100%", accentColor: currentRole.color, cursor: "pointer" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>
                          <span>0%</span><span>50%</span><span>100%</span>
                        </div>
                      </div>
                    </div>

                    {/* ── Comments ── */}
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10, fontFamily: "monospace" }}>
                        💬 Comments {data.comments.length > 0 && `(${data.comments.length})`}
                      </div>

                      {/* Existing comments */}
                      {data.comments.map((c, i) => (
                        <div key={i} style={{
                          background: "#fff", border: "1px solid #E5E3DB", borderRadius: 8,
                          padding: "10px 12px", marginBottom: 8, display: "flex", gap: 10, alignItems: "flex-start"
                        }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: "50%",
                            background: currentRole.color, color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, fontWeight: 700, flexShrink: 0
                          }}>
                            {c.author.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 12, fontWeight: 600 }}>{c.author}</span>
                              <span style={{ fontSize: 11, color: "#9CA3AF" }}>{c.date}</span>
                            </div>
                            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{c.text}</div>
                          </div>
                          <button onClick={() => deleteComment(goal.id, i)}
                            title="Delete"
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#D1D5DB", fontSize: 14, padding: "2px 4px", borderRadius: 4, lineHeight: 1 }}>
                            ✕
                          </button>
                        </div>
                      ))}

                      {/* Add comment form */}
                      <div style={{ background: "#fff", border: "1px solid #E5E3DB", borderRadius: 8, padding: 14 }}>
                        <input
                          value={data.newAuthor}
                          onChange={e => updateGoalData(goal.id, { newAuthor: e.target.value })}
                          placeholder="Your name"
                          style={{ width: "100%", padding: "7px 10px", borderRadius: 6, border: "1px solid #E5E3DB", fontSize: 12, fontFamily: "Georgia, serif", marginBottom: 8, boxSizing: "border-box", outline: "none" }}
                        />
                        <textarea
                          value={data.newComment}
                          onChange={e => updateGoalData(goal.id, { newComment: e.target.value })}
                          placeholder="Add a progress update, blocker, or note…"
                          rows={2}
                          onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addComment(goal.id); }}
                          style={{ width: "100%", padding: "7px 10px", borderRadius: 6, border: "1px solid #E5E3DB", fontSize: 12, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", outline: "none", marginBottom: 8 }}
                        />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>Ctrl + Enter to post</span>
                          <button onClick={() => addComment(goal.id)}
                            style={{ background: currentRole.color, color: "#fff", border: "none", borderRadius: 6, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Georgia, serif" }}>
                            Post Comment
                          </button>
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
    </div>
  );
}

import { useState } from "react";

const roles = [
  {
    id: "frontend",
    title: "Frontend Developer",
    emoji: "🖥️",
    color: "#4F8EF7",
    goals: [
      { category: "Code Quality", goal: "Achieve ≥85% code review approval rate on first submission", metric: "% approvals", target: "85%", timeline: "Quarterly", type: "Performance" },
      { category: "Performance", goal: "Reduce average page load time to under 2 seconds across all key pages", metric: "Load time (ms)", target: "<2s", timeline: "H1", type: "Performance" },
      { category: "Delivery", goal: "Deliver assigned sprint tasks on time with <10% carry-forward rate", metric: "% on-time delivery", target: "90%", timeline: "Monthly", type: "Performance" },
      { category: "Testing", goal: "Maintain minimum 75% unit test coverage for all new components", metric: "% test coverage", target: "75%", timeline: "Ongoing", type: "Quality" },
      { category: "Collaboration", goal: "Participate in at least 2 knowledge-sharing sessions per quarter", metric: "Sessions attended", target: "2/quarter", timeline: "Quarterly", type: "Development" },
      { category: "Accessibility", goal: "Ensure all new UI components meet WCAG 2.1 AA standards", metric: "Compliance %", target: "100%", timeline: "Ongoing", type: "Quality" },
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    emoji: "⚙️",
    color: "#22C55E",
    goals: [
      { category: "Reliability", goal: "Maintain API uptime of 99.9% for all production services", metric: "Uptime %", target: "99.9%", timeline: "Ongoing", type: "Performance" },
      { category: "Performance", goal: "Reduce average API response time by 20% from current baseline", metric: "Response time (ms)", target: "-20%", timeline: "H1", type: "Performance" },
      { category: "Security", goal: "Zero critical vulnerabilities unresolved beyond 48-hour SLA", metric: "Critical CVEs open >48hr", target: "0", timeline: "Ongoing", type: "Quality" },
      { category: "Code Quality", goal: "Achieve ≥80% code review first-pass approval rate", metric: "% approvals", target: "80%", timeline: "Quarterly", type: "Performance" },
      { category: "Documentation", goal: "Ensure all APIs are documented in Swagger/Postman before release", metric: "% APIs documented", target: "100%", timeline: "Ongoing", type: "Quality" },
      { category: "Development", goal: "Complete one backend architecture or cloud certification", metric: "Certifications", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "fullstack",
    title: "Fullstack Developer",
    emoji: "🔄",
    color: "#A855F7",
    goals: [
      { category: "Delivery", goal: "Own and deliver 3 end-to-end features from design to deployment", metric: "Features shipped", target: "3", timeline: "Annual", type: "Performance" },
      { category: "Code Quality", goal: "Maintain ≥80% code review approval on both FE and BE submissions", metric: "% approvals", target: "80%", timeline: "Quarterly", type: "Quality" },
      { category: "Performance", goal: "Ensure full-stack features meet performance budgets (FE <2s, BE <200ms)", metric: "Both thresholds met", target: "100%", timeline: "Per feature", type: "Quality" },
      { category: "Testing", goal: "Achieve 70%+ test coverage across all newly written code", metric: "% coverage", target: "70%", timeline: "Ongoing", type: "Quality" },
      { category: "Collaboration", goal: "Bridge frontend and backend standups — flag cross-stack blockers within 24hr", metric: "Avg blocker resolution time", target: "<24hr", timeline: "Ongoing", type: "Performance" },
      { category: "Growth", goal: "Mentor at least one junior developer through a full feature cycle", metric: "Mentees guided", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    emoji: "🎨",
    color: "#F97316",
    goals: [
      { category: "Design System", goal: "Build and document a component library covering 80% of recurring UI patterns", metric: "Components documented", target: "80%", timeline: "H1", type: "Performance" },
      { category: "User Research", goal: "Conduct user research or usability testing for at least 4 major features", metric: "Research sessions", target: "4", timeline: "Annual", type: "Performance" },
      { category: "Delivery", goal: "Deliver design handoffs at least 1 sprint ahead of development cycle", metric: "Handoff lead time", target: "1 sprint", timeline: "Ongoing", type: "Quality" },
      { category: "Usability", goal: "Improve SUS (System Usability Score) by 10 points on key user flows", metric: "SUS score", target: "+10 pts", timeline: "Annual", type: "Impact" },
      { category: "Collaboration", goal: "Zero design-to-dev rework due to unclear specs or missing assets", metric: "Rework incidents", target: "0", timeline: "Ongoing", type: "Quality" },
      { category: "Growth", goal: "Explore and present one emerging design trend or tool to the team per quarter", metric: "Presentations", target: "4/year", timeline: "Quarterly", type: "Development" },
    ]
  },
  {
    id: "ecommerce",
    title: "Ecommerce Specialist",
    emoji: "🛒",
    color: "#EAB308",
    goals: [
      { category: "Conversion", goal: "Increase website conversion rate by 15% from current baseline", metric: "CVR %", target: "+15%", timeline: "Annual", type: "Impact" },
      { category: "Revenue", goal: "Grow GMV by 20% year-over-year through platform optimization", metric: "GMV growth", target: "+20% YoY", timeline: "Annual", type: "Impact" },
      { category: "Cart Abandonment", goal: "Reduce cart abandonment rate by 10% through UX and email flows", metric: "Cart abandon %", target: "-10%", timeline: "H1", type: "Performance" },
      { category: "Campaigns", goal: "Plan and execute 12 product campaigns with ROI tracking per campaign", metric: "Campaigns", target: "12/year", timeline: "Monthly", type: "Performance" },
      { category: "Listings", goal: "Ensure 100% of active product listings have optimized titles, images, and descriptions", metric: "% listings optimized", target: "100%", timeline: "Q1", type: "Quality" },
      { category: "Analytics", goal: "Submit monthly ecommerce performance report with actionable insights", metric: "Reports submitted", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
  {
    id: "photoshop",
    title: "Photoshop Specialist",
    emoji: "🖼️",
    color: "#06B6D4",
    goals: [
      { category: "Delivery", goal: "Deliver 95% of creative assets within agreed turnaround time", metric: "% on-time delivery", target: "95%", timeline: "Monthly", type: "Performance" },
      { category: "Quality", goal: "Achieve <5% revision rate on delivered assets (first-submission quality)", metric: "% revisions", target: "<5%", timeline: "Quarterly", type: "Quality" },
      { category: "Brand Consistency", goal: "Ensure 100% of assets follow brand guidelines without exception", metric: "Brand guideline compliance", target: "100%", timeline: "Ongoing", type: "Quality" },
      { category: "Productivity", goal: "Build a reusable asset library of 50+ templates to speed up production", metric: "Templates created", target: "50+", timeline: "Annual", type: "Performance" },
      { category: "Volume", goal: "Deliver a minimum of [X] assets per month as per team capacity plan", metric: "Assets delivered/month", target: "Per plan", timeline: "Monthly", type: "Performance" },
      { category: "Growth", goal: "Learn and apply one new design tool or technique per quarter", metric: "Skills added", target: "4/year", timeline: "Quarterly", type: "Development" },
    ]
  },
  {
    id: "webdev",
    title: "Web Developer",
    emoji: "🌐",
    color: "#10B981",
    goals: [
      { category: "Performance", goal: "Achieve Google PageSpeed score of 85+ on all key landing pages", metric: "PageSpeed score", target: "85+", timeline: "H1", type: "Quality" },
      { category: "SEO", goal: "Ensure all pages meet technical SEO standards (meta, schema, sitemap)", metric: "% pages compliant", target: "100%", timeline: "Q1", type: "Quality" },
      { category: "Uptime", goal: "Maintain website uptime of 99.5% or higher", metric: "Uptime %", target: "99.5%", timeline: "Ongoing", type: "Performance" },
      { category: "Bug Resolution", goal: "Resolve all P1/P2 website bugs within 24 hours of reporting", metric: "Avg resolution time", target: "<24hr", timeline: "Ongoing", type: "Quality" },
      { category: "Delivery", goal: "Complete web update requests within 2 business days for standard changes", metric: "Avg turnaround", target: "<2 days", timeline: "Ongoing", type: "Performance" },
      { category: "Security", goal: "Conduct quarterly security audits and resolve all flagged vulnerabilities", metric: "Audits completed", target: "4/year", timeline: "Quarterly", type: "Quality" },
    ]
  },
  {
    id: "apm",
    title: "Associate Product Manager",
    emoji: "📋",
    color: "#F43F5E",
    goals: [
      { category: "Roadmap", goal: "Maintain a prioritized, clearly documented product backlog at all times", metric: "Backlog hygiene score", target: "Reviewed weekly", timeline: "Ongoing", type: "Performance" },
      { category: "Feature Delivery", goal: "Ensure 80% of planned quarterly features are shipped on time", metric: "% features on time", target: "80%", timeline: "Quarterly", type: "Performance" },
      { category: "Stakeholder Alignment", goal: "Conduct monthly product reviews with key stakeholders", metric: "Reviews held", target: "12/year", timeline: "Monthly", type: "Performance" },
      { category: "User Research", goal: "Gather structured user feedback for every major feature before and after launch", metric: "Features with research", target: "100%", timeline: "Per feature", type: "Quality" },
      { category: "Data", goal: "Define and track success metrics for all features launched", metric: "% features with KPIs", target: "100%", timeline: "Ongoing", type: "Quality" },
      { category: "Growth", goal: "Complete a PM certification or structured learning program", metric: "Certifications", target: "1", timeline: "Annual", type: "Development" },
    ]
  },
  {
    id: "hrbp",
    title: "HRBP",
    emoji: "🤝",
    color: "#8B5CF6",
    goals: [
      { category: "Retention", goal: "Reduce voluntary attrition in assigned business units by 10%", metric: "Attrition %", target: "-10%", timeline: "Annual", type: "Impact" },
      { category: "Engagement", goal: "Achieve employee engagement score of 75%+ in pulse surveys", metric: "Engagement score", target: "75%+", timeline: "Bi-annual", type: "Impact" },
      { category: "PMS", goal: "Ensure 100% completion of goal-setting and mid-year reviews across all BUs", metric: "% completion", target: "100%", timeline: "Per cycle", type: "Performance" },
      { category: "Grievance", goal: "Resolve all employee grievances within 10 working days", metric: "Avg resolution time", target: "<10 days", timeline: "Ongoing", type: "Quality" },
      { category: "L&D", goal: "Identify skill gaps and roll out at least 2 targeted training interventions per BU", metric: "Interventions delivered", target: "2/BU", timeline: "Annual", type: "Performance" },
      { category: "Partnership", goal: "Conduct structured business partner check-ins with BU heads monthly", metric: "Check-ins completed", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
  {
    id: "hrmanager",
    title: "Asst. Manager HR",
    emoji: "👥",
    color: "#EC4899",
    goals: [
      { category: "Recruitment", goal: "Achieve average time-to-fill of under 30 days for all open positions", metric: "Avg days to fill", target: "<30 days", timeline: "Ongoing", type: "Performance" },
      { category: "Onboarding", goal: "Achieve 90%+ satisfaction score on new hire onboarding feedback", metric: "Onboarding CSAT", target: "90%+", timeline: "Per cohort", type: "Quality" },
      { category: "Compliance", goal: "Ensure 100% HR compliance with labour laws and internal HR policies", metric: "Audit pass rate", target: "100%", timeline: "Annual", type: "Quality" },
      { category: "Talent Pipeline", goal: "Build a pre-screened talent pipeline for all critical roles", metric: "Roles with pipeline", target: "100% critical roles", timeline: "Q2", type: "Performance" },
      { category: "HR Operations", goal: "Ensure zero payroll or documentation errors in monthly HR processing", metric: "Errors per cycle", target: "0", timeline: "Monthly", type: "Quality" },
      { category: "Employer Brand", goal: "Execute 2 employer branding initiatives (campus drives, social, events)", metric: "Initiatives", target: "2", timeline: "Annual", type: "Performance" },
    ]
  },
  {
    id: "marketing",
    title: "Marketing Manager",
    emoji: "📣",
    color: "#F59E0B",
    goals: [
      { category: "Lead Generation", goal: "Generate [X] qualified marketing leads per quarter aligned to sales targets", metric: "MQLs generated", target: "Per quarterly target", timeline: "Quarterly", type: "Impact" },
      { category: "Brand Awareness", goal: "Grow organic social media reach by 25% across primary channels", metric: "Reach growth %", target: "+25%", timeline: "Annual", type: "Impact" },
      { category: "Campaign ROI", goal: "Achieve minimum 3x ROI on paid marketing campaigns", metric: "Campaign ROI", target: "3x", timeline: "Per campaign", type: "Performance" },
      { category: "Content", goal: "Publish a minimum of 8 high-quality content pieces per month (blogs, social, email)", metric: "Content pieces/month", target: "8+", timeline: "Monthly", type: "Performance" },
      { category: "Email Marketing", goal: "Maintain email open rate above 25% and click-through rate above 3%", metric: "Open rate / CTR", target: ">25% / >3%", timeline: "Ongoing", type: "Quality" },
      { category: "Analytics", goal: "Submit monthly marketing performance dashboard with channel-wise ROI", metric: "Reports submitted", target: "12/year", timeline: "Monthly", type: "Performance" },
    ]
  },
];

const typeColors = {
  Performance: { bg: "#EFF6FF", text: "#2563EB", dot: "#3B82F6" },
  Quality: { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" },
  Impact: { bg: "#FFF7ED", text: "#C2410C", dot: "#F97316" },
  Development: { bg: "#FAF5FF", text: "#7C3AED", dot: "#A855F7" },
};

export default function PMSGoals() {
  const [activeRole, setActiveRole] = useState("frontend");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentRole = roles.find(r => r.id === activeRole);

  const filteredGoals = currentRole.goals.filter(g =>
    g.goal.toLowerCase().includes(search.toLowerCase()) ||
    g.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#FAFAF8",
      minHeight: "100vh",
      display: "flex",
      color: "#1A1A1A"
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 60,
        background: "#F0EFE9",
        borderRight: "1px solid #E5E3DB",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ padding: "20px 12px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 18, padding: 4, borderRadius: 6,
              color: "#6B6B6B", flexShrink: 0
            }}
          >☰</button>
          {sidebarOpen && (
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1A1A1A", whiteSpace: "nowrap", fontFamily: "Georgia, serif" }}>
              🎯 PMS Goals 2025
            </span>
          )}
        </div>

        {sidebarOpen && (
          <div style={{ padding: "4px 12px 8px", color: "#6B6B6B", fontSize: 11, fontFamily: "monospace", letterSpacing: 1, textTransform: "uppercase" }}>
            Roles
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}>
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              style={{
                width: "100%",
                background: activeRole === role.id ? "#E8E6DE" : "transparent",
                border: "none",
                borderRadius: 6,
                padding: sidebarOpen ? "8px 10px" : "8px 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                textAlign: "left",
                marginBottom: 2,
                transition: "background 0.15s",
                justifyContent: sidebarOpen ? "flex-start" : "center",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{role.emoji}</span>
              {sidebarOpen && (
                <span style={{
                  fontSize: 13,
                  fontWeight: activeRole === role.id ? 600 : 400,
                  color: activeRole === role.id ? "#1A1A1A" : "#4B4B4B",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "Georgia, serif"
                }}>
                  {role.title}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div style={{
          padding: "40px 48px 24px",
          borderBottom: "1px solid #E5E3DB",
          background: "#FAFAF8"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>{currentRole.emoji}</span>
            <h1 style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "Georgia, serif",
              color: "#1A1A1A"
            }}>
              {currentRole.title}
            </h1>
          </div>
          <p style={{ margin: "0 0 20px", color: "#6B6B6B", fontSize: 14, fontFamily: "Georgia, serif" }}>
            Performance goals for FY 2025 · {currentRole.goals.length} goals defined
          </p>

          {/* Search */}
          <div style={{ position: "relative", maxWidth: 360 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", fontSize: 14 }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search goals..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 32px",
                borderRadius: 6,
                border: "1px solid #D1CFC5",
                background: "#FFFFFF",
                fontSize: 13,
                fontFamily: "Georgia, serif",
                color: "#1A1A1A",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
        </div>

        {/* Goal Cards */}
        <div style={{ padding: "28px 48px" }}>
          {/* Legend */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {Object.entries(typeColors).map(([type, colors]) => (
              <div key={type} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: colors.bg, padding: "4px 10px",
                borderRadius: 20, fontSize: 12,
                color: colors.text, fontFamily: "Georgia, serif"
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.dot, display: "inline-block" }}></span>
                {type}
              </div>
            ))}
          </div>

          {/* Table-style goals */}
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #E5E3DB",
            borderRadius: 10,
            overflow: "hidden",
          }}>
            {/* Table Header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "160px 1fr 130px 100px 110px",
              background: "#F5F4EF",
              padding: "10px 20px",
              borderBottom: "1px solid #E5E3DB",
              gap: 12,
            }}>
              {["Category", "Goal", "Metric / Target", "Timeline", "Type"].map(h => (
                <div key={h} style={{
                  fontSize: 11, fontWeight: 600, color: "#6B6B6B",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  fontFamily: "monospace"
                }}>{h}</div>
              ))}
            </div>

            {/* Goal Rows */}
            {filteredGoals.map((goal, idx) => {
              const tc = typeColors[goal.type];
              return (
                <div
                  key={idx}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr 130px 100px 110px",
                    padding: "14px 20px",
                    borderBottom: idx < filteredGoals.length - 1 ? "1px solid #F0EFE9" : "none",
                    gap: 12,
                    alignItems: "start",
                    transition: "background 0.1s",
                    cursor: "default",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Category */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6, marginTop: 2
                  }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: currentRole.color,
                      flexShrink: 0, display: "inline-block", marginTop: 1
                    }}></span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#4B4B4B", fontFamily: "Georgia, serif" }}>
                      {goal.category}
                    </span>
                  </div>

                  {/* Goal */}
                  <div style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
                    {goal.goal}
                  </div>

                  {/* Metric/Target */}
                  <div>
                    <div style={{ fontSize: 12, color: "#6B6B6B", fontFamily: "Georgia, serif" }}>{goal.metric}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#1A1A1A", fontFamily: "monospace", marginTop: 2 }}>{goal.target}</div>
                  </div>

                  {/* Timeline */}
                  <div style={{
                    fontSize: 12, color: "#6B6B6B",
                    fontFamily: "Georgia, serif", marginTop: 2
                  }}>
                    {goal.timeline}
                  </div>

                  {/* Type Badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center",
                    background: tc.bg, color: tc.text,
                    padding: "3px 10px", borderRadius: 20,
                    fontSize: 11, fontWeight: 600,
                    fontFamily: "Georgia, serif",
                    width: "fit-content"
                  }}>
                    {goal.type}
                  </div>
                </div>
              );
            })}

            {filteredGoals.length === 0 && (
              <div style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontFamily: "Georgia, serif" }}>
                No goals match your search.
              </div>
            )}
          </div>

          {/* Footer note */}
          <div style={{
            marginTop: 24, padding: "14px 18px",
            background: "#FFF9ED", borderRadius: 8,
            border: "1px solid #FDE68A",
            fontSize: 12, color: "#92400E",
            fontFamily: "Georgia, serif", lineHeight: 1.6
          }}>
            💡 <strong>Note:</strong> Goals marked with [X] require team-specific targets to be filled in before the cycle begins. All goals should be reviewed with the reporting manager in the first 2 weeks of January.
          </div>
        </div>
      </div>
    </div>
  );
}

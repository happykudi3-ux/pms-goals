import { useState } from "react";

// ─── Goal Templates by Role ───────────────────────────────────────────────────
const GOAL_TEMPLATES = {
  frontend: [
    { cat: "Code Quality",  goal: "Achieve ≥80% code review approval rate on first submission",              target: "80%",        metric: "% approvals" },
    { cat: "Delivery",      goal: "Complete all assigned sprint tasks on time with <15% carry-forward",       target: "90% on-time",metric: "% on-time"   },
    { cat: "Testing",       goal: "Maintain minimum 70% unit test coverage for all new code written",         target: "70%",        metric: "% coverage"  },
    { cat: "Growth",        goal: "Complete at least 1 technical course or certification by March 2027",      target: "1 cert",     metric: "Certs done"  },
  ],
  fullstack: [
    { cat: "Feature Delivery", goal: "Contribute to at least 2 complete end-to-end features by March 2027",  target: "2 features", metric: "Features shipped" },
    { cat: "Code Quality",     goal: "Maintain ≥75% code review approval on frontend and backend submissions",target: "75%",        metric: "% approvals"    },
    { cat: "Delivery",         goal: "Complete sprint tasks with less than 15% carry-forward rate",           target: "<15%",       metric: "% carry-forward" },
    { cat: "Growth",           goal: "Complete 1 fullstack or cloud learning module by March 2027",           target: "1 module",   metric: "Modules done"    },
  ],
  intern: [
    { cat: "Learning",    goal: "Complete all assigned learning tasks and onboarding modules on time",         target: "100%",       metric: "Tasks done"  },
    { cat: "Delivery",    goal: "Deliver assigned tickets/tasks within agreed sprint timelines",               target: "85% on-time",metric: "% on-time"   },
    { cat: "Code Quality",goal: "Receive satisfactory code review feedback with <3 major revision rounds",    target: "<3 revisions",metric: "Avg revisions" },
    { cat: "Growth",      goal: "Build and present 1 personal project or technical demo by March 2027",       target: "1 demo",     metric: "Demos done"  },
  ],
  qa: [
    { cat: "Bug Detection", goal: "Identify and log 90%+ critical bugs before production release",            target: "90%",        metric: "% bugs caught" },
    { cat: "Coverage",      goal: "Write test cases covering 80%+ of all features in each sprint",            target: "80%",        metric: "% coverage"    },
    { cat: "Documentation", goal: "Maintain up-to-date test plans and regression suites for all modules",     target: "100%",       metric: "% documented"  },
    { cat: "Turnaround",    goal: "Complete full QA cycle within the agreed sprint testing window",            target: "100%",       metric: "% on-time"     },
  ],
  webdev: [
    { cat: "Performance",  goal: "Achieve Google PageSpeed score of 85+ on all key landing pages",            target: "85+",        metric: "PageSpeed score" },
    { cat: "Uptime",       goal: "Maintain website uptime of 99.5% or higher throughout the year",            target: "99.5%",      metric: "Uptime %"        },
    { cat: "Delivery",     goal: "Complete standard web update requests within 2 business days",               target: "<2 days",    metric: "Avg turnaround"  },
    { cat: "SEO",          goal: "Ensure all pages meet core technical SEO standards (meta, schema, sitemap)", target: "100%",       metric: "% compliant"     },
  ],
  shopify: [
    { cat: "Store Speed",  goal: "Improve Shopify store speed/performance score by 15% from baseline",        target: "+15%",       metric: "Speed score"    },
    { cat: "Delivery",     goal: "Ship all assigned Shopify tasks and fixes within the sprint timeline",       target: "90% on-time",metric: "% on-time"      },
    { cat: "Bug Fixes",    goal: "Resolve all P1/P2 Shopify store bugs within 24 hours of reporting",         target: "<24hr",      metric: "Avg fix time"   },
    { cat: "Growth",       goal: "Complete 1 Shopify Partner or developer certification by March 2027",        target: "1 cert",     metric: "Certs done"     },
  ],
  ecom_head: [
    { cat: "Revenue",      goal: "Grow Gross Merchandise Value (GMV) by 20% year-over-year",                  target: "+20% YoY",   metric: "GMV growth"    },
    { cat: "Conversion",   goal: "Increase store conversion rate by 15% from current baseline",               target: "+15%",       metric: "CVR %"         },
    { cat: "Team",         goal: "Ensure 100% goal completion and review participation across the ecom team",  target: "100%",       metric: "% completion"  },
    { cat: "Campaigns",    goal: "Plan and execute 12 ecommerce campaigns with per-campaign ROI tracking",     target: "12/year",    metric: "Campaigns done"},
  ],
  ecom_ops: [
    { cat: "Listings",     goal: "Ensure 100% of active product listings are fully optimised at all times",   target: "100%",       metric: "% optimised"   },
    { cat: "Campaigns",    goal: "Support execution of 8+ ecommerce campaigns with data tracking",            target: "8/year",     metric: "Campaigns"     },
    { cat: "Reporting",    goal: "Submit weekly performance and ops reports without delay",                    target: "48 reports", metric: "Reports filed" },
    { cat: "Growth",       goal: "Complete 1 ecommerce or platform certification by March 2027",              target: "1 cert",     metric: "Certs done"    },
  ],
  ops_manager: [
    { cat: "Ops Delivery",   goal: "Ensure all site operations tasks are completed within agreed SLAs",        target: "95% SLA",    metric: "% within SLA" },
    { cat: "Reporting",      goal: "Publish weekly ops health report with zero delays",                        target: "48 reports", metric: "Reports done"  },
    { cat: "Process",        goal: "Identify and document 3+ process improvements by March 2027",             target: "3 SOPs",     metric: "SOPs created"  },
    { cat: "Stakeholders",   goal: "Conduct monthly review with key stakeholders across teams",                target: "12/year",    metric: "Reviews held"  },
  ],
  apm: [
    { cat: "Roadmap",        goal: "Maintain a reviewed, prioritised product backlog on a weekly basis",       target: "Weekly",     metric: "Backlog health"},
    { cat: "Feature Delivery",goal:"Ensure 80% of planned features are shipped on time each quarter",          target: "80%",        metric: "% on-time"     },
    { cat: "Stakeholders",   goal: "Conduct monthly product reviews with key stakeholders",                    target: "12/year",    metric: "Reviews held"  },
    { cat: "User Research",  goal: "Collect structured user feedback for every major feature launched",        target: "100%",       metric: "% with research"},
  ],
  pm: [
    { cat: "Product Strategy",goal:"Define and maintain a clear 6-month product roadmap updated quarterly",    target: "Quarterly",  metric: "Roadmap updated"},
    { cat: "Delivery",        goal:"Achieve 85%+ on-time delivery of planned quarterly roadmap features",      target: "85%",        metric: "% on-time"     },
    { cat: "Stakeholders",    goal:"Lead monthly product reviews with leadership and cross-functional teams",   target: "12/year",    metric: "Reviews held"  },
    { cat: "OKRs",            goal:"Define measurable OKRs for product area and track monthly progress",       target: "100% tracked",metric:"% OKRs active" },
  ],
  data_analyst: [
    { cat: "Reporting",    goal: "Deliver all weekly and monthly data reports on time without reminders",      target: "100% on-time",metric: "% on-time"   },
    { cat: "Accuracy",     goal: "Maintain less than 2% error rate in all data outputs and dashboards",        target: "<2% errors", metric: "Error rate"    },
    { cat: "Dashboards",   goal: "Build and maintain at least 3 live performance tracking dashboards",         target: "3",          metric: "Dashboards live"},
    { cat: "Growth",       goal: "Complete 1 data analytics or BI tool certification by March 2027",           target: "1 cert",     metric: "Certs done"    },
  ],
  design: [
    { cat: "Delivery",     goal: "Deliver 95% of all creative assets within agreed turnaround time",           target: "95%",        metric: "% on-time"     },
    { cat: "Quality",      goal: "Achieve less than 5% revision rate on creative assets at first delivery",    target: "<5%",        metric: "Revision rate"  },
    { cat: "Brand",        goal: "Ensure 100% of all outputs comply with brand guidelines",                    target: "100%",       metric: "% compliant"    },
    { cat: "Volume",       goal: "Meet or exceed the agreed monthly creative asset output target",             target: "Per plan",   metric: "Assets/month"   },
  ],
  uiux: [
    { cat: "Design Quality", goal: "Deliver design files with complete annotations; zero rework from devs",    target: "0 rework",   metric: "Rework instances"},
    { cat: "Handoffs",       goal: "Hand off all designs at least 1 sprint before development begins",         target: "100%",       metric: "% early handoffs"},
    { cat: "Usability",      goal: "Conduct at least 2 usability reviews per quarter on key user flows",       target: "8/year",     metric: "Reviews done"    },
    { cat: "Growth",         goal: "Complete 1 UX/UI design course or certification by March 2027",            target: "1 cert",     metric: "Certs done"      },
  ],
  design_lead: [
    { cat: "Design Strategy",goal: "Define and maintain design system standards used by the full team",        target: "System live",metric: "System usage %"  },
    { cat: "Team Output",    goal: "Ensure team delivers 95%+ creative assets on time every month",            target: "95%",        metric: "% on-time"       },
    { cat: "Brand Integrity",goal: "Zero brand guideline violations in any published creative output",         target: "0 violations",metric:"Violations"      },
    { cat: "Stakeholders",   goal: "Conduct design reviews with product/marketing teams monthly",              target: "12/year",    metric: "Reviews held"    },
  ],
  marketing: [
    { cat: "Lead Generation",goal: "Generate qualified MQLs per quarter aligned to sales targets",             target: "Per target", metric: "MQLs/quarter"   },
    { cat: "Campaigns",      goal: "Plan and execute 8+ campaigns with documented ROI per campaign",           target: "8/year",     metric: "Campaigns run"  },
    { cat: "Content",        goal: "Publish minimum 8 high-quality content pieces per month",                  target: "8/month",    metric: "Pieces/month"   },
    { cat: "Reporting",      goal: "Submit monthly marketing performance report with channel-wise ROI",        target: "12/year",    metric: "Reports filed"  },
  ],
  crm: [
    { cat: "CRM Health",   goal: "Maintain clean CRM database with <5% data quality issues",                   target: "<5% errors", metric: "Data quality %"},
    { cat: "Campaigns",    goal: "Execute 12+ CRM/email campaigns with open rate >25% and CTR >3%",            target: "12/year",    metric: "Campaigns run"  },
    { cat: "Analytics",    goal: "Deliver monthly CRM analytics report with actionable retention insights",     target: "12/year",    metric: "Reports filed"  },
    { cat: "Automation",   goal: "Build and activate 3+ CRM automation workflows by March 2027",               target: "3 workflows",metric: "Flows live"     },
  ],
  hrbp: [
    { cat: "Retention",    goal: "Reduce voluntary attrition by 10% vs prior year across assigned BUs",        target: "-10%",       metric: "Attrition %"   },
    { cat: "PMS",          goal: "Ensure 100% goal-setting and review completion across all business units",   target: "100%",       metric: "% completion"  },
    { cat: "Engagement",   goal: "Achieve 75%+ employee engagement score in bi-annual pulse surveys",          target: "75%+",       metric: "Engagement score"},
    { cat: "Grievances",   goal: "Resolve all employee grievances within 10 working days of being raised",     target: "<10 days",   metric: "Avg resolution"},
  ],
  hr_manager: [
    { cat: "Recruitment",  goal: "Achieve average time-to-fill of under 30 days for all open positions",       target: "<30 days",   metric: "Days to fill"  },
    { cat: "Onboarding",   goal: "Achieve 90%+ satisfaction score on all new hire onboarding surveys",         target: "90%+",       metric: "Onboarding CSAT"},
    { cat: "Compliance",   goal: "Ensure 100% HR compliance with labour laws and internal HR policies",        target: "100%",       metric: "Audit pass rate"},
    { cat: "HR Ops",       goal: "Maintain zero payroll and documentation errors in monthly HR processing",    target: "0 errors",   metric: "Errors/month"  },
  ],
  web_analyst: [
    { cat: "Reporting",    goal: "Submit all weekly web analytics reports on time without reminders",           target: "48/year",    metric: "Reports on-time"},
    { cat: "Insights",     goal: "Deliver one actionable website insight or recommendation per month",          target: "12/year",    metric: "Insights filed" },
    { cat: "Tracking",     goal: "Ensure 100% analytics event coverage across all key website pages",           target: "100%",       metric: "% events tracked"},
    { cat: "Growth",       goal: "Complete 1 web analytics or GA4 certification by March 2027",                target: "1 cert",     metric: "Certs done"     },
  ],
};

// ─── Employee Data ────────────────────────────────────────────────────────────
function getTemplate(designation, department) {
  const d = (designation || "").toLowerCase();
  const dept = (department || "").toLowerCase();
  if (d.includes("intern")) return GOAL_TEMPLATES.intern;
  if (d.includes("head of e-commerce") || d.includes("head of ecommerce")) return GOAL_TEMPLATES.ecom_head;
  if (d.includes("shopify developer") || d.includes("shopify")) return GOAL_TEMPLATES.shopify;
  if (d.includes("lead web") || d.includes("lead web developer")) return GOAL_TEMPLATES.webdev;
  if (d.includes("web developer") || d.includes("web dev")) return GOAL_TEMPLATES.webdev;
  if (d.includes("web analyst")) return GOAL_TEMPLATES.web_analyst;
  if (d.includes("front-end") || d.includes("frontend") || d.includes("junior developer")) return GOAL_TEMPLATES.frontend;
  if (d.includes("full stack") || d.includes("fullstack")) return GOAL_TEMPLATES.fullstack;
  if (d.includes("quality analyst") || d.includes("quality assurance") || d.includes("qa")) return GOAL_TEMPLATES.qa;
  if (d.includes("senior product manager")) return GOAL_TEMPLATES.pm;
  if (d.includes("associate product manager")) return GOAL_TEMPLATES.apm;
  if (d.includes("associate site ops") || d.includes("site ops")) return GOAL_TEMPLATES.ops_manager;
  if (d.includes("data analyst")) return GOAL_TEMPLATES.data_analyst;
  if (d.includes("photoshop")) return GOAL_TEMPLATES.design;
  if (d.includes("ui/ux") || d.includes("ux designer") || d.includes("ux intern")) return GOAL_TEMPLATES.uiux;
  if (d.includes("assistant manager - growth") || d.includes("growth marketing")) return GOAL_TEMPLATES.marketing;
  if (d.includes("marketing manager - crm") || d.includes("crm and analytics") || d.includes("crm")) return GOAL_TEMPLATES.crm;
  if (d.includes("marketing manager") || d.includes("marketing")) return GOAL_TEMPLATES.marketing;
  if (d.includes("human resource business partner") || d.includes("hrbp")) return GOAL_TEMPLATES.hrbp;
  if (d.includes("assistant manager hr") || d.includes("hr")) return GOAL_TEMPLATES.hr_manager;
  if (dept.includes("ecommerce") || dept.includes("e-commerce")) return GOAL_TEMPLATES.ecom_ops;
  if (dept.includes("design")) return GOAL_TEMPLATES.design_lead;
  return GOAL_TEMPLATES.ecom_ops;
}

const RAW_EMPLOYEES = [
  { id:"CT00011", name:"Apratim Mahata",                  designation:"Junior Developer",                        dept:"Technology Team",  manager:"Vedang Singh"         },
  { id:"CT00012", name:"Soumya Kanta Mohanty",            designation:"Head of E-commerce Operations",           dept:"Ecommerce",         manager:"Vedang Singh"         },
  { id:"CT00013", name:"Shubham Pandey",                  designation:"Junior Software Developer - Full Stack",  dept:"Technology Team",  manager:"Vedang Singh"         },
  { id:"CT00014", name:"Alok Kumar Choudhary",            designation:"Ecommerce Executive",                     dept:"Ecommerce",         manager:"Soumya Kanta Mohanty" },
  { id:"CT00015", name:"Hrithik Singh",                   designation:"Associate Product Manager",               dept:"Site Operations",  manager:"Vedang Singh"         },
  { id:"CT00019", name:"Vadde Thirumalesh",               designation:"Quality Analyst",                         dept:"Technology Team",  manager:"Suhita Paik"          },
  { id:"CT00020", name:"Rahul Bhatt",                     designation:"Associate Product Manager",               dept:"Site Operations",  manager:"Parveen Jahan"        },
  { id:"CT00021", name:"Supraja Ramkumar",                designation:"Ecommerce Executive",                     dept:"Ecommerce",         manager:"Soumya Kanta Mohanty" },
  { id:"CT00023", name:"Soumesh Kundu",                   designation:"Full Stack Intern",                       dept:"Technology Team",  manager:"Apratim Mahata"       },
  { id:"CT00025", name:"Mohammad Arif Uzair",             designation:"Senior Shopify Developer",                dept:"Ecommerce",         manager:"Suman Saha"           },
  { id:"CT00026", name:"Mohan Nandanawad",                designation:"Web Analyst",                             dept:"Site Operations",  manager:"Vedang Singh"         },
  { id:"CT00027", name:"Parthapratim Dash",               designation:"Associate Site Ops Manager",              dept:"Ecommerce",         manager:"Soumya Kanta Mohanty" },
  { id:"CT00028", name:"Sushil Kumar",                    designation:"Senior Shopify Developer",                dept:"Site Operations",  manager:"Suman Saha"           },
  { id:"CT00030", name:"Ronit Shrestha",                  designation:"Shopify Developer",                       dept:"Ecommerce",         manager:"Suman Saha"           },
  { id:"CT00031", name:"Muskan Mondal",                   designation:"Photoshop Specialist",                    dept:"Design Team",      manager:"Soumya Kanta Mohanty" },
  { id:"CT00032", name:"Syeda Rahmat",                    designation:"Junior UI/UX Designer",                   dept:"Design Team",      manager:"Madhushree BJ"        },
  { id:"CT00034", name:"Aditya Sharma",                   designation:"Data Analyst Intern",                     dept:"Site Operations",  manager:"Hrithik Singh"        },
  { id:"CT00035", name:"Suhita Paik",                     designation:"Senior Product Manager",                  dept:"Site Operations",  manager:"Parveen Jahan"        },
  { id:"CT00036", name:"Deepak Kumar",                    designation:"Shopify Developer",                       dept:"Ecommerce",         manager:"Suman Saha"           },
  { id:"CT00037", name:"Swastik Sharma",                  designation:"Full Stack Intern",                       dept:"Technology Team",  manager:"Apratim Mahata"       },
  { id:"CT00038", name:"Ashvin Tyagi",                    designation:"Assistant Manager - Growth Marketing",    dept:"Marketing",        manager:"Parveen Jahan"        },
  { id:"CT0004",  name:"Madhushree BJ",                   designation:"Design Lead",                             dept:"Design Team",      manager:"Vedang Singh"         },
  { id:"CT00041", name:"Vibudh Rathore",                  designation:"Junior Developer",                        dept:"Technology Team",  manager:"Shubham Pandey"       },
  { id:"CT00043", name:"Shreyansh Srivastava",            designation:"Full Stack Intern",                       dept:"Technology Team",  manager:"Apratim Mahata"       },
  { id:"CT00045", name:"Bhoopendra Singh",                designation:"Senior Shopify Developer",                dept:"Design Team",      manager:"Suman Saha"           },
  { id:"CT00046", name:"Manikanteswara Reddy Yandapalle", designation:"Quality Assurance Engineer",              dept:"Technology Team",  manager:"Suhita Paik"          },
  { id:"CT00048", name:"Paras Bagri",                     designation:"Junior Front-End Developer",              dept:"Technology Team",  manager:"Suman Saha"           },
  { id:"CT00049", name:"Tilak Rathoure",                  designation:"Full Stack Intern",                       dept:"Technology Team",  manager:"Apratim Mahata"       },
  { id:"CT00050", name:"Chandan Kumawat",                 designation:"Shopify Developer",                       dept:"Design Team",      manager:"Suman Saha"           },
  { id:"CT00051", name:"Pervez Ilyasi",                   designation:"Full-Stack Developer",                    dept:"Technology Team",  manager:"Vedang Singh"         },
  { id:"CT00053", name:"Shaique Hossain",                 designation:"Assistant Manager CRM and Analytics",     dept:"Marketing",        manager:"Manav Goel"           },
  { id:"CT00054", name:"Prajwal Nitnaware",               designation:"UI/UX Intern",                            dept:"Design Team",      manager:"Madhushree BJ"        },
  { id:"CT00056", name:"Rshmi Singh",                     designation:"Human Resource Business Partner",         dept:"Human Resource",   manager:"Parveen Jahan"        },
  { id:"CT00057", name:"Soumojit Dutta",                  designation:"Junior Developer",                        dept:"Technology Team",  manager:"Pervez Ilyasi"        },
  { id:"CT00058", name:"Manas Srivastava",                designation:"Associate Product Manager",               dept:"Site Operations",  manager:"Vedang Singh"         },
  { id:"CT0006",  name:"Manav Goel",                      designation:"Marketing Manager - CRM",                 dept:"Marketing",        manager:"Parveen Jahan"        },
  { id:"CT0007",  name:"Suman Saha",                      designation:"Lead Web Developer",                      dept:"Technology Team",  manager:"Parveen Jahan"        },
  { id:"CT0009",  name:"Khushi Ash",                      designation:"Assistant Manager HR",                    dept:"Human Resource",   manager:"Parveen Jahan"        },
];

const EMPLOYEES = RAW_EMPLOYEES.map(e => ({
  ...e,
  goals: getTemplate(e.designation, e.dept).map((g, i) => ({ ...g, id: `${e.id}_g${i}` }))
}));

const DEPT_COLORS = {
  "Technology Team": "#4F8EF7",
  "Ecommerce":       "#EAB308",
  "Site Operations": "#10B981",
  "Design Team":     "#F97316",
  "Marketing":       "#A855F7",
  "Human Resource":  "#EC4899",
};

const DEPTS = ["All", ...Object.keys(DEPT_COLORS)];

const RATING_LABELS = { 1:"Needs Improvement", 2:"Below Expectations", 3:"Meets Expectations", 4:"Exceeds Expectations", 5:"Outstanding" };
const RATING_COLORS = { 1:"#EF4444", 2:"#F97316", 3:"#EAB308", 4:"#22C55E", 5:"#6366F1" };

const STATUS_CFG = {
  "Not Started": { color:"#6B7280", bar:"#D1D5DB" },
  "In Progress":  { color:"#2563EB", bar:"#3B82F6" },
  "On Track":     { color:"#16A34A", bar:"#22C55E" },
  "At Risk":      { color:"#D97706", bar:"#F59E0B" },
  "Completed":    { color:"#7C3AED", bar:"#A855F7" },
};

function initGoalData(goals) {
  const obj = {};
  goals.forEach(g => {
    obj[g.id] = { status:"Not Started", progress:0, midRating:0, finalRating:0, midComment:"", finalComment:"" };
  });
  return obj;
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function PMS() {
  const [dark, setDark]             = useState(false);
  const [search, setSearch]         = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [selected, setSelected]     = useState(EMPLOYEES[0]);
  const [allGoalData, setAllGoalData] = useState(() => {
    const init = {};
    EMPLOYEES.forEach(e => { init[e.id] = initGoalData(e.goals); });
    return init;
  });
  const [ratingMode, setRatingMode] = useState(null); // "mid" | "final" | null

  const bg     = dark ? "#0F1117" : "#F7F7F5";
  const surf   = dark ? "#1A1D27" : "#FFFFFF";
  const border = dark ? "#2A2D3A" : "#E8E6DF";
  const txt    = dark ? "#EEEEF0" : "#1A1A1A";
  const muted  = dark ? "#8B8FA8" : "#6B7280";
  const sidebar= dark ? "#13151E" : "#F0EFE9";
  const hover  = dark ? "#1F2235" : "#F0EFE9";
  const inp    = dark ? "#1F2235" : "#FFFFFF";
  const deptColor = DEPT_COLORS[selected?.dept] || "#6B7280";

  const getGD  = (empId, goalId) => allGoalData[empId]?.[goalId] || { status:"Not Started", progress:0, midRating:0, finalRating:0, midComment:"", finalComment:"" };
  const setGD  = (empId, goalId, updates) =>
    setAllGoalData(p => ({ ...p, [empId]: { ...p[empId], [goalId]: { ...getGD(empId, goalId), ...updates } } }));

  const filteredEmps = EMPLOYEES.filter(e => {
    const matchDept = deptFilter === "All" || e.dept === deptFilter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
                        e.designation.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const empGoals   = selected?.goals || [];
  const empGDAll   = empGoals.map(g => getGD(selected.id, g.id));
  const avgProgress = empGoals.length ? Math.round(empGDAll.reduce((s,d) => s+d.progress, 0) / empGoals.length) : 0;
  const completedCount = empGDAll.filter(d => d.status === "Completed").length;

  const inp_style = { padding:"8px 10px", borderRadius:6, border:`1px solid ${border}`, background:inp, color:txt, fontSize:12, fontFamily:"Georgia,serif", outline:"none", width:"100%", boxSizing:"border-box" };

  const RatingStars = ({ value, onChange, color }) => (
    <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, opacity: n <= value ? 1 : 0.2, transition:"opacity 0.15s", filter: n <= value ? "none" : "grayscale(1)" }}>⭐</button>
      ))}
      {value > 0 && <span style={{ alignSelf:"center", fontSize:11, fontWeight:700, color: RATING_COLORS[value], marginLeft:4 }}>{RATING_LABELS[value]}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily:"Georgia,serif", background:bg, minHeight:"100vh", display:"flex", flexDirection:"column", color:txt }}>

      {/* ── Top Nav ── */}
      <div style={{ background:surf, borderBottom:`1px solid ${border}`, padding:"0 20px", display:"flex", alignItems:"center", height:50, gap:12, flexShrink:0 }}>
        <span style={{ fontWeight:800, fontSize:15 }}>🎯 CraftedThread PMS</span>
        <span style={{ background:dark?"#1F2235":"#EFF6FF", color:"#2563EB", padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:600 }}>Apr 2026 – Mar 2027</span>
        <div style={{ flex:1 }} />
        <span style={{ fontSize:11, color:muted }}>{EMPLOYEES.length} employees</span>
        <button onClick={() => setDark(!dark)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, padding:4, color:muted }}>
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ── Left Sidebar: Employee List ── */}
        <div style={{ width:260, background:sidebar, borderRight:`1px solid ${border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
          {/* Search & Filter */}
          <div style={{ padding:"12px 10px 8px" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search employee..." style={{ ...inp_style, marginBottom:8 }} />
            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
              {DEPTS.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)} style={{
                  padding:"3px 8px", borderRadius:20, fontSize:10, fontWeight:600, cursor:"pointer", border:"none",
                  background: deptFilter===d ? (DEPT_COLORS[d]||"#374151") : (dark?"#1F2235":"#E8E6DF"),
                  color: deptFilter===d ? "#fff" : muted,
                }}>
                  {d === "All" ? "All" : d.replace(" Team","").replace("Human Resource","HR")}
                </button>
              ))}
            </div>
          </div>

          {/* Employee list */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {filteredEmps.length === 0 && (
              <div style={{ padding:20, color:muted, fontSize:12, textAlign:"center" }}>No employees found</div>
            )}
            {filteredEmps.map(emp => {
              const empAvg = emp.goals.length ? Math.round(emp.goals.reduce((s,g) => s + getGD(emp.id, g.id).progress, 0) / emp.goals.length) : 0;
              const dc = DEPT_COLORS[emp.dept] || "#6B7280";
              return (
                <div key={emp.id} onClick={() => setSelected(emp)}
                  style={{ padding:"10px 12px", cursor:"pointer", borderBottom:`1px solid ${border}`, background:selected?.id===emp.id?hover:"transparent", borderLeft:`3px solid ${selected?.id===emp.id?dc:"transparent"}`, transition:"all 0.15s" }}
                  onMouseEnter={e => { if (selected?.id!==emp.id) e.currentTarget.style.background=hover; }}
                  onMouseLeave={e => { if (selected?.id!==emp.id) e.currentTarget.style.background="transparent"; }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", background:dc, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, flexShrink:0 }}>
                      {emp.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:txt, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{emp.name}</div>
                      <div style={{ fontSize:10, color:muted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{emp.designation}</div>
                    </div>
                    <div style={{ fontSize:11, fontWeight:700, color:dc }}>{empAvg}%</div>
                  </div>
                  {/* Mini progress bar */}
                  <div style={{ height:3, background:dark?"#2A2D3A":"#E8E6DF", borderRadius:99, marginTop:6, overflow:"hidden" }}>
                    <div style={{ width:`${empAvg}%`, height:"100%", background:dc, borderRadius:99, transition:"width 0.3s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: Employee Goals ── */}
        {selected && (
          <div style={{ flex:1, overflow:"auto" }}>
            {/* Employee Header */}
            <div style={{ background:surf, borderBottom:`1px solid ${border}`, padding:"20px 28px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:deptColor, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, flexShrink:0 }}>
                  {selected.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div style={{ flex:1 }}>
                  <h2 style={{ margin:0, fontSize:20, fontWeight:800 }}>{selected.name}</h2>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:5 }}>
                    <span style={{ background:dark?"#1F2235":"#F3F4F6", color:muted, padding:"2px 10px", borderRadius:20, fontSize:11 }}>{selected.designation}</span>
                    <span style={{ background:dark?"#1F2235":DEPT_COLORS[selected.dept]+"20", color:deptColor, padding:"2px 10px", borderRadius:20, fontSize:11, fontWeight:600 }}>{selected.dept}</span>
                    <span style={{ background:dark?"#1F2235":"#F3F4F6", color:muted, padding:"2px 10px", borderRadius:20, fontSize:11 }}>👤 Reports to: {selected.manager}</span>
                    <span style={{ background:dark?"#1F2235":"#F3F4F6", color:muted, padding:"2px 10px", borderRadius:20, fontSize:11 }}>🆔 {selected.id}</span>
                  </div>
                </div>
                {/* Quick stats */}
                <div style={{ display:"flex", gap:12, flexShrink:0 }}>
                  {[
                    { label:"Avg Progress", val:`${avgProgress}%`, color:deptColor },
                    { label:"Goals Done",   val:`${completedCount}/${empGoals.length}`, color:"#22C55E" },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign:"center", background:dark?"#1F2235":"#F7F7F5", padding:"8px 14px", borderRadius:8, border:`1px solid ${border}` }}>
                      <div style={{ fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
                      <div style={{ fontSize:10, color:muted, marginTop:2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall progress bar */}
              <div style={{ marginTop:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:muted, marginBottom:5 }}>
                  <span>Overall Goal Progress — Apr 2026 to Mar 2027</span>
                  <span style={{ fontWeight:700, color:deptColor }}>{avgProgress}%</span>
                </div>
                <div style={{ height:8, background:dark?"#2A2D3A":"#E8E6DF", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ width:`${avgProgress}%`, height:"100%", background:deptColor, borderRadius:99, transition:"width 0.4s" }} />
                </div>
              </div>

              {/* Review cycle banners */}
              <div style={{ display:"flex", gap:10, marginTop:14, flexWrap:"wrap" }}>
                <div onClick={() => setRatingMode(ratingMode==="mid"?null:"mid")} style={{ flex:1, background:ratingMode==="mid"?"#EFF6FF":(dark?"#1A1D27":"#F0FDF4"), border:`2px solid ${ratingMode==="mid"?"#3B82F6":"#22C55E"}`, borderRadius:8, padding:"10px 14px", cursor:"pointer", minWidth:200 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#16A34A", marginBottom:2 }}>📊 Mid-Year Review — October 2026</div>
                  <div style={{ fontSize:11, color:muted }}>Rate performance at mid-year checkpoint · Click to {ratingMode==="mid"?"close":"open"}</div>
                </div>
                <div onClick={() => setRatingMode(ratingMode==="final"?null:"final")} style={{ flex:1, background:ratingMode==="final"?"#EFF6FF":(dark?"#1A1D27":"#FAF5FF"), border:`2px solid ${ratingMode==="final"?"#3B82F6":"#A855F7"}`, borderRadius:8, padding:"10px 14px", cursor:"pointer", minWidth:200 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#7C3AED", marginBottom:2 }}>🏁 Year-End Review — March 2027</div>
                  <div style={{ fontSize:11, color:muted }}>Final ratings and annual performance summary · Click to {ratingMode==="final"?"close":"open"}</div>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div style={{ padding:"20px 28px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <h3 style={{ margin:0, fontSize:15, fontWeight:700 }}>Performance Goals — FY 2026–27</h3>
                <span style={{ fontSize:11, color:muted }}>Apr 2026 → Mar 2027 · {empGoals.length} goals</span>
              </div>

              {empGoals.map((goal, idx) => {
                const d = getGD(selected.id, goal.id);
                const sc = STATUS_CFG[d.status];
                return (
                  <div key={goal.id} style={{ background:surf, border:`1px solid ${border}`, borderRadius:10, marginBottom:12, overflow:"hidden" }}>

                    {/* Goal row */}
                    <div style={{ padding:"14px 18px" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:deptColor+"20", color:deptColor, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0, marginTop:1 }}>
                          {idx+1}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5, flexWrap:"wrap" }}>
                            <span style={{ fontSize:11, fontWeight:700, color:deptColor, textTransform:"uppercase", letterSpacing:"0.04em" }}>{goal.cat}</span>
                          </div>
                          <div style={{ fontSize:13, color:txt, lineHeight:1.6, marginBottom:10 }}>{goal.goal}</div>

                          {/* Progress */}
                          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                            <div style={{ flex:1, height:6, background:dark?"#2A2D3A":"#F0EFE9", borderRadius:99, overflow:"hidden" }}>
                              <div style={{ width:`${d.progress}%`, height:"100%", background:sc.bar, borderRadius:99, transition:"width 0.3s" }} />
                            </div>
                            <span style={{ fontSize:12, fontWeight:700, color:sc.color, minWidth:34 }}>{d.progress}%</span>
                          </div>

                          {/* Controls row */}
                          <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
                            {/* Status */}
                            <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
                              {Object.entries(STATUS_CFG).map(([s,cfg]) => (
                                <button key={s} onClick={() => setGD(selected.id, goal.id, { status:s })} style={{
                                  padding:"3px 10px", borderRadius:20, fontSize:10, fontWeight:600, cursor:"pointer",
                                  border:`1.5px solid ${d.status===s?cfg.color:"transparent"}`,
                                  background: d.status===s ? (cfg.color+"20") : (dark?"#1F2235":"#F3F4F6"),
                                  color: d.status===s ? cfg.color : muted,
                                  transition:"all 0.15s"
                                }}>{s}</button>
                              ))}
                            </div>
                            {/* Progress slider */}
                            <div style={{ display:"flex", alignItems:"center", gap:6, flex:1, minWidth:160 }}>
                              <span style={{ fontSize:10, color:muted, whiteSpace:"nowrap" }}>Progress:</span>
                              <input type="range" min="0" max="100" step="10" value={d.progress}
                                onChange={e => setGD(selected.id, goal.id, { progress:Number(e.target.value) })}
                                style={{ flex:1, accentColor:deptColor, cursor:"pointer" }} />
                            </div>
                          </div>
                        </div>

                        {/* Target */}
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontSize:10, color:muted, marginBottom:2 }}>{goal.metric}</div>
                          <div style={{ fontSize:14, fontWeight:800, fontFamily:"monospace", color:deptColor }}>{goal.target}</div>
                        </div>
                      </div>
                    </div>

                    {/* ── Mid-Year Rating Panel ── */}
                    {ratingMode === "mid" && (
                      <div style={{ borderTop:`1px solid ${border}`, padding:"14px 18px", background:dark?"#161820":"#F0FDF4" }}>
                        <div style={{ fontSize:11, fontWeight:700, color:"#16A34A", marginBottom:10, textTransform:"uppercase", fontFamily:"monospace" }}>📊 Mid-Year Rating — October 2026</div>
                        <div style={{ marginBottom:10 }}>
                          <div style={{ fontSize:11, color:muted, marginBottom:6 }}>Manager Rating</div>
                          <RatingStars value={d.midRating} onChange={v => setGD(selected.id, goal.id, { midRating:v })} color="#16A34A" />
                        </div>
                        <textarea value={d.midComment} onChange={e => setGD(selected.id, goal.id, { midComment:e.target.value })}
                          placeholder="Mid-year feedback, observations, or coaching notes…" rows={2}
                          style={{ ...inp_style, resize:"vertical" }} />
                      </div>
                    )}

                    {/* ── Year-End Rating Panel ── */}
                    {ratingMode === "final" && (
                      <div style={{ borderTop:`1px solid ${border}`, padding:"14px 18px", background:dark?"#161820":"#FAF5FF" }}>
                        <div style={{ fontSize:11, fontWeight:700, color:"#7C3AED", marginBottom:10, textTransform:"uppercase", fontFamily:"monospace" }}>🏁 Year-End Rating — March 2027</div>
                        <div style={{ marginBottom:10 }}>
                          <div style={{ fontSize:11, color:muted, marginBottom:6 }}>Final Manager Rating</div>
                          <RatingStars value={d.finalRating} onChange={v => setGD(selected.id, goal.id, { finalRating:v })} color="#7C3AED" />
                        </div>
                        <textarea value={d.finalComment} onChange={e => setGD(selected.id, goal.id, { finalComment:e.target.value })}
                          placeholder="Year-end feedback, annual performance summary…" rows={2}
                          style={{ ...inp_style, resize:"vertical" }} />
                      </div>
                    )}

                    {/* Show saved ratings summary if both exist */}
                    {ratingMode === null && (d.midRating > 0 || d.finalRating > 0) && (
                      <div style={{ borderTop:`1px solid ${border}`, padding:"10px 18px", background:dark?"#161820":"#F9F9F7", display:"flex", gap:20, flexWrap:"wrap" }}>
                        {d.midRating > 0 && (
                          <div style={{ fontSize:11 }}>
                            <span style={{ color:muted }}>Oct 2026: </span>
                            <span style={{ fontWeight:700, color:RATING_COLORS[d.midRating] }}>{"⭐".repeat(d.midRating)} {RATING_LABELS[d.midRating]}</span>
                          </div>
                        )}
                        {d.finalRating > 0 && (
                          <div style={{ fontSize:11 }}>
                            <span style={{ color:muted }}>Mar 2027: </span>
                            <span style={{ fontWeight:700, color:RATING_COLORS[d.finalRating] }}>{"⭐".repeat(d.finalRating)} {RATING_LABELS[d.finalRating]}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Rating scale legend */}
              <div style={{ marginTop:16, background:surf, border:`1px solid ${border}`, borderRadius:8, padding:"12px 16px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:muted, marginBottom:8, textTransform:"uppercase", fontFamily:"monospace" }}>⭐ Rating Scale</div>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  {Object.entries(RATING_LABELS).map(([n,l]) => (
                    <div key={n} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11 }}>
                      <span style={{ fontWeight:700, color:RATING_COLORS[n] }}>{"⭐".repeat(Number(n))}</span>
                      <span style={{ color:muted }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

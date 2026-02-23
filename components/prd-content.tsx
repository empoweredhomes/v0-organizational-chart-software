"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Eye,
  Search,
  UserPlus,
  Shield,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"

function SectionHeading({
  id,
  title,
  subtitle,
}: {
  id: string
  title: string
  subtitle?: string
}) {
  return (
    <div id={id} className="scroll-mt-8">
      <h2 className="text-2xl font-bold text-foreground tracking-tight font-sans text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-1 text-base font-sans text-pretty">{subtitle}</p>
      )}
      <Separator className="mt-4 mb-6" />
    </div>
  )
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-sm font-medium text-muted-foreground w-36 shrink-0 font-sans">
        {label}
      </span>
      <span className="text-sm text-foreground font-sans">{value}</span>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  priority,
}: {
  icon: React.ElementType
  title: string
  description: string
  priority: "P0" | "P1" | "P2"
}) {
  const priorityColors = {
    P0: "bg-primary/10 text-primary border-primary/20",
    P1: "bg-accent/10 text-accent border-accent/20",
    P2: "bg-muted text-muted-foreground border-border",
  }

  return (
    <Card className="border border-border bg-card hover:shadow-sm transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-primary" />
          </div>
          <Badge variant="outline" className={priorityColors[priority]}>
            {priority}
          </Badge>
        </div>
        <h4 className="font-semibold text-sm text-card-foreground mb-1.5 font-sans">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-sans">{description}</p>
      </CardContent>
    </Card>
  )
}

function OrgNode({
  name,
  title,
  reports,
  depth = 0,
}: {
  name: string
  title: string
  reports?: number
  depth?: number
}) {
  return (
    <div
      className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-secondary transition-colors"
      style={{ marginLeft: `${depth * 20}px` }}
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-primary font-sans">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate font-sans">{name}</p>
        <p className="text-xs text-muted-foreground truncate font-sans">{title}</p>
      </div>
      {reports !== undefined && (
        <Badge variant="secondary" className="text-xs shrink-0">
          {reports} reports
        </Badge>
      )}
    </div>
  )
}

function PhaseCard({
  phase,
  title,
  duration,
  items,
}: {
  phase: string
  title: string
  duration: string
  items: string[]
}) {
  return (
    <Card className="border border-border bg-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-primary text-primary-foreground">{phase}</Badge>
          <span className="text-xs text-muted-foreground font-sans">{duration}</span>
        </div>
        <h4 className="font-semibold text-card-foreground mb-3 font-sans">{title}</h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-sans">
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function RiskRow({
  risk,
  impact,
  mitigation,
}: {
  risk: string
  impact: "High" | "Medium" | "Low"
  mitigation: string
}) {
  const impactColors = {
    High: "text-destructive",
    Medium: "text-chart-3",
    Low: "text-accent",
  }

  return (
    <div className="flex flex-col gap-1 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2">
        <AlertTriangle className={`w-4 h-4 ${impactColors[impact]}`} />
        <span className="text-sm font-medium text-foreground font-sans">{risk}</span>
        <Badge variant="outline" className="text-xs ml-auto">
          {impact}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground pl-6 leading-relaxed font-sans">{mitigation}</p>
    </div>
  )
}

export function PRDContent() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-10 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className="bg-primary/10 text-primary border-0">PRD</Badge>
            <Badge variant="outline">Draft</Badge>
            <Badge variant="outline">Internal</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight font-sans text-balance sm:text-4xl">
            Mysa OrgChart
          </h1>
          <p className="text-lg text-muted-foreground mt-2 leading-relaxed font-sans text-pretty">
            An internal organizational chart and employee directory platform for Mysa, inspired by
            Pingboard. Designed to help our 75-person team stay connected, aligned, and informed as
            we scale.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <SectionHeading
            id="overview"
            title="Overview"
            subtitle="Project context and document metadata"
          />
          <Card className="border border-border bg-card">
            <CardContent className="p-5">
              <MetadataRow label="Product Name" value="Mysa OrgChart" />
              <MetadataRow label="Document Owner" value="People & Culture Team" />
              <MetadataRow label="Stakeholders" value="VP of People & Culture, COO, VP of Engineering, Department Leads" />
              <MetadataRow label="Target Company" value="Mysa (75 employees, 7-8 departments)" />
              <MetadataRow label="Benchmark" value="Pingboard" />
              <MetadataRow label="Created" value="February 23, 2026" />
              <MetadataRow label="Status" value="Draft v1.0" />
            </CardContent>
          </Card>
          <div className="mt-6">
            <h3 className="text-base font-semibold text-foreground mb-2 font-sans">Problem Statement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              As Mysa continues to grow, maintaining organizational clarity becomes increasingly
              challenging. Our current org chart is a static PDF that requires manual updates
              and offers no interactivity. Team members struggle to understand reporting structures,
              find the right person to contact, or onboard efficiently. We need a living, dynamic
              tool that reflects our organizational reality in real time and strengthens
              cross-departmental connections.
            </p>
          </div>
        </section>

        {/* Objectives */}
        <section className="mb-12">
          <SectionHeading
            id="objectives"
            title="Objectives & Goals"
            subtitle="What success looks like for this product"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Organizational Transparency",
                desc: "Every team member can instantly see the full company structure, reporting lines, and department breakdowns.",
              },
              {
                title: "Employee Directory",
                desc: "Searchable, filterable directory with rich profiles including interests and contact info, managed by the P&C admin team.",
              },
              {
                title: "Streamlined Onboarding",
                desc: "New hires can quickly learn who does what, find their team, and feel connected from day one.",
              },
              {
                title: "Always Up-to-Date",
                desc: "Changes to roles, departments, and reporting lines are managed by the P&C team and reflected in real time across the platform.",
              },
            ].map((obj, i) => (
              <Card key={i} className="border border-border bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary font-sans">{i + 1}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-card-foreground font-sans">{obj.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans">{obj.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Target Users */}
        <section className="mb-12">
          <SectionHeading
            id="users"
            title="Target Users"
            subtitle="Who will use this product and how"
          />
          <div className="space-y-4">
            {[
              {
                persona: "All Employees (75 people)",
                needs: "View the org chart (read-only), search for colleagues, find contact info and expertise across departments. Employees cannot edit their own profiles.",
              },
              {
                persona: "People & Culture Team (Admins)",
                needs: "Manage the org structure, add/remove employees, update reporting lines, create and edit all employee profiles, and generate reports.",
              },
              {
                persona: "Department Leads & Managers",
                needs: "View their team hierarchy, understand headcount and reporting structures, and support organizational planning.",
              },
              {
                persona: "New Hires",
                needs: "Explore the company structure during onboarding, learn names and faces, understand who does what and how teams connect.",
              },
              {
                persona: "Executive Leadership (CEO, COO, CRO)",
                needs: "High-level organizational overview, headcount analytics, and department breakdowns.",
              },
            ].map((user, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground font-sans">{user.persona}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed font-sans">
                    {user.needs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mysa Org Structure */}
        <section className="mb-12">
          <SectionHeading
            id="org-structure"
            title="Current Mysa Org Structure"
            subtitle="Departments and key leadership as of February 2026"
          />
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-sans">
            The following reflects Mysa{"'"}s current organizational structure with ~75 employees across 7-8
            departments. This will serve as the initial data set for the OrgChart product.
          </p>

          <Card className="border border-border bg-card mb-4">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 font-sans">
                Executive Leadership
              </p>
              <OrgNode name="Joshua Green" title="Chief Executive Officer" reports={7} />
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                dept: "Engineering",
                lead: "Tamer Shafik",
                title: "VP of Engineering",
                teams: [
                  "Product Management (Sharon Jones, Joey Kim)",
                  "App Team (Steve O'Keefe - Lead)",
                  "Firmware Team (Adam Lichter - Lead)",
                  "Cloud Team (Esteban Ricalde - Lead)",
                  "DevOps Team (Stephen Piercey)",
                  "Architecture Team (John Hawley - Lead)",
                  "QA & Software Support",
                  "Hardware Team (Shikan Yue - Head)",
                ],
              },
              {
                dept: "Commercial Team",
                lead: "Alexandre Louis",
                title: "Chief Revenue Officer",
                teams: [
                  "Mysa HQ Sales (Brookes Shen - Sr. Director)",
                  "Data & Commercial Planning (Megan Cooze)",
                  "ECommerce (Frank Nie - Lead)",
                  "Channel Support (Jennifer Collins)",
                  "Retail (Nico Boehme - Manager)",
                  "Utility Programs (Mark Smit - Director)",
                  "Creative Content (Cole Inkpen, Leah Sexton)",
                ],
              },
              {
                dept: "Customer Experience",
                lead: "Tanner Coombs",
                title: "Head of CX",
                teams: [
                  "CX Lead - Bilingual (Sarah Ozon)",
                  "CX Installation Specialists (3)",
                  "CX Associates (4)",
                  "Commercial Support Lead (Andrew Gichuk)",
                  "Customer Deployment (Uzo Okonkwo)",
                  "QA & Training CX (Mira Chay)",
                ],
              },
              {
                dept: "Operations",
                lead: "Zachary Green",
                title: "Chief Operating Officer",
                teams: [
                  "Fulfillment & Operations (Jennifer Squires)",
                  "Supply Chain (Alejandro Castanon)",
                  "Logistics (Stephen Collins)",
                  "IT & Security (Freddie Rose)",
                ],
              },
              {
                dept: "Finance",
                lead: "John Barrett",
                title: "VP of Finance & Corporate Secretary",
                teams: [
                  "Financial Controller (Mark Carberry)",
                  "Senior Financial Analyst (Emily Pyne)",
                  "Junior Accountant (Michael Hanlon)",
                ],
              },
              {
                dept: "People & Culture",
                lead: "Mari Miskell",
                title: "VP of People & Culture",
                teams: [
                  "P&C Lead (Melanie Kung - Mat. Leave)",
                  "P&C Specialist (Ameerah Mallam-Hassam)",
                  "P&C Intern (Zoya Zidi)",
                ],
              },
            ].map((dept, i) => (
              <Card key={i} className="border border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h4 className="font-semibold text-sm text-card-foreground font-sans">
                      {dept.dept}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-sans">
                    {dept.lead} - {dept.title}
                  </p>
                  <ul className="space-y-1.5">
                    {dept.teams.map((team, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-xs text-muted-foreground font-sans"
                      >
                        <ArrowRight className="w-3 h-3 shrink-0 mt-0.5 text-primary/50" />
                        <span>{team}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-12">
          <SectionHeading
            id="features"
            title="Core Features"
            subtitle="Feature overview with priority classifications"
          />
          <div className="flex items-center gap-4 mb-5">
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">P0</Badge>
              <span className="text-xs text-muted-foreground font-sans">Must-have</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">P1</Badge>
              <span className="text-xs text-muted-foreground font-sans">Should-have</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-xs">P2</Badge>
              <span className="text-xs text-muted-foreground font-sans">Nice-to-have</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureCard
              icon={Eye}
              title="Interactive Org Chart"
              description="Dynamic, zoomable org chart showing full company hierarchy with clickable nodes for each employee."
              priority="P0"
            />
            <FeatureCard
              icon={Search}
              title="Employee Directory & Search"
              description="Searchable, filterable directory with rich employee profiles and contact info."
              priority="P0"
            />
            <FeatureCard
              icon={Users}
              title="Rich Employee Profiles"
              description="Detailed profiles with photo, title, department, interests, contact info, and name pronunciation. Managed exclusively by P&C admins."
              priority="P0"
            />
            <FeatureCard
              icon={Shield}
              title="Admin Management Panel"
              description="Admin interface for P&C team to manage employees, update profiles, edit structure, and control permissions."
              priority="P0"
            />
            <FeatureCard
              icon={UserPlus}
              title="Onboarding Experience"
              description="Guided tour for new hires to explore teams, learn names, and understand company structure."
              priority="P1"
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile-Responsive Design"
              description="Fully functional on mobile devices for on-the-go access to org chart and directory."
              priority="P0"
            />
          </div>
        </section>

        {/* Feature Details */}
        <section className="mb-12">
          <SectionHeading
            id="feature-details"
            title="Feature Details"
            subtitle="In-depth requirements for each core feature"
          />

          {/* Interactive Org Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 font-sans flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Interactive Org Chart
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Hierarchical Tree View",
                  desc: "Display all 75 employees in a navigable tree starting from CEO Joshua Green, through VPs and department leads, down to individual contributors.",
                },
                {
                  title: "Zoom & Pan",
                  desc: "Users can zoom in/out and pan across the chart. Support pinch-to-zoom on mobile and scroll-to-zoom on desktop.",
                },
                {
                  title: "Expandable Nodes",
                  desc: "Each department can be collapsed or expanded. Clicking a node reveals the employee profile card.",
                },
                {
                  title: "Department Color-Coding",
                  desc: "Each of the 7-8 departments (Engineering, Commercial, CX, Operations, Finance, People & Culture, etc.) should have a distinct color for visual clarity.",
                },
                {
                  title: "Headcount Badges",
                  desc: "Show team size badges on manager nodes (e.g., 'App Team - 5 reports') so viewers can quickly gauge team sizes.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-secondary/40 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground font-sans">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Directory */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 font-sans flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Employee Directory & Profiles
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Global Search",
                  desc: "Real-time search across names, titles, departments, and interests. Results update as the user types.",
                },
                {
                  title: "Filter & Sort",
                  desc: "Filter by department, location (HQ, remote), employment type (full-time, co-op, intern), and custom tags.",
                },
                {
                  title: "Employee Profile Card",
                  desc: "Each profile includes: photo, full name, name pronunciation, job title, department, manager, direct reports, contact info, interests, start date, and a custom bio. All fields are managed by P&C admins.",
                },
                {
                  title: "Tile & List Views",
                  desc: "Directory supports both a grid tile view (photo-centric) and a compact list view. User preference is persisted.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-secondary/40 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground font-sans">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Panel */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-3 font-sans flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Admin Management Panel
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: "Employee CRUD",
                  desc: "Add, edit, deactivate, and remove employees. Support bulk import via CSV for initial data load of all 75 employees.",
                },
                {
                  title: "Org Structure Management",
                  desc: "Drag-and-drop interface to reassign reporting lines, move employees between departments, and create new teams.",
                },
                {
                  title: "Role-Based Access Control",
                  desc: "Two primary roles: Admin (P&C team, full control over all profiles and org structure) and Employee (view-only access to the entire org chart and directory).",
                },
                {
                  title: "Audit Log",
                  desc: "Track all changes to the org structure with timestamps and who made each change.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-md bg-secondary/40 border border-border">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground font-sans">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phased Rollout */}
        <section className="mb-12">
          <SectionHeading
            id="phases"
            title="Phased Rollout"
            subtitle="Incremental delivery plan from MVP to full product"
          />
          <div className="grid gap-4">
            <PhaseCard
              phase="Phase 1"
              title="Foundation - MVP"
              duration="Weeks 1-6"
              items={[
                "Static org chart rendering with all 75 Mysa employees loaded by P&C admins",
                "Basic employee directory with search and filter by department",
                "Employee profile pages with core fields (name, title, department, photo, contact)",
                "Admin panel for P&C team to manage employees, profiles, and org structure",
                "Role-based access: Admin (P&C) full control, all other employees view-only",
                "Mobile-responsive layout",
              ]}
            />
            <PhaseCard
              phase="Phase 2"
              title="Interactivity & Enrichment"
              duration="Weeks 7-12"
              items={[
                "Interactive zoom/pan on the org chart with collapsible departments",
                "Rich employee profiles with interests, bio, name pronunciation, and contact info",
                "Employee search across all profile fields",
                "Tile and list view toggle in the directory",
                "Department color-coding and headcount badges",
                "Admin bulk import / CSV upload for initial data load",
              ]}
            />
            <PhaseCard
              phase="Phase 3"
              title="Onboarding & Administration"
              duration="Weeks 13-18"
              items={[
                "New hire onboarding experience and guided tour",
                "Audit log for all org structure and profile changes",
                "Drag-and-drop org structure management for admins",
                "Enhanced admin reporting and export capabilities",
                "Performance optimizations for chart rendering at scale",
              ]}
            />
          </div>
        </section>

        {/* Risks & Mitigations */}
        <section className="mb-12">
          <SectionHeading
            id="risks"
            title="Risks & Mitigations"
            subtitle="Potential challenges and how we plan to address them"
          />
          <Card className="border border-border bg-card">
            <CardContent className="p-5">
              <RiskRow
                risk="Low adoption if employees don't see immediate value"
                impact="High"
                mitigation="Integrate into onboarding from day one. Ensure P&C team champions the tool. Make profiles engaging with personal details (interests, bio) beyond just titles."
              />
              <RiskRow
                risk="Data accuracy degrades over time without dedicated admin process"
                impact="High"
                mitigation="Assign P&C team as dedicated admins with a monthly audit process. Build admin tooling that makes profile updates quick and easy."
              />
              <RiskRow
                risk="Scope creep as stakeholders request features beyond MVP"
                impact="Medium"
                mitigation="Strict adherence to phased rollout plan. New requests are logged and prioritized for future phases. PRD acts as the single source of truth."
              />
              <RiskRow
                risk="Admin bottleneck since only P&C can update profiles"
                impact="Medium"
                mitigation="Build efficient bulk-edit and CSV import tools for the P&C team. Establish a clear process for employees to request profile updates."
              />
              <RiskRow
                risk="Performance issues with large org chart rendering"
                impact="Low"
                mitigation="At 75 employees, performance is manageable. Build with virtualization and lazy loading from the start to support future growth to 200+ employees."
              />
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="border-t border-border pt-6 pb-10">
          <p className="text-xs text-muted-foreground text-center font-sans">
            Mysa OrgChart - Product Requirement Document - Draft v1.0 - February 2026
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1 font-sans">
            Prepared by People & Culture Team - Confidential
          </p>
        </div>
      </div>
    </main>
  )
}

# Phase 9: Project Management Infrastructure

## Executive Summary

**Phase Group:** 1 - Foundation & Strategy  
**Phase Number:** 9  
**Status:** Not Started  
**Start Date:** TBD  
**End Date:** TBD  
**Priority:** Critical (Required before development phases begin)  
**Dependencies:** Phases 1-8 must be substantially complete  

---

## 1. Objective

Set up the comprehensive workflow and project management infrastructure required to successfully execute the 100-phase development journey for the Engineering Study Guide App.

This phase establishes the operational backbone that will enable the team to move efficiently through all subsequent phases while maintaining quality, tracking progress, and ensuring accountability. Without proper PM infrastructure, even the best technical plans can fail due to miscommunication, scope creep, or lack of visibility.

### 1.1 Primary Goals

1. **Tool Configuration:** Set up and configure Linear (primary) with Jira as backup option, establishing custom workflows tailored to our 100-phase roadmap structure.

2. **Sprint Framework:** Implement a sustainable 2-week sprint cycle with clear ceremonies, roles, and responsibilities that balance agility with the long-term nature of the project.

3. **Definition of Done (DoD):** Create comprehensive quality gates that include not just functional completion but also performance benchmarks, accessibility standards, documentation requirements, and testing coverage.

4. **Communication Protocols:** Establish clear channels and rhythms for team communication, decision-making, and escalation paths.

5. **Metrics & Reporting:** Define key performance indicators (KPIs) for both development velocity and product quality, with automated dashboards for real-time visibility.

### 1.2 Why This Matters

- **Scale Management:** 100 phases require exceptional organization to avoid chaos
- **Team Alignment:** Ensures everyone understands priorities, processes, and expectations
- **Quality Assurance:** Built-in quality gates prevent technical debt accumulation
- **Stakeholder Visibility:** Clear reporting keeps investors and advisors informed
- **Sustainable Pace:** Proper workflows prevent burnout over the long development cycle
- **Risk Mitigation:** Early identification of blockers and dependencies

---

## 2. Action Items

### 2.1 Configure Linear with Custom Workflows

#### 2.1.1 Workspace Setup

**Platform Selection Rationale:**
- **Primary Choice: Linear** 
  - Superior speed and UX for engineering teams
  - Native GitHub integration for automatic issue linking
  - Excellent keyboard shortcuts reducing click fatigue
  - Built-in sprint management and roadmapping
  - Clean, minimal interface reducing cognitive load
  
- **Backup Option: Jira**
  - More customizable for complex enterprise needs
  - Better for non-technical stakeholder visibility
  - Extensive plugin ecosystem
  - Consider if team scales beyond 50 members

**Linear Workspace Configuration:**

1. **Workspace Settings**
   - Workspace Name: "Engineering Study Guide App"
   - Workspace URL: eng-study-guide.linear.app
   - Timezone: Set to team's primary timezone (recommend UTC-8 for US West Coast)
   - Working Hours: Configure for async-first global team compatibility

2. **Team Structure**
   Create the following teams within Linear:
   
   | Team Name | Purpose | Members |
   |-----------|---------|---------|
   | Core Engineering | Main app development (Phases 11-50) | Dev Team |
   | Content & Curriculum | Course content creation (Phases 31-40) | Content Team |
   | Design & UX | UI/UX design and research (Ongoing) | Design Team |
   | QA & Testing | Quality assurance (Ongoing) | QA Team |
   | DevOps & Infrastructure | CI/CD, monitoring (Phases 11-30, ongoing) | DevOps Team |
   | Leadership | Strategic oversight | Founders/PM |

3. **Issue Types Configuration**
   
   Configure custom issue types:
   
   | Type | Icon | Color | Use Case |
   |------|------|-------|----------|
   | Feature | ✨ | Blue | New user-facing functionality |
   | Bug | 🐛 | Red | Defects requiring fixes |
   | Improvement | 🔧 | Yellow | Enhancements to existing features |
   | Research | 🔬 | Purple | User research, technical spikes |
   | Documentation | 📄 | Gray | Docs, guides, compliance |
   | Phase Milestone | 🚩 | Orange | Major phase completion markers |
   | Technical Debt | ⚠️ | Orange | Refactoring, optimization work |

4. **Custom Workflow States**
   
   Default Linear workflows are good but need customization for our 100-phase approach:
   
   **Development Workflow:**
   ```
   Backlog → Prioritized → In Progress → Code Review → QA Testing → Staging → Production → Done
   ```
   
   **State Definitions:**
   
   - **Backlog:** All future work items, not yet scheduled
   - **Prioritized:** Approved for upcoming sprints, has clear requirements
   - **In Progress:** Actively being worked on, developer assigned
   - **Code Review:** PR submitted, awaiting peer review
   - **QA Testing:** Passed code review, in testing environment
   - **Staging:** Deployed to staging, ready for final validation
   - **Production:** Live in production, monitored
   - **Done:** Verified in production, documentation updated

   **Content Creation Workflow:**
   ```
   Content Backlog → Research → Drafting → SME Review → Instructional Design Review → LMS Upload → Published
   ```

   **Design Workflow:**
   ```
   Design Backlog → Discovery → Wireframing → Visual Design → Stakeholder Review → Handoff → Implemented
   ```

5. **Priority Levels**
   
   | Priority | Label | SLA | Description |
   |----------|-------|-----|-------------|
   | Urgent | 🔴 Urgent | 24 hours | Production down, critical security issue |
   | High | 🟠 High | 1 week | Blocker for current sprint goals |
   | Medium | 🟡 Medium | 2 weeks | Standard priority for most features |
   | Low | 🟢 Low | Next quarter | Nice-to-have, no immediate deadline |
   | Icebox | ⚪ Icebox | indefinite | Future consideration only |

6. **Labels & Tags System**
   
   Create comprehensive labeling system:
   
   **Category Labels:**
   - `frontend` - React Native UI components
   - `backend` - API, database, cloud functions
   - `mobile` - iOS/Android specific issues
   - `web` - Web-based admin/dashboard
   - `content` - Curriculum and course material
   - `design` - UI/UX assets and specifications
   - `devops` - CI/CD, infrastructure, monitoring
   - `security` - Authentication, authorization, data protection
   - `performance` - Speed, optimization, bundle size
   - `accessibility` - WCAG compliance, screen readers
   
   **Phase Labels:**
   - `phase-1` through `phase-100` for tracking which phase each issue belongs to
   - `phase-group-1` through `phase-group-10` for higher-level grouping
   
   **Special Labels:**
   - `mvp-critical` - Must have for MVP launch
   - `technical-debt` - Refactoring needed
   - `blocked` - Waiting on external dependency
   - `needs-research` - Requires investigation before implementation
   - `good-first-issue` - Suitable for new team members
   - `help-wanted` - Open for contribution

7. **GitHub Integration Setup**
   
   Configure bi-directional sync:
   
   - Connect Linear workspace to GitHub organization
   - Enable automatic issue creation from PR descriptions
   - Configure branch naming convention: `ENG-{issue-number}-{short-description}`
     - Example: `ENG-142-flashcard-swipe-animation`
   - Enable automatic status updates:
     - PR opened → moves issue to "Code Review"
     - PR merged → moves issue to "QA Testing"
     - Deployment → moves issue to "Production"
   - Enable commit message parsing for time tracking

8. **Custom Views and Filters**
   
   Create saved views for different stakeholders:
   
   **Engineering Team Views:**
   - "Current Sprint Board" - Kanban view of active sprint
   - "My Issues" - Assigned to me across all sprints
   - "Code Review Queue" - All issues in review state
   - "Bug Triage" - All bugs sorted by priority
   
   **Product Management Views:**
   - "Phase Roadmap" - Timeline view grouped by phase
   - "Feature Progress" - All feature issues by status
   - "Blocked Items" - Anything with blocked label
   
   **Leadership Views:**
   - "Executive Dashboard" - High-level progress metrics
   - "Phase Completion Status" - % complete per phase
   - "Team Velocity Trends" - Burn-up charts by team
   
   **QA Team Views:**
   - "Ready for Testing" - Issues in QA Testing state
   - "Known Bugs" - All open bug issues
   - "Regression Test Suite" - Issues tagged for regression

9. **Automation Rules**
   
   Configure Linear automation:
   
   - **Auto-assign:** When issue created with specific label, auto-assign to team lead
   - **Auto-transition:** When PR merged, move from "Code Review" to "QA Testing"
   - **Auto-comment:** Add templated comment when moving to "Blocked" requesting unblock info
   - **Sprint reminders:** Notify assignee 2 days before sprint end if issue still "In Progress"
   - **Stale detection:** Mark issues as stale after 14 days without activity
   - **Duplicate detection:** Suggest potential duplicates based on title similarity

10. **Notification Settings**
    
    Configure to reduce noise while maintaining awareness:
    
    **Per User Recommendations:**
    - Desktop notifications: Only for direct mentions and urgent items
    - Email digests: Daily summary at 9 AM local time
    - Slack integration: Real-time updates to dedicated #linear-updates channel
    - Mobile push: Critical only (🔴 Urgent priority)
    
    **Channel-Specific Settings:**
    - `#linear-new-issues` - All newly created issues
    - `#linear-sprint-changes` - Issues added/removed from sprints
    - `#linear-releases` - Issues moved to Production
    - `#linear-blocked` - Anything marked as blocked

**Deliverable:** Fully configured Linear workspace with documented workflow guidelines

---

### 2.2 Set Up Sprint Cycles (2-Week Sprints)

#### 2.2.1 Sprint Framework Design

**Sprint Duration:** 2 weeks (10 business days)

**Rationale for 2-week cycles:**
- Long enough to complete meaningful features
- Short enough to maintain focus and adapt quickly
- Industry standard, easier for hiring experienced devs
- Balances meeting overhead with planning frequency
- Aligns well with typical university academic rhythms for testing

**Sprint Calendar Structure:**

```
Week 1:
- Day 1 (Monday): Sprint Planning (AM), Development begins (PM)
- Day 2-4: Core development work
- Day 5 (Friday): Mid-sprint check-in (quick standup extension)

Week 2:
- Day 6-8: Continued development, code reviews
- Day 9 (Thursday): QA testing, bug fixes
- Day 10 (Friday): Sprint Review (PM), Retrospective, Planning for next sprint
```

#### 2.2.2 Sprint Ceremonies

**1. Sprint Planning**
- **Duration:** 2-3 hours
- **Attendees:** Entire team (Engineering, Design, Product, QA)
- **Frequency:** First Monday of sprint (bi-weekly)
- **Location:** In-person or video call (recorded for async participants)

**Agenda:**
1. **Review Previous Sprint Results** (15 min)
   - What shipped to production
   - Velocity achieved vs. planned
   - Carry-over items explanation

2. **Product Owner Presents Priorities** (30 min)
   - Top priorities for upcoming sprint
   - Context on why these matter
   - Demo of any new designs or specs

3. **Capacity Planning** (15 min)
   - Team member availability (PTO, holidays, other commitments)
   - Calculate available story points/hours
   - Adjust for meetings, interviews, etc.

4. **Story Estimation & Selection** (60-90 min)
   - Review candidate stories from prioritized backlog
   - Clarify requirements and acceptance criteria
   - Estimate effort using Fibonacci scale (1, 2, 3, 5, 8, 13)
   - Commit to sprint backlog based on capacity

5. **Task Breakdown** (30 min)
   - Break stories into actionable tasks
   - Initial self-assignment based on skills/interest
   - Identify dependencies between tasks

**Preparation Required:**
- Product Owner: Prioritized backlog ready 24 hours before
- Team: Review backlog items beforehand
- Design: Mockups and specs completed for planned features

**2. Daily Standup**
- **Duration:** 15 minutes max
- **Attendees:** Development team (Design and PO optional)
- **Frequency:** Every weekday, same time (recommend 10 AM local)
- **Format:** Async-first via Slack, synchronous for complex discussions

**Three Questions (async template):**
```
1. What did I accomplish yesterday?
2. What will I work on today?
3. Any blockers or need help?
```

**Synchronous Addition:**
- Quick discussion of identified blockers
- Pair programming coordination
- Quick decisions on emerging issues

**3. Mid-Sprint Check-in**
- **Duration:** 30 minutes
- **Attendees:** Core team leads
- **Frequency:** Friday of Week 1
- **Purpose:** 
  - Verify sprint on track
  - Address emerging blockers
  - Adjust task assignments if needed
  - No scope changes unless critical

**4. Sprint Review (Demo Day)**
- **Duration:** 1 hour
- **Attendees:** Entire team + stakeholders/investors (optional)
- **Frequency:** Last Friday of sprint
- **Location:** Video call with screen sharing (recorded)

**Agenda:**
1. **Working Software Demos** (40 min)
   - Each developer demos their completed features
   - Show in production or staging environment
   - Focus on user value, not technical details
   
2. **Metrics Review** (10 min)
   - Velocity achieved
   - Bugs introduced vs. fixed
   - Performance metrics if applicable

3. **Stakeholder Feedback** (10 min)
   - Questions from observers
   - Feedback on direction
   - New insights for backlog

**Ground Rules:**
- No PowerPoint - only live demos
- Celebrate wins, no blame for incomplete work
- Feedback goes to backlog, not into current sprint

**5. Sprint Retrospective**
- **Duration:** 1 hour
- **Attendees:** Core team only (no external stakeholders)
- **Frequency:** After Sprint Review, before next Planning
- **Facilitator:** Rotates each sprint

**Format Options (rotate monthly):**

*Option A: Start/Stop/Continue*
- What should we START doing?
- What should we STOP doing?
- What should we CONTINUE doing?

*Option B: Mad/Sad/Glad*
- What made us MAD (frustrated)?
- What made us SAD (disappointed)?
- What made us GLAD (happy)?

*Option C: 4 L's*
- Liked
- Learned
- Lacked
- Longed For

**Output:**
- 3-5 actionable improvement items
- Assign owner to each improvement
- Add top priority improvements to next sprint backlog

**6. Backlog Refinement (Grooming)**
- **Duration:** 1 hour
- **Attendees:** Product Owner, Tech Lead, interested team members
- **Frequency:** Mid-week of Week 2 (Wednesday recommended)
- **Purpose:** Prepare backlog items for future sprints

**Activities:**
- Review upcoming stories for clarity
- Split large stories into smaller ones
- Add acceptance criteria
- Preliminary estimation
- Flag items needing design or research

#### 2.2.3 Sprint Artifacts

**1. Sprint Goal**
- Single sentence describing the primary objective
- Created during Sprint Planning
- Should be achievable even if some stories slip
- Example: "Enable users to complete their first flashcard deck with spaced repetition"

**2. Sprint Backlog**
- Committed stories for the sprint
- Visible in Linear sprint view
- Includes tasks broken down from stories
- Updated daily as work progresses

**3. Increment**
- Sum of all completed stories at sprint end
- Must meet Definition of Done
- Potentially shippable to production
- Demonstrated in Sprint Review

#### 2.2.4 Velocity Tracking

**Measurement Approach:**
- Track story points completed per sprint
- Use rolling average (last 3 sprints) for forecasting
- Separate velocity by team (Engineering, Content, Design)

**Velocity Chart Components:**
- Committed points vs. completed points
- Carry-over visualization
- Trend line over time

**Forecasting:**
- Use velocity to estimate phase completion dates
- Re-forecast every 3 sprints based on actuals
- Communicate ranges, not exact dates

**Deliverable:** Documented sprint framework with calendar templates and ceremony guides

---

### 2.3 Define "Definition of Done" (DoD) Including Performance Benchmarks

#### 2.3.1 DoD Framework

The Definition of Done is a critical quality gate that ensures consistency and prevents technical debt accumulation. Unlike acceptance criteria (which are story-specific), DoD applies to ALL work items.

**Multi-Level DoD Structure:**

**Level 1: Story-Level DoD** (applies to individual issues)
**Level 2: Sprint-Level DoD** (applies to sprint increment)
**Level 3: Phase-Level DoD** (applies to phase completion)
**Level 4: Release-Level DoD** (applies to production releases)

#### 2.3.2 Level 1: Story-Level Definition of Done

Every individual story/feature must meet these criteria before moving to "Done":

**✅ Code Quality**
- [ ] Code follows established style guide (ESLint/Prettier passing)
- [ ] No TypeScript errors or warnings
- [ ] Code reviewed and approved by at least 1 peer (2 for critical features)
- [ ] Complex logic includes inline comments explaining "why" not "what"
- [ ] Functions follow single responsibility principle
- [ ] No hardcoded values (use constants/config files)
- [ ] Proper error handling implemented
- [ ] Console.logs removed (use proper logging framework)

**✅ Testing**
- [ ] Unit tests written for new functions/components
- [ ] Integration tests for cross-component interactions
- [ ] Test coverage minimum 80% for new code
- [ ] All existing tests still pass (no regressions)
- [ ] Edge cases tested (empty states, error states, network failures)
- [ ] Manual testing completed on both iOS and Android
- [ ] Tested on minimum supported OS versions (iOS 14+, Android 10+)
- [ ] Tested on multiple device sizes (phone, tablet, foldables)

**✅ Performance Benchmarks**
- [ ] Component render time < 16ms (60 FPS maintained)
- [ ] No memory leaks detected (verified via profiling)
- [ ] Image assets optimized (WebP format, appropriate resolution)
- [ ] Bundle size impact measured (<100KB increase per feature target)
- [ ] List virtualization implemented for lists >20 items
- [ ] Expensive computations memoized or moved off main thread
- [ ] Network requests minimized and cached appropriately
- [ ] Cold start time impact <200ms

**✅ Accessibility**
- [ ] All interactive elements accessible via VoiceOver/TalkBack
- [ ] Proper labels and hints for screen readers
- [ ] Color contrast ratio meets WCAG AA (4.5:1 for text)
- [ ] Touch targets minimum 44x44 points
- [ ] Support for dynamic text sizing
- [ ] Reduced motion respected when user preference set
- [ ] Keyboard navigation works (for tablet/external keyboard)
- [ ] Focus management implemented for modals and screens

**✅ User Experience**
- [ ] Loading states implemented (skeleton screens, spinners)
- [ ] Error states with helpful messages
- [ ] Empty states with calls-to-action
- [ ] Success feedback provided (toasts, animations)
- [ ] Haptic feedback where appropriate
- [ ] Animations smooth and purposeful (not gratuitous)
- [ ] Offline behavior defined and implemented
- [ ] Deep links work correctly (if applicable)

**✅ Documentation**
- [ ] README updated if architecture changed
- [ ] Component Storybook entries created/updated
- [ ] API documentation updated (if backend changed)
- [ ] User-facing help text added (if new feature)
- [ ] Analytics events documented (name, properties, trigger)
- [ ] Known limitations documented

**✅ Security**
- [ ] No sensitive data in logs
- [ ] Proper authentication checks in place
- [ ] Input validation and sanitization implemented
- [ ] No new security vulnerabilities introduced (Snyk/Depsy check)
- [ ] Permissions requested follow principle of minimum necessary

**✅ Monitoring**
- [ ] Error tracking implemented (Sentry integration)
- [ ] Key user actions tracked in analytics
- [ ] Performance metrics instrumented
- [ ] Crash-free session rate baseline established

#### 2.3.3 Level 2: Sprint-Level Definition of Done

The sprint increment must meet these criteria:

- [ ] All committed stories meet Level 1 DoD
- [ ] Integrated build deployed to staging environment
- [ ] Regression test suite passes (automated + manual)
- [ ] No P0 or P1 bugs open
- [ ] Product Owner has accepted all stories
- [ ] Sprint demo completed with stakeholders
- [ ] Retrospective completed with action items captured
- [ ] Sprint report published (velocity, accomplishments, learnings)

#### 2.3.4 Level 3: Phase-Level Definition of Done

Each of the 100 phases must meet these criteria:

- [ ] All phase objectives achieved (per AGENT.md)
- [ ] All phase deliverables completed and reviewed
- [ ] Documentation updated in /docs/phase-X folder
- [ ] Phase milestone issue closed in Linear
- [ ] Lessons learned documented
- [ ] Next phase dependencies identified and communicated
- [ ] Stakeholders notified of phase completion
- [ ] Phase retrospective completed (for major phases)

#### 2.3.5 Level 4: Release-Level Definition of Done

Before any production release:

- [ ] All sprint DoDs met for included sprints
- [ ] End-to-end testing completed
- [ ] Performance benchmarks verified:
  - [ ] App load time < 3 seconds on mid-tier devices
  - [ ] Time to interactive < 5 seconds
  - [ ] Crash-free session rate > 99.5%
  - [ ] ANR (App Not Responding) rate < 0.1%
- [ ] Security audit completed (quarterly for major releases)
- [ ] Privacy compliance verified (GDPR, CCPA)
- [ ] App Store / Play Store metadata prepared
- [ ] Release notes written (user-facing and internal)
- [ ] Rollback plan documented and tested
- [ ] Support team briefed on new features
- [ ] Monitoring dashboards updated
- [ ] On-call rotation scheduled for launch week

#### 2.3.6 Performance Benchmark Details

**Specific Metrics and Targets:**

| Metric | Target | Measurement Tool | Frequency |
|--------|--------|------------------|-----------|
| Cold Start Time | < 2.5s | Firebase Performance | Per release |
| Warm Start Time | < 1.0s | Firebase Performance | Per release |
| Time to Interactive | < 3.0s | Custom instrumentation | Per release |
| Screen Transition FPS | > 55 FPS | Reanimated profiler | Per feature |
| Memory Usage (baseline) | < 150 MB | Xcode Instruments / Android Profiler | Per release |
| Memory Usage (peak) | < 300 MB | Xcode Instruments / Android Profiler | Per release |
| APK/IPA Size | < 50 MB (APK), < 150 MB (IPA) | Build artifacts | Per release |
| Network Requests (dashboard) | < 5 initial requests | Charles Proxy | Per feature |
| API Response Time (p95) | < 500 ms | Backend monitoring | Continuous |
| Crash-Free Sessions | > 99.5% | Sentry | Daily |
| ANR Rate | < 0.1% | Google Play Console | Weekly |
| Battery Impact | < 5% per hour active use | Battery stats | Per release |

**Performance Budget:**
- JavaScript bundle: < 1.5 MB (gzipped)
- Initial chunk: < 500 KB
- Largest image asset: < 200 KB
- Total images per screen: < 1 MB
- Third-party libraries: Justify each addition, prefer lightweight alternatives

**Performance Testing Protocol:**
1. Test on low-end devices (iPhone SE 2020, Samsung Galaxy A series)
2. Test on slow networks (3G simulation, 10% packet loss)
3. Test with background apps running
4. Test with low battery mode enabled
5. Test with reduced motion settings
6. Run automated performance tests in CI

**Deliverable:** Comprehensive DoD document integrated into Linear workflow and CI/CD pipelines

---

### 2.4 Communication Protocols

#### 2.4.1 Communication Channels

**Slack Channel Structure:**

| Channel | Purpose | Members | Posting Guidelines |
|---------|---------|---------|-------------------|
| `#general` | Company-wide announcements | Everyone | Important updates only |
| `#engineering` | Technical discussions | Eng team | Questions, discoveries, debugging help |
| `#engineering-daily` | Daily standup posts | Eng team | Async standup responses |
| `#code-review` | PR notifications and discussion | Eng team | Auto-posted from GitHub |
| `#qa-bugs` | Bug reports and QA coordination | Eng + QA | Screenshots, repro steps |
| `#design` | Design discussions and feedback | All | WIP designs, critique requests |
| `#product` | Product strategy and roadmap | All | Feature discussions, user feedback |
| `#linear-updates` | Automated Linear notifications | All | Read-only for most |
| `#releases` | Production deployment announcements | All | Release notes, celebration |
| `#random` | Non-work chat | Everyone | Memes, hobbies, bonding |
| `#help-it` | IT and tool support | All | Access issues, setup help |
| `#leadership` | Strategic discussions | Founders + Leads | Confidential strategy |

**Escalation Matrix:**

| Issue Type | First Contact | Escalation Path | SLA |
|------------|---------------|-----------------|-----|
| Production Outage | On-call engineer | CTO → CEO | Immediate |
| Security Vulnerability | Security lead | CTO → Legal | 1 hour |
| Critical Bug (P0) | QA Lead | Eng Lead → CTO | 4 hours |
| Blocked Feature | Tech Lead | Product → CTO | 24 hours |
| Team Conflict | Direct manager | HR → CEO | 48 hours |
| Scope Creep | Product Owner | CPO → CEO | Next sprint |

#### 2.4.2 Meeting Hygiene

**Meeting Principles:**
- Default to async communication
- Every meeting必须有 agenda sent 24 hours prior
- Meetings > 30 minutes require clear decision-maker identified
- Record all meetings for async participation
- No-meeting Wednesdays for deep work

**Meeting Templates:**

*Sprint Planning Template:*
```
## Agenda
1. Previous sprint review (15 min)
2. Capacity planning (15 min)
3. Story presentation and estimation (60 min)
4. Task breakdown (30 min)

## Pre-read
- [Link to prioritized backlog]
- [Link to designs for planned features]

## Desired Outcomes
- Committed sprint backlog
- Assigned tasks
- Clear sprint goal
```

*Retrospective Template:*
```
## Format: Start/Stop/Continue

## Ground Rules
- Blameless discussion
- Focus on process, not people
- All voices heard

## Output
- 3-5 action items with owners
```

#### 2.4.3 Decision-Making Framework

**DACI Model for Decisions:**

- **Driver (D):** Person who drives the decision process (1 person)
- **Approver (A):** Person who makes final decision (1 person)
- **Contributor (C):** People who provide input (multiple)
- **Informed (I):** People who need to know the outcome (multiple)

**Decision Log:**
- Maintain public Notion page with major decisions
- Include: Decision, Date, Driver, Approver, Rationale, Alternatives Considered
- Review quarterly for potential reversal

**Decision Types:**
- **Type 1 (Irreversible):** Requires CEO approval, extensive analysis
- **Type 2 (Reversible):** Can be decided by team lead, quick to reverse if wrong

**Deliverable:** Communication playbook distributed to all team members

---

### 2.5 Metrics & Reporting Dashboards

#### 2.5.1 Key Performance Indicators (KPIs)

**Development Velocity Metrics:**

1. **Sprint Velocity**
   - Story points completed per sprint
   - Tracked per team and overall
   - Rolling 3-sprint average for forecasting

2. **Cycle Time**
   - Time from "In Progress" to "Done"
   - Target: < 5 days for most stories
   - Track by issue type and complexity

3. **Throughput**
   - Number of issues completed per week
   - Separate by feature/bug/improvement

4. **Work In Progress (WIP)**
   - Active issues per developer
   - Target: 1-2 concurrent tasks
   - Alert if > 3 for extended period

5. **Carry-over Rate**
   - Percentage of sprint backlog not completed
   - Target: < 10%
   - Investigate root causes if > 20%

**Quality Metrics:**

1. **Defect Density**
   - Bugs per 1000 lines of code
   - Track per release and cumulative

2. **Escape Rate**
   - Bugs found in production vs. QA
   - Target: < 5% escape rate

3. **Code Coverage**
   - Unit test coverage percentage
   - Target: > 80% overall, > 90% for critical paths

4. **Technical Debt Ratio**
   - Percentage of sprint capacity spent on debt
   - Target: 15-20% allocated to debt reduction

5. **Review Time**
   - Average time PRs spend in review
   - Target: < 24 hours for first review

**Reliability Metrics:**

1. **Crash-Free Session Rate**
   - Target: > 99.5%
   - Broken down by OS version and device

2. **Mean Time To Recovery (MTTR)**
   - Time from incident detection to resolution
   - Target: < 4 hours for P0 incidents

3. **Deployment Frequency**
   - Releases per week/month
   - Target: At least 2 per sprint

4. **Change Failure Rate**
   - Percentage of deployments causing incidents
   - Target: < 5%

#### 2.5.2 Dashboard Implementation

**Linear Built-in Dashboards:**
- Utilize Linear's native insights for velocity, cycle time, throughput
- Create custom views for each metric category
- Set up weekly email reports to leadership

**Supplementary Tools:**

1. **GitHub Insights**
   - Code frequency graphs
   - Contributor activity
   - PR merge times

2. **Custom Data Pipeline**
   - Export Linear data via API
   - Transform and load to data warehouse (e.g., BigQuery)
   - Visualize in Looker Studio or Metabase

3. **Engineering Metrics Dashboard** (Example Structure)

```
Dashboard: Engineering Health

Section 1: Velocity & Predictability
- Sprint velocity trend (last 10 sprints)
- Committed vs. completed comparison
- Cycle time distribution histogram
- Sprint goal success rate (%)

Section 2: Quality & Stability
- Bug count by severity (trend)
- Test coverage over time
- Production incidents (count and MTTR)
- Code review turnaround time

Section 3: Team Health
- Workload distribution per team member
- WIP limits adherence
- Overtime indicators (commits outside working hours)
- Retrospective action item completion rate

Section 4: Phase Progress
- Phase completion timeline (Gantt-style)
- Dependencies status
- Risk indicators (phases behind schedule)
```

#### 2.5.3 Reporting Cadence

**Daily:**
- Automated Slack digest from Linear
- Standup summaries
- Build/deployment status

**Weekly:**
- Sprint progress report (every Monday)
- Velocity and quality metrics summary
- Blockers and risks escalation

**Bi-Weekly (Per Sprint):**
- Sprint review deck (auto-generated from Linear)
- Retrospective summary and action items
- Updated phase timeline forecast

**Monthly:**
- Executive summary for leadership
- Phase group completion status
- Resource allocation recommendations
- Risk assessment update

**Quarterly:**
- Comprehensive phase progress report
- Process effectiveness review
- Tool and workflow optimization recommendations
- Team capacity planning for next quarter

**Deliverable:** Live dashboards in Linear and supplementary BI tool with automated reporting

---

## 3. Tools & Resources

### 3.1 Primary Tools

| Tool | Purpose | Cost Estimate | Owner |
|------|---------|---------------|-------|
| Linear | Issue tracking, sprint management | $12/user/month | PM/Scrum Master |
| Slack | Team communication | $8/user/month | Ops Manager |
| GitHub | Code repository, CI/CD, PRs | Free-$21/user/month | Tech Lead |
| Notion | Documentation, decision logs, wikis | $8/user/month | PM |
| Figma | Design collaboration, whiteboarding | Free-$15/editor/month | Design Lead |
| Google Workspace | Email, calendar, docs | $12/user/month | Ops Manager |
| Zoom | Video conferencing, recording | $15/host/month | Ops Manager |

### 3.2 Optional/Backup Tools

| Tool | Purpose | When to Use |
|------|---------|-------------|
| Jira | Alternative to Linear | If team scales > 50 or enterprise requirements |
| Asana | Project management alternative | For non-engineering teams |
| Miro | Advanced whiteboarding | Complex workshops, design sprints |
| Range | Async standups, OKRs | If async-first culture emphasized |
| Geekbot | Automated standups in Slack | If timezone spread makes sync difficult |
| Loom | Async video updates | For complex explanations, demos |

### 3.3 Integration Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   GitHub    │────▶│   Linear    │◀────│    Slack    │
│  (Code/PRs) │     │   (Issues)  │     │(Comms/Alerts)│
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Notion    │
                    │   (Docs)    │
                    └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  Looker/    │
                    │  Metabase   │
                    │(Dashboards) │
                    └─────────────┘
```

---

## 4. Implementation Checklist

### Week 1: Foundation Setup
- [ ] Create Linear workspace and invite core team
- [ ] Configure teams, workflows, and issue types
- [ ] Set up GitHub integration
- [ ] Create initial backlog from AGENT.md phases
- [ ] Draft initial DoD document
- [ ] Set up Slack channels and integrations

### Week 2: Process Definition
- [ ] Finalize sprint ceremony schedules
- [ ] Document communication protocols
- [ ] Define KPIs and create initial dashboards
- [ ] Conduct team training on Linear and workflows
- [ ] Run mock sprint planning session
- [ ] Refine DoD based on team feedback

### Week 3: Pilot Sprint
- [ ] Execute first full sprint with new processes
- [ ] Gather feedback on workflow friction points
- [ ] Adjust configurations based on learnings
- [ ] Validate dashboard accuracy
- [ ] Document lessons learned

### Week 4: Optimization & Handoff
- [ ] Finalize all documentation
- [ ] Create onboarding guide for new team members
- [ ] Establish regular process review cadence
- [ ] Hand off operational ownership to PM/Scrum Master
- [ ] Mark Phase 9 as complete in Linear

---

## 5. Deliverables

### 5.1 Operational Workflow Handbook

A comprehensive document (hosted in Notion) containing:

1. **Getting Started Guide**
   - Tool access and setup instructions
   - Account creation walkthroughs
   - First-day checklist for new hires

2. **Workflow Reference**
   - How to create and manage issues
   - Sprint ceremony guides with templates
   - DoD checklists by level
   - Escalation procedures

3. **Best Practices**
   - Writing effective issue descriptions
   - Estimation guidelines
   - Code review standards
   - Communication etiquette

4. **Troubleshooting**
   - Common workflow problems and solutions
   - Who to contact for help
   - FAQ section

### 5.2 Configured Linear Workspace

- Fully operational with all configurations from Section 2.1
- Historical data from Phase 9 onward
- Saved views and filters for all roles
- Automation rules active
- Integrations functioning

### 5.3 Sprint Calendar

- Recurring events scheduled in team calendars
- Holiday and blackout dates marked
- Sprint start/end dates for next 6 months
- Ceremony invites with agendas attached

### 5.4 Metrics Dashboard

- Live dashboards showing KPIs from Section 2.5
- Automated weekly email reports configured
- Historical baseline established
- Alert thresholds set

### 5.5 Team Training Materials

- Recorded walkthrough of Linear usage
- Sprint ceremony example recordings
- Quick reference cards (PDF)
- Quiz/certification for new team members

---

## 6. Success Criteria

Phase 9 is considered complete when:

- [ ] Linear workspace fully configured and adopted by team
- [ ] First sprint completed using new framework
- [ ] All team members trained and comfortable with tools
- [ ] DoD enforced in CI/CD pipeline
- [ ] Dashboards displaying accurate, actionable data
- [ ] Communication protocols documented and followed
- [ ] Operational Workflow Handbook published and accessible
- [ ] Process feedback loop established (monthly retrospectives on process itself)
- [ ] Zero critical workflow blockers for Phase 10 initiation

---

## 7. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tool overload/resistance | Medium | High | Keep toolset minimal, provide training, gather feedback |
| Over-engineering processes | Medium | Medium | Start simple, iterate based on pain points, avoid bureaucracy |
| Async communication breakdown | Low | High | Establish response time SLAs, default to transparency |
| Sprint fatigue | Medium | Medium | Keep ceremonies efficient, protect deep work time |
| DoD becomes checkbox exercise | High | High | Regularly revisit DoD, enforce in automation, empower QA to veto |
| Metrics gaming/manipulation | Low | High | Focus on trends not targets, psychological safety emphasis |
| Dependency on specific individuals | Medium | Medium | Cross-train team, document everything, rotate facilitation |

---

## 8. Appendix

### 8.1 Sample Issue Template

```markdown
## Type
[Feature | Bug | Improvement | Research | Documentation]

## Priority
[Urgent | High | Medium | Low | Icebox]

## Phase
phase-XX

## Description
Clear, concise description of what and why

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Notes
Any implementation considerations, architecture decisions, etc.

## Design Links
[Figma mocks, prototypes, etc.]

## Related Issues
[Links to dependencies, epics, etc.]

## Analytics Events
[List of events to track, with properties]

## DoD Checklist
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility verified
- [ ] Documentation updated
- [ ] Monitoring in place
```

### 8.2 Sprint Planning Poker Scale

Use modified Fibonacci for estimation:

| Points | Effort Equivalent | Example |
|--------|-------------------|---------|
| 1 | Trivial | Fix typo, update color |
| 2 | Small | Add simple component, fix minor bug |
| 3 | Moderate | New API endpoint, medium component |
| 5 | Significant | Full CRUD feature, complex animation |
| 8 | Large | Multi-component feature, integration work |
| 13 | Very Large | Should be split into multiple stories |
| 20 | Too Large | Must be decomposed before estimation |

### 8.3 Glossary

- **DoD:** Definition of Done
- **PRD:** Product Requirements Document
- **SME:** Subject Matter Expert
- **LMS:** Learning Management System
- **WCAG:** Web Content Accessibility Guidelines
- **ANR:** App Not Responding
- **WIP:** Work In Progress
- **MTTR:** Mean Time To Recovery
- **SLA:** Service Level Agreement
- **DACI:** Driver, Approver, Contributor, Informed (decision-making model)

---

## Document Control

**Version:** 1.0  
**Created:** [Date]  
**Last Updated:** [Date]  
**Owner:** Project Manager / Scrum Master  
**Review Cadence:** Quarterly  
**Next Review Date:** [Date + 3 months]

---

*This document is part of the Engineering Study Guide App 100-Phase Development Roadmap. See AGENT.md for the complete roadmap overview.*

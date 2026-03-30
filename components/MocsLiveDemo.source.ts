export const MOCS_LIVE_DEMO_HTML = String.raw`<!-- 07 LIVE DEMO -->
<!-- DASHBOARD EXTRA CSS -->


<!-- ═══════════════════════════════════════════════ -->
<!-- 07 — LIVE SYSTEM DEMO                          -->
<!-- ═══════════════════════════════════════════════ -->
<section id="demo">
  <div class="container">

    <div class="demo-shell">
      <div class="demo-chrome">
        <div class="demo-dot" style="background:#ff5f56"></div>
        <div class="demo-dot" style="background:#ffbd2e"></div>
        <div class="demo-dot" style="background:#27c93f"></div>
        <div class="demo-url-bar"><span class="demo-url">app.cikitsainternational.com/mocs · Medical Operations Control System</span></div>
      </div>

      <div id="mocs-app" data-lenis-prevent="true">
        <!-- ── ICON RAIL ── -->
        <div class="app-rail">
          <div class="app-rail-logo"><svg viewBox="0 0 12 12"><path d="M6 1v10M1 6h10"/></svg></div>
          <div class="app-rail-item on" id="rail-dashboard" onclick="switchView('dashboard',0)" title="Dashboard">
            <svg viewBox="0 0 16 16"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>
          </div>
          <div class="app-rail-item" id="rail-patients" onclick="switchView('patients',1)" title="Patients">
            <svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg>
          </div>
          <div class="app-rail-item" id="rail-visa" onclick="switchView('visa',2)" title="Visa Pipeline">
            <svg viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="10" rx="1"/><path d="M2 7h12M6 3v4"/></svg>
          </div>
          <div class="app-rail-item" id="rail-finance" onclick="switchView('finance',3)" title="Finance">
            <svg viewBox="0 0 16 16"><path d="M8 2v12M5 5h4.5a2.5 2.5 0 0 1 0 5H5M5 10h5"/></svg>
          </div>
          <div class="app-rail-item" id="rail-hospitals" onclick="switchView('hospitals',4)" title="Hospitals">
            <svg viewBox="0 0 16 16"><path d="M3 14V7l5-5 5 5v7M6 14v-4h4v4"/></svg>
          </div>
          <div class="app-rail-item" id="rail-agents" onclick="switchView('agents',5)" title="Agents">
            <svg viewBox="0 0 16 16"><circle cx="6" cy="5" r="2.5"/><path d="M1 14c0-2.8 2.2-5 5-5"/><circle cx="12" cy="8" r="2"/><path d="M10 14c0-1.1.9-2 2-2s2 .9 2 2"/></svg>
          </div>
          <div class="app-rail-item" id="rail-analytics" onclick="switchView('analytics',6)" title="Analytics">
            <svg viewBox="0 0 16 16"><path d="M2 12l3-4 3 2 3-5 3 3"/><path d="M2 14h12"/></svg>
          </div>
          <div class="app-rail-div"></div>
          <div class="app-rail-item" id="rail-reports" onclick="switchView('reports',7)" title="Reports">
            <svg viewBox="0 0 16 16"><path d="M4 2h6l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/><path d="M10 2v4h4M6 9h4M6 12h4"/></svg>
          </div>
          <div class="app-rail-item" id="rail-settings" onclick="switchView('settings',8)" title="Settings">
            <svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="2"/><path d="M8 2v1M8 13v1M2 8H1M15 8h-1M3.5 3.5l.7.7M11.8 11.8l.7.7M3.5 12.5l.7-.7M11.8 4.2l.7-.7"/></svg>
          </div>
        </div>

        <!-- ── SIDEBAR ── -->
        <div class="app-sidebar">
          <div class="sb-head">
            <span class="sb-title">Patient Registry</span>
            <span class="sb-count" id="sb-count">0</span>
          </div>
          <div class="sb-search"><input type="text" placeholder="Search…" oninput="filterSB(this.value)" id="sb-inp"/></div>
          <div class="sb-list" id="sb-list"></div>
        </div>

        <!-- ── MAIN AREA ── -->
        <div class="app-main">
          <!-- TOP BAR -->
          <div class="app-topbar">
            <div class="topbar-left">
              <div class="topbar-crumb">MOCS <span style="color:var(--ink4);font-weight:400;padding:0 2px">›</span> <span id="view-title">Operations Dashboard</span></div>
              <div class="tb-divider"></div>
              <span class="tb-date" id="date-btn" onclick="cycleDateRange(this)">This Month</span>
              <span class="last-updated" id="last-updated">Updated just now</span>
            </div>
            <div class="topbar-right">
              <input class="tb-search" type="text" placeholder="⌘ Search…" id="global-search" oninput="doGlobalSearch(this.value)" onkeydown="if(event.key==='Escape')this.value=''"/>
              <button class="tb-btn" onclick="doRefresh(this)">
                <svg id="refresh-icon" viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 2a6 6 0 1 1-4-1.5"/><path d="M10 2V5M10 2H7"/></svg> Refresh
              </button>
              <button class="tb-btn" onclick="doExport()">↓ Export</button>
              <button class="tb-icon-btn" id="dark-toggle" onclick="toggleDarkMode()" title="Toggle dark mode">
                <svg viewBox="0 0 16 16"><path d="M8 3a5 5 0 1 0 5 5 4 4 0 0 1-5-5z"/></svg>
              </button>
              <button class="tb-btn primary" onclick="openModal()">+ New Case</button>
              <div class="tb-divider"></div>
              <!-- Notifications -->
              <div style="position:relative">
                <button class="tb-icon-btn" id="notif-btn" onclick="togglePanel('notif',event)">
                  <svg viewBox="0 0 16 16"><path d="M8 2a5 5 0 0 0-5 5v3H2l1 2h10l1-2h-1V7a5 5 0 0 0-5-5z"/><path d="M6.5 13.5a1.5 1.5 0 0 0 3 0"/></svg>
                  <span class="tb-notif-badge" id="notif-badge">3</span>
                </button>
                <div class="dropdown-panel notif-panel-wrap" id="notif-panel">
                  <div class="notif-hd">
                    <span class="notif-hd-title">Notifications</span>
                    <button class="notif-mark-all" onclick="markAllRead()">Mark all read</button>
                  </div>
                  <div class="notif-items" id="notif-list"></div>
                </div>
              </div>
              <!-- Profile -->
              <div style="position:relative">
                <div class="tb-avatar" id="profile-btn" onclick="togglePanel('profile',event)">SH</div>
                <div class="dropdown-panel profile-panel" id="profile-panel">
                  <div class="pd-user"><div class="pd-name">Sayem Hossain</div><div class="pd-role">Lead Coordinator · MOCS</div></div>
                  <div class="pd-div"></div>
                  <div class="pd-item" onclick="switchView('settings',8)">Settings</div>
                  <div class="pd-item" onclick="showToast('📋 Activity log opened')">Activity Log</div>
                  <div class="pd-div"></div>
                  <div class="pd-item danger" onclick="showToast('Demo mode — sign out disabled')">Sign Out</div>
                </div>
              </div>
            </div>
          </div>

          <!-- CONTENT AREA -->
          <div class="app-content">

            <!-- ══════════════════════════════════ -->
            <!-- DASHBOARD                          -->
            <!-- ══════════════════════════════════ -->
            <div class="view on" id="view-dashboard">
              <!-- KPI Row -->
              <div class="kpi-row" id="kpi-row">
                <div class="kpi" onclick="filterByStatus('')" id="kpi-all">
                  <div class="kpi-val brand" id="kd-total">—</div>
                  <div class="kpi-lbl">Total Patients</div>
                  <div class="kpi-spark" id="spark-total"></div>
                  <div class="kpi-trend up">↑ +3 this week</div>
                </div>
                <div class="kpi" onclick="filterByStatus('Visa Approved')" id="kpi-visa">
                  <div class="kpi-val amber" id="kd-visa">—</div>
                  <div class="kpi-lbl">Visa Pipeline</div>
                  <div class="kpi-spark" id="spark-visa"></div>
                  <div class="kpi-trend warn">needs follow-up</div>
                </div>
                <div class="kpi" onclick="filterByStatus('Under Treatment')" id="kpi-treat">
                  <div class="kpi-val green" id="kd-treat">—</div>
                  <div class="kpi-lbl">Under Treatment</div>
                  <div class="kpi-spark" id="spark-treat"></div>
                  <div class="kpi-trend up">active cases</div>
                </div>
                <div class="kpi" onclick="filterByStatus('Treatment Done')" id="kpi-done">
                  <div class="kpi-val blue" id="kd-done">—</div>
                  <div class="kpi-lbl">Treatment Done</div>
                  <div class="kpi-spark" id="spark-done"></div>
                  <div class="kpi-trend up">↑ completed</div>
                </div>
                <div class="kpi" onclick="filterByStatus('Scheduled')" id="kpi-sched">
                  <div class="kpi-val red" id="kd-sched">—</div>
                  <div class="kpi-lbl">Scheduled</div>
                  <div class="kpi-spark" id="spark-sched"></div>
                  <div class="kpi-trend warn">confirm travel</div>
                </div>
              </div>

              <!-- Row 1: Activity feed + Hospital doughnut -->
              <div class="dash-2col">
                <div class="dash-card">
                  <div class="dc-head">
                    <span class="dc-title">Live Patient Activity</span>
                    <span class="dc-link" onclick="switchView('patients',1)">View all →</span>
                  </div>
                  <div class="dc-body-scroll"><div id="dash-activity"></div><div class="dc-scroll-fade"></div></div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Hospital Distribution</span><span class="dc-right" id="total-badge">— cases</span></div>
                  <div class="dc-body">
                    <div class="chart-wrap-sm"><canvas id="chart-hosp"></canvas></div>
                    <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:4px" id="hosp-legend"></div>
                  </div>
                </div>
              </div>

              <!-- Row 2: Status bar + Visa mini + OPD/IPD -->
              <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:8px">
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Status Breakdown</span><span class="dc-right">Live counts</span></div>
                  <div class="dc-body"><div class="chart-wrap-sm"><canvas id="chart-status"></canvas></div></div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Visa Pipeline</span><span class="dc-link" onclick="switchView('visa',2)">Kanban →</span></div>
                  <div class="dc-body" style="padding:8px 13px"><div id="dash-visa-summary"></div></div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">OPD vs IPD Mix</span><span class="dc-right">Type split</span></div>
                  <div class="dc-body"><div class="chart-wrap-sm"><canvas id="chart-type"></canvas></div></div>
                </div>
              </div>

              <!-- Row 3: Coordinator workload + Alerts -->
              <div class="dash-2col" style="grid-template-columns:1fr 1.35fr">
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Coordinator Workload</span><span class="dc-right">Capacity view</span></div>
                  <div class="dc-body" style="padding:8px 13px">
                    <table class="mini-table"><thead><tr><th>Name</th><th>Active</th><th>Cap%</th><th>Done</th></tr></thead><tbody id="dash-coord"></tbody></table>
                  </div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Operational Alerts</span><span class="dc-right" id="dash-alert-count">0 flags</span></div>
                  <div class="dc-body" style="padding:8px 13px" id="dash-alerts"></div>
                </div>
              </div>

              <!-- Row 4: Top Departments + Top Agents + Countries -->
              <div style="display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:8px;margin-top:8px;margin-bottom:8px">
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Top Departments</span><span class="dc-right">by volume</span></div>
                  <div class="dc-body"><div class="chart-wrap" style="height:140px"><canvas id="chart-dept"></canvas></div></div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Top Agents</span><span class="dc-link" onclick="switchView('agents',5)">All →</span></div>
                  <div class="dc-body" style="padding:8px 13px"><div class="stat-ring" id="dash-agents"></div></div>
                </div>
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Source Countries</span><span class="dc-right">origin</span></div>
                  <div class="dc-body" style="padding:5px 13px" id="dash-countries"></div>
                </div>
              </div>

              <!-- Row 5: Revenue bars + Commission calc -->
              <div class="dash-2col" style="grid-template-columns:1.1fr 1fr">
                <div class="dash-card">
                  <div class="dc-head"><span class="dc-title">Est. Commission Revenue by Hospital</span><span class="dc-link" onclick="switchView('finance',3)">Finance →</span></div>
                  <div class="dc-body" id="dash-rev-bars"></div>
                </div>
                <div class="dash-card dc-calc">
                  <div class="dc-head"><span class="dc-title">Quick Commission Calculator</span><span class="dc-right">Live rate engine</span></div>
                  <div class="calc-body-inner">
                    <div>
                      <label>Hospital</label>
                      <select id="dc-hosp" onchange="calcDC()">
                        <option value="apollo-chennai">Apollo Chennai</option>
                        <option value="apollo-kolkata">Apollo Kolkata</option>
                        <option value="apollo-delhi">Apollo Delhi</option>
                        <option value="manipal-kolkata">Manipal Kolkata</option>
                        <option value="manipal-oldhal">Manipal Old Hal Rd</option>
                        <option value="manipal-varthur">Manipal Varthur</option>
                        <option value="fortis-delhi">Fortis Delhi</option>
                        <option value="max-delhi">Max Saket</option>
                        <option value="artemis-delhi">Artemis Gurgaon</option>
                      </select>
                    </div>
                    <div>
                      <label>Type & Bill (৳ BDT)</label>
                      <div style="display:flex;gap:5px">
                        <select id="dc-type" onchange="calcDC()" style="width:70px;flex-shrink:0"><option value="op">OPD</option><option value="ip">IPD</option></select>
                        <input type="number" id="dc-amt" value="100000" oninput="calcDC()" min="0"/>
                      </div>
                    </div>
                  </div>
                  <div class="calc-result-mini">
                    <div><div class="crm-lbl">Rate %</div><div class="crm-val" id="dc-pct">5%</div></div>
                    <div><div class="crm-lbl">Gross CI</div><div class="crm-val" id="dc-gross">৳5,000</div></div>
                    <div><div class="crm-lbl">Agent (40%)</div><div class="crm-val" id="dc-agent">৳2,000</div></div>
                    <div><div class="crm-lbl">Net Cikitsa</div><div class="crm-val" id="dc-net">৳3,000</div></div>
                  </div>
                </div>
              </div>
            </div><!-- end dashboard -->

            <!-- ══════════════════════════════════ -->
            <!-- PATIENTS                           -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-patients">
              <!-- Quick stat filter chips -->
              <div class="qstat-row">
                <div class="qstat on" id="qs-all" onclick="qFilter('')">
                  <span class="qstat-dot" style="background:var(--brand)"></span>
                  <span>All</span><span class="qstat-num" id="qs-n-all">0</span>
                </div>
                <div class="qstat" id="qs-treat" onclick="qFilter('Under Treatment')">
                  <span class="qstat-dot" style="background:var(--brand)"></span>
                  <span>Treatment</span><span class="qstat-num" id="qs-n-treat">0</span>
                </div>
                <div class="qstat" id="qs-visa" onclick="qFilter('Visa Approved')">
                  <span class="qstat-dot" style="background:var(--am)"></span>
                  <span>Visa ✓</span><span class="qstat-num" id="qs-n-visa">0</span>
                </div>
                <div class="qstat" id="qs-done" onclick="qFilter('Treatment Done')">
                  <span class="qstat-dot" style="background:var(--gm)"></span>
                  <span>Done</span><span class="qstat-num" id="qs-n-done">0</span>
                </div>
                <div class="qstat" id="qs-sched" onclick="qFilter('Scheduled')">
                  <span class="qstat-dot" style="background:var(--rm)"></span>
                  <span>Scheduled</span><span class="qstat-num" id="qs-n-sched">0</span>
                </div>
              </div>
              <div class="pt-filters">
                <input class="pt-input" type="text" placeholder="Search name, passport, contact…" id="pt-search" oninput="filterPT()"/>
                <select class="pt-sel" id="pt-hosp" onchange="filterPT()">
                  <option value="">All Hospitals</option>
                  <option>APOLLO</option><option>MANIPAL</option><option>FORTIS</option><option>Max Hospital Saket</option><option>ARTEMIS GURGAON</option>
                </select>
                <select class="pt-sel" id="pt-stat" onchange="filterPT()">
                  <option value="">All Statuses</option>
                  <option>Under Treatment</option><option>Treatment Done</option><option>Visa Approved</option><option>Scheduled</option>
                </select>
                <select class="pt-sel" id="pt-type" onchange="filterPT()">
                  <option value="">All Types</option><option>OPD</option><option>IPD</option>
                </select>
                <select class="pt-sel" id="pt-handler" onchange="filterPT()">
                  <option value="">All Coordinators</option>
                  <option>Sayem</option><option>Atiq</option><option>Jafor</option><option>Dihan</option><option>Jeffry</option>
                </select>
                <button class="tb-btn" onclick="clearPTFilters()" style="white-space:nowrap;flex-shrink:0">✕ Clear</button>
              </div>
              <div class="pt-wrap">
                <table class="pt-table">
                  <thead><tr>
                    <th class="sortable" onclick="sortPT('name')">Patient <span class="sort-ind" id="si-name">↕</span></th>
                    <th class="sortable" onclick="sortPT('hospital')">Hospital <span class="sort-ind" id="si-hospital">↕</span></th>
                    <th class="sortable" onclick="sortPT('dept')">Department <span class="sort-ind" id="si-dept">↕</span></th>
                    <th class="sortable" onclick="sortPT('type')">Type <span class="sort-ind" id="si-type">↕</span></th>
                    <th class="sortable" onclick="sortPT('status')">Status <span class="sort-ind" id="si-status">↕</span></th>
                    <th class="sortable" onclick="sortPT('handler')">Coordinator <span class="sort-ind" id="si-handler">↕</span></th>
                    <th class="sortable" onclick="sortPT('agent')">Agent <span class="sort-ind" id="si-agent">↕</span></th>
                    <th></th>
                  </tr></thead>
                  <tbody id="pt-body"></tbody>
                </table>
                <div class="pt-pagination">
                  <span class="pg-info" id="pg-info">Showing — of —</span>
                  <div class="pg-btns" id="pg-btns"></div>
                </div>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- VISA PIPELINE                      -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-visa">
              <div class="visa-kpis">
                <div class="visa-kpi" onclick="filterVIL('Applied')">
                  <div class="visa-kpi-val" style="color:var(--am)" id="vk-applied">—</div>
                  <div class="visa-kpi-lbl">Applied</div>
                </div>
                <div class="visa-kpi" onclick="filterVIL('Under Review')">
                  <div class="visa-kpi-val" style="color:var(--bm)" id="vk-review">—</div>
                  <div class="visa-kpi-lbl">Under Review</div>
                </div>
                <div class="visa-kpi" onclick="filterVIL('Approved')">
                  <div class="visa-kpi-val" style="color:var(--brand)" id="vk-approved">—</div>
                  <div class="visa-kpi-lbl">Approved</div>
                </div>
                <div class="visa-kpi" onclick="filterVIL('Travelling')">
                  <div class="visa-kpi-val" style="color:var(--gm)" id="vk-travel">—</div>
                  <div class="visa-kpi-lbl">Travelling</div>
                </div>
              </div>
              <div class="kanban-board" id="visa-kanban"></div>
              <!-- VIL Log Table -->
              <div class="pt-wrap">
                <div class="vil-search-bar">
                  <span class="dc-title" style="flex:1">VIL Request Log</span>
                  <input class="pt-input" type="text" placeholder="Filter by name or agent…" id="vil-search" oninput="renderVIL()" style="max-width:180px;margin-bottom:0"/>
                  <button class="tb-btn" onclick="document.getElementById('vil-search').value='';renderVIL()">Clear</button>
                </div>
                <table class="pt-table"><thead><tr><th>Patient</th><th>Hospital</th><th>Department</th><th>Agent</th><th>Stage</th><th>Days</th><th>Coordinator</th></tr></thead><tbody id="vil-body"></tbody></table>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- FINANCE                            -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-finance">
              <div class="fin-stats-row">
                <div class="fin-stat"><div class="fin-stat-lbl">VIL Revenue Est.</div><div class="fin-stat-val" style="color:var(--brand)" id="fin-vil">—</div><div class="fin-stat-sub">all patients × ৳149</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Gross Commission</div><div class="fin-stat-val" style="color:var(--am)" id="fin-comm">—</div><div class="fin-stat-sub">done patients</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Agent Payouts</div><div class="fin-stat-val" style="color:var(--rm)" id="fin-agent">—</div><div class="fin-stat-sub">40% of commission</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Net to Cikitsa</div><div class="fin-stat-val" style="color:var(--gm)" id="fin-net">—</div><div class="fin-stat-sub">60% retained</div></div>
              </div>
              <!-- Revenue bar chart -->
              <div class="dash-card" style="margin-bottom:8px">
                <div class="dc-head"><span class="dc-title">Commission Revenue by Hospital Network</span><span class="dc-right">BDT estimate</span></div>
                <div class="dc-body" id="fin-rev-bars"></div>
              </div>
              <!-- Commission calculator -->
              <div class="dash-card dc-calc" style="margin-bottom:8px">
                <div class="dc-head"><span class="dc-title">Commission Calculator</span><span class="dc-right">Full rate engine · live output</span></div>
                <div class="calc-body-inner" style="grid-template-columns:1fr 1fr 1fr 1fr">
                  <div><label>Hospital</label>
                    <select id="fc-hosp" onchange="calcFC()">
                      <option value="apollo-chennai">Apollo Chennai</option><option value="apollo-kolkata">Apollo Kolkata</option>
                      <option value="apollo-delhi">Apollo Delhi</option><option value="manipal-kolkata">Manipal Kolkata</option>
                      <option value="manipal-oldhal">Manipal Old Hal</option><option value="manipal-varthur">Manipal Varthur</option>
                      <option value="fortis-delhi">Fortis Delhi</option><option value="max-delhi">Max Saket</option><option value="artemis-delhi">Artemis Gurgaon</option>
                    </select>
                  </div>
                  <div><label>Type</label><select id="fc-type" onchange="calcFC()"><option value="op">OPD</option><option value="ip">IPD</option></select></div>
                  <div><label>Bill Amount (৳ BDT)</label><input type="number" id="fc-amt" value="150000" oninput="calcFC()" min="0"/></div>
                  <div><label>Agent Split</label>
                    <select id="fc-split" onchange="calcFC()">
                      <option value="2">2% agent</option><option value="4" selected>4% agent</option>
                      <option value="7">7% agent</option><option value="10">10% agent</option>
                    </select>
                  </div>
                </div>
                <div class="calc-result-mini" style="grid-template-columns:repeat(4,1fr)">
                  <div><div class="crm-lbl">CI Rate %</div><div class="crm-val" id="fc-pct">—</div></div>
                  <div><div class="crm-lbl">Gross CI</div><div class="crm-val" id="fc-gross">—</div></div>
                  <div><div class="crm-lbl">Agent Payout</div><div class="crm-val" id="fc-agent">—</div></div>
                  <div><div class="crm-lbl">Net Cikitsa</div><div class="crm-val" id="fc-net">—</div></div>
                </div>
              </div>
              <!-- Rate table -->
              <div class="pt-wrap">
                <table class="pt-table"><thead><tr><th>Hospital</th><th>City</th><th>VIL ৳</th><th>OP % CI</th><th>IP % CI</th><th>Telemedicine</th><th>Airport Pickup</th></tr></thead><tbody id="fin-body"></tbody></table>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- HOSPITALS                          -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-hospitals">
              <div class="fin-stats-row" style="grid-template-columns:repeat(3,1fr)">
                <div class="fin-stat"><div class="fin-stat-lbl">Partner Chains</div><div class="fin-stat-val" style="color:var(--brand)">7</div><div class="fin-stat-sub">Apollo, Manipal, Fortis…</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Total Locations</div><div class="fin-stat-val" style="color:var(--am)">16</div><div class="fin-stat-sub">across 10+ cities</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Avg OP Commission</div><div class="fin-stat-val" style="color:var(--gm)">15%</div><div class="fin-stat-sub">blended across network</div></div>
              </div>
              <div class="h-grid-demo" id="hosp-grid" style="margin-bottom:9px"></div>
              <div class="pt-wrap">
                <div class="vil-search-bar"><span class="dc-title">Commission Rate Reference</span></div>
                <table class="pt-table"><thead><tr><th>Hospital</th><th>City</th><th>VIL ৳</th><th>OP % CI</th><th>IP % CI</th><th>Telemedicine</th><th>Pickup ৳</th></tr></thead><tbody id="hosp-rate-body"></tbody></table>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- AGENTS                             -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-agents">
              <div class="fin-stats-row">
                <div class="fin-stat"><div class="fin-stat-lbl">Total Agents</div><div class="fin-stat-val" style="color:var(--brand)" id="ag-total">—</div><div class="fin-stat-sub">active referring agents</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Top Agent</div><div class="fin-stat-val" style="color:var(--am);font-size:11px;font-weight:700" id="ag-top">—</div><div class="fin-stat-sub">most referrals</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Avg Referrals</div><div class="fin-stat-val" style="color:var(--gm)" id="ag-avg">—</div><div class="fin-stat-sub">per agent</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Unattributed</div><div class="fin-stat-val" style="color:var(--rm)" id="ag-unattr">—</div><div class="fin-stat-sub">no agent listed</div></div>
              </div>
              <div class="agents-grid" id="agents-cards"></div>
              <div class="pt-wrap">
                <table class="pt-table"><thead><tr><th>Agent Name</th><th>Total Refs</th><th>Done</th><th>Active</th><th>Visa Stage</th><th>Est. Commission</th></tr></thead><tbody id="agents-table"></tbody></table>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- ANALYTICS                          -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-analytics">
              <div class="analytics-tabs">
                <button class="atab-btn atab-main-btn on" onclick="switchAtab(0,this)">Overview</button>
                <button class="atab-btn atab-main-btn" onclick="switchAtab(1,this)">Trends</button>
                <button class="atab-btn atab-main-btn" onclick="switchAtab(2,this)">Geography</button>
              </div>
              <div id="atab-0">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
                  <div class="dash-card">
                    <div class="dc-head">
                      <span class="dc-title">Patient Volume</span>
                      <div style="display:flex;gap:3px">
                        <button class="atab-btn lc-btn on" onclick="switchLC('week',this)" style="padding:2px 7px;font-size:7px;border-bottom:none">Week</button>
                        <button class="atab-btn lc-btn" onclick="switchLC('month',this)" style="padding:2px 7px;font-size:7px;border-bottom:none">Month</button>
                        <button class="atab-btn lc-btn" onclick="switchLC('quarter',this)" style="padding:2px 7px;font-size:7px;border-bottom:none">Quarter</button>
                      </div>
                    </div>
                    <div class="dc-body"><div style="height:120px;position:relative"><canvas id="chart-trend"></canvas></div></div>
                  </div>
                  <div class="dash-card">
                    <div class="dc-head"><span class="dc-title">Treatment Mix by Specialty</span><span class="dc-right">Top 6</span></div>
                    <div class="dc-body"><div style="height:120px;position:relative"><canvas id="chart-specialty"></canvas></div></div>
                  </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
                  <div class="dash-card">
                    <div class="dc-head"><span class="dc-title">Coordinator Efficiency</span><span class="dc-right">Done/Active %</span></div>
                    <div class="dc-body" style="padding:6px 13px" id="coord-eff"></div>
                  </div>
                  <div class="dash-card">
                    <div class="dc-head"><span class="dc-title">Revenue by Hospital</span><span class="dc-right">Est. BDT</span></div>
                    <div class="dc-body" style="padding:6px 13px" id="rev-hosp-list"></div>
                  </div>
                  <div class="dash-card">
                    <div class="dc-head"><span class="dc-title">Discharge Stats</span><span class="dc-right">Outcomes</span></div>
                    <div class="dc-body" style="padding:10px 13px" id="discharge-stats"></div>
                  </div>
                </div>
              </div>
              <div id="atab-1" style="display:none">
                <div class="dash-card" style="margin-bottom:8px">
                  <div class="dc-head"><span class="dc-title">Monthly Patient Volume · 6-Month View</span></div>
                  <div class="dc-body"><div style="height:150px;position:relative"><canvas id="chart-monthly"></canvas></div></div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="dash-card"><div class="dc-head"><span class="dc-title">OPD vs IPD Trend</span></div><div class="dc-body"><div style="height:100px;position:relative"><canvas id="chart-opd-ipd"></canvas></div></div></div>
                  <div class="dash-card"><div class="dc-head"><span class="dc-title">Status Distribution</span><span class="dc-right">all time</span></div><div class="dc-body" style="padding:6px 13px" id="status-dist"></div></div>
                </div>
              </div>
              <div id="atab-2" style="display:none">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                  <div class="dash-card"><div class="dc-head"><span class="dc-title">Patients by Source Country</span></div><div class="dc-body" style="padding:5px 13px" id="geo-countries"></div></div>
                  <div class="dash-card"><div class="dc-head"><span class="dc-title">Hospital City Distribution</span></div><div class="dc-body"><div style="height:150px"><canvas id="chart-cities"></canvas></div></div></div>
                </div>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- REPORTS                            -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-reports">
              <div class="fin-stats-row" style="grid-template-columns:repeat(3,1fr)">
                <div class="fin-stat"><div class="fin-stat-lbl">This Month</div><div class="fin-stat-val" style="color:var(--brand)" id="rpt-month">—</div><div class="fin-stat-sub">new patients tracked</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Visa Success Rate</div><div class="fin-stat-val" style="color:var(--gm)">97%</div><div class="fin-stat-sub">with complete docs</div></div>
                <div class="fin-stat"><div class="fin-stat-lbl">Avg Blended Rate</div><div class="fin-stat-val" style="color:var(--am)">12.4%</div><div class="fin-stat-sub">commission rate</div></div>
              </div>
              <div class="dash-card" style="margin-bottom:8px">
                <div class="dc-head"><span class="dc-title">Downloadable Report Archive</span><span class="dc-right">6 months</span></div>
                <div class="dc-body" style="padding:8px 13px" id="report-archive"></div>
              </div>
              <div class="pt-wrap">
                <div class="vil-search-bar"><span class="dc-title">Treatment Outcome by Department</span></div>
                <table class="pt-table"><thead><tr><th>Department</th><th>Total</th><th>Done</th><th>Active</th><th>Success Rate</th><th>Avg Est. Revenue</th></tr></thead><tbody id="outcome-body"></tbody></table>
              </div>
            </div>

            <!-- ══════════════════════════════════ -->
            <!-- SETTINGS                           -->
            <!-- ══════════════════════════════════ -->
            <div class="view" id="view-settings">
              <div class="settings-grid">
                <div class="settings-card">
                  <div class="settings-card-title">Profile</div>
                  <div class="form-row" style="margin-bottom:7px"><label class="form-lbl">Full Name</label><input class="form-input" value="Sayem Hossain" style="font-size:11px;padding:6px 9px"/></div>
                  <div class="form-row" style="margin-bottom:7px"><label class="form-lbl">Role</label><input class="form-input" value="Lead Coordinator" style="font-size:11px;padding:6px 9px"/></div>
                  <div class="form-row" style="margin-bottom:7px"><label class="form-lbl">Email</label><input class="form-input" value="sayem@cikitsa.com" style="font-size:11px;padding:6px 9px"/></div>
                  <div class="form-row" style="margin-bottom:7px"><label class="form-lbl">Phone</label><input class="form-input" value="+880 17XX XXXXXX" style="font-size:11px;padding:6px 9px"/></div>
                  <button class="tb-btn primary" style="font-size:9px;padding:5px 12px" onclick="showToast('✓ Profile saved')">Save Changes</button>
                </div>
                <div class="settings-card">
                  <div class="settings-card-title">Notifications</div>
                  <div class="toggle-row"><span class="toggle-lbl">Visa status alerts</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">New patient added</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Commission disputes</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Follow-up reminders</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Weekly summary report</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Coordinator overload alert</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                </div>
                <div class="settings-card">
                  <div class="settings-card-title">System Preferences</div>
                  <div class="toggle-row"><span class="toggle-lbl">Dark mode</span><div class="toggle" id="dark-mode-toggle" onclick="toggleDarkMode()"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Compact table view</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Show passport numbers</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">BDT display (vs INR)</span><div class="toggle on" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Auto-refresh every 5 min</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
                  <div class="toggle-row"><span class="toggle-lbl">Sound notifications</span><div class="toggle" onclick="this.classList.toggle('on')"></div></div>
                </div>
                <div class="settings-card">
                  <div class="settings-card-title">Commission Split</div>
                  <div style="margin-bottom:12px">
                    <label class="form-lbl">Default CI / Agent Split (applies to all calculators)</label>
                    <input type="range" min="50" max="80" value="60" style="width:100%;margin:6px 0;accent-color:var(--brand)" id="ci-slider" oninput="onSplitChange(this.value)"/>
                    <div style="font-family:var(--mono);font-size:9px;color:var(--brand)" id="ci-split-display">60% CI · 40% Agent</div>
                  </div>
                  <div style="padding:10px;background:var(--rbg);border:1px solid #fecaca;border-radius:var(--r)">
                    <div style="font-size:9px;font-weight:700;color:var(--rm);margin-bottom:3px">⚠ Danger Zone</div>
                    <div style="font-size:8px;color:var(--rm);margin-bottom:6px">Clear all patient data (demo only)</div>
                    <button class="tb-btn" style="border-color:#fecaca;color:var(--rm);font-size:9px" onclick="showToast('🔒 Blocked in demo mode')">Reset Data</button>
                  </div>
                </div>
              </div>
            </div>

          </div><!-- end app-content -->
        </div><!-- end app-main -->
      </div><!-- end mocs-app -->
    </div><!-- end demo-shell -->
  </div>
</section>

<!-- TOAST -->
<div class="toast" id="toast"><span class="toast-icon">✓</span><span id="toast-msg"></span></div>

<!-- ADD PATIENT MODAL -->
<div class="modal-overlay" id="add-modal" style="display:none" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <div class="modal-head"><h3>Add New Patient Case</h3><button class="modal-close" onclick="closeModal()">✕</button></div>
    <div class="modal-body">
      <div class="form-2col">
        <div class="form-row"><label class="form-lbl">Patient Name *</label><input class="form-input" id="f-name" placeholder="FULL NAME IN CAPITALS" oninput="this.classList.remove('error')"/></div>
        <div class="form-row"><label class="form-lbl">Passport No.</label><input class="form-input" id="f-passport" placeholder="A00000000"/></div>
      </div>
      <div class="form-row"><label class="form-lbl">Contact Number</label><input class="form-input" id="f-contact" placeholder="880XXXXXXXXXX"/></div>
      <div class="form-2col">
        <div class="form-row"><label class="form-lbl">Hospital *</label>
          <select class="form-sel" id="f-hospital" onchange="updateCityOptions()">
            <option value="APOLLO">APOLLO</option><option value="MANIPAL">MANIPAL</option><option value="FORTIS">FORTIS</option><option value="Max Hospital Saket">Max Hospital Saket</option><option value="ARTEMIS GURGAON">ARTEMIS GURGAON</option>
          </select>
        </div>
        <div class="form-row"><label class="form-lbl">City / Branch *</label>
          <select class="form-sel" id="f-city">
            <option>Chennai</option><option>Kolkata</option><option>Delhi</option><option>Bangalore</option><option>Mumbai</option><option>Hyderabad</option>
          </select>
        </div>
      </div>
      <div class="form-2col">
        <div class="form-row"><label class="form-lbl">Department</label><input class="form-input" id="f-dept" placeholder="e.g. Cardiology"/></div>
        <div class="form-row"><label class="form-lbl">Treatment Type</label><select class="form-sel" id="f-type"><option>OPD</option><option>IPD</option></select></div>
      </div>
      <div class="form-2col">
        <div class="form-row"><label class="form-lbl">Coordinator</label><select class="form-sel" id="f-handler"><option>Sayem</option><option>Atiq</option><option>Jafor</option><option>Dihan</option><option>Jeffry</option></select></div>
        <div class="form-row"><label class="form-lbl">Agent / Referral</label><input class="form-input" id="f-agent" placeholder="Agent name or direct"/></div>
      </div>
      <div class="form-2col">
        <div class="form-row"><label class="form-lbl">Service Type</label><select class="form-sel" id="f-service"><option value="VIL">VIL (Visa Invitation Letter)</option><option value="DA">DA (Direct Admission)</option><option value="VIL+DA">VIL + DA</option><option value="Telemedicine">Telemedicine</option><option value="">Other</option></select></div>
        <div class="form-row"><label class="form-lbl">Initial Remarks</label><input class="form-input" id="f-note" placeholder="Travel date, notes…"/></div>
      </div>
    </div>
    <div class="modal-foot">
      <button class="tb-btn" onclick="closeModal()">Cancel</button>
      <button class="tb-btn primary" onclick="addPatient()">Add Patient</button>
    </div>
  </div>
</div>

<!-- PATIENT DETAIL MODAL -->
<div class="modal-overlay" id="detail-modal" style="display:none" onclick="if(event.target===this)closeDetail()">
  <div class="modal detail-modal" style="width:540px">
    <div class="modal-head">
      <div>
        <h3 id="dm-name">—</h3>
        <div style="font-family:var(--mono);font-size:9px;color:var(--ink4);margin-top:2px" id="dm-id-sub">—</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div id="dm-status-pill"></div>
        <button class="modal-close" onclick="closeDetail()">✕</button>
      </div>
    </div>
    <div class="modal-body">
      <!-- Journey tracker -->
      <div class="dm-section">
        <div class="dm-section-title">Patient Journey</div>
        <div class="journey-steps" id="dm-journey"></div>
        <!-- Advance status -->
        <div class="status-advance" id="dm-advance" style="display:none">
          <span class="status-advance-lbl" id="dm-advance-lbl">Move to next stage →</span>
          <button class="status-advance-btn" id="dm-advance-btn" onclick="advancePatientStatus()">Advance →</button>
        </div>
      </div>
      <!-- Patient info grid -->
      <div class="dm-section">
        <div class="dm-section-title">Patient Information</div>
        <div class="dm-grid">
          <div class="dm-field"><div class="dm-field-lbl">Hospital</div><div class="dm-field-val" id="dm-hospital">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">City</div><div class="dm-field-val" id="dm-city">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Department</div><div class="dm-field-val" id="dm-dept">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Type</div><div class="dm-field-val" id="dm-type">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Passport</div><div class="dm-field-val" id="dm-passport" style="font-family:var(--mono);font-size:10px">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Contact</div><div class="dm-field-val" id="dm-contact" style="font-family:var(--mono);font-size:10px">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Coordinator</div><div class="dm-field-val" id="dm-handler">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Referring Agent</div><div class="dm-field-val" id="dm-agent">—</div></div>
        </div>
      </div>
      <!-- Commission -->
      <div class="dm-section">
        <div class="dm-section-title">Commission Estimate</div>
        <div class="dm-grid">
          <div class="dm-field"><div class="dm-field-lbl">Rate</div><div class="dm-field-val" id="dm-rate">—</div></div>
          <div class="dm-field"><div class="dm-field-lbl">Est. Gross (avg ৳85K bill)</div><div class="dm-field-val" id="dm-comm">—</div></div>
        </div>
      </div>
      <!-- Follow-up log -->
      <div class="dm-section">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <div class="dm-section-title" style="margin-bottom:0">Follow-up Log</div>
          <span style="font-family:var(--mono);font-size:8px;color:var(--ink4)" id="dm-followup-count">0 entries</span>
        </div>
        <div class="followup-log" id="dm-followup-list"></div>
        <div class="followup-add">
          <input type="text" id="fu-note" placeholder="Add follow-up note…" onkeydown="if(event.key==='Enter')addFollowup()"/>
          <select id="fu-outcome">
            <option value="Contacted">Contacted</option>
            <option value="No answer">No answer</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Completed">Completed</option>
          </select>
          <button onclick="addFollowup()">+ Log</button>
        </div>
      </div>
    </div>
  </div>
</div>


</section>
`;

export const MOCS_LIVE_DEMO_SCRIPT = String.raw`// ══════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════
const patients=[
  {id:1339,name:'KUASHA BISWAS',passport:'A08977859',contact:'8801932044343',hospital:'APOLLO',city:'Chennai',dept:'Orthopedics',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'SHAFIQ'},
  {id:1350,name:'DEVKUMAR ADHIKARI',passport:'A14272680',contact:'8801970264536',hospital:'APOLLO',city:'Kolkata',dept:'Oncology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'S.K TOURS AND TRAVELS'},
  {id:1426,name:'MD HASNAIN AFRIDI',passport:'A14924337',contact:'8801686889426',hospital:'MANIPAL',city:'Kolkata',dept:'Pediatric Neurology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'SADIA TOURS AND TRAVELS'},
  {id:1464,name:'MD JASIM UDDIN KHAN',passport:'A08418859',contact:'8801718272422',hospital:'APOLLO',city:'Chennai',dept:'Hepatology',type:'IPD',status:'Treatment Done',handler:'Sayem',agent:'S.K TOURS AND TRAVELS'},
  {id:1480,name:'MD MANIR HOSSAIN',passport:'A06012398',contact:'8801779248201',hospital:'MANIPAL',city:'Kolkata',dept:'Nephrology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'MOHAMMADIA TRAVELS'},
  {id:1492,name:'MINA RANI CHAKRABORTY',passport:'A15553556',contact:'8801707561075',hospital:'MANIPAL',city:'Kolkata',dept:'Ophthalmic Surgery',type:'OPD',status:'Under Treatment',handler:'Sayem',agent:'SADIK COMPUTER'},
  {id:1503,name:'DR ABDUL QUYUM SELIM',passport:'A13136178',contact:'8801715633004',hospital:'FORTIS',city:'Delhi',dept:'Cardiology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:'BD TRAVELS'},
  {id:1505,name:'TONEMA ALAM',passport:'A08204696',contact:'8801999358710',hospital:'APOLLO',city:'Chennai',dept:'General Medicine',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'KAMAL TRAVEL'},
  {id:1570,name:'MD AMINUR ISLAM',passport:'A13451248',contact:'8801401746454',hospital:'APOLLO',city:'Chennai',dept:'Neurology',type:'IPD',status:'Treatment Done',handler:'Sayem',agent:'GHURBO TOURS'},
  {id:1580,name:'TANJIMA AKTER',passport:'A04314649',contact:'8801706505250',hospital:'MANIPAL',city:'Old Hal Rd',dept:'Cardiology',type:'OPD',status:'Under Treatment',handler:'Atiq',agent:''},
  {id:1609,name:'RASHADUZZAMAN',passport:'A16552672',contact:'8801722714654',hospital:'MANIPAL',city:'Kolkata',dept:'Gastroenterology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:'INDIA TOURS AND TRAVELS'},
  {id:1611,name:'MD SHAKIBUL HASAN CHOWDHURY',passport:'A05243290',contact:'8801713002704',hospital:'FORTIS',city:'Delhi',dept:'Oncology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'SADIA TOURS AND TRAVELS'},
  {id:1669,name:'SURENDRA NATH PAUL',passport:'A02467298',contact:'880182273771',hospital:'APOLLO',city:'Chennai',dept:'Cardiology',type:'OPD',status:'Treatment Done',handler:'Jeffry',agent:'Rumon tours and travel'},
  {id:1671,name:'JAHIRUL ISLAM',passport:'A06187632',contact:'8801814396652',hospital:'APOLLO',city:'Kolkata',dept:'ENT Surgery',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'ANISHA TRAVEL'},
  {id:1692,name:'MAHMUDUL HASAN',passport:'A01826421',contact:'8801914122886',hospital:'FORTIS',city:'Delhi',dept:'Cardiology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'KAMAL TRAVEL'},
  {id:1698,name:'MONOTOSH KUMAR DAW',passport:'A05657218',contact:'8801716887840',hospital:'APOLLO',city:'Kolkata',dept:'Orthopedic Surgery',type:'OPD',status:'Visa Approved',handler:'Sayem',agent:'SADIA TOURS AND TRAVELS'},
  {id:1702,name:'PARUL RANI ROY',passport:'A16770897',contact:'8801617118577',hospital:'APOLLO',city:'Chennai',dept:'Oncology',type:'OPD',status:'Treatment Done',handler:'Jafor',agent:'ARIF TRAVELS'},
  {id:1704,name:'AVISHEK PODDER',passport:'A17243530',contact:'8801819330770',hospital:'Max Hospital Saket',city:'Delhi',dept:'Neurology',type:'IPD',status:'Treatment Done',handler:'Sayem',agent:''},
  {id:1712,name:'MD RUHUL AMIN',passport:'A14525861',contact:'8801820147002',hospital:'APOLLO',city:'Kolkata',dept:'Cardiology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:'SADIA TOURS AND TRAVELS'},
  {id:1718,name:'ABIR HASAN',passport:'B00278625',contact:'8801716904620',hospital:'APOLLO',city:'Delhi',dept:'Nephrology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:''},
  {id:1736,name:'MAYA RANY GHOAH',passport:'A16053145',contact:'8801716696990',hospital:'MANIPAL',city:'Varthur',dept:'Psychiatry',type:'OPD',status:'Under Treatment',handler:'Sayem',agent:''},
  {id:1746,name:'BIPROJIT GHOSH',passport:'A13807650',contact:'8801726765954',hospital:'APOLLO',city:'Chennai',dept:'Endocrinology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'GENUINE COMPUTER'},
  {id:1753,name:'SUSMITA ISLAM',passport:'A02549106',contact:'8801553681348',hospital:'APOLLO',city:'Chennai',dept:'Hematology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'BHUIYA TRAVEL'},
  {id:1760,name:'RUPALI RANI',passport:'A17454624',contact:'8801715702618',hospital:'APOLLO',city:'Kolkata',dept:'Cardiology',type:'OPD',status:'Under Treatment',handler:'Sayem',agent:'ANISHA TRAVEL'},
  {id:1798,name:'SHEKH ANAS',passport:'A13309360',contact:'8801934494637',hospital:'APOLLO',city:'Kolkata',dept:'Neurology',type:'OPD',status:'Visa Approved',handler:'Sayem',agent:'ANISHA TRAVEL'},
  {id:1800,name:'RUJI ISLAM',passport:'A00354037',contact:'8801726494555',hospital:'APOLLO',city:'Delhi',dept:'Cardiology',type:'OPD',status:'Visa Approved',handler:'Sayem',agent:'Global zone travel'},
  {id:1807,name:'ATONU SAHA',passport:'A09200000',contact:'8801714527152',hospital:'APOLLO',city:'Chennai',dept:'Nephrology',type:'OPD',status:'Under Treatment',handler:'Sayem',agent:''},
  {id:1820,name:'MOHAMMAD JAMIL',passport:'A08048289',contact:'8801715762799',hospital:'APOLLO',city:'Kolkata',dept:'Endocrinology',type:'OPD',status:'Under Treatment',handler:'Sayem',agent:'Raju Computer'},
  {id:1833,name:'TAWSIF RAHMAN SAYON',passport:'A17726484',contact:'8801751338862',hospital:'APOLLO',city:'Chennai',dept:'Oncology',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'INDIA TOURS AND TRAVELS'},
  {id:1842,name:'MD ANOWAR HOSSAIN',passport:'A07173372',contact:'8801678322305',hospital:'APOLLO',city:'Chennai',dept:'Orthopedic Surgery',type:'OPD',status:'Treatment Done',handler:'Sayem',agent:'BISMILLAH TRAVELS'},
  {id:1846,name:'SHRESTHA ROY NANDI',passport:'A12003814',contact:'8801819468035',hospital:'APOLLO',city:'Kolkata',dept:'ENT Surgery',type:'OPD',status:'Visa Approved',handler:'Sayem',agent:'MOLLAH COMPUTER'},
  {id:1871,name:'SHABNAJ AKTER ANNA',passport:'A06180577',contact:'8801673645789',hospital:'APOLLO',city:'Kolkata',dept:'Obs & Gynecology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:''},
  {id:1882,name:'MD KABIR HOSSAIN',passport:'A03569927',contact:'8801734413672',hospital:'MANIPAL',city:'Kolkata',dept:'Cardiology',type:'OPD',status:'Visa Approved',handler:'Sayem',agent:''},
  {id:1895,name:'SHAMOL SARKER',passport:'A03292517',contact:'8801644365255',hospital:'FORTIS',city:'Kolkata',dept:'Gastroenterology',type:'OPD',status:'Scheduled',handler:'Sayem',agent:''},
  {id:1961,name:'MST SUMAIYA RAHMAN HIYA',passport:'A17666313',contact:'',hospital:'MANIPAL',city:'Varthur',dept:'Pulmonology',type:'OPD',status:'Under Treatment',handler:'',agent:''},
  {id:1985,name:'ISRATH SHAHARA',passport:'A05481000',contact:'',hospital:'APOLLO',city:'Chennai',dept:'Oncology',type:'OPD',status:'Under Treatment',handler:'',agent:''},
  {id:2110,name:'MALATI RANI MALICK',passport:'A18110556',contact:'',hospital:'MANIPAL',city:'Kolkata',dept:'Nephrology',type:'OPD',status:'Scheduled',handler:'',agent:''},
];

// Mask sensitive patient data for portfolio privacy
patients.forEach(p => {
  if (p.passport && p.passport.length > 2) p.passport = p.passport.slice(0, -2) + '**';
  if (p.contact && p.contact.length > 2) p.contact = p.contact.slice(0, -2) + '**';
});

const hospitals=[
  {name:'APOLLO',city:'Chennai',op:'5%',ip:'5%',vil:'149',tele:'৳7,950',pickup:'1,150–1,350'},
  {name:'APOLLO',city:'Kolkata',op:'8%',ip:'8%',vil:'149',tele:'৳7,950',pickup:'N/A'},
  {name:'APOLLO',city:'Delhi',op:'13%',ip:'9%',vil:'149',tele:'৳4,990',pickup:'1,050–1,150'},
  {name:'APOLLO',city:'Mumbai',op:'13%',ip:'13%',vil:'149',tele:'৳4,990',pickup:'1,650–1,750'},
  {name:'APOLLO',city:'Hyderabad',op:'13%',ip:'13%',vil:'149',tele:'৳4,990',pickup:'1,650–1,750'},
  {name:'APOLLO',city:'Bangalore',op:'13%',ip:'13%',vil:'149',tele:'৳4,990',pickup:'1,850–2,050'},
  {name:'MANIPAL',city:'Kolkata',op:'13%',ip:'8%',vil:'99',tele:'৳2,575',pickup:'N/A'},
  {name:'MANIPAL',city:'Old Hal Rd',op:'19%',ip:'19%',vil:'99',tele:'৳2,575',pickup:'1,950–2,050'},
  {name:'MANIPAL',city:'Varthur',op:'24%',ip:'24%',vil:'99',tele:'৳2,575',pickup:'1,950–2,050'},
  {name:'MANIPAL',city:'Whitefield',op:'24%',ip:'24%',vil:'99',tele:'৳2,575',pickup:'1,950–2,050'},
  {name:'MANIPAL',city:'Gurugram',op:'24%',ip:'24%',vil:'99',tele:'৳2,575',pickup:'1,950–2,050'},
  {name:'FORTIS',city:'Delhi',op:'18%',ip:'18%',vil:'99',tele:'৳2,850',pickup:'1,100–1,200'},
  {name:'FORTIS',city:'Kolkata',op:'18%',ip:'18%',vil:'99',tele:'৳2,850',pickup:'N/A'},
  {name:'Max Hospital Saket',city:'Delhi',op:'20%',ip:'20%',vil:'99',tele:'৳3,100',pickup:'1,000–1,100'},
  {name:'ARTEMIS GURGAON',city:'Delhi',op:'23%',ip:'23%',vil:'99',tele:'৳2,850',pickup:'1,100–1,200'},
  {name:'ASTER',city:'Bangalore',op:'10%',ip:'22%',vil:'99',tele:'৳2,600',pickup:'1,950–2,050'},
];

const commRates={
  'apollo-chennai':[5,5],'apollo-kolkata':[8,8],'apollo-delhi':[13,9],
  'manipal-kolkata':[13,8],'manipal-oldhal':[19,19],'manipal-varthur':[24,24],
  'fortis-delhi':[18,18],'max-delhi':[20,20],'artemis-delhi':[23,23],
};

const visaStages={
  'Applied':patients.filter(p=>p.id>1800&&p.status==='Scheduled').slice(0,7).map(p=>p.name),
  'Under Review':patients.filter(p=>p.id>1700&&p.id<1800&&p.status==='Scheduled').slice(0,3).map(p=>p.name),
  'Approved':patients.filter(p=>p.status==='Visa Approved').map(p=>p.name),
  'Travelling':patients.filter(p=>p.status==='Under Treatment').slice(0,4).map(p=>p.name),
};

// ── HELPERS ──────────────────────────────────────────────────
function hospClass(h=''){
  const u=h.trim().toUpperCase();
  if(u.startsWith('APOLLO'))return 'h-apollo';
  if(u.startsWith('MANIPAL'))return 'h-manipal';
  if(u.startsWith('FORTIS'))return 'h-fortis';
  if(u.startsWith('MAX'))return 'h-max';
  return 'h-other';
}
function statusPill(s){
  const m={
    'Under Treatment':'<span class="pill p-adv">Treatment</span>',
    'Treatment Done':'<span class="pill p-ok">Done ✓</span>',
    'Visa Approved':'<span class="pill p-due">Visa ✓</span>',
    'Scheduled':'<span class="pill p-gray">Scheduled</span>',
  };
  return m[s]||\`<span class="pill p-gray">\${s||'—'}</span>\`;
}
function fmt(n){return n>=100000?'৳'+Math.round(n/1000)+'K':'৳'+Math.round(n).toLocaleString();}
function setEl(id,v){const e=__mocsGet(id);if(e)e.textContent=v;}
function setHTML(id,v){const e=__mocsGet(id);if(e)e.innerHTML=v;}

// Sparkline
function renderSpark(id,vals,cls){
  const el=__mocsGet(id);if(!el)return;
  const mx=Math.max(...vals,1);
  el.innerHTML=vals.map((v,i)=>\`<div class="sk \${cls} \${i===vals.length-1?'hi':''}" style="height:\${Math.max(2,Math.round(v/mx*14))}px"></div>\`).join('');
}

// ── TOAST ────────────────────────────────────────────────────
let _toastT=null;
function showToast(msg){
  setEl('toast-msg',msg);
  const t=__mocsGet('toast');
  t.classList.add('show');
  clearTimeout(_toastT);
  _toastT=setTimeout(()=>t.classList.remove('show'),2600);
}

// ── DATE RANGE ───────────────────────────────────────────────
const DR=['Today','This Week','This Month','This Quarter','This Year'];
let drI=2;
function cycleDateRange(btn){drI=(drI+1)%DR.length;btn.textContent=DR[drI];showToast('Date range: '+DR[drI]);}

// ── REFRESH → see V7 implementation below ────────────────────

// ── EXPORT → see V7 implementation below ─────────────────────

// ── DROPDOWNS ────────────────────────────────────────────────
let _openPanel=null;
function togglePanel(name,e){
  e.stopPropagation();
  const panelId=name==='notif'?'notif-panel':'profile-panel';
  const panel=__mocsGet(panelId);
  const isOpen=panel.classList.contains('open');
  closeAllPanels();
  if(!isOpen){panel.classList.add('open');_openPanel=panelId;}
}
function closeAllPanels(){
  ['notif-panel','profile-panel'].forEach(id=>{const el=__mocsGet(id);if(el)el.classList.remove('open');});
  _openPanel=null;
}
__mocsAddDocEvent('click',closeAllPanels);

// ── NOTIFICATIONS ────────────────────────────────────────────
const notifs=[
  {txt:'SHEKH ANAS — Visa approved, ready to travel',t:'2m ago',read:false},
  {txt:'MD RUHUL AMIN — scheduled but no visa application yet',t:'15m ago',read:false},
  {txt:'3 patients in Applied stage for 14+ days — follow up',t:'1h ago',read:false},
  {txt:'Commission calculator updated with new Manipal rates',t:'2h ago',read:true},
  {txt:'MANIPAL Varthur OP rate updated to 24%',t:'Yesterday',read:true},
];
function renderNotifs(){
  const list=__mocsGet('notif-list');if(!list)return;
  list.innerHTML=notifs.map((n,i)=>\`
    <div class="notif-item \${n.read?'':'unread'}" onclick="markRead(\${i})">
      <div class="notif-dot-w"></div>
      <div style="flex:1"><div class="notif-txt">\${n.txt}</div><div class="notif-t">\${n.t}</div></div>
    </div>\`).join('');
  const u=notifs.filter(n=>!n.read).length;
  const badge=__mocsGet('notif-badge');
  if(badge){badge.textContent=u;badge.style.display=u?'flex':'none';}
}
function markRead(i){notifs[i].read=true;renderNotifs();}
function markAllRead(){notifs.forEach(n=>n.read=true);renderNotifs();showToast('All notifications marked read');}
renderNotifs();

// ── GLOBAL SEARCH ─────────────────────────────────────────────
// FIX 6: properly clears when empty; syncs on delayed view switch
function doGlobalSearch(q){
  if(!q.trim()){
    const inp=__mocsGet('pt-search');
    if(inp&&inp.value){inp.value='';filterPT();}
    return;
  }
  switchView('patients',1);
  setTimeout(()=>{
    const inp=__mocsGet('pt-search');
    if(inp){inp.value=q;filterPT();}
  },30);
}

// ── VIEW SWITCHER ─────────────────────────────────────────────
const viewNames=['dashboard','patients','visa','finance','hospitals','agents','analytics','reports','settings'];
const viewTitles=['Operations Dashboard','Patient Tracker','Visa Pipeline','Finance Engine','Hospital Network','Agent Management','Analytics & BI','Reports','Settings'];
function switchView(name,idx){
  __mocsAll('.view').forEach(v=>v.classList.remove('on'));
  __mocsAll('.app-rail-item').forEach(r=>r.classList.remove('on'));
  const view=__mocsGet('view-'+name);
  if(view)view.classList.add('on');
  const rail=__mocsGet('rail-'+name);
  if(rail)rail.classList.add('on');
  setEl('view-title',viewTitles[idx]||name);
  // lazy render
  if(name==='reports')renderReports();
  if(name==='agents')renderAgents();
}

// ── ANALYTICS TAB SWITCH ─────────────────────────────────────
let lcMode='week';
function switchAtab(idx,btn){
  // FIX 1: scope strictly to #view-analytics to avoid cross-contamination with lc buttons
  const analyticsView=__mocsGet('view-analytics');
  if(analyticsView){
    analyticsView.querySelectorAll('.atab-main-btn').forEach(b=>b.classList.remove('on'));
  }
  btn.classList.add('on');
  [0,1,2].forEach(i=>{const el=__mocsGet('atab-'+i);if(el)el.style.display=i===idx?'block':'none';});
  if(idx===1)renderTrendsCharts();
  if(idx===2)renderGeoCharts();
}
function switchLC(mode,btn){
  lcMode=mode;
  // FIX 10: use lc-btn class (not atab-btn) for line chart period buttons
  __mocsAll('.lc-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  renderLineChart();
}

// ── ADD PATIENT MODAL ────────────────────────────────────────
function openModal(){__mocsGet('add-modal').style.display='flex';}
function closeModal(){__mocsGet('add-modal').style.display='none';}
__mocsAddDocEvent('keydown',e=>{if(e.key==='Escape'){closeModal();closeDetail();}});

function updateCityOptions(){
  const hosp=__mocsGet('f-hospital').value;
  const cityMap={
    'APOLLO':['Chennai','Kolkata','Delhi','Mumbai','Hyderabad','Bangalore'],
    'MANIPAL':['Kolkata','Old Hal Rd','Varthur','Whitefield','Gurugram'],
    'FORTIS':['Delhi','Kolkata'],'Max Hospital Saket':['Delhi'],'ARTEMIS GURGAON':['Delhi'],
  };
  const cities=cityMap[hosp]||['Delhi'];
  const sel=__mocsGet('f-city');
  sel.innerHTML=cities.map(c=>\`<option>\${c}</option>\`).join('');
}

function addPatient(){
  const nameEl=__mocsGet('f-name');
  const name=nameEl.value.trim().toUpperCase();
  if(!name){
    nameEl.classList.add('error');
    showToast('⚠ Patient name is required');
    return;
  }
  const newId=Math.max(...patients.map(x=>x.id))+1;
  const svc=__mocsGet('f-service')?.value||'';
  const p={
    id:newId,name,
    passport:__mocsGet('f-passport').value||'—',
    contact:__mocsGet('f-contact').value||'—',
    hospital:__mocsGet('f-hospital').value,
    city:__mocsGet('f-city').value,
    dept:__mocsGet('f-dept').value||'General Medicine',
    type:__mocsGet('f-type').value,
    status:'Scheduled',
    handler:__mocsGet('f-handler').value,
    agent:__mocsGet('f-agent').value||'',
    service:svc,
    followups:[],
    addedAt:Date.now(),
  };
  patients.unshift(p);
  // FIX 7: only add to visa Applied if VIL service was requested
  if(svc.includes('VIL')){
    visaStages['Applied'].unshift(name);
  }
  closeModal();
  ['f-name','f-passport','f-contact','f-dept','f-note','f-agent'].forEach(id=>{const el=__mocsGet(id);if(el)el.value='';});
  // targeted re-renders only — avoid full renderAll for performance
  renderDashboard();
  renderSB(patients);
  filterPT();
  renderVisa();
  setLastUpdated();
  showToast(\`✓ Patient MBD-\${String(newId).padStart(4,'0')} added\`);
}

// ── PATIENT DETAIL MODAL ─────────────────────────────────────
// openDetail → see V7 implementation below (follow-up log + status advance)
function closeDetail(){__mocsGet('detail-modal').style.display='none';}

// ── CASE STUDY TABS ──────────────────────────────────────────
function switchTab(prefix,idx,el){
  const container=el.closest('.tab-system');
  container.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('on'));
  container.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
  const panel=__mocsGet(prefix+'-'+idx);
  if(panel)panel.classList.add('on');
}

// ── COMMISSION CALCULATOR (case study) ────────────────────────
// FIX 9: floor net at 0 — agent split can't exceed gross
function calcCommission(){
  const hosp=__mocsGet('cc-hospital')?.value;
  const ttype=__mocsGet('cc-type')?.value;
  const amt=parseFloat(__mocsGet('cc-amount')?.value)||0;
  const agentSplit=parseInt(__mocsGet('cc-agent-split')?.value)||4;
  if(!hosp)return;
  const rates=commRates[hosp]||[10,10];
  const pct=ttype==='op'?rates[0]:rates[1];
  const gross=amt*(pct/100);
  const agent=amt*(agentSplit/100);
  const net=Math.max(0,gross-agent);
  const f=n=>'৳'+Math.round(n).toLocaleString();
  setEl('cr-pct',pct+'%');setEl('cr-ci',f(gross));setEl('cr-agent',f(agent));setEl('cr-net',f(net));
  const sub=__mocsOne('#calc-result .calc-res-cell:nth-child(1) .calc-res-sub');
  if(sub)sub.textContent=(ttype==='op'?'OP':'IP')+' rate';
}
// calcCommission, calcDC, calcFC — all deferred to after DOM ready via initDashboard

// ── SIDEBAR ──────────────────────────────────────────────────
function renderSB(list){
  const sb=__mocsGet('sb-list');if(!sb)return;
  sb.innerHTML=list.slice(0,60).map(p=>{
    const c=p.status==='Under Treatment'?'var(--brand)':p.status==='Treatment Done'?'var(--gm)':p.status.includes('Visa')?'var(--am)':'var(--ln2)';
    return \`<div class="sb-item" onclick="openDetail(\${p.id})"><div style="display:flex;align-items:flex-start;gap:6px"><div style="width:5px;height:5px;border-radius:50%;background:\${c};margin-top:4px;flex-shrink:0"></div><div><div class="sb-item-name">\${p.name}</div><div class="sb-item-sub">\${p.hospital}·\${p.city}</div></div></div></div>\`;
  }).join('');
  setEl('sb-count',list.length);
}
function filterSB(q){renderSB(q?patients.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.hospital.toLowerCase().includes(q.toLowerCase())):patients);}
// renderSB is safe at parse time (no Chart.js needed)
renderSB(patients);

// ── PATIENT TABLE ─────────────────────────────────────────────
let ptSort={col:'id',dir:1},ptPage=0,ptFiltered=[...patients];
const PER_PAGE=8;
let activeQFilter='';

function qFilter(status){
  activeQFilter=status;
  __mocsAll('.qstat').forEach(el=>el.classList.remove('on'));
  const qsMap={'':'qs-all','Under Treatment':'qs-treat','Visa Approved':'qs-visa','Treatment Done':'qs-done','Scheduled':'qs-sched'};
  const target=__mocsGet(qsMap[status]);
  if(target)target.classList.add('on');
  __mocsGet('pt-stat').value=status;
  filterPT();
}

function clearPTFilters(){
  ['pt-search','pt-hosp','pt-stat','pt-type','pt-handler'].forEach(id=>{const el=__mocsGet(id);if(el)el.value='';});
  activeQFilter='';
  __mocsAll('.qstat').forEach(el=>el.classList.remove('on'));
  const allqs=__mocsGet('qs-all');if(allqs)allqs.classList.add('on');
  filterPT();
}

function filterByStatus(s){
  // FIX 8: use view name not DOM index — reliable regardless of rail order
  switchView('patients',1);
  setTimeout(()=>qFilter(s),30);
}

function filterPT(){
  const q=(__mocsGet('pt-search')?.value||'').toLowerCase();
  const h=__mocsGet('pt-hosp')?.value||'';
  const s=__mocsGet('pt-stat')?.value||'';
  const t=__mocsGet('pt-type')?.value||'';
  const c=__mocsGet('pt-handler')?.value||'';
  ptFiltered=patients.filter(p=>{
    const mq=!q||p.name.toLowerCase().includes(q)||p.passport.toLowerCase().includes(q)||(p.contact||'').includes(q)||(p.agent||'').toLowerCase().includes(q);
    const mh=!h||p.hospital.toUpperCase().includes(h.toUpperCase());
    const ms=!s||p.status===s;
    const mt=!t||p.type===t;
    const mc=!c||p.handler===c;
    return mq&&mh&&ms&&mt&&mc;
  });
  ptPage=0;
  renderPT();
}

function sortPT(col){
  if(ptSort.col===col)ptSort.dir*=-1;else{ptSort.col=col;ptSort.dir=1;}
  __mocsAll('.sort-ind').forEach(el=>{el.textContent='↕';el.classList.remove('on');});
  const si=__mocsGet('si-'+col);
  if(si){si.textContent=ptSort.dir===1?'↑':'↓';si.classList.add('on');}
  ptPage=0;renderPT();
}

// renderPT and filterPT → called by initDashboard after DOM ready

// ── VISA ─────────────────────────────────────────────────────
let vilFilter='';
function filterVIL(stage){
  vilFilter=vilFilter===stage?'':stage;
  renderVisa();
}

// renderVisa → V7 version below (drag+drop + days-in-stage)


// ── FINANCE ──────────────────────────────────────────────────
function renderFinance(){
  const done=patients.filter(p=>p.status==='Treatment Done');
  const avgBill=85000;
  let totalComm=0;
  done.forEach(p=>{
    const hKey=(p.hospital.toLowerCase().startsWith('apollo')?'apollo':p.hospital.toLowerCase().startsWith('manipal')?'manipal':p.hospital.toLowerCase().startsWith('fortis')?'fortis':p.hospital.toLowerCase().startsWith('max')?'max':'artemis')+'-'+(p.city||'').toLowerCase().replace(/\\s+/g,'-');
    const rates=commRates[hKey]||[10,10];
    totalComm+=avgBill*((p.type==='OPD'?rates[0]:rates[1])/100);
  });
  const vil=patients.length*149;
  setEl('fin-vil',fmt(vil));setEl('fin-comm',fmt(totalComm));setEl('fin-agent',fmt(totalComm*0.4));setEl('fin-net',fmt(totalComm*0.6));
  // Revenue bars
  const hr={Apollo:0,Manipal:0,Fortis:0,Max:0,Artemis:0};
  done.forEach(p=>{
    const k=p.hospital.startsWith('APOLLO')?'Apollo':p.hospital.startsWith('MANIPAL')?'Manipal':p.hospital.startsWith('FORTIS')?'Fortis':p.hospital.startsWith('Max')?'Max':'Artemis';
    const r={Apollo:5,Manipal:18,Fortis:18,Max:20,Artemis:23}[k]||10;
    hr[k]+=avgBill*(r/100);
  });
  const maxR=Math.max(...Object.values(hr),1);
  const revHTML=Object.entries(hr).sort((a,b)=>b[1]-a[1]).map(([n,v])=>\`<div class="rev-bar-row"><span class="rev-bar-lbl">\${n}</span><div class="rev-bar-track"><div class="rev-bar-fill" style="width:\${Math.round(v/maxR*100)}%"></div></div><span class="rev-bar-val">\${v>1000?fmt(v):'৳0'}</span></div>\`).join('');
  setHTML('fin-rev-bars',revHTML);
  // Rate table
  const tb=__mocsGet('fin-body');
  if(!tb)return;
  tb.innerHTML=hospitals.map(h=>\`<tr>
    <td><span class="h-badge \${hospClass(h.name)}">\${h.name}</span></td>
    <td style="font-size:9px;color:var(--ink3)">\${h.city}</td>
    <td style="font-family:var(--mono);font-size:9px;color:var(--brand);font-weight:700">৳\${h.vil}</td>
    <td style="font-family:var(--mono);font-size:9px;color:var(--am);font-weight:700">\${h.op}</td>
    <td style="font-family:var(--mono);font-size:9px;color:var(--bm);font-weight:700">\${h.ip}</td>
    <td style="font-size:9px;color:var(--ink3)">\${h.tele}</td>
    <td style="font-size:9px;color:var(--ink3)">\${h.pickup==='N/A'?'—':'৳'+h.pickup}</td>
  </tr>\`).join('');
}
// renderFinance called by initDashboard

// ── HOSPITALS ─────────────────────────────────────────────────
function renderHospitals(){
  const g=__mocsGet('hosp-grid');
  if(g){
    const unique=[...new Set(hospitals.map(h=>h.name))];
    g.innerHTML=unique.map(name=>{
      const hs=hospitals.filter(h=>h.name===name);
      const cnt=patients.filter(p=>p.hospital===name).length;
      return \`<div class="h-card-demo"><div class="h-card-head"><span class="h-badge \${hospClass(name)}">\${name}</span><span style="font-family:var(--mono);font-size:8px;color:var(--ink4)">\${hs.length} loc · \${cnt}pts</span></div><div class="h-card-locs">\${hs.map(h=>\`<div class="h-loc-row"><span class="h-loc-city">\${h.city}</span><span class="h-loc-rates">OP \${h.op} · IP \${h.ip}</span></div>\`).join('')}</div></div>\`;
    }).join('');
  }
  const rt=__mocsGet('hosp-rate-body');
  if(rt){
    rt.innerHTML=hospitals.map(h=>\`<tr>
      <td><span class="h-badge \${hospClass(h.name)}">\${h.name}</span></td>
      <td style="font-size:9px;color:var(--ink3)">\${h.city}</td>
      <td style="font-family:var(--mono);font-size:9px;color:var(--brand)">৳\${h.vil}</td>
      <td style="font-family:var(--mono);font-size:9px;color:var(--am)">\${h.op}</td>
      <td style="font-family:var(--mono);font-size:9px;color:var(--bm)">\${h.ip}</td>
      <td style="font-size:9px;color:var(--ink3)">\${h.tele}</td>
      <td style="font-size:9px;color:var(--ink3)">\${h.pickup==='N/A'?'—':'৳'+h.pickup}</td>
    </tr>\`).join('');
  }
}
// renderHospitals called by initDashboard

// renderAgents → V7 version below (clickable cards + conversion rate)


// FIX 3: deterministic hash so revenue never changes on re-render
function seededRnd(seed){let x=Math.sin(seed+1)*10000;return x-Math.floor(x);}

// ── REPORTS ───────────────────────────────────────────────────
function renderReports(){
  const months=['December 2024','November 2024','October 2024','September 2024','August 2024','July 2024'];
  const counts=[48,42,38,51,44,36];
  const arch=__mocsGet('report-archive');
  if(arch){
    arch.innerHTML=months.map((m,i)=>\`<div class="report-row" onclick="showToast('↓ Downloading \${m} report…')"><div><div class="report-name">\${m} Monthly Operations Report</div><div class="report-meta">\${counts[i]} patients · PDF · 2.1 MB</div></div><span class="report-dl">↓ PDF</span></div>\`).join('');
  }
  setEl('rpt-month',patients.filter(p=>p.id>2000).length+48);
  const deptM={};
  patients.forEach(p=>{if(p.dept){const k=p.dept.slice(0,20);if(!deptM[k])deptM[k]={t:0,done:0,treat:0};deptM[k].t++;if(p.status==='Treatment Done')deptM[k].done++;else if(p.status==='Under Treatment')deptM[k].treat++;}});
  const ob=__mocsGet('outcome-body');
  if(ob){
    ob.innerHTML=Object.entries(deptM).sort((a,b)=>b[1].t-a[1].t).slice(0,10).map(([dept,s])=>{
      const rate=Math.round(s.done/s.t*100);
      const est=fmt(Math.round(85000*(0.07+seededRnd(dept.charCodeAt(0)+dept.length)*0.12)));
      return \`<tr><td style="font-size:10px;font-weight:500;color:var(--ink)">\${dept}</td><td><span class="pill p-adv">\${s.t}</span></td><td><span class="pill p-ok">\${s.done}</span></td><td><span class="pill p-blu">\${s.treat}</span></td><td><span style="font-family:var(--mono);font-size:9px">\${rate}%</span><div class="outcome-bar"><div class="outcome-fill" style="width:\${rate}%;background:\${rate>70?'var(--gm)':'var(--am)'}"></div></div></td><td style="font-family:var(--mono);font-size:9px;color:var(--brand)">\${est}</td></tr>\`;
    }).join('');
  }
}

// ── CHARTS ────────────────────────────────────────────────────
let _charts={};
function destroyChart(id){if(_charts[id])try{_charts[id].destroy();}catch(e){}delete _charts[id];}
function makeChart(id,config){
  destroyChart(id);
  const canvas=__mocsGet(id);
  if(!canvas||typeof Chart==='undefined')return;
  _charts[id]=new Chart(canvas,config);
}

function renderDashCharts(){
  if(typeof Chart==='undefined')return;
  // Hospital doughnut
  const hc={};patients.forEach(p=>{const k=p.hospital.startsWith('APOLLO')?'Apollo':p.hospital.startsWith('MANIPAL')?'Manipal':p.hospital.startsWith('FORTIS')?'Fortis':p.hospital.startsWith('Max')?'Max':p.hospital.startsWith('ARTEMIS')?'Artemis':'Other';hc[k]=(hc[k]||0)+1;});
  const hl=Object.keys(hc),hd=Object.values(hc),hcol=['#d97706','#4F46E5','#059669','#DC2626','#7C3AED','#64748B'];
  makeChart('chart-hosp',{type:'doughnut',data:{labels:hl,datasets:[{data:hd,backgroundColor:hcol,borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>{const t=hd.reduce((a,b)=>a+b,0);return \` \${c.label}: \${c.parsed} (\${Math.round(c.parsed/t*100)}%)\`;}}}}},});
  const leg=__mocsGet('hosp-legend');
  if(leg)leg.innerHTML=hl.map((l,i)=>\`<div style="display:flex;align-items:center;gap:3px;font-size:8px;color:var(--ink3)"><span style="width:7px;height:7px;border-radius:50%;background:\${hcol[i]};flex-shrink:0"></span>\${l}&nbsp;<span style="font-family:var(--mono);color:var(--ink4)">\${Math.round(hd[i]/patients.length*100)}%</span></div>\`).join('');
  setEl('total-badge',patients.length+' cases');
  // Status bar
  const sl=['Treatment Done','Under Treatment','Visa Approved','Scheduled'],sd=sl.map(s=>patients.filter(p=>p.status===s).length),sc=['#059669','#4F46E5','#D97706','#94A3B8'];
  makeChart('chart-status',{type:'bar',data:{labels:sl.map(s=>s.split(' ').slice(-1)[0]),datasets:[{data:sd,backgroundColor:sc,borderRadius:4,borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>\` \${c.parsed.y} patients\`}}},scales:{x:{grid:{display:false},ticks:{font:{size:8},color:'#94A3B8'}},y:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8',stepSize:2}}}},});
  // OPD/IPD
  const opd=patients.filter(p=>p.type==='OPD').length,ipd=patients.filter(p=>p.type==='IPD').length;
  makeChart('chart-type',{type:'doughnut',data:{labels:['OPD','IPD'],datasets:[{data:[opd,ipd],backgroundColor:['#4F46E5','#2563EB'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'62%',plugins:{legend:{position:'bottom',labels:{font:{size:8},padding:6,color:'#64748B',boxWidth:8}},tooltip:{callbacks:{label:c=>{const t=opd+ipd;return \` \${c.label}: \${c.parsed} (\${Math.round(c.parsed/t*100)}%)\`;}}}}},});
  // Top departments horizontal bar
  const dm={};patients.forEach(p=>{if(p.dept)dm[p.dept]=(dm[p.dept]||0)+1;});
  const td=Object.entries(dm).sort((a,b)=>b[1]-a[1]).slice(0,7);
  makeChart('chart-dept',{type:'bar',data:{labels:td.map(([d])=>d.length>14?d.slice(0,13)+'…':d),datasets:[{data:td.map(([,v])=>v),backgroundColor:'#4F46E5',borderRadius:3,borderWidth:0}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>\` \${c.parsed.x} patients\`}}},scales:{x:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8'}},y:{grid:{display:false},ticks:{font:{size:9},color:'#64748B'}}}},});
}

function renderLineChart(){
  if(typeof Chart==='undefined')return;
  const cfg={week:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],data:[4,6,3,7,5,8,6]},month:{labels:['W1','W2','W3','W4'],data:[12,18,14,21]},quarter:{labels:['Oct','Nov','Dec','Jan','Feb','Mar'],data:[28,35,30,38,37,42]}};
  const d=cfg[lcMode]||cfg.week;
  makeChart('chart-trend',{type:'line',data:{labels:d.labels,datasets:[{label:'Patients',data:d.data,borderColor:'#4F46E5',backgroundColor:'rgba(79,70,229,.07)',borderWidth:2,pointRadius:3,pointBackgroundColor:'#4F46E5',fill:true,tension:.35}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>\` \${c.parsed.y} patients\`}}},scales:{x:{grid:{display:false},ticks:{font:{size:8},color:'#94A3B8'}},y:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8',stepSize:4}}}},});
}

function renderSpecialtyChart(){
  if(typeof Chart==='undefined')return;
  const dm={};patients.forEach(p=>{if(p.dept)dm[p.dept]=(dm[p.dept]||0)+1;});
  const top=Object.entries(dm).sort((a,b)=>b[1]-a[1]).slice(0,6);
  makeChart('chart-specialty',{type:'doughnut',data:{labels:top.map(([d])=>d.slice(0,12)),datasets:[{data:top.map(([,v])=>v),backgroundColor:['#4F46E5','#059669','#D97706','#DC2626','#7C3AED','#2563EB'],borderWidth:0,hoverOffset:4}]},options:{responsive:true,maintainAspectRatio:false,cutout:'50%',plugins:{legend:{position:'right',labels:{font:{size:8},padding:5,color:'#64748B',boxWidth:8}}}},});
}

function renderTrendsCharts(){
  if(typeof Chart==='undefined')return;
  makeChart('chart-monthly',{type:'bar',data:{labels:['Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{label:'OPD',data:[22,36,40,30,34,48],backgroundColor:'#4F46E5',borderRadius:3,stack:'a'},{label:'IPD',data:[7,8,11,8,8,9],backgroundColor:'#2563EB',borderRadius:3,stack:'a'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:8},padding:8,boxWidth:8}}},scales:{x:{grid:{display:false},ticks:{font:{size:8},color:'#94A3B8'},stacked:true},y:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8'},stacked:true}}},});
  makeChart('chart-opd-ipd',{type:'line',data:{labels:['Jul','Aug','Sep','Oct','Nov','Dec'],datasets:[{label:'OPD',data:[22,36,40,30,34,48],borderColor:'#4F46E5',borderWidth:2,pointRadius:3,fill:false,tension:.35},{label:'IPD',data:[7,8,11,8,8,9],borderColor:'#2563EB',borderWidth:2,pointRadius:3,fill:false,tension:.35}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{font:{size:8},padding:6,boxWidth:8}}},scales:{x:{grid:{display:false},ticks:{font:{size:8},color:'#94A3B8'}},y:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8'}}}},});
  const stats=['Treatment Done','Under Treatment','Visa Approved','Scheduled'];
  const colors=['var(--gm)','var(--brand)','var(--am)','var(--ln2)'];
  const t=patients.length;
  setHTML('status-dist',stats.map((s,i)=>{const n=patients.filter(p=>p.status===s).length;const pct=Math.round(n/t*100);return \`<div class="rev-bar-row" style="margin-bottom:5px"><span class="rev-bar-lbl" style="width:86px;font-size:8px">\${s}</span><div class="rev-bar-track"><div class="rev-bar-fill" style="width:\${pct}%;background:\${colors[i]}"></div></div><span class="rev-bar-val">\${n}</span></div>\`;}).join(''));
}

function renderGeoCharts(){
  const countries=[{f:'🇧🇩',n:'Bangladesh',cnt:patients.length,t:'+12%'},{f:'🇲🇲',n:'Myanmar',cnt:6,t:'+2%'},{f:'🇳🇵',n:'Nepal',cnt:4,t:'—'},{f:'🇵🇰',n:'Pakistan',cnt:2,t:'new'},{f:'🇱🇰',n:'Sri Lanka',cnt:1,t:'new'}];
  const maxC=patients.length;
  setHTML('geo-countries',countries.map(c=>\`<div class="country-row"><div style="display:flex;align-items:center;gap:6px"><span style="font-size:13px">\${c.f}</span><span class="country-name">\${c.n}</span></div><div style="display:flex;align-items:center;gap:8px"><div style="width:50px;height:3px;background:var(--off2);border-radius:2px;overflow:hidden"><div style="width:\${Math.round(c.cnt/maxC*100)}%;height:100%;background:var(--brand)"></div></div><span class="country-trend \${c.t.startsWith('-')?'dn':''}">\${c.t}</span><span class="country-count">\${c.cnt}</span></div></div>\`).join(''));
  if(typeof Chart==='undefined')return;
  const cm={};patients.forEach(p=>{cm[p.city]=(cm[p.city]||0)+1;});
  const tc=Object.entries(cm).sort((a,b)=>b[1]-a[1]).slice(0,8);
  makeChart('chart-cities',{type:'bar',data:{labels:tc.map(([c])=>c),datasets:[{data:tc.map(([,v])=>v),backgroundColor:'#4F46E5',borderRadius:3,borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{font:{size:8},color:'#94A3B8'}},y:{grid:{color:'#F1F5F9'},ticks:{font:{size:8},color:'#94A3B8'}}}},});
}

// ── ANALYTICS OVERVIEW ───────────────────────────────────────
function renderAnalyticsOverview(){
  if(typeof Chart==='undefined')return;
  renderLineChart();
  renderSpecialtyChart();
  // Coordinator efficiency bars
  const eff=__mocsGet('coord-eff');
  if(eff){
    const names=['Sayem','Atiq','Jafor','Dihan','Jeffry'];
    eff.innerHTML=names.map(n=>{
      const act=patients.filter(p=>p.handler===n);
      const done=act.filter(p=>p.status==='Treatment Done').length;
      const r=act.length?Math.round(done/act.length*100):0;
      return \`<div class="rev-bar-row" style="margin-bottom:5px">
        <span class="rev-bar-lbl" style="width:42px">\${n}</span>
        <div class="rev-bar-track"><div class="rev-bar-fill" style="width:\${r}%;background:\${r>70?'var(--gm)':r>40?'var(--am)':'var(--rm)'}"></div></div>
        <span class="rev-bar-val">\${r}%</span>
      </div>\`;
    }).join('');
  }
  // Revenue by hospital bars
  const rhl=__mocsGet('rev-hosp-list');
  if(rhl){
    const hr={Apollo:0,Manipal:0,Fortis:0,Max:0};
    patients.filter(p=>p.status==='Treatment Done').forEach(p=>{
      const k=p.hospital.startsWith('APOLLO')?'Apollo':p.hospital.startsWith('MANIPAL')?'Manipal':p.hospital.startsWith('FORTIS')?'Fortis':p.hospital.startsWith('Max')?'Max':null;
      if(!k)return;
      hr[k]+=85000*({Apollo:5,Manipal:18,Fortis:18,Max:20}[k]/100);
    });
    const mR=Math.max(...Object.values(hr),1);
    rhl.innerHTML=Object.entries(hr).sort((a,b)=>b[1]-a[1]).map(([n,v])=>\`
      <div class="rev-bar-row" style="margin-bottom:5px">
        <span class="rev-bar-lbl" style="width:42px">\${n}</span>
        <div class="rev-bar-track"><div class="rev-bar-fill" style="width:\${Math.round(v/mR*100)}%"></div></div>
        <span class="rev-bar-val">\${v>1000?fmt(v):'—'}</span>
      </div>\`).join('');
  }
  // Discharge stats
  const ds=__mocsGet('discharge-stats');
  if(ds){
    const done=patients.filter(p=>p.status==='Treatment Done').length;
    const active=patients.filter(p=>p.status==='Under Treatment').length;
    ds.innerHTML=\`
      <div style="margin-bottom:8px">
        <div class="dm-field-lbl">Completion Rate</div>
        <div style="font-size:26px;font-weight:800;color:var(--gm);letter-spacing:-.04em">\${Math.round(done/patients.length*100)}%</div>
      </div>
      <div style="margin-bottom:6px">
        <div class="dm-field-lbl">Active Treatment</div>
        <div style="font-size:18px;font-weight:700;color:var(--brand)">\${active}</div>
      </div>
      <div>
        <div class="dm-field-lbl">Avg Cycle (est.)</div>
        <div style="font-size:18px;font-weight:700;color:var(--am)">18 days</div>
      </div>\`;
  }
}

// ── DASHBOARD RENDER ──────────────────────────────────────────
// renderDashboard → V7 version below (follow-up alert + lastUpdated)

// ── RENDER ALL ────────────────────────────────────────────────
function renderAll(){
  renderDashboard();
  renderSB(patients);
  filterPT();
  renderVisa();
  renderFinance();
  renderHospitals();
  renderAgents();
  renderReports();
  calcDC();calcFC();
  try{calcCommission();}catch(e){}
}

// FIX 2: defer — defined here as a stub; actual call at bottom after all V7 overrides
function initDashboard(){
  if(typeof Chart==='undefined'){
    setTimeout(initDashboard,80);return;
  }
  renderAll();
  renderAnalyticsOverview();
}
// NOTE: initDashboard() is invoked at the very bottom of the script block,
// after all V7 override functions are fully defined.

// ── SCROLL ANIMATIONS ─────────────────────────────────────────
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.1});
__mocsAll('.fade').forEach(el=>io.observe(el));

// ══════════════════════════════════════════════════════════════
// V7 FEATURE IMPLEMENTATIONS
// ══════════════════════════════════════════════════════════════

// ── LAST UPDATED TIMESTAMP ───────────────────────────────────
function setLastUpdated(){
  const now=new Date();
  const h=now.getHours().toString().padStart(2,'0');
  const m=now.getMinutes().toString().padStart(2,'0');
  const s=now.getSeconds().toString().padStart(2,'0');
  setEl('last-updated',\`Updated \${h}:\${m}:\${s}\`);
}
setLastUpdated();

// ── DARK MODE ─────────────────────────────────────────────────
let _dark=false;
function toggleDarkMode(){
  _dark=!_dark;
  const app=__mocsGet('mocs-app');
  if(app)app.classList.toggle('dark',_dark);
  // sync settings toggle
  const tog=__mocsGet('dark-mode-toggle');
  if(tog)tog.classList.toggle('on',_dark);
  // sync topbar icon
  const btn=__mocsGet('dark-toggle');
  if(btn)btn.style.color=_dark?'var(--brand)':'';
  showToast(_dark?'🌙 Dark mode on':'☀️ Light mode on');
}

// ── CONNECTED COMMISSION SPLIT ────────────────────────────────
// Global split % that all calculators read
let _ciSplit=60; // CI gets 60%, agent gets 40%

function onSplitChange(val){
  _ciSplit=parseInt(val);
  const agentPct=100-_ciSplit;
  setEl('ci-split-display',\`\${_ciSplit}% CI · \${agentPct}% Agent\`);
  // recalculate all calculators live
  calcDC();calcFC();
  try{calcCommission();}catch(e){}
  showToast(\`Commission split: \${_ciSplit}% CI / \${agentPct}% Agent\`);
}

// Override calcDC and calcFC to use _ciSplit
function calcDC(){
  const hosp=__mocsGet('dc-hosp')?.value;
  const type=__mocsGet('dc-type')?.value;
  const amt=parseFloat(__mocsGet('dc-amt')?.value)||0;
  if(!hosp)return;
  const rates=commRates[hosp]||[10,10];
  const pct=type==='op'?rates[0]:rates[1];
  const gross=amt*(pct/100);
  const agent=gross*(1-_ciSplit/100);
  const net=gross-agent;
  setEl('dc-pct',pct+'%');setEl('dc-gross',fmt(gross));setEl('dc-agent',fmt(agent));setEl('dc-net',fmt(net));
}

function calcFC(){
  const hosp=__mocsGet('fc-hosp')?.value;
  const type=__mocsGet('fc-type')?.value;
  const amt=parseFloat(__mocsGet('fc-amt')?.value)||0;
  const agSplit=parseInt(__mocsGet('fc-split')?.value)||4;
  if(!hosp)return;
  const rates=commRates[hosp]||[10,10];
  const pct=type==='op'?rates[0]:rates[1];
  const gross=amt*(pct/100);
  const agent=amt*(agSplit/100);
  const net=Math.max(0,gross-agent);
  setEl('fc-pct',pct+'%');setEl('fc-gross',fmt(gross));setEl('fc-agent',fmt(agent));setEl('fc-net',fmt(net));
}

// ── REAL CSV EXPORT ───────────────────────────────────────────
function doExport(){
  const headers=['ID','Name','Passport','Contact','Hospital','City','Department','Type','Status','Handler','Agent'];
  const rows=patients.map(p=>[
    \`MBD-\${String(p.id).padStart(4,'0')}\`,
    \`"\${p.name}"\`,p.passport,p.contact,p.hospital,p.city,
    \`"\${p.dept||''}"\`,p.type,p.status,p.handler||'',\`"\${p.agent||''}"\`
  ].join(','));
  const csv=[headers.join(','),...rows].join('\\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download='MOCS-patients-export.csv';
  document.body.appendChild(a);a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('✓ CSV exported — MOCS-patients-export.csv');
}

// ── FOLLOW-UP LOG ─────────────────────────────────────────────
let _detailPid=null;

function openDetail(pid){
  // FIX 5: guard — id 0 means patient not found in array, bail gracefully
  if(!pid||pid<=0)return;
  const p=patients.find(x=>x.id===pid);if(!p)return;
  _detailPid=pid;
  if(!p.followups)p.followups=[];
  setEl('dm-name',p.name);
  setEl('dm-id-sub',\`MBD-\${String(p.id).padStart(4,'0')} · \${p.passport||'No passport'}\`);
  setHTML('dm-hospital',\`<span class="h-badge \${hospClass(p.hospital)}">\${p.hospital}</span>\`);
  setEl('dm-city',p.city||'—');
  setEl('dm-dept',p.dept||'—');
  setHTML('dm-type',\`<span class="pill \${p.type==='IPD'?'p-blu':'p-gray'}">\${p.type}</span>\`);
  setEl('dm-passport',p.passport||'—');
  setEl('dm-contact',p.contact||'—');
  setEl('dm-handler',p.handler||'Unassigned');
  setEl('dm-agent',p.agent||'Direct / No agent');
  setHTML('dm-status-pill',statusPill(p.status));
  // Journey with advance button
  const steps=['Registered','VIL','Visa','Travelling','Treatment','Done'];
  const idxMap={'Scheduled':1,'Visa Approved':2,'Under Treatment':4,'Treatment Done':5};
  const nextMap={'Scheduled':'Visa Approved','Visa Approved':'Under Treatment','Under Treatment':'Treatment Done'};
  const nextLabel={'Scheduled':'→ Visa Approved','Visa Approved':'→ Under Treatment','Under Treatment':'→ Treatment Done'};
  const active=idxMap[p.status]||0;
  setHTML('dm-journey',steps.map((s,i)=>{
    const cls=i<active?'done':i===active?'active':'';
    return \`<div class="jstep \${cls}"><div class="jstep-circle">\${cls==='done'?'✓':cls==='active'?'●':i+1}</div><div class="jstep-lbl">\${s}</div></div>\`;
  }).join(''));
  const advanceDiv=__mocsGet('dm-advance');
  const advanceBtn=__mocsGet('dm-advance-btn');
  const advanceLbl=__mocsGet('dm-advance-lbl');
  if(advanceDiv&&advanceBtn&&advanceLbl){
    const next=nextMap[p.status];
    if(next){
      advanceDiv.style.display='flex';
      advanceLbl.textContent=nextLabel[p.status];
      advanceBtn.disabled=false;
    }else{
      advanceDiv.style.display=p.status==='Treatment Done'?'none':'flex';
      if(p.status==='Treatment Done'){advanceDiv.style.display='none';}
    }
  }
  // Commission
  const hKey=(p.hospital.toLowerCase().startsWith('apollo')?'apollo':p.hospital.toLowerCase().startsWith('manipal')?'manipal':p.hospital.toLowerCase().startsWith('fortis')?'fortis':p.hospital.toLowerCase().startsWith('max')?'max':'artemis')+'-'+(p.city||'').toLowerCase().replace(/\\s+/g,'-');
  const rates=commRates[hKey]||[10,10];
  const rate=p.type==='OPD'?rates[0]:rates[1];
  setEl('dm-rate',rate+'%');
  setEl('dm-comm',fmt(85000*(rate/100)));
  // Follow-up log
  renderFollowupLog(p);
  __mocsGet('detail-modal').style.display='flex';
}

function renderFollowupLog(p){
  const list=__mocsGet('dm-followup-list');
  const count=__mocsGet('dm-followup-count');
  if(!list)return;
  const entries=p.followups||[];
  setEl('dm-followup-count',\`\${entries.length} entr\${entries.length===1?'y':'ies'}\`);
  if(!entries.length){
    list.innerHTML='<div class="followup-empty">No follow-up entries yet — add the first one below</div>';
    return;
  }
  list.innerHTML=[...entries].reverse().map(f=>\`
    <div class="followup-entry">
      <div class="followup-date">\${f.date} · <span style="color:var(--brand)">\${f.outcome}</span></div>
      <div class="followup-note">\${f.note}</div>
      <div class="followup-by">— \${f.by}</div>
    </div>\`).join('');
}

function addFollowup(){
  if(!_detailPid)return;
  const p=patients.find(x=>x.id===_detailPid);if(!p)return;
  const noteEl=__mocsGet('fu-note');
  const note=(noteEl?.value||'').trim();
  if(!note){noteEl?.focus();return;}
  const outcome=__mocsGet('fu-outcome')?.value||'Contacted';
  if(!p.followups)p.followups=[];
  const now=new Date();
  const date=\`\${now.getDate().toString().padStart(2,'0')}/\${(now.getMonth()+1).toString().padStart(2,'0')}/\${now.getFullYear()} \${now.getHours().toString().padStart(2,'0')}:\${now.getMinutes().toString().padStart(2,'0')}\`;
  p.followups.push({date,note,outcome,by:'Sayem'});
  if(noteEl)noteEl.value='';
  renderFollowupLog(p);
  // Update notifications
  notifs.unshift({txt:\`Follow-up logged for \${p.name}: "\${note.slice(0,40)}"\`,t:'just now',read:false});
  renderNotifs();
  showToast('✓ Follow-up logged');
}

// ── STATUS ADVANCE (state machine) ───────────────────────────
const STATUS_CHAIN=['Scheduled','Visa Approved','Under Treatment','Treatment Done'];
function advancePatientStatus(){
  if(!_detailPid)return;
  const p=patients.find(x=>x.id===_detailPid);if(!p)return;
  const idx=STATUS_CHAIN.indexOf(p.status);
  if(idx===-1||idx>=STATUS_CHAIN.length-1)return;
  const oldStatus=p.status;
  p.status=STATUS_CHAIN[idx+1];
  // update visa stages derived data
  if(p.status==='Visa Approved'){
    // remove from Applied/Under Review, add to Approved
    ['Applied','Under Review'].forEach(stage=>{
      const i=visaStages[stage].indexOf(p.name);
      if(i>-1)visaStages[stage].splice(i,1);
    });
    if(!visaStages['Approved'].includes(p.name))visaStages['Approved'].push(p.name);
  }else if(p.status==='Under Treatment'){
    const i=visaStages['Approved'].indexOf(p.name);
    if(i>-1)visaStages['Approved'].splice(i,1);
    if(!visaStages['Travelling'].includes(p.name))visaStages['Travelling'].push(p.name);
  }else if(p.status==='Treatment Done'){
    const i=visaStages['Travelling'].indexOf(p.name);
    if(i>-1)visaStages['Travelling'].splice(i,1);
  }
  // auto-log the advancement
  if(!p.followups)p.followups=[];
  const now=new Date();
  const date=\`\${now.getDate().toString().padStart(2,'0')}/\${(now.getMonth()+1).toString().padStart(2,'0')}/\${now.getFullYear()} \${now.getHours().toString().padStart(2,'0')}:\${now.getMinutes().toString().padStart(2,'0')}\`;
  p.followups.push({date,note:\`Status advanced: \${oldStatus} → \${p.status}\`,outcome:'Confirmed',by:'System'});
  // refresh modal
  openDetail(_detailPid);
  // refresh affected views
  renderDashboard();filterPT();renderVisa();setLastUpdated();
  showToast(\`✓ Status → \${p.status}\`);
}

// ── INLINE STATUS CHANGE in patient table ────────────────────
function changePatientStatus(pid,newStatus){
  const p=patients.find(x=>x.id===pid);if(!p)return;
  const oldStatus=p.status;
  if(oldStatus===newStatus)return;
  p.status=newStatus;
  if(!p.followups)p.followups=[];
  const now=new Date();
  const date=\`\${now.getDate().toString().padStart(2,'0')}/\${(now.getMonth()+1).toString().padStart(2,'0')}/\${now.getFullYear()} \${now.getHours().toString().padStart(2,'0')}:\${now.getMinutes().toString().padStart(2,'0')}\`;
  p.followups.push({date,note:\`Status changed: \${oldStatus} → \${newStatus}\`,outcome:'Confirmed',by:'Coordinator'});
  // bump KPI animation
  const kpiMap={'Scheduled':'kpi-sched','Visa Approved':'kpi-visa','Under Treatment':'kpi-treat','Treatment Done':'kpi-done'};
  [kpiMap[oldStatus],kpiMap[newStatus]].forEach(id=>{
    const el=__mocsGet(id);
    if(el){el.classList.remove('kpi-bump');void el.offsetWidth;el.classList.add('kpi-bump');}
  });
  renderDashboard();filterPT();renderVisa();setLastUpdated();
  showToast(\`✓ \${p.name.split(' ')[0]} → \${newStatus}\`);
}

// ── AGENT CARD CLICK → FILTER PATIENTS ───────────────────────
function filterByAgent(agentName){
  switchView('patients',1);
  setTimeout(()=>{
    const h=__mocsGet('pt-handler');
    // We filter by search since handler and agent are separate fields
    const s=__mocsGet('pt-search');
    if(s){s.value=agentName;filterPT();}
  },30);
}

// ── DRAG-AND-DROP KANBAN ─────────────────────────────────────
let _dragName=null,_dragStage=null;

function onKanbanDragStart(name,stage){
  _dragName=name;_dragStage=stage;
}
function onKanbanDragOver(e,col){
  e.preventDefault();
  __mocsAll('.k-col').forEach(c=>c.classList.remove('drag-over'));
  col.classList.add('drag-over');
}
function onKanbanDrop(e,targetStage){
  e.preventDefault();
  __mocsAll('.k-col').forEach(c=>c.classList.remove('drag-over'));
  if(!_dragName||_dragStage===targetStage)return;
  // remove from old stage
  const old=visaStages[_dragStage];
  const i=old.indexOf(_dragName);
  if(i>-1)old.splice(i,1);
  // add to new stage
  if(!visaStages[targetStage].includes(_dragName))visaStages[targetStage].unshift(_dragName);
  // update patient status if possible
  const p=patients.find(x=>x.name===_dragName);
  if(p){
    const stageStatus={'Applied':'Scheduled','Under Review':'Scheduled','Approved':'Visa Approved','Travelling':'Under Treatment'};
    const newStatus=stageStatus[targetStage];
    if(newStatus&&p.status!==newStatus){
      if(!p.followups)p.followups=[];
      const now=new Date();
      const date=\`\${now.getDate().toString().padStart(2,'0')}/\${(now.getMonth()+1).toString().padStart(2,'0')}/\${now.getFullYear()}\`;
      p.followups.push({date,note:\`Moved in Visa Kanban: \${_dragStage} → \${targetStage}\`,outcome:'Confirmed',by:'Coordinator'});
      p.status=newStatus;
    }
  }
  _dragName=null;_dragStage=null;
  renderVisa();renderDashboard();setLastUpdated();
  showToast(\`✓ Moved to \${targetStage}\`);
}

// ── DAYS-IN-STAGE BADGE HELPER ────────────────────────────────
// Since we don't have real dates, we use patient ID as a proxy for time
function daysInStage(patientId){
  // simulate: higher IDs = newer patients = fewer days
  const base=2110-patientId;
  return Math.max(1,Math.round(base/30));
}
function daysBadge(days){
  if(days<=7)return \`<span class="k-days ok">\${days}d</span>\`;
  if(days<=14)return \`<span class="k-days warn">\${days}d</span>\`;
  return \`<span class="k-days over">\${days}d ⚠</span>\`;
}

// ── OVERRIDE renderVisa WITH DRAG SUPPORT + DAYS BADGES ──────
function renderVisa(){
  const stages=Object.keys(visaStages);
  const kpis={'Applied':'vk-applied','Under Review':'vk-review','Approved':'vk-approved','Travelling':'vk-travel'};
  stages.forEach(s=>setEl(kpis[s],visaStages[s].length));
  const kb=__mocsGet('visa-kanban');
  if(!kb)return;
  kb.innerHTML='';
  const hues={'Applied':'var(--am)','Under Review':'var(--bm)','Approved':'var(--brand)','Travelling':'var(--gm)'};
  stages.forEach(stage=>{
    const names=visaStages[stage];
    const hue=hues[stage];
    const col=document.createElement('div');
    col.className='k-col';
    col.setAttribute('ondragover',\`onKanbanDragOver(event,this)\`);
    col.setAttribute('ondrop',\`onKanbanDrop(event,'\${stage}')\`);
    const cards=names.map(n=>{
      const p=patients.find(x=>x.name===n)||{hospital:'APOLLO',city:'—',dept:'—',id:0};
      const days=p.id?daysInStage(p.id):1;
      return \`<div class="k-card" draggable="true"
        ondragstart="onKanbanDragStart('\${n.replace(/'/g,"\\\\'")}','\${stage}')"
        onclick="openDetail(\${p.id})">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="k-card-name" style="flex:1">\${n}</div>
          \${daysBadge(days)}
        </div>
        <div class="k-card-sub">
          <span class="k-dot" style="background:\${hue}"></span>
          <span class="h-badge \${hospClass(p.hospital)}">\${(p.hospital||'').slice(0,6)}</span>&nbsp;
          <span>\${(p.dept||'').slice(0,12)}</span>
        </div>
      </div>\`;
    }).join('');
    col.innerHTML=\`<div class="k-col-head">
      <span class="k-col-title" style="color:\${hue}">\${stage}</span>
      <span class="k-count">\${names.length}</span>
    </div>
    <div class="k-body">\${cards||'<div style="font-size:9px;color:var(--ink4);padding:8px;text-align:center">Empty</div>'}</div>\`;
    kb.appendChild(col);
  });
  renderVIL();
}

// ── renderVIL: VIL log table (standalone for inline search clear btn) ──
function renderVIL(){
  const tb=__mocsGet('vil-body');if(!tb)return;
  const q=(__mocsGet('vil-search')?.value||'').toLowerCase();
  const stageColors={'Applied':'var(--am)','Under Review':'var(--bm)','Approved':'var(--brand)','Travelling':'var(--gm)'};
  const allVil=Object.entries(visaStages).flatMap(([stage,names])=>
    names.map(name=>{const p=patients.find(x=>x.name===name)||{};return{...p,name,stage};}));
  const filtered=allVil.filter(p=>{
    const mq=!q||p.name.toLowerCase().includes(q)||(p.agent||'').toLowerCase().includes(q);
    const ms=!vilFilter||p.stage===vilFilter;
    return mq&&ms;
  });
  tb.innerHTML=filtered.map(p=>{
    const days=p.id?daysInStage(p.id):1;
    const stageColor=stageColors[p.stage]||'var(--ink4)';
    return \`<tr>
      <td><div class="pt-name" onclick="openDetail(\${p.id||0})">\${p.name}</div></td>
      <td><span class="h-badge \${hospClass(p.hospital)}">\${p.hospital||'—'}</span> <span style="font-size:8px;color:var(--ink4)">\${p.city||''}</span></td>
      <td style="font-size:9px;color:var(--ink3)">\${(p.dept||'').slice(0,16)}</td>
      <td style="font-size:9px;color:var(--ink3)">\${p.agent||'—'}</td>
      <td><span class="pill" style="background:\${stageColor}22;color:\${stageColor}">\${p.stage}</span></td>
      <td>\${daysBadge(days)}</td>
      <td style="font-size:9px;color:var(--ink4)">\${p.handler||'—'}</td>
    </tr>\`;
  }).join('')||\`<tr><td colspan="7" style="text-align:center;padding:12px;font-size:9px;color:var(--ink4)">No records match</td></tr>\`;
}

// ── OVERRIDE renderPT WITH INLINE STATUS + AGENT COLUMN ──────
function renderPT(){
  const sorted=[...ptFiltered].sort((a,b)=>{
    const va=a[ptSort.col]||'',vb=b[ptSort.col]||'';
    if(typeof va==='number')return ptSort.dir*(va-vb);
    return ptSort.dir*String(va).localeCompare(String(vb));
  });
  const total=sorted.length;
  const pages=Math.max(1,Math.ceil(total/PER_PAGE));
  if(ptPage>=pages)ptPage=0;
  const start=ptPage*PER_PAGE,end=Math.min(start+PER_PAGE,total);
  const tb=__mocsGet('pt-body');
  if(!tb)return;
  if(!total){
    tb.innerHTML=\`<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--ink4);font-size:10px">No patients match the current filters</td></tr>\`;
    setEl('pg-info','No results');
    setHTML('pg-btns','');return;
  }
  const statClsMap={'Treatment Done':'s-done','Under Treatment':'s-treat','Visa Approved':'s-visa','Scheduled':'s-sched'};
  tb.innerHTML=sorted.slice(start,end).map(p=>{
    const sc=statClsMap[p.status]||'s-sched';
    return \`<tr>
      <td><div class="pt-name" onclick="openDetail(\${p.id})">\${p.name}</div><div class="pt-pid">MBD-\${String(p.id).padStart(4,'0')} · \${p.passport}</div></td>
      <td><span class="h-badge \${hospClass(p.hospital)}">\${p.hospital}</span> <span style="font-size:8px;color:var(--ink4)">\${p.city}</span></td>
      <td style="font-size:9px;color:var(--ink3)">\${(p.dept||'').slice(0,16)}</td>
      <td><span class="pill \${p.type==='IPD'?'p-blu':'p-gray'}">\${p.type}</span></td>
      <td>
        <select class="status-sel \${sc}" onchange="changePatientStatus(\${p.id},this.value);this.className='status-sel '+(({'Treatment Done':'s-done','Under Treatment':'s-treat','Visa Approved':'s-visa','Scheduled':'s-sched'})[this.value]||'s-sched')">
          <option \${p.status==='Scheduled'?'selected':''}>Scheduled</option>
          <option \${p.status==='Visa Approved'?'selected':''}>Visa Approved</option>
          <option \${p.status==='Under Treatment'?'selected':''}>Under Treatment</option>
          <option \${p.status==='Treatment Done'?'selected':''}>Treatment Done</option>
        </select>
      </td>
      <td style="font-size:9px;color:var(--ink4)">\${p.handler||'—'}</td>
      <td style="font-size:9px;color:var(--ink3);max-width:80px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="\${p.agent||''}">\${(p.agent||'—').slice(0,14)}</td>
      <td><button class="act-btn" onclick="openDetail(\${p.id})">View</button></td>
    </tr>\`;
  }).join('');
  setEl('pg-info',\`\${start+1}–\${end} of \${total}\`);
  const btns=__mocsGet('pg-btns');
  if(!btns)return;
  btns.innerHTML='';
  const addBtn=(label,active,disabled,fn)=>{
    const b=document.createElement('button');
    b.className='pg-btn'+(active?' on':'');b.textContent=label;b.disabled=disabled;
    b.onclick=fn;btns.appendChild(b);
  };
  addBtn('‹',false,ptPage===0,()=>{ptPage--;renderPT();});
  for(let i=0;i<Math.min(pages,5);i++){const ii=i;addBtn(i+1,i===ptPage,false,()=>{ptPage=ii;renderPT();});}
  if(pages>5)addBtn('…',false,true,()=>{});
  addBtn('›',false,ptPage>=pages-1,()=>{ptPage++;renderPT();});
  // update qstat counts
  const counts={'':'total','Under Treatment':'treat','Visa Approved':'visa','Treatment Done':'done','Scheduled':'sched'};
  Object.entries(counts).forEach(([status,key])=>{
    const n=status?patients.filter(p=>p.status===status).length:patients.length;
    setEl('qs-n-'+key,n);
  });
}

// ── OVERRIDE renderAgents WITH CLICKABLE CARDS ────────────────
function renderAgents(){
  const map={};
  patients.forEach(p=>{
    if(p.agent){
      if(!map[p.agent])map[p.agent]={total:0,done:0,treat:0,visa:0,sched:0};
      map[p.agent].total++;
      if(p.status==='Treatment Done')map[p.agent].done++;
      else if(p.status==='Under Treatment')map[p.agent].treat++;
      else if(p.status==='Visa Approved')map[p.agent].visa++;
      else map[p.agent].sched++;
    }
  });
  const sorted=Object.entries(map).sort((a,b)=>b[1].total-a[1].total);
  const unattr=patients.filter(p=>!p.agent).length;
  const avg=sorted.length?Math.round(sorted.reduce((s,a)=>s+a[1].total,0)/sorted.length):0;
  setEl('ag-total',sorted.length);
  setEl('ag-top',sorted[0]?sorted[0][0].slice(0,14):'—');
  setEl('ag-avg',avg);setEl('ag-unattr',unattr);
  const cards=__mocsGet('agents-cards');
  if(cards){
    cards.innerHTML=sorted.slice(0,6).map(([name,s])=>{
      const initials=name.split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase();
      const conv=s.total?Math.round(s.done/s.total*100):0;
      return \`<div class="agent-card" style="cursor:pointer" onclick="filterByAgent('\${name.replace(/'/g,"\\\\'")}')">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
          <div class="agent-avatar" style="margin-bottom:0">\${initials}</div>
          <span style="font-family:var(--mono);font-size:8px;padding:2px 6px;border-radius:4px;background:\${conv>60?'var(--gbg)':'var(--abg)'};color:\${conv>60?'var(--gm)':'var(--am)'}">\${conv}% conv.</span>
        </div>
        <div class="agent-name">\${name.slice(0,18)}</div>
        <div class="agent-sub">Click to filter patients →</div>
        <div class="agent-stats-row">
          <div><div class="agent-stat-val" style="color:var(--brand)">\${s.total}</div><div class="agent-stat-lbl">Refs</div></div>
          <div><div class="agent-stat-val" style="color:var(--gm)">\${s.done}</div><div class="agent-stat-lbl">Done</div></div>
          <div><div class="agent-stat-val" style="color:var(--brand)">\${s.treat}</div><div class="agent-stat-lbl">Active</div></div>
          <div><div class="agent-stat-val" style="color:var(--am)">\${s.visa}</div><div class="agent-stat-lbl">Visa</div></div>
        </div>
      </div>\`;
    }).join('');
  }
  const atb=__mocsGet('agents-table');
  if(atb){
    atb.innerHTML=sorted.map(([name,s])=>{
      const est=Math.round(s.done*85000*0.10*(1-_ciSplit/100));
      const conv=s.total?Math.round(s.done/s.total*100):0;
      return \`<tr style="cursor:pointer" onclick="filterByAgent('\${name.replace(/'/g,"\\\\'")}')">
        <td style="font-size:10px;font-weight:500;color:var(--ink)">\${name.slice(0,22)}</td>
        <td><span class="pill p-adv">\${s.total}</span></td>
        <td><span class="pill p-ok">\${s.done}</span></td>
        <td><span class="pill p-blu">\${s.treat}</span></td>
        <td><span class="pill p-due">\${s.visa}</span></td>
        <td><div style="display:flex;align-items:center;gap:5px"><div style="width:36px;height:4px;background:var(--off2);border-radius:2px;overflow:hidden"><div style="width:\${conv}%;height:100%;background:\${conv>60?'var(--gm)':'var(--am)'}"></div></div><span style="font-family:var(--mono);font-size:8px">\${conv}%</span></div></td>
        <td style="font-family:var(--mono);font-size:9px;color:var(--gm)">৳\${est.toLocaleString()}</td>
      </tr>\`;
    }).join('');
  }
}

// ── renderDashboard (complete V7 — follow-up alert + lastUpdated) ──
function renderDashboard(){
  const total=patients.length;
  const visaAll=Object.values(visaStages).flat().length;
  const treat=patients.filter(p=>p.status==='Under Treatment').length;
  const done=patients.filter(p=>p.status==='Treatment Done').length;
  const sched=patients.filter(p=>p.status==='Scheduled').length;
  setEl('kd-total',total);setEl('kd-visa',visaAll);setEl('kd-treat',treat);setEl('kd-done',done);setEl('kd-sched',sched);
  renderSpark('spark-total',[22,26,24,28,30,32,total],'brand');
  renderSpark('spark-visa',[8,10,12,9,11,13,visaAll],'amber');
  renderSpark('spark-treat',[4,5,6,7,5,6,treat],'green');
  renderSpark('spark-done',[10,12,14,16,18,20,done],'blue');
  renderSpark('spark-sched',[3,4,5,3,6,4,sched],'red');
  // Activity feed
  const af=__mocsGet('dash-activity');
  if(af){
    const colors={'Under Treatment':'var(--brand)','Treatment Done':'var(--gm)','Visa Approved':'var(--am)','Scheduled':'var(--ln2)'};
    const times=['2m','5m','12m','18m','25m','34m','42m','53m','1h','1h12m'];
    af.innerHTML=patients.slice(0,10).map((p,i)=>\`<div class="af-item" onclick="openDetail(\${p.id})"><div class="af-dot" style="background:\${colors[p.status]||'var(--ln2)'}"></div><div style="flex:1;min-width:0"><div class="af-name">\${p.name}</div><div class="af-detail">\${p.hospital} \${p.city} · \${(p.dept||'').slice(0,16)} · \${p.type}</div></div><div style="flex-shrink:0;text-align:right">\${statusPill(p.status)}<div class="af-time">\${times[i]||'—'} ago</div></div></div>\`).join('');
  }
  // Visa mini summary
  const vs=__mocsGet('dash-visa-summary');
  if(vs){
    const cfg=[{s:'Applied',c:'var(--am)'},{s:'Under Review',c:'var(--bm)'},{s:'Approved',c:'var(--brand)'},{s:'Travelling',c:'var(--gm)'}];
    const vt=Object.values(visaStages).flat().length||1;
    vs.innerHTML=cfg.map(({s,c})=>{const cnt=visaStages[s]?.length||0;const pct=Math.round(cnt/vt*100);return \`<div class="vis-row" onclick="switchView('visa',2)"><div class="vis-meta"><span class="vis-stage" style="color:\${c}">\${s}</span><span class="vis-cnt" style="color:\${c}">\${cnt}</span></div><div class="vis-bar"><div class="vis-fill" style="width:\${pct}%;background:\${c}"></div></div></div>\`;}).join('');
  }
  // Coordinator workload
  const coord=__mocsGet('dash-coord');
  if(coord){
    const names=['Sayem','Atiq','Jafor','Dihan','Jeffry'],maxLoad=15;
    coord.innerHTML=names.map(name=>{
      const active=patients.filter(p=>p.handler===name);
      const d=active.filter(p=>p.status==='Treatment Done').length;
      const cap=Math.min(100,Math.round(active.length/maxLoad*100));
      if(!active.length)return '';
      return \`<tr><td style="font-size:10px;font-weight:600;color:var(--ink)">\${name}</td><td><span class="pill p-adv">\${active.length}</span></td><td><div class="coord-bar"><div class="coord-fill" style="width:\${cap}%;background:\${cap>80?'var(--rm)':cap>60?'var(--am)':'var(--brand)'}"></div></div><span style="font-family:var(--mono);font-size:8px;color:var(--ink4)">\${cap}%</span></td><td><span class="pill p-ok">\${d}</span></td></tr>\`;
    }).join('');
  }
  // Alerts
  const visaPend=visaStages['Applied'].length;
  const noHandler=patients.filter(p=>!p.handler&&p.status==='Under Treatment').length;
  const schPend=patients.filter(p=>p.status==='Scheduled').length;
  const noFollowup=patients.filter(p=>p.status==='Under Treatment'&&(!p.followups||p.followups.length===0)).length;
  setEl('dash-alert-count',\`\${visaPend+noHandler+noFollowup} flags\`);
  const al=__mocsGet('dash-alerts');
  if(al){
    al.innerHTML=\`
      \${noFollowup>0?\`<div class="alert-item warn"><span class="ai-icon">📞</span><div class="ai-body"><div class="ai-title">\${noFollowup} active patients have no follow-up logged</div><div class="ai-sub">Open patient → Follow-up Log to record contact</div></div><button class="ai-dismiss" onclick="this.closest('.alert-item').style.cssText='max-height:0;margin:0;padding:0;opacity:0;border:none;overflow:hidden'">✕</button></div>\`:''}
      \${visaPend>0?\`<div class="alert-item warn"><span class="ai-icon">⏳</span><div class="ai-body"><div class="ai-title">\${visaPend} visa applications in Applied — follow up</div><div class="ai-sub">Stalled beyond 14 days risk rejection</div></div><button class="ai-dismiss" onclick="this.closest('.alert-item').style.cssText='max-height:0;margin:0;padding:0;opacity:0;border:none;overflow:hidden'">✕</button></div>\`:''}
      \${noHandler>0?\`<div class="alert-item over"><span class="ai-icon">⚠️</span><div class="ai-body"><div class="ai-title">\${noHandler} active patients have no coordinator</div><div class="ai-sub">Assign handler to ensure follow-up</div></div><button class="ai-dismiss" onclick="this.closest('.alert-item').style.cssText='max-height:0;margin:0;padding:0;opacity:0;border:none;overflow:hidden'">✕</button></div>\`:''}
      \${schPend>0?\`<div class="alert-item info"><span class="ai-icon">📋</span><div class="ai-body"><div class="ai-title">\${schPend} scheduled — confirm appointments</div><div class="ai-sub">Check travel dates and hospital confirmations</div></div><button class="ai-dismiss" onclick="this.closest('.alert-item').style.cssText='max-height:0;margin:0;padding:0;opacity:0;border:none;overflow:hidden'">✕</button></div>\`:''}
      <div class="alert-item success"><span class="ai-icon">✅</span><div class="ai-body"><div class="ai-title" style="color:var(--gdk)">Zero commission disputes this month</div><div class="ai-sub" style="color:var(--gm)">Rate matrix is the single source of truth</div></div></div>\`;
  }
  // Top agents
  const agMap={};patients.forEach(p=>{if(p.agent)agMap[p.agent]=(agMap[p.agent]||0)+1;});
  const topA=Object.entries(agMap).sort((a,b)=>b[1]-a[1]).slice(0,6);
  const maxA=topA[0]?.[1]||1;
  const agEl=__mocsGet('dash-agents');
  if(agEl)agEl.innerHTML=topA.map(([n,cnt])=>\`<div class="sr-row" onclick="filterByAgent('\${n.replace(/'/g,"\\\\'")}')" style="cursor:pointer"><span class="sr-label" title="\${n}">\${n.slice(0,14)}</span><div class="sr-bar"><div class="sr-fill" style="width:\${Math.round(cnt/maxA*100)}%;background:var(--brand)"></div></div><span class="sr-val">\${cnt}</span></div>\`).join('');
  // Countries
  const countriesEl=__mocsGet('dash-countries');
  if(countriesEl){
    const list=[{f:'🇧🇩',n:'Bangladesh',cnt:patients.length,t:'+12%'},{f:'🇲🇲',n:'Myanmar',cnt:6,t:'+2%'},{f:'🇳🇵',n:'Nepal',cnt:4,t:'—'},{f:'🇵🇰',n:'Pakistan',cnt:2,t:'new'}];
    countriesEl.innerHTML=list.map(c=>\`<div class="country-row"><div style="display:flex;align-items:center;gap:5px"><span style="font-size:12px">\${c.f}</span><span class="country-name">\${c.n}</span></div><div style="display:flex;align-items:center;gap:5px"><span class="country-trend">\${c.t}</span><span class="country-count">\${c.cnt}</span></div></div>\`).join('');
  }
  // Revenue bars
  const revBars=__mocsGet('dash-rev-bars');
  if(revBars){
    const hr={Apollo:0,Manipal:0,Fortis:0,Max:0};
    patients.filter(p=>p.status==='Treatment Done').forEach(p=>{
      const k=p.hospital.startsWith('APOLLO')?'Apollo':p.hospital.startsWith('MANIPAL')?'Manipal':p.hospital.startsWith('FORTIS')?'Fortis':p.hospital.startsWith('Max')?'Max':null;
      if(!k)return;
      hr[k]+=85000*({Apollo:5,Manipal:18,Fortis:18,Max:20}[k]/100);
    });
    const maxR=Math.max(...Object.values(hr),1);
    const totComm=Object.values(hr).reduce((a,b)=>a+b,0);
    revBars.innerHTML='<div style="font-family:var(--mono);font-size:8px;color:var(--ink4);margin-bottom:6px">Total est. commission: <strong style="color:var(--brand)">'+fmt(totComm)+'</strong></div>'+Object.entries(hr).sort((a,b)=>b[1]-a[1]).map(([n,v])=>\`<div class="rev-bar-row"><span class="rev-bar-lbl">\${n}</span><div class="rev-bar-track"><div class="rev-bar-fill" style="width:\${Math.round(v/maxR*100)}%"></div></div><span class="rev-bar-val">\${v>1000?fmt(v):'৳0'}</span></div>\`).join('');
  }
  renderDashCharts();
  setLastUpdated();
}

// ── OVERRIDE doRefresh to also update timestamp ───────────────
function doRefresh(btn){
  const ic=__mocsGet('refresh-icon');
  ic.classList.add('spinning');
  setTimeout(()=>{
    ic.classList.remove('spinning');
    renderDashboard();
    setLastUpdated();
    showToast('✓ Dashboard refreshed');
  },600);
}

// ── OVERRIDE filterPT to remove old duplicate declaration ─────
// (renderPT is now defined above with inline status selects)

// ── INIT — called last so all V7 overrides are in scope ──────
`;

export const MOCS_LIVE_DEMO_FUNCTIONS = [
  "addFollowup",
  "addPatient",
  "advancePatientStatus",
  "calcCommission",
  "calcDC",
  "calcFC",
  "changePatientStatus",
  "clearPTFilters",
  "closeAllPanels",
  "closeDetail",
  "closeModal",
  "cycleDateRange",
  "daysBadge",
  "daysInStage",
  "destroyChart",
  "doExport",
  "doGlobalSearch",
  "doRefresh",
  "filterByAgent",
  "filterByStatus",
  "filterPT",
  "filterSB",
  "filterVIL",
  "fmt",
  "hospClass",
  "initDashboard",
  "makeChart",
  "markAllRead",
  "markRead",
  "onKanbanDragOver",
  "onKanbanDragStart",
  "onKanbanDrop",
  "onSplitChange",
  "openDetail",
  "openModal",
  "qFilter",
  "renderAgents",
  "renderAll",
  "renderAnalyticsOverview",
  "renderDashCharts",
  "renderDashboard",
  "renderFinance",
  "renderFollowupLog",
  "renderGeoCharts",
  "renderHospitals",
  "renderLineChart",
  "renderNotifs",
  "renderPT",
  "renderReports",
  "renderSB",
  "renderSpark",
  "renderSpecialtyChart",
  "renderTrendsCharts",
  "renderVIL",
  "renderVisa",
  "seededRnd",
  "setEl",
  "setHTML",
  "setLastUpdated",
  "showToast",
  "sortPT",
  "statusPill",
  "switchAtab",
  "switchLC",
  "switchTab",
  "switchView",
  "toggleDarkMode",
  "togglePanel",
  "updateCityOptions"
] as const;

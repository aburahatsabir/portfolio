function s(s){return s.replace(/\\\$\{/g,"${").replace(/\\`/g,"`").replace(/\\\\/g,"\\")}function e(){const e=a.useRef(null);return a.useEffect(()=>{const a=e.current;if(!a)return;a.innerHTML=s(c);const t=a.ownerDocument,i=[],n=s=>a.querySelector(`#${(s=>"undefined"!=typeof CSS&&"function"==typeof CSS.escape?CSS.escape(s):s.replace(/([ !"#$%&'()*+,./:;<=>?@[\]^`{|}~\\])/g,"\\$1"))(s)}`),l=s=>a.querySelector(s),o=s=>a.querySelectorAll(s),m=(s,e,a)=>{t.addEventListener(s,e,a),i.push(()=>t.removeEventListener(s,e,a))};let v=null;const h=new Map;try{const e=new Function("__mocsGet","__mocsOne","__mocsAll","__mocsAddDocEvent","Chart",`${s(d)}\n\nif (typeof initDashboard === "function") {\n  initDashboard();\n}\n\nreturn {\n  ${p.join(",\n  ")},\n  __mocsDispose: () => {\n    try {\n      if (typeof _charts === "object" && _charts) {\n        Object.keys(_charts).forEach((id) => {\n          try {\n            destroyChart(id);\n          } catch (err) {\n            void err;\n          }\n        });\n      }\n    } catch (err) {\n      void err;\n    }\n    try {\n      if (typeof io !== "undefined" && io && typeof io.disconnect === "function") {\n        io.disconnect();\n      }\n    } catch (err) {\n      void err;\n    }\n  },\n};\n`);v=e(n,l,o,m,r),Object.entries(v).forEach(([s,e])=>{"__mocsDispose"!==s&&"function"==typeof e&&(h.set(s,window[s]),window[s]=e)})}catch(y){const s=y instanceof Error?`${y.name}: ${y.message}\n${y.stack??""}`:String(y);window.__mocsRuntimeError=s}let g=!1;const f=()=>{if(v)try{"function"==typeof v.renderAll&&v.renderAll(),"function"==typeof v.renderAnalyticsOverview&&v.renderAnalyticsOverview()}catch(s){}},u=new IntersectionObserver(s=>{s.forEach(s=>{s.isIntersecting&&!g&&(g=!0,setTimeout(f,120))})},{threshold:.15});if(u.observe(a),i.push(()=>u.disconnect()),"undefined"!=typeof ResizeObserver){let s=null;const e=new ResizeObserver(()=>{s&&clearTimeout(s),s=setTimeout(f,200)});e.observe(a),i.push(()=>{s&&clearTimeout(s),e.disconnect()})}const x=setTimeout(f,600);return i.push(()=>clearTimeout(x)),()=>{var s;null==(s=null==v?void 0:v.__mocsDispose)||s.call(v),i.forEach(s=>s()),h.forEach((s,e)=>{void 0!==s?window[e]=s:delete window[e]}),a.innerHTML=""}},[]),t.jsx("div",{ref:e,className:"mocs-root"})}import{a,j as t,u as i,c as n,m as l}from"./motion-vendor-RhFw4hGp.js";import{C as r,r as o}from"./chart-DSbrNj84.js";const c=String.raw`<!-- 07 LIVE DEMO -->
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
`,d=String.raw`// ══════════════════════════════════════════════════════════════════
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
`,p=["addFollowup","addPatient","advancePatientStatus","calcCommission","calcDC","calcFC","changePatientStatus","clearPTFilters","closeAllPanels","closeDetail","closeModal","cycleDateRange","daysBadge","daysInStage","destroyChart","doExport","doGlobalSearch","doRefresh","filterByAgent","filterByStatus","filterPT","filterSB","filterVIL","fmt","hospClass","initDashboard","makeChart","markAllRead","markRead","onKanbanDragOver","onKanbanDragStart","onKanbanDrop","onSplitChange","openDetail","openModal","qFilter","renderAgents","renderAll","renderAnalyticsOverview","renderDashCharts","renderDashboard","renderFinance","renderFollowupLog","renderGeoCharts","renderHospitals","renderLineChart","renderNotifs","renderPT","renderReports","renderSB","renderSpark","renderSpecialtyChart","renderTrendsCharts","renderVIL","renderVisa","seededRnd","setEl","setHTML","setLastUpdated","showToast","sortPT","statusPill","switchAtab","switchLC","switchTab","switchView","toggleDarkMode","togglePanel","updateCityOptions"];r.register(...o);const m=()=>{const{scrollY:s}=i(),r=n(s,[0,1e3],[0,250]),[o,c]=a.useState(0),[d,p]=a.useState(0),m=[{title:"1. Agent submits patient for VIL",desc:"A travel agent submits a patient's details for a Visa Invitation Letter. The coordinator creates a patient record \u2014 name, passport, contact, hospital preference, department, and service type.",fields:[["Patient","MD JASIM UDDIN KHAN"],["Hospital","APOLLO"],["City","Chennai"],["Service","VIL"]]},{title:"2. VIL is requested and tracked",desc:'The system flags the case as "VIL Processing." The coordinator contacts the partner hospital to issue the invitation letter. The patient record updates to show VIL issued with timestamp.',fields:[["Status","VIL Processing",!0],["Timestamp","12 Oct \xb7 10:45 AM"],["Hospital Link","Confirmed"],["Action","VIL Issued"]]},{title:"3. Patient enters Visa Pipeline",desc:'With VIL in hand, the patient submits a visa application at IVAC. The case moves to the Visa Kanban board \u2014 "Applied." The pipeline surfaces this case automatically if it stalls beyond 14 days.',fields:[["Visa Status","Applied",!0],["IVAC Setup","Done"],["Days in stage","3 Days"],["Next alert","14 Days"]]},{title:"4. Visa approved \u2192 Coordination",desc:'Visa approval moves the case to "Approved" then "Travelling." The coordinator activates at-hospital services \u2014 airport pickup booking, hospital guide assignment, doctor appointment confirmation.',fields:[["Visa Status","Approved",!0],["Pickup","Booked"],["Guide","Assigned"],["Appointment","Confirmed"]]},{title:"5. Treatment tracked as OPD/IPD",desc:'The patient receives treatment. The case is updated to "Under Treatment" with OPD/IPD designation. Follow-up calls are logged with date stamps and outcomes.',fields:[["Status","Under Treatment",!0],["Type","IPD"],["Last Follow-up","24 Oct \xb7 09:15 AM"],["Outcome","Admitted"]]},{title:"6. Treatment Done \u2192 Commission",desc:'The case status updates to "Treatment Done." The finance engine automatically applies the correct commission rate (e.g., 24% OP for Manipal Varthur), calculates CI and agent share, and flags for invoicing.',fields:[["Status","Treatment Done",!0],["Hospital","Manipal Varthur"],["Comm Rate","24%"],["Agent split","Auto-calc"]]}];return a.useEffect(()=>{const s=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");const a=e.target.querySelectorAll(".metric-ring-fill");a.length>0&&a.forEach(s=>{const e=s.getAttribute("data-val");e&&(s.style.strokeDasharray=`${e} 314`)}),s.unobserve(e.target)}})},{threshold:.15,rootMargin:"0px 0px -50px 0px"});return document.querySelectorAll(".fade").forEach(e=>s.observe(e)),()=>s.disconnect()},[]),t.jsxs("div",{className:"fmcg-case-study",children:[t.jsx("style",{children:"\n                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;700&display=swap');\n\n                .fmcg-case-study {\n                    --brand:#4F46E5;--brand-hover:#4338CA;--brand-light:#EEF2FF;--brand-border:#C7D2FE;\n                    --w:#FFFFFF;--off:#F8FAFC;--off2:#F1F5F9;\n                    --ink:#0F172A;--ink2:#1E293B;--ink3:#64748B;--ink4:#94A3B8;\n                    --ln:#E2E8F0;--ln2:#CBD5E1;\n                    --gm:#059669;--gbg:#ECFDF5;--gdk:#065F46;\n                    --rm:#DC2626;--rbg:#FEF2F2;\n                    --am:#D97706;--abg:#FFFBEB;\n                    --bm:#2563EB;--bbg:#EFF6FF;\n                    --serif:'Plus Jakarta Sans',system-ui,sans-serif;\n                    --sans:'Plus Jakarta Sans',system-ui,sans-serif;\n                    --mono:'JetBrains Mono',monospace;\n                    \n                    font-family: var(--sans);\n                    background: var(--w);\n                    color: var(--ink);\n                    -webkit-font-smoothing: antialiased;\n                }\n                \n                .fmcg-case-study h1 {\n                    font-family: var(--sans);\n                    font-size: clamp(42px, 5vw, 76px);\n                    line-height: 1.05;\n                    letter-spacing: -0.04em;\n                    color: var(--ink);\n                    margin-bottom: 24px;\n                    font-weight: 800;\n                }\n                .fmcg-case-study h1 em {\n                    font-style: italic;\n                    color: var(--ink4);\n                    font-weight: 600;\n                }\n                .fmcg-case-study .lead {\n                    font-size: 17px;\n                    color: var(--ink2);\n                    line-height: 1.82;\n                    font-weight: 300;\n                    margin-top: 0;\n                    max-width: 540px;\n                    margin-bottom: 40px;\n                }\n                \n                .fmcg-case-study #hero {\n                    min-height: 100vh;\n                    display: flex;\n                    align-items: center;\n                    padding: 120px 0 80px;\n                    position: relative;\n                    overflow: hidden;\n                }\n                .fmcg-case-study .hero-grid {\n                    position: absolute;\n                    inset: 0;\n                    background-image: linear-gradient(var(--ln) 1px, transparent 1px), linear-gradient(90deg, var(--ln) 1px, transparent 1px);\n                    background-size: 64px 64px;\n                    opacity: .4;\n                    pointer-events: none;\n                    mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);\n                    -webkit-mask-image: radial-gradient(circle at 75% 50%, rgba(0,0,0,0.6) 0%, transparent 50%);\n                }\n                .fmcg-case-study .hero-inner {\n                    display: grid;\n                    grid-template-columns: 1.15fr 0.85fr;\n                    gap: 60px;\n                    align-items: center;\n                    position: relative;\n                    z-index: 1;\n                }\n                .fmcg-case-study .hero-meta {\n                    display: grid;\n                    grid-template-columns: repeat(4, auto);\n                    gap: 0;\n                    border-top: 1px solid var(--ln);\n                    padding-top: 40px;\n                    margin-top: 0;\n                    width: fit-content;\n                }\n                .fmcg-case-study .hm {\n                    padding: 0 40px 0 0;\n                    border-right: 1px solid var(--ln);\n                    margin-right: 40px;\n                }\n                .fmcg-case-study .hm:last-child {\n                    border-right: none;\n                    margin-right: 0;\n                    padding-right: 0;\n                }\n                .fmcg-case-study .hm-label {\n                    font-family: var(--mono);\n                    font-size: 10px;\n                    color: var(--ink4);\n                    letter-spacing: 1.5px;\n                    text-transform: uppercase;\n                    margin-bottom: 5px;\n                }\n                .fmcg-case-study .hm-val {\n                    font-size: 14px;\n                    color: var(--ink2);\n                    font-weight: 400;\n                }\n                \n                .fmcg-case-study section { padding: 100px 0; }\n                .fmcg-case-study section.alt { background: var(--off); border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }\n                .fmcg-case-study .wide { width: 100%; }\n\n                .fmcg-case-study .eyebrow { font-family: var(--mono); font-size: 12px; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }\n                .fmcg-case-study .eyebrow::after { content: ''; width: 24px; height: 1px; background: var(--brand-border); }\n                .fmcg-case-study h2 { font-family: var(--sans); font-size: clamp(28px, 4vw, 46px); line-height: 1.1; letter-spacing: -0.04em; color: var(--ink); margin-bottom: 18px; font-weight: 700; }\n                .fmcg-case-study h2 em { font-style: italic; color: var(--ink4); font-weight: 600; }\n                .fmcg-case-study .body-copy { font-size: 16px; color: var(--ink2); line-height: 1.9; font-weight: 300; max-width: 600px; }\n                \n                /* EXACT PREMIUM MATCH FOR CONTEXT */\n\n                .fmcg-case-study .context-quote { border-left: 2px solid var(--brand); padding: 24px 28px; background: var(--w); border-radius: 0 12px 12px 0; font-family: var(--serif); font-size: 22px; color: var(--ink2); line-height: 1.5; margin: 32px 0; font-style: italic; }\n                .fmcg-case-study .context-quote cite { display: block; font-family: var(--sans); font-size: 13px; font-style: normal; color: var(--ink4); margin-top: 12px; }\n\n                .fmcg-case-study .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }\n\n                .fmcg-case-study .stakeholders-list { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }\n                .fmcg-case-study .stakeholder-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 20px; transition: all .2s; }\n                .fmcg-case-study .stakeholder-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,.05); border-color: var(--ln2); }\n                .fmcg-case-study .sh-role { font-family: var(--mono); font-size: 10px; color: var(--gm); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }\n                .fmcg-case-study .sh-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; color: var(--ink); }\n                .fmcg-case-study .sh-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; }\n\n                .fmcg-case-study .problem-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 40px; }\n                .fmcg-case-study .problem-cell { background: var(--w); padding: 28px; transition: background .2s; }\n                .fmcg-case-study .problem-cell:hover { background: var(--off); }\n                .fmcg-case-study .pc-number { font-family: var(--mono); font-size: 11px; color: var(--ink4); margin-bottom: 8px; letter-spacing: .06em; display: block; }\n                .fmcg-case-study .pc-icon { font-size: 22px; margin-bottom: 14px; display: block; }\n                .fmcg-case-study .pc-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -.01em; color: var(--ink); }\n                .fmcg-case-study .pc-desc { font-size: 13px; color: var(--ink3); line-height: 1.6; margin: 0; }\n\n                .fmcg-case-study .ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 48px; }\n                .fmcg-case-study .ba-card { border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }\n                .fmcg-case-study .ba-head { padding: 12px 18px; border-bottom: 1px solid var(--ln); display: flex; align-items: center; gap: 9px; }\n                .fmcg-case-study .ba-head.before { background: #fff7f7; }\n                .fmcg-case-study .ba-head.after { background: #f5fbf6; }\n                .fmcg-case-study .ba-dot { width: 7px; height: 7px; border-radius: 50%; }\n                .fmcg-case-study .ba-head.before .ba-dot { background: var(--rm); }\n                .fmcg-case-study .ba-head.after .ba-dot { background: var(--gm); }\n                .fmcg-case-study .ba-lbl { font-family: var(--mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: 500; }\n                .fmcg-case-study .ba-head.before .ba-lbl { color: var(--rm); }\n                .fmcg-case-study .ba-head.after .ba-lbl { color: var(--gdk); }\n                .fmcg-case-study .ba-row { display: flex; gap: 11px; padding: 12px 18px; border-bottom: 1px solid var(--ln); font-size: 14px; color: var(--ink2); line-height: 1.65; font-weight: 300; }\n                .fmcg-case-study .ba-row:last-child { border-bottom: none; }\n                .fmcg-case-study .ba-mark { font-family: var(--mono); font-size: 12px; flex-shrink: 0; margin-top: 2px; }\n                .fmcg-case-study .bm-bad { color: var(--rm); }\n                .fmcg-case-study .bm-good { color: var(--gm); }\n\n                .fmcg-case-study .hl { background: var(--brand-light); color: var(--brand); padding: 1px 6px; border-radius: 4px; font-size: 0.92em; font-weight: 500; }\n\n                .fmcg-case-study .vis-impact { margin-top: 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }\n                .fmcg-case-study .vis-chart-wrap { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 32px; overflow: hidden; }\n                .fmcg-case-study .vis-chart-title { font-family: var(--mono); font-size: 10px; color: var(--ink4); letter-spacing: .14em; text-transform: uppercase; margin-bottom: 28px; }\n                .fmcg-case-study .vis-bars { display: flex; align-items: flex-end; gap: 16px; height: 140px; }\n                .fmcg-case-study .vis-bar-group { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }\n                .fmcg-case-study .vis-bar { width: 100%; border-radius: 4px 4px 0 0; position: relative; cursor: default; transition: height 1.4s cubic-bezier(.16,1,.3,1); }\n                .fmcg-case-study .vis-bar:hover { filter: brightness(1.08); }\n                .fmcg-case-study .vis-bar-val { font-family: var(--serif); font-size: 14px; color: var(--ink); text-align: center; }\n                .fmcg-case-study .vis-bar-lbl { font-family: var(--mono); font-size: 9px; color: var(--ink4); letter-spacing: .08em; text-align: center; text-transform: uppercase; }\n                .fmcg-case-study .vis-axis { height: 1px; background: var(--ln); margin-top: 2px; width: 100%; }\n                .fmcg-case-study .vis-comparison { display: flex; flex-direction: column; gap: 16px; }\n                .fmcg-case-study .vis-comp-item { display: flex; flex-direction: column; gap: 6px; }\n                .fmcg-case-study .vis-comp-label { display: flex; justify-content: space-between; align-items: center; }\n                .fmcg-case-study .vis-comp-name { font-size: 13px; font-weight: 500; color: var(--ink); }\n                .fmcg-case-study .vis-comp-vals { display: flex; gap: 8px; align-items: center; }\n                .fmcg-case-study .vis-comp-before { font-family: var(--mono); font-size: 11px; color: var(--rm); text-decoration: line-through; opacity: .6; }\n                .fmcg-case-study .vis-comp-after { font-family: var(--mono); font-size: 11px; color: var(--gm); font-weight: 600; }\n                .fmcg-case-study .vis-comp-track { height: 8px; background: var(--off2); border-radius: 4px; overflow: hidden; position: relative; }\n                .fmcg-case-study .vis-comp-fill { height: 100%; border-radius: 4px; }\n\n                .fmcg-case-study .fade {\n                    opacity: 0;\n                    transform: translateY(16px);\n                    transition: opacity .6s ease, transform .6s ease;\n                    will-change: opacity, transform;\n                }\n                .fmcg-case-study .fade.in {\n                    opacity: 1;\n                    transform: none;\n                }\n                .fmcg-case-study .d1 { transition-delay: .1s; }\n                .fmcg-case-study .d2 { transition-delay: .2s; }\n                .fmcg-case-study .d3 { transition-delay: .3s; }\n                .fmcg-case-study .d4 { transition-delay: .4s; }\n                \n                .fmcg-case-study .hero-visual {\n                    position: relative;\n                    width: 100%;\n                    height: 100%;\n                    min-height: 520px;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                }\n                .fmcg-case-study .structure-container {\n                   position: relative;\n                   width: 100%;\n                   max-width: 580px;\n                   display: flex;\n                   align-items: center;\n                   justify-content: center;\n                   animation: float-arch 15s ease-in-out infinite;\n                }\n                @keyframes float-arch {\n                    0%, 100% { transform: translateY(0); }\n                    50% { transform: translateY(-15px); }\n                }\n                .fmcg-case-study .structure-svg {\n                    width: 100%;\n                    height: auto;\n                    display: block;\n                    overflow: visible;\n                }\n\n                .fmcg-case-study .journey-wrap {\n                    margin-top: 48px;\n                    padding: 0 20px;\n                }\n                .fmcg-case-study .journey-steps {\n                    display: flex;\n                    justify-content: space-between;\n                    gap: 0;\n                    position: relative;\n                }\n                .fmcg-case-study .journey-step {\n                    position: relative;\n                    z-index: 1;\n                    display: flex;\n                    flex-direction: column;\n                    align-items: center;\n                    text-align: center;\n                    flex: 1;\n                }\n                .fmcg-case-study .journey-step::after {\n                    content: '';\n                    position: absolute;\n                    top: 16px;\n                    left: calc(50% + 16px);\n                    width: calc(100% - 32px);\n                    height: 1px;\n                    background: var(--ln);\n                    z-index: -1;\n                }\n                .fmcg-case-study .journey-step:last-child::after {\n                    display: none;\n                }\n                .fmcg-case-study .step-circle {\n                    width: 32px;\n                    height: 32px;\n                    border-radius: 50%;\n                    background: var(--w);\n                    border: 1px solid var(--ln2);\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    font-size: 13px;\n                    font-family: var(--mono);\n                    font-weight: 500;\n                    color: var(--ink4);\n                    margin-bottom: 12px;\n                    transition: all .4s cubic-bezier(0.4, 0, 0.2, 1);\n                    position: relative;\n                    z-index: 1;\n                    flex-shrink: 0;\n                }\n                .fmcg-case-study .step-circle.done {\n                    background: var(--w);\n                    border-color: var(--gm);\n                    color: var(--gm);\n                }\n                .fmcg-case-study .step-circle.active {\n                    background: var(--brand);\n                    border-color: var(--brand);\n                    color: var(--w);\n                    box-shadow: 0 0 0 4px var(--brand-light);\n                    transform: scale(1.1);\n                }\n                .fmcg-case-study .step-label {\n                    font-size: 11px;\n                    font-weight: 600;\n                    color: var(--ink);\n                    text-align: center;\n                    line-height: 1.3;\n                    margin-bottom: 4px;\n                    letter-spacing: -0.01em;\n                }\n                .fmcg-case-study .step-sub {\n                    font-size: 10px;\n                    color: var(--ink4);\n                    text-align: center;\n                    font-family: var(--mono);\n                    letter-spacing: 0.02em;\n                }\n\n                .fmcg-case-study .journey-services {\n                    margin-top: 40px;\n                    display: grid;\n                    grid-template-columns: 1fr 1fr 1fr;\n                    gap: 20px;\n                }\n                .fmcg-case-study .js-card {\n                    background: var(--w);\n                    border: 1px solid var(--ln);\n                    border-radius: 10px;\n                    padding: 24px;\n                }\n                .fmcg-case-study .js-card-title {\n                    font-family: var(--mono);\n                    font-size: 10px;\n                    color: var(--gm);\n                    letter-spacing: .12em;\n                    text-transform: uppercase;\n                    margin-bottom: 16px;\n                    font-weight: 600;\n                }\n                .fmcg-case-study .js-list {\n                    display: flex;\n                    flex-direction: column;\n                    gap: 10px;\n                    font-size: 13px;\n                    color: var(--ink2);\n                }\n                .fmcg-case-study .js-list div {\n                    display: flex;\n                    align-items: baseline;\n                    gap: 8px;\n                    line-height: 1.4;\n                }\n                .fmcg-case-study .js-list div::before {\n                    content: '';\n                    display: inline-block;\n                    width: 4px;\n                    height: 4px;\n                    border-radius: 50%;\n                    background: var(--brand);\n                    flex-shrink: 0;\n                    margin-top: 5px;\n                }\n                \n\n                .fmcg-case-study .arch-diagram {\n                    margin-top: 40px;\n                }\n                .fmcg-case-study .arch-layer {\n                    margin-bottom: 2px;\n                }\n                .fmcg-case-study .arch-layer-row {\n                    display: flex;\n                    gap: 2px;\n                }\n                .fmcg-case-study .arch-layer-tag {\n                    writing-mode: vertical-lr;\n                    text-orientation: mixed;\n                    font-family: var(--mono);\n                    font-size: 10px;\n                    letter-spacing: .14em;\n                    text-transform: uppercase;\n                    color: var(--ink4);\n                    padding: 16px 10px;\n                    background: var(--off);\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    min-width: 36px;\n                    border: 1px solid var(--ln);\n                    border-radius: 8px 0 0 8px;\n                    font-weight: 400;\n                }\n                .fmcg-case-study .arch-modules {\n                    display: flex;\n                    flex: 1;\n                    gap: 2px;\n                }\n                .fmcg-case-study .arch-mod {\n                    flex: 1;\n                    padding: 16px;\n                    background: var(--w);\n                    border: 1px solid var(--ln);\n                    border-radius: 0 8px 8px 0;\n                    transition: background .15s;\n                }\n                .fmcg-case-study .arch-mod:not(:first-child) {\n                    border-radius: 8px;\n                    border-left: 1px solid var(--ln);\n                }\n                .fmcg-case-study .arch-mod-name {\n                    font-size: 13px;\n                    font-weight: 600;\n                    color: var(--ink);\n                    margin-bottom: 3px;\n                    letter-spacing: -.01em;\n                    line-height: 1.35;\n                }\n                .fmcg-case-study .arch-mod-desc {\n                    font-size: 11px;\n                    color: var(--ink4);\n                    line-height: 1.4;\n                }\n                .fmcg-case-study .arch-mod.hl {\n                    background: var(--brand-light);\n                    border-color: var(--brand-border);\n                }\n                .fmcg-case-study .arch-mod.hl .arch-mod-name {\n                    color: var(--brand);\n                }\n                .fmcg-case-study .arch-connector {\n                    height: 16px;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    margin-left: 36px;\n                }\n                .fmcg-case-study .arch-connector-line {\n                    height: 16px;\n                    width: 1px;\n                    background: var(--ln2);\n                    margin: 0 auto;\n                }\n\n                .fmcg-case-study .module-grid {\n                    display: grid;\n                    grid-template-columns: repeat(3, 1fr);\n                    gap: 20px;\n                    margin-top: 40px;\n                }\n                .fmcg-case-study .module-card {\n                    background: var(--w);\n                    border: 1px solid var(--ln);\n                    border-radius: 10px;\n                    padding: 28px;\n                    transition: all .2s;\n                    cursor: default;\n                }\n                .fmcg-case-study .module-card:hover {\n                    background: var(--off);\n                    border-color: var(--ln2);\n                }\n                .fmcg-case-study .mc-icon {\n                    width: 40px;\n                    height: 40px;\n                    background: var(--brand-light);\n                    border-radius: 10px;\n                    display: flex;\n                    align-items: center;\n                    justify-content: center;\n                    margin-bottom: 16px;\n                }\n                .fmcg-case-study .mc-icon svg {\n                    width: 18px;\n                    height: 18px;\n                    stroke: var(--brand);\n                    fill: none;\n                    stroke-width: 1.8;\n                    stroke-linecap: round;\n                    stroke-linejoin: round;\n                }\n                .fmcg-case-study .mc-title {\n                    font-size: 15px;\n                    font-weight: 600;\n                    margin-bottom: 8px;\n                    letter-spacing: -.01em;\n                    color: var(--ink);\n                }\n                .fmcg-case-study .mc-desc {\n                    font-size: 13px;\n                    color: var(--ink3);\n                    line-height: 1.6;\n                    margin: 0 0 16px;\n                }\n                .fmcg-case-study .mc-tags {\n                    display: flex;\n                    flex-wrap: wrap;\n                    gap: 6px;\n                }\n                .fmcg-case-study .mc-tag {\n                    font-family: var(--mono);\n                    font-size: 10px;\n                    color: var(--brand);\n                    background: var(--brand-light);\n                    padding: 2px 8px;\n                    border-radius: 4px;\n                    letter-spacing: .04em;\n                }\n\n                .fmcg-case-study .service-matrix { margin-top: 40px; border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; }\n                .fmcg-case-study .sm-header { display: grid; grid-template-columns: 200px repeat(4, 1fr); background: var(--off); border-bottom: 1px solid var(--ln); }\n                .fmcg-case-study .sm-cell { padding: 14px 16px; font-family: var(--mono); font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: var(--ink4); font-weight: 500; }\n                .fmcg-case-study .sm-row { display: grid; grid-template-columns: 200px repeat(4, 1fr); border-bottom: 1px solid var(--ln); }\n                .fmcg-case-study .sm-row:last-child { border-bottom: none; }\n                .fmcg-case-study .sm-service { padding: 14px 16px; font-size: 13px; font-weight: 500; color: var(--ink); border-right: 1px solid var(--ln); }\n                .fmcg-case-study .sm-val { padding: 14px 16px; font-size: 12px; color: var(--ink3); display: flex; align-items: center; gap: 8px; border-right: 1px solid var(--ln); }\n                .fmcg-case-study .sm-val:last-child { border-right: none; }\n                .fmcg-case-study .sm-check { color: var(--gm); font-size: 14px; }\n                .fmcg-case-study .sm-price { font-family: var(--mono); font-weight: 600; color: var(--brand); }\n\n                .fmcg-case-study .metrics-visual { margin-top: 56px; }\n                .fmcg-case-study .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; align-items: start; }\n                .fmcg-case-study .metric-ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }\n                .fmcg-case-study .metric-ring { position: relative; width: 120px; height: 120px; flex-shrink: 0; }\n                .fmcg-case-study .metric-ring svg { transform: rotate(-90deg); }\n                .fmcg-case-study .metric-ring-bg { stroke: var(--ln); fill: none; stroke-width: 6; }\n                .fmcg-case-study .metric-ring-fill { fill: none; stroke-width: 6; stroke-linecap: round; transition: stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1); }\n                .fmcg-case-study .metric-ring-label { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }\n                .fmcg-case-study .metric-ring-val { font-size: 38px; color: var(--ink); line-height: 1; font-weight: 400; letter-spacing: -.02em; }\n                .fmcg-case-study .metric-ring-unit { font-size: 13px; font-weight: 500; color: var(--brand); letter-spacing: 0; margin-top: 4px; }\n                .fmcg-case-study .metric-ring-title { font-size: 13px; font-weight: 600; color: var(--ink); text-align: center; }\n                .fmcg-case-study .metric-ring-desc { font-size: 12px; color: var(--ink4); text-align: center; line-height: 1.5; }\n\n\n                .fmcg-case-study .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; background: var(--w); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 40px; }\n                .fmcg-case-study .impact-stat { padding: 32px 26px; border-right: 1px solid var(--ln); }\n                .fmcg-case-study .impact-stat:last-child { border-right: none; }\n                .fmcg-case-study .stat-num { font-family: var(--sans); font-size: 46px; font-weight: 800; color: var(--ink); line-height: 1; letter-spacing: -.05em; margin-bottom: 5px; }\n                .fmcg-case-study .stat-unit { font-family: var(--mono); font-size: 11px; color: var(--brand); letter-spacing: 0.08em; display: block; margin-bottom: 6px; font-weight: 500; text-transform: uppercase; }\n                .fmcg-case-study .stat-desc { font-size: 14px; color: var(--ink3); line-height: 1.65; font-weight: 300; }\n\n                .fmcg-case-study .tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; }\n                .fmcg-case-study .tech-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: background .2s, border-color .2s; }\n                .fmcg-case-study .tech-card:hover { background: var(--off); border-color: var(--ln2); }\n                .fmcg-case-study .tech-layer { font-family: var(--mono); font-size: 10px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }\n                .fmcg-case-study .tech-title { font-size: 15px; font-weight: 600; letter-spacing: -.01em; margin-bottom: 12px; color: var(--ink); }\n                .fmcg-case-study .tech-items { display: flex; flex-direction: column; gap: 8px; }\n                .fmcg-case-study .tech-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.55; }\n                .fmcg-case-study .tech-item::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: var(--brand); flex-shrink: 0; display: block; margin-top: 6px; }\n                @media(max-width:900px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; } }\n                @media(max-width:600px){ .fmcg-case-study .tech-grid { grid-template-columns: 1fr; } }\n\n                .fmcg-case-study .learning-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }\n                .fmcg-case-study .learning-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; display: flex; gap: 18px; transition: all .2s; }\n                .fmcg-case-study .learning-card:hover { background: var(--off); border-color: var(--ln2); }\n                .fmcg-case-study .lc-num { font-size: 38px; font-weight: 800; color: var(--ln2); line-height: 1; flex-shrink: 0; min-width: 46px; letter-spacing: -.04em; }\n                .fmcg-case-study .lc-cat { font-family: var(--mono); font-size: 9px; color: var(--brand); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 6px; }\n                .fmcg-case-study .lc-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; letter-spacing: -.01em; }\n                .fmcg-case-study .lc-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.7; margin-bottom: 10px; }\n                .fmcg-case-study .lc-rule { font-family: var(--mono); font-size: 10px; color: var(--gm); background: var(--gbg); padding: 5px 10px; border-radius: 4px; letter-spacing: .04em; }\n\n                /* RESULTS BAND CSS */\n                .fmcg-case-study .results-band { background: var(--w); color: var(--ink); padding: 100px 0; margin: 0; border-top: 1px solid var(--ln); border-bottom: 1px solid var(--ln); }\n                .fmcg-case-study .results-band h2 { color: var(--ink); }\n                .fmcg-case-study .results-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--ln); border: 1px solid var(--ln); border-radius: 10px; overflow: hidden; margin-top: 60px; }\n                .fmcg-case-study .result-cell { background: var(--w); padding: 32px 28px; transition: background .2s; position: relative; overflow: hidden; }\n                .fmcg-case-study .result-cell::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--brand), transparent); opacity: 0; transition: opacity .3s; }\n                .fmcg-case-study .result-cell:hover { background: var(--off); }\n                .fmcg-case-study .result-cell:hover::after { opacity: 1; }\n                .fmcg-case-study .result-num { font-size: 52px; color: var(--ink); line-height: 1; margin-bottom: 6px; letter-spacing: -0.02em; font-weight: 500; }\n                .fmcg-case-study .result-num span { color: var(--brand); font-weight: 400; }\n                .fmcg-case-study .result-label { font-size: 14px; color: var(--ink3); line-height: 1.4; font-weight: 500; }\n                .fmcg-case-study .result-note { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--brand); margin-top: 6px; letter-spacing: .08em; text-transform: uppercase; }\n\n                /* BROADER CONTEXT CSS */\n                .fmcg-case-study .context-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }\n                .fmcg-case-study .ctx-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 24px; transition: all .2s; }\n                .fmcg-case-study .ctx-card:hover { background: var(--off); border-color: var(--ln2); }\n                .fmcg-case-study .ctx-icon { font-size: 24px; margin-bottom: 12px; display: block; }\n                .fmcg-case-study .ctx-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -.01em; color: var(--ink); }\n                .fmcg-case-study .ctx-body { font-size: 13px; font-weight: 300; color: var(--ink3); line-height: 1.65; margin: 0; }\n\n                /* ROADMAP CSS */\n                .fmcg-case-study .roadmap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }\n                .fmcg-case-study .rm-card { background: var(--w); border: 1px solid var(--ln); border-radius: 10px; padding: 28px; position: relative; transition: all .2s; }\n                .fmcg-case-study .rm-card:not(.current):hover { background: var(--off); border-color: var(--ln2); }\n                .fmcg-case-study .rm-card.current { border-color: var(--brand-border); background: var(--brand-light); }\n                .fmcg-case-study .rm-badge { position: absolute; top: 20px; right: 20px; font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 3px 9px; border-radius: 10px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; }\n                .fmcg-case-study .rm-badge.shipped { background: var(--gbg); color: var(--gm); }\n                .fmcg-case-study .rm-badge.active { background: var(--brand); color: #fff; }\n                .fmcg-case-study .rm-badge.planned { background: var(--off2); color: var(--ink3); }\n                .fmcg-case-study .rm-phase { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--ink4); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; font-weight: 500; }\n                .fmcg-case-study .rm-title { font-size: 17px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 14px; color: var(--ink); line-height: 1.3; }\n                .fmcg-case-study .rm-items { display: flex; flex-direction: column; gap: 8px; }\n                .fmcg-case-study .rm-item { font-size: 13px; font-weight: 300; color: var(--ink3); display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }\n                .fmcg-case-study .rm-card.current .rm-item { color: var(--ink2); }\n                .fmcg-case-study .rm-item::before { content: '\u2192'; color: var(--brand); flex-shrink: 0; font-size: 12px; margin-top: 1px; font-weight: 600; }\n                \n                @media(max-width:900px){\n                    .fmcg-case-study section { padding: 80px 0; }\n                    .fmcg-case-study .two-col { grid-template-columns: 1fr; gap: 40px; }\n                    .fmcg-case-study .g4 { grid-template-columns: 1fr; }\n                    .fmcg-case-study .alerts { grid-template-columns: 1fr; }\n                    .fmcg-case-study .impact-stat { border-right: none; border-bottom: 1px solid var(--ln); }\n                    .fmcg-case-study .impact-stat:last-child { border-bottom: none; }\n                    .fmcg-case-study .problem-grid, .fmcg-case-study .ba-grid, .fmcg-case-study .vis-impact, .fmcg-case-study .journey-services { grid-template-columns: 1fr; gap: 32px; }\n                    .fmcg-case-study .journey-steps { overflow-x: auto; padding-bottom: 32px; gap: 32px; justify-content: flex-start; }\n                    .fmcg-case-study .journey-steps::before { right: -300px; }\n                    .fmcg-case-study .journey-step { min-width: 100px; flex: none; }\n                    .fmcg-case-study .module-grid { grid-template-columns: 1fr 1fr; }\n                    .fmcg-case-study .sm-header, .fmcg-case-study .sm-row { grid-template-columns: 140px repeat(2, 1fr); }\n                    .fmcg-case-study .metrics-row { grid-template-columns: 1fr 1fr; }\n                    .fmcg-case-study .results-grid { grid-template-columns: 1fr 1fr; }\n                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr 1fr; gap: 16px; }\n                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr 1fr; }\n                    .fmcg-case-study .roadmap-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study .context-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study h1 { font-size: clamp(38px, 10vw, 60px); }\n                    .fmcg-case-study .hero-meta { grid-template-columns: 1fr 1fr; gap: 20px; width: 100%; border-top: none; padding-top: 0; }\n                    .fmcg-case-study .hm { border-right: none; margin-right: 0; padding-right: 0; border-bottom: 1px solid var(--ln); padding-bottom: 14px; }\n                    .fmcg-case-study .hero-inner { grid-template-columns: 1fr; gap: 48px; }\n                    .fmcg-case-study #hero { padding: 100px 0 60px; min-height: auto; }\n                    .fmcg-case-study .hero-visual { min-height: 400px; }\n                }\n                @media(max-width:600px){\n                    .fmcg-case-study .tech-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study .learning-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study .module-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study .metrics-row { grid-template-columns: 1fr; }\n                    .fmcg-case-study .results-grid { grid-template-columns: 1fr; }\n                    .fmcg-case-study .sm-header, .fmcg-case-study .sm-row { grid-template-columns: 1fr; }\n                }\n                \n                @keyframes patient-anim {\n                    0%, 15% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }\n                    40%, 60% { transform: translateY(-120px) translateX(40px) scale(0.9); opacity: 0; }\n                    70% { transform: translateY(-40px) translateX(0) scale(0.95); opacity: 0; }\n                    85%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 1; }\n                }\n                .fmcg-case-study .patient-cube {\n                    animation: patient-anim 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;\n                }\n            "}),t.jsxs("section",{id:"hero",children:[t.jsx("div",{className:"hero-grid"}),t.jsx("div",{className:"max-w-7xl mx-auto px-6 w-full",children:t.jsxs("div",{className:"hero-inner",children:[t.jsxs("div",{className:"hero-content",children:[t.jsxs("h1",{className:"fade d2",children:["Medical Operations",t.jsx("br",{}),"Control ",t.jsx("em",{children:"System"})]}),t.jsx("p",{className:"lead fade d3",children:"How Cikitsa International rebuilt its cross-border healthcare infrastructure \u2014 replacing fragmented Google Sheets with a unified, real-time operations platform managing 2,100+ patient journeys from Bangladesh to India annually."}),t.jsxs("div",{className:"hero-meta fade d4",children:[t.jsxs("div",{className:"hm",children:[t.jsx("div",{className:"hm-label",children:"Industry"}),t.jsx("div",{className:"hm-val",children:"Medical Tourism"})]}),t.jsxs("div",{className:"hm",children:[t.jsx("div",{className:"hm-label",children:"Location"}),t.jsx("div",{className:"hm-val",children:"Dhaka, Bangladesh"})]}),t.jsxs("div",{className:"hm",children:[t.jsx("div",{className:"hm-label",children:"Timeline"}),t.jsx("div",{className:"hm-val",children:"2022 \u2013 2025"})]}),t.jsxs("div",{className:"hm",children:[t.jsx("div",{className:"hm-label",children:"Scale"}),t.jsx("div",{className:"hm-val",children:"2,110+ Cases"})]})]})]}),t.jsx("div",{className:"hero-visual fade d3",children:t.jsx(l.div,{className:"structure-container",style:{y:r},children:(()=>{const s=(s,e,a)=>({x:34.64*s-34.64*e,y:20*s+20*e-40*a}),e=[{c:0,r:0,h:0},{c:1,r:0,h:0},{c:2,r:0,h:0},{c:0,r:1,h:0},{c:1,r:1,h:0},{c:2,r:1,h:0},{c:0,r:0,h:1},{c:1,r:0,h:1},{c:0,r:1,h:1},{c:1,r:1,h:1},{c:0,r:0,h:2}];e.sort((s,e)=>100*s.h+s.r+s.c-(100*e.h+e.r+e.c));const a=.5,i=s(-a,-a,-.2),n=s(3.5,-a,-.2),l=s(3.5,3.5,-.2),r=s(-a,3.5,-.2);return t.jsxs("svg",{viewBox:"0 0 500 440",className:"structure-svg","aria-hidden":"true",children:[t.jsxs("defs",{children:[t.jsxs("linearGradient",{id:"topGlowMocs",x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[t.jsx("stop",{offset:"0%",stopColor:"#FFFFFF",stopOpacity:"0.5"}),t.jsx("stop",{offset:"100%",stopColor:"#FFFFFF",stopOpacity:"0"})]}),t.jsx("filter",{id:"shadowMocs",x:"-20%",y:"-20%",width:"140%",height:"140%",children:t.jsx("feDropShadow",{dx:"0",dy:"4",stdDeviation:"4",floodOpacity:"0.08"})})]}),t.jsxs("g",{transform:"translate(250, 260)",children:[t.jsx("polygon",{points:`${i.x},${i.y} ${n.x},${n.y} ${l.x},${l.y} ${r.x},${r.y}`,fill:"#F8FAFC",stroke:"#E2E8F0",strokeWidth:"1.5"}),t.jsx("polygon",{points:`${r.x},${r.y} ${l.x},${l.y} ${l.x},${l.y+12} ${r.x},${r.y+12}`,fill:"#F1F5F9",stroke:"#E2E8F0",strokeWidth:"1.5"}),t.jsx("polygon",{points:`${l.x},${l.y} ${n.x},${n.y} ${n.x},${n.y+12} ${l.x},${l.y+12}`,fill:"#E2E8F0",stroke:"#CBD5E1",strokeWidth:"1.5"}),e.map((e,a)=>{const i=s(e.c,e.r,e.h);return t.jsxs("g",{transform:`translate(${i.x}, ${i.y})`,children:[t.jsx("polygon",{points:"0,-40 34.64,-20 0,0 -34.64,-20",fill:"rgba(79, 70, 229, 0.25)",stroke:"rgba(255, 255, 255, 0.5)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"-34.64,-20 0,0 0,40 -34.64,20",fill:"rgba(79, 70, 229, 0.45)",stroke:"rgba(255, 255, 255, 0.3)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"0,0 34.64,-20 34.64,20 0,40",fill:"rgba(49, 46, 129, 0.65)",stroke:"rgba(255, 255, 255, 0.2)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"0,-40 34.64,-20 0,0 -34.64,-20",fill:"url(#topGlowMocs)",opacity:"0.6"})]},a)}),t.jsxs("g",{className:"ui-overlay",transform:`translate(${l.x}, ${l.y})`,children:[t.jsx("circle",{cx:"0",cy:"0",r:"2",fill:"var(--brand)"}),t.jsx("path",{d:"M 0 0 L 0 30 L -20 30",fill:"none",stroke:"var(--brand)",strokeWidth:"1",opacity:"0.5"}),t.jsx("rect",{x:"-116",y:"21",width:"92",height:"18",rx:"2",fill:"rgba(255,255,255,0.9)",stroke:"var(--ln)",filter:"url(#shadowMocs)"}),t.jsx("circle",{cx:"-108",cy:"30",r:"3.5",fill:"var(--brand)"}),t.jsx("text",{x:"-98",y:"33",fontSize:"8",fontFamily:"var(--mono)",letterSpacing:"0.05em",fill:"var(--ink2)",fontWeight:"600",children:"FINANCE ENGINE"})]}),(()=>{const e=s(0,1,1);return t.jsxs("g",{className:"ui-overlay",transform:`translate(${e.x}, ${e.y-40})`,children:[t.jsx("circle",{cx:"0",cy:"0",r:"2",fill:"var(--brand)"}),t.jsx("path",{d:"M 0 0 L -30 0 L -30 20",fill:"none",stroke:"var(--brand)",strokeWidth:"1",opacity:"0.5"}),t.jsx("rect",{x:"-82",y:"20",width:"82",height:"18",rx:"2",fill:"rgba(255,255,255,0.9)",stroke:"var(--ln)",filter:"url(#shadowMocs)"}),t.jsx("circle",{cx:"-74",cy:"29",r:"3.5",fill:"var(--brand)"}),t.jsx("text",{x:"-64",y:"32",fontSize:"8",fontFamily:"var(--mono)",letterSpacing:"0.05em",fill:"var(--ink2)",fontWeight:"600",children:"VISA KANBAN"})]})})(),(()=>{const e=s(0,0,2);return t.jsxs("g",{className:"ui-overlay",transform:`translate(${e.x}, ${e.y-40})`,children:[t.jsx("circle",{cx:"0",cy:"0",r:"2",fill:"var(--brand)"}),t.jsx("path",{d:"M 0 0 L 0 -30 L -20 -30",fill:"none",stroke:"var(--brand)",strokeWidth:"1",opacity:"0.5"}),t.jsx("rect",{x:"-136",y:"-39",width:"112",height:"18",rx:"2",fill:"rgba(255,255,255,0.9)",stroke:"var(--ln)",filter:"url(#shadowMocs)"}),t.jsx("circle",{cx:"-128",cy:"-30",r:"3.5",fill:"var(--brand)"}),t.jsx("text",{x:"-118",y:"-27",fontSize:"8",fontFamily:"var(--mono)",letterSpacing:"0.05em",fill:"var(--ink2)",fontWeight:"600",children:"LIVE OPS DASHBOARD"})]})})(),t.jsx("g",{className:"patient-cube",children:(()=>{const e=s(2,2,0);return t.jsxs("g",{transform:`translate(${e.x}, ${e.y})`,children:[t.jsx("polygon",{points:"0,-40 34.64,-20 0,0 -34.64,-20",fill:"rgba(99, 102, 241, 0.4)",stroke:"rgba(255, 255, 255, 0.8)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"-34.64,-20 0,0 0,40 -34.64,20",fill:"rgba(79, 70, 229, 0.6)",stroke:"rgba(255, 255, 255, 0.5)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"0,0 34.64,-20 34.64,20 0,40",fill:"rgba(49, 46, 129, 0.85)",stroke:"rgba(255, 255, 255, 0.4)",strokeWidth:"0.8"}),t.jsx("polygon",{points:"0,-40 34.64,-20 0,0 -34.64,-20",fill:"url(#topGlowMocs)",opacity:"0.9"}),t.jsxs("g",{className:"ui-overlay",children:[t.jsx("circle",{cx:"0",cy:-40,r:"2",fill:"var(--brand)"}),t.jsx("path",{d:"M 0 -40 L 0 -70 L 20 -70",fill:"none",stroke:"var(--brand)",strokeWidth:"1",opacity:"0.5"}),t.jsx("rect",{x:"24",y:-79,width:"92",height:"18",rx:"2",fill:"rgba(255,255,255,0.9)",stroke:"var(--ln)",filter:"url(#shadowMocs)"}),t.jsx("circle",{cx:"32",cy:-70,r:"3.5",fill:"#10B981"}),t.jsx("text",{x:"40",y:-67,fontSize:"8",fontFamily:"var(--mono)",letterSpacing:"0.05em",fill:"var(--ink2)",fontWeight:"600",children:"PATIENT PIPELINE"})]})]})})()})]})]})})()})})]})})]}),t.jsx("section",{id:"context",className:"alt",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsx("div",{className:"eyebrow",children:"01 \u2014 Context"}),t.jsxs("div",{className:"two-col",children:[t.jsxs("div",{className:"fade d1",children:[t.jsxs("h2",{children:["Medical tourism from Bangladesh to India isn't just complex \u2014 it's a massive ",t.jsx("em",{children:"coordination problem"})]}),t.jsx("p",{className:"body-copy",children:"Every year, tens of thousands of Bangladeshi patients travel to India seeking treatment at Apollo, Manipal, Fortis, and other leading hospital chains. The journey involves visa procurement, hospital appointment booking, interpreter services, airport logistics, and ongoing treatment tracking."}),t.jsx("p",{className:"body-copy",children:"Cikitsa International acts as the patient-side operations bridge \u2014 not a hospital, not a travel agency, but a specialist coordination layer between Bangladeshi patients (and their local travel agents) and the Indian healthcare system."}),t.jsx("p",{className:"body-copy",children:"By 2022, the operation was processing hundreds of patients annually with no unified system. Case data lived across personal WhatsApp threads, spreadsheet columns, and agent contacts' memories. Critical information \u2014 passport numbers, visa statuses, treatment stages \u2014 was routinely lost or duplicated."}),t.jsxs("div",{className:"context-quote",children:['"The follow-up notes were buried in a single cell. The finance team couldn\'t see commission rates. There was no way to know which visa was pending without scrolling through 2,000 rows."',t.jsx("cite",{children:"\u2014 Internal operational debrief, 2022"})]}),t.jsxs("p",{className:"body-copy",children:["MOCS was conceived not as a software project, but as a ",t.jsx("span",{className:"hl",children:"operational redesign"})," \u2014 the software is the artifact of that redesign."]})]}),t.jsxs("div",{className:"fade d2",children:[t.jsx("div",{className:"eyebrow",style:{marginTop:0},children:"Key Stakeholders"}),t.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"8px"},children:[t.jsxs("div",{className:"stakeholder-card",children:[t.jsx("div",{className:"sh-role",children:"Patients"}),t.jsx("div",{className:"sh-title",children:"Bangladeshi Medical Travelers"}),t.jsx("div",{className:"sh-desc",children:"Seeking treatment at Indian hospitals. Often unfamiliar with processes. Need visa, appointment, logistics, and translation support."})]}),t.jsxs("div",{className:"stakeholder-card",children:[t.jsx("div",{className:"sh-role",children:"Agents"}),t.jsx("div",{className:"sh-title",children:"Travel & Medical Agents (BD-side)"}),t.jsx("div",{className:"sh-desc",children:"Companies like SADIA TOURS, INDIA TOURS, KAMAL TRAVEL \u2014 intermediaries who bring patients to Cikitsa in exchange for commission on referred services."})]}),t.jsxs("div",{className:"stakeholder-card",children:[t.jsx("div",{className:"sh-role",children:"Partners"}),t.jsx("div",{className:"sh-title",children:"Indian Hospital Networks"}),t.jsx("div",{className:"sh-desc",children:"Apollo, Manipal, Fortis, Max, Artemis, Aster, and others \u2014 pay Cikitsa OP/IP commissions ranging from 5% to 24% depending on hospital and service category."})]}),t.jsxs("div",{className:"stakeholder-card",children:[t.jsx("div",{className:"sh-role",children:"Operations Team"}),t.jsx("div",{className:"sh-title",children:"Cikitsa Coordinators"}),t.jsx("div",{className:"sh-desc",children:"Sayem, Atiq, Jafor, Dihan, Shela \u2014 each handling patient sub-portfolios across hospitals, tracking visa pipeline, treatment status, and follow-ups."})]})]})]})]})]})}),t.jsx("section",{id:"problem",children:t.jsx("div",{className:"max-w-7xl mx-auto px-6 w-full",children:t.jsxs("div",{className:"wide fade",children:[t.jsx("div",{className:"eyebrow",children:"02 \u2014 Problem Space"}),t.jsxs("h2",{children:["Six operational failures",t.jsx("br",{}),"happening ",t.jsx("em",{children:"simultaneously"})]}),t.jsx("p",{className:"body-copy",children:"Before MOCS, the coordination failures weren't just inconveniences \u2014 they caused measurable patient harm, agent churn, and revenue leakage at every touchpoint of the journey."}),t.jsxs("div",{className:"problem-grid",children:[t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"01"}),t.jsx("div",{className:"pc-title",children:"No Single Source of Truth"}),t.jsx("p",{className:"pc-desc",children:'Patient data lived across Google Sheets, WhatsApp groups, and email chains. Visa status for the same patient could be "pending" in one place and "approved" in another.'})]}),t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"02"}),t.jsx("div",{className:"pc-title",children:"Visa Pipeline Blindness"}),t.jsx("p",{className:"pc-desc",children:"The VIL (Visa Invitation Letter) process \u2014 from application to approval to travel \u2014 had no formal tracking. Teams discovered expired visas only when patients called confused."})]}),t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"03"}),t.jsx("div",{className:"pc-title",children:"Commission Leakage"}),t.jsx("p",{className:"pc-desc",children:"Hospital commission rates (5\u201324% OP/IP) were undocumented. Coordinators used different rates for the same hospital across interactions, causing under-billing and agent disputes."})]}),t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"04"}),t.jsx("div",{className:"pc-title",children:"Follow-up Chaos"}),t.jsx("p",{className:"pc-desc",children:'Treatment follow-ups were tracked as free-text remarks ("will go some days later", "not rcv"). No structured reminder system existed \u2014 critical callbacks fell through the cracks.'})]}),t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"05"}),t.jsx("div",{className:"pc-title",children:"Hospital Rate Fragmentation"}),t.jsx("p",{className:"pc-desc",children:"Each of 7 hospital chains had unique service structures \u2014 VIL fees, telemedicine rates, pickup charges, transplant packages. No unified view existed for accurate quoting."})]}),t.jsxs("div",{className:"problem-cell",children:[t.jsx("span",{className:"pc-number",children:"06"}),t.jsx("div",{className:"pc-title",children:"Agent Accountability Gap"}),t.jsx("p",{className:"pc-desc",children:"30+ travel agents referred patients with no systematic tracking of which agent brought which patient, making commission reconciliation impossible and accountability nonexistent."})]})]}),t.jsxs("div",{className:"ba-grid fade",style:{marginTop:48},children:[t.jsxs("div",{className:"ba-card",children:[t.jsxs("div",{className:"ba-head before",children:[t.jsx("div",{className:"ba-dot"}),t.jsx("div",{className:"ba-lbl",children:"Before \u2014 Spreadsheets"})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Patient status"})," \u2014 tracked in mixed-language WhatsApp notes. No unified record, no history."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Visa pipeline"})," \u2014 invisible. Failures discovered reactively after applications expired."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Service pricing"})," \u2014 coordinator-dependent quoting. No standard rate reference, disputes routine."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Follow-ups"})," \u2014 written as free text with no dates or reminders. Operationally dead."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Agent commissions"})," \u2014 reconciled manually at month-end. 4\u20136 disputes every month."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Coordinator onboarding"})," \u2014 3\u20134 weeks to get up to speed, no documented system."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-bad",children:"\u2715"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Hospital rates"})," \u2014 coverage unknown. No comparative rate view across chains or cities."]})]})]}),t.jsxs("div",{className:"ba-card",children:[t.jsxs("div",{className:"ba-head after",children:[t.jsx("div",{className:"ba-dot"}),t.jsx("div",{className:"ba-lbl",children:"After \u2014 MOCS"})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Patient status"})," \u2014 unified record with structured fields, status taxonomy, and full history."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Visa pipeline"})," \u2014 Kanban view with stage tracking, date-stamped history, and proactive alerts."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Service pricing"})," \u2014 centralized rate matrix for 7 hospital chains across 30+ cities."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Follow-ups"})," \u2014 structured log with date, outcome, and next action. Queryable history."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Agent commissions"})," \u2014 agent attribution on every record. Auto-reconciled. Zero disputes."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Coordinator onboarding"})," \u2014 operational in under 1 day with a guided, documented system."]})]}),t.jsxs("div",{className:"ba-row",children:[t.jsx("span",{className:"ba-mark bm-good",children:"\u2713"}),t.jsxs("div",{children:[t.jsx("strong",{style:{fontWeight:500},children:"Hospital rates"})," \u2014 cross-hospital rate comparison at a glance for accurate quoting."]})]})]})]}),t.jsxs("div",{className:"vis-impact fade d3",children:[t.jsxs("div",{className:"vis-chart-wrap",children:[t.jsx("div",{className:"vis-chart-title",children:"Case Volume Growth \xb7 2022 \u2192 2025"}),t.jsxs("div",{className:"vis-bars",children:[t.jsxs("div",{className:"vis-bar-group",children:[t.jsx("div",{className:"vis-bar-val",children:"~600"}),t.jsx("div",{className:"vis-bar",style:{height:34,background:"var(--ln)"}}),t.jsx("div",{className:"vis-bar-lbl",children:"2022"})]}),t.jsxs("div",{className:"vis-bar-group",children:[t.jsx("div",{className:"vis-bar-val",children:"~1,100"}),t.jsx("div",{className:"vis-bar",style:{height:62,background:"var(--ln2)"}}),t.jsx("div",{className:"vis-bar-lbl",children:"2023"})]}),t.jsxs("div",{className:"vis-bar-group",children:[t.jsx("div",{className:"vis-bar-val",children:"~1,700"}),t.jsx("div",{className:"vis-bar",style:{height:96,background:"var(--brand-border)"}}),t.jsx("div",{className:"vis-bar-lbl",children:"2024"})]}),t.jsxs("div",{className:"vis-bar-group",children:[t.jsx("div",{className:"vis-bar-val",style:{color:"var(--brand)",fontWeight:600},children:"2,110+"}),t.jsx("div",{className:"vis-bar",style:{height:126,background:"var(--brand)"}}),t.jsx("div",{className:"vis-bar-lbl",style:{color:"var(--brand)"},children:"2025"})]})]}),t.jsx("div",{className:"vis-axis"})]}),t.jsxs("div",{className:"vis-comparison",children:[t.jsx("div",{style:{fontFamily:"var(--mono)",fontSize:10,color:"var(--ink4)",letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:4},children:"Key Metric Improvements"}),t.jsxs("div",{className:"vis-comp-item",children:[t.jsxs("div",{className:"vis-comp-label",children:[t.jsx("span",{className:"vis-comp-name",children:"Visa Success Rate"}),t.jsxs("div",{className:"vis-comp-vals",children:[t.jsx("span",{className:"vis-comp-before",children:"~78%"}),t.jsx("span",{className:"vis-comp-after",children:"97%"})]})]}),t.jsx("div",{className:"vis-comp-track",children:t.jsx("div",{className:"vis-comp-fill",style:{width:"97%",background:"var(--brand)"}})})]}),t.jsxs("div",{className:"vis-comp-item",children:[t.jsxs("div",{className:"vis-comp-label",children:[t.jsx("span",{className:"vis-comp-name",children:"Commission Disputes / Month"}),t.jsxs("div",{className:"vis-comp-vals",children:[t.jsx("span",{className:"vis-comp-before",children:"4\u20136"}),t.jsx("span",{className:"vis-comp-after",children:"0"})]})]}),t.jsx("div",{className:"vis-comp-track",children:t.jsx("div",{className:"vis-comp-fill",style:{width:"2%",background:"var(--brand)"}})})]}),t.jsxs("div",{className:"vis-comp-item",children:[t.jsxs("div",{className:"vis-comp-label",children:[t.jsx("span",{className:"vis-comp-name",children:"Coordinator Onboarding"}),t.jsxs("div",{className:"vis-comp-vals",children:[t.jsx("span",{className:"vis-comp-before",children:"3\u20134 wks"}),t.jsx("span",{className:"vis-comp-after",children:"<1 day"})]})]}),t.jsx("div",{className:"vis-comp-track",children:t.jsx("div",{className:"vis-comp-fill",style:{width:"96%",background:"var(--brand)"}})})]}),t.jsxs("div",{className:"vis-comp-item",children:[t.jsxs("div",{className:"vis-comp-label",children:[t.jsx("span",{className:"vis-comp-name",children:"Rate Quoting Accuracy"}),t.jsxs("div",{className:"vis-comp-vals",children:[t.jsx("span",{className:"vis-comp-before",children:"~60%"}),t.jsx("span",{className:"vis-comp-after",children:"100%"})]})]}),t.jsx("div",{className:"vis-comp-track",children:t.jsx("div",{className:"vis-comp-fill",style:{width:"100%",background:"var(--brand)"}})})]}),t.jsxs("div",{className:"vis-comp-item",children:[t.jsxs("div",{className:"vis-comp-label",children:[t.jsx("span",{className:"vis-comp-name",children:"Case Volume Growth"}),t.jsxs("div",{className:"vis-comp-vals",children:[t.jsx("span",{className:"vis-comp-before",children:"baseline"}),t.jsx("span",{className:"vis-comp-after",children:"+340%"})]})]}),t.jsx("div",{className:"vis-comp-track",children:t.jsx("div",{className:"vis-comp-fill",style:{width:"80%",background:"var(--brand)"}})})]})]})]})]})})}),t.jsx("section",{id:"journey",className:"alt",children:t.jsx("div",{className:"max-w-7xl mx-auto px-6 w-full",children:t.jsxs("div",{className:"wide fade",children:[t.jsx("div",{className:"eyebrow",children:"03 \u2014 Patient Journey"}),t.jsxs("h2",{children:["Seven stages from ",t.jsx("em",{children:"first contact"}),t.jsx("br",{}),"to treatment completion"]}),t.jsx("p",{className:"body-copy",children:"MOCS maps every patient interaction to a discrete, trackable stage. Understanding the full journey was the foundation of the system design \u2014 each stage became a data entity."}),t.jsxs("div",{className:"journey-wrap fade d2",children:[t.jsxs("div",{className:"journey-steps",children:[t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle done",children:"1"}),t.jsx("div",{className:"step-label",children:"Lead Intake"}),t.jsx("div",{className:"step-sub",children:"Agent/direct"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle done",children:"2"}),t.jsx("div",{className:"step-label",children:"Medical Review"}),t.jsx("div",{className:"step-sub",children:"Report analysis"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle done",children:"3"}),t.jsx("div",{className:"step-label",children:"VIL Issuance"}),t.jsx("div",{className:"step-sub",children:"\u09f3149 service"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle active",children:"4"}),t.jsx("div",{className:"step-label",children:"Visa Applied"}),t.jsx("div",{className:"step-sub",children:"IVAC tracking"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle",children:"5"}),t.jsx("div",{className:"step-label",children:"Visa Approved"}),t.jsx("div",{className:"step-sub",children:"\u2192 travel ready"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle",children:"6"}),t.jsx("div",{className:"step-label",children:"Under Treatment"}),t.jsx("div",{className:"step-sub",children:"OPD / IPD"})]}),t.jsxs("div",{className:"journey-step",children:[t.jsx("div",{className:"step-circle",children:"7"}),t.jsx("div",{className:"step-label",children:"Treatment Done"}),t.jsx("div",{className:"step-sub",children:"Commission filed"})]})]}),t.jsxs("div",{className:"journey-services fade d3",children:[t.jsxs("div",{className:"js-card",children:[t.jsx("div",{className:"js-card-title",children:"Pre-Travel Services"}),t.jsxs("div",{className:"js-list",children:[t.jsx("div",{children:"Visa Invitation Letter (VIL)"}),t.jsx("div",{children:"Doctor Appointment Booking"}),t.jsx("div",{children:"Report Review"}),t.jsx("div",{children:"Telemedicine Consultation"}),t.jsx("div",{children:"Cost Estimation"}),t.jsx("div",{children:"Expert Advisory Call"})]})]}),t.jsxs("div",{className:"js-card",children:[t.jsx("div",{className:"js-card-title",children:"At-Hospital Services"}),t.jsxs("div",{className:"js-list",children:[t.jsx("div",{children:"Airport Pickup & Drop"}),t.jsx("div",{children:"Hospital Guide (Medical Expert)"}),t.jsx("div",{children:"Local City Guide (Non-medical)"}),t.jsx("div",{children:"Railway Station Pickup"}),t.jsx("div",{children:"FRRO Assistance (visa extension)"}),t.jsx("div",{children:"On-ground coordination"})]})]}),t.jsxs("div",{className:"js-card",children:[t.jsx("div",{className:"js-card-title",children:"Specialty Packages"}),t.jsxs("div",{className:"js-list",children:[t.jsx("div",{children:"Liver Transplant (23\u201327L INR)"}),t.jsx("div",{children:"Kidney Transplant (14\u201318L INR)"}),t.jsx("div",{children:"IVF \u2013 First Cycle (\u20b93.95L)"}),t.jsx("div",{children:"OP Commission (5\u201324% by hosp.)"}),t.jsx("div",{children:"IP Commission (5\u201324% by hosp.)"}),t.jsx("div",{children:"Pharmacy & Lab Commission"})]})]})]})]})]})})}),t.jsx("section",{id:"system",children:t.jsx("div",{className:"max-w-7xl mx-auto px-6 w-full",children:t.jsxs("div",{className:"wide fade",children:[t.jsx("div",{className:"eyebrow",children:"04 \u2014 System Architecture"}),t.jsxs("h2",{children:["Three layers, ",t.jsx("em",{children:"one coherent"}),t.jsx("br",{}),"operational picture"]}),t.jsx("p",{className:"body-copy",children:"MOCS is architected around the three distinct operational domains that define Cikitsa's business \u2014 Patient Lifecycle, Visa Operations, and Financial Engine \u2014 each feeding into a unified control dashboard."}),t.jsxs("div",{className:"arch-diagram fade d2",children:[t.jsx("div",{className:"arch-layer",children:t.jsxs("div",{className:"arch-layer-row",children:[t.jsx("div",{className:"arch-layer-tag",children:"Interface"}),t.jsxs("div",{className:"arch-modules",children:[t.jsxs("div",{className:"arch-mod hl",children:[t.jsx("div",{className:"arch-mod-name",children:"Ops Dashboard"}),t.jsx("div",{className:"arch-mod-desc",children:"Real-time KPIs \xb7 Recent activity \xb7 Alerts \xb7 Team workload"})]}),t.jsxs("div",{className:"arch-mod hl",children:[t.jsx("div",{className:"arch-mod-name",children:"Patient Tracker"}),t.jsx("div",{className:"arch-mod-desc",children:"Full patient registry \xb7 Search/filter \xb7 Status management \xb7 Follow-up log"})]}),t.jsxs("div",{className:"arch-mod hl",children:[t.jsx("div",{className:"arch-mod-name",children:"Visa Pipeline"}),t.jsx("div",{className:"arch-mod-desc",children:"Kanban view \xb7 Stage transitions \xb7 Date tracking \xb7 IVAC status"})]}),t.jsxs("div",{className:"arch-mod hl",children:[t.jsx("div",{className:"arch-mod-name",children:"Finance Engine"}),t.jsx("div",{className:"arch-mod-desc",children:"Rate matrix \xb7 Commission calc \xb7 Agent ledger \xb7 Revenue tracking"})]}),t.jsxs("div",{className:"arch-mod hl",children:[t.jsx("div",{className:"arch-mod-name",children:"Hospital Network"}),t.jsx("div",{className:"arch-mod-desc",children:"Partner hospital profiles \xb7 City coverage \xb7 Service availability"})]})]})]})}),t.jsx("div",{className:"arch-connector",children:t.jsx("div",{className:"arch-connector-line"})}),t.jsx("div",{className:"arch-layer",children:t.jsxs("div",{className:"arch-layer-row",children:[t.jsx("div",{className:"arch-layer-tag",children:"Core Logic"}),t.jsxs("div",{className:"arch-modules",children:[t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Patient State Machine"}),t.jsx("div",{className:"arch-mod-desc",children:"Lead \u2192 VIL \u2192 Visa Applied \u2192 Approved \u2192 Travelling \u2192 Treatment \u2192 Done"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Service Pricing Engine"}),t.jsx("div",{className:"arch-mod-desc",children:"Per-hospital rate rules \xb7 AIT/VAT/SSL layering \xb7 CI vs Agent split \xb7 MRP vs final"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Agent Attribution"}),t.jsx("div",{className:"arch-mod-desc",children:"Agent \u2192 patient linking \xb7 Company tracking \xb7 Commission entitlement"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Follow-up Engine"}),t.jsx("div",{className:"arch-mod-desc",children:"Date-stamped log entries \xb7 Status change triggers \xb7 Coordinator assignment"})]})]})]})}),t.jsx("div",{className:"arch-connector",children:t.jsx("div",{className:"arch-connector-line"})}),t.jsx("div",{className:"arch-layer",children:t.jsxs("div",{className:"arch-layer-row",children:[t.jsx("div",{className:"arch-layer-tag",children:"Data"}),t.jsxs("div",{className:"arch-modules",children:[t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Patient Registry"}),t.jsx("div",{className:"arch-mod-desc",children:"2,110+ records \xb7 Passport \xb7 Contact \xb7 Hospital \xb7 Dept \xb7 Type \xb7 Handler"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Hospital Rate Table"}),t.jsx("div",{className:"arch-mod-desc",children:"7 chains \xb7 30+ cities \xb7 15+ service types \xb7 BDT/INR conversion"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Visa Invitation List"}),t.jsx("div",{className:"arch-mod-desc",children:"Active VIL applications \xb7 Call log \xb7 Remarks \xb7 Responsible coordinator"})]}),t.jsxs("div",{className:"arch-mod",children:[t.jsx("div",{className:"arch-mod-name",children:"Agent Directory"}),t.jsx("div",{className:"arch-mod-desc",children:"30+ agent companies \xb7 Contact linkage \xb7 Referral history"})]})]})]})})]})]})})}),t.jsx("section",{id:"services",children:t.jsx("div",{className:"max-w-7xl mx-auto px-6 w-full",children:t.jsxs("div",{className:"wide fade",children:[t.jsx("div",{className:"eyebrow",children:"05 \u2014 Service Model"}),t.jsxs("h2",{children:["A ",t.jsx("em",{children:"tiered service architecture"}),t.jsx("br",{}),"across every touchpoint"]}),t.jsx("p",{className:"body-copy",children:"Cikitsa's revenue model is built on service fees and hospital commissions. MOCS encodes the full pricing matrix \u2014 from \u09f3149 VIL letters to 24% IPD commissions \u2014 ensuring every coordinator quotes accurately."}),t.jsxs("div",{className:"service-matrix fade d2",children:[t.jsxs("div",{className:"sm-header",children:[t.jsx("div",{className:"sm-cell",children:"Service"}),t.jsx("div",{className:"sm-cell",children:"Apollo Chennai"}),t.jsx("div",{className:"sm-cell",children:"Manipal Bangalore"}),t.jsx("div",{className:"sm-cell",children:"Fortis Delhi"}),t.jsx("div",{className:"sm-cell",children:"Max Saket Delhi"})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Visa Invitation Letter"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f3149"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Doctor Appointment"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f3149"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f399"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Telemedicine (Consultant)"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f37,950"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,575"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,850"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f33,100"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Airport Pickup (BDT)"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f31,150\u20131,350"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f31,950\u20132,050"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f31,100\u20131,200"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f31,000\u20131,100"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Hospital Guide (24hr)"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,280"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,280"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,280"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u09f32,280"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"OP Commission (CI share)"}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"5%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"19\u201324%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"18%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"20%"})})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"IP Commission (CI share)"}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"5%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"19\u201324%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"18%"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{className:"sm-price",children:"20%"})})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"Liver Transplant (INR)"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"23\u201327L"})]}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"23\u201327L"})]}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{style:{color:"var(--ink4)"},children:"\u2014"})}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"23\u201327L"})]})]}),t.jsxs("div",{className:"sm-row",children:[t.jsx("div",{className:"sm-service",children:"IVF (1st cycle, \u20b9)"}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u20b93,95,000"})]}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{style:{color:"var(--ink4)"},children:"\u2014"})}),t.jsx("div",{className:"sm-val",children:t.jsx("span",{style:{color:"var(--ink4)"},children:"\u2014"})}),t.jsxs("div",{className:"sm-val",children:[t.jsx("span",{className:"sm-check",children:"\u2713"}),t.jsx("span",{className:"sm-price",children:"\u20b93,95,000"})]})]})]}),t.jsxs("div",{className:"metrics-visual fade d3",children:[t.jsx("div",{style:{fontFamily:"var(--mono)",fontSize:10,color:"var(--ink4)",letterSpacing:".14em",textTransform:"uppercase",marginBottom:28},children:"Revenue & Performance Snapshot"}),t.jsxs("div",{className:"metrics-row",children:[t.jsxs("div",{className:"metric-ring-wrap",children:[t.jsxs("div",{className:"metric-ring",children:[t.jsxs("svg",{viewBox:"0 0 120 120",width:"120",height:"120",children:[t.jsx("circle",{className:"metric-ring-bg",cx:"60",cy:"60",r:"50"}),t.jsx("circle",{className:"metric-ring-fill",cx:"60",cy:"60",r:"50",stroke:"var(--brand)",strokeDasharray:"0 314","data-val":"304",id:"ring-visa",style:{transition:"stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.5s"}})]}),t.jsxs("div",{className:"metric-ring-label",children:[t.jsx("div",{className:"metric-ring-val",children:"97"}),t.jsx("div",{className:"metric-ring-unit",children:"%"})]})]}),t.jsx("div",{className:"metric-ring-title",children:"Visa Success"}),t.jsx("div",{className:"metric-ring-desc",children:"vs. ~78% pre-MOCS"})]}),t.jsxs("div",{className:"metric-ring-wrap",children:[t.jsxs("div",{className:"metric-ring",children:[t.jsxs("svg",{viewBox:"0 0 120 120",width:"120",height:"120",children:[t.jsx("circle",{className:"metric-ring-bg",cx:"60",cy:"60",r:"50"}),t.jsx("circle",{className:"metric-ring-fill",cx:"60",cy:"60",r:"50",stroke:"#f0a43a",strokeDasharray:"0 314","data-val":"170",id:"ring-apollo",style:{transition:"stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.6s"}})]}),t.jsxs("div",{className:"metric-ring-label",children:[t.jsx("div",{className:"metric-ring-val",style:{color:"#b06800"},children:"54"}),t.jsx("div",{className:"metric-ring-unit",style:{color:"#b06800"},children:"%"})]})]}),t.jsx("div",{className:"metric-ring-title",children:"Apollo Share"}),t.jsx("div",{className:"metric-ring-desc",children:"of all patient cases"})]}),t.jsxs("div",{className:"metric-ring-wrap",children:[t.jsxs("div",{className:"metric-ring",children:[t.jsxs("svg",{viewBox:"0 0 120 120",width:"120",height:"120",children:[t.jsx("circle",{className:"metric-ring-bg",cx:"60",cy:"60",r:"50"}),t.jsx("circle",{className:"metric-ring-fill",cx:"60",cy:"60",r:"50",stroke:"#b083f0",strokeDasharray:"0 314","data-val":"75",id:"ring-ipd",style:{transition:"stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.7s"}})]}),t.jsxs("div",{className:"metric-ring-label",children:[t.jsx("div",{className:"metric-ring-val",style:{color:"#6e47be"},children:"24"}),t.jsx("div",{className:"metric-ring-unit",style:{color:"#6e47be"},children:"%"})]})]}),t.jsx("div",{className:"metric-ring-title",children:"Max IP Commission"}),t.jsx("div",{className:"metric-ring-desc",children:"Manipal Varthur/Whitefield"})]}),t.jsxs("div",{className:"metric-ring-wrap",children:[t.jsxs("div",{className:"metric-ring",children:[t.jsxs("svg",{viewBox:"0 0 120 120",width:"120",height:"120",children:[t.jsx("circle",{className:"metric-ring-bg",cx:"60",cy:"60",r:"50"}),t.jsx("circle",{className:"metric-ring-fill",cx:"60",cy:"60",r:"50",stroke:"var(--brand)",strokeDasharray:"0 314","data-val":"251",id:"ring-growth",style:{transition:"stroke-dasharray 1.6s cubic-bezier(.16, 1, .3, 1) 0.8s"}})]}),t.jsxs("div",{className:"metric-ring-label",children:[t.jsx("div",{className:"metric-ring-val",children:"340"}),t.jsx("div",{className:"metric-ring-unit",children:"%"})]})]}),t.jsx("div",{className:"metric-ring-title",children:"Volume Growth"}),t.jsx("div",{className:"metric-ring-desc",children:"Since system launch in 2022"})]})]})]})]})})}),t.jsx("div",{id:"artifacts",className:"artifact-section fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"06 \u2014 Design Hypothesis"}),t.jsxs("h2",{children:["From observation",t.jsx("br",{}),"to ",t.jsx("em",{children:"intentional system"})]}),t.jsx("p",{className:"body-copy",children:"The system wasn't built from a specification document. It was reverse-engineered from the operational failures of the spreadsheet era. Every major design decision directly answered a structural breakdown."})]}),t.jsx("div",{className:"artifact-content",children:t.jsx("div",{className:"hs-tl",id:"hs-tl",children:[{tag:"Observation \xb7 Stage 01",title:"The spreadsheet was collapsing under its own weight",quote:'"We knew patients were falling through the cracks. We just couldn\'t prove it from the data."',body:"The existing Google Sheets system had grown organically \u2014 columns were added as needs arose, with no schema discipline. The Patient Track sheet had 21+ columns, the Hospital Rate sheet had 80+ columns per row. Data integrity was near-zero: dates were free-text, statuses were inconsistent strings, and follow-up history was buried in single cells.",pills:["Data integrity near-zero","No schema discipline","Buried history"]},{tag:"Hypothesis \xb7 Stage 02",title:"Structure enables accountability. Accountability enables scale.",quote:'"The coordinators weren\'t disorganised. The data was."',body:"If each patient had a structured record with a defined status taxonomy, a separate follow-up log, and a linked agent attribution \u2014 coordinators would stop losing context. If the finance engine was encoded directly in the system rather than in a reference sheet, commission errors would disappear. Operational chaos was a data modeling problem, not a people problem.",pills:["Status taxonomy","Encoded finance engine","Linked attribution"]},{tag:"Design decision \xb7 Stage 03",title:"Model the data first. Build the interface around it.",quote:'"The schema is the design. The UI is just the surface."',body:"The first month was spent designing the data schema \u2014 defining the Patient entity, the status state machine (7 stages), the service pricing model, and the agent attribution model. The interface was built after. Every screen in MOCS is a projection of the data model \u2014 not a UX exercise that happened to store data.",pills:["Data schema first","7-stage state machine","UI as projection"]},{tag:"Validation \xb7 Stage 04",title:"Commission disputes dropped to zero within 60 days.",quote:'"The agents stopped arguing because the numbers were now undeniable."',body:"The clearest validation was financial. Before MOCS, the operations team fielded 4\u20136 agent commission disputes per month. After deployment, disputes stopped entirely. The rate matrix was encoded once, correctly, and became the system of record. No ambiguity, no negotiation.",pills:["Disputes \u2192 Zero","Single system of record","Financial validation"]},{tag:"Surprise finding \xb7 Stage 05",title:"The visa pipeline became a proactive, not reactive, tool.",quote:'"The system made invisible problems visible \u2014 and that was enough."',body:'The kanban visa pipeline was expected to provide clarity. What wasn\'t expected was how it changed coordinator behaviour. Before, coordinators called patients reactively. After, the pipeline surfaced patients who had been in "Applied" for more than two weeks, prompting proactive outreach. Visa success rate improved from ~78% to 97%.',pills:["Proactive outreach","Pipeline visibility","78% \u2192 97% visa success"]}].map((s,e)=>t.jsxs("div",{className:"hs-row "+(o===e?"on":""),onClick:()=>c(e),tabIndex:0,role:"button",onKeyDown:s=>{"Enter"!==s.key&&" "!==s.key||c(e)},children:[t.jsxs("div",{className:"hs-col",children:[t.jsxs("div",{className:"hs-node",children:["0",e+1]}),t.jsx("div",{className:"hs-vl"})]}),t.jsxs("div",{className:"hs-card",children:[t.jsx("div",{className:"hs-tag",children:s.tag}),t.jsx("div",{className:"hs-ct",children:s.title}),t.jsxs("div",{className:"hs-body",children:[s.quote&&t.jsx("div",{className:"hs-quote",children:s.quote}),s.body,t.jsx("div",{className:"hs-pills",children:s.pills.map((s,e)=>t.jsx("span",{className:"hs-pill",children:s},e))})]})]})]},e))})})]})}),t.jsx("div",{id:"live-demo",className:"artifact-section",style:{padding:"100px 0",background:"#fff",borderTop:"1px solid var(--ln)",borderBottom:"1px solid var(--ln)"},children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"07 \u2014 Live System Demo"}),t.jsxs("h2",{children:["The MOCS interface,",t.jsx("br",{}),t.jsx("em",{children:"interactive"})]}),t.jsx("p",{className:"body-copy",children:"Fully functional simulation with real Cikitsa International data \u2014 patient tracking, visa pipeline, finance engine, hospital network, agent management, and analytics. All interactive, all connected."})]}),t.jsx("div",{className:"artifact-content",style:{marginTop:"48px"},children:t.jsx(e,{})})]})}),t.jsx("div",{className:"artifact-section alt fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"08 \u2014 How It Works"}),t.jsxs("h2",{children:["A patient arrives.",t.jsx("br",{}),t.jsx("em",{children:"Watch the system respond."})]}),t.jsx("p",{className:"body-copy",children:"Trace a single patient case through the full operational stack \u2014 from intake to commission filed \u2014 and see how each system layer activates in sequence."})]}),t.jsxs("div",{className:"artifact-content",children:[t.jsx("div",{className:"hw-steps-grid",id:"hw-steps",children:m.map((s,e)=>t.jsxs("div",{className:"hw-step "+(d===e?"on":""),onClick:()=>p(e),tabIndex:0,role:"button",onKeyDown:s=>{"Enter"===s.key&&p(e)},children:[t.jsxs("div",{className:"hw-sn",children:["Step 0",e+1]}),t.jsx("div",{className:"hw-st",children:s.title})]},e))}),t.jsxs("div",{className:"hw-detail",id:"hw-detail",children:[t.jsxs("div",{children:[t.jsx("div",{className:"hw-dtag",children:"What happens"}),t.jsx("div",{className:"hw-dl",children:m[d].desc})]}),t.jsxs("div",{children:[t.jsx("div",{className:"hw-dtag",children:"Live system fields"}),t.jsx("div",{className:"hw-dr",children:m[d].fields.map((s,e)=>t.jsxs("div",{className:"hw-field",children:[t.jsx("span",{className:"hw-fk",children:s[0]}),t.jsx("span",{className:"hw-fv"+(s[2]?" g":""),children:s[1]})]},e))})]})]})]})]})}),t.jsx("div",{id:"results",className:"artifact-section fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"09 \u2014 Results"}),t.jsxs("h2",{children:["Operational impact",t.jsx("br",{}),"across ",t.jsx("em",{children:"every metric"})]})]}),t.jsxs("div",{className:"artifact-content",children:[t.jsxs("div",{className:"context-grid fade d2",children:[t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsxs("svg",{viewBox:"0 0 24 24",children:[t.jsx("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),t.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]})}),t.jsx("div",{className:"ctx-title",children:"Zero commission disputes since deployment"}),t.jsx("div",{className:"ctx-body",children:"Before MOCS, 4\u20136 agent commission disputes per month required manual reconciliation. Since deployment, disputes have dropped to zero \u2014 rate matrix is now the single source of truth."})]}),t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsxs("svg",{viewBox:"0 0 24 24",children:[t.jsx("polyline",{points:"23 6 13.5 15.5 8.5 10.5 1 18"}),t.jsx("polyline",{points:"17 6 23 6 23 12"})]})}),t.jsx("div",{className:"ctx-title",children:"340% increase in tracked patient volume"}),t.jsx("div",{className:"ctx-body",children:"Cikitsa handled ~600 cases in 2022. MOCS enabled the same core team to manage 2,110+ cases by 2025 without proportional headcount growth."})]}),t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsxs("svg",{viewBox:"0 0 24 24",children:[t.jsx("path",{d:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"}),t.jsx("polyline",{points:"14 2 14 8 20 8"}),t.jsx("path",{d:"M9 15L11 17L15 13"})]})}),t.jsx("div",{className:"ctx-title",children:"Visa success rate improved to 97%"}),t.jsx("div",{className:"ctx-body",children:"From ~78% before MOCS. Proactive pipeline visibility allowed coordinators to intervene before visa applications expired or stalled."})]})]}),t.jsxs("div",{className:"g4 fade d3",style:{marginTop:"40px"},children:[t.jsxs("div",{className:"impact-stat",children:[t.jsx("div",{className:"stat-num",children:"2,110+"}),t.jsx("span",{className:"stat-unit",children:"Patients tracked"}),t.jsx("div",{className:"stat-desc",children:"Across all hospital chains, cities, and coordinators in the system."})]}),t.jsxs("div",{className:"impact-stat",children:[t.jsx("div",{className:"stat-num",children:"97%"}),t.jsx("span",{className:"stat-unit",children:"Visa success rate"}),t.jsx("div",{className:"stat-desc",children:"For patients with complete documentation submitted through MOCS."})]}),t.jsxs("div",{className:"impact-stat",children:[t.jsx("div",{className:"stat-num",children:"0"}),t.jsx("span",{className:"stat-unit",children:"Commission disputes"}),t.jsx("div",{className:"stat-desc",children:"Down from 4\u20136/month before the system was deployed."})]}),t.jsxs("div",{className:"impact-stat",children:[t.jsx("div",{className:"stat-num",children:"<1d"}),t.jsx("span",{className:"stat-unit",children:"Coordinator onboarding"}),t.jsx("div",{className:"stat-desc",children:"New team members operational in under one day vs. 3\u20134 weeks previously."})]})]})]})]})}),t.jsx("div",{id:"tech-approach",className:"artifact-section alt fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"10 \u2014 Stack Used"}),t.jsxs("h2",{children:["Designed for ",t.jsx("em",{children:"operational longevity"}),",",t.jsx("br",{}),"not technical novelty"]}),t.jsx("p",{className:"body-copy",children:"The stack was chosen explicitly to minimize maintenance burden on a small ops team \u2014 prioritizing reliability and access over sophistication."})]}),t.jsx("div",{className:"artifact-content",children:t.jsxs("div",{className:"tech-grid fade d2",children:[t.jsxs("div",{className:"tech-card",children:[t.jsx("div",{className:"tech-layer",children:"Data Layer"}),t.jsx("div",{className:"tech-title",children:"Source of Record"}),t.jsxs("div",{className:"tech-items",children:[t.jsx("div",{className:"tech-item",children:"Google Sheets \u2014 primary data store and patient registry"}),t.jsx("div",{className:"tech-item",children:"TSV export \u2192 structured JSON ingestion pipeline"}),t.jsx("div",{className:"tech-item",children:"BDT/INR dual-currency conversion engine"}),t.jsx("div",{className:"tech-item",children:"AIT/VAT/SSL fee computation layer"}),t.jsx("div",{className:"tech-item",children:"Structured schema migration from flat spreadsheet"})]})]}),t.jsxs("div",{className:"tech-card",children:[t.jsx("div",{className:"tech-layer",children:"Frontend"}),t.jsx("div",{className:"tech-title",children:"Interface Layer"}),t.jsxs("div",{className:"tech-items",children:[t.jsx("div",{className:"tech-item",children:"Vanilla HTML / CSS / JS (v1) \u2014 no framework, no bundler"}),t.jsx("div",{className:"tech-item",children:"React + Tailwind planned for v2 roadmap"}),t.jsx("div",{className:"tech-item",children:"Responsive, mobile-first layout"}),t.jsx("div",{className:"tech-item",children:"Light-theme operations shell"}),t.jsx("div",{className:"tech-item",children:"Zero external dependencies in v1"})]})]}),t.jsxs("div",{className:"tech-card",children:[t.jsx("div",{className:"tech-layer",children:"Design System"}),t.jsx("div",{className:"tech-title",children:"Hierarchy & Tone"}),t.jsxs("div",{className:"tech-items",children:[t.jsx("div",{className:"tech-item",children:"Plus Jakarta Sans \u2014 narrative and display copy"}),t.jsx("div",{className:"tech-item",children:"JetBrains Mono \u2014 all data fields and labels"}),t.jsx("div",{className:"tech-item",children:"14 CSS design tokens across the system"}),t.jsx("div",{className:"tech-item",children:"Semantic colour palette with ink hierarchy"}),t.jsx("div",{className:"tech-item",children:"Consistent pill and badge system"})]})]}),t.jsxs("div",{className:"tech-card",children:[t.jsx("div",{className:"tech-layer",children:"Roadmap"}),t.jsx("div",{className:"tech-title",children:"Planned Features"}),t.jsxs("div",{className:"tech-items",children:[t.jsx("div",{className:"tech-item",children:"WhatsApp Business API integration"}),t.jsx("div",{className:"tech-item",children:"Automated follow-up reminders"}),t.jsx("div",{className:"tech-item",children:"Agent self-service portal"}),t.jsx("div",{className:"tech-item",children:"Commission invoice generation"}),t.jsx("div",{className:"tech-item",children:"Analytics & trend dashboard"})]})]})]})})]})}),t.jsx("div",{id:"learnings",className:"artifact-section fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"11 \u2014 Key Learnings"}),t.jsxs("h2",{children:["What MOCS taught us",t.jsx("br",{}),"about ",t.jsx("em",{children:"operational systems"})]})]}),t.jsx("div",{className:"artifact-content",children:t.jsxs("div",{className:"learning-grid fade d2",children:[t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"01"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Data Modeling"}),t.jsx("div",{className:"lc-title",children:"The spreadsheet is the requirements doc"}),t.jsx("div",{className:"lc-body",children:"Every column in the patient sheet became a system field. Every remark pattern became a status enum. The spreadsheets \u2014 messy as they were \u2014 contained the full operational logic of the business."})]})]}),t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"02"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Status Design"}),t.jsx("div",{className:"lc-title",children:"Status taxonomy is business-critical"}),t.jsx("div",{className:"lc-body",children:"The difference between \u201cUnder Treatment\u201d and \u201cTreatment Done\u201d determines whether a coordinator follows up or files a commission. Getting the status set right was the single highest-impact design decision."})]})]}),t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"03"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Finance"}),t.jsx("div",{className:"lc-title",children:"Commission complexity needs explicit modeling"}),t.jsx("div",{className:"lc-body",children:"The hospital rate sheet had 80+ columns \u2014 AIT, VAT, SSL layering on base rates, different CI vs. agent splits, MRP vs. final. This isn\u2019t data entry. It\u2019s financial logic. Encoding it wrong produces silent errors."})]})]}),t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"04"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Follow-up Design"}),t.jsx("div",{className:"lc-title",children:"Structure is kindness to your future self"}),t.jsx("div",{className:"lc-body",children:"Unstructured notes like \u201cwill go some days later\u201d are operationally dead. Date-stamped, outcome-typed follow-up entries transformed a narrative mess into queryable history."})]})]}),t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"05"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Stakeholders"}),t.jsx("div",{className:"lc-title",children:"Multi-stakeholder systems need clear ownership"}),t.jsx("div",{className:"lc-body",children:"Every patient record touches four stakeholders \u2014 patient, agent, hospital, coordinator. The data model must be built for the most complex relationship, then simplified for simpler views."})]})]}),t.jsxs("div",{className:"learning-card",children:[t.jsx("div",{className:"lc-num",children:"06"}),t.jsxs("div",{children:[t.jsx("div",{className:"lc-cat",children:"Geography"}),t.jsx("div",{className:"lc-title",children:"City-branch granularity is non-negotiable"}),t.jsx("div",{className:"lc-body",children:"Apollo Chennai has different rates than Apollo Delhi. Manipal Varthur has different commissions than Manipal Kolkata. \u201cApollo\u201d as a single entity is categorically wrong as a data model."})]})]})]})})]})}),t.jsx("div",{id:"broader-context",className:"artifact-section alt fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsxs("div",{className:"artifact-header",children:[t.jsx("div",{className:"eyebrow",children:"12 \u2014 Broader Context"}),t.jsxs("h2",{children:["A massive industry",t.jsx("br",{}),"still running on ",t.jsx("em",{children:"spreadsheets"})]}),t.jsx("p",{className:"body-copy",children:"Over 800,000 Bangladeshis travel overseas for medical care each year. Bangladesh is India's absolute largest source of medical tourists, accounting for over 50% of all inbound patients. Yet, the coordination infrastructure serving this massive volume is largely still informal."})]}),t.jsx("div",{className:"artifact-content",children:t.jsxs("div",{className:"context-grid fade d2",children:[t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsxs("svg",{viewBox:"0 0 24 24",children:[t.jsx("circle",{cx:"12",cy:"12",r:"10"}),t.jsx("path",{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"}),t.jsx("path",{d:"M2 12h20"})]})}),t.jsx("div",{className:"ctx-title",children:"The market is enormous and growing"}),t.jsx("div",{className:"ctx-body",children:"Bangladesh accounts for over 50% of India's inbound medical tourists. On average, more than 1,300 Bangladeshis travel to India daily for medical treatment. Cikitsa International operates across 6 countries \u2014 India, Bangladesh, Singapore, Thailand, Dubai, and Turkey."})]}),t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsxs("svg",{viewBox:"0 0 24 24",children:[t.jsx("path",{d:"M3 21h18"}),t.jsx("path",{d:"M9 8h1"}),t.jsx("path",{d:"M9 12h1"}),t.jsx("path",{d:"M9 16h1"}),t.jsx("path",{d:"M14 8h1"}),t.jsx("path",{d:"M14 12h1"}),t.jsx("path",{d:"M14 16h1"}),t.jsx("path",{d:"M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"})]})}),t.jsx("div",{className:"ctx-title",children:"The coordination gap is universal"}),t.jsx("div",{className:"ctx-body",children:"Every medical tourism facilitator \u2014 regardless of country \u2014 faces the same operational problems: fragmented patient data, manual commission tracking, informal follow-up systems, and no pipeline visibility. MOCS solves this for Cikitsa International. The same model applies to hundreds of similar operators globally."})]}),t.jsxs("div",{className:"ctx-card",children:[t.jsx("div",{className:"mc-icon",children:t.jsx("svg",{viewBox:"0 0 24 24",children:t.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})})}),t.jsx("div",{className:"ctx-title",children:"Digitisation is the competitive moat"}),t.jsx("div",{className:"ctx-body",children:"In a sector dominated by informal coordination, a facilitator that can accurately track every patient, quote every commission, and proactively manage every visa application has a structural advantage. MOCS is not just an internal tool \u2014 it is Cikitsa's operational moat."})]})]})})]})}),t.jsx("section",{style:{padding:"80px 0",borderTop:"1px solid var(--ln)"},className:"bg-white fade",children:t.jsxs("div",{className:"max-w-7xl mx-auto px-6 w-full",children:[t.jsx("div",{className:"eyebrow",style:{marginBottom:16},children:"13 \u2014 How I Work"}),t.jsxs("h2",{children:["From operational",t.jsx("br",{}),"chaos to ",t.jsx("em",{children:"structural clarity"}),"."]}),t.jsxs("div",{className:"process-row",children:[t.jsxs("div",{className:"ps",children:[t.jsx("div",{className:"ps-num",children:"01"}),t.jsx("div",{className:"ps-title",children:"Map the real workflow first"}),t.jsx("div",{className:"ps-desc",children:"I begin by tracing the actual operations \u2014 every WhatsApp thread, every manual column, every coordinator workaround. The existing chaos is the complete specification. Nothing gets designed until the real process is understood."})]}),t.jsxs("div",{className:"ps",children:[t.jsx("div",{className:"ps-num",children:"02"}),t.jsx("div",{className:"ps-title",children:"Define the data model before screens"}),t.jsx("div",{className:"ps-desc",children:"No interfaces until entities are settled. Patient, Agent, Hospital, Visa, Commission \u2014 each a distinct structured record, not a free-text column. A correct model makes every screen obvious. A wrong one makes every screen wrong by definition."})]}),t.jsxs("div",{className:"ps",children:[t.jsx("div",{className:"ps-num",children:"03"}),t.jsx("div",{className:"ps-title",children:"Encode the business logic explicitly"}),t.jsx("div",{className:"ps-desc",children:"Pricing rules, commission splits, status transitions \u2014 these aren't configurations, they are the business. I encode them once, correctly, so that every coordinator quotes the same rate, every agent gets the right commission, and nothing depends on memory."})]}),t.jsxs("div",{className:"ps",children:[t.jsx("div",{className:"ps-num",children:"04"}),t.jsx("div",{className:"ps-title",children:"Build for the team, not the builder"}),t.jsx("div",{className:"ps-desc",children:"Every system I build is trainable without my presence. MOCS brought onboarding from 3\u20134 weeks to under one day because the system documents itself through structure. A system only I can run is a liability \u2014 not an asset."})]})]})]})}),t.jsx("section",{className:"py-24 md:py-32 bg-white border-t border-slate-200",children:t.jsxs("div",{className:"max-w-[660px] mx-auto text-center fade",children:[t.jsxs("h2",{className:"font-sans text-[clamp(38px,5.5vw,62px)] text-slate-900 leading-[1.05] tracking-[-0.4px] mb-[18px] font-bold",children:["Built for real operations.",t.jsx("br",{}),t.jsx("em",{className:"italic text-slate-400 font-semibold",children:"Not a demo."})]}),t.jsx("p",{className:"text-[16px] text-slate-500 leading-[1.82] font-light max-w-[540px] mx-auto mb-11",children:"MOCS is actively used by Cikitsa India's operations team to coordinate patient journeys daily across Bangladesh and India. Every data point in this case study reflects an actual patient, service, or hospital relationship."}),t.jsxs("a",{href:"/contact",className:"group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#4F46E5] text-white rounded-full font-sans text-sm font-semibold transition-all hover:bg-[#4338CA] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.98]",children:["Start a conversation",t.jsx("svg",{className:"w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2.5",d:"M7 17L17 7M17 7H7M17 7V17"})})]})]})})]})};export{m as default};//# sourceMappingURL=MocsCaseStudy-BwPxuWwh.js.map

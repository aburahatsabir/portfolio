// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import { MK, MR, MP, MCH, MTU, MCO, MTE, DEALERS, DISPATCH, RETURNS, COMMISSIONS, SKUS, ACTIVITY_ITEMS, DAMAGE_EVENTS } from './erp/ErpData';

const DEALER_INFO = {
  '965':{name:'Tasneem Enterprises',addr:'Madhavpur Montola, Habiganj'},
  '971':{name:'Shaon Enterprises',addr:'Sunamganj Sadar'},
  '966':{name:'Nishikant Store',addr:'Pagla, Sunamganj'},
  '967':{name:'Sufia Enterprises',addr:'Bishwanath, Sylhet'},
  '968':{name:'Rubel Enterprises',addr:'Laldighi Par'},
  '969':{name:'Abdul Hannan & Sons',addr:'Saidpur'},
  '970':{name:'Ma Enterprises',addr:'Rajnagar'},
};

export default function ErpDemo() {
  // Navigation
  const [page, setPage] = useState('dashboard');
  const [sec, setSec] = useState('Core');
  const [animKey, setAnimKey] = useState(0); // incremented on every nav to replay animation
  // Finance
  const [ledgerDlr, setLedgerDlr] = useState('965');
  // Analytics tab
  const [a, setA] = useState('rev');
  const [tabKey, setTabKey] = useState(0); // incremented on analytics tab change

  // Dispatch filter
  const [filtCode, setFiltCode] = useState('all');
  const [dispSearch, setDispSearch] = useState('');
  // Order form
  const [orderDlr, setOrderDlr] = useState('965');
  const [orderDate, setOrderDate] = useState('31 Oct 2023');
  const [orderMgr, setOrderMgr] = useState('Shahin Ahmed');
  const [orderPrevBal, setOrderPrevBal] = useState(0);
  const [orderPayment, setOrderPayment] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [skuRows, setSkuRows] = useState([{id:1,prodIdx:0,sizeIdx:0,qty:100,rate:SKUS[0].rates[0]}]);
  const nextSkuId = useRef(2);
  const chartsRef = useRef({});

  const nav = (newPage, newSec) => {
    setPage(newPage);
    setAnimKey(k => k + 1);
    if(newSec) setSec(newSec);
  };

  const switchTab = (id) => {
    setA(id);
    setTabKey(k => k + 1);
  };

  const openLedger = useCallback((code) => {
    setLedgerDlr(code);
    setPage('ledger');
    setSec('Finance');
  }, []);

  // Expose openLedger to inline DOM onclick handlers
  useEffect(() => { window.__erpOpenLedger = openLedger; }, [openLedger]);

  // SKU helpers
  const addSKU = () => {
    const id = nextSkuId.current++;
    setSkuRows(r => [...r, {id, prodIdx:0, sizeIdx:0, qty:100, rate:SKUS[0].rates[0]}]);
  };
  const removeSKU = (id) => setSkuRows(r => r.filter(s => s.id !== id));
  const updateSKU = (id, field, val) => setSkuRows(r => r.map(s => {
    if (s.id !== id) return s;
    const u = {...s, [field]: Number(val)};
    if (field === 'prodIdx') { u.sizeIdx = 0; u.rate = SKUS[val]?.rates[0] || 0; }
    else if (field === 'sizeIdx') { u.rate = SKUS[s.prodIdx]?.rates[val] || 0; }
    return u;
  }));

  // Invoice computed values
  const dm = DEALER_INFO[orderDlr] || {name:'—', addr:'—'};
  const orderVal = skuRows.reduce((s,r) => s + Math.round(r.qty * r.rate), 0);
  const netOutstanding = Number(orderPrevBal) + orderVal - Number(orderPayment);
  const totalKg = skuRows.reduce((s,r) => {
    const sz = SKUS[r.prodIdx]?.sizes[r.sizeIdx] || '';
    const szV = parseFloat(sz) || 0;
    return s + (sz.toLowerCase().includes('kg') ? r.qty * szV : r.qty * szV / 1000);
  }, 0);

  const saveOrder = () => { if(!skuRows.length) return; setShowToast(true); setTimeout(()=>setShowToast(false),5000); };

  // Dispatch filtered data
  const getDispData = () => {
    const q = dispSearch.toLowerCase();
    return DISPATCH.filter(r => (filtCode==='all'||r.code===filtCode) && (!q||(r.s.includes(q)||r.dlr.toLowerCase().includes(q)||r.code.includes(q))));
  };

  // Populate all DOM tables whenever page or ledger selection changes
  useEffect(() => {
    const fmt = (n) => n.toLocaleString();
    const pill = (cls, txt) => `<span class="pill ${cls}">${txt}</span>`;

    // Dashboard dealer table
    const dashEl = document.getElementById('dash-dealers');
    if (dashEl) {
      dashEl.innerHTML = Object.entries(DEALERS).sort((a,b)=>b[1].rev-a[1].rev).map(([code,d])=>`<tr style="cursor:pointer" onclick="window.__erpOpenLedger('${code}')">
        <td style="font-weight:400;color:var(--ink);font-size:12px">${d.name}</td>
        <td class="m" style="font-size:10px;color:var(--ink4)">${code}</td>
        <td class="m">${d.orders}</td>
        <td class="m">৳${(d.rev/100000).toFixed(2)}L</td>
        <td class="m">${fmt(d.kg)}</td>
        <td style="font-size:10px;color:var(--ink4)">${d.first.split(' ').slice(1).join(' ')} → ${d.last.split(' ').slice(1).join(' ')}</td>
        <td>${d.due>0?pill('p-over','৳'+fmt(d.due)):d.adv>0?pill('p-adv','+৳'+fmt(d.adv)):pill('p-ok','Cleared')}</td>
      </tr>`).join('');
    }

    // Activity feed
    const afEl = document.getElementById('activity-feed');
    if (afEl) {
      afEl.innerHTML = ACTIVITY_ITEMS.map(i=>`<div class="af-item">
        <div class="af-icon ${i.t}">${i.t==='ord'?'↑':i.t==='pay'?'৳':'↵'}</div>
        <div class="af-body"><div class="af-t">${i.title}</div><div class="af-m">${i.meta}</div></div>
        <div class="af-amt ${i.cls}">${i.amt}</div>
      </div>`).join('');
    }

    // Full dealers table
    const fullEl = document.getElementById('full-dealers');
    if (fullEl) {
      const maxR = 12981196;
      fullEl.innerHTML = Object.entries(DEALERS).sort((a,b)=>b[1].rev-a[1].rev).map(([code,d])=>`<tr style="cursor:pointer" onclick="window.__erpOpenLedger('${code}')">
        <td style="font-weight:400;color:var(--ink)">${d.name}</td>
        <td class="m" style="font-size:10px;color:var(--ink4)">${code}</td>
        <td>${d.mgr}</td>
        <td style="font-size:10px;color:var(--ink3)">${d.addr}</td>
        <td style="font-size:10px;color:var(--ink4)">${d.mobile||'—'}</td>
        <td class="m">${d.orders}</td>
        <td class="m">৳${fmt(d.rev)}</td>
        <td class="m" style="color:var(--gdk)">৳${fmt(d.paid)}</td>
        <td class="m">${fmt(d.kg)}</td>
        <td><div class="bc" style="min-width:60px"><div class="bf" style="width:${Math.round(d.rev/maxR*100)}%"></div></div></td>
        <td>${d.due>0?pill('p-over','৳'+fmt(d.due)+' due'):d.adv>0?pill('p-adv','+৳'+fmt(d.adv)+' adv'):pill('p-ok','Cleared')}</td>
      </tr>`).join('');
    }

    // Ledger
    const ldgSelEl = document.getElementById('ldg-sel');
    if (ldgSelEl) ldgSelEl.value = ledgerDlr;
    const d = DEALERS[ledgerDlr];
    if (d) {
      const titleEl = document.getElementById('ldg-title');
      const metaEl = document.getElementById('ldg-meta');
      const sumEl = document.getElementById('ldg-summary');
      const bodyEl = document.getElementById('ldg-body');
      if (titleEl) titleEl.textContent = `${d.name} — Account Statement`;
      if (metaEl) metaEl.textContent = `Code: ${ledgerDlr} · ${d.addr} · ${d.orders} transactions · ${d.first} → ${d.last}`;
      if (sumEl) sumEl.innerHTML = `
        <div class="ls"><div class="ls-l">Total Orders</div><div class="ls-v">${d.orders}</div></div>
        <div class="ls"><div class="ls-l">Total Order Value</div><div class="ls-v">৳${fmt(d.rev)}</div></div>
        <div class="ls"><div class="ls-l">Total Paid</div><div class="ls-v grn">৳${fmt(d.paid)}</div></div>
        <div class="ls"><div class="ls-l">Current Balance</div><div class="ls-v ${d.due>0?'red':d.adv>0?'grn':''}">` +
        (d.due>0?`৳${fmt(d.due)} DUE`:d.adv>0?`৳${fmt(d.adv)} ADV`:'Cleared') + `</div></div>`;
      if (bodyEl) bodyEl.innerHTML = d.rows.map(r=>`<tr>
        <td class="m" style="font-size:10px;font-weight:500">${r.s}</td>
        <td style="font-size:11px;white-space:nowrap">${r.d}</td>
        <td class="m">৳${fmt(r.v)}</td>
        <td class="m" style="color:var(--ink4)">৳${fmt(r.prev)}</td>
        <td class="m" style="font-weight:500">৳${fmt(r.grand)}</td>
        <td class="m" style="color:var(--gdk)">৳${fmt(r.p)}</td>
        <td class="m" style="color:${r.du>0?'var(--rm)':'var(--ink4)'};font-weight:${r.du>0?'500':'300'}">${r.du>0?'৳'+fmt(r.du):'—'}</td>
        <td class="m" style="color:var(--gdk)">${r.adv>0?'৳'+fmt(r.adv):'—'}</td>
        <td class="m" style="color:var(--bm)">${r.bank>0?'৳'+fmt(r.bank):'—'}</td>
        <td class="m">${r.kg}</td>
        <td style="font-size:10px;color:var(--ink4);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.n||'—'}</td>
      </tr>`).join('');
    }

    // Dispatch table
    const dispEl = document.getElementById('disp-body');
    if (dispEl) {
      dispEl.innerHTML = getDispData().map(r=>`<tr>
        <td class="m" style="font-size:10px;font-weight:500">${r.s}</td>
        <td style="font-size:10px;white-space:nowrap">${r.d}</td>
        <td style="font-size:11px;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.dlr}</td>
        <td class="m" style="font-size:10px;color:var(--ink4)">${r.code}</td>
        <td class="m">${r.ch||'—'}</td>
        <td class="m">${r.tu||'—'}</td>
        <td class="m">${r.co||'—'}</td>
        <td class="m">${r.te||'—'}</td>
        <td class="m" style="font-weight:500;color:var(--ink)">${fmt(r.tot)}</td>
        <td class="m">৳${Math.round(r.val/1000)}k</td>
      </tr>`).join('');
    }

    // Returns
    const rc = {Return:'p-blu',Damage:'p-over',Defect:'p-due',Short:'p-gray'};
    const dc = {Return:'var(--bm)',Damage:'var(--rm)',Defect:'var(--am)',Short:'#64748B'};
    const retBodyEl = document.getElementById('ret-body');
    if (retBodyEl) {
      retBodyEl.innerHTML = RETURNS.map(r=>`<tr>
        <td class="m" style="font-size:10px">${r.s}</td>
        <td style="font-size:10px;white-space:nowrap">${r.d}</td>
        <td style="font-size:11px">${r.dlr}</td>
        <td>${pill(rc[r.type]||'p-gray', r.type)}</td>
        <td style="font-size:11px">${r.prod}</td>
        <td class="m" style="font-size:10px;white-space:nowrap">${r.qty}</td>
        <td class="m" style="font-size:10px">${r.val}</td>
        <td>${pill(r.st==='settled'?'p-ok':'p-due', r.st==='settled'?'✓ Settled':'⏳ Pending')}</td>
        <td style="font-size:10px;color:var(--ink4);max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.n}</td>
      </tr>`).join('');
    }
    const retTlEl = document.getElementById('ret-tl');
    if (retTlEl) {
      retTlEl.innerHTML = [...RETURNS].reverse().map(r=>`<div class="tl-item">
        <div class="tl-dot" style="background:${dc[r.type]}"></div>
        <div class="tl-body">
          <div class="tl-t">${r.dlr}</div>
          <div class="tl-m">${r.d} · Memo ${r.s}</div>
          <div class="tl-n">${r.prod} · ${r.qty} · ${r.val}</div>
          <div class="tl-tags">${pill(rc[r.type]||'p-gray',r.type)} ${pill(r.st==='settled'?'p-ok':'p-due',r.st==='settled'?'✓ Settled':'⏳ Pending')}</div>
        </div></div>`).join('');
    }

    // Commissions
    const commEl = document.getElementById('comm-body');
    if (commEl) {
      commEl.innerHTML = COMMISSIONS.map(c=>`<tr>
        <td class="m" style="font-size:10px">${c.s}</td>
        <td style="font-size:10px;white-space:nowrap">${c.d}</td>
        <td style="font-size:11px">${c.dlr}</td>
        <td class="m" style="font-size:10px">${c.kg!=='—'?`${c.kg} kg × ৳${c.rate}`:'Lump sum'}</td>
        <td class="m" style="font-weight:500;color:var(--ink)">৳${fmt(c.amt)}</td>
        <td style="font-size:10px;color:var(--ink4);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.n}</td>
      </tr>`).join('');
    }

    // Payments
    const payEl = document.getElementById('pay-body');
    if (payEl) {
      const rows = Object.entries(DEALERS).flatMap(([code,d])=>d.rows.map(r=>({...r,dlrName:d.name,code}))).filter(r=>r.p>0).sort((a,b)=>b.p-a.p).slice(0,20);
      payEl.innerHTML = rows.map(r=>`<tr>
        <td class="m" style="font-size:10px">${r.s}</td>
        <td style="font-size:10px;white-space:nowrap">${r.d}</td>
        <td style="font-size:11px;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.dlrName}</td>
        <td class="m" style="font-size:10px;color:var(--ink4)">${r.code}</td>
        <td class="m" style="color:var(--bm)">${r.bank>0?'৳'+fmt(r.bank):'—'}</td>
        <td class="m">${(r.p-r.bank)>0?'৳'+fmt(r.p-r.bank):'—'}</td>
        <td class="m" style="font-weight:500;color:var(--gdk)">৳${fmt(r.p)}</td>
        <td style="font-size:10px;color:var(--ink4);max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.n||'—'}</td>
      </tr>`).join('');
    }

    // Products catalog
    const prodEl = document.getElementById('prod-catalog');
    if (prodEl) {
      prodEl.innerHTML = SKUS.map(p=>`<div class="prod-card">
        <div class="prod-name">${p.name}</div>
        <div class="prod-code">${p.code} · DOHA BRAND</div>
        <div class="prod-bar"><div class="prod-fill" style="width:${Math.min(100,p.kg/45785*100)}%;background:${p.color}"></div></div>
        <div class="prod-stats"><div class="prod-kg">${fmt(p.kg)} kg</div><div class="prod-pct">${p.pct}%</div></div>
        <div class="prod-sizes">${p.sizes.map((sz,i)=>`<span class="sz">${sz} · ৳${p.rates[i]}</span>`).join('')}</div>
      </div>`).join('');
    }
    const invSkuEl = document.getElementById('inv-sku-cards');
    if (invSkuEl) {
      invSkuEl.innerHTML = SKUS.map(p=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--ln)">
        <div style="width:28px;height:28px;border-radius:5px;background:${p.color};flex-shrink:0"></div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:400;color:var(--ink)">${p.name}</div>
          <div class="bc" style="margin-top:4px"><div class="bf" style="width:${Math.min(100,p.kg/45785*100)}%;background:${p.color}"></div></div>
        </div>
        <div style="text-align:right"><div class="m" style="font-size:12px;font-weight:500">${fmt(p.kg)} kg</div><div class="m" style="font-size:9px;color:var(--ink4)">${p.pct}%</div></div>
      </div>`).join('');
    }

    // Damage tracker
    const dmgEl = document.getElementById('dmg-tl');
    if (dmgEl) {
      dmgEl.innerHTML = DAMAGE_EVENTS.map(e=>`<div class="tl-item">
        <div class="tl-dot" style="background:${e.type==='Damage'?'var(--rm)':'var(--am)'}"></div>
        <div class="tl-body">
          <div class="tl-t">${e.dlr} — ${e.prod}</div>
          <div class="tl-m">${e.d} · Memo ${e.s}</div>
          <div class="tl-n">${e.detail}</div>
          <div class="tl-tags">${pill(e.type==='Damage'?'p-over':'p-due',e.type)} ${pill('p-gray',e.res)}</div>
        </div></div>`).join('');
    }

    // Analytics dealer ranking
    const aDlrEl = document.getElementById('a-dlr-body');
    if (aDlrEl) {
      const maxR = 12981196;
      aDlrEl.innerHTML = Object.entries(DEALERS).sort((a,b)=>b[1].rev-a[1].rev).map(([code,d])=>`<tr>
        <td style="font-weight:400">${d.name}</td>
        <td class="m" style="font-size:10px;color:var(--ink4)">${code}</td>
        <td class="m">${d.orders}</td>
        <td class="m">৳${fmt(d.rev)}</td>
        <td class="m">${fmt(d.kg)}</td>
        <td class="m" style="color:var(--gdk)">৳${fmt(d.paid)}</td>
        <td><div class="bc"><div class="bf" style="width:${Math.round(d.rev/maxR*100)}%"></div></div></td>
        <td>${d.due>0?pill('p-over','৳'+fmt(d.due)):d.adv>0?pill('p-adv','+৳'+fmt(d.adv)):pill('p-ok','Cleared')}</td>
      </tr>`).join('');
    }

    // Scroll main area to top
    const mainEl = document.getElementById('main');
    if (mainEl) mainEl.scrollTop = 0;
  }, [page, ledgerDlr, filtCode, dispSearch, tabKey, animKey]);

  useEffect(() => {
    const CD={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#FFFFFF',borderColor:'#E2E8F0',borderWidth:1,titleColor:'#64748B',bodyColor:'#0F172A',titleFont:{family:'JetBrains Mono',size:10},bodyFont:{family:'JetBrains Mono',size:11}}}};
    const SC={x:{grid:{display:false},ticks:{color:'#CBD5E1',font:{family:'JetBrains Mono',size:9},maxRotation:45},border:{display:false}},y:{grid:{color:'#F1F5F9'},ticks:{color:'#CBD5E1',font:{family:'JetBrains Mono',size:9}},border:{display:false}}};
    const t = setTimeout(() => {
      ['c-dual','c-donut','c-dues','c-pay','c-comm','c-inv-stk','c-ret','c-a-rev','c-a-vol','c-a-prd','c-a-ct'].forEach(id => {
        const c = document.getElementById(id);
        if(!c) return;
        // Check if the canvas container has actual layout dimensions
        // Chart will be built even if hidden — Chart.js handles this fine
        if(chartsRef.current[id]) return; // Chart already built — don't recreate (matches reference HTML behavior)
        if (id === 'c-dual') {
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[
            {label:'Order Value',data:MR.map(v=>Math.round(v/1000)),backgroundColor:MK.map((_,i)=>i>=11?'#0F172A':'#E2E8F0'),borderRadius:2,borderSkipped:false},
            {label:'Payments',data:MP.map(v=>Math.round(v/1000)),backgroundColor:MK.map((_,i)=>i>=11?'#059669':'rgba(45,148,96,.3)'),borderRadius:2,borderSkipped:false},
          ]},options:{...CD,scales:{...SC,x:{...SC.x},y:{...SC.y,ticks:{...SC.y.ticks,callback:v=>'৳'+v+'k'}}},plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{font:{family:'JetBrains Mono',size:9},color:'#64748B',boxWidth:8,padding:10}},tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>' '+x.dataset.label+': ৳'+x.raw+'k'}}}}});
        }
        else if (id === 'c-donut') {
          chartsRef.current[id]=new Chart(c,{type:'doughnut',data:{labels:['Chili','Turmeric','Coriander','Others'],datasets:[{data:[45785,24821,16454,1639],backgroundColor:['#0F172A','#64748B','#94A3B8','#E2E8F0'],borderWidth:0}]},options:{...CD,cutout:'70%'}});
        }
        else if (id === 'c-a-vol' || id === 'c-inv-stk') {
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[
            {label:'Chili',data:MCH,backgroundColor:'#0F172A',stack:'s',borderRadius:0},
            {label:'Turmeric',data:MTU,backgroundColor:'#64748B',stack:'s',borderRadius:0},
            {label:'Coriander',data:MCO,backgroundColor:'#94A3B8',stack:'s',borderRadius:0},
            {label:'Tea',data:MTE,backgroundColor:'#E2E8F0',stack:'s',borderRadius:0},
          ]},options:{...CD,scales:SC,plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{font:{family:'JetBrains Mono',size:9},color:'#64748B',boxWidth:8,padding:8}}}}});
        }
        else if(id==='c-dues'){
          const vals=[461860,327260,290960,213360,83660,84060,74939,9750];
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:['977','974','975','976','972','973','971','970 (N/A)'],datasets:[{data:vals,backgroundColor:vals.map((v,i)=>i<3?'#DC2626':i<5?'#D97706':'#CBD5E1'),borderRadius:2}]},options:{...CD,indexAxis:'y',scales:{x:{...SC.x,grid:{color:'#F1F5F9'},ticks:{...SC.x.ticks,maxRotation:0,callback:v=>'৳'+Math.round(v/1000)+'k'}},y:{...SC.y,grid:{display:false}}}}});
        }
        else if(id==='c-pay' || id==='c-a-rev'){
          const dts = id==='c-pay'?MP:MR;
          const bg = id==='c-pay'?MK.map((_,i)=>i>=11?'#059669':'rgba(45,148,96,.35)'):MK.map((_,i)=>i>=11?'#0F172A':'#E2E8F0');
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[{data:dts.map(v=>Math.round(v/1000)),backgroundColor:bg,borderRadius:2}]},options:{...CD,scales:SC,plugins:{...CD.plugins,tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>'৳'+x.raw+'k'}}}}});
        }
        else if (id === 'c-comm') {
          const cAmts=COMMISSIONS.map(c=>c.amt);
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:COMMISSIONS.map(cm=>cm.s),datasets:[{data:cAmts,backgroundColor:cAmts.map(v=>v>100000?'#0F172A':v>30000?'#64748B':'#E2E8F0'),borderRadius:2}]},options:{...CD,scales:SC,plugins:{...CD.plugins,tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>'৳'+x.raw.toLocaleString()}}}}});
        }
        else if (id === 'c-ret') {
          chartsRef.current[id]=new Chart(c,{type:'doughnut',data:{labels:['Return','Damage','Defect','Short'],datasets:[{data:[14,2,2,1],backgroundColor:['#2563EB','#DC2626','#D97706','#64748B'],borderWidth:0}]},options:{...CD,cutout:'70%'}});
        }
        else if (id === 'c-a-prd') {
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:['Chili','Turmeric','Coriander','Tea','Cumin','Macaroni'],datasets:[{data:[45785,24821,16454,1459,126,8],backgroundColor:['#0F172A','#64748B','#94A3B8','#CBD5E1','#E2E8F0','#E2E8F0'],borderRadius:2}]},options:{...CD,indexAxis:'y',scales:{x:{...SC.x,grid:{color:'#F1F5F9'},ticks:{...SC.x.ticks,maxRotation:0,callback:v=>'৳'+Math.round(v/1000)+'k'}},y:{...SC.y,grid:{display:false}}}}});
        }
        else if (id === 'c-a-ct') {
          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[
            {label:'Order Value',data:MCH.map(v=>v),backgroundColor:MK.map((_,i)=>i>=11?'#0F172A':'#E2E8F0'),borderRadius:2,borderSkipped:false},
            {label:'Payments',data:MTU.map(v=>v),backgroundColor:MK.map((_,i)=>i>=11?'#059669':'rgba(45,148,96,.3)'),borderRadius:2,borderSkipped:false},
          ]},options:{...CD,scales:{...SC,x:{...SC.x},y:{...SC.y,ticks:{...SC.y.ticks,callback:v=>'৳'+v+'k'}}},plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{font:{family:'JetBrains Mono',size:9},color:'#64748B',boxWidth:8,padding:10}},tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>' '+x.dataset.label+': ৳'+x.raw+'k'}}}}});
        }
      });
    }, 100); // Match reference HTML: setTimeout(buildCharts, 100)
    return () => clearTimeout(t);
  }, []); // Build charts ONCE on mount — like the reference HTML

  // Cleanup charts only on full component unmount
  useEffect(() => {
    return () => {
      Object.values(chartsRef.current).forEach(ch => ch && ch.destroy());
    };
  }, []);

  // Trigger CSS swoop animations via DOM reflow
  useEffect(() => {
    const pg = document.getElementById(`pg-${page}`);
    if(pg){pg.classList.remove('fade'); void pg.offsetWidth; pg.classList.add('fade');}
  }, [page, animKey]);

  useEffect(() => {
    const el = document.getElementById(`a-${a}`);
    if(el){el.classList.remove('fade'); void el.offsetWidth; el.classList.add('fade');}
  }, [a, tabKey]);

  const topbarRef = useRef<HTMLDivElement>(null);
  const sbRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);



  const css = "*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n  :root{\n  --brand:#4F46E5;--brand-hover:#4338CA;--brand-light:#EEF2FF;--brand-border:#C7D2FE;\n  --w:#FFFFFF;--off:#F8FAFC;--off2:#F1F5F9;\n  --ink:#0F172A;--ink2:#1E293B;--ink3:#64748B;--ink4:#94A3B8;\n  --ln:#E2E8F0;--ln2:#CBD5E1;\n  --gm:#059669;--gbg:#ECFDF5;--gdk:#065F46;\n  --rm:#DC2626;--rbg:#FEF2F2;\n  --am:#D97706;--abg:#FFFBEB;\n  --bm:#2563EB;--bbg:#EFF6FF;\n  --serif:'Plus Jakarta Sans',system-ui,sans-serif;\n  --sans:'Plus Jakarta Sans',system-ui,sans-serif;\n  --mono:'JetBrains Mono',monospace;\n}\n  body{font-family:var(--sans);background:transparent;color:var(--ink);-webkit-font-smoothing:antialiased;overflow-x:hidden;margin:0;padding:0}\n  .erp-embed{font-family:var(--sans);background:var(--off);color:var(--ink);-webkit-font-smoothing:antialiased;height:720px;overflow:hidden}\n\n/* ══ LAYOUT ══ */\n.app{display:flex;flex-direction:column;height:100%}\n.topbar{height:48px;background:var(--w);border-bottom:1px solid var(--ln);display:flex;align-items:center;flex-shrink:0}\n.tb-brand{width:52px;display:flex;align-items:center;justify-content:center;border-right:1px solid var(--ln);height:100%;flex-shrink:0}\n.tb-mark{width:26px;height:26px;background:var(--brand);border-radius:6px;display:flex;align-items:center;justify-content:center}\n.tb-mark svg{width:13px;height:13px}\n.tb-name{font-family:var(--mono);font-size:12px;font-weight:500;color:var(--ink);line-height:1.2}\n.tb-sub{font-family:var(--mono);font-size:9px;color:var(--ink4)}\n.tb-nav{flex:1;display:flex;align-items:center;gap:4px;padding:0 16px}\n.tb-bc{font-family:var(--mono);font-size:11px;color:var(--ink4)}\n.tb-sep{color:var(--ln2);margin:0 4px;font-size:12px}\n.tb-cur{font-family:var(--mono);font-size:11px;color:var(--ink);font-weight:500}\n.tb-right{display:flex;align-items:center;gap:12px;padding:0 16px}\n.tb-badge{font-family:var(--mono);font-size:9px;background:var(--rbg);color:var(--rm);padding:2px 6px;border-radius:3px;font-weight:500}\n.tb-user{display:flex;align-items:center;gap:7px;font-family:var(--mono);font-size:11px;color:var(--ink3)}\n.tb-avatar{width:24px;height:24px;border-radius:50%;background:var(--off2);border:1px solid var(--ln);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:var(--ink3)}\n\n.body{display:flex;flex:1;overflow:hidden;min-height:0}\n\n/* ══ SIDEBAR ══ */\n.sb{width:52px;background:var(--w);border-right:1px solid var(--ln);flex-shrink:0;overflow:visible;position:relative;z-index:50;display:flex;flex-direction:column;align-items:center;padding:6px 0;min-height:0}\n.sb-item{position:relative;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .14s;color:var(--ink4);margin:1px 0;flex-shrink:0;border:none;background:transparent}\n.sb-item:hover{color:var(--ink);background:var(--off2)}\n.sb-item.on{background:var(--ink);color:#FFFFFF}\n.sb-item svg{width:16px;height:16px;stroke-width:1.7;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round}\n.sb-tip{position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-50%);background:var(--ink2);color:#fff;font-family:var(--mono);font-size:10px;padding:4px 9px;border-radius:5px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .15s;z-index:99;letter-spacing:.2px}\n.sb-tip::before{content:'';position:absolute;right:100%;top:50%;transform:translateY(-50%);border:4px solid transparent;border-right-color:var(--ink2)}\n.sb-item:hover .sb-tip{opacity:1}\n.sb-hr{width:28px;height:1px;background:var(--ln);margin:4px 0;flex-shrink:0}\n.sb-foot{margin-top:auto;padding:8px 0;display:flex;flex-direction:column;align-items:center;gap:4px;border-top:1px solid var(--ln);width:100%}\n.sb-stat-dot{width:6px;height:6px;border-radius:50%;background:var(--gm)}\n\n/* ══ MAIN ══ */\n.main{flex:1;overflow-y:auto;min-height:0}\n.pg{padding:20px 24px;display:none}\n.pg.on{display:block}\n.pg-head{margin-bottom:18px}\n.pg-title{font-family:var(--serif);font-size:22px;color:var(--ink);line-height:1.1}\n.pg-sub{font-family:var(--mono);font-size:10px;color:var(--ink4);margin-top:3px;letter-spacing:.3px}\n\n/* ══ KPI STRIP ══ */\n.kpis{display:grid;gap:10px;margin-bottom:18px}\n.k4{grid-template-columns:repeat(4,1fr)}\n.k5{grid-template-columns:repeat(5,1fr)}\n.k3{grid-template-columns:repeat(3,1fr)}\n.kpi{background:var(--w);border:1px solid var(--ln);border-radius:9px;padding:14px 16px;position:relative;overflow:hidden}\n.kpi::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:9px 9px 0 0}\n.k-ink::after{background:var(--ink)}.k-g::after{background:var(--gm)}.k-r::after{background:var(--rm)}.k-a::after{background:var(--am)}.k-b::after{background:var(--bm)}\n.kpi-l{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:1.2px;text-transform:uppercase;margin-bottom:6px}\n.kpi-v{font-family:var(--serif);font-size:24px;color:var(--ink);line-height:1}\n.kpi-v.red{color:var(--rm)}.kpi-v.grn{color:var(--gdk)}.kpi-v.blu{color:var(--bm)}\n.kpi-s{font-family:var(--mono);font-size:9px;color:var(--ink4);margin-top:4px}\n.kpi-delta{font-family:var(--mono);font-size:9px;margin-top:6px}\n.kpi-delta.up{color:var(--gm)}.kpi-delta.dn{color:var(--rm)}.kpi-delta.warn{color:var(--am)}\n\n/* ══ GRID ══ */\n.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}\n.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px}\n.g13{display:grid;grid-template-columns:1fr 320px;gap:14px;margin-bottom:14px}\n.g31{display:grid;grid-template-columns:320px 1fr;gap:14px;margin-bottom:14px}\n.mb{margin-bottom:14px}\n\n/* ══ CARD ══ */\n.card{background:var(--w);border:1px solid var(--ln);border-radius:9px;overflow:hidden}\n.ch{padding:11px 16px;border-bottom:1px solid var(--ln);display:flex;align-items:center;justify-content:space-between;background:var(--w)}\n.ct{font-size:12px;font-weight:500;color:var(--ink)}\n.cs{font-family:var(--mono);font-size:10px;color:var(--ink4)}\n.cv{padding:14px 16px;position:relative}\n.cv.h140{height:154px}.cv.h160{height:174px}.cv.h180{height:194px}.cv.h200{height:214px}\n\n/* ══ TABLE ══ */\n.tbl{width:100%;border-collapse:collapse}\n.tbl th{font-family:var(--mono);font-size:9px;color:var(--ink4);text-transform:uppercase;letter-spacing:1px;padding:8px 12px;border-bottom:1px solid var(--ln);text-align:left;font-weight:400;background:var(--off)}\n.tbl td{padding:8px 12px;font-size:11px;color:var(--ink2);border-bottom:1px solid var(--ln);font-weight:300;vertical-align:middle}\n.tbl tr:last-child td{border-bottom:none}\n.tbl tr:hover td{background:var(--off)}\n.stbl{overflow-y:auto;max-height:280px}\n.m{font-family:var(--mono)}\n\n/* ══ PILLS ══ */\n.pill{font-family:var(--mono);font-size:9px;padding:2px 7px;border-radius:4px;white-space:nowrap;font-weight:500}\n.p-ok{background:var(--gbg);color:var(--gdk)}\n.p-due{background:var(--abg);color:var(--am)}\n.p-over{background:var(--rbg);color:var(--rdk)}\n.p-blu{background:var(--bbg);color:var(--bm)}\n.p-gray{background:var(--off2);color:var(--ink3)}\n.p-adv{background:#e8f4ee;color:#065F46}\n\n/* ══ BAR CELL ══ */\n.bc{height:4px;background:var(--off2);border-radius:2px;overflow:hidden;min-width:50px}\n.bf{height:100%;background:var(--brand);border-radius:2px}\n.bf.g{background:var(--gm)}.bf.r{background:var(--rm)}\n\n/* ══ LEGEND ══ */\n.leg{display:flex;flex-direction:column;gap:8px}\n.li{display:flex;align-items:center;justify-content:space-between}\n.ll{display:flex;align-items:center;gap:8px}\n.lsq{width:8px;height:8px;border-radius:2px;flex-shrink:0}\n.ln{font-size:12px;color:var(--ink2);font-weight:300}\n.lv{font-family:var(--mono);font-size:11px;color:var(--ink)}\n.lp{font-family:var(--mono);font-size:9px;color:var(--ink4);margin-left:3px}\n\n/* ══ TIMELINE ══ */\n.tl-item{display:flex;gap:12px;padding:10px 16px;border-bottom:1px solid var(--ln);align-items:flex-start}\n.tl-item:last-child{border-bottom:none}\n.tl-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:3px}\n.tl-body{flex:1;min-width:0}\n.tl-t{font-size:12px;font-weight:500;color:var(--ink)}\n.tl-m{font-family:var(--mono);font-size:9px;color:var(--ink4);margin:2px 0 4px}\n.tl-n{font-size:11px;color:var(--ink3);line-height:1.5;font-weight:300}\n.tl-tags{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}\n\n/* ══ ACTIVITY FEED ══ */\n.af-item{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--ln)}\n.af-item:last-child{border-bottom:none}\n.af-icon{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:12px}\n.af-icon.ord{background:var(--bbg);color:var(--bm)}\n.af-icon.pay{background:var(--gbg);color:var(--gdk)}\n.af-icon.ret{background:var(--rbg);color:var(--rdk)}\n.af-body{flex:1;min-width:0}\n.af-t{font-size:12px;font-weight:400;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.af-m{font-family:var(--mono);font-size:9px;color:var(--ink4);margin-top:1px}\n.af-amt{font-family:var(--mono);font-size:12px;white-space:nowrap;text-align:right}\n.af-amt.pos{color:var(--gm)}.af-amt.neg{color:var(--rm)}.af-amt.neu{color:var(--ink3)}\n\n/* ══ MINI STATS ══ */\n.mstat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:14px 16px}\n.mstat{background:var(--off);border-radius:7px;padding:11px 13px}\n.mstat-l{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}\n.mstat-v{font-family:var(--serif);font-size:19px;color:var(--ink)}\n\n/* ══ ORDER / INVOICE ══ */\n.ord-shell{display:grid;grid-template-columns:1fr 380px;gap:14px}\n.form-row2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}\n.form-lbl{font-family:var(--mono);font-size:9px;color:var(--ink3);letter-spacing:.8px;text-transform:uppercase;margin-bottom:4px;display:block}\ninput,select,textarea{border:1px solid var(--ln);border-radius:6px;font-family:var(--sans);font-size:12px;color:var(--ink);background:var(--w);outline:none;transition:border-color .15s}\ninput:focus,select:focus,textarea:focus{border-color:var(--ink)}\ninput[type=text],input[type=number]{width:100%;padding:7px 10px}\nselect{width:100%;padding:7px 10px;cursor:pointer}\n.sku-wrap{border:1px solid var(--ln);border-radius:8px;overflow:hidden;margin-bottom:10px}\n.sku-hd{display:grid;grid-template-columns:2fr 90px 70px 80px 28px;background:var(--off);border-bottom:1px solid var(--ln);padding:6px 12px;font-family:var(--mono);font-size:9px;color:var(--ink4);text-transform:uppercase;letter-spacing:1px}\n.sku-row{display:grid;grid-template-columns:2fr 90px 70px 80px 28px;gap:5px;padding:7px 12px;border-bottom:1px solid var(--ln);align-items:center}\n.sku-row:last-child{border-bottom:none}\n.sku-row select,.sku-row input{padding:5px 7px;font-family:var(--mono);font-size:11px}\n.del-btn{background:none;border:none;cursor:pointer;color:var(--ink4);font-size:14px;line-height:1;border-radius:3px;padding:2px 4px;width:28px;text-align:center}\n.del-btn:hover{color:var(--rm);background:var(--rbg)}\n.add-sku{width:100%;border:1px dashed var(--ln2);background:none;border-radius:6px;padding:7px;font-family:var(--mono);font-size:10px;color:var(--ink4);cursor:pointer;transition:all .15s}\n.add-sku:hover{border-color:var(--ink);color:var(--ink)}\n.save-btn{width:100%;background:var(--ink);color:#FFFFFF;border:none;border-radius:7px;padding:10px;font-family:var(--mono);font-size:11px;cursor:pointer;transition:opacity .15s;letter-spacing:.3px;margin-top:8px}\n.save-btn:hover{background:var(--brand-hover)}\n.toast{display:none;background:var(--gbg);border:1px solid var(--gm);border-radius:7px;padding:10px 14px;font-size:11px;color:var(--gdk);margin-top:8px;text-align:center;font-family:var(--mono)}\n\n/* ══ INVOICE ══ */\n.invoice{background:var(--w);border:1px solid var(--ln);border-radius:10px;overflow:hidden}\n.inv-header{padding:18px 22px 14px;border-bottom:1px solid var(--ln);display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start}\n.inv-co-name{font-family:var(--serif);font-size:20px;color:var(--ink);line-height:1;margin-bottom:4px}\n.inv-co-sub{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:.8px;line-height:1.6}\n.inv-memo-block{text-align:right}\n.inv-memo-label{font-family:var(--mono);font-size:8px;color:var(--ink4);letter-spacing:2px;text-transform:uppercase;margin-bottom:5px}\n.inv-memo-num{font-family:var(--mono);font-size:17px;color:var(--ink);font-weight:500;letter-spacing:-.3px}\n.inv-meta{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--ln)}\n.inv-meta-col{padding:12px 18px}\n.inv-meta-col:first-child{border-right:1px solid var(--ln)}\n.inv-field-lbl{font-family:var(--mono);font-size:8px;color:var(--ink4);letter-spacing:1.2px;text-transform:uppercase;margin-bottom:4px}\n.inv-field-val{font-size:12px;color:var(--ink);font-weight:400;line-height:1.4}\n.inv-field-sub{font-family:var(--mono);font-size:10px;color:var(--ink3);margin-top:2px}\n.inv-balance-strip{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--ln);background:var(--off)}\n.inv-balance-cell{padding:9px 18px}\n.inv-balance-cell:first-child{border-right:1px solid var(--ln)}\n.inv-balance-lbl{font-family:var(--mono);font-size:8px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}\n.inv-balance-val{font-size:13px;color:var(--ink)}\n.inv-lines-hd{display:grid;grid-template-columns:2fr 56px 70px 78px;background:var(--off);border-bottom:1px solid var(--ln);padding:7px 18px;font-family:var(--mono);font-size:8px;color:var(--ink4);text-transform:uppercase;letter-spacing:1.2px}\n.inv-lines-hd span:not(:first-child){text-align:right}\n.inv-line{display:grid;grid-template-columns:2fr 56px 70px 78px;padding:9px 18px;border-bottom:1px solid var(--ln);font-size:12px;align-items:baseline}\n.inv-line span:not(:first-child){font-family:var(--mono);font-size:11px;text-align:right;color:var(--ink3)}\n.inv-line .p-name{color:var(--ink);font-weight:400;line-height:1.4}\n.inv-line .p-total{color:var(--ink);font-weight:500}\n.inv-empty{padding:20px;text-align:center;font-family:var(--mono);font-size:11px;color:var(--ink4)}\n.inv-totals{padding:13px 18px;display:flex;flex-direction:column;gap:4px;border-bottom:1px solid var(--ln)}\n.inv-total-row{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--mono);font-size:10px;color:var(--ink3)}\n.inv-total-row.main{font-size:11px;color:var(--ink);padding-top:8px;margin-top:4px;border-top:1px solid var(--ln2)}\n.inv-total-row.main .lbl{font-weight:500}\n.inv-total-row.main .val{font-family:var(--serif);font-size:20px;color:var(--ink)}\n.inv-net-bar{padding:11px 18px;display:flex;justify-content:space-between;align-items:center;background:var(--off)}\n.inv-net-lbl{font-family:var(--mono);font-size:8px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-bottom:3px}\n.inv-net-val{font-family:var(--mono);font-size:12px;font-weight:500}\n.inv-vol-line{font-family:var(--mono);font-size:9px;color:var(--ink4)}\n\n/* ══ FILTERS ══ */\n.frow{display:flex;align-items:center;gap:6px;padding:9px 14px;border-bottom:1px solid var(--ln);background:var(--off);flex-wrap:wrap}\n.flbl{font-family:var(--mono);font-size:9px;color:var(--ink4)}\n.fbtn{font-family:var(--mono);font-size:10px;padding:3px 9px;border-radius:4px;border:1px solid var(--ln);background:var(--w);color:var(--ink3);cursor:pointer;transition:all .12s}\n.fbtn:hover{border-color:var(--ink);color:var(--ink)}\n.fbtn.on{background:var(--ink);color:#FFFFFF;border-color:var(--ink)}\n.srch{font-family:var(--mono);font-size:10px;border:1px solid var(--ln);border-radius:5px;padding:4px 9px;outline:none;background:var(--w);color:var(--ink);margin-left:auto;width:160px}\n.srch:focus{border-color:var(--ink)}\n\n/* ══ PRODUCT CARDS ══ */\n.prod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--ln)}\n.prod-card{background:var(--w);padding:16px 18px;transition:background .15s}\n.prod-card:hover{background:var(--off)}\n.prod-name{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:1px}\n.prod-code{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:.5px;margin-bottom:10px}\n.prod-bar{height:3px;background:var(--off2);border-radius:2px;margin-bottom:8px;overflow:hidden}\n.prod-fill{height:100%;border-radius:2px}\n.prod-stats{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}\n.prod-kg{font-family:var(--mono);font-size:12px;font-weight:500;color:var(--ink)}\n.prod-pct{font-family:var(--mono);font-size:10px;color:var(--ink4)}\n.prod-sizes{display:flex;flex-wrap:wrap;gap:4px}\n.sz{font-family:var(--mono);font-size:9px;color:var(--ink3);background:var(--off2);padding:2px 5px;border-radius:3px}\n\n/* ══ STAFF ══ */\n.staff-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}\n.staff-card{background:var(--w);border:1px solid var(--ln);border-radius:9px;padding:14px 16px}\n.staff-av{width:32px;height:32px;border-radius:50%;background:var(--off2);border:1px solid var(--ln);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:10px;font-weight:500;color:var(--ink3);margin-bottom:10px}\n.staff-name{font-size:13px;font-weight:500;color:var(--ink);margin-bottom:1px}\n.staff-role{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:.5px;margin-bottom:8px}\n.staff-info{font-family:var(--mono);font-size:10px;color:var(--ink3);line-height:1.7}\n\n/* ══ ANALYTICS TABS ══ */\n.atabs{display:flex;gap:2px;background:var(--off2);border-radius:7px;padding:3px;width:fit-content;margin-bottom:16px}\n.atab{padding:5px 14px;border-radius:5px;font-family:var(--mono);font-size:10px;color:var(--ink3);cursor:pointer;border:none;background:transparent;transition:all .15s}\n.atab.on{background:var(--w);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.07)}\n\n/* ══ NOTE CELL ══ */\n.nc{font-size:10px;color:var(--ink4);max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n\n/* ══ LEDGER ══ */\n.ldg-summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}\n.ls{background:var(--off);border:1px solid var(--ln);border-radius:8px;padding:12px 14px}\n.ls-l{font-family:var(--mono);font-size:9px;color:var(--ink4);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}\n.ls-v{font-family:var(--serif);font-size:19px;color:var(--ink)}\n.ls-v.red{color:var(--rm)}.ls-v.grn{color:var(--gdk)}.ls-v.blu{color:var(--bm)}\n\n/* ══ PAYMENT CHANNELS ══ */\n.pc-item{display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--ln)}\n.pc-item:last-child{border-bottom:none}\n.pc-icon{width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:9px;font-weight:500;flex-shrink:0}\n.pc-name{font-size:12px;color:var(--ink);font-weight:400}\n.pc-sub{font-family:var(--mono);font-size:9px;color:var(--ink4);margin-top:1px}\n.pc-amt{font-family:var(--mono);font-size:12px;color:var(--ink);margin-left:auto;font-weight:500}\n\n/* ══ ALERT BANNER ══ */\n.alert-row{display:flex;gap:8px;margin-bottom:10px}\n.alert{border-radius:7px;padding:7px 10px;display:flex;align-items:center;gap:8px;flex:1}\n.alert.warn{background:var(--abg);border:1px solid #f9c96540}\n.alert.danger{background:var(--rbg);border:1px solid #f0959540}\n.alert.info{background:var(--bbg);border:1px solid #85b7eb40}\n.alert-icon{font-family:var(--mono);font-size:11px;flex-shrink:0;margin-top:1px}\n.alert.warn .alert-icon{color:var(--am)}.alert.danger .alert-icon{color:var(--rm)}.alert.info .alert-icon{color:var(--bm)}\n.alert-body{flex:1}\n.alert-title{font-family:var(--mono);font-size:10px;font-weight:500;letter-spacing:.3px}\n.alert.warn .alert-title{color:var(--am)}.alert.danger .alert-title{color:var(--rdk)}.alert.info .alert-title{color:var(--bm)}\n.alert-msg{display:none}\n\n/* ══ FADE ══ */\n@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\n.erp-embed .fade{animation:fadeIn .3s ease both}\n\n.erp-embed .app{height:100%!important}";

  return (
<div className="erp-embed" data-lenis-prevent="true" style={{height:'720px', overflow:'hidden', borderRadius:'0 0 12px 12px', textAlign:'left'}}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
<div className="app">

{/* TOPBAR */}
<div className="topbar" ref={topbarRef}>
  <div className="tb-brand">
    <div className="tb-mark"><svg viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" opacity=".9"/><rect x="7" y="1" width="5" height="5" rx="1.2" fill="white" opacity=".4"/><rect x="1" y="7" width="5" height="5" rx="1.2" fill="white" opacity=".4"/><rect x="7" y="7" width="5" height="5" rx="1.2" fill="white" opacity=".9"/></svg></div>
  </div>
  <div className="tb-nav">
    <span className="tb-bc">{sec}</span>
    <span className="tb-sep">/</span>
    <span className="tb-cur">{page.charAt(0).toUpperCase() + page.slice(1)}</span>
  </div>
  <div className="tb-right">
    <span className="tb-badge">10 dues</span>
    <div className="tb-user">
      <div className="tb-avatar">RS</div>
      Abu Rahat Sabir · Admin
    </div>
  </div>
</div>

<div className="body">
{/* SIDEBAR */}
<nav className="sb" ref={sbRef}>
  <div className={"sb-item " + (page==='dashboard'?'on':'')} onClick={()=>nav('dashboard','Core')} title="">
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    <span className="sb-tip">Dashboard</span>
  </div>
  <div className={"sb-item " + (page==='orders'?'on':'')} onClick={()=>nav('orders','Core')} title="">
    <svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>
    <span className="sb-tip">New Order</span>
  </div>
  <div className={"sb-item " + (page==='dealers'?'on':'')} onClick={()=>nav('dealers','Core')} title="">
    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span className="sb-tip">Dealers / CRM</span>
  </div>
  <div className={"sb-item " + (page==='products'?'on':'')} onClick={()=>nav('products','Core')} title="">
    <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    <span className="sb-tip">Products &amp; SKUs</span>
  </div>
  <div className="sb-hr"/>
  <div className={"sb-item " + (page==='ledger'?'on':'')} onClick={()=>nav('ledger','Finance')} title="">
    <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    <span className="sb-tip">Finance Ledger</span>
  </div>
  <div className={"sb-item " + (page==='payments'?'on':'')} onClick={()=>nav('payments','Finance')} title="">
    <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    <span className="sb-tip">Payments</span>
  </div>
  <div className={"sb-item " + (page==='commissions'?'on':'')} onClick={()=>nav('commissions','Finance')} title="">
    <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    <span className="sb-tip">Commissions</span>
  </div>
  <div className="sb-hr"/>
  <div className={"sb-item " + (page==='inventory'?'on':'')} onClick={()=>nav('inventory','Operations')} title="">
    <svg viewBox="0 0 24 24"><path d="M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"/></svg>
    <span className="sb-tip">Inventory</span>
  </div>
  <div className={"sb-item " + (page==='dispatch'?'on':'')} onClick={()=>nav('dispatch','Operations')} title="">
    <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    <span className="sb-tip">Dispatch Log</span>
  </div>
  <div className={"sb-item " + (page==='returns'?'on':'')} onClick={()=>nav('returns','Operations')} title="">
    <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg>
    <span className="sb-tip">Returns · 18</span>
  </div>
  <div className={"sb-item " + (page==='damage'?'on':'')} onClick={()=>nav('damage','Operations')} title="">
    <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span className="sb-tip">Damage Tracker</span>
  </div>
  <div className="sb-hr"/>
  <div className={"sb-item " + (page==='analytics'?'on':'')} onClick={()=>nav('analytics','Reports')} title="">
    <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    <span className="sb-tip">Analytics</span>
  </div>
  <div className={"sb-item " + (page==='hr'?'on':'')} onClick={()=>nav('hr','Reports')} title="">
    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span className="sb-tip">HR &amp; Payroll</span>
  </div>
  <div className="sb-foot">
    <div className="sb-stat-dot"/>
  </div>
</nav>

{/* MAIN */}
<div className="main" id="main" ref={mainRef}>

{/* ═══════════════════════════════════════ DASHBOARD ═══ */}
<div className={`pg${page==='dashboard'?' on':''}`} id="pg-dashboard">
  <div className="pg-head">
    <div className="pg-title">Dashboard</div>
    <div className="pg-sub">R Group · DOHA Brand FMCG Distribution · Sylhet · Sep 2022 – Oct 2023 · 14 months live data</div>
  </div>

  {/* Alerts */}
  <div className="alert-row">
    <div className="alert danger">
      <div className="alert-icon">!</div>
      <div className="alert-body">
        <div className="alert-title">Outstanding Dues — ৳15,46,032 across 9 accounts</div>
        <div className="alert-msg">Dealers 977, 974, 975, 976 each carry ৳2.1L–৳4.6L unpaid from Aug 2023 deliveries. Immediate follow-up required.</div>
      </div>
    </div>
    <div className="alert warn">
      <div className="alert-icon">~</div>
      <div className="alert-body">
        <div className="alert-title">18 Return Events · ~2,100 kg unresolved stock</div>
        <div className="alert-msg">3 returns from Aug–Oct 2023 still pending credit settlement in next challan.</div>
      </div>
    </div>
    <div className="alert info">
      <div className="alert-icon">↑</div>
      <div className="alert-body">
        <div className="alert-title">Revenue 66× growth — Sep 2022 to Oct 2023</div>
        <div className="alert-msg">Monthly order value grew from ৳57,640 to ৳38,70,740. Oct 2023 is the highest month on record.</div>
      </div>
    </div>
  </div>

  {/* KPIs */}
  <div className="kpis k5">
    <div className="kpi k-ink">
      <div className="kpi-l">Total Order Value</div>
      <div className="kpi-v">৳2,37,02,478</div>
      <div className="kpi-s">109 delivery memos · 14 months</div>
      <div className="kpi-delta up">↑ Avg ৳2,17,454 per memo</div>
    </div>
    <div className="kpi k-g">
      <div className="kpi-l">Total Payments Received</div>
      <div className="kpi-v grn">৳2,49,24,450</div>
      <div className="kpi-s">Bank ৳1,40,98,273 · Other ৳1,04,63,927</div>
      <div className="kpi-delta up">↑ ৳12,21,972 overpayment (advance)</div>
    </div>
    <div className="kpi k-b">
      <div className="kpi-l">Volume Dispatched</div>
      <div className="kpi-v blu">88,699 kg</div>
      <div className="kpi-s">Avg 813.8 kg / delivery</div>
      <div className="kpi-delta up">↑ Peak: 16,180 kg in Aug 2023</div>
    </div>
    <div className="kpi k-r">
      <div className="kpi-l">Outstanding Dues</div>
      <div className="kpi-v red">৳15,46,032</div>
      <div className="kpi-s">9 accounts · ৳1,26,988 advance credit</div>
      <div className="kpi-delta warn">⚠ 6 accounts overdue since Aug 2023</div>
    </div>
    <div className="kpi k-a">
      <div className="kpi-l">Active Dealers</div>
      <div className="kpi-v">14</div>
      <div className="kpi-s">Across Sylhet division</div>
      <div className="kpi-delta up">↑ 9 new onboarded Feb–Aug 2023</div>
    </div>
  </div>

  {/* Charts row */}
  <div className="g2">
    <div className="card">
      <div className="ch">
        <div className="ct">Monthly revenue & payments</div>
        <div style={{display:"flex",gap:"12px"}}>
          <span style={{display:"flex",alignItems:"center",gap:"5px",fontFamily:"var(--mono)",fontSize:"9px",color:"var(--ink3)"}}><span style={{width:"8px",height:"8px",borderRadius:"2px",background:"#0F172A",display:"inline-block"}}></span>Order value</span>
          <span style={{display:"flex",alignItems:"center",gap:"5px",fontFamily:"var(--mono)",fontSize:"9px",color:"var(--ink3)"}}><span style={{width:"8px",height:"8px",borderRadius:"2px",background:"var(--gm)",display:"inline-block"}}></span>Payments received</span>
        </div>
      </div>
      <div className="cv h180"><canvas id="c-dual"></canvas></div>
    </div>
    <div className="card">
      <div className="ch"><div className="ct">Recent activity</div><div className="cs">Last 8 transactions</div></div>
      <div id="activity-feed" style={{maxHeight:'165px',overflowY:'auto'}}></div>
    </div>
  </div>

  {/* Dealer + product row */}
  <div className="g13" style={{alignItems:'stretch', height:'470px'}}>
    <div className="card" style={{display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <div className="ch"><div className="ct">Dealer account overview</div><div className="cs">All 14 · click row → ledger</div></div>
      <div style={{flex:1,overflowY:'auto',minHeight:0}}>
        <table className="tbl">
          <thead><tr><th>Dealer</th><th>Code</th><th>Orders</th><th>Revenue</th><th>Volume kg</th><th>First → Last</th><th>Balance</th></tr></thead>
          <tbody id="dash-dealers"></tbody>
        </table>
      </div>
    </div>
    <div>
      <div className="card mb">
        <div className="ch"><div className="ct">Product mix</div><div className="cs">by kg dispatched</div></div>
        <div className="cv" style={{height:'110px'}}><canvas id="c-donut"></canvas></div>
        <div style={{padding:"8px 16px 14px"}}><div className="leg">
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#0F172A"}}></div><div className="ln">Chili (Morich)</div></div><div><span className="lv">45,785 kg</span><span className="lp">51.6%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#64748B"}}></div><div className="ln">Turmeric (Holud)</div></div><div><span className="lv">24,821 kg</span><span className="lp">28.0%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#94A3B8"}}></div><div className="ln">Coriander (Dhania)</div></div><div><span className="lv">16,454 kg</span><span className="lp">18.6%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#E2E8F0"}}></div><div className="ln">Tea + Others</div></div><div><span className="lv">1,639 kg</span><span className="lp">1.8%</span></div></div>
        </div></div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">Outstanding dues</div><div className="cs">per dealer</div></div>
        <div className="cv" style={{height:'120px'}}><canvas id="c-dues"></canvas></div>
      </div>
    </div>
  </div>
</div>

{/* ═══════════════════════════════════════ ORDERS ═══ */}

<div className={`pg${page==='orders'?' on':''}`} id="pg-orders">
  <div className="pg-head"><div className="pg-title">New Order Entry</div><div className="pg-sub">Create a delivery memo — live invoice preview · auto-calculates totals · all fields validated</div></div>
  <div className="ord-shell">
    {/* Form */}
    <div>
      <div className="card mb">
        <div className="ch"><div className="ct">Delivery details</div><div className="cs">Memo auto-numbered on save</div></div>
        <div style={{padding:"14px 16px"}}>
          <div className="form-row2">
            <div><label className="form-lbl">Dealer account</label>
              <select value={orderDlr} onChange={e=>setOrderDlr(e.target.value)}>
                <option value="965">965 — Tasneem Enterprises (Madhavpur)</option>
                <option value="971">971 — Shaon Enterprises (Sunamganj)</option>
                <option value="966">966 — Nishikant Store (Pagla)</option>
                <option value="967">967 — Sufia Enterprises (Bishwanath)</option>
                <option value="968">968 — Rubel Enterprises</option>
                <option value="969">969 — Abdul Hannan &amp; Sons</option>
                <option value="970">970 — Ma Enterprises (Rajnagar)</option>
              </select>
            </div>
            <div><label className="form-lbl">Delivery date</label><input type="text" value={orderDate} onChange={e=>setOrderDate(e.target.value)} /></div>
          </div>
          <div className="form-row2">
            <div><label className="form-lbl">Manager / SR name</label><input type="text" value={orderMgr} onChange={e=>setOrderMgr(e.target.value)} /></div>
            <div><label className="form-lbl">Transport (pickup rent)</label><input type="text" placeholder="e.g. Pickup — ৳4,500" /></div>
          </div>
          <div className="form-row2">
            <div><label className="form-lbl">Previous balance (৳)</label><input type="number" value={orderPrevBal} onChange={e=>setOrderPrevBal(e.target.value)} /></div>
            <div><label className="form-lbl">Payment received (৳)</label><input type="number" value={orderPayment} onChange={e=>setOrderPayment(e.target.value)} /></div>
          </div>
        </div>
      </div>
      <div className="card mb">
        <div className="ch"><div className="ct">Order lines</div><div className="cs">Product × Size × Qty × Rate</div></div>
        <div style={{padding:"12px 16px"}}>
          <div className="sku-wrap">
            <div className="sku-hd"><span>Product</span><span>Size</span><span>Qty</span><span>Rate ৳</span><span></span></div>
            {skuRows.map(row => (
              <div key={row.id} className="sku-row">
                <select value={row.prodIdx} onChange={e=>updateSKU(row.id,'prodIdx',e.target.value)}>
                  {SKUS.map((s,i)=><option key={i} value={i}>{s.name}</option>)}
                </select>
                <select value={row.sizeIdx} onChange={e=>updateSKU(row.id,'sizeIdx',e.target.value)}>
                  {(SKUS[row.prodIdx]?.sizes||[]).map((sz,i)=><option key={i} value={i}>{sz}</option>)}
                </select>
                <input type="number" value={row.qty} min="1" onChange={e=>updateSKU(row.id,'qty',e.target.value)} />
                <input type="number" value={row.rate} step="0.01" onChange={e=>updateSKU(row.id,'rate',e.target.value)} />
                <button className="del-btn" onClick={()=>removeSKU(row.id)}>×</button>
              </div>
            ))}
          </div>
          <button className="add-sku" onClick={addSKU}>+ Add product line</button>
        </div>
      </div>
      <div className="card">
        <div className="ch"><div className="ct">Memo notes</div></div>
        <div style={{padding:"12px 16px"}}>
          <textarea style={{width:"100%",border:"1px solid var(--ln)",borderRadius:"6px",padding:"8px 10px",fontFamily:"var(--sans)",fontSize:"12px",resize:"none",height:"52px",outline:"none",color:"var(--ink)"}} placeholder="Bank deposit details, commission payments, return notes, offer adjustments…"></textarea>
          <button className="save-btn" onClick={saveOrder}>Save Delivery Memo →</button>
          {showToast && <div className="toast" style={{display:'block'}}>✓ Memo #10111 saved · Ledger updated · Commission queued · Stock adjusted</div>}
        </div>
      </div>
    </div>

    {/* Live Invoice */}
    <div className="invoice" style={{alignSelf:"start"}}>
      <div className="inv-header">
        <div>
          <div className="inv-co-name">R Group</div>
          <div className="inv-co-sub">DOHA BRAND FMCG · SYLHET DIVISION</div>
        </div>
        <div className="inv-memo-block">
          <div className="inv-memo-label">Delivery Memo</div>
          <div className="inv-memo-num">#10111</div>
        </div>
      </div>
      <div className="inv-meta">
        <div className="inv-meta-col">
          <div className="inv-field-lbl">Bill To</div>
          <div className="inv-field-val">{dm.name}</div>
          <div className="inv-field-sub">Code: {orderDlr} · {dm.addr}</div>
        </div>
        <div className="inv-meta-col">
          <div className="inv-field-lbl">Delivery Date</div>
          <div className="inv-field-val">{orderDate}</div>
          <div className="inv-field-sub">SR: {orderMgr}</div>
        </div>
      </div>
      <div className="inv-balance-strip">
        <div className="inv-balance-cell">
          <div className="inv-balance-lbl">Previous Balance</div>
          <div className="inv-balance-val">৳{Number(orderPrevBal).toLocaleString()}</div>
        </div>
        <div className="inv-balance-cell">
          <div className="inv-balance-lbl">Payment Received</div>
          <div className="inv-balance-val" style={{color:"var(--gdk)"}}>৳{Number(orderPayment).toLocaleString()}</div>
        </div>
      </div>
      <div className="inv-lines-hd"><span>Product</span><span>Qty</span><span>Rate</span><span>Amount</span></div>
      <div>
        {skuRows.length === 0
          ? <div className="inv-empty">Add product lines to see invoice</div>
          : skuRows.map(row => {
              const pn = SKUS[row.prodIdx]?.name || '';
              const sz = SKUS[row.prodIdx]?.sizes[row.sizeIdx] || '';
              const amt = Math.round(row.qty * row.rate);
              return (
                <div key={row.id} className="inv-line">
                  <span className="p-name">{pn} · {sz}</span>
                  <span>{row.qty}</span>
                  <span>৳{Number(row.rate).toFixed(2)}</span>
                  <span className="p-total">৳{amt.toLocaleString()}</span>
                </div>
              );
            })
        }
      </div>
      <div className="inv-totals">
        <div className="inv-total-row"><span className="lbl">Order value</span><span className="val">৳{orderVal.toLocaleString()}</span></div>
        <div className="inv-total-row"><span className="lbl">Previous balance</span><span className="val">৳{Number(orderPrevBal).toLocaleString()}</span></div>
        <div className="inv-total-row"><span className="lbl">Payment received</span><span className="val" style={{color:"var(--gdk)"}}>৳{Number(orderPayment).toLocaleString()}</span></div>
        <div className="inv-total-row main"><span className="lbl">Order Total</span><span className="val">৳{orderVal.toLocaleString()}</span></div>
      </div>
      <div className="inv-net-bar">
        <div>
          <div className="inv-net-lbl">Net Outstanding</div>
          <div className="inv-net-val" style={{color:netOutstanding>0?'var(--rm)':netOutstanding<0?'var(--gdk)':'var(--ink4)'}}>
            ৳{Math.abs(netOutstanding).toLocaleString()} {netOutstanding>0?'DUE':netOutstanding<0?'ADVANCE':'CLEARED'}
          </div>
        </div>
        <div className="inv-vol-line">{totalKg.toFixed(1)} kg estimated</div>
      </div>
    </div>
  </div>
</div>

{/* ═══════════════════════════════════════ DEALERS ═══ */}

<div className={`pg${page==='dealers'?' on':''}`} id="pg-dealers">
  <div className="pg-head"><div className="pg-title">Dealers / CRM</div><div className="pg-sub">14 active accounts · Sep 2022 – Oct 2023 · Sylhet Division · click row to open ledger</div></div>
  <div className="kpis k4">
    <div className="kpi k-ink"><div className="kpi-l">Total Dealers</div><div className="kpi-v">14</div><div className="kpi-s">Active accounts</div></div>
    <div className="kpi k-g"><div className="kpi-l">Total Revenue</div><div className="kpi-v grn">৳2,37,02,478</div><div className="kpi-s">All 14 dealers combined</div></div>
    <div className="kpi k-b"><div className="kpi-l">Top Dealer (965)</div><div className="kpi-v blu">৳1,29,81,196</div><div className="kpi-s">Tasneem Ent. · 58 orders · 48,533 kg</div></div>
    <div className="kpi k-r"><div className="kpi-l">Overdue Accounts</div><div className="kpi-v red">9</div><div className="kpi-s">Total ৳15,46,032 outstanding</div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">All dealer accounts</div><div className="cs">Ranked by total order value · Click row → ledger view</div></div>
    <table className="tbl">
      <thead><tr><th>Dealer Name</th><th>Code</th><th>Manager</th><th>Location</th><th>Phone</th><th>Orders</th><th>Revenue</th><th>Paid</th><th>Volume kg</th><th>Revenue share</th><th>Balance</th></tr></thead>
      <tbody id="full-dealers"></tbody>
    </table>
  </div>
</div>

{/* ═══════════════════════════════════════ PRODUCTS ═══ */}
<div className={`pg${page==='products'?' on':''}`} id="pg-products">
  <div className="pg-head"><div className="pg-title">Products & SKUs</div><div className="pg-sub">DOHA Brand · 6 product lines · 32+ SKU variants · Multi-size packaging · Versioned pricing</div></div>
  <div className="kpis k4">
    <div className="kpi k-ink"><div className="kpi-l">Product Lines</div><div className="kpi-v">6</div><div className="kpi-s">DOHA brand FMCG</div></div>
    <div className="kpi k-g"><div className="kpi-l">SKU Variants</div><div className="kpi-v">32+</div><div className="kpi-s">Size × product combinations</div></div>
    <div className="kpi k-a"><div className="kpi-l">Top SKU by Volume</div><div className="kpi-v">5 kg Chili</div><div className="kpi-s">৳345–৳385 · Highest lifetime kg</div></div>
    <div className="kpi k-b"><div className="kpi-l">Price Range</div><div className="kpi-v">৳3–৳385</div><div className="kpi-s">Per unit across all SKUs</div></div>
  </div>
  <div className="card mb">
    <div className="ch"><div className="ct">Product catalog</div><div className="cs">Lifetime dispatch · all dealers · real rates observed in data</div></div>
    <div className="prod-grid" id="prod-catalog"></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Price history — key SKUs</div><div className="cs">Rate changes observed across dispatch records Sep 2022 – Oct 2023</div></div>
    <table className="tbl">
      <thead><tr><th>Product</th><th>Size</th><th>Sep–Dec 2022</th><th>Jan–Jul 2023</th><th>Aug–Oct 2023</th><th>% Change</th><th>Reason</th></tr></thead>
      <tbody>
        <tr><td>Chili Powder</td><td className="m">5 kg</td><td className="m">৳320</td><td className="m">৳335 – ৳345</td><td className="m">৳385</td><td><span className="pill p-blu">+20.3%</span></td><td style={{fontSize:"10px",color:"var(--ink3)"}}>Seasonal demand + supply cost increase</td></tr>
        <tr><td>Turmeric Powder</td><td className="m">5 kg</td><td className="m">৳180</td><td className="m">৳155 – ৳165</td><td className="m">৳185</td><td><span className="pill p-blu">+2.8%</span></td><td style={{fontSize:"10px",color:"var(--ink3)"}}>Mid-year price adjustment</td></tr>
        <tr><td>Coriander Powder</td><td className="m">5 kg</td><td className="m">৳145</td><td className="m">৳135 – ৳145</td><td className="m">৳165</td><td><span className="pill p-blu">+13.8%</span></td><td style={{fontSize:"10px",color:"var(--ink3)"}}>Import price pass-through</td></tr>
        <tr><td>Tea Leaves</td><td className="m">500 gm</td><td className="m">৳250</td><td className="m">৳255</td><td className="m">৳235</td><td><span className="pill p-gray">−6.0%</span></td><td style={{fontSize:"10px",color:"var(--ink3)"}}>Promotional pricing Oct 2023</td></tr>
        <tr><td>Cumin Powder</td><td className="m">500 gm</td><td className="m">৳145</td><td className="m">৳145 – ৳155</td><td className="m">৳185</td><td><span className="pill p-blu">+27.6%</span></td><td style={{fontSize:"10px",color:"var(--ink3)"}}>Low volume — price sensitivity low</td></tr>
      </tbody>
    </table>
  </div>
</div>

{/* ═══════════════════════════════════════ LEDGER ═══ */}
<div className={`pg${page==='ledger'?' on':''}`} id="pg-ledger">
  <div className="pg-head"><div className="pg-title">Finance Ledger</div><div className="pg-sub">Per-dealer rolling account · All transactions · Bank + bKash + Cash reconciled</div></div>
  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
    <label style={{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--ink3)",whiteSpace:"nowrap"}}>Select dealer</label>
    <select id="ldg-sel" value={ledgerDlr} onChange={(e) => setLedgerDlr(e.target.value)} style={{maxWidth:"420px"}}>
      <option value="965">965 — Tasneem Enterprises (Madhavpur) · 58 orders</option>
      <option value="971">971 — Shaon Enterprises (Sunamganj) · 18 orders</option>
      <option value="966">966 — Nishikant Store (Pagla) · 9 orders</option>
      <option value="967">967 — Sufia Enterprises (Bishwanath) · 9 orders</option>
      <option value="968">968 — Rubel Enterprises · 2 orders</option>
      <option value="969">969 — Abdul Hannan & Sons · 3 orders</option>
      <option value="970">970 — Ma Enterprises (Rajnagar) · 2 orders</option>
      <option value="972">972 — Tasneem (Code 972) · 2 orders</option>
      <option value="974">974 — Tasneem (Code 974) · 1 order</option>
      <option value="973">973 — Tasneem (Code 973) · 1 order</option>
      <option value="975">975 — Tasneem (Code 975) · 1 order</option>
      <option value="976">976 — Tasneem (Code 976) · 1 order</option>
      <option value="977">977 — Tasneem (Code 977) · 1 order</option>
    </select>
  </div>
  <div className="ldg-summary" id="ldg-summary"></div>
  <div className="card">
    <div className="ch"><div className="ct" id="ldg-title">Transaction history</div><div className="cs" id="ldg-meta"></div></div>
    <div className="stbl" style={{maxHeight:"340px"}}>
      <table className="tbl">
        <thead><tr><th>Memo #</th><th>Date</th><th>Order Value</th><th>Prev Balance</th><th>Grand Total</th><th>Paid</th><th>Running Due</th><th>Advance Credit</th><th>Bank</th><th>KG</th><th>Notes</th></tr></thead>
        <tbody id="ldg-body"></tbody>
      </table>
    </div>
  </div>
</div>

{/* ═══════════════════════════════════════ PAYMENTS ═══ */}
<div className={`pg${page==='payments'?' on':''}`} id="pg-payments">
  <div className="pg-head"><div className="pg-title">Payments</div><div className="pg-sub">Bank transfer · bKash · Cash · Cheque · Programme credits · All channels reconciled</div></div>
  <div className="kpis k4">
    <div className="kpi k-g"><div className="kpi-l">Total Received</div><div className="kpi-v grn">৳2,49,24,450</div><div className="kpi-s">All channels · Sep 2022 – Oct 2023</div></div>
    <div className="kpi k-b"><div className="kpi-l">Bank Transfers</div><div className="kpi-v blu">৳1,40,98,273</div><div className="kpi-s">56.6% of all receipts · Pubali, DBBL</div></div>
    <div className="kpi k-a"><div className="kpi-l">Cash & Other</div><div className="kpi-v">৳1,08,26,177</div><div className="kpi-s">bKash, Rocket, cash, offers</div></div>
    <div className="kpi k-ink"><div className="kpi-l">Overpayment (Net)</div><div className="kpi-v">৳12,21,972</div><div className="kpi-s">Total paid minus total ordered</div></div>
  </div>
  <div className="g2">
    <div className="card">
      <div className="ch"><div className="ct">Payment channels</div><div className="cs">All 109 memos · estimated by channel</div></div>
      <div className="pc-item"><div className="pc-icon" style={{background:"var(--bbg)",color:"var(--bm)"}}>BK</div><div><div className="pc-name">Bank transfer</div><div className="pc-sub">Pubali Bank · Dutch-Bangla · Cheque · Primary channel</div></div><div className="pc-amt">৳1,40,98,273</div></div>
      <div className="pc-item"><div className="pc-icon" style={{background:"#f3e8ff",color:"#7c3aed"}}>bK</div><div><div className="pc-name">bKash / Rocket mobile banking</div><div className="pc-sub">Mobile transfers · GM deposits · Direct agent</div></div><div className="pc-amt">~৳42,00,000</div></div>
      <div className="pc-item"><div className="pc-icon" style={{background:"var(--gbg)",color:"var(--gdk)"}}>Ca</div><div><div className="pc-name">Cash collection</div><div className="pc-sub">In-person · Depot collection · Field collection</div></div><div className="pc-amt">~৳24,00,000</div></div>
      <div className="pc-item"><div className="pc-icon" style={{background:"var(--off2)",color:"var(--ink3)"}}>Of</div><div><div className="pc-name">Programme offer credits</div><div className="pc-sub">Promotional offsets · Free goods adjustments</div></div><div className="pc-amt">~৳2,26,177</div></div>
    </div>
    <div className="card"><div className="ch"><div className="ct">Monthly payment receipts</div><div className="cs">৳ actual received</div></div><div className="cv h160"><canvas id="c-pay"></canvas></div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Payment records</div><div className="cs">Top 20 by amount · bank + other split</div></div>
    <div className="stbl"><table className="tbl"><thead><tr><th>Memo</th><th>Date</th><th>Dealer</th><th>Code</th><th>Bank ৳</th><th>Other ৳</th><th>Total Paid ৳</th><th>Notes</th></tr></thead><tbody id="pay-body"></tbody></table></div>
  </div>
</div>

{/* ═══════════════════════════════════════ COMMISSIONS ═══ */}
<div className={`pg${page==='commissions'?' on':''}`} id="pg-commissions">
  <div className="pg-head"><div className="pg-title">Commissions</div><div className="pg-sub">SR commission @ ৳15/kg standard rate · Dealer commissions · Manager bonuses · 22 recorded events</div></div>
  <div className="kpis k4">
    <div className="kpi k-ink"><div className="kpi-l">SR Rate Standard</div><div className="kpi-v">৳15 / kg</div><div className="kpi-s">Applied across all dealer territories</div></div>
    <div className="kpi k-g"><div className="kpi-l">Est. Total SR Commission</div><div className="kpi-v grn">৳13,30,485</div><div className="kpi-s">Based on 88,699 kg × ৳15</div></div>
    <div className="kpi k-b"><div className="kpi-l">Largest Single Payment</div><div className="kpi-v blu">৳1,60,485</div><div className="kpi-s">Memo 10102 · Oct 2023 · 10,699 kg × ৳15</div></div>
    <div className="kpi k-a"><div className="kpi-l">Commission Records</div><div className="kpi-v">22</div><div className="kpi-s">Extracted from memo notes</div></div>
  </div>
  <div className="g2">
    <div className="card">
      <div className="ch"><div className="ct">SR commission by dealer territory</div><div className="cs">Estimated @ ৳15/kg lifetime</div></div>
      <div style={{padding:"14px 16px"}}><div className="leg" style={{gap:"10px"}}>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#0F172A"}}></div><div className="ln">Dealer 965 — Tasneem (Madhavpur)</div></div><div><span className="lv">৳7,27,995</span><span className="lp">48,533 kg</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#64748B"}}></div><div className="ln">Dealer 971 — Shaon (Sunamganj)</div></div><div><span className="lv">৳2,11,845</span><span className="lp">14,123 kg</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#94A3B8"}}></div><div className="ln">Dealer 966 — Nishikant (Pagla)</div></div><div><span className="lv">৳93,900</span><span className="lp">6,260 kg</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#CBD5E1"}}></div><div className="ln">Dealer 967 — Sufia (Bishwanath)</div></div><div><span className="lv">৳67,095</span><span className="lp">4,473 kg</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#E2E8F0"}}></div><div className="ln">Dealers 968–977 (10 accounts)</div></div><div><span className="lv">৳2,29,650</span><span className="lp">15,310 kg</span></div></div>
      </div></div>
    </div>
    <div className="card"><div className="ch"><div className="ct">Commission event history</div><div className="cs">Amounts paid per memo</div></div><div className="cv h180"><canvas id="c-comm"></canvas></div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Commission payment log</div><div className="cs">22 events extracted from delivery memo notes</div></div>
    <div className="stbl"><table className="tbl"><thead><tr><th>Memo</th><th>Date</th><th>Dealer</th><th>kg × Rate</th><th>Amount ৳</th><th>Notes</th></tr></thead><tbody id="comm-body"></tbody></table></div>
  </div>
</div>

{/* ═══════════════════════════════════════ INVENTORY ═══ */}
<div className={`pg${page==='inventory'?' on':''}`} id="pg-inventory">
  <div className="pg-head"><div className="pg-title">Inventory</div><div className="pg-sub">88,699 kg total dispatched · 6 SKU product lines · DOHA Brand · Sep 2022 – Oct 2023</div></div>
  <div className="kpis k5">
    <div className="kpi k-ink"><div className="kpi-l">Total Dispatched</div><div className="kpi-v">88,699 kg</div><div className="kpi-s">Across 109 delivery memos</div></div>
    <div className="kpi k-g"><div className="kpi-l">Chili Powder</div><div className="kpi-v grn">45,785 kg</div><div className="kpi-s">51.6% of total · 14 months</div></div>
    <div className="kpi k-a"><div className="kpi-l">Turmeric Powder</div><div className="kpi-v">24,821 kg</div><div className="kpi-s">28.0% of total</div></div>
    <div className="kpi k-b"><div className="kpi-l">Coriander Powder</div><div className="kpi-v blu">16,454 kg</div><div className="kpi-s">18.6% of total</div></div>
    <div className="kpi k-r"><div className="kpi-l">Returns Est.</div><div className="kpi-v red">~2,100 kg</div><div className="kpi-s">18 events · ~2.4% of dispatched</div></div>
  </div>
  <div className="g2">
    <div className="card"><div className="ch"><div className="ct">Monthly dispatch by product</div><div className="cs">kg stacked</div></div><div className="cv h180"><canvas id="c-inv-stk"></canvas></div></div>
    <div className="card">
      <div className="ch"><div className="ct">SKU dispatch totals</div><div className="cs">Lifetime · all dealers</div></div>
      <div style={{padding:"14px 16px"}}>
        <div id="inv-sku-cards"></div>
      </div>
    </div>
  </div>
</div>

{/* ═══════════════════════════════════════ DISPATCH ═══ */}
<div className={`pg${page==='dispatch'?' on':''}`} id="pg-dispatch">
  <div className="pg-head"><div className="pg-title">Dispatch Log</div><div className="pg-sub">All 109 delivery memos · Sep 2022 – Oct 2023 · Filter by dealer · Search by memo number</div></div>
  <div className="kpis k4">
    <div className="kpi k-ink"><div className="kpi-l">Total Memos</div><div className="kpi-v">109</div><div className="kpi-s">Delivery records</div></div>
    <div className="kpi k-g"><div className="kpi-l">Peak Month</div><div className="kpi-v grn">Aug 2023</div><div className="kpi-s">16,180 kg · 13 memos</div></div>
    <div className="kpi k-a"><div className="kpi-l">Avg per Memo</div><div className="kpi-v">813.8 kg</div><div className="kpi-s">Per delivery · ৳2,17,454 avg value</div></div>
    <div className="kpi k-b"><div className="kpi-l">Largest Delivery</div><div className="kpi-v blu">2,470 kg</div><div className="kpi-s">Memo #10108 · 31 Oct 2023</div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Dispatch records</div><div className="cs">All memos · product breakdown</div></div>
    <div className="frow">
      <span className="flbl">Filter dealer:</span>
      {['all','965','971','966','967','968'].map(code => (
        <button key={code} className={`fbtn${filtCode===code?' on':''}`}
          onClick={() => setFiltCode(code)}>
          {code === 'all' ? 'All' : code}
        </button>
      ))}
      <input className="srch" placeholder="Memo # or dealer…" value={dispSearch}
        onChange={e => setDispSearch(e.target.value)} />
    </div>
    <div className="stbl" style={{maxHeight:"340px"}}><table className="tbl"><thead><tr><th>Memo #</th><th>Date</th><th>Dealer</th><th>Code</th><th>Chili kg</th><th>Turmeric kg</th><th>Coriander kg</th><th>Tea kg</th><th>Total kg</th><th>Order Value ৳</th></tr></thead><tbody id="disp-body"></tbody></table></div>
  </div>
</div>

{/* ═══════════════════════════════════════ RETURNS ═══ */}
<div className={`pg${page==='returns'?' on':''}`} id="pg-returns">
  <div className="pg-head"><div className="pg-title">Returns Register</div><div className="pg-sub">18 events · Product returns · Damage · Production defects · Short deliveries · Credit tracking</div></div>
  <div className="kpis k5">
    <div className="kpi k-r"><div className="kpi-l">Total Events</div><div className="kpi-v red">18</div><div className="kpi-s">Sep 2022 – Oct 2023</div></div>
    <div className="kpi k-a"><div className="kpi-l">Est. Return Volume</div><div className="kpi-v">~2,100 kg</div><div className="kpi-s">Chili, coriander, turmeric</div></div>
    <div className="kpi k-ink"><div className="kpi-l">Return Rate</div><div className="kpi-v">2.37%</div><div className="kpi-s">Of total 88,699 kg dispatched</div></div>
    <div className="kpi k-g"><div className="kpi-l">Resolved</div><div className="kpi-v grn">15</div><div className="kpi-s">Credit notes issued & settled</div></div>
    <div className="kpi k-b"><div className="kpi-l">Pending</div><div className="kpi-v blu">3</div><div className="kpi-s">Next challan settlement</div></div>
  </div>
  <div className="g2">
    <div className="card">
      <div className="ch"><div className="ct">Return events timeline</div><div className="cs">Most recent first</div></div>
      <div className="stbl" style={{maxHeight:"300px"}} id="ret-tl"></div>
    </div>
    <div className="card">
      <div className="ch"><div className="ct">Returns by reason</div><div className="cs">18 events classified</div></div>
      <div className="cv" style={{height:"130px"}}><canvas id="c-ret"></canvas></div>
      <div style={{padding:"10px 16px 14px"}}><div className="leg">
        <div className="li"><div className="ll"><div className="lsq" style={{background:"var(--bm)"}}></div><div className="ln">Product return (ফেরত পন্য)</div></div><div><span className="lv">14</span><span className="lp">events</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"var(--rm)"}}></div><div className="ln">In-transit damage</div></div><div><span className="lv">2</span><span className="lp">events</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"var(--am)"}}></div><div className="ln">Production defect</div></div><div><span className="lv">2</span><span className="lp">events</span></div></div>
        <div className="li"><div className="ll"><div className="lsq" style={{background:"#64748B"}}></div><div className="ln">Short delivery</div></div><div><span className="lv">1</span><span className="lp">event</span></div></div>
      </div></div>
    </div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Full returns register</div><div className="cs">All 18 confirmed events</div></div>
    <div className="stbl"><table className="tbl"><thead><tr><th>Memo</th><th>Date</th><th>Dealer</th><th>Type</th><th>Products</th><th>Qty Est.</th><th>Est. Value ৳</th><th>Status</th><th>Notes</th></tr></thead><tbody id="ret-body"></tbody></table></div>
  </div>
</div>

{/* ═══════════════════════════════════════ DAMAGE ═══ */}
<div className={`pg${page==='damage'?' on':''}`} id="pg-damage">
  <div className="pg-head"><div className="pg-title">Damage Tracker</div><div className="pg-sub">In-transit damage · Factory production defects · Short deliveries · Credit tracking</div></div>
  <div className="kpis k4">
    <div className="kpi k-r"><div className="kpi-l">Damage Events</div><div className="kpi-v red">4</div><div className="kpi-s">Confirmed from memo notes</div></div>
    <div className="kpi k-a"><div className="kpi-l">Est. Financial Impact</div><div className="kpi-v">৳76,570</div><div className="kpi-s">৳14,420 defect + ৳47,200 return + other</div></div>
    <div className="kpi k-b"><div className="kpi-l">Dealers Affected</div><div className="kpi-v blu">3</div><div className="kpi-s">965, 971, 977</div></div>
    <div className="kpi k-g"><div className="kpi-l">Resolved</div><div className="kpi-v grn">3 of 4</div><div className="kpi-s">Credit issued or restocked</div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Damage & defect records</div><div className="cs">All 4 confirmed events with full resolution detail</div></div>
    <div id="dmg-tl"></div>
  </div>
</div>

{/* ═══════════════════════════════════════ ANALYTICS ═══ */}
<div className={`pg${page==='analytics'?' on':''}`} id="pg-analytics">
  <div className="pg-head"><div className="pg-title">Analytics & Reports</div><div className="pg-sub">Revenue · Volume · Dealer performance · Product trends · SR metrics · All from real transaction data</div></div>
  <div className="atabs">
    {[['rev','Revenue'],['vol','Volume'],['dlr','Dealers'],['prd','Products']].map(([id,lbl]) => (
      <button key={id} className={`atab${a===id?' on':''}`} onClick={() => switchTab(id)}>{lbl}</button>
    ))}
  </div>
  <div id="a-rev" style={{ display: a === 'rev' ? 'block' : 'none' }} className={a==='rev'?'fade':''}>
    <div className="g2">
      <div className="card"><div className="ch"><div className="ct">Monthly revenue</div><div className="cs">৳ actual order value</div></div><div className="cv h180"><canvas id="c-a-rev"></canvas></div></div>
      <div className="card"><div className="ch"><div className="ct">Revenue by dealer</div><div className="cs">% share of ৳2,37,02,478</div></div>
        <div style={{padding:"14px 16px"}}><div className="leg" style={{gap:"10px"}}>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#0F172A"}}></div><div className="ln">965 — Tasneem</div></div><div><span className="lv">৳1.30 Cr</span><span className="lp">54.8%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#64748B"}}></div><div className="ln">971 — Shaon</div></div><div><span className="lv">৳37.25L</span><span className="lp">15.7%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#94A3B8"}}></div><div className="ln">966 — Nishikant</div></div><div><span className="lv">৳17.22L</span><span className="lp">7.3%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#CBD5E1"}}></div><div className="ln">967 — Sufia</div></div><div><span className="lv">৳13.05L</span><span className="lp">5.5%</span></div></div>
          <div className="li"><div className="ll"><div className="lsq" style={{background:"#E2E8F0"}}></div><div className="ln">Others (10 dealers)</div></div><div><span className="lv">৳38.9L</span><span className="lp">16.4%</span></div></div>
        </div></div>
      </div>
    </div>
  </div>
  <div style={{ display: a === 'vol' ? 'block' : 'none' }} className={a==='vol'?'fade':''}><div className="card mb"><div className="ch"><div className="ct">Monthly volume — stacked by product</div><div className="cs">kg · Sep 2022 – Oct 2023</div></div><div className="cv h200"><canvas id="c-a-vol"></canvas></div></div></div>
  <div style={{ display: a === 'dlr' ? 'block' : 'none' }} className={a==='dlr'?'fade':''}>
    <div className="card mb"><div className="ch"><div className="ct">Dealer performance ranking</div><div className="cs">By total order value</div></div>
      <table className="tbl"><thead><tr><th>Dealer</th><th>Code</th><th>Orders</th><th>Revenue</th><th>kg</th><th>Paid</th><th>Share</th><th>Balance</th></tr></thead>
      <tbody id="a-dlr-body"></tbody></table>
    </div>
  </div>
  <div style={{ display: a === 'prd' ? 'block' : 'none' }} className={a==='prd'?'fade':''}>
    <div className="g2">
      <div className="card"><div className="ch"><div className="ct">Product volume</div><div className="cs">kg total by category</div></div><div className="cv h180"><canvas id="c-a-prd"></canvas></div></div>
      <div className="card"><div className="ch"><div className="ct">Monthly chili vs turmeric</div><div className="cs">Top 2 products by volume</div></div><div className="cv h180"><canvas id="c-a-ct"></canvas></div></div>
    </div>
  </div>
</div>

{/* ═══════════════════════════════════════ HR ═══ */}
<div className={`pg${page==='hr'?' on':''}`} id="pg-hr">
  <div className="pg-head"><div className="pg-title">HR & Payroll</div><div className="pg-sub">Managers · Sales Representatives · Commission tracking · Salary records from memo data</div></div>
  <div className="kpis k4">
    <div className="kpi k-ink"><div className="kpi-l">Staff Tracked</div><div className="kpi-v">6</div><div className="kpi-s">Managers + SRs in system</div></div>
    <div className="kpi k-g"><div className="kpi-l">Total SR Commission</div><div className="kpi-v grn">৳13,30,485</div><div className="kpi-s">Estimated @ ৳15/kg lifetime</div></div>
    <div className="kpi k-a"><div className="kpi-l">Manager Salary (Est.)</div><div className="kpi-v">৳3,20,000+</div><div className="kpi-s">Extracted from 14 months of notes</div></div>
    <div className="kpi k-b"><div className="kpi-l">Standard SR Rate</div><div className="kpi-v blu">৳15 / kg</div><div className="kpi-s">Commission per kg lifted</div></div>
  </div>
  <div className="staff-grid">
    <div className="staff-card"><div className="staff-av">SA</div><div className="staff-name">Shahin Ahmed</div><div className="staff-role">DEPOT MANAGER · 965</div><div className="staff-info">Salary: ৳20,000–৳23,000/mo<br/>Territory: Madhavpur, Habiganj<br/>Joined: Sep 2022</div></div>
    <div className="staff-card"><div className="staff-av">SD</div><div className="staff-name">Satyajit Das</div><div className="staff-role">DEPOT MANAGER · 971</div><div className="staff-info">Commission-based SR<br/>Territory: Sunamganj Sadar<br/>Joined: May 2023</div></div>
    <div className="staff-card"><div className="staff-av">SuD</div><div className="staff-name">Sumon Das</div><div className="staff-role">MANAGER · 966</div><div className="staff-info">Territory: Pagla, Sunamganj<br/>Joined: Feb 2023</div></div>
    <div className="staff-card"><div className="staff-av">ShA</div><div className="staff-name">Shipon Ahmed</div><div className="staff-role">MANAGER · 967</div><div className="staff-info">Territory: Bishwanath<br/>Joined: Feb 2023</div></div>
  </div>
  <div className="card">
    <div className="ch"><div className="ct">Salary & commission payment log</div><div className="cs">Extracted from delivery memo notes · all 14 months</div></div>
    <table className="tbl">
      <thead><tr><th>Memo</th><th>Date</th><th>Type</th><th>Recipient</th><th>Amount ৳</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td className="m">10003</td><td>16 Oct 2022</td><td><span className="pill p-blu">SR Salary</span></td><td>SR — Depot 965</td><td className="m">৳5,200</td><td className="nc">SR salary — Oct 2022</td></tr>
        <tr><td className="m">10003</td><td>16 Oct 2022</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Ajay — Manager</td><td className="m">৳10,000</td><td className="nc">Manager salary Oct 2022</td></tr>
        <tr><td className="m">10005</td><td>15 Nov 2022</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Ajay — Manager</td><td className="m">৳20,000</td><td className="nc">Manager salary Nov 2022</td></tr>
        <tr><td className="m">10009</td><td>09 Dec 2022</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Ajay — Manager</td><td className="m">৳12,000</td><td className="nc">Manager salary Dec 2022</td></tr>
        <tr><td className="m">10013</td><td>17 Jan 2023</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Manager — 965</td><td className="m">৳13,000</td><td className="nc">Jan 2023 salary + transport ৳3,200</td></tr>
        <tr><td className="m">10018</td><td>16 Feb 2023</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Manager — 965</td><td className="m">৳15,000</td><td className="nc">Feb 2023 + SR commission Jan ৳14,775</td></tr>
        <tr><td className="m">10024</td><td>09 Apr 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 965</td><td className="m">৳33,450</td><td className="nc">2,230 kg × ৳15 = ৳33,450</td></tr>
        <tr><td className="m">10027</td><td>11 May 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 965</td><td className="m">৳27,750</td><td className="nc">1,850 kg × ৳15 · Apr salary ৳23,000</td></tr>
        <tr><td className="m">10057</td><td>May 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 971</td><td className="m">৳49,000</td><td className="nc">May: 3,900 kg × ৳15 = ৳58,500 − ৳9,500</td></tr>
        <tr><td className="m">10071</td><td>13 Jul 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 965</td><td className="m">৳1,14,750</td><td className="nc">Cumulative commission settlement</td></tr>
        <tr><td className="m">10079</td><td>03 Aug 2023</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Manager — 965</td><td className="m">৳20,000</td><td className="nc">July 2023 manager salary</td></tr>
        <tr><td className="m">10091</td><td>31 Aug 2023</td><td><span className="pill p-gray">Mgr Salary</span></td><td>Shahin Ahmed</td><td className="m">৳22,000</td><td className="nc">Aug 2023 manager + bank charge ৳1,200</td></tr>
        <tr><td className="m">10091</td><td>31 Aug 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 965</td><td className="m">৳2,16,825</td><td className="nc">14,455 kg × ৳15 = ৳2,16,825 Aug month</td></tr>
        <tr><td className="m">10102</td><td>04 Oct 2023</td><td><span className="pill p-blu">SR Commission</span></td><td>SR — Depot 965</td><td className="m">৳1,60,485</td><td className="nc">10,699 kg × ৳15 = ৳1,60,485 Sep month</td></tr>
      </tbody>
    </table>
  </div>
</div>

</div>{/* /main */}
</div>{/* /body */}
</div>{/* /app */}
    </div>
  );
}

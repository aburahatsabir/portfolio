// Build script - writes ErpDemo.tsx properly using actual newlines
const fs = require('fs');

let jsx = fs.readFileSync('dev-jsx-out.txt', 'utf-8');
let style = fs.readFileSync('dev-css-out.txt', 'utf-8');

// Fix the JSX
jsx = jsx.replace(/data-p="([a-z]+)" data-s="([^"]+)"/g, 'data-p="$1" data-s="$2" onClick={() => nav(\'$1\', \'$2\')} className={"sb-item " + (page === \'$1\' ? "on" : "")}');
jsx = jsx.replace(/<div className="sb-item on"/g, '<div className="sb-item"');
jsx = jsx.replace(/<span className="tb-bc" id="tb-sec">Core<\/span>/g, '<span className="tb-bc" id="tb-sec">{sec}</span>');
jsx = jsx.replace(/<span className="tb-cur" id="tb-pg">Dashboard<\/span>/g, '<span className="tb-cur" id="tb-pg">{page.charAt(0).toUpperCase() + page.slice(1)}</span>');
jsx = jsx.replace(/class="/g, 'className="');
jsx = jsx.replace(/switchA\(this,'([^']+)'\)/g, 'setA(\'$1\')');
jsx = jsx.replace(/<button className="atab on"/g, '<button className="atab"');
jsx = jsx.replace(/setA\('rev'\)/g, 'setA(\'rev\')} className={"atab " + (a === \'rev\' ? "on" : "")');
jsx = jsx.replace(/setA\('vol'\)/g, 'setA(\'vol\')} className={"atab " + (a === \'vol\' ? "on" : "")');
jsx = jsx.replace(/setA\('dlr'\)/g, 'setA(\'dlr\')} className={"atab " + (a === \'dlr\' ? "on" : "")');
jsx = jsx.replace(/setA\('prd'\)/g, 'setA(\'prd\')} className={"atab " + (a === \'prd\' ? "on" : "")');
jsx = jsx.replace(/id="a-rev"/, 'id="a-rev" style={{ display: a === \'rev\' ? \'block\' : \'none\' }}');
jsx = jsx.replace(/id="a-vol" style=\{\{display:'none'\}\}/, 'id="a-vol" style={{ display: a === \'vol\' ? \'block\' : \'none\' }}');
jsx = jsx.replace(/id="a-dlr" style=\{\{display:'none'\}\}/, 'id="a-dlr" style={{ display: a === \'dlr\' ? \'block\' : \'none\' }}');
jsx = jsx.replace(/id="a-prd" style=\{\{display:'none'\}\}/, 'id="a-prd" style={{ display: a === \'prd\' ? \'block\' : \'none\' }}');

// React dynamic mappings
jsx = jsx.replace(/<tbody id="dash-dealers"><\/tbody>/, `<tbody>
            {Object.entries(DEALERS).sort((a, b) => b[1].rev - a[1].rev).map(([code, d]) => (
              <tr key={code} style={{cursor:'pointer'}} onClick={() => nav('ledger', 'Finance', code)}>
                <td style={{fontWeight:400, color:'var(--ink)', fontSize:'12px'}}>{d.name}</td>
                <td className="m" style={{fontSize:'10px', color:'var(--ink4)'}}>{code}</td>
                <td className="m">{d.orders}</td>
                <td className="m">\u09f3{(d.rev/100000).toFixed(2)}L</td>
                <td className="m">{d.kg.toLocaleString()}</td>
                <td style={{fontSize:'10px', color:'var(--ink4)'}}>{d.first.split(' ').slice(1).join(' ')} \u2192 {d.last.split(' ').slice(1).join(' ')}</td>
                <td>{d.due > 0 ? <span className="pill p-over">\u09f3{d.due.toLocaleString()}</span> : d.adv > 0 ? <span className="pill p-adv">+\u09f3{d.adv.toLocaleString()}</span> : <span className="pill p-ok">Cleared</span>}</td>
              </tr>
            ))}
          </tbody>`);

jsx = jsx.replace(/<div id="activity-feed"><\/div>/, `<div>
          {ACTIVITY_ITEMS.map((i, idx) => (
            <div key={idx} className="af-item">
              <div className={'af-icon ' + i.t}>{i.t === 'ord' ? '\u2191' : i.t === 'pay' ? '\u09f3' : '\u21b5'}</div>
              <div className="af-body"><div className="af-t">{i.title}</div><div className="af-m">{i.meta}</div></div>
              <div className={'af-amt ' + i.cls}>{i.amt}</div>
            </div>
          ))}
        </div>`);

jsx = jsx.replace(/<tbody id="full-dealers"><\/tbody>/, `<tbody>
          {Object.entries(DEALERS).sort((a,b)=>b[1].rev-a[1].rev).map(([code,d])=> (
            <tr key={code} style={{cursor:'pointer'}} onClick={() => nav('ledger', 'Finance', code)}>
              <td style={{fontWeight:400, color:'var(--ink)'}}>{d.name}</td>
              <td className="m" style={{fontSize:'10px', color:'var(--ink4)'}}>{code}</td>
              <td>{d.mgr}</td>
              <td style={{fontSize:'10px', color:'var(--ink3)'}}>{d.addr}</td>
              <td style={{fontSize:'10px', color:'var(--ink4)'}}>{d.mobile||'\u2014'}</td>
              <td className="m">{d.orders}</td>
              <td className="m">\u09f3{Math.round(d.rev).toLocaleString()}</td>
              <td className="m" style={{color:'var(--gdk)'}}>\u09f3{Math.round(d.paid).toLocaleString()}</td>
              <td className="m">{d.kg.toLocaleString()}</td>
              <td><div className="bc" style={{minWidth:'60px'}}><div className="bf" style={{width: Math.min(100, Math.round(d.rev/12981196*100)) + '%'}}></div></div></td>
              <td>{d.due>0?<span className="pill p-over">\u09f3{d.due.toLocaleString()} due</span>:d.adv>0?<span className="pill p-adv">+\u09f3{d.adv.toLocaleString()} adv</span>:<span className="pill p-ok">Cleared</span>}</td>
            </tr>
          ))}
        </tbody>`);

jsx = jsx.replace(/<div className="prod-grid" id="prod-catalog"><\/div>/, `<div className="prod-grid">
          {SKUS.map((p, idx) => (
            <div key={idx} className="prod-card">
              <div className="prod-name">{p.name}</div>
              <div className="prod-code">{p.code} \u00b7 DOHA BRAND</div>
              <div className="prod-bar"><div className="prod-fill" style={{width: Math.min(100,p.kg/45785*100)+'%', background: p.color}}></div></div>
              <div className="prod-stats"><div className="prod-kg">{p.kg.toLocaleString()} kg</div><div className="prod-pct">{p.pct}%</div></div>
              <div className="prod-sizes">{p.sizes.map((sz,i) => <span key={i} className="sz">{sz} \u00b7 \u09f3{p.rates[i]}</span>)}</div>
            </div>
          ))}
        </div>`);

jsx = jsx.replace(/<tbody id="pay-body"><\/tbody>/, `<tbody>
          {Object.values(DEALERS).flatMap((d) => d.rows.map((r) => ({...r, dlr: d.name}))).filter(r=>r.p>0).sort((a,b)=>b.p-a.p).slice(0,20).map((r, i) => (
             <tr key={i}>
                <td className="m" style={{fontSize: '10px'}}>{r.s}</td>
                <td style={{fontSize: '10px', whiteSpace: 'nowrap'}}>{r.d}</td>
                <td style={{fontSize: '11px'}}>{r.dlr}</td>
                <td className="m" style={{color: 'var(--bm)'}}>{r.bank > 0 ? '\u09f3'+r.bank.toLocaleString() : '\u2014'}</td>
                <td className="m">{(r.p - r.bank) > 0 ? '\u09f3'+(r.p - r.bank).toLocaleString() : '\u2014'}</td>
                <td className="m" style={{fontWeight: 500, color: 'var(--gdk)'}}>\u09f3{r.p.toLocaleString()}</td>
                <td style={{fontSize: '10px', color: 'var(--ink4)'}}>{r.n || '\u2014'}</td>
             </tr>
          ))}
        </tbody>`);

jsx = jsx.replace(/<tbody id="comm-body"><\/tbody>/, `<tbody>
          {COMMISSIONS.map((c, i) => (
            <tr key={i}>
              <td className="m" style={{fontSize: '10px'}}>{c.s}</td>
              <td style={{fontSize: '10px', whiteSpace: 'nowrap'}}>{c.d}</td>
              <td style={{fontSize: '11px'}}>{c.dlr}</td>
              <td className="m" style={{fontSize: '10px'}}>{c.kg !== '\u2014' ? c.kg+' kg \u00d7 \u09f3'+c.rate : 'Lump sum'}</td>
              <td className="m" style={{fontWeight: 500, color: 'var(--ink)'}}>\u09f3{c.amt.toLocaleString()}</td>
              <td style={{fontSize: '10px', color: 'var(--ink4)'}}>{c.n}</td>
            </tr>
          ))}
        </tbody>`);

jsx = jsx.replace(/<div id="dmg-tl"><\/div>/, `<div id="dmg-tl">
      {DAMAGE_EVENTS.map((e, i) => (
         <div key={i} className="tl-item">
            <div className="tl-dot" style={{background: e.type==='Damage'?'var(--rm)':'var(--am)'}}></div>
            <div className="tl-body">
              <div className="tl-t">{e.dlr} \u2014 {e.prod}</div>
              <div className="tl-m">{e.d} \u00b7 Memo {e.s}</div>
              <div className="tl-n">{e.detail}</div>
              <div className="tl-tags">
                <span className={"pill " + (e.type==='Pending'?'p-due':'p-over')}>{e.type}</span>
                <span className="pill p-gray">{e.res}</span>
              </div>
            </div>
         </div>
      ))}
    </div>`);

jsx = jsx.replace(/<tbody id="ldg-body"><\/tbody>/, `<tbody>
          {(DEALERS[ledgerDlr]?.rows||[]).map((r, i) => (
            <tr key={i}>
              <td className="m" style={{fontSize:'10px'}}>{r.s}</td>
              <td style={{fontSize:'10px', whiteSpace:'nowrap'}}>{r.d}</td>
              <td className="m">\u09f3{r.v.toLocaleString()}</td>
              <td className="m" style={{color:r.prev>0?'var(--rm)':'var(--ink3)'}}>\u09f3{r.prev.toLocaleString()}</td>
              <td className="m" style={{fontWeight:500}}>\u09f3{r.grand.toLocaleString()}</td>
              <td className="m" style={{color:'var(--gdk)'}}>\u09f3{r.p.toLocaleString()}</td>
              <td className="m" style={{color:r.du>0?'var(--rm)':'var(--gm)'}}>{r.du>0?'\u09f3'+r.du.toLocaleString():r.adv>0?'+\u09f3'+r.adv.toLocaleString():'Cleared'}</td>
              <td className="m" style={{color:r.adv>0?'var(--gdk)':'var(--ink4)'}}>{r.adv>0?'+\u09f3'+r.adv.toLocaleString():'\u2014'}</td>
              <td className="m" style={{color:'var(--bm)'}}>{r.bank>0?'\u09f3'+r.bank.toLocaleString():'\u2014'}</td>
              <td className="m">{r.kg}</td>
              <td className="nc">{r.n||'\u2014'}</td>
            </tr>
          ))}
        </tbody>`);

jsx = jsx.replace(/<div className="ldg-summary" id="ldg-summary"><\/div>/, `<div className="ldg-summary" id="ldg-summary">
    {DEALERS[ledgerDlr] && (
      <>
        <div className="ls"><div className="ls-l">Total Orders</div><div className="ls-v">{DEALERS[ledgerDlr].orders}</div></div>
        <div className="ls"><div className="ls-l">Total Revenue</div><div className="ls-v">\u09f3{Math.round(DEALERS[ledgerDlr].rev).toLocaleString()}</div></div>
        <div className="ls"><div className="ls-l">Total Paid</div><div className="ls-v grn">\u09f3{Math.round(DEALERS[ledgerDlr].paid).toLocaleString()}</div></div>
        <div className="ls"><div className="ls-l">Balance</div><div className={"ls-v " + (DEALERS[ledgerDlr].due>0?'red':DEALERS[ledgerDlr].adv>0?'grn':'blu')}>{DEALERS[ledgerDlr].due>0?'\u09f3'+DEALERS[ledgerDlr].due.toLocaleString()+' due':DEALERS[ledgerDlr].adv>0?'+\u09f3'+DEALERS[ledgerDlr].adv.toLocaleString()+' adv':'Cleared'}</div></div>
      </>
    )}
  </div>`);

jsx = jsx.replace(/<select id="ldg-sel" onChange=\{[^}]+\}[^>]*>/, '<select id="ldg-sel" value={ledgerDlr} onChange={(e) => setLedgerDlr(e.target.value)} style={{maxWidth:"420px"}}>');

jsx = jsx.replace(/<tbody id="a-dlr-body"><\/tbody>/, `<tbody>
          {Object.entries(DEALERS).sort((a,b)=>b[1].rev-a[1].rev).map(([code,d])=> (
            <tr key={code} onClick={() => nav('ledger','Finance',code)} style={{cursor:'pointer'}}>
              <td>{d.name}</td>
              <td className="m">{code}</td>
              <td className="m">{d.orders}</td>
              <td className="m">\u09f3{Math.round(d.rev).toLocaleString()}</td>
              <td className="m">{d.kg.toLocaleString()}</td>
              <td className="m" style={{color:'var(--gdk)'}}>\u09f3{Math.round(d.paid).toLocaleString()}</td>
              <td className="m"><div className="bc"><div className="bf" style={{width:Math.min(100,Math.round(d.rev/12981196*100))+'%'}}></div></div></td>
              <td>{d.due>0?<span className="pill p-over">\u09f3{d.due.toLocaleString()}</span>:d.adv>0?<span className="pill p-adv">+\u09f3{d.adv.toLocaleString()}</span>:<span className="pill p-ok">Cleared</span>}</td>
            </tr>
          ))}
        </tbody>`);

jsx = jsx.replace(/<div id="inv-sku-cards"><\/div>/, `<div id="inv-sku-cards">
          {SKUS.map((p,idx) => (
            <div key={idx} className="mstat" style={{marginBottom:'6px'}}>
              <div className="mstat-l">{p.code} \u00b7 {p.name}</div>
              <div className="mstat-v">{p.kg.toLocaleString()} kg</div>
              <div className="bc" style={{marginTop:'5px'}}><div className="bf" style={{width:Math.min(100,p.kg/45785*100)+'%',background:p.color}}></div></div>
            </div>
          ))}
        </div>`);

jsx = jsx.replace(/<div id="ret-tl"><\/div>/, `<div className="stbl" style={{maxHeight:'300px'}} id="ret-tl">
          {RETURNS.slice().reverse().map((r,i) => (
            <div key={i} className="tl-item">
              <div className="tl-dot" style={{background:r.st==='settled'?'var(--gm)':'var(--am)'}}></div>
              <div className="tl-body">
                <div className="tl-t">{r.dlr} \u2014 {r.type}</div>
                <div className="tl-m">{r.d} \u00b7 Memo {r.s} \u00b7 {r.prod}</div>
                <div className="tl-n">{r.n}</div>
                <div className="tl-tags">
                  <span className={"pill " + (r.st==='settled'?'p-ok':'p-due')}>{r.st}</span>
                  <span className="pill p-gray">{r.qty}</span>
                  <span className="pill p-gray">{r.val}</span>
                </div>
              </div>
            </div>
          ))}
        </div>`);

jsx = jsx.replace(/<tbody id="ret-body"><\/tbody>/, `<tbody>
          {RETURNS.map((r, i) => (
            <tr key={i}>
              <td className="m" style={{fontSize:'10px'}}>{r.s}</td>
              <td style={{fontSize:'10px', whiteSpace:'nowrap'}}>{r.d}</td>
              <td style={{fontSize:'11px'}}>{r.dlr}</td>
              <td><span className="pill p-gray">{r.type}</span></td>
              <td style={{fontSize:'10px'}}>{r.prod}</td>
              <td className="m" style={{fontSize:'10px'}}>{r.qty}</td>
              <td className="m" style={{fontSize:'10px'}}>{r.val}</td>
              <td><span className={"pill " + (r.st==='settled'?'p-ok':'p-due')}>{r.st}</span></td>
              <td className="nc">{r.n}</td>
            </tr>
          ))}
        </tbody>`);

// Also fix dispatch body
jsx = jsx.replace(/<tbody id="disp-body"><\/tbody>/, `<tbody>
          {DISPATCH.map((d, i) => (
            <tr key={i}>
              <td className="m" style={{fontSize:'10px'}}>{d.s}</td>
              <td style={{fontSize:'10px', whiteSpace:'nowrap'}}>{d.d}</td>
              <td style={{fontSize:'11px'}}>{d.dlr}</td>
              <td className="m" style={{fontSize:'10px'}}>{d.code}</td>
              <td className="m">{d.ch||'\u2014'}</td>
              <td className="m">{d.tu||'\u2014'}</td>
              <td className="m">{d.co||'\u2014'}</td>
              <td className="m">{d.te||'\u2014'}</td>
              <td className="m" style={{fontWeight:500}}>{d.tot.toLocaleString()}</td>
              <td className="m">\u09f3{d.val.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>`);

// Now build the full file using actual newlines (no JS template literals)
const header = [
  '// @ts-nocheck',
  "import React, { useState, useEffect, useRef } from 'react';",
  "import Chart from 'chart.js/auto';",
  "import { MK, MR, MP, MCH, MTU, MCO, MTE, DEALERS, DISPATCH, RETURNS, COMMISSIONS, SKUS, ACTIVITY_ITEMS, DAMAGE_EVENTS } from './erp/ErpData';",
  '',
  'export default function ErpDemo() {',
  "  const [page, setPage] = useState('dashboard');",
  "  const [sec, setSec] = useState('Core');",
  "  const [a, setA] = useState('rev');",
  "  const [ledgerDlr, setLedgerDlr] = useState('965');",
  '  const chartsRef = useRef({});',
  '',
  '  const nav = (newPage, newSec, meta) => {',
  '    setPage(newPage);',
  '    if(newSec) setSec(newSec);',
  "    if(meta && newPage === 'ledger') setLedgerDlr(meta);",
  '  };',
  '',
  '  useEffect(() => {',
  "    const CD={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:'#FFFFFF',borderColor:'#E2E8F0',borderWidth:1,titleColor:'#64748B',bodyColor:'#0F172A',titleFont:{family:'JetBrains Mono',size:10},bodyFont:{family:'JetBrains Mono',size:11}}}};",
  "    const SC={x:{grid:{display:false},ticks:{color:'#CBD5E1',font:{family:'JetBrains Mono',size:9},maxRotation:45},border:{display:false}},y:{grid:{color:'#F1F5F9'},ticks:{color:'#CBD5E1',font:{family:'JetBrains Mono',size:9}},border:{display:false}}};",
  '    setTimeout(() => {',
  "      ['c-dual','c-donut','c-dues','c-pay','c-comm','c-inv-stk','c-ret','c-a-rev','c-a-vol','c-a-prd','c-a-ct'].forEach(id => {",
  '        const c = document.getElementById(id);',
  '        if(!c) return;',
  '        if(chartsRef.current[id]) chartsRef.current[id].destroy();',
  "        if (id === 'c-dual') {",
  "          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[",
  "            {label:'Order Value',data:MR.map(v=>Math.round(v/1000)),backgroundColor:MK.map((_,i)=>i>=11?'#0F172A':'#E2E8F0'),borderRadius:2,borderSkipped:false},",
  "            {label:'Payments',data:MP.map(v=>Math.round(v/1000)),backgroundColor:MK.map((_,i)=>i>=11?'#059669':'rgba(45,148,96,.3)'),borderRadius:2,borderSkipped:false},",
  "          ]},options:{...CD,scales:{...SC,x:{...SC.x},y:{...SC.y,ticks:{...SC.y.ticks,callback:v=>'\u09f3'+v+'k'}}},plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{font:{family:'JetBrains Mono',size:9},color:'#64748B',boxWidth:8,padding:10}},tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>' '+x.dataset.label+': \u09f3'+x.raw+'k'}}}}});",
  '        }',
  "        else if (id === 'c-donut') {",
  "          chartsRef.current[id]=new Chart(c,{type:'doughnut',data:{labels:['Chili','Turmeric','Coriander','Others'],datasets:[{data:[45785,24821,16454,1639],backgroundColor:['#0F172A','#64748B','#94A3B8','#E2E8F0'],borderWidth:0}]},options:{...CD,cutout:'70%'}});",
  '        }',
  "        else if (id === 'c-a-vol' || id === 'c-inv-stk') {",
  "          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[",
  "            {label:'Chili',data:MCH,backgroundColor:'#0F172A',stack:'s',borderRadius:0},",
  "            {label:'Turmeric',data:MTU,backgroundColor:'#64748B',stack:'s',borderRadius:0},",
  "            {label:'Coriander',data:MCO,backgroundColor:'#94A3B8',stack:'s',borderRadius:0},",
  "            {label:'Tea',data:MTE,backgroundColor:'#E2E8F0',stack:'s',borderRadius:0},",
  "          ]},options:{...CD,scales:SC,plugins:{...CD.plugins,legend:{display:true,position:'top',labels:{font:{family:'JetBrains Mono',size:9},color:'#64748B',boxWidth:8,padding:8}}}}});",
  '        }',
  "        else if(id==='c-dues'){",
  '          const vals=[461860,327260,290960,213360,83660,84060,74939,9750];',
  "          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:['977','974','975','976','972','973','971','970 (N/A)'],datasets:[{data:vals,backgroundColor:vals.map((v,i)=>i<3?'#DC2626':i<5?'#D97706':'#CBD5E1'),borderRadius:2}]},options:{...CD,indexAxis:'y',scales:{x:{...SC.x,grid:{color:'#F1F5F9'},ticks:{...SC.x.ticks,maxRotation:0,callback:v=>'\u09f3'+Math.round(v/1000)+'k'}},y:{...SC.y,grid:{display:false}}}}});",
  '        }',
  "        else if(id==='c-pay' || id==='c-a-rev'){",
  "          const dts = id==='c-pay'?MP:MR;",
  "          const bg = id==='c-pay'?MK.map((_,i)=>i>=11?'#059669':'rgba(45,148,96,.35)'):MK.map((_,i)=>i>=11?'#0F172A':'#E2E8F0');",
  "          chartsRef.current[id]=new Chart(c,{type:'bar',data:{labels:MK,datasets:[{data:dts.map(v=>Math.round(v/1000)),backgroundColor:bg,borderRadius:2}]},options:{...CD,scales:SC,plugins:{...CD.plugins,tooltip:{...CD.plugins.tooltip,callbacks:{label:x=>'\u09f3'+x.raw+'k'}}}}});",
  '        }',
  '      });',
  '    }, 100);',
  '    return () => { Object.values(chartsRef.current).forEach(ch => ch && ch.destroy()); };',
  '  }, [page, a]);',
  '',
].join('\n');

const footer = [
  '',
  '    </div>',
  '  );',
  '}',
  '',
].join('\n');

// The extracted JSX already starts with <div class="erp-embed" ...>
// We just need to inject the <style> tag at the beginning of it
// Replace the outer div opening to inject style
jsx = jsx.replace(
  /^<div className="erp-embed"[^>]*>/,
  '<div className="erp-embed" style={{height:\'720px\', overflow:\'hidden\', borderRadius:\'0 0 12px 12px\', textAlign:\'left\'}}>\n      <style dangerouslySetInnerHTML={{ __html: css }} />'
);

const fullFile = header + '  const css = ' + JSON.stringify(style) + ';\n\n  return (\n' + jsx + '\n  );\n}\n';
fs.writeFileSync('components/ErpDemo.tsx', fullFile);
console.log('Build 3 complete!');


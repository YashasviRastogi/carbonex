// ════════════════════════════════════════
// SIMULATOR  →  app/simulator/page.tsx
// ════════════════════════════════════════
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Globe, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Navigation from '@/components/Navigation';

interface CarbonData { total:number; transportation:number; electricity:number; food:number; flights:number; grade:string; }

const gradeFor = (t:number) => t<=2?'A':t<=5?'B':t<=8?'C':t<=12?'D':'E';
const gradeColor = (g:string) => ({A:'#10b981',B:'#3b82f6',C:'#fbbf24',D:'#ff6b35',E:'#ec4899'}[g]??'#6b7280');

export default function SimulatorPage() {
  const [cd, setCd] = useState<CarbonData|null>(null);
  const [red, setRed] = useState({ transport:0, electricity:0, food:0, flights:0 });

  useEffect(()=>{ const s=localStorage.getItem('carbonData'); setCd(s?JSON.parse(s):{ total:6.6, transportation:2.8, electricity:1.5, food:1.8, flights:0.5, grade:'C' }); },[]);

  const base = useMemo(()=>({ transport:cd?.transportation??2.8, electricity:cd?.electricity??1.5, food:cd?.food??1.8, flights:cd?.flights??0.5 }),[cd]);
  const newTotal = useMemo(()=> base.transport*(1-red.transport/100)+base.electricity*(1-red.electricity/100)+base.food*(1-red.food/100)+base.flights*(1-red.flights/100),[base,red]);
  const orig = cd?.total??6.6;
  const saved = orig-newTotal;
  const ng = gradeFor(newTotal); const gc = gradeColor(ng);
  const origGrade = cd?.grade??'C'; const ogc = gradeColor(origGrade);

  const chart = useMemo(()=>Array.from({length:11},(_,i)=>({ year:2026+i, 'Current Path':parseFloat((orig*Math.pow(0.98,i)).toFixed(2)), 'New Path':parseFloat((newTotal*Math.pow(0.98,i)).toFixed(2)), 'Paris Target':2.0 })),[orig,newTotal]);

  const sliders = [
    { key:'transport'   as const, label:'Car / Transport', icon:'🚗', color:'#ff6b35', shadow:'#fbbf24', val:base.transport },
    { key:'electricity' as const, label:'Electricity',     icon:'⚡', color:'#7c3aed', shadow:'#ec4899', val:base.electricity },
    { key:'food'        as const, label:'Diet / Food',     icon:'🍽️', color:'#10b981', shadow:'#3b82f6', val:base.food },
    { key:'flights'     as const, label:'Air Travel',      icon:'✈️', color:'#fbbf24', shadow:'#ff6b35', val:base.flights },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'#111111', backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px' }}>
      <Navigation />
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'48px 24px', display:'flex', flexDirection:'column', gap:'24px' }}>

        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#10b981', border:'3px solid #0a0a0a', borderRadius:'12px', padding:'6px 16px', boxShadow:'4px 4px 0px #0a0a0a', marginBottom:'16px' }}>
            <Globe size={14} color="#0a0a0a" strokeWidth={3} />
            <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.7rem', color:'#0a0a0a', letterSpacing:'0.1em' }}>FUTURE SIMULATOR</span>
          </div>
          <h1 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,7vw,5rem)', color:'#f5f0e8', letterSpacing:'-0.03em', lineHeight:0.95 }}>
            SIMULATE<br /><span style={{ color:'#10b981', WebkitTextStroke:'2px #0a0a0a', textShadow:'4px 4px 0px #0a0a0a' }}>YOUR FUTURE</span>
          </h1>
          <p style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'1rem', color:'#9ca3af', marginTop:'12px' }}>Drag the sliders. See how changes ripple across 10 years.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'20px' }}>
          {/* Sliders */}
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'28px', boxShadow:'6px 6px 0px #10b981', display:'flex', flexDirection:'column', gap:'24px' }}>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#f5f0e8', textTransform:'uppercase' }}>Adjust Lifestyle</h2>
            {sliders.map(s=>(
              <div key={s.key}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <span style={{ fontSize:'1.1rem' }}>{s.icon}</span>
                    <span style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.85rem', color:'#f5f0e8', textTransform:'uppercase' }}>{s.label}</span>
                  </div>
                  <div style={{ display:'inline-flex', alignItems:'center', background:s.color, border:'2px solid #0a0a0a', borderRadius:'8px', padding:'2px 10px', boxShadow:'2px 2px 0px #0a0a0a' }}>
                    <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.9rem', color:'#0a0a0a' }}>{red[s.key]}%</span>
                  </div>
                </div>
                <input type="range" min="0" max="100" value={red[s.key]}
                  onChange={e=>setRed(p=>({...p,[s.key]:parseInt(e.target.value)}))}
                  style={{ width:'100%', background:`linear-gradient(to right, ${s.color} ${red[s.key]}%, rgba(255,255,255,0.08) ${red[s.key]}%)`, border:'2px solid #0a0a0a' }}
                />
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', marginTop:'4px' }}>
                  <span>Now: {s.val.toFixed(2)}t</span>
                  <span>New: {(s.val*(1-red[s.key]/100)).toFixed(2)}t</span>
                  <span style={{ color:s.color }}>-{(s.val*red[s.key]/100).toFixed(2)}t</span>
                </div>
              </div>
            ))}
          </div>

          {/* Results */}
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
              <div className="clay-card" style={{ background:'#1a1a1a', padding:'22px', textAlign:'center', boxShadow:`5px 5px 0px ${ogc}` }}>
                <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', marginBottom:'6px' }}>CURRENT</div>
                <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'2.5rem', color:'#ec4899', lineHeight:1 }}>{orig.toFixed(1)}t</div>
                <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', marginTop:'4px' }}>Grade {origGrade}</div>
              </div>
              <div className="clay-card" style={{ background:gc, padding:'22px', textAlign:'center', boxShadow:'5px 5px 0px #0a0a0a' }}>
                <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#0a0a0a', opacity:0.7, marginBottom:'6px' }}>PROJECTED</div>
                <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'2.5rem', color:'#0a0a0a', lineHeight:1 }}>{newTotal.toFixed(1)}t</div>
                <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#0a0a0a', marginTop:'4px' }}>Grade {ng}</div>
              </div>
            </div>

            <div className="clay-card" style={{ background:'#ff6b35', padding:'22px', boxShadow:'5px 5px 0px #0a0a0a' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                <TrendingDown size={16} color="#0a0a0a" strokeWidth={3} />
                <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7 }}>CO₂ SAVED PER YEAR</span>
              </div>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'3.5rem', color:'#0a0a0a', lineHeight:1 }}>{saved.toFixed(2)}t</div>
              <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7, marginTop:'6px' }}>≈ {Math.round(saved*40)} trees planted</div>
            </div>

            {/* Benchmarks */}
            <div className="clay-card" style={{ background:'#1a1a1a', padding:'22px', boxShadow:'5px 5px 0px #3b82f6' }}>
              <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.85rem', color:'#f5f0e8', textTransform:'uppercase', marginBottom:'16px' }}>Benchmarks</h3>
              {[{label:'Paris Target',val:2.0,color:'#10b981'},{label:'Global Avg',val:4.7,color:'#fbbf24'},{label:'Your New Total',val:newTotal,color:gc}].map(b=>(
                <div key={b.label} style={{ marginBottom:'12px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'Space Grotesk, sans-serif', fontSize:'0.82rem', marginBottom:'5px' }}>
                    <span style={{ color:'#9ca3af' }}>{b.label}</span>
                    <span style={{ color:b.color, fontWeight:700 }}>{b.val.toFixed(1)}t</span>
                  </div>
                  <div className="clay-progress">
                    <div className="clay-progress-fill" style={{ width:`${Math.min((b.val/10)*100,100)}%`, background:b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="clay-card" style={{ background:'#1a1a2e', padding:'28px', boxShadow:'6px 6px 0px #3b82f6' }}>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#f5f0e8', textTransform:'uppercase', marginBottom:'20px' }}>10-Year Trajectory</h2>
          <div style={{ width:'100%', height:'280px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" stroke="#6b7280" tick={{ fontFamily:'DM Mono, monospace', fontSize:10, fill:'#6b7280' }} />
                <YAxis stroke="#6b7280" tick={{ fontFamily:'DM Mono, monospace', fontSize:10, fill:'#6b7280' }} unit="t" />
                <Tooltip contentStyle={{ background:'#0a0a0a', border:'3px solid #0a0a0a', borderRadius:'12px', fontFamily:'DM Mono, monospace', fontSize:'11px', boxShadow:'4px 4px 0px #ff6b35' }} labelStyle={{ color:'#ff6b35' }} />
                <Legend wrapperStyle={{ fontFamily:'DM Mono, monospace', fontSize:'11px' }} />
                <Line type="monotone" dataKey="Current Path" stroke="#ec4899" strokeWidth={2.5} dot={false} strokeDasharray="6 3" />
                <Line type="monotone" dataKey="New Path" stroke="#ff6b35" strokeWidth={3} dot={{ fill:'#ff6b35', r:4, stroke:'#0a0a0a', strokeWidth:2 }} />
                <Line type="monotone" dataKey="Paris Target" stroke="rgba(107,114,128,0.4)" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
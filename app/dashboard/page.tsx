// ═══════════════════════════════════════════
// DASHBOARD  →  app/dashboard/page.tsx
// ═══════════════════════════════════════════
'use client';

import { useState, useEffect, useMemo } from 'react';
import { TrendingDown, Award, Zap, Car, Utensils, Plane, Lightbulb, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navigation from '@/components/Navigation';
import CarbonAvatar from '@/components/CarbonAvatar';

export default function Dashboard() {
  const [data, setData] = useState({ total:6.6, transportation:2.8, electricity:1.5, food:1.8, flights:0.5, score:72, grade:'B' as 'A'|'B'|'C'|'D'|'E'|'F' });

  useEffect(() => {
    const saved = localStorage.getItem('carbonData');
    if (saved) { const d = JSON.parse(saved); setData({ total:d.total??6.6, transportation:d.transportation??2.8, electricity:d.electricity??1.5, food:d.food??1.8, flights:d.flights??0.5, score:d.score??72, grade:d.grade??'B' }); }
  }, []);

  const breakdown = [
    { name:'Transport',   value:data.transportation, pct:Math.round((data.transportation/data.total)*100), color:'#ff6b35', shadow:'#fbbf24' },
    { name:'Electricity', value:data.electricity,    pct:Math.round((data.electricity/data.total)*100),    color:'#7c3aed', shadow:'#ec4899' },
    { name:'Food',        value:data.food,           pct:Math.round((data.food/data.total)*100),           color:'#10b981', shadow:'#3b82f6' },
    { name:'Flights',     value:data.flights,        pct:Math.round((data.flights/data.total)*100),        color:'#fbbf24', shadow:'#ff6b35' },
  ];

  const trend = useMemo(() => {
    const base = data.total/12; const target = 2/12;
    return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i) => ({ month:m, YOU:parseFloat((base*(1-i*0.015)).toFixed(3)), TARGET:parseFloat(target.toFixed(3)) }));
  }, [data.total]);

  const recs = [
    { icon:Car,      title:'Cut Transport',   desc:`Transport at ${data.transportation.toFixed(1)}t — reduce car use 20%`,  saving:`${(data.transportation*0.2).toFixed(1)}t`, color:'#ff6b35', shadow:'#fbbf24', href:'/simulator', val:data.transportation },
    { icon:Zap,      title:'Go Renewable',    desc:`Electricity at ${data.electricity.toFixed(1)}t — solar switch saves up to ${(data.electricity*0.8).toFixed(1)}t`, saving:`${(data.electricity*0.8).toFixed(1)}t`, color:'#7c3aed', shadow:'#ec4899', href:'/missions', val:data.electricity },
    { icon:Utensils, title:'Eat Plant-Based', desc:`Food at ${data.food.toFixed(1)}t — one meatless day saves ${(data.food*0.15).toFixed(1)}t/yr`, saving:`${(data.food*0.15).toFixed(1)}t`, color:'#10b981', shadow:'#3b82f6', href:'/missions', val:data.food },
    { icon:Plane,    title:'Reduce Flights',  desc:`Flights at ${data.flights.toFixed(1)}t — cut 50% saves ${(data.flights*0.5).toFixed(1)}t/yr`, saving:`${(data.flights*0.5).toFixed(1)}t`, color:'#fbbf24', shadow:'#ff6b35', href:'/simulator', val:data.flights },
  ].sort((a,b)=>b.val-a.val);

  const gradeColor = ({ A:'#10b981', B:'#3b82f6', C:'#fbbf24', D:'#ff6b35', E:'#ec4899', F:'#7c3aed' } as Record<string,string>)[data.grade] ?? '#6b7280';
  const gradeShadow = ({ A:'#3b82f6', B:'#7c3aed', C:'#ff6b35', D:'#ec4899', E:'#7c3aed', F:'#ec4899' } as Record<string,string>)[data.grade] ?? '#0a0a0a';

  return (
    <div style={{ minHeight:'100vh', background:'#111111', backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px' }}>
      <Navigation />
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'40px 24px', display:'flex', flexDirection:'column', gap:'24px' }}>

        {/* Header */}
        <div>
          <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.7rem', color:'#6b7280', letterSpacing:'0.1em', marginBottom:'8px' }}>// ENVIRONMENTAL INTELLIGENCE</div>
          <h1 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(2rem,6vw,4rem)', color:'#f5f0e8', letterSpacing:'-0.02em', lineHeight:0.95 }}>
            YOUR CARBON<br /><span style={{ color:'#ff6b35' }}>DASHBOARD</span>
          </h1>
        </div>

        {/* Top row: Avatar + 3 stat cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>

          {/* Avatar card */}
          <div className="clay-card" style={{ background:'#1a1a2e', padding:'24px', boxShadow:'6px 6px 0px #7c3aed', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280', marginBottom:'16px', textAlign:'center' }}>YOUR CARBON TWIN</div>
            <CarbonAvatar grade={data.grade} score={data.score} total={data.total} />
          </div>

          {/* Score */}
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'24px', boxShadow:'6px 6px 0px #10b981' }}>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280', marginBottom:'12px' }}>ECO SCORE</div>
            <div style={{ position:'relative', width:'120px', height:'120px', margin:'0 auto 12px' }}>
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="10"
                  strokeDasharray={`${(data.score/100)*314} 314`} strokeLinecap="round" transform="rotate(-90 60 60)"
                  style={{ filter:'drop-shadow(0 0 6px #10b981)' }} />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'2rem', color:'#f5f0e8', lineHeight:1 }}>{data.score}</span>
                <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280' }}>/100</span>
              </div>
            </div>
            <div style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.75rem', color:'#9ca3af', textAlign:'center' }}>From your calculator data</div>
          </div>

          {/* Grade */}
          <div className="clay-card" style={{ background:gradeColor, padding:'24px', boxShadow:`6px 6px 0px ${gradeShadow}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
              <Award size={14} color="#0a0a0a" strokeWidth={3} />
              <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7 }}>GRADE</span>
            </div>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'5rem', color:'#0a0a0a', lineHeight:1 }}>{data.grade}</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7, marginTop:'6px' }}>
              {data.grade==='A'?'CHAMPION':data.grade==='B'?'SUSTAINABLE':data.grade==='C'?'AVERAGE':data.grade==='D'?'NEEDS WORK':'CRITICAL'}
            </div>
          </div>

          {/* Emissions */}
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'24px', boxShadow:'6px 6px 0px #ec4899' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
              <TrendingDown size={14} color="#ec4899" strokeWidth={2.5} />
              <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280' }}>ANNUAL OUTPUT</span>
            </div>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'3rem', color:'#f5f0e8', lineHeight:1 }}>{data.total.toFixed(1)}</div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280', marginTop:'4px' }}>METRIC TONS CO₂e</div>
            <div style={{ marginTop:'14px', paddingTop:'14px', borderTop:'2px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.75rem', color: data.total<4.7?'#10b981':'#ec4899' }}>
                {data.total<4.7?'✅ Below global avg (4.7t)':'⚠️ Above global avg (4.7t)'}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'16px' }}>
          {/* Breakdown */}
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'24px', boxShadow:'6px 6px 0px #fbbf24' }}>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#f5f0e8', textTransform:'uppercase', marginBottom:'20px' }}>Breakdown</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {breakdown.map(item => (
                <div key={item.name}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                    <span style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'0.8rem', color:'#f5f0e8' }}>{item.name}</span>
                    <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
                      <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280' }}>{item.pct}%</span>
                      <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.85rem', color:item.color }}>{item.value.toFixed(2)}t</span>
                    </div>
                  </div>
                  <div className="clay-progress">
                    <div className="clay-progress-fill" style={{ width:`${item.pct}%`, background:`linear-gradient(90deg, ${item.color}, ${item.shadow})` }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:'2px solid rgba(255,255,255,0.06)', fontFamily:'Space Grotesk, sans-serif', fontSize:'0.8rem', color:'#9ca3af' }}>
              🎯 Top source: <strong style={{ color:'#fbbf24' }}>{[...breakdown].sort((a,b)=>b.value-a.value)[0].name}</strong>
            </div>
          </div>

          {/* Trend chart */}
          <div className="clay-card" style={{ background:'#1a1a2e', padding:'24px', boxShadow:'6px 6px 0px #3b82f6' }}>
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#f5f0e8', textTransform:'uppercase', marginBottom:'20px' }}>Monthly Trend</h2>
            <div style={{ width:'100%', height:'240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" stroke="#6b7280" tick={{ fontFamily:'DM Mono, monospace', fontSize:10, fill:'#6b7280' }} />
                  <YAxis stroke="#6b7280" tick={{ fontFamily:'DM Mono, monospace', fontSize:10, fill:'#6b7280' }} />
                  <Tooltip contentStyle={{ background:'#0a0a0a', border:'3px solid #0a0a0a', borderRadius:'12px', fontFamily:'DM Mono, monospace', fontSize:'11px', boxShadow:'4px 4px 0px #ff6b35' }} labelStyle={{ color:'#ff6b35' }} />
                  <Line type="monotone" dataKey="YOU" stroke="#ff6b35" strokeWidth={3} dot={{ fill:'#ff6b35', r:4, stroke:'#0a0a0a', strokeWidth:2 }} />
                  <Line type="monotone" dataKey="TARGET" stroke="rgba(107,114,128,0.4)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
            <Lightbulb size={20} color="#fbbf24" strokeWidth={2.5} />
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.3rem', color:'#f5f0e8', textTransform:'uppercase' }}>Recommended Actions</h2>
            <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#6b7280' }}>sorted by impact</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'14px' }}>
            {recs.map((rec,i) => {
              const Icon = rec.icon;
              return (
                <div key={i} className="clay-card" style={{ background:'#1a1a1a', padding:'22px', boxShadow:`6px 6px 0px ${rec.shadow}`, cursor:'pointer', transition:'transform 0.15s, box-shadow 0.15s' }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translate(-3px,-3px)';e.currentTarget.style.boxShadow=`9px 9px 0px ${rec.shadow}`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=`6px 6px 0px ${rec.shadow}`;}}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:rec.color, border:'3px solid #0a0a0a', boxShadow:'3px 3px 0px #0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}>
                    <Icon size={18} color="#0a0a0a" strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1rem', color:'#f5f0e8', marginBottom:'6px' }}>{rec.title}</h3>
                  <p style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.82rem', color:'#9ca3af', lineHeight:1.6, marginBottom:'14px' }}>{rec.desc}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'14px', borderTop:'2px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280' }}>ANNUAL SAVING</div>
                      <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:rec.color }}>{rec.saving}</div>
                    </div>
                    <a href={rec.href}>
                      <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:rec.color, border:'2px solid #0a0a0a', boxShadow:'2px 2px 0px #0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <ArrowRight size={14} color="#0a0a0a" strokeWidth={3} />
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'12px' }}>
          {[
            { label:'Annual Output',   value:`${data.total.toFixed(1)}t`, bg:'#ff6b35', shadow:'#fbbf24' },
            { label:'Trees to Offset', value:`${Math.round(data.total*45)}`,  bg:'#10b981', shadow:'#3b82f6' },
            { label:'vs Global Avg',   value:data.total<4.7?'BELOW ✅':'ABOVE ⚠️', bg:'#7c3aed', shadow:'#ec4899' },
            { label:'Your Grade',      value:data.grade, bg:'#fbbf24', shadow:'#ff6b35' },
          ].map(s=>(
            <div key={s.label} className="clay-card wobble" style={{ background:s.bg, padding:'20px', boxShadow:`5px 5px 0px ${s.shadow}`, textAlign:'center', cursor:'pointer' }}>
              <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7, marginBottom:'4px', textTransform:'uppercase' }}>{s.label}</div>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.8rem', color:'#0a0a0a', lineHeight:1 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
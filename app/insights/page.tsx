// ════════════════════════════════════════
// INSIGHTS  →  app/insights/page.tsx
// ════════════════════════════════════════
'use client';

import { useState, useEffect } from 'react';
import { Brain, RefreshCw, Leaf, Zap, Car, Utensils, Plane } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface CarbonData { total:number; transportation:number; electricity:number; food:number; flights:number; score:number; grade:string; }
interface Insight { category:string; icon:string; finding:string; action:string; impact:string; }
interface InsightsResponse { summary:string; insights:Insight[]; topPriority:string; encouragement:string; }

const catColors: Record<string,{ bg:string; shadow:string }> = {
  Transportation:{ bg:'#ff6b35', shadow:'#fbbf24' },
  Electricity:   { bg:'#7c3aed', shadow:'#ec4899' },
  Diet:          { bg:'#10b981', shadow:'#3b82f6' },
  Flights:       { bg:'#fbbf24', shadow:'#ff6b35' },
};
const catIcons: Record<string,React.ReactNode> = {
  Transportation:<Car size={16} strokeWidth={2.5} />,
  Electricity:   <Zap size={16} strokeWidth={2.5} />,
  Diet:          <Utensils size={16} strokeWidth={2.5} />,
  Flights:       <Plane size={16} strokeWidth={2.5} />,
};

export default function InsightsPage() {
  const [cd, setCd] = useState<CarbonData|null>(null);
  const [insights, setInsights] = useState<InsightsResponse|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(()=>{ const s=localStorage.getItem('carbonData'); if(s) setCd(JSON.parse(s)); },[]);

  const generate = async () => {
    if(!cd) return; setLoading(true); setError('');
    try {
      const prompt = `You are a sustainability expert AI. Analyze this carbon footprint and respond ONLY with JSON (no backticks):
Data: Total ${cd.total.toFixed(2)}t, Transport ${cd.transportation.toFixed(2)}t, Electricity ${cd.electricity.toFixed(2)}t, Food ${cd.food.toFixed(2)}t, Flights ${cd.flights.toFixed(2)}t, Grade ${cd.grade}, Score ${cd.score}/100. Global avg 4.7t, Paris target 2t.
{"summary":"2-3 sentence assessment","insights":[{"category":"Transportation","icon":"🚗","finding":"specific finding","action":"one concrete action","impact":"X tons/year"},{"category":"Electricity","icon":"⚡","finding":"...","action":"...","impact":"..."},{"category":"Diet","icon":"🍽️","finding":"...","action":"...","impact":"..."},{"category":"Flights","icon":"✈️","finding":"...","action":"...","impact":"..."}],"topPriority":"single most impactful change","encouragement":"short motivating message for grade ${cd.grade}"}`;
      const res = await fetch('https://api.anthropic.com/v1/messages',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000, messages:[{role:'user',content:prompt}] }) });
      const d = await res.json();
      const text = d.content.map((i:{type:string;text?:string})=>i.type==='text'?i.text:'').join('');
      setInsights(JSON.parse(text.replace(/```json|```/g,'').trim()));
    } catch { setError('Failed to generate insights. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background:'#111111', backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px' }}>
      <Navigation />
      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'48px 24px', display:'flex', flexDirection:'column', gap:'24px' }}>

        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#7c3aed', border:'3px solid #0a0a0a', borderRadius:'12px', padding:'6px 16px', boxShadow:'4px 4px 0px #0a0a0a', marginBottom:'16px' }}>
            <Brain size={14} color="#f5f0e8" strokeWidth={3} />
            <span style={{ fontFamily:'DM Mono, monospace', fontSize:'0.7rem', color:'#f5f0e8', letterSpacing:'0.1em' }}>NEURAL ANALYSIS</span>
          </div>
          <h1 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,7vw,4.5rem)', color:'#f5f0e8', letterSpacing:'-0.03em', lineHeight:0.95 }}>
            AI <span style={{ color:'#7c3aed', WebkitTextStroke:'2px #0a0a0a', textShadow:'4px 4px 0px #0a0a0a' }}>INSIGHTS</span>
          </h1>
        </div>

        {!cd && (
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'48px', textAlign:'center', boxShadow:'6px 6px 0px #7c3aed' }}>
            <Leaf size={40} color="#10b981" style={{ margin:'0 auto 16px', display:'block' }} />
            <h2 style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.3rem', color:'#f5f0e8', marginBottom:'8px' }}>No Data Found</h2>
            <p style={{ fontFamily:'Space Grotesk, sans-serif', color:'#9ca3af', marginBottom:'24px' }}>Run the Carbon Calculator first.</p>
            <a href="/calculator"><button className="btn-brutal btn-orange">Go to Calculator</button></a>
          </div>
        )}

        {cd && (
          <div className="clay-card" style={{ background:'#1a1a1a', padding:'24px', boxShadow:'6px 6px 0px #7c3aed' }}>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.85rem', color:'#f5f0e8', textTransform:'uppercase', marginBottom:'16px' }}>Your Profile</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px,1fr))', gap:'10px', marginBottom:'20px' }}>
              {[{l:'Total',v:`${cd.total.toFixed(1)}t`,bg:'#ff6b35'},{l:'Grade',v:cd.grade,bg:'#7c3aed'},{l:'Score',v:`${cd.score}/100`,bg:'#10b981'},{l:'vs Avg',v:cd.total<4.7?'Below✅':'Above⚠️',bg:'#fbbf24'}].map(s=>(
                <div key={s.l} className="clay-card" style={{ background:s.bg, padding:'14px', textAlign:'center', boxShadow:'3px 3px 0px #0a0a0a', borderRadius:'14px' }}>
                  <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#0a0a0a', opacity:0.7, marginBottom:'4px' }}>{s.l}</div>
                  <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.3rem', color:'#0a0a0a' }}>{s.v}</div>
                </div>
              ))}
            </div>
            <button onClick={generate} disabled={loading} className="btn-brutal btn-violet" style={{ width:'100%', justifyContent:'center', opacity:loading?0.6:1 }}>
              {loading ? <><RefreshCw size={16} style={{ animation:'spin 1s linear infinite' }} /> Analyzing...</> : <><Brain size={16} /> {insights?'Regenerate Insights':'Generate AI Insights'}</>}
            </button>
            {error && <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.75rem', color:'#ec4899', marginTop:'8px', textAlign:'center' }}>{error}</div>}
          </div>
        )}

        {insights && (
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div className="clay-card" style={{ background:'#1a1a2e', padding:'24px', boxShadow:'6px 6px 0px #7c3aed' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}><Brain size={16} color="#7c3aed" /><span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.85rem', color:'#f5f0e8', textTransform:'uppercase' }}>AI Summary</span></div>
              <p style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.95rem', color:'#d1d5db', lineHeight:1.7 }}>{insights.summary}</p>
            </div>

            <div className="clay-card" style={{ background:'#ff6b35', padding:'20px', boxShadow:'6px 6px 0px #0a0a0a' }}>
              <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.65rem', color:'#0a0a0a', opacity:0.7, marginBottom:'6px' }}>🎯 TOP PRIORITY</div>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#0a0a0a' }}>{insights.topPriority}</div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'14px' }}>
              {insights.insights.map(ins=>{
                const cs = catColors[ins.category]??{ bg:'#6b7280', shadow:'#0a0a0a' };
                return (
                  <div key={ins.category} className="clay-card" style={{ background:'#1a1a1a', padding:'22px', boxShadow:`6px 6px 0px ${cs.shadow}` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
                      <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:cs.bg, border:'3px solid #0a0a0a', boxShadow:'2px 2px 0px #0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', color:'#0a0a0a' }}>
                        {catIcons[ins.category]??ins.icon}
                      </div>
                      <span style={{ fontFamily:'Syne, sans-serif', fontWeight:800, color:'#f5f0e8' }}>{ins.category}</span>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                      <div><div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', marginBottom:'3px' }}>FINDING</div><p style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.83rem', color:'#d1d5db', lineHeight:1.6 }}>{ins.finding}</p></div>
                      <div><div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', marginBottom:'3px' }}>ACTION</div><p style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.83rem', color:'#f5f0e8', fontWeight:600, lineHeight:1.6 }}>{ins.action}</p></div>
                      <div style={{ paddingTop:'10px', borderTop:'2px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280' }}>POTENTIAL SAVING</div>
                        <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:cs.bg }}>{ins.impact}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="clay-card" style={{ background:'#10b981', padding:'24px', textAlign:'center', boxShadow:'6px 6px 0px #0a0a0a' }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'8px' }}>🌱</div>
              <p style={{ fontFamily:'Syne, sans-serif', fontWeight:700, fontSize:'1.05rem', color:'#0a0a0a' }}>{insights.encouragement}</p>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
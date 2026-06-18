// ════════════════════════════════════════
// CHATBOT  →  app/chatbot/page.tsx
// ════════════════════════════════════════
'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Leaf, RefreshCw } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Message { role:'user'|'assistant'; content:string; }
interface CarbonData { total:number; transportation:number; electricity:number; food:number; flights:number; score:number; grade:string; }

export default function ChatbotPage() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cd, setCd] = useState<CarbonData|null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const s=localStorage.getItem('carbonData'); const data=s?JSON.parse(s):null; setCd(data);
    setMsgs([{ role:'assistant', content: data
      ? `Hey! 👋 I'm your Carbon Twin AI.\n\nI can see your profile: ${data.total.toFixed(1)}t CO₂e/year, Grade ${data.grade}, Score ${data.score}/100.\n\nAsk me anything about reducing your footprint!`
      : `Hey! 👋 I'm your Carbon Twin AI.\n\nI don't see your data yet — head to the Calculator first for personalized advice!\n\nI can still answer general sustainability questions though.` }]);
  },[]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:'smooth'}); },[msgs]);

  const send = async () => {
    if(!input.trim()||loading) return;
    const userMsg:Message={role:'user',content:input};
    const newMsgs=[...msgs,userMsg]; setMsgs(newMsgs); setInput(''); setLoading(true);
    try {
      const sys = cd
        ? `You are Carbon Twin AI, a friendly sustainability assistant. User data: Total ${cd.total.toFixed(2)}t, Transport ${cd.transportation.toFixed(2)}t, Electricity ${cd.electricity.toFixed(2)}t, Food ${cd.food.toFixed(2)}t, Flights ${cd.flights.toFixed(2)}t, Grade ${cd.grade}, Score ${cd.score}/100. Global avg 4.7t, Paris target 2t. Be direct, warm, and data-driven. Max 2-3 paragraphs.`
        : `You are Carbon Twin AI, a friendly sustainability assistant. Answer general carbon and sustainability questions. Be warm and practical. Max 2-3 paragraphs.`;
      const res = await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1000,system:sys,messages:newMsgs.map(m=>({role:m.role,content:m.content}))})});
      const d=await res.json();
      const text=d.content.map((i:{type:string;text?:string})=>i.type==='text'?i.text:'').join('');
      setMsgs([...newMsgs,{role:'assistant',content:text}]);
    } catch { setMsgs([...newMsgs,{role:'assistant',content:'Oops! Something went wrong. Please try again.'}]); }
    finally { setLoading(false); }
  };

  const suggested=['What is my biggest carbon source?','How do I get to Grade A?','Best quick wins for emissions?','How do I offset my footprint?'];

  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', background:'#111111', backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'28px 28px' }}>
      <Navigation />
      <div style={{ flex:1, display:'flex', flexDirection:'column', maxWidth:'800px', width:'100%', margin:'0 auto', padding:'20px 24px', minHeight:0 }}>
        {/* Header */}
        <div className="clay-card" style={{ background:'#ec4899', padding:'16px 20px', boxShadow:'5px 5px 0px #0a0a0a', marginBottom:'16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'#0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <MessageCircle size={18} color="#ec4899" strokeWidth={2.5} />
            </div>
            <div>
              <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'0.95rem', color:'#0a0a0a' }}>Carbon Twin Chatbot</div>
              <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#0a0a0a', opacity:0.7 }}>
                {cd?`Profile: ${cd.total.toFixed(1)}t · Grade ${cd.grade}`:'General mode — no profile'}
              </div>
            </div>
          </div>
          <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#0a0a0a', animation:'blink 2s infinite' }} />
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'12px', paddingBottom:'8px', minHeight:0 }}>
          {msgs.map((msg,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:msg.role==='user'?'flex-end':'flex-start', gap:'8px', alignItems:'flex-end' }}>
              {msg.role==='assistant' && (
                <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'#ec4899', border:'2px solid #0a0a0a', boxShadow:'2px 2px 0px #0a0a0a', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Leaf size={14} color="#0a0a0a" strokeWidth={3} />
                </div>
              )}
              <div style={{
                maxWidth:'78%', padding:'14px 18px', borderRadius:'18px',
                border:'2.5px solid #0a0a0a',
                boxShadow: msg.role==='user'?'4px 4px 0px #7c3aed':'4px 4px 0px #ec4899',
                background: msg.role==='user'?'#7c3aed':'#1a1a1a',
                fontFamily:'Space Grotesk, sans-serif', fontSize:'0.9rem',
                color: msg.role==='user'?'#f5f0e8':'#d1d5db',
                lineHeight:1.65, whiteSpace:'pre-wrap',
                borderTopRightRadius: msg.role==='user'?'6px':'18px',
                borderTopLeftRadius: msg.role==='assistant'?'6px':'18px',
              }}>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display:'flex', gap:'8px', alignItems:'flex-end' }}>
              <div style={{ width:'32px', height:'32px', borderRadius:'10px', background:'#ec4899', border:'2px solid #0a0a0a', boxShadow:'2px 2px 0px #0a0a0a', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Leaf size={14} color="#0a0a0a" strokeWidth={3} />
              </div>
              <div style={{ background:'#1a1a1a', border:'2.5px solid #0a0a0a', borderRadius:'18px', borderTopLeftRadius:'6px', boxShadow:'4px 4px 0px #ec4899', padding:'14px 18px' }}>
                <RefreshCw size={16} color="#ec4899" style={{ animation:'spin 1s linear infinite' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested */}
        {msgs.length===1 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', margin:'12px 0' }}>
            {suggested.map(q=>(
              <button key={q} onClick={()=>setInput(q)} style={{ fontFamily:'Space Grotesk, sans-serif', fontSize:'0.78rem', color:'#9ca3af', background:'#1a1a1a', border:'2px solid rgba(255,255,255,0.1)', borderRadius:'20px', padding:'6px 14px', cursor:'pointer', transition:'all 0.15s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#ec4899';e.currentTarget.style.color='#ec4899';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='#9ca3af';}}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
          <textarea value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Ask about your carbon footprint..."
            rows={1}
            style={{ flex:1, fontFamily:'Space Grotesk, sans-serif', fontSize:'0.9rem', background:'#1a1a1a', border:'3px solid #0a0a0a', borderRadius:'14px', padding:'12px 16px', color:'#f5f0e8', resize:'none', outline:'none', transition:'box-shadow 0.15s', boxShadow:'none' }}
            onFocus={e=>{e.currentTarget.style.boxShadow='4px 4px 0px #ec4899';}}
            onBlur={e=>{e.currentTarget.style.boxShadow='none';}}
          />
          <button onClick={send} disabled={!input.trim()||loading}
            style={{ width:'50px', height:'50px', borderRadius:'14px', background: input.trim()?'#ec4899':'#333', border:'3px solid #0a0a0a', boxShadow:input.trim()?'4px 4px 0px #0a0a0a':'none', cursor:input.trim()?'pointer':'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s' }}>
            <Send size={18} color={input.trim()?'#0a0a0a':'#666'} strokeWidth={2.5} />
          </button>
        </div>
        <div style={{ fontFamily:'DM Mono, monospace', fontSize:'0.6rem', color:'#6b7280', textAlign:'center', marginTop:'6px' }}>Enter to send · Shift+Enter for new line</div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
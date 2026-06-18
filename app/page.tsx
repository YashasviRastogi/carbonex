'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Brain, Globe, Target, MessageCircle, TrendingDown, Leaf } from 'lucide-react';
import Navigation from '@/components/Navigation';

const features = [
  { icon: Zap,           title: 'Carbon Calculator',  desc: 'Real inputs. Real numbers. No guesswork.',              href: '/calculator', bg: '#ff6b35', shadow: '#fbbf24', tag: 'CORE' },
  { icon: Brain,         title: 'AI Insights',        desc: 'Neural analysis of your environmental signature.',       href: '/insights',   bg: '#7c3aed', shadow: '#ec4899', tag: 'AI' },
  { icon: Globe,         title: 'Future Simulator',   desc: 'Model your climate trajectory across decades.',          href: '/simulator',  bg: '#10b981', shadow: '#3b82f6', tag: 'PREDICT' },
  { icon: Target,        title: 'Eco Missions',       desc: 'Gamified ops. Earn rank. Do real good.',                 href: '/missions',   bg: '#fbbf24', shadow: '#ff6b35', tag: 'GAME' },
  { icon: MessageCircle, title: 'Carbon Chatbot',     desc: 'Ask anything. Get tactical climate intel.',              href: '/chatbot',    bg: '#ec4899', shadow: '#7c3aed', tag: 'CHAT' },
  { icon: TrendingDown,  title: 'Impact Dashboard',   desc: 'Full-spectrum data visualization. Live telemetry.',      href: '/dashboard',  bg: '#3b82f6', shadow: '#10b981', tag: 'DATA' },
];

const stats = [
  { value: '2.5M', label: 'Tons tracked',   bg: '#ff6b35', shadow: '#fbbf24' },
  { value: '50K+', label: 'Active users',   bg: '#7c3aed', shadow: '#ec4899' },
  { value: '850K', label: 'CO₂ reduced',    bg: '#10b981', shadow: '#3b82f6' },
  { value: '98.5%',label: 'Accuracy',       bg: '#fbbf24', shadow: '#ff6b35' },
];

const marqueeItems = ['CARBON TWIN AI', '✦', 'TRACK YOUR IMPACT', '✦', 'AI POWERED', '✦', 'NEO BRUTALIST', '✦', 'CLIMATE TECH', '✦', 'REDUCE EMISSIONS', '✦'];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#111111', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'center' }}>

          {/* Left: headline */}
          <div style={{ position: 'relative' }}>
            {/* Decorative blob */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-20px',
              width: '200px', height: '200px',
              background: '#ff6b35', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
              opacity: 0.12, zIndex: 0,
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#ff6b35', border: '3px solid #0a0a0a',
                borderRadius: '12px', padding: '6px 16px',
                boxShadow: '4px 4px 0px #0a0a0a', marginBottom: '24px',
              }}>
                <Leaf size={14} color="#0a0a0a" strokeWidth={3} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', fontWeight: 500, color: '#0a0a0a', letterSpacing: '0.1em' }}>
                  AI-POWERED CARBON INTELLIGENCE
                </span>
              </div>

              {/* Big headline */}
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                lineHeight: 0.95, letterSpacing: '-0.03em',
                color: '#f5f0e8', marginBottom: '24px',
              }}>
                CARBON<br />
                <span style={{ color: '#ff6b35', WebkitTextStroke: '2px #0a0a0a', textShadow: '4px 4px 0px #0a0a0a' }}>TWIN</span><br />
                <span style={{ fontSize: '60%', color: '#9ca3af' }}>AI SYSTEM</span>
              </h1>

              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', color: '#9ca3af', maxWidth: '500px', lineHeight: 1.7, marginBottom: '36px' }}>
                Your environmental intelligence system. Real-time carbon analysis, predictive modeling, and AI-powered reduction strategies — for people serious about the planet.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link href="/calculator">
                  <button className="btn-brutal btn-orange">
                    Start Scan <ArrowRight size={16} strokeWidth={3} />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="btn-brutal btn-cream">
                    View Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* HUD Preview card */}
          <div className="clay-card shadow-violet bounce-in" style={{ background: '#1a1a2e', padding: '28px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#f5f0e8', textTransform: 'uppercase' }}>
                Live Profile
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#10b981', border: '2px solid #0a0a0a', borderRadius: '8px', padding: '3px 10px', boxShadow: '2px 2px 0px #0a0a0a' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0a0a0a' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', fontWeight: 500 }}>LIVE</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {[
                { label: 'Energy', value: '2.4t', color: '#ff6b35' },
                { label: 'Transport', value: '1.8t', color: '#7c3aed' },
                { label: 'Food', value: '0.9t', color: '#10b981' },
                { label: 'Flights', value: '0.3t', color: '#fbbf24' },
              ].map(item => (
                <div key={item.label} className="clay-card" style={{ background: '#0f0f23', padding: '14px', border: '2px solid #0a0a0a', boxShadow: `3px 3px 0px ${item.color}`, borderRadius: '14px' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#6b7280', marginBottom: '4px' }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#9ca3af' }}>REDUCTION PROGRESS</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: '#ff6b35' }}>74%</span>
              </div>
              <div className="clay-progress">
                <div className="clay-progress-fill" style={{ width: '74%', background: 'linear-gradient(90deg, #ff6b35, #fbbf24)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-wrap" style={{ margin: '0 0 0 0' }}>
        <div className="marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#0a0a0a', marginRight: '28px', letterSpacing: '0.06em' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {stats.map((s, i) => (
            <div key={i} className="clay-card wobble"
              style={{ background: s.bg, padding: '28px 24px', boxShadow: `6px 6px 0px ${s.shadow}`, cursor: 'pointer' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '3rem', color: '#0a0a0a', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#0a0a0a', opacity: 0.7, marginTop: '6px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f5f0e8', letterSpacing: '-0.02em', lineHeight: 1 }}>
            FEATURE<br /><span style={{ color: '#ff6b35' }}>ARRAY</span>
          </h2>
          <div className="divider-color" style={{ flex: 1, alignSelf: 'center' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Link key={i} href={f.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="clay-card" style={{
                  background: '#1a1a1a', padding: '28px',
                  boxShadow: `6px 6px 0px ${f.shadow}`,
                  height: '100%', cursor: 'pointer',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px, -3px)'; e.currentTarget.style.boxShadow = `9px 9px 0px ${f.shadow}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = `6px 6px 0px ${f.shadow}`; }}>
                  {/* Tag */}
                  <div className="tag" style={{ background: f.bg, color: '#0a0a0a', borderColor: '#0a0a0a', marginBottom: '16px' }}>
                    {f.tag}
                  </div>

                  {/* Icon */}
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: f.bg, border: '3px solid #0a0a0a',
                    boxShadow: '3px 3px 0px #0a0a0a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <Icon size={22} color="#0a0a0a" strokeWidth={2.5} />
                  </div>

                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: '#f5f0e8', marginBottom: '8px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>

                  <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: f.bg }}>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem' }}>EXPLORE</span>
                    <ArrowRight size={14} strokeWidth={3} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="clay-card" style={{ background: '#ff6b35', padding: '60px 40px', textAlign: 'center', boxShadow: '8px 8px 0px #0a0a0a' }}>
          <div className="tag" style={{ background: '#0a0a0a', color: '#ff6b35', borderColor: '#0a0a0a', marginBottom: '20px' }}>READY?</div>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '16px' }}>
            MEET YOUR<br />CARBON TWIN
          </h2>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', color: '#1a1a1a', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Join the movement. Measure, analyze, and reduce your carbon signature with AI precision.
          </p>
          <Link href="/calculator">
            <button className="btn-brutal" style={{ background: '#0a0a0a', color: '#ff6b35', boxShadow: '4px 4px 0px #7c3aed', border: '3px solid #0a0a0a' }}>
              Launch Carbon Scan <ArrowRight size={16} strokeWidth={3} />
            </button>
          </Link>
        </div>
      </section>

      
    </div>
  );
}
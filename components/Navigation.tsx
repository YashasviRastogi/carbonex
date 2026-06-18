'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calculator, BarChart3, Menu, X, Brain, Globe, Target, MessageCircle, Zap } from 'lucide-react';

const navLinks = [
  { href: '/',           label: 'Home',       icon: Home },
  { href: '/calculator', label: 'Calculator',  icon: Calculator },
  { href: '/dashboard',  label: 'Dashboard',   icon: BarChart3 },
  { href: '/insights',   label: 'AI Insights', icon: Brain },
  { href: '/simulator',  label: 'Simulator',   icon: Globe },
  { href: '/missions',   label: 'Missions',    icon: Target },
  { href: '/chatbot',    label: 'Chatbot',     icon: MessageCircle },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav style={{
      background: '#0a0a0a',
      borderBottom: '3px solid #0a0a0a',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Rainbow top stripe */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #ff6b35, #fbbf24, #10b981, #3b82f6, #7c3aed, #ec4899)' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: '#ff6b35', border: '3px solid #0a0a0a',
              boxShadow: '3px 3px 0px #0a0a0a',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Zap size={18} color="#0a0a0a" strokeWidth={3} />
            </div>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#f5f0e8', lineHeight: 1 }}>
                CARBON<span style={{ color: '#ff6b35' }}>TWIN</span>
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#6b7280', letterSpacing: '0.1em' }}>
                AI PLATFORM
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'none', gap: '6px' }} className="nav-desktop">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '7px 14px', borderRadius: '12px',
                    border: '2.5px solid',
                    borderColor: active ? '#0a0a0a' : 'transparent',
                    background: active ? '#ff6b35' : 'transparent',
                    boxShadow: active ? '3px 3px 0px #0a0a0a' : 'none',
                    color: active ? '#0a0a0a' : '#9ca3af',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    transition: 'all 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#f5f0e8'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'transparent'; } }}>
                    <Icon size={13} strokeWidth={2.5} />
                    {label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: '#ff6b35', border: '2.5px solid #0a0a0a',
              borderRadius: '10px', padding: '7px',
              boxShadow: '3px 3px 0px #0a0a0a',
              cursor: 'pointer', color: '#0a0a0a',
              display: 'flex', alignItems: 'center',
            }}
            className="nav-mobile-btn">
            {isOpen ? <X size={18} strokeWidth={3} /> : <Menu size={18} strokeWidth={3} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '2px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{ textDecoration: 'none' }} onClick={() => setIsOpen(false)}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '12px',
                    background: active ? '#ff6b35' : 'rgba(255,255,255,0.04)',
                    border: '2px solid',
                    borderColor: active ? '#0a0a0a' : 'rgba(255,255,255,0.08)',
                    color: active ? '#0a0a0a' : '#9ca3af',
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    <Icon size={15} strokeWidth={2.5} />
                    {label}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile-btn { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
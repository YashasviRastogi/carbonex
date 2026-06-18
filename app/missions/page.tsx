'use client';

import { useState, useEffect } from 'react';
import { Target, CheckCircle, Circle, Zap, Trophy } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface Mission {
  id: string; title: string; description: string;
  icon: string; impact: string; points: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

const allMissions: Mission[] = [
  { id:'m1',  title:'Meatless Monday',        description:'Skip meat for one full day this week',                      icon:'🥦', impact:'0.1t saved',  points:10,  difficulty:'EASY'   },
  { id:'m2',  title:'Unplug Standby Devices', description:'Unplug electronics when not in use for a week',             icon:'🔌', impact:'0.05t saved', points:10,  difficulty:'EASY'   },
  { id:'m3',  title:'Walk a Short Trip',       description:'Walk instead of drive for one journey under 2km',           icon:'🚶', impact:'0.02t saved', points:10,  difficulty:'EASY'   },
  { id:'m4',  title:'Cold Wash Laundry',       description:'Wash clothes at 30°C instead of 60°C this week',           icon:'👕', impact:'0.03t saved', points:10,  difficulty:'EASY'   },
  { id:'m5',  title:'Eat Local for a Week',    description:'Buy only locally sourced food for 7 days',                  icon:'🌽', impact:'0.08t saved', points:15,  difficulty:'EASY'   },
  { id:'m6',  title:'Public Transport Week',   description:'Use only public transport for a full week',                 icon:'🚌', impact:'0.3t saved',  points:30,  difficulty:'MEDIUM' },
  { id:'m7',  title:'Switch to LED Bulbs',     description:'Replace all home bulbs with LED alternatives',              icon:'💡', impact:'0.2t saved',  points:30,  difficulty:'MEDIUM' },
  { id:'m8',  title:'Vegetarian Month',        description:'Go fully vegetarian for 30 days',                          icon:'🥗', impact:'0.5t saved',  points:40,  difficulty:'MEDIUM' },
  { id:'m9',  title:'Carpool for a Month',     description:'Share rides with colleagues for 30 days',                  icon:'🚗', impact:'0.4t saved',  points:35,  difficulty:'MEDIUM' },
  { id:'m10', title:'Lower Heating by 2°C',    description:'Drop your thermostat 2 degrees for a month',               icon:'🌡️', impact:'0.25t saved', points:25,  difficulty:'MEDIUM' },
  { id:'m11', title:'No Flights for a Year',   description:'Avoid all air travel for 12 months',                       icon:'✈️', impact:'1.8t saved',  points:100, difficulty:'HARD'   },
  { id:'m12', title:'Install Solar Panels',    description:'Switch to renewable energy at home',                       icon:'☀️', impact:'1.2t saved',  points:100, difficulty:'HARD'   },
  { id:'m13', title:'Go Vegan for 3 Months',   description:'Fully plant-based diet for 90 days',                      icon:'🌱', impact:'0.8t saved',  points:80,  difficulty:'HARD'   },
  { id:'m14', title:'Electric Vehicle Switch', description:'Replace your car with an EV or e-bike',                   icon:'⚡', impact:'2.0t saved',  points:100, difficulty:'HARD'   },
  { id:'m15', title:'Zero Waste Month',        description:'Produce zero landfill waste for 30 days',                  icon:'♻️', impact:'0.6t saved',  points:70,  difficulty:'HARD'   },
];

const diffConfig = {
  EASY:   { bg: '#10b981', shadow: '#3b82f6', text: '#0a0a0a' },
  MEDIUM: { bg: '#fbbf24', shadow: '#ff6b35', text: '#0a0a0a' },
  HARD:   { bg: '#ec4899', shadow: '#7c3aed', text: '#f5f0e8' },
};

const rankFor = (pts: number) =>
  pts >= 400 ? { label: '🌍 Climate Champion', bg: '#10b981', shadow: '#3b82f6' }
  : pts >= 200 ? { label: '🌿 Eco Warrior',    bg: '#7c3aed', shadow: '#ec4899' }
  : pts >= 100 ? { label: '🌱 Green Operative', bg: '#fbbf24', shadow: '#ff6b35' }
  : { label: '🌀 Recruit',                     bg: '#6b7280', shadow: '#0a0a0a' };

export default function MissionsPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  useEffect(() => {
    const saved = localStorage.getItem('completedMissions');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const toggle = (id: string) => {
    const updated = completed.includes(id)
      ? completed.filter(m => m !== id)
      : [...completed, id];
    setCompleted(updated);
    localStorage.setItem('completedMissions', JSON.stringify(updated));
  };

  const totalPts = allMissions.filter(m => completed.includes(m.id)).reduce((s, m) => s + m.points, 0);
  const maxPts   = allMissions.reduce((s, m) => s + m.points, 0);
  const rank     = rankFor(totalPts);
  const filtered = filter === 'ALL' ? allMissions : allMissions.filter(m => m.difficulty === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#111111', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <Navigation />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Header */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fbbf24', border: '3px solid #0a0a0a', borderRadius: '12px', padding: '6px 16px', boxShadow: '4px 4px 0px #0a0a0a', marginBottom: '16px' }}>
            <Target size={14} color="#0a0a0a" strokeWidth={3} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#0a0a0a', letterSpacing: '0.1em' }}>MISSION OPERATIONS</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,7vw,5rem)', color: '#f5f0e8', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            ECO<br /><span style={{ color: '#fbbf24', WebkitTextStroke: '2px #0a0a0a', textShadow: '4px 4px 0px #0a0a0a' }}>MISSIONS</span>
          </h1>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', color: '#9ca3af', marginTop: '12px' }}>Complete real-world sustainability ops. Tap to mark done.</p>
        </div>

        {/* Score panel */}
        <div className="clay-card" style={{ background: rank.bg, padding: '28px', boxShadow: `6px 6px 0px ${rank.shadow}` }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', opacity: 0.7, marginBottom: '6px' }}>OPERATIVE RANK</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#0a0a0a' }}>{rank.label}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Trophy size={32} color="#0a0a0a" strokeWidth={2.5} />
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '3rem', color: '#0a0a0a', lineHeight: 1 }}>{totalPts}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', opacity: 0.7 }}>OF {maxPts} PTS</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', opacity: 0.7, marginBottom: '6px' }}>
              <span>{completed.length} / {allMissions.length} missions done</span>
              <span>{Math.round((totalPts / maxPts) * 100)}%</span>
            </div>
            <div className="clay-progress" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="clay-progress-fill" style={{ width: `${(totalPts / maxPts) * 100}%`, background: 'linear-gradient(90deg, #0a0a0a, #333)' }} />
            </div>
          </div>

          {/* Per-difficulty counts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {(['EASY', 'MEDIUM', 'HARD'] as const).map(d => {
              const tot  = allMissions.filter(m => m.difficulty === d).length;
              const done = allMissions.filter(m => m.difficulty === d && completed.includes(m.id)).length;
              return (
                <div key={d} className="clay-card" style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', textAlign: 'center', borderRadius: '14px', border: '2px solid rgba(0,0,0,0.3)', boxShadow: 'none' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#0a0a0a' }}>{done}/{tot}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: '#0a0a0a', opacity: 0.7, marginTop: '2px' }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map(f => {
            const active = filter === f;
            const cfg = f === 'ALL' ? { bg: '#f5f0e8', shadow: '#0a0a0a', text: '#0a0a0a' } : diffConfig[f as keyof typeof diffConfig];
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="btn-brutal"
                style={{
                  background: active ? cfg.bg : '#1a1a1a',
                  color: active ? cfg.text : '#9ca3af',
                  boxShadow: active ? `4px 4px 0px ${cfg.shadow}` : '4px 4px 0px #333',
                  border: '3px solid #0a0a0a',
                  padding: '8px 20px',
                  fontSize: '0.75rem',
                }}>
                {f}
              </button>
            );
          })}
        </div>

        {/* Mission grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
          {filtered.map(mission => {
            const done = completed.includes(mission.id);
            const cfg  = diffConfig[mission.difficulty];
            return (
              <button key={mission.id} onClick={() => toggle(mission.id)}
                className="clay-card"
                style={{
                  background: done ? 'rgba(16,185,129,0.1)' : '#1a1a1a',
                  padding: '20px',
                  boxShadow: done ? `5px 5px 0px #10b981` : `5px 5px 0px #333`,
                  border: done ? '3px solid #10b981' : '3px solid #0a0a0a',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = done ? '7px 7px 0px #10b981' : '7px 7px 0px #555';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = done ? '5px 5px 0px #10b981' : '5px 5px 0px #333';
                }}>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.8rem', lineHeight: 1, flexShrink: 0 }}>{mission.icon}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                        color: done ? '#6b7280' : '#f5f0e8',
                        textDecoration: done ? 'line-through' : 'none',
                      }}>
                        {mission.title}
                      </span>
                      {done
                        ? <CheckCircle size={18} color="#10b981" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        : <Circle     size={18} color="#333"     strokeWidth={2.5} style={{ flexShrink: 0 }} />}
                    </div>

                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.6, marginBottom: '10px' }}>
                      {mission.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {/* Difficulty tag */}
                      <div className="tag" style={{ background: cfg.bg, color: cfg.text, borderColor: '#0a0a0a' }}>
                        {mission.difficulty}
                      </div>

                      {/* Impact */}
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#10b981' }}>
                        🌱 {mission.impact}
                      </span>

                      {/* Points */}
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px', background: '#fbbf24', border: '2px solid #0a0a0a', borderRadius: '8px', padding: '2px 8px', boxShadow: '2px 2px 0px #0a0a0a' }}>
                        <Zap size={10} color="#0a0a0a" strokeWidth={3} />
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.75rem', color: '#0a0a0a' }}>{mission.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Motivational footer */}
        {completed.length > 0 && (
          <div className="clay-card" style={{ background: '#10b981', padding: '24px', textAlign: 'center', boxShadow: '6px 6px 0px #0a0a0a' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#0a0a0a' }}>
              🎉 {completed.length} mission{completed.length > 1 ? 's' : ''} complete! You've earned {totalPts} points.
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#065f46', marginTop: '6px' }}>
              Keep going — every action compounds over time.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
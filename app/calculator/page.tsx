'use client';

import { useState, useMemo, useEffect } from 'react';
import { Leaf, TrendingDown, Award, BarChart3 } from 'lucide-react';
import Navigation from '@/components/Navigation';

interface CarbonBreakdown { electricity: number; transport: number; flights: number; diet: number; }
interface CalculatorState {
  monthlyElectricity: number; weeklyCarTravel: number;
  weeklyPublicTransport: number; flightsPerYear: number;
  dietType: 'vegetarian' | 'eggetarian' | 'non-vegetarian';
}

const barColors = ['#ff6b35', '#7c3aed', '#ec4899', '#fbbf24'];
const shadowColors = ['#fbbf24', '#ec4899', '#7c3aed', '#ff6b35'];

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorState>({
    monthlyElectricity: 300, weeklyCarTravel: 200,
    weeklyPublicTransport: 50, flightsPerYear: 2, dietType: 'eggetarian',
  });

  const calculateEmissions = useMemo(() => {
    const breakdown: CarbonBreakdown = {
      electricity: (inputs.monthlyElectricity * 12 * 0.4) / 1000,
      transport: ((inputs.weeklyCarTravel * 52 * 0.21) + (inputs.weeklyPublicTransport * 52 * 0.05)) / 1000,
      flights: (inputs.flightsPerYear * 7000 * 0.255) / 1000,
      diet: ({ vegetarian: 1.7, eggetarian: 2.0, 'non-vegetarian': 2.7 }[inputs.dietType] * 365) / 1000,
    };
    return { breakdown, total: breakdown.electricity + breakdown.transport + breakdown.flights + breakdown.diet };
  }, [inputs]);

  const getGrade = (t: number) => {
    if (t <= 2)  return { grade: 'A', bg: '#10b981', shadow: '#3b82f6' };
    if (t <= 5)  return { grade: 'B', bg: '#3b82f6', shadow: '#7c3aed' };
    if (t <= 8)  return { grade: 'C', bg: '#fbbf24', shadow: '#ff6b35' };
    if (t <= 12) return { grade: 'D', bg: '#ff6b35', shadow: '#ec4899' };
    if (t <= 15) return { grade: 'E', bg: '#ec4899', shadow: '#7c3aed' };
    return { grade: 'F', bg: '#7c3aed', shadow: '#ec4899' };
  };

  const { breakdown, total } = calculateEmissions;
  const gradeInfo = getGrade(total);
  const maxVal = Math.max(breakdown.electricity, breakdown.transport, breakdown.flights, breakdown.diet, 1);

  useEffect(() => {
    localStorage.setItem('carbonData', JSON.stringify({
      total, transportation: breakdown.transport,
      electricity: breakdown.electricity, food: breakdown.diet,
      flights: breakdown.flights,
      score: Math.max(0, Math.min(100, Math.round(100 - total * 5))),
      grade: gradeInfo.grade,
    }));
  }, [total, breakdown, gradeInfo.grade]);

  const handle = (key: keyof CalculatorState, value: string | number) =>
    setInputs(p => ({ ...p, [key]: typeof value === 'string' ? (key === 'dietType' ? value : parseFloat(value) || 0) : value }));

  const barItems = [
    { label: 'Electricity', value: breakdown.electricity, icon: '⚡' },
    { label: 'Transport',   value: breakdown.transport,   icon: '🚗' },
    { label: 'Flights',     value: breakdown.flights,     icon: '✈️' },
    { label: 'Diet',        value: breakdown.diet,        icon: '🍽️' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#111111', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <Navigation />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#10b981', border: '3px solid #0a0a0a', borderRadius: '12px', padding: '6px 16px', boxShadow: '4px 4px 0px #0a0a0a', marginBottom: '20px' }}>
            <Leaf size={14} color="#0a0a0a" strokeWidth={3} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#0a0a0a', letterSpacing: '0.1em' }}>CARBON SCAN MODULE</span>
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: '#f5f0e8', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: '12px' }}>
            CALCULATE<br /><span style={{ color: '#ff6b35', WebkitTextStroke: '2px #0a0a0a', textShadow: '4px 4px 0px #0a0a0a' }}>YOUR IMPACT</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'start' }}>

          {/* Input panel */}
          <div className="clay-card" style={{ background: '#1a1a1a', padding: '28px', boxShadow: '6px 6px 0px #ff6b35' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ff6b35', border: '3px solid #0a0a0a', boxShadow: '2px 2px 0px #0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={16} color="#0a0a0a" strokeWidth={3} />
              </div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#f5f0e8', textTransform: 'uppercase' }}>Your Lifestyle</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { label: 'Monthly Electricity (kWh)', field: 'monthlyElectricity' as const, avg: '300' },
                { label: 'Weekly Car Travel (km)',     field: 'weeklyCarTravel'    as const, avg: '200' },
                { label: 'Weekly Public Transport (km)', field: 'weeklyPublicTransport' as const, avg: '50' },
                { label: 'Flights Per Year',           field: 'flightsPerYear'    as const, avg: '2', step: '0.5' },
              ].map(({ label, field, avg, step }) => (
                <div key={field}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <label style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#f5f0e8', textTransform: 'uppercase' }}>{label}</label>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#6b7280' }}>avg {avg}</span>
                  </div>
                  <input type="number" min="0" step={step ?? '1'}
                    value={inputs[field] as number}
                    onChange={e => handle(field, e.target.value)}
                    className="brutal-input" />
                </div>
              ))}

              <div>
                <label style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#f5f0e8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Diet Type</label>
                <select value={inputs.dietType} onChange={e => handle('dietType', e.target.value)} className="brutal-select">
                  <option value="vegetarian">Vegetarian</option>
                  <option value="eggetarian">Eggetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Total + Grade row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="clay-card" style={{ background: '#1a1a1a', padding: '24px', boxShadow: '6px 6px 0px #7c3aed' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <TrendingDown size={16} color="#7c3aed" strokeWidth={2.5} />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#6b7280', textTransform: 'uppercase' }}>Annual Output</span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '3rem', color: '#f5f0e8', lineHeight: 1 }}>{total.toFixed(2)}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#6b7280', marginTop: '4px' }}>METRIC TONS CO₂e/YR</div>
                <div style={{ marginTop: '12px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#9ca3af' }}>
                  {total < 2.4 ? '🌟 Below average!' : total < 5 ? '✨ Good range' : total < 8 ? '👌 Room to improve' : '⚠️ Action needed'}
                </div>
              </div>

              <div className="clay-card" style={{ background: gradeInfo.bg, padding: '24px', boxShadow: `6px 6px 0px ${gradeInfo.shadow}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Award size={14} color="#0a0a0a" strokeWidth={3} />
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', opacity: 0.7 }}>GRADE</span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '5rem', color: '#0a0a0a', lineHeight: 1 }}>{gradeInfo.grade}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#0a0a0a', opacity: 0.7, marginTop: '6px' }}>
                  {gradeInfo.grade === 'A' ? 'CHAMPION' : gradeInfo.grade === 'B' ? 'SUSTAINABLE' : gradeInfo.grade === 'C' ? 'AVERAGE' : gradeInfo.grade === 'D' ? 'NEEDS WORK' : 'CRITICAL'}
                </div>
              </div>
            </div>

            {/* Breakdown bars */}
            <div className="clay-card" style={{ background: '#1a1a1a', padding: '24px', boxShadow: '6px 6px 0px #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <BarChart3 size={16} color="#10b981" strokeWidth={2.5} />
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: '#f5f0e8', textTransform: 'uppercase' }}>Breakdown</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {barItems.map((item, i) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{item.icon}</span>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: '#f5f0e8' }}>{item.label}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#6b7280' }}>{((item.value / total) * 100).toFixed(0)}%</span>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: barColors[i] }}>{item.value.toFixed(2)}t</span>
                      </div>
                    </div>
                    <div className="clay-progress">
                      <div className="clay-progress-fill" style={{ width: `${(item.value / maxVal) * 100}%`, background: `linear-gradient(90deg, ${barColors[i]}, ${shadowColors[i]})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="clay-card" style={{ background: '#1a1a2e', padding: '24px', boxShadow: '6px 6px 0px #ec4899' }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.9rem', color: '#f5f0e8', marginBottom: '16px', textTransform: 'uppercase' }}>💡 Quick Wins</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  '🚶 Walk or cycle for trips under 5km',
                  '🥗 Try one meat-free day per week',
                  '💡 Switch all bulbs to LED',
                  '✈️ Replace one flight with a train',
                ].map(tip => (
                  <div key={tip} style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.85rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ec4899', flexShrink: 0 }} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
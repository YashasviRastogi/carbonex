'use client';

interface AvatarProps { grade: string; score: number; total: number; }

export default function CarbonAvatar({ grade, score, total }: AvatarProps) {
  const isGreat = ['A', 'B'].includes(grade);
  const isOkay  = grade === 'C';

  const faceColor  = isGreat ? '#10b981' : isOkay ? '#fbbf24' : '#ec4899';
  const shadowCol  = isGreat ? '#3b82f6' : isOkay ? '#ff6b35' : '#7c3aed';
  const eyeColor   = '#0a0a0a';
  const moodLabel  = isGreat ? 'THRIVING 🌍' : isOkay ? 'NOMINAL 🌡️' : 'CRITICAL ⚠️';

  /* mouth path changes by grade */
  const mouthPath = isGreat
    ? 'M 68 115 Q 100 135 132 115'   /* big smile */
    : isOkay
    ? 'M 75 120 L 125 120'           /* flat */
    : 'M 68 130 Q 100 110 132 130';  /* frown */

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
      {/* Clay planet face */}
      <div className="float" style={{ filter: `drop-shadow(5px 5px 0px ${shadowCol})` }}>
        <svg viewBox="0 0 200 200" width="160" height="160" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="clayGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="40%" stopColor={faceColor} stopOpacity="1" />
              <stop offset="100%" stopColor={faceColor} stopOpacity="0.85" />
            </radialGradient>
            <radialGradient id="eyeGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#555" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
          </defs>

          {/* Body */}
          <circle cx="100" cy="105" r="72" fill="#0a0a0a" />
          <circle cx="100" cy="105" r="68" fill="url(#clayGrad)" stroke="#0a0a0a" strokeWidth="4" />

          {/* Shine spot */}
          <ellipse cx="76" cy="75" rx="20" ry="14" fill="white" opacity="0.25" transform="rotate(-20 76 75)" />

          {/* Eyes */}
          <circle cx="78"  cy="98" r="12" fill="url(#eyeGrad)" stroke="#0a0a0a" strokeWidth="3" />
          <circle cx="122" cy="98" r="12" fill="url(#eyeGrad)" stroke="#0a0a0a" strokeWidth="3" />
          {/* Eye shine */}
          <circle cx="82"  cy="94" r="4" fill="white" opacity="0.6" />
          <circle cx="126" cy="94" r="4" fill="white" opacity="0.6" />
          {/* Pupils */}
          <circle cx="80"  cy="99" r="5" fill={eyeColor} />
          <circle cx="124" cy="99" r="5" fill={eyeColor} />

          {/* Cheeks */}
          {isGreat && <>
            <circle cx="58"  cy="116" r="12" fill="#ff6b35" opacity="0.45" />
            <circle cx="142" cy="116" r="12" fill="#ff6b35" opacity="0.45" />
          </>}

          {/* Mouth */}
          <path d={mouthPath} fill="none" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round" />

          {/* Grade badge — top right */}
          <circle cx="155" cy="48" r="22" fill="#0a0a0a" stroke={faceColor} strokeWidth="4" />
          <text x="155" y="56" textAnchor="middle" fontSize="20" fontWeight="900"
            fill={faceColor} fontFamily="Syne, sans-serif">{grade}</text>

          {/* Leaf or smoke details */}
          {isGreat ? (
            <>
              <ellipse cx="38" cy="55" rx="10" ry="6" fill="#10b981" stroke="#0a0a0a" strokeWidth="2" transform="rotate(-30 38 55)" />
              <ellipse cx="162" cy="60" rx="10" ry="6" fill="#10b981" stroke="#0a0a0a" strokeWidth="2" transform="rotate(25 162 60)" />
            </>
          ) : !isOkay ? (
            <>
              <ellipse cx="45" cy="50" rx="12" ry="7" fill="#6b7280" opacity="0.7" />
              <ellipse cx="62" cy="40" rx="10" ry="6" fill="#6b7280" opacity="0.5" />
            </>
          ) : null}
        </svg>
      </div>

      {/* Status */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', color: faceColor, marginBottom: '8px' }}>{moodLabel}</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: '#6b7280', marginBottom: '10px' }}>
          {total.toFixed(2)}t CO₂e/yr · Score {score}/100
        </div>
        <div className="clay-progress">
          <div className="clay-progress-fill" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${faceColor}, ${shadowCol})` }} />
        </div>
      </div>
    </div>
  );
}
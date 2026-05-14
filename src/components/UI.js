// ─── CONSTANTES PARTILHADAS ───────────────────────────────────────────
export const STATUS = {
  funciona:      { label:'Funciona',  icon:'✅', color:'#1DB954', bg:'#1DB95415', border:'#1DB95435' },
  avariado:      { label:'Avariado',  icon:'🔴', color:'#FF3B5C', bg:'#FF3B5C15', border:'#FF3B5C35' },
  'sem-servico': { label:'Não tem',   icon:'⚫', color:'#888',    bg:'#88888812', border:'#88888830' },
}

export const MARCA_COR = {
  Galp:'#E8430A', BP:'#00A650', Repsol:'#1A1A1A',
  Prio:'#7B2D8B', Cepsa:'#004A97',
}
export const MARCA_TXT = {
  Galp:'#fff', BP:'#fff', Repsol:'#FFD700',
  Prio:'#fff', Cepsa:'#fff',
}

// ─── HELPERS ─────────────────────────────────────────────────────────
export function tempoAtras(isoString) {
  if (!isoString) return 'sem dados'
  const mins = Math.floor((Date.now() - new Date(isoString)) / 60000)
  if (mins < 1)   return 'agora mesmo'
  if (mins < 60)  return `há ${mins} min`
  if (mins < 120) return 'há 1h'
  if (mins < 1440) return `há ${Math.round(mins/60)}h`
  return `há ${Math.round(mins/1440)} dias`
}

export function scorePostо(posto) {
  return [posto.ar, posto.agua].filter(s => s === 'funciona').length
}

// ─── COMPONENTES ─────────────────────────────────────────────────────

export function Pill({ estado }) {
  const s = STATUS[estado] || STATUS['sem-servico']
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      background:s.bg, color:s.color, border:`1px solid ${s.border}`,
      fontSize:11, fontWeight:600, padding:'3px 9px', borderRadius:99,
      letterSpacing:0.2, whiteSpace:'nowrap',
    }}>
      {s.icon} {s.label}
    </span>
  )
}

export function MarcaBadge({ marca }) {
  return (
    <span style={{
      background: MARCA_COR[marca] || '#555',
      color: MARCA_TXT[marca] || '#fff',
      fontSize:10, fontWeight:800, padding:'3px 8px',
      borderRadius:6, letterSpacing:0.8,
      fontFamily:"'Syne',sans-serif",
    }}>{marca?.toUpperCase()}</span>
  )
}

export function ScoreEmoji({ posto }) {
  const s = scorePostо(posto)
  const cor = s===2 ? '#1DB954' : s===1 ? '#FFB800' : '#FF3B5C'
  return (
    <div style={{
      width:44, height:44, borderRadius:'50%',
      border:`2.5px solid ${cor}`, background:`${cor}12`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:20, flexShrink:0,
    }}>
      {s===2 ? '😊' : s===1 ? '😐' : '😞'}
    </div>
  )
}

export function PostoCard({ posto, onClick }) {
  return (
    <div onClick={() => onClick(posto)} style={{
      background:'#fff', borderRadius:18, padding:'14px 16px',
      marginBottom:10, display:'flex', gap:12, alignItems:'center',
      boxShadow:'0 2px 10px #00000008', border:'1.5px solid #f0f0f0',
      cursor:'pointer', transition:'all .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 24px #00000015' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 10px #00000008' }}
    >
      <ScoreEmoji posto={posto} />
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5 }}>
          <MarcaBadge marca={posto.marca} />
          <span style={{
            fontSize:14, fontWeight:700, color:'#1a1a1a',
            fontFamily:"'Syne',sans-serif",
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
          }}>{posto.nome}</span>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:11, color:'#bbb' }}>💨</span><Pill estado={posto.ar || 'sem-servico'} />
          <span style={{ fontSize:11, color:'#bbb' }}>💧</span><Pill estado={posto.agua || 'sem-servico'} />
        </div>
        <div style={{ marginTop:6, fontSize:11, color:'#ccc' }}>
          📍 {posto.cidade} · {posto.total_reportes || 0} reportes · {tempoAtras(posto.ultimo_reporte)}
        </div>
      </div>
      <span style={{ color:'#ddd', fontSize:22, flexShrink:0 }}>›</span>
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div style={{ textAlign:'center', padding:'60px 20px', color:'#ccc' }}>
      <div style={{
        width:40, height:40, border:'3px solid #f0f0f0',
        borderTop:'3px solid #1DB954', borderRadius:'50%',
        margin:'0 auto 16px', animation:'spin 0.8s linear infinite',
      }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>A carregar postos…</p>
    </div>
  )
}

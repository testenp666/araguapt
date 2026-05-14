import { useState } from 'react'
import { PostoCard, LoadingSpinner, scorePostо } from './UI'

// Posições pseudo-fixas para os pins no mapa de demo
const PIN_POS = [
  { x:50, y:58 }, { x:65, y:35 }, { x:78, y:18 },
  { x:82, y:52 }, { x:22, y:74 }, { x:36, y:42 },
  { x:55, y:28 }, { x:40, y:65 }, { x:70, y:68 }, { x:15, y:45 },
]

function MapaDemo({ postos, onSelect }) {
  const [pinHov, setPinHov] = useState(null)

  return (
    <div style={{
      margin:'12px 16px', borderRadius:20, overflow:'hidden',
      height:270, position:'relative', boxShadow:'0 4px 24px #00000015',
    }}>
      {/* Fundo mapa */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(155deg,#e8f2e8,#d2e8cf,#c4dfc0)' }} />

      {/* SVG: estradas e blocos */}
      <svg style={{ position:'absolute', inset:0 }} width="100%" height="100%" viewBox="0 0 400 270" preserveAspectRatio="xMidYMid slice">
        {/* Estrada principal */}
        <path d="M0,135 Q90,110 180,148 Q260,178 330,132 Q370,110 400,125" stroke="#b5ccb5" strokeWidth="14" fill="none" strokeLinecap="round"/>
        <path d="M0,135 Q90,110 180,148 Q260,178 330,132 Q370,110 400,125" stroke="#cde0ca" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <path d="M0,135 Q90,110 180,148 Q260,178 330,132 Q370,110 400,125" stroke="#fff" strokeWidth="1.5" strokeDasharray="14,10" fill="none" opacity="0.6"/>
        {/* Estrada secundária */}
        <path d="M195,0 Q188,65 200,135 Q210,198 192,270" stroke="#b5ccb5" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M195,0 Q188,65 200,135 Q210,198 192,270" stroke="#cde0ca" strokeWidth="6" fill="none" strokeLinecap="round"/>
        {/* Quarteirões */}
        {[[28,22,52,38],[108,32,58,28],[272,42,50,36],[315,155,48,38],[55,178,52,32],[148,185,58,28],[230,100,44,30],[320,80,40,28]].map(([x,y,w,h],i)=>(
          <rect key={i} x={x} y={y} width={w} height={h} rx={5} fill="#b0ccb0" opacity={0.55}/>
        ))}
      </svg>

      {/* Pins */}
      {postos.slice(0,10).map((p, i) => {
        const pos = PIN_POS[i] || { x:50, y:50 }
        const s = scorePostо(p)
        const cor = s===2 ? '#1DB954' : s===1 ? '#FFB800' : '#FF3B5C'
        const isHov = pinHov === p.id
        return (
          <div key={p.id}
            onClick={() => onSelect(p)}
            onMouseEnter={() => setPinHov(p.id)}
            onMouseLeave={() => setPinHov(null)}
            style={{
              position:'absolute', left:`${pos.x}%`, top:`${pos.y}%`,
              transform:`translate(-50%,-100%) scale(${isHov?1.2:1})`,
              cursor:'pointer', filter:'drop-shadow(0 3px 8px #00000030)',
              transition:'transform .15s', zIndex: isHov ? 10 : 1,
            }}
          >
            <div style={{
              background:cor, color:'#fff',
              borderRadius:'50% 50% 50% 0', width:32, height:32,
              transform:'rotate(-45deg)', border:'2.5px solid #fff',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <span style={{ transform:'rotate(45deg)', fontSize:14 }}>⛽</span>
            </div>
            {isHov && (
              <div style={{
                position:'absolute', bottom:'110%', left:'50%',
                transform:'translateX(-50%)',
                background:'#1a1a1a', color:'#fff', borderRadius:8,
                padding:'5px 10px', fontSize:11, whiteSpace:'nowrap',
                fontFamily:"'DM Sans',sans-serif", boxShadow:'0 4px 12px #0004',
              }}>{p.nome}</div>
            )}
          </div>
        )
      })}

      {/* Localização atual */}
      <div style={{
        position:'absolute', left:'48%', top:'53%',
        width:14, height:14, background:'#3B82F6',
        borderRadius:'50%', border:'3px solid #fff',
        boxShadow:'0 0 0 7px #3B82F620', transform:'translate(-50%,-50%)',
      }}/>

      {/* Legenda */}
      <div style={{
        position:'absolute', bottom:10, right:10,
        background:'#ffffffee', borderRadius:12, padding:'6px 12px',
        fontSize:11, fontFamily:"'DM Sans',sans-serif",
        boxShadow:'0 2px 8px #00000015', display:'flex', gap:10,
        backdropFilter:'blur(4px)',
      }}>
        <span style={{color:'#1DB954',fontWeight:700}}>● OK</span>
        <span style={{color:'#FFB800',fontWeight:700}}>● Parcial</span>
        <span style={{color:'#FF3B5C',fontWeight:700}}>● Problema</span>
      </div>

      {/* Aviso demo */}
      <div style={{
        position:'absolute', top:10, left:10,
        background:'#ffffffdd', borderRadius:8, padding:'4px 10px',
        fontSize:10, color:'#888', fontFamily:"'DM Sans',sans-serif",
        backdropFilter:'blur(4px)',
      }}>🗺️ Google Maps na versão final</div>
    </div>
  )
}

export default function TelaMapa({ postos, loading, onSelect }) {
  const arOk    = postos.filter(p => p.ar === 'funciona').length
  const aguaOk  = postos.filter(p => p.agua === 'funciona').length
  const tudoOk  = postos.filter(p => p.ar === 'funciona' && p.agua === 'funciona').length

  return (
    <div style={{ paddingBottom:90 }}>
      {/* Barra de pesquisa */}
      <div style={{ padding:'12px 16px 0' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          background:'#fff', borderRadius:16,
          border:'1.5px solid #ebebeb', padding:'11px 16px',
          boxShadow:'0 2px 12px #00000008',
        }}>
          <span style={{ fontSize:16 }}>🔍</span>
          <span style={{ fontSize:14, color:'#ccc', fontFamily:"'DM Sans',sans-serif" }}>
            Pesquisar posto ou cidade…
          </span>
          <span style={{ marginLeft:'auto', fontSize:18 }}>🎛️</span>
        </div>
      </div>

      {/* Mapa */}
      <MapaDemo postos={postos} onSelect={onSelect} />

      {/* Estatísticas rápidas */}
      <div style={{ display:'flex', gap:8, padding:'0 16px 14px', overflowX:'auto', scrollbarWidth:'none' }}>
        {[
          { label:'Ar OK', val:`${arOk}`, icon:'💨', cor:'#3B82F6' },
          { label:'Água OK', val:`${aguaOk}`, icon:'💧', cor:'#06B6D4' },
          { label:'Tudo OK', val:`${tudoOk}`, icon:'✅', cor:'#1DB954' },
        ].map(s => (
          <div key={s.label} style={{
            flexShrink:0, background:'#fff', borderRadius:14,
            padding:'12px 16px', border:'1.5px solid #f0f0f0',
            boxShadow:'0 2px 8px #00000008', display:'flex', alignItems:'center', gap:10,
          }}>
            <span style={{ fontSize:22 }}>{s.icon}</span>
            <div>
              <div style={{
                fontFamily:"'Syne',sans-serif", fontSize:22,
                fontWeight:800, color:s.cor, lineHeight:1,
              }}>{s.val}</div>
              <div style={{ fontSize:10, color:'#aaa', fontFamily:"'DM Sans',sans-serif" }}>
                {s.label} agora
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lista */}
      <div style={{ padding:'0 16px' }}>
        <p style={{ fontSize:12, color:'#bbb', fontFamily:"'DM Sans',sans-serif", marginBottom:12 }}>
          {postos.length} postos próximos · por distância
        </p>
        {loading
          ? <LoadingSpinner />
          : postos.map(p => <PostoCard key={p.id} posto={p} onClick={onSelect} />)
        }
      </div>
    </div>
  )
}

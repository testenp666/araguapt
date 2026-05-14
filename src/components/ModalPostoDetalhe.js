import { useEffect } from 'react'
import { STATUS, MARCA_COR, MarcaBadge, Pill, scorePostо, tempoAtras } from './UI'

export default function ModalPostoDetalhe({ posto, onClose, onReport }) {
  // Bloquear scroll do fundo quando modal aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const s   = scorePostо(posto)
  const cor = s===2 ? '#1DB954' : s===1 ? '#FFB800' : '#FF3B5C'

  return (
    <div
      style={{
        position:'fixed', inset:0, background:'#00000070',
        zIndex:100, display:'flex', alignItems:'flex-end',
        backdropFilter:'blur(6px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:'100%', background:'#fff',
          borderRadius:'28px 28px 0 0',
          padding:'0 0 env(safe-area-inset-bottom,32px)',
          maxHeight:'92vh', overflowY:'auto',
          animation:'slideUp .25s ease',
        }}
      >
        <style>{`@keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>

        {/* Handle */}
        <div style={{ padding:'16px 0 0', display:'flex', justifyContent:'center' }}>
          <div style={{ width:40, height:4, background:'#e0e0e0', borderRadius:2 }}/>
        </div>

        {/* Hero colorido */}
        <div style={{
          margin:'14px 20px 0',
          background:`linear-gradient(150deg,${cor}18,${cor}06)`,
          borderRadius:22, padding:20,
          border:`1.5px solid ${cor}28`,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{
              width:52, height:52, borderRadius:14,
              background: MARCA_COR[posto.marca] || '#333',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:24,
            }}>⛽</div>
            <div style={{ flex:1 }}>
              <h3 style={{
                margin:'0 0 4px', fontFamily:"'Syne',sans-serif",
                fontWeight:800, fontSize:17, color:'#1a1a1a',
              }}>{posto.nome}</h3>
              <p style={{
                margin:0, fontFamily:"'DM Sans',sans-serif",
                fontSize:12, color:'#aaa',
              }}>📍 {posto.morada || posto.cidade}</p>
            </div>
            <MarcaBadge marca={posto.marca}/>
          </div>

          {/* Estado dos serviços */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { label:'💨 Ar', estado:posto.ar||'sem-servico', desc:'calibragem de pneus' },
              { label:'💧 Água', estado:posto.agua||'sem-servico', desc:'limpeza pára-brisas' },
            ].map(sv => {
              const cfg = STATUS[sv.estado]
              return (
                <div key={sv.label} style={{
                  background:cfg.bg, border:`1.5px solid ${cfg.border}`,
                  borderRadius:16, padding:'15px 12px',
                }}>
                  <p style={{
                    margin:'0 0 8px', fontFamily:"'Syne',sans-serif",
                    fontWeight:700, fontSize:13, color:'#333',
                  }}>{sv.label}</p>
                  <Pill estado={sv.estado}/>
                  <p style={{
                    margin:'8px 0 0', fontFamily:"'DM Sans',sans-serif",
                    fontSize:10, color:'#aaa',
                  }}>{sv.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Metadados */}
        <div style={{ margin:'12px 20px 0', display:'flex', gap:10 }}>
          {[
            { icon:'📊', label:'Reportes',    val: posto.total_reportes || 0 },
            { icon:'🕒', label:'Atualizado',  val: tempoAtras(posto.ultimo_reporte) },
            { icon:'📍', label:'Cidade',      val: posto.cidade },
          ].map(info => (
            <div key={info.label} style={{
              flex:1, background:'#f8f8f8', borderRadius:14,
              padding:'12px 8px', textAlign:'center',
            }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{info.icon}</div>
              <div style={{
                fontFamily:"'Syne',sans-serif", fontWeight:700,
                fontSize:12, color:'#1a1a1a', lineHeight:1.2,
              }}>{info.val}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:'#aaa', marginTop:2 }}>
                {info.label}
              </div>
            </div>
          ))}
        </div>

        {/* Fiabilidade */}
        <div style={{
          margin:'12px 20px 0', background:'#f8f8f8',
          borderRadius:14, padding:'12px 16px',
        }}>
          <p style={{
            margin:0, fontSize:12, color:'#aaa',
            fontFamily:"'DM Sans',sans-serif", lineHeight:1.6,
          }}>
            ℹ️ Estado baseado em reportes da comunidade.
            Dados mais recentes têm maior peso na avaliação.
          </p>
        </div>

        {/* CTAs */}
        <div style={{ padding:'16px 20px 0', display:'flex', gap:10 }}>
          <button onClick={onReport} style={{
            flex:1, padding:15,
            background:'linear-gradient(135deg,#1DB954,#0fa845)',
            border:'none', borderRadius:16, color:'#fff',
            fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700,
            cursor:'pointer', boxShadow:'0 4px 18px #1DB95430',
          }}>✏️ Reportar agora</button>
          <button onClick={onClose} style={{
            padding:'15px 18px', background:'#f5f5f5',
            border:'none', borderRadius:16,
            fontSize:18, cursor:'pointer',
          }}>✕</button>
        </div>
      </div>
    </div>
  )
}

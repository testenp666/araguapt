import { Pill } from './UI'

const HISTORICO = [
  { posto:'Galp Avenida da Liberdade', ar:'funciona',    agua:'avariado',    quando:'Hoje, 10:32' },
  { posto:'BP Marquês de Pombal',      ar:'avariado',    agua:'funciona',    quando:'Ontem, 18:15' },
  { posto:'Repsol Odivelas Norte',     ar:'funciona',    agua:'funciona',    quando:'Há 3 dias' },
  { posto:'Cepsa Oeiras A5',           ar:'funciona',    agua:'sem-servico', quando:'Há 5 dias' },
]

const BADGES = [
  { emoji:'🥇', label:'Pioneiro',    desc:'1º reporte',      ativo:true  },
  { emoji:'🔥', label:'Em chama',    desc:'7 dias seguidos', ativo:true  },
  { emoji:'🎯', label:'Preciso',     desc:'90% confirmados', ativo:true  },
  { emoji:'🌟', label:'Top Lisboa',  desc:'Ranking #3',      ativo:true  },
  { emoji:'💎', label:'Ouro',        desc:'50 reportes',     ativo:false },
  { emoji:'🚀', label:'Viral',       desc:'100 confirmações',ativo:false },
  { emoji:'🗺️', label:'Explorer',   desc:'5 cidades',       ativo:false },
  { emoji:'👑', label:'Lenda',       desc:'200 reportes',    ativo:false },
]

export default function TelaPerfil() {
  return (
    <div style={{ paddingBottom:90 }}>

      {/* Hero escuro */}
      <div style={{
        background:'linear-gradient(160deg,#1a1a1a 0%,#252525 100%)',
        padding:'28px 20px 72px', position:'relative', overflow:'hidden',
      }}>
        {/* Decoração */}
        <div style={{
          position:'absolute', top:-50, right:-50, width:180, height:180,
          borderRadius:'50%', background:'#1DB95412', border:'1px solid #1DB95425',
        }}/>
        <div style={{
          position:'absolute', bottom:-30, left:-30, width:120, height:120,
          borderRadius:'50%', background:'#FFD70010', border:'1px solid #FFD70020',
        }}/>

        <div style={{ display:'flex', alignItems:'center', gap:16, position:'relative' }}>
          <div style={{
            width:64, height:64, borderRadius:20,
            background:'linear-gradient(135deg,#1DB954,#0fa845)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:30, boxShadow:'0 8px 24px #1DB95440',
          }}>🧑‍✈️</div>
          <div>
            <h2 style={{
              fontFamily:"'Syne',sans-serif", fontSize:20,
              fontWeight:800, color:'#fff', marginBottom:6,
            }}>Condutor Anónimo</h2>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{
                background:'#FFD70020', border:'1px solid #FFD70040',
                color:'#FFD700', fontSize:11, fontWeight:700,
                padding:'3px 10px', borderRadius:99, fontFamily:"'DM Sans',sans-serif",
              }}>🥈 Nível Prata</span>
              <span style={{ color:'#555', fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
                desde Mai 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas (sobrepostos ao hero) */}
      <div style={{
        margin:'-44px 16px 20px',
        display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10,
      }}>
        {[
          { val:47,  label:'Reportes',    emoji:'📊' },
          { val:470, label:'Pontos',      emoji:'⭐' },
          { val:183, label:'Confirmados', emoji:'👍' },
        ].map(s => (
          <div key={s.label} style={{
            background:'#fff', borderRadius:18, padding:'16px 10px',
            textAlign:'center', boxShadow:'0 8px 28px #00000015',
            border:'1.5px solid #f0f0f0',
          }}>
            <div style={{ fontSize:24, marginBottom:4 }}>{s.emoji}</div>
            <div style={{
              fontFamily:"'Syne',sans-serif", fontSize:24,
              fontWeight:800, color:'#1a1a1a', lineHeight:1,
            }}>{s.val}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#aaa', marginTop:3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding:'0 16px' }}>

        {/* Barra de progresso para próximo nível */}
        <div style={{
          background:'#fff', borderRadius:18, padding:18,
          marginBottom:16, border:'1.5px solid #f0f0f0',
          boxShadow:'0 2px 10px #00000008',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:'#1a1a1a' }}>
              🏆 Próximo nível: Ouro
            </span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#bbb' }}>47/50</span>
          </div>
          <div style={{ height:8, background:'#f0f0f0', borderRadius:4, overflow:'hidden' }}>
            <div style={{
              width:'94%', height:'100%',
              background:'linear-gradient(90deg,#FFB800,#FFD700)',
              borderRadius:4, transition:'width 1s ease',
            }}/>
          </div>
          <p style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:12,
            color:'#aaa', marginTop:8,
          }}>
            Faltam apenas <strong style={{color:'#FFB800'}}>3 reportes</strong> para desbloquear o Nível Ouro!
          </p>
        </div>

        {/* Badges */}
        <h3 style={{
          fontFamily:"'Syne',sans-serif", fontSize:14,
          fontWeight:700, color:'#1a1a1a', marginBottom:14,
        }}>🎖️ Conquistas</h3>
        <div style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          gap:10, marginBottom:24,
        }}>
          {BADGES.map(b => (
            <div key={b.label} style={{
              background: b.ativo ? '#fff' : '#f8f8f8',
              border:'1.5px solid #f0f0f0',
              borderRadius:16, padding:'14px 8px', textAlign:'center',
              opacity: b.ativo ? 1 : 0.4,
            }}>
              <div style={{ fontSize:28 }}>{b.emoji}</div>
              <div style={{
                fontFamily:"'Syne',sans-serif", fontSize:10,
                fontWeight:700, color:'#333', marginTop:5,
              }}>{b.label}</div>
              <div style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:9,
                color:'#aaa', marginTop:2,
              }}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Histórico */}
        <h3 style={{
          fontFamily:"'Syne',sans-serif", fontSize:14,
          fontWeight:700, color:'#1a1a1a', marginBottom:14,
        }}>📋 Últimos reportes</h3>
        {HISTORICO.map((r, i) => (
          <div key={i} style={{
            background:'#fff', border:'1.5px solid #f0f0f0',
            borderRadius:16, padding:'14px 16px', marginBottom:10,
            boxShadow:'0 2px 8px #00000006',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <span style={{
                fontFamily:"'Syne',sans-serif", fontWeight:700,
                fontSize:13, color:'#1a1a1a',
              }}>{r.posto}</span>
              <span style={{
                fontFamily:"'DM Sans',sans-serif",
                fontSize:11, color:'#ccc',
              }}>{r.quando}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <Pill estado={r.ar}/> <Pill estado={r.agua}/>
            </div>
          </div>
        ))}

        {/* Definições */}
        <div style={{
          marginTop:8, background:'#fff', borderRadius:18,
          border:'1.5px solid #f0f0f0', overflow:'hidden',
        }}>
          {[
            { icon:'🔔', label:'Notificações' },
            { icon:'🌙', label:'Modo escuro' },
            { icon:'🗺️', label:'Zona padrão' },
            { icon:'❓', label:'Ajuda' },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center', gap:14,
              padding:'16px 18px', cursor:'pointer',
              borderBottom: i < arr.length-1 ? '1px solid #f5f5f5' : 'none',
            }}>
              <span style={{ fontSize:20 }}>{item.icon}</span>
              <span style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:14,
                color:'#333', flex:1,
              }}>{item.label}</span>
              <span style={{ color:'#ddd', fontSize:18 }}>›</span>
            </div>
          ))}
        </div>

        <p style={{
          textAlign:'center', marginTop:20,
          fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#ddd',
        }}>ArÁguaPT v1.0 · Feito em Portugal 🇵🇹</p>
      </div>
    </div>
  )
}

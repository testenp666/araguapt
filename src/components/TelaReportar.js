import { useState } from 'react'
import { STATUS, MarcaBadge, Pill } from './UI'
import { criarReporte } from '../lib/supabase'

export default function TelaReportar({ postos, onSuccess }) {
  const [step, setStep]     = useState(0) // 0=posto, 1=estado, 2=confirmar, 3=sucesso
  const [posto, setPosto]   = useState(null)
  const [busca, setBusca]   = useState('')
  const [ar, setAr]         = useState(null)
  const [agua, setAgua]     = useState(null)
  const [nota, setNota]     = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro]     = useState(null)

  const sugestoes = postos.filter(p =>
    busca.length > 1 &&
    (p.nome.toLowerCase().includes(busca.toLowerCase()) ||
     p.cidade.toLowerCase().includes(busca.toLowerCase()))
  ).slice(0, 4)

  async function enviarReporte() {
    try {
      setEnviando(true)
      setErro(null)
      await criarReporte({ posto_id: posto.id, ar, agua, nota })
      setStep(3)
    } catch (e) {
      setErro('Erro ao enviar. Tenta novamente.')
    } finally {
      setEnviando(false)
    }
  }

  function resetar() {
    setStep(0); setPosto(null); setBusca(''); setAr(null); setAgua(null); setNota(''); setErro(null)
  }

  // ── ECRÃ SUCESSO ──
  if (step === 3) return (
    <div style={{ padding:'40px 24px 90px', textAlign:'center' }}>
      <div style={{
        width:100, height:100, borderRadius:'50%',
        background:'linear-gradient(135deg,#1DB954,#0fa845)',
        margin:'20px auto 24px', display:'flex',
        alignItems:'center', justifyContent:'center',
        fontSize:48, boxShadow:'0 8px 32px #1DB95440',
      }}>✅</div>
      <h2 style={{
        fontFamily:"'Syne',sans-serif", fontSize:26,
        fontWeight:800, color:'#1a1a1a', marginBottom:10,
      }}>Reporte enviado!</h2>
      <p style={{
        fontFamily:"'DM Sans',sans-serif", color:'#888',
        lineHeight:1.7, marginBottom:8, fontSize:14,
      }}>
        Já está visível para todos os condutores em Portugal.<br/>
        Obrigado por ajudares a comunidade! 🙏
      </p>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:8,
        background:'#FFD70015', border:'1px solid #FFD70035',
        borderRadius:14, padding:'10px 20px', margin:'12px 0 32px',
      }}>
        <span style={{ fontSize:22 }}>🏆</span>
        <span style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800,
          color:'#B8860B', fontSize:15,
        }}>+10 pontos ganhos!</span>
      </div>
      <button onClick={resetar} style={{
        display:'block', width:'100%', padding:15,
        background:'#1a1a1a', color:'#fff', border:'none',
        borderRadius:16, fontFamily:"'Syne',sans-serif",
        fontSize:15, fontWeight:700, cursor:'pointer',
      }}>Fazer outro reporte</button>
      <button onClick={onSuccess} style={{
        display:'block', width:'100%', marginTop:10, padding:13,
        background:'transparent', color:'#bbb', border:'1.5px solid #eee',
        borderRadius:16, fontFamily:"'DM Sans',sans-serif",
        fontSize:14, cursor:'pointer',
      }}>Voltar ao mapa</button>
    </div>
  )

  return (
    <div style={{ padding:'12px 16px 90px' }}>

      {/* Barra de progresso */}
      <div style={{ display:'flex', gap:6, marginBottom:28 }}>
        {['Posto','Estado','Confirmar'].map((s, i) => (
          <div key={s} style={{ flex:1 }}>
            <div style={{
              height:4, borderRadius:2, marginBottom:5,
              background: step >= i ? '#1DB954' : '#eee',
              transition:'background .3s',
            }}/>
            <span style={{
              fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:600,
              color: step >= i ? '#1DB954' : '#ccc',
            }}>{s}</span>
          </div>
        ))}
      </div>

      {/* ── STEP 0: ESCOLHER POSTO ── */}
      {step === 0 && (
        <div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:'#1a1a1a', marginBottom:6 }}>
            Qual o posto?
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:'#999', fontSize:13, marginBottom:20 }}>
            Pesquisa pelo nome ou usa a tua localização
          </p>

          {/* Localização */}
          <button style={{
            width:'100%', padding:14,
            background:'linear-gradient(135deg,#1DB95412,#0fa84508)',
            border:'2px dashed #1DB95450', borderRadius:16,
            fontSize:14, color:'#158c3c', fontWeight:600,
            cursor:'pointer', marginBottom:16,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            fontFamily:"'DM Sans',sans-serif",
          }}>
            <span style={{ fontSize:20 }}>📍</span> Usar a minha localização
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <div style={{ flex:1, height:1, background:'#eee' }}/>
            <span style={{ fontSize:11, color:'#ccc', fontFamily:"'DM Sans',sans-serif" }}>ou pesquisa</span>
            <div style={{ flex:1, height:1, background:'#eee' }}/>
          </div>

          {/* Campo de pesquisa */}
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            background:'#fff', border:'1.5px solid #e0e0e0',
            borderRadius:14, padding:'12px 16px', marginBottom:10,
          }}>
            <span>🔍</span>
            <input
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Nome do posto ou cidade…"
              style={{
                border:'none', outline:'none', flex:1,
                fontSize:14, fontFamily:"'DM Sans',sans-serif",
                background:'transparent', color:'#333',
              }}
            />
            {busca && (
              <button onClick={() => { setBusca(''); setPosto(null) }}
                style={{ background:'none', border:'none', cursor:'pointer', color:'#ccc', fontSize:18 }}>
                ×
              </button>
            )}
          </div>

          {/* Sugestões de pesquisa */}
          {sugestoes.map(p => (
            <div key={p.id} onClick={() => { setPosto(p); setBusca(p.nome) }} style={{
              padding:'12px 16px', marginBottom:8, cursor:'pointer',
              background: posto?.id===p.id ? '#1DB95410' : '#f9f9f9',
              borderRadius:12,
              border: posto?.id===p.id ? '1.5px solid #1DB95440' : '1.5px solid #eee',
              display:'flex', alignItems:'center', gap:10, transition:'all .1s',
            }}>
              <MarcaBadge marca={p.marca}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#333', fontFamily:"'Syne',sans-serif" }}>{p.nome}</div>
                <div style={{ fontSize:11, color:'#aaa', fontFamily:"'DM Sans',sans-serif" }}>{p.cidade}</div>
              </div>
              {posto?.id===p.id && <span style={{ color:'#1DB954', fontSize:18 }}>✓</span>}
            </div>
          ))}

          {/* Lista rápida (sem pesquisa) */}
          {busca.length <= 1 && (
            <>
              <p style={{ fontSize:12, color:'#ccc', fontFamily:"'DM Sans',sans-serif", margin:'16px 0 10px' }}>
                Postos próximos
              </p>
              {postos.slice(0, 5).map(p => (
                <div key={p.id} onClick={() => { setPosto(p); setBusca(p.nome) }} style={{
                  padding:'11px 14px', marginBottom:8, cursor:'pointer',
                  background: posto?.id===p.id ? '#1DB95410' : '#f5f5f5',
                  borderRadius:12,
                  border: posto?.id===p.id ? '1.5px solid #1DB95440' : '1.5px solid transparent',
                  display:'flex', alignItems:'center', gap:10,
                }}>
                  <MarcaBadge marca={p.marca}/>
                  <span style={{ fontSize:13, color:'#555', fontFamily:"'DM Sans',sans-serif", flex:1 }}>{p.nome}</span>
                  <span style={{ fontSize:11, color:'#ccc' }}>{p.cidade}</span>
                </div>
              ))}
            </>
          )}

          <button disabled={!posto} onClick={() => setStep(1)} style={{
            width:'100%', marginTop:20, padding:15,
            background: posto ? 'linear-gradient(135deg,#1DB954,#0fa845)' : '#e8e8e8',
            border:'none', borderRadius:16, color:'#fff',
            fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
            cursor: posto ? 'pointer' : 'not-allowed',
            boxShadow: posto ? '0 4px 20px #1DB95440' : 'none',
            transition:'all .2s',
          }}>Continuar →</button>
        </div>
      )}

      {/* ── STEP 1: ESTADO ── */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:'#1a1a1a', marginBottom:4 }}>
            Estado atual
          </h2>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24 }}>
            <MarcaBadge marca={posto.marca}/>
            <span style={{ fontSize:13, color:'#888', fontFamily:"'DM Sans',sans-serif" }}>{posto.nome}</span>
          </div>

          {/* Ar */}
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:'#333', marginBottom:12 }}>
            💨 Ar — calibragem de pneus
          </p>
          <div style={{ display:'flex', gap:10, marginBottom:28 }}>
            {Object.entries(STATUS).map(([val, s]) => (
              <button key={val} onClick={() => setAr(val)} style={{
                flex:1, padding:'16px 8px', borderRadius:14, cursor:'pointer',
                border:`2px solid ${ar===val ? s.color : '#eee'}`,
                background: ar===val ? s.bg : '#fff',
                boxShadow: ar===val ? `0 4px 14px ${s.color}30` : 'none',
                transition:'all .15s', textAlign:'center',
              }}>
                <div style={{ fontSize:26, marginBottom:5 }}>{s.icon}</div>
                <div style={{
                  fontSize:11, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
                  color: ar===val ? s.color : '#bbb',
                }}>{s.label}</div>
              </button>
            ))}
          </div>

          {/* Água */}
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:'#333', marginBottom:12 }}>
            💧 Água — limpeza de pára-brisas
          </p>
          <div style={{ display:'flex', gap:10, marginBottom:24 }}>
            {Object.entries(STATUS).map(([val, s]) => (
              <button key={val} onClick={() => setAgua(val)} style={{
                flex:1, padding:'16px 8px', borderRadius:14, cursor:'pointer',
                border:`2px solid ${agua===val ? s.color : '#eee'}`,
                background: agua===val ? s.bg : '#fff',
                boxShadow: agua===val ? `0 4px 14px ${s.color}30` : 'none',
                transition:'all .15s', textAlign:'center',
              }}>
                <div style={{ fontSize:26, marginBottom:5 }}>{s.icon}</div>
                <div style={{
                  fontSize:11, fontWeight:700, fontFamily:"'DM Sans',sans-serif",
                  color: agua===val ? s.color : '#bbb',
                }}>{s.label}</div>
              </button>
            ))}
          </div>

          {/* Nota */}
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:'#333', marginBottom:8 }}>
            📝 Nota (opcional)
          </p>
          <textarea
            value={nota} onChange={e => setNota(e.target.value)}
            placeholder="Ex: 'cobra 50 cêntimos', 'mangueira partida', 'precisa de moeda de 1€'…"
            rows={3} style={{
              width:'100%', padding:'12px 14px', borderRadius:14,
              border:'1.5px solid #e8e8e8', fontSize:13, resize:'none',
              outline:'none', boxSizing:'border-box', marginBottom:20,
              fontFamily:"'DM Sans',sans-serif", color:'#333', background:'#fafafa',
            }}
          />

          <button disabled={!ar||!agua} onClick={() => setStep(2)} style={{
            width:'100%', padding:15,
            background: ar&&agua ? 'linear-gradient(135deg,#1DB954,#0fa845)' : '#e8e8e8',
            border:'none', borderRadius:16, color:'#fff',
            fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
            cursor: ar&&agua ? 'pointer' : 'not-allowed',
            boxShadow: ar&&agua ? '0 4px 20px #1DB95440' : 'none',
          }}>Continuar →</button>
          <button onClick={() => setStep(0)} style={{
            width:'100%', marginTop:10, padding:12,
            background:'transparent', border:'1.5px solid #eee',
            borderRadius:16, color:'#bbb', fontFamily:"'DM Sans',sans-serif",
            fontSize:13, cursor:'pointer',
          }}>← Voltar</button>
        </div>
      )}

      {/* ── STEP 2: CONFIRMAR ── */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:'#1a1a1a', marginBottom:4 }}>
            Confirmar
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:'#999', fontSize:13, marginBottom:20 }}>
            Verifica antes de enviar
          </p>

          {/* Resumo */}
          <div style={{
            background:'#fff', border:'1.5px solid #f0f0f0',
            borderRadius:20, padding:20, marginBottom:14,
            boxShadow:'0 4px 16px #00000008',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:12,
              marginBottom:16, paddingBottom:16, borderBottom:'1px solid #f5f5f5',
            }}>
              <div style={{
                width:46, height:46, borderRadius:12,
                background:'#f0f0f0', display:'flex',
                alignItems:'center', justifyContent:'center', fontSize:22,
              }}>⛽</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:'#1a1a1a' }}>
                  {posto.nome}
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#aaa' }}>
                  {posto.cidade}
                </div>
              </div>
            </div>
            {[{ label:'💨 Ar', estado:ar },{ label:'💧 Água', estado:agua }].map(s => (
              <div key={s.label} style={{
                display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:12,
              }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#555' }}>{s.label}</span>
                <Pill estado={s.estado}/>
              </div>
            ))}
            {nota && (
              <div style={{ paddingTop:12, borderTop:'1px solid #f5f5f5' }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#aaa' }}>
                  📝 {nota}
                </span>
              </div>
            )}
          </div>

          {/* Aviso */}
          <div style={{
            background:'#1DB95410', border:'1px solid #1DB95030',
            borderRadius:14, padding:'12px 14px', marginBottom:20,
          }}>
            <p style={{ margin:0, fontSize:12, color:'#158c3c', fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
              ✅ Ao enviar confirmas que esta informação é verdadeira e atual.
              Reportes falsos podem ser removidos pela comunidade.
            </p>
          </div>

          {erro && (
            <div style={{
              background:'#FF3B5C10', border:'1px solid #FF3B5C30',
              borderRadius:12, padding:12, marginBottom:16,
            }}>
              <p style={{ margin:0, fontSize:13, color:'#FF3B5C', fontFamily:"'DM Sans',sans-serif" }}>
                ❌ {erro}
              </p>
            </div>
          )}

          <button onClick={enviarReporte} disabled={enviando} style={{
            width:'100%', padding:15,
            background: enviando ? '#ccc' : 'linear-gradient(135deg,#1DB954,#0fa845)',
            border:'none', borderRadius:16, color:'#fff',
            fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700,
            cursor: enviando ? 'wait' : 'pointer',
            boxShadow: enviando ? 'none' : '0 4px 20px #1DB95440',
          }}>
            {enviando ? '⏳ A enviar…' : '🚀 Enviar reporte'}
          </button>
          <button onClick={() => setStep(1)} style={{
            width:'100%', marginTop:10, padding:12,
            background:'transparent', border:'1.5px solid #eee',
            borderRadius:16, color:'#bbb', fontFamily:"'DM Sans',sans-serif",
            fontSize:13, cursor:'pointer',
          }}>← Corrigir</button>
        </div>
      )}
    </div>
  )
}

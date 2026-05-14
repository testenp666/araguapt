import { useState, useEffect } from 'react'
import TelaMapa from './components/TelaMapa'
import TelaLista from './components/TelaLista'
import TelaReportar from './components/TelaReportar'
import TelaPerfil from './components/TelaPerfil'
import ModalPostoDetalhe from './components/ModalPostoDetalhe'
import { getPostosProximos } from './lib/supabase'

// ─── DADOS DE FALLBACK (enquanto Supabase não está ligado) ────────────
const POSTOS_DEMO = [
  { id:'1', nome:'Galp Avenida da Liberdade', marca:'Galp', morada:'Av. da Liberdade, 180', cidade:'Lisboa', lat:38.720, lng:-9.143, ar:'funciona',    agua:'avariado',    total_reportes:24, ultimo_reporte: new Date(Date.now()-8*60000).toISOString() },
  { id:'2', nome:'BP Marquês de Pombal',      marca:'BP',   morada:'R. do Marquês de Pombal', cidade:'Lisboa', lat:38.725, lng:-9.150, ar:'avariado',    agua:'funciona',    total_reportes:11, ultimo_reporte: new Date(Date.now()-34*60000).toISOString() },
  { id:'3', nome:'Repsol Odivelas Norte',     marca:'Repsol',morada:'EN1, Km 14', cidade:'Odivelas', lat:38.795, lng:-9.185, ar:'funciona',    agua:'funciona',    total_reportes:38, ultimo_reporte: new Date(Date.now()-3*60000).toISOString() },
  { id:'4', nome:'Prio Amadora IC19',         marca:'Prio', morada:'IC19, Saída 4', cidade:'Amadora', lat:38.754, lng:-9.218, ar:'sem-servico', agua:'avariado',    total_reportes:5,  ultimo_reporte: new Date(Date.now()-180*60000).toISOString() },
  { id:'5', nome:'Cepsa Oeiras A5',           marca:'Cepsa',morada:'A5, Km 8', cidade:'Oeiras', lat:38.694, lng:-9.295, ar:'funciona',    agua:'sem-servico', total_reportes:17, ultimo_reporte: new Date(Date.now()-51*60000).toISOString() },
  { id:'6', nome:'Galp Estrada de Benfica',   marca:'Galp', morada:'Est. de Benfica, 400', cidade:'Lisboa', lat:38.741, lng:-9.197, ar:'avariado',    agua:'avariado',    total_reportes:9,  ultimo_reporte: new Date(Date.now()-120*60000).toISOString() },
]

export default function App() {
  const [tab, setTab]       = useState('mapa')
  const [postos, setPostos] = useState(POSTOS_DEMO)
  const [loading, setLoading] = useState(false)
  const [postoSel, setPostoSel] = useState(null)

  // Carregar postos do Supabase
  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true)
        const data = await getPostosProximos()
        if (data && data.length > 0) setPostos(data)
      } catch (e) {
        // Usa dados demo se Supabase não estiver configurado ainda
        console.log('A usar dados de demonstração')
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  const navItems = [
    { id:'mapa',     emoji:'🗺️', label:'Mapa'     },
    { id:'lista',    emoji:'📋', label:'Lista'    },
    { id:'reportar', emoji:'✏️', label:'Reportar' },
    { id:'perfil',   emoji:'👤', label:'Perfil'   },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { background: #f7f7f5; overscroll-behavior: none; }
        ::-webkit-scrollbar { display: none; }
        input, textarea, button { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{
        maxWidth: 430, margin: '0 auto', background: '#f7f7f5',
        minHeight: '100vh', fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
      }}>

        {/* ── HEADER ── */}
        <header style={{
          background: '#fff', padding: '16px 20px 14px',
          borderBottom: '1px solid #efefef',
          position: 'sticky', top: 0, zIndex: 20,
          boxShadow: '0 2px 16px #00000008',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <h1 style={{
                fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:900,
                color:'#1a1a1a', letterSpacing:-0.5, lineHeight:1,
              }}>
                ⛽ ArÁgua<span style={{color:'#1DB954'}}>PT</span>
              </h1>
              <p style={{ fontSize:11, color:'#bbb', marginTop:2 }}>
                Ar e água em tempo real · Portugal
              </p>
            </div>
            <div style={{
              display:'flex', alignItems:'center', gap:6,
              background:'#1DB95412', border:'1.5px solid #1DB95428',
              borderRadius:12, padding:'6px 12px',
            }}>
              <div style={{
                width:7, height:7, borderRadius:'50%',
                background:'#1DB954', boxShadow:'0 0 6px #1DB95499',
              }}/>
              <span style={{ fontSize:12, fontWeight:600, color:'#158c3c' }}>Lisboa</span>
            </div>
          </div>
        </header>

        {/* ── CONTEÚDO ── */}
        {tab === 'mapa'     && <TelaMapa     postos={postos} loading={loading} onSelect={setPostoSel} />}
        {tab === 'lista'    && <TelaLista    postos={postos} onSelect={setPostoSel} />}
        {tab === 'reportar' && <TelaReportar postos={postos} onSuccess={() => setTab('mapa')} />}
        {tab === 'perfil'   && <TelaPerfil   />}

        {/* ── NAV INFERIOR ── */}
        <nav style={{
          position:'fixed', bottom:0,
          left:'50%', transform:'translateX(-50%)',
          width:'100%', maxWidth:430,
          background:'#fff', borderTop:'1px solid #f0f0f0',
          display:'flex', padding:'8px 0 env(safe-area-inset-bottom, 12px)',
          boxShadow:'0 -4px 30px #00000012', zIndex:30,
        }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{
              flex:1, background:'none', border:'none', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:2,
              padding:'4px 0',
            }}>
              <div style={{
                width:46, height:34, borderRadius:12,
                background: tab===n.id ? '#1DB95418' : 'transparent',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:19, transition:'all .2s',
              }}>{n.emoji}</div>
              <span style={{
                fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:700,
                color: tab===n.id ? '#1DB954' : '#ccc',
                letterSpacing:0.3, transition:'color .2s',
              }}>{n.label}</span>
            </button>
          ))}
        </nav>

        {/* ── MODAL DETALHE ── */}
        {postoSel && (
          <ModalPostoDetalhe
            posto={postoSel}
            onClose={() => setPostoSel(null)}
            onReport={() => { setPostoSel(null); setTab('reportar') }}
          />
        )}
      </div>
    </>
  )
}

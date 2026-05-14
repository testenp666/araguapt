import { useState } from 'react'
import { PostoCard } from './UI'

const FILTROS = [
  { id:'todos',    label:'🔍 Todos',       fn: () => true },
  { id:'tudo-ok',  label:'✅ Ar + Água',   fn: p => p.ar==='funciona' && p.agua==='funciona' },
  { id:'ar-ok',    label:'💨 Ar OK',        fn: p => p.ar==='funciona' },
  { id:'agua-ok',  label:'💧 Água OK',      fn: p => p.agua==='funciona' },
  { id:'problema', label:'⚠️ Com problema', fn: p => p.ar!=='funciona' || p.agua!=='funciona' },
]

export default function TelaLista({ postos, onSelect }) {
  const [filtro, setFiltro]   = useState('todos')
  const [ordenar, setOrdenar] = useState('distancia')

  const fn = FILTROS.find(f => f.id === filtro)?.fn || (() => true)
  const lista = postos.filter(fn)

  return (
    <div style={{ padding:'12px 16px 90px' }}>

      {/* Filtros */}
      <div style={{
        display:'flex', gap:8, overflowX:'auto',
        paddingBottom:14, scrollbarWidth:'none', marginBottom:4,
      }}>
        {FILTROS.map(f => (
          <button key={f.id} onClick={() => setFiltro(f.id)} style={{
            flexShrink:0, padding:'8px 16px', borderRadius:99,
            border:'1.5px solid',
            borderColor: filtro===f.id ? '#1DB954' : '#e8e8e8',
            background: filtro===f.id ? '#1DB95415' : '#fff',
            color: filtro===f.id ? '#158c3c' : '#666',
            fontSize:12, fontWeight:600, cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif", transition:'all .15s',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Barra de resultado + ordenar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <span style={{ fontSize:12, color:'#bbb', fontFamily:"'DM Sans',sans-serif" }}>
          {lista.length} postos encontrados
        </span>
        <select value={ordenar} onChange={e => setOrdenar(e.target.value)} style={{
          fontSize:12, color:'#888', border:'1px solid #e8e8e8',
          borderRadius:8, padding:'4px 8px', background:'#fff',
          fontFamily:"'DM Sans',sans-serif", cursor:'pointer', outline:'none',
        }}>
          <option value="distancia">Por distância</option>
          <option value="recente">Mais recente</option>
          <option value="reportes">Mais reportes</option>
        </select>
      </div>

      {/* Resultados */}
      {lista.length === 0 ? (
        <div style={{ textAlign:'center', padding:'60px 20px' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🔍</div>
          <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:16, color:'#333', marginBottom:6 }}>
            Nenhum posto
          </p>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#bbb' }}>
            Não há postos com este filtro.<br/>Tenta um filtro diferente.
          </p>
          <button onClick={() => setFiltro('todos')} style={{
            marginTop:16, padding:'10px 24px', background:'#1DB954',
            border:'none', borderRadius:12, color:'#fff',
            fontFamily:"'Syne',sans-serif", fontWeight:700,
            fontSize:13, cursor:'pointer',
          }}>Ver todos</button>
        </div>
      ) : (
        lista.map(p => <PostoCard key={p.id} posto={p} onClick={onSelect} />)
      )}
    </div>
  )
}

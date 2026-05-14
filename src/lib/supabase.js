import { createClient } from '@supabase/supabase-js'

// ─── SUBSTITUI ESTES VALORES DEPOIS DE CRIAR O PROJETO NO SUPABASE ───
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://SEU-PROJETO.supabase.co'
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'SUA-CHAVE-AQUI'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── POSTOS ───────────────────────────────────────────────────────────
export async function getPostosProximos(lat, lng, raioKm = 20) {
  const { data, error } = await supabase
    .from('postos')
    .select(`
      *,
      reportes (
        ar, agua, nota, created_at
      )
    `)
    .order('nome')

  if (error) throw error
  return data
}

export async function getPostoPorId(id) {
  const { data, error } = await supabase
    .from('postos')
    .select(`*, reportes(ar, agua, nota, created_at)`)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// ─── REPORTES ─────────────────────────────────────────────────────────
export async function criarReporte({ posto_id, ar, agua, nota }) {
  const { data, error } = await supabase
    .from('reportes')
    .insert([{ posto_id, ar, agua, nota, created_at: new Date().toISOString() }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getReportesRecentes(posto_id, limite = 5) {
  const { data, error } = await supabase
    .from('reportes')
    .select('*')
    .eq('posto_id', posto_id)
    .order('created_at', { ascending: false })
    .limit(limite)

  if (error) throw error
  return data
}

// ─── ESTADO ATUAL (reporte mais recente de cada posto) ────────────────
export async function getEstadoAtual(posto_id) {
  const { data, error } = await supabase
    .from('reportes')
    .select('ar, agua, created_at')
    .eq('posto_id', posto_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) return null
  return data
}

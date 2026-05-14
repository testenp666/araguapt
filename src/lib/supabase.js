import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://sqgbjsibuchuabxfnede.supabase.co'
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

// Garante que a URL não tem /rest/v1 no fim
const cleanUrl = SUPABASE_URL.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')

export const supabase = createClient(cleanUrl, SUPABASE_ANON_KEY)

// ─── POSTOS ───────────────────────────────────────────────────────────
export async function getPostosProximos() {
  const { data, error } = await supabase
    .from('postos')
    .select('*, reportes(ar, agua, nota, created_at)')
    .eq('ativo', true)
    .order('nome')

  if (error) throw error
  return data
}

export async function getPostoPorId(id) {
  const { data, error } = await supabase
    .from('postos')
    .select('*, reportes(ar, agua, nota, created_at)')
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

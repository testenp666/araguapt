-- ═══════════════════════════════════════════════════════════════
-- ArÁguaPT — Schema da Base de Dados
-- Cola este SQL no Editor SQL do Supabase e clica em "Run"
-- ═══════════════════════════════════════════════════════════════

-- 1. TABELA DE POSTOS DE GASOLINA
create table postos (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  marca       text not null,           -- Galp, BP, Repsol, etc.
  morada      text,
  cidade      text not null,
  distrito    text,
  lat         float8 not null,         -- latitude
  lng         float8 not null,         -- longitude
  ativo       boolean default true,
  created_at  timestamptz default now()
);

-- 2. TABELA DE REPORTES (o coração da app)
create table reportes (
  id          uuid primary key default gen_random_uuid(),
  posto_id    uuid references postos(id) on delete cascade,
  ar          text not null check (ar in ('funciona','avariado','sem-servico')),
  agua        text not null check (agua in ('funciona','avariado','sem-servico')),
  nota        text,                    -- nota opcional do utilizador
  votos_up    int default 0,           -- confirmações da comunidade
  votos_down  int default 0,           -- negações da comunidade
  created_at  timestamptz default now()
);

-- 3. ÍNDICES para rapidez nas queries
create index idx_reportes_posto_id on reportes(posto_id);
create index idx_reportes_created_at on reportes(created_at desc);
create index idx_postos_cidade on postos(cidade);

-- 4. VIEW: estado atual de cada posto (reporte mais recente)
create view estado_atual_postos as
select distinct on (posto_id)
  postos.id,
  postos.nome,
  postos.marca,
  postos.morada,
  postos.cidade,
  postos.lat,
  postos.lng,
  reportes.ar,
  reportes.agua,
  reportes.nota,
  reportes.created_at as ultimo_reporte,
  (select count(*) from reportes r2 where r2.posto_id = postos.id) as total_reportes
from postos
left join reportes on reportes.posto_id = postos.id
order by posto_id, reportes.created_at desc;

-- 5. PERMISSÕES (leitura pública, escrita para todos — sem login por agora)
alter table postos enable row level security;
alter table reportes enable row level security;

create policy "Postos visíveis a todos" on postos for select using (true);
create policy "Reportes visíveis a todos" on reportes for select using (true);
create policy "Qualquer um pode reportar" on reportes for insert with check (true);

-- 6. DADOS DE EXEMPLO — postos reais em Lisboa
insert into postos (nome, marca, morada, cidade, distrito, lat, lng) values
  ('Galp Avenida da Liberdade',  'Galp',   'Av. da Liberdade, 180',    'Lisboa',  'Lisboa', 38.7200, -9.1430),
  ('BP Marquês de Pombal',       'BP',     'R. do Marquês de Pombal',  'Lisboa',  'Lisboa', 38.7254, -9.1500),
  ('Repsol Odivelas Norte',      'Repsol', 'EN1, Km 14',               'Odivelas','Lisboa', 38.7950, -9.1850),
  ('Prio Amadora IC19',          'Prio',   'IC19, Saída 4',            'Amadora', 'Lisboa', 38.7540, -9.2180),
  ('Cepsa Oeiras A5',            'Cepsa',  'A5, Km 8',                 'Oeiras',  'Lisboa', 38.6940, -9.2950),
  ('Galp Estrada de Benfica',    'Galp',   'Est. de Benfica, 400',     'Lisboa',  'Lisboa', 38.7410, -9.1970),
  ('BP Cascais Centro',          'BP',     'Av. 25 de Abril, 12',      'Cascais', 'Lisboa', 38.6965, -9.4215),
  ('Galp Porto Boavista',        'Galp',   'Av. da Boavista, 1200',    'Porto',   'Porto',  41.1620, -8.6390),
  ('Repsol Braga Norte',         'Repsol', 'N14, Braga Norte',         'Braga',   'Braga',  41.5560, -8.4300),
  ('BP Coimbra Sul',             'BP',     'A1, Saída Coimbra Sul',    'Coimbra', 'Coimbra',40.1980, -8.4100);

-- 7. REPORTES DE EXEMPLO para os postos acima
-- (usa os IDs gerados automaticamente — podes ignorar esta parte
--  e deixar a comunidade criar os primeiros reportes reais)

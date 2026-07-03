-- ============================================================
-- BTAV Smart Home — Supabase schema (Prompt 6A)
-- Run this once in the Supabase SQL Editor for your project.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: leads (all form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Contact info
  name            TEXT NOT NULL CHECK (char_length(name) >= 2),
  email           TEXT NOT NULL CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
  city            TEXT NOT NULL,
  zip             TEXT,

  -- Project info
  service         TEXT NOT NULL,
  tier            TEXT NOT NULL CHECK (tier IN ('essentials', 'premium', 'unsure')),
  description     TEXT CHECK (char_length(description) <= 2000),
  budget_range    TEXT CHECK (budget_range IN ('under_2k','2k_10k','10k_50k','50k_plus','unsure')),
  timeline        TEXT CHECK (timeline IN ('asap','1_3mo','3_6mo','6mo_plus','planning')),
  source          TEXT,

  -- Brand interest (optional)
  brands_interest TEXT[],

  -- CRM tracking
  status          TEXT DEFAULT 'new'
                  CHECK (status IN ('new','contacted','quoted','scheduled','won','lost','nurture')),
  assigned_to     TEXT DEFAULT 'binu',
  priority        INTEGER DEFAULT 2 CHECK (priority BETWEEN 1 AND 5),
  notes           TEXT,
  follow_up_date  DATE,
  quote_value     NUMERIC(10, 2),

  -- Analytics (privacy-safe)
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  ip_hash         TEXT,  -- SHA-256 of IP + salt, never the raw IP
  user_agent_type TEXT,  -- 'mobile' | 'desktop' | 'tablet'
  page_referrer   TEXT
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON public.leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABLE: lead_activities (CRM activity log)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  lead_id     UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('email','visit','quote_sent','status_change','note')),
  content     TEXT,
  created_by  TEXT DEFAULT 'binu'
);

-- ============================================================
-- TABLE: page_views (basic, cookieless analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.page_views (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  path        TEXT NOT NULL,
  referrer    TEXT,
  device_type TEXT,
  session_id  TEXT
);

-- ============================================================
-- ROW LEVEL SECURITY — lock everything down
-- ============================================================
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Leads: service_role only (the API uses the service-role key).
DROP POLICY IF EXISTS "service_role_only_leads" ON public.leads;
CREATE POLICY "service_role_only_leads"
  ON public.leads FOR ALL
  TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role_only_activities" ON public.lead_activities;
CREATE POLICY "service_role_only_activities"
  ON public.lead_activities FOR ALL
  TO service_role USING (true) WITH CHECK (true);

-- Page views: allow anonymous inserts for cookieless analytics.
DROP POLICY IF EXISTS "anon_insert_views" ON public.page_views;
CREATE POLICY "anon_insert_views"
  ON public.page_views FOR INSERT
  TO anon WITH CHECK (true);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON public.lead_activities(lead_id);

CREATE TYPE public.app_role AS ENUM ('admin', 'recruiter');
CREATE TYPE public.application_status AS ENUM ('new', 'reviewing', 'shortlisted', 'interview', 'declined', 'hired');

CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 120),
  employer_label text NOT NULL CHECK (char_length(employer_label) BETWEEN 2 AND 120),
  category text NOT NULL,
  work_arrangement text NOT NULL CHECK (work_arrangement IN ('Remote', 'Hybrid', 'On-site')),
  country text NOT NULL,
  employment_type text NOT NULL,
  experience_level text NOT NULL,
  salary_range text,
  summary text NOT NULL CHECK (char_length(summary) <= 500),
  description text NOT NULL CHECK (char_length(description) <= 5000),
  responsibilities text[] NOT NULL DEFAULT '{}',
  requirements text[] NOT NULL DEFAULT '{}',
  preferred_qualifications text[] NOT NULL DEFAULT '{}',
  application_deadline date,
  is_published boolean NOT NULL DEFAULT false,
  is_sample boolean NOT NULL DEFAULT true,
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.jobs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.jobs TO authenticated;
GRANT ALL ON public.jobs TO service_role;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published jobs are publicly readable" ON public.jobs FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id) ON DELETE RESTRICT,
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text CHECK (char_length(phone) <= 40),
  country text NOT NULL CHECK (char_length(country) BETWEEN 2 AND 100),
  current_location text CHECK (char_length(current_location) <= 160),
  linkedin_url text CHECK (char_length(linkedin_url) <= 500),
  portfolio_url text CHECK (char_length(portfolio_url) <= 500),
  years_experience text CHECK (char_length(years_experience) <= 60),
  highest_qualification text CHECK (char_length(highest_qualification) <= 160),
  relevant_skills text CHECK (char_length(relevant_skills) <= 1500),
  cover_letter text CHECK (char_length(cover_letter) <= 5000),
  additional_information text CHECK (char_length(additional_information) <= 3000),
  resume_path text NOT NULL,
  resume_name text NOT NULL CHECK (char_length(resume_name) <= 255),
  resume_mime text NOT NULL,
  consent_confirmed boolean NOT NULL CHECK (consent_confirmed = true),
  status public.application_status NOT NULL DEFAULT 'new',
  recruiter_notes text CHECK (char_length(recruiter_notes) <= 5000),
  archived boolean NOT NULL DEFAULT false,
  email_delivery_status text NOT NULL DEFAULT 'pending',
  submitted_ip_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Recruiters can read applications" ON public.applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Recruiters can update applications" ON public.applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Recruiters can manage jobs" ON public.jobs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Recruiters can read private resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'applicant-resumes' AND (public.has_role(auth.uid(), 'recruiter') OR public.has_role(auth.uid(), 'admin')));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER jobs_set_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER applications_set_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX applications_job_id_idx ON public.applications(job_id);
CREATE INDEX applications_status_idx ON public.applications(status, archived, created_at DESC);
CREATE INDEX applications_email_idx ON public.applications(lower(email));
CREATE INDEX jobs_public_idx ON public.jobs(is_published, posted_at DESC);
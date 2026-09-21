DROP POLICY "Recruiters can read applications" ON public.applications;
DROP POLICY "Recruiters can update applications" ON public.applications;
DROP POLICY "Recruiters can manage jobs" ON public.jobs;
DROP POLICY "Recruiters can read private resumes" ON storage.objects;

CREATE POLICY "Recruiters can read applications" ON public.applications FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin')));
CREATE POLICY "Recruiters can update applications" ON public.applications FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin')));
CREATE POLICY "Recruiters can manage jobs" ON public.jobs FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin')));
CREATE POLICY "Recruiters can read private resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'applicant-resumes' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('recruiter', 'admin')));

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
DROP FUNCTION public.has_role(uuid, public.app_role);
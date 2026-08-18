-- FIX 1: prevent achievement forgery
DROP POLICY IF EXISTS "Insert own achievements" ON public.user_achievements;
REVOKE INSERT ON public.user_achievements FROM authenticated;

-- FIX 2: progress rows only for lessons the user may access
DROP POLICY IF EXISTS "Manage own progress" ON public.progress;
CREATE POLICY "Manage own progress" ON public.progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.lessons l
      WHERE l.id = progress.lesson_id
        AND (
          l.is_free
          OR private.has_active_subscription(auth.uid())
          OR private.has_role(auth.uid(), 'admin'::app_role)
        )
    )
  );

-- FIX 3: lock profiles.email against client overwrite
CREATE OR REPLACE FUNCTION private.lock_profile_email()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.email := OLD.email;
  RETURN NEW;
END; $$;

REVOKE ALL ON FUNCTION private.lock_profile_email() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS protect_profile_email ON public.profiles;
CREATE TRIGGER protect_profile_email
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION private.lock_profile_email();

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM public, anon;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

ALTER FUNCTION public.has_role(uuid, app_role) SET SCHEMA private;
ALTER FUNCTION public.has_active_subscription(uuid) SET SCHEMA private;
ALTER FUNCTION public.handle_new_user() SET SCHEMA private;
ALTER FUNCTION public.update_updated_at_column() SET SCHEMA private;

ALTER FUNCTION private.has_role(uuid, app_role) SET search_path = public;
ALTER FUNCTION private.has_active_subscription(uuid) SET search_path = public;
ALTER FUNCTION private.handle_new_user() SET search_path = public;
ALTER FUNCTION private.update_updated_at_column() SET search_path = public;

REVOKE ALL ON FUNCTION private.has_role(uuid, app_role) FROM public, anon;
REVOKE ALL ON FUNCTION private.has_active_subscription(uuid) FROM public, anon;
REVOKE ALL ON FUNCTION private.handle_new_user() FROM public, anon, authenticated;
REVOKE ALL ON FUNCTION private.update_updated_at_column() FROM public, anon, authenticated;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION private.has_active_subscription(uuid) TO authenticated, service_role;

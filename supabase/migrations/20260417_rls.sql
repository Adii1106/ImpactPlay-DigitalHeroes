-- Helper function to check if the current user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public."UserProfile" WHERE id = auth.uid()::text AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE "Score" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserPreference" ENABLE ROW LEVEL SECURITY;

-- Score Policies
CREATE POLICY "Users can access their own scores"
ON "Score" FOR ALL USING (auth.uid()::text = "userId" OR is_admin());

-- Subscription Policies
CREATE POLICY "Users can access their own subscriptions"
ON "Subscription" FOR ALL USING (auth.uid()::text = "userId" OR is_admin());

-- User Preferences
CREATE POLICY "Users can access their own preferences"
ON "UserPreference" FOR ALL USING (auth.uid()::text = "userId" OR is_admin());

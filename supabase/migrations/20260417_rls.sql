-- Robust RLS Policies with Cleanup
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can access their own scores" ON "Score";
    DROP POLICY IF EXISTS "Users can access their own subscriptions" ON "Subscription";
    DROP POLICY IF EXISTS "Users can access their own preferences" ON "UserPreference";
    DROP POLICY IF EXISTS "Anyone can view charities" ON "Charity";
END $$;

-- Enable RLS (Safe to run multiple times)
ALTER TABLE "Score" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserPreference" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Charity" ENABLE ROW LEVEL SECURITY;

-- Score Policies
CREATE POLICY "Users can access their own scores"
ON "Score" FOR ALL USING (auth.uid()::text = "userId");

-- Subscription Policies
CREATE POLICY "Users can access their own subscriptions"
ON "Subscription" FOR ALL USING (auth.uid()::text = "userId");

-- User Preferences
CREATE POLICY "Users can access their own preferences"
ON "UserPreference" FOR ALL USING (auth.uid()::text = "userId");

-- Charity (Public read)
CREATE POLICY "Anyone can view charities"
ON "Charity" FOR SELECT USING (true);

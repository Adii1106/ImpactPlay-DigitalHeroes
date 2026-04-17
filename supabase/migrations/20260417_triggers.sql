-- Auto-Sync Auth User to Profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."UserProfile" (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Safe 5-Score Maximum Trigger (BEFORE INSERT)
CREATE OR REPLACE FUNCTION enforce_score_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user ALREADY has 5 or more scores prior to insert
  IF (SELECT COUNT(*) FROM "Score" WHERE "userId" = NEW."userId") >= 5 THEN
    -- Delete the oldest scores so that the count becomes exactly 4 before the new insertion
    DELETE FROM "Score"
    WHERE id IN (
      SELECT id FROM "Score"
      WHERE "userId" = NEW."userId"
      ORDER BY "playedAt" ASC
      LIMIT (SELECT COUNT(*) - 4 FROM "Score" WHERE "userId" = NEW."userId")
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_score_limit
BEFORE INSERT ON "Score"
FOR EACH ROW
EXECUTE FUNCTION enforce_score_limit();

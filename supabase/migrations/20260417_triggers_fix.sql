-- Fix: Use AFTER INSERT to ensure the NEW score is included in the comparison
DROP TRIGGER IF EXISTS check_score_limit ON "Score";
DROP FUNCTION IF EXISTS enforce_score_limit();

CREATE OR REPLACE FUNCTION enforce_score_limit()
RETURNS TRIGGER AS $$
BEGIN
  -- If the user now has more than 5 scores
  IF (SELECT COUNT(*) FROM "Score" WHERE "userId" = NEW."userId") > 5 THEN
    -- Delete the one with the earliest playedAt
    DELETE FROM "Score"
    WHERE id = (
      SELECT id FROM "Score"
      WHERE "userId" = NEW."userId"
      ORDER BY "playedAt" ASC, "createdAt" ASC
      LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_score_limit
AFTER INSERT ON "Score"
FOR EACH ROW
EXECUTE FUNCTION enforce_score_limit();

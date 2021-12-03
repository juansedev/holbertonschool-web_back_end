-- 9-index_name_score.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates an index idx_name_first_score on the table names and the first letter of name and the score
CREATE INDEX idx_name_first_score ON names (name(1), score);

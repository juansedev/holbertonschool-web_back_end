-- 8-index_my_names.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates an index idx_name_first on the table names and the first letter of name (use EXPLAIN SELECT first to see if there is an index -> Ex. EXPLAIN SELECT title FROM productos WHERE nombre LIKE 'M%';)
ALTER TABLE names ADD INDEX idx_name_first (name(1));

-- 10-div.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Divides (and returns) the first by the second number or returns 0 if the second number is equal to 0.
DROP FUNCTION IF EXISTS SafeDiv;

DELIMITER $$
CREATE
    FUNCTION SafeDiv(a INT, b INT) RETURNS FLOAT
    BEGIN
        IF b = 0 THEN
            RETURN 0;
        ELSE
            RETURN a / b;
        END IF;
    END;
$$

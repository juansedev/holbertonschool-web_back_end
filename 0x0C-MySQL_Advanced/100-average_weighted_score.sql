-- 100-average_weighted_score.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates a stored procedure that computes and store the average weighted score for a student.
DROP PROCEDURE IF EXISTS ComputeAverageWeightedScoreForUser;
DELIMITER $$
CREATE
    PROCEDURE ComputeAverageWeightedScoreForUser(
        IN user_id INT
    )
    BEGIN
        DECLARE avg_weighted_scr FLOAT;
        SELECT SUM(score * weight) / SUM(weight)
        FROM users
        JOIN corrections ON users.id = corrections.user_id
        JOIN projects ON projects.id = corrections.project_id
        WHERE users.id = user_id INTO @avg_weighted_scr;

        UPDATE users
        SET average_score = @avg_weighted_scr
        WHERE id = user_id;
    END;
$$

-- 100-average_weighted_score.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates a stored procedure that computes and store the average weighted score for a student.
DROP PROCEDURE IF EXISTS ComputeAverageWeightedScoreForUser;
DELIMITER $$
CREATE
    PROCEDURE ComputeAverageWeightedScoreForUser(
        IN user_id INT
    )
    BEGIN
        UPDATE users
        SET average_score = (
            SELECT SUM(score * projects.weight) / SUM(projects.weight)
            FROM corrections
            JOIN projects ON projects.id = corrections.project_id
            WHERE corrections.user_id = user_id
        )
        WHERE users.id = user_id;
    END;
$$

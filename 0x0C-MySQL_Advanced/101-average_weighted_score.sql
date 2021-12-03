-- 101-average_weighted_score.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates a stored procedure that computes and store the average weighted score for all students.
DROP PROCEDURE IF EXISTS ComputeAverageWeightedScoreForUsers;
DELIMITER $$
CREATE
    PROCEDURE ComputeAverageWeightedScoreForUsers()
    BEGIN
        UPDATE users
        SET average_score = (
            SELECT SUM(score * projects.weight) / SUM(projects.weight)
            FROM corrections
            JOIN projects ON projects.id = corrections.project_id
            WHERE corrections.user_id = users.id
        );
    END;
$$

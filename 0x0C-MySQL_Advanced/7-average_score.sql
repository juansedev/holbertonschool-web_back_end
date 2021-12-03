-- 7-average_score.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
--  Computes and store the average score for a student
DELIMITER $$
CREATE
    PROCEDURE ComputeAverageScoreForUser (
        IN user_id INT
    )
BEGIN
    SELECT AVG(score) INTO @avr_score FROM corrections
    WHERE
        corrections.user_id = user_id;

    UPDATE users
    SET
        average_score = @avr_score
    WHERE
        id = user_id;
END;
$$

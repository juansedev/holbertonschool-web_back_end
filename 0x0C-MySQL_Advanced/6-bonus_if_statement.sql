-- 6-bonus.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
--  Creates a stored procedure `AddBonus` that adds a new correction for a student.
DELIMITER $$
CREATE
    PROCEDURE AddBonus (
        IN user_id INT,
        IN project_name VARCHAR(255),
        IN score FLOAT
    )
BEGIN
    IF (SELECT COUNT(*) FROM projects WHERE name = project_name) = 0
    THEN
        INSERT INTO projects (name) VALUES (project_name);
    END IF;

    SELECT id INTO @proj_id FROM projects WHERE name = project_name;
    
    INSERT INTO corrections (user_id, project_id, score)
    VALUES (user_id, @proj_id, score);
END;
$$

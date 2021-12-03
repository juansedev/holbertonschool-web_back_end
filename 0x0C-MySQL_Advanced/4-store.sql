-- 4-store.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Creates a trigger that decreases the quantity of an item after adding a new order
DELIMITER $$
CREATE
    TRIGGER decreases_items_quantity AFTER INSERT ON orders
    FOR EACH ROW
        BEGIN
        UPDATE items
            SET quantity = quantity - NEW.number
            WHERE name = NEW.item_name;
        END;
$$
DELIMITER ;

-- 3-glam_rock.sql / 0x0C. MySQL advanced /  Web Stack programming ― Back-end
-- Lists all bands with `Glam rock` as their main style, ranked by their longevity
SELECT band_name, IFNULL(split, 2020) - formed AS lifespan
FROM metal_bands
WHERE style LIKE '%Glam rock%'
ORDER BY lifespan DESC;

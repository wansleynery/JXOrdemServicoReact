WITH OTRS AS (
    SELECT 1 AS \"value\", 'Alta'     AS \"label\" FROM DUAL UNION ALL
    SELECT 2 AS \"value\", 'Normal'   AS \"label\" FROM DUAL UNION ALL
    SELECT 3 AS \"value\", 'Baixa'    AS \"label\" FROM DUAL)
    
SELECT
    *
FROM
    OTRS

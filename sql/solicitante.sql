SELECT
    CODUSU AS \"value\",
    CODUSU || '. ' || NOMEUSU AS \"label\"
    
FROM
    TSIUSU
    
WHERE
    CODUSU > 0
    
ORDER BY
    CODUSU
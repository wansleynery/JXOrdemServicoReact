SELECT DISTINCT 
    TSIUSU.CODUSU AS \"value\", 
    TSIUSU.NOMEUSU || ' ' || TSIUSU2.NOMEUSU AS \"label\" 
FROM 
    TCSRUS 
    INNER JOIN TSIUSU 
        ON TSIUSU.CODUSU = TCSRUS.CODUSU 
    LEFT JOIN TCSRUS TCSRUS2 
        ON TCSRUS2.CODUSU = TCSRUS.CODUSUREL 
        AND TCSRUS2.TIPO = 'G' 
    LEFT JOIN TSIUSU TSIUSU2 
        ON TSIUSU2.CODUSU = TCSRUS2.CODUSU 
WHERE 
    TCSRUS.TIPO = 'F' 
    AND ROWNUM < 100 
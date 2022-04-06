SELECT
    CODTIPO as \"value\",
    CODTIPO || '. ' || DESCRICAO || ' (Fila: ' || CODFILA || ')' AS \"label\"
    
FROM
    CCSTIPATE
    
ORDER BY
    CODTIPO
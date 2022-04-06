SELECT
    ID AS \"value\",
    ID || ' - ' || DESCRICAO AS \"label\",
    ID,
    DESCRICAO
    
FROM
    AD_OCORRENCIA
    
WHERE ROWNUM < 10
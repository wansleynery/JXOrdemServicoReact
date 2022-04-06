SELECT
    prod.CODPROD AS SERVICO
    
FROM
    CCSTIPATE tipo
    INNER JOIN TGFPRO prod ON tipo.CODPROD = prod.CODPROD
    
WHERE
    tipo.CODTIPO = '%tipo'
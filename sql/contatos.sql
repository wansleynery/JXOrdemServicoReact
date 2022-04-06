SELECT DISTINCT
    ctt.CODCONTATO || '. ' || NOMECONTATO AS \"label\",
    ctt.CODCONTATO AS \"value\"
    
FROM
    TGFCTT ctt
    INNER JOIN TGFPAR par ON par.CODPARC = ctt.CODPARC
    
WHERE 1 = 1
    AND par.NOMEPARC = '%parceiro'
    AND ctt.ATIVO = 'S'
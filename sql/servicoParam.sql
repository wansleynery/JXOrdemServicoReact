SELECT
    nvl (pro.CODPROD, 0) AS SERVICO
    
FROM
    TGFPRO pro
    LEFT JOIN TSIPAR par ON par.INTEIRO = pro.CODPROD
    
WHERE
    par.CHAVE = 'CODSERVLABM7'
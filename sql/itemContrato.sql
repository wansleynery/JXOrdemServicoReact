 SELECT
    TSIPAR.INTEIRO AS CODPROD,
    TGFPRO.CODVOL,
    TGFEXC.VLRVENDA

 FROM
    TSIPAR
    INNER JOIN TGFPRO ON TGFPRO.CODPROD = TSIPAR.INTEIRO
    INNER JOIN TGFEXC ON TGFEXC.CODPROD = TGFPRO.CODPROD

 WHERE
    TSIPAR.CHAVE = 'CODSERVLABM7'
    AND TSIPAR.CODUSU = 0
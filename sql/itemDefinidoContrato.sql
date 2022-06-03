SELECT
    pro.CODPROD                 AS CODPROD,
    pro.CODVOL                  AS CODVOL,
    pro.CODLOCALPADRAO          AS CODLOCALORIG,
    nvl (exc.VLRVENDA, 1)       AS VLRUNIT, 
    nvl (excTGFEXC.VLRVENDA, 1) AS VLRTOT, 
    1                           AS SEQUENCIA,
    1                           AS QTDNEG

 FROM
    TCSCON cont
    INNER JOIN TGFPAR par ON par.CODPARC = cont.CODPARC
    INNER JOIN TCSPSC psc ON psc.NUMCONTRATO = cont.NUMCONTRATO
    INNER JOIN TGFPRO pro ON pro.CODPROD = psc.CODPROD
     LEFT JOIN TGFEXC exc ON exc.CODPROD = pro.CODPROD
    
 WHERE 1 = 1
    AND pro.AD_IDEQUIPAMENTO = %id
SELECT
    cont.NUMCONTRATO AS \"value\",
    SUBSTR (parc.RAZAOSOCIAL, 0, 25) || ' - ' || pro.DESCRPROD || ' (' || cont.DTCONTRATO || ')' AS \"label\"

 FROM
    TCSCON cont
    INNER JOIN TGFPAR parc ON parc.CODPARC = cont.CODPARC
    INNER JOIN TCSPSC psc ON psc.NUMCONTRATO = cont.NUMCONTRATO
    INNER JOIN TGFPRO pro ON pro.CODPROD = psc.CODPROD
    
 WHERE 1 = 1
    AND pro.AD_IDEQUIPAMENTO = '%equipamento'

 UNION ALL

 SELECT
    -1 AS \"value\",
    'Nenhum' AS \"label\"

 FROM DUAL

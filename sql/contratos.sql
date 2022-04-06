SELECT
    cont.NUMCONTRATO AS \"value\",
    SUBSTR (parc.RAZAOSOCIAL, 0, 25) || ' - ' || pro.DESCRPROD || ' (' || cont.DTCONTRATO || ')' AS \"label\"
    
FROM
    TCSCON cont
    INNER JOIN TGFPAR parc ON parc.CODPARC = cont.CODPARC
    INNER JOIN TCSPSC psc ON psc.NUMCONTRATO = cont.NUMCONTRATO
    INNER JOIN TGFPRO pro ON pro.CODPROD = psc.CODPROD
    LEFT JOIN AD_EQUIPAMENTO eq ON eq.ID = cont.AD_ID
    
WHERE 1 = 1
    AND pro.USOPROD = 'S'
    AND eq.ID = '%equipamento'
SELECT DISTINCT
    NOMEPARC as \"label\",
    CODPARC as \"value\"
    
FROM
    TGFPAR par
    INNER JOIN AD_EQUIPAMENTO eq ON eq.CODPARCCLI = par.CODPARC
    
WHERE 1 = 1
    AND (
           CODPARC LIKE '%%info%'
        OR CGC_CPF LIKE '%%info%'
        OR NOMEPARC LIKE UPPER ('%%info%')
        OR RAZAOSOCIAL LIKE UPPER ('%%info%')
    )
    AND ROWNUM < 100
    
ORDER BY
    CODPARC
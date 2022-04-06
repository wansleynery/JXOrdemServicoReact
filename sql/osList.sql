SELECT
    NVL (ose.numos, -1) AS ID_OS,
    NVL (TO_CHAR (ose.dhchamada, 'dd/mm/yyyy'), '31/12/1999') AS DATA_OS,
    NVL (ose.codparc, -1) AS ID_PARCEIRO,
    NVL (par.nomeparc, '[SEM NOME]') AS NOME_PARCEIRO,
    NVL (ose.ad_idequipamento, -1) AS ID_EQUIPAMENTO,
    NVL (equi.descricao, '[SEM DESCRIÇÃO]') AS NOME_EQUIPAMENTO,
    NVL (equi.controle, '[SEM CONTROLE]') AS SERIE_EQUIPAMENTO
    
FROM
    tcsose ose
    INNER JOIN tgfpar par ON par.codparc = ose.codparc
    INNER JOIN ad_equipamento equi ON equi.id = ose.ad_idequipamento
    
WHERE
    ose.situacao = 'P' AND
    (
        ose.numos LIKE '%%dados%'
        OR ose.codparc LIKE '%%dados%'
        OR ose.ad_idequipamento LIKE '%%dados%'
        OR UPPER (equi.descricao) LIKE UPPER ('%%dados%')
        OR UPPER (equi.controle) LIKE UPPER ('%%dados%')
        OR UPPER (par.nomeparc) LIKE UPPER ('%%dados%')
    )
    AND ROWNUM < 11
    
ORDER BY
    ose.numos
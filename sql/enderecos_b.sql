SELECT null AS CODIGO, null AS ENDERECO, null AS COMPLEMENTO, null AS BAIRRO, null AS CEP, null AS CIDADE, null AS UF FROM DUAL UNION ALL 

SELECT
    edrequ.CODEND AS CODIGO,
    edr.TIPO || ' ' || edr.NOMEEND || ', ' || NVL (edrequ.NUMEND, '[SN]') AS ENDERECO,
    edr.DESCRICAOCORREIO AS COMPLEMENTO,
    bai.NOMEBAI AS BAIRRO,
    edrequ.CEP,
    UPPER (cid.NOMECID) AS CIDADE,
    ufs.UF
    
FROM
    AD_ENDERECOEQUIPAMENTO edrequ
    INNER JOIN TSIEND edr ON edr.CODEND = edrequ.CODEND
    INNER JOIN TSICID cid ON cid.CODCID = edrequ.CODCID
    INNER JOIN TSIUFS ufs ON ufs.CODUF = cid.UF
    LEFT JOIN TSIBAI bai ON bai.CODBAI = edrequ.CODBAI
    
WHERE 1 = 1
    AND edrequ.ID = '%endereco'
    AND edrequ.ATIVO = 'S'
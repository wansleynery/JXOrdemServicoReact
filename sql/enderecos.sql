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
    AND edrequ.ID = %equipamento
    AND edrequ.ATIVO = 'S'
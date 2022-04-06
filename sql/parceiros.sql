SELECT
    CODPARC AS CODIGO,
    NOMEPARC AS PARCEIRO,
    CASE
        WHEN (LENGTH (CGC_CPF) < 12)
        THEN NVL (SUBSTR (CGC_CPF, 1, 3), '***') || '.' || NVL (SUBSTR (CGC_CPF, 4, 3), '***') || '.' || NVL (SUBSTR (CGC_CPF, 7, 3), '***') || '-' || NVL (SUBSTR (CGC_CPF, 10, 2), '**')
        ELSE NVL (SUBSTR (CGC_CPF, 1, 2), '**') || '.' || NVL (SUBSTR (CGC_CPF, 3, 3), '***') || '.' || NVL (SUBSTR (CGC_CPF, 6, 3), '***') || '/' || NVL (SUBSTR (CGC_CPF, 9, 4), '****') || '-' || NVL (SUBSTR (CGC_CPF, 13, 2), '**')
    END AS DOCUMENTO,
    CASE
        WHEN (LENGTH (TELEFONE) > 10)
        THEN (
            NVL (SUBSTR (TELEFONE, 1, 2), '**') || ' ' || NVL (SUBSTR (TELEFONE, 3, 5), '*****') || '-' || NVL (SUBSTR (TELEFONE, 8, 4), '****')
        )
        ELSE (
            NVL (SUBSTR (TELEFONE, 1, 2), '**') || ' ' || NVL (SUBSTR (TELEFONE, 3, 4), '****') || '-' || NVL (SUBSTR (TELEFONE, 7, 4), '****')
        )
    END AS TELEFONE,
    CEP,
    CODEND AS ENDERECO,
    NUMEND AS NUMERO,
    CODBAI AS BAIRRO,
    CODCID AS CIDADE
    
FROM
    TGFPAR
    
WHERE
    ATIVO = 'S'
    AND CLIENTE = 'S'
    AND CODPARC <> 0
    AND %parceiro
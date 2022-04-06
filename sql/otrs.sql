WITH OTRS AS (
    SELECT 'CMO' AS \"value\", 'Contrato Mao de Obra (CMO)'   AS \"label\" FROM DUAL UNION ALL
    SELECT 'CP'  AS \"value\", 'Contrato Pecas (CP)'          AS \"label\" FROM DUAL UNION ALL
    SELECT 'EV'  AS \"value\", 'Eventual (EV)'                AS \"label\" FROM DUAL UNION ALL
    SELECT 'GF'  AS \"value\", 'Garantia Fabricante (GF)'     AS \"label\" FROM DUAL UNION ALL
    SELECT 'GM'  AS \"value\", 'Garantia Microset (GM)'       AS \"label\" FROM DUAL UNION ALL
    SELECT 'PAR' AS \"value\", 'Parceria (PAR)'               AS \"label\" FROM DUAL UNION ALL
    SELECT 'PAT' AS \"value\", 'Patrimonio (PAT)'             AS \"label\" FROM DUAL UNION ALL
    SELECT 'PRO' AS \"value\", 'Projeto (PRO)'                AS \"label\" FROM DUAL)
    
SELECT
    *
FROM
    OTRS

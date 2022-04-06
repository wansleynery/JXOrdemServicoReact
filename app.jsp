<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8" isELIgnored ="false"%>
<%@ page import="br.com.sankhya.modelcore.auth.AuthenticationInfo" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<!DOCTYPE html>
<html lang="en-US">

    <head>
		<snk:load />
        <meta charset="UTF-8" />
        <title></title>

        <!-- CSS -->
        <style>
            @font-face { font-family: 'ubuntu'; src: url('${BASE_FOLDER}/css/ubuntu.ttf') format('truetype'); }
        </style>
        <link href="${BASE_FOLDER}/css/roboto.css" rel="stylesheet" />
        <link href="${BASE_FOLDER}/css/bootstrap.min.css" rel="stylesheet" />
        <link href="${BASE_FOLDER}/css/semantic.min.css" rel="stylesheet" />
        <link href="${BASE_FOLDER}/css/sweetalert2.min.css" rel="stylesheet" />
        <link href="${BASE_FOLDER}/css/toastr.min.css" rel="stylesheet" />
        <link href="${BASE_FOLDER}/css/main.less" rel="stylesheet/less" />

        <!-- Utilitarios -->

        <!-- React -->
        <script src="${BASE_FOLDER}/js/utils/react.js"></script>
        <script src="${BASE_FOLDER}/js/utils/react-dom.js"></script>
        <script src="${BASE_FOLDER}/js/utils/material-ui.min.js"></script>
        <!-- React -->

        <script src="${BASE_FOLDER}/js/utils/babel.min.js"></script>
        <script src="${BASE_FOLDER}/js/utils/less.min.js"></script>
        <script src="${BASE_FOLDER}/js/utils/sweetalert2.min.js"></script>
        <script src="${BASE_FOLDER}/js/utils/jquery.min.js"></script>
        <script src="${BASE_FOLDER}/js/utils/semantic.min.js"></script>
        <script src="${BASE_FOLDER}/js/utils/toastr.min.js"></script>

        <!-- Comunicador com o backend -->
        <script src="${BASE_FOLDER}/js/utils/jxutils.prod.js"></script>
        <script defer src="${BASE_FOLDER}/js/main.js"></script>

        <!-- Inicializacao de Variaveis Uteis -->
        <script defer>
            const open = openLevel;
            const query = (new QueryJX);
            const host = (new HostJX);

            const globalFullUrl = host.getURL () + '/mge/${BASE_FOLDER}';
            const userID = '<%= ((AuthenticationInfo) session.getAttribute ("usuarioLogado")).getUserID ().toString () %>';
        </script>

        <!-- React Components -->
        <script defer src="${BASE_FOLDER}/js/components/native/selectable.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/flybutton.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/textarea.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/select.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/slider.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/popup.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/group.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/input.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/icon.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/native/grid.jsx" type="text/babel"></script>

        <script defer src="${BASE_FOLDER}/js/components/grupos/equipamento.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/grupos/descricao.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/grupos/tecnicos.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/grupos/endereco.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/grupos/geral.jsx" type="text/babel"></script>
        
        <script defer src="${BASE_FOLDER}/js/components/form.jsx" type="text/babel"></script>
        <script defer src="${BASE_FOLDER}/js/components/app.jsx" type="text/babel"></script>

    </head>

    <body>

        <div id="react"></div>

    </body>

</html>
class App extends React.Component {

    constructor (props) {
        super (props);
    }

    componentDidMount () {

        // Carrega o arquivo de detalhes de configuracao
        host.loadFile (`${ globalFullUrl }js/config.json`).then (configResponse => {

            // Verifica se há alguma etapa definida
            if ((JSON.parse (configResponse)).etapas) {

                // Busca todos os tipos de credencial validas para acesso a tela
                let acessos =
                    (JSON.parse (configResponse)).etapas.filter (etapa => etapa.id === 'preatendimento') [0].
                        itens.filter (item => item.id === 'createOS') [0].credencial;

                // Carrega o arquivo com a query para acesso da credencial
                host.loadFile (`${ globalFullUrl }sql/acesso.sql`).then (acessoResponse =>

                    // Verifica a credencial atual do usuário logado
                    query.select (acessoResponse.format ({ id: userID })).then (usuarioAcesso => {

                        // Checka se o usuário atual possui a permissão para entrar
                        if (!acessos.includes (usuarioAcesso [0].ACESSO)) {

                            // Nao possuindo, mostra um aviso e sai da tela
                            Swal.fire ({
                                button: false,
                                closeOnClickOutside: false,
                                closeOnEsc: false,
                                title: 'Encontramos um problema...',
                                text: 'Infelizmente, Voce nao possui credenciais de acesso a essa tela. Esta aba fechara em instantes...',
                                icon: 'error'
                            });

                            setTimeout (() => host.closeTab (), 5000);
                        }

                    })
                );

            }
        });

    }

    render () {
        return (
            <div id= { 'managerContainer' } >
                <Form />
            </div>
        );
    }

    openLink (link, options) {
        openApp (link, options);
    }
}

ReactDOM.render (<App />, document.querySelector ('#react'));
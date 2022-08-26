class Form extends React.Component {

    constructor (props) {
        super (props);

        this.state = {

            loading         : false,
            isSaved         : false,
            equipamento     : undefined,

            invoiceID       : -1,
            contrato        : -1,
            contato         : -1,
            clienteEscolhido: -1,
            clienteLista    : [],
            contatoLista    : []

        };
        this.geralRef       = React.createRef ();
        this.equipamentoRef = React.createRef ();
        this.enderecoRef    = React.createRef ();
        this.descricaoRef   = React.createRef ();

        this.saveServiceOrder = this.saveServiceOrder.bind (this);
        this.errorTreatment = this.errorTreatment.bind (this);
        this.createInvoice = this.createInvoice.bind (this);
        this.getParceiros = this.getParceiros.bind (this);

    }

    componentDidMount () {

        this.clearForm ();

        globalThis.clearLabel = () => {
            let selector1 = '#managerContainer > div > div:nth-child(1) > div > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root > div > div > div > div > div > div:nth-child(5) > div.MuiAutocomplete-root.MuiAutocomplete-hasClearIcon.MuiAutocomplete-hasPopupIcon.css-1kpdewa-MuiAutocomplete-root > div > div > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator';
            let selector2 = '#managerContainer > div > div.float-left.w-50 > div > div.MuiCollapse-root.MuiCollapse-vertical.MuiCollapse-entered.css-pwcg7p-MuiCollapse-root > div > div > div > div > div > div.input-group.mb-3.select-contatos > div.MuiAutocomplete-root.MuiAutocomplete-hasClearIcon.MuiAutocomplete-hasPopupIcon.css-1kpdewa-MuiAutocomplete-root > div > div > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator';
    
            document.querySelector (selector1) && document.querySelector (selector1).click ();
            document.querySelector (selector2) && document.querySelector (selector2).click ();

            this.setState ({
                contato: -1,
                contrato: -1
            });
        }

    }

    render () {

        return (
            <div>
                {
                    this.state.loading &&
                    <div className= { 'loaderContainer' }>
                        <div className= { 'loaderBG' }>
                            <CircularProgress />
                        </div>
                    </div>
                }

                <Group expanded
                    title= { 'Dados do Equipamento' }
                    component= { GrupoEquipamento }
                    forwardedRef= { this.equipamentoRef }
                    callback= { this.getParceiros }
                    clearForm= { () => this.clearForm () }
                />

                <Group expanded
                    title= { 'Dados Gerais' }
                    component= { GrupoGeral }
                    cliente= {
                        this.state.clienteLista.length > 0
                        && this.state.clienteEscolhido > 0
                            ? this.state.clienteLista.filter (cli =>
                                Number (cli.CODIGO) == this.state.clienteEscolhido) [0].PARCEIRO
                            : ''
                    }
                    idCliente= {
                        this.state.clienteLista.length > 0
                        && this.state.clienteEscolhido > 0
                            ? this.state.clienteLista.filter (cli =>
                                Number (cli.CODIGO) == this.state.clienteEscolhido) [0].CODIGO
                            : ''
                    }
                    documento= {
                        this.state.clienteLista.length > 0
                        && this.state.clienteEscolhido > 0
                            ? this.state.clienteLista.filter (cli =>
                                Number (cli.CODIGO) == this.state.clienteEscolhido) [0].DOCUMENTO
                            : ''
                    }
                    telefone= {
                        this.state.clienteLista.length > 0
                        && this.state.clienteEscolhido > 0
                            ? this.state.clienteLista.filter (cli =>
                                Number (cli.CODIGO) == this.state.clienteEscolhido) [0].TELEFONE
                            : ''
                    }
                    contatos= { this.state.contatoLista }
                    refresh= { this.refreshContato.bind (this) }
                    contatoAtual= { this.state.contato }
                    forwardedRef= { this.geralRef }
                />

                <Group expanded
                    title= { 'Dados da Ocorrência' }
                    component= { GrupoDescricao }
                    forwardedRef= { this.descricaoRef }
                />

                <FlyButton primary extended
                    disabled= { this.state.isSaved }
                    title= { 'Salvar' }
                    path= { 'M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z' }
                    tooltip= { this.state.isSaved ? 'Formulário já salvo!' : 'Criar nova Ordem de Serviço' }

                    onClick= { this.saveServiceOrder }
                />

                <FlyButton secondary extended
                    disabled= { this.state.isSaved }
                    title= { 'Cancelar' }
                    path= { 'M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z' }
                    tooltip= { 'Fechar tela' }

                    onClick= { () => host.closeTab () }
                />

            </div>
        );
    }

    getParceiros (equipamento) {
        if (equipamento != this.state.equipamento)
            this.setState ({ equipamento: equipamento });

        host.loadFile (`${ globalFullUrl }sql/parceiros.sql`).then (parceiroQuery =>
            query.select (parceiroQuery.format ({
                parceiro: equipamento ? `NOMEPARC = '${ equipamento.CLIENTE }'` : '1 = 1'
            })).then (parceiros => {
                this.setState ({
                    clienteLista: parceiros,
                    clienteEscolhido: equipamento.CODCLIENTE,

                    contrato: -1,
                    contato: -1
                });

                this.getContatos (equipamento.CLIENTE);
            })
        );
    }

    getContatos (parceiro) {
        this.setState ({ contatoLista: [] });

        host.loadFile (`${ globalFullUrl }sql/contatos.sql`).then (contatoQuery =>
            query.select (contatoQuery.format ({ parceiro: parceiro })).
                then (contatos => this.setState ({ contatoLista: contatos }))
        );
    }

    refreshContato () {
        if (this.state.equipamento) {
            this.getParceiros (this.state.equipamento);
        }
    }



    async createInvoice (stateFiltered, parameters) {

        const nota = {
            CODPARC     : stateFiltered.clienteEscolhido,
            DTNEG       : stateFiltered.dataEscolhida,
            CODTIPOPER  : parameters.ORCAMENTO_TIPO_OPERACAO,
            CODTIPVENDA : parameters.ORCAMENTO_TIPO_VENDA,
            CODNAT      : parameters.ORCAMENTO_NATUREZA,
            CODVEND     : undefined,
            CODEMP      : parameters.EMPRESA,
            TIPMOV      : parameters.ORCAMENTO_TIPO_MOVIMENTO,
            ITENS       : []
        }

        if (stateFiltered.contratoEscolhido)
            nota.NUMCONTRATO = stateFiltered.contratoEscolhido;

        let idInvoice = (await query.save (nota, 'nota')).pk.NUNOTA.$;
        let response = null;

        if (stateFiltered.contratoEscolhido) {
            const queryContract = await host.loadFile (`${ globalFullUrl }sql/itemDefinidoContrato.sql`);
            response = await query.select (queryContract.format ({ id: stateFiltered.equipamentoEscolhido }));
        } else {
            const queryContract = await host.loadFile (`${ globalFullUrl }sql/itemContrato.sql`);
            response = await query.select (queryContract);
        }

        await query.save ({
            NUNOTA      : idInvoice,
            SEQUENCIA   : response [0].SEQUENCIA,
            CODPROD     : response [0].CODPROD,
            CODVOL      : response [0].CODVOL,
            QTDNEG      : response [0].QTDNEG,
            VLRUNIT     : response [0].VLRUNIT,
            VLRTOT      : response [0].VLRTOT
        }, 'ItemNota');

        return idInvoice;
    }



    async confirmInvoice (idInvoice) {

        const response = await fetch (`${
                window.location.origin.replace ('mge/', '/')
            }/mgecom/service.sbr?serviceName=ServicosNfeSP.confirmarNotas&outputType=json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify ({
                serviceName: "ServicosNfeSP.confirmarNotas",
                requestBody: {
                    notas: {
                        confirmacaoPortal         : true,
                        aprovarNFeNFSe            : false,
                        confirmacaoCentralNota    : true,
                        pedidoWeb                 : false,
                        atualizaPrecoItemPedCompra: false,
                        resourceID                : "br.com.sankhya.mgecom.mov.selecaodedocumento",
                        ownerServiceCall          : "SelecaoDocumento",
                        nunota                    : [ { "$": idInvoice } ],
                        txProperties              : { prop: [] }
                    }
                }
            })
        });

        if (response.status == 200) {
            await query.save ({ AD__APROVADO_PORTAL: 'S' }, 'nota', { NUNOTA: idInvoice });
        }

        return idInvoice;
    }



    refinedState () {

        const newState = {
            clienteEscolhido: this.state.clienteEscolhido,

            ...this.geralRef.current ? this.geralRef.current.state : {},
            ...this.equipamentoRef.current ? this.equipamentoRef.current.state : {},
            ...this.enderecoRef.current ? this.enderecoRef.current.state : {},
            ...this.descricaoRef.current ? this.descricaoRef.current.state : {},

            dataEscolhida: new Date ().toSQLDate ()
        };

        let stateFiltered = {};
        let fieldsToIgnore = ['fabricante', 'serie', 'modelo'];

        Object.keys (newState).
            forEach (key => {
                
                if (
                    !key.match (/Lista$/)
                    && !key.match (/Set$/)
                    && !fieldsToIgnore.includes (key)
                    && String (newState [key]).length
                    && Number (newState [key]) != -1
                ) {
                    stateFiltered [key] = newState [key];
                }
            });

        return stateFiltered;
    }



    async saveServiceOrder () {

        let newState = this.refinedState ();

        if (this.validateNewState (newState) === 1) {

            this.setState ({ loading: true });
            
            query.
                select ('select nvl (max (numos), 0) + 1 as id from tcsose').
                then (indexResponse => {
            
                this.getParameters ().then (parametros => {

                    this.createInvoice (newState, parametros).then (async invoiceID => {

                        await this.confirmInvoice (invoiceID);

                        this.setState ({ invoiceID: invoiceID });
                        let date = new Date ().toSQLDate ();

                            let parceiroQuery = await host.loadFile (`${ globalFullUrl }sql/parceiros.sql`);
                            let parceiro = await query.select (parceiroQuery.format ({ parceiro: `CODPARC = '${ newState.clienteEscolhido }'` }));
                            let contato = await query.select (
                                `SELECT NOMECONTATO FROM TGFCTT WHERE CODCONTATO = ${
                                    newState.contatoEscolhido
                                } AND CODPARC = ${
                                    newState.clienteEscolhido
                            }`);

                            let serviceOrder = {

                                NUMOS       : indexResponse [0].ID,
                                CODPARC     : newState.clienteEscolhido,
                                CODCONTATO  : newState.contatoEscolhido,
                                AD_IDEQUIPAMENTO: newState.equipamentoEscolhido,
                                AD_SOLICITANTE: contato && contato.length
                                                    ? contato [0].NOMECONTATO
                                                    : '',
                                AD_MOTIVOSOLICITACAO: newState.ocorrenciaEscolhida,
                                CODCOS      : 1,
                                DHCHAMADA   : date,
                                SITUACAO    : 'P',
                                TIPO        : 'A',
                                CODATEND    : userID,
                                DESCRICAO   : newState.descricao,
                                CODUSURESP  : newState.filaEscolhida
                                              && Number (newState.filaEscolhida) != Number (parametros.FILA_CAMPO_ID)
                                                 ? newState.filaEscolhida
                                                 : parametros.FILA_CAMPO_ID,
                                NUNOTA      : invoiceID,
                                DTPREVISTA  : newState.dataPrevista.toSQLDate (),
                                AD_CODEMP   : newState.empresaEscolhida,
                                AD_CEP      : parceiro [0].CEP,
                                ENDERECO    : parceiro [0].ENDERECO,
                                AD_NUMEND   : parceiro [0].NUMERO,
                                BAIRRO      : parceiro [0].BAIRRO,
                                CIDADE      : parceiro [0].CIDADE

                            }

                            query.save (serviceOrder, 'OrdemServico').then (serviceOrderResponse => {

                                query.
                                    save (
                                        { NUMOS: serviceOrderResponse.NUMOS }, 'nota', { NUNOTA: invoiceID }
                                    ).
                                    catch (error => this.errorTreatment (error));
    
                                let itemServiceOrder = {
                                    NUMOS       : serviceOrderResponse.NUMOS,
                                    NUMITEM     : 1,
                                    CODSERV     : parametros.SERVICO_ID,
                                    CODPROD     : parametros.SERVICO_ID,
                                    GRAUDIFIC   : 0,
                                    RETRABALHO  : 'N',
                                    DHPREVISTA  : newState.dataPrevista.toSQLDate (),
                                    CODUSU      : newState.filaEscolhida
                                                  && Number (newState.filaEscolhida) != Number (parametros.FILA_CAMPO_ID)
                                                     ? newState.filaEscolhida
                                                     : parametros.FILA_CAMPO_ID,
                                    TEMPGASTO   : 0,
                                    COBRAR      : 'N',
                                    CODUSUALTER : userID,
                                    LIBERADO    : 'N',
                                    CODUSUREM   : userID,
                                    DHENTRADA   : date,
                                    CODSIT      : 0,
                                    DTPREVFECHAMENTO: date,
                                    PRIORIDADE  : newState.prioridadeEscolhida,
                                    CODOCOROS   : 1
                                }
        
                                query.save (itemServiceOrder, 'ItemOrdemServico').then (itemServiceOrderResponse => {
        
                                    this.setState ({ loading: false, isSaved: true });
    
                                    query.select ('SELECT NVL (MAX (CODPRODOS), 0) + 1 AS ID FROM CGFPRODOS').then (equipamentoResponse => {

                                        host.loadFile (`${ globalFullUrl }sql/equipamento.sql`).then (equipamentoQuery =>
                                            query.select (equipamentoQuery.format ({ where: `AND eq.ID = ${ newState.equipamentoEscolhido }` })).
                                                then (equipamentos => {
                                                    
                                                    query.save ({
                                                        CODUSUALTER : userID,
                                                        CODUSUREM   : userID,
                                                        CODUSU      : newState.filaEscolhida
                                                                        && Number (newState.filaEscolhida) != Number (parametros.FILA_CAMPO_ID)
                                                                        ? newState.filaEscolhida
                                                                        : parametros.FILA_CAMPO_ID,
                                                        CODSERV     : parametros.SERVICO_ID,
                                                        CODPROD     : parametros.SERVICO_ID,
                                                        CODOCOROS   : 1,
                                                        DHPREVISTA  : newState.dataPrevista.toSQLDate (),
                                                        GRAUDIFIC   : 0,
                                                        RETRABALHO  : 'N',
                                                        COBRAR      : 'N',
                                                        LIBERADO    : 'N',
                                                        CODSIT      : 1,
                                                        NUMOS       : serviceOrderResponse.NUMOS,

                                                        TEMPGASTO   : 0,
                                                        DHENTRADA   : date,
                                                        DTPREVFECHAMENTO: date,
                                                        PRIORIDADE  : newState.prioridadeEscolhida,
                                                    }, 'ItemOrdemServico');

                                                    let equipCGF = {
                                                        CODPRODOS   : equipamentoResponse [0].ID,
                                                        SERIE       : equipamentos [0].SERIE,
                                                        DESCRICAO   : '',
                                                        MODELO      : equipamentos [0].MODELO,
                                                        CODPROD     : 0,
                                                        NUMOS       : serviceOrderResponse.NUMOS,
                                                        TIPO        : 'E',
                                                        CODPRODTEXT : 'E1',
                                                        DTENTRADA   : date,
                                                        RETORNO     : 'N',
                                                        AD_CODCLEQ  : equipamentos [0].FABRICANTE_ID
                                                    }

                                                    query.save (equipCGF, 'ProdutosOSCBM').then (() =>

                                                        Swal.fire ({
                                                            closeOnClickOutside : false,
                                                            closeOnEsc          : false,
                                                            showDenyButton      : false,
                                                            title               : 'Salvamento concluido',
                                                            text                : `A OS ${ itemServiceOrderResponse.NUMOS } foi salva com sucesso.`,
                                                            icon                : 'info',
                                                            confirmButtonText   : `Fechar`
                                                        }).then (_ => setTimeout (() => host.closeTab (), 500))

                                                    ).catch (error => this.errorTreatment (error));
                                                })

                                        );
                                    });
                                }).catch (error => this.errorTreatment (error));
                            });

                    });
                });
            });
        }
    }



    validateNewState (newState) {

        if (!newState.equipamentoEscolhido)
            throw new Error ('Selecione o equipamento do chamado!');

        if (!newState.empresaEscolhida)
            throw new Error ('Selecione a Empresa a faturar o chamado!');

        if (!newState.prioridadeEscolhida)
            throw new Error ('Selecione uma Prioridade para o chamado!');

        if (!newState.ocorrenciaEscolhida)
            throw new Error ('Selecione uma ocorrencia para o chamado!');

        if (!(newState.descricao && newState.descricao.length))
            throw new Error ('Forneça uma descrição para o chamado!');

        if (!newState.contatoEscolhido)
            throw new Error ('Selecione o Contato responsável do Parceiro!');

        return 1;
    }



    async getParameters () {

        const serviceQuery = await host.loadFile (`${ globalFullUrl }sql/parametros.sql`);
        const services = await query.select (serviceQuery);

        let result = {};

        result ['ORCAMENTO_TIPO_MOVIMENTO'] =           services.filter (serv => serv.ORIGEM === 'ORCAMENTOMOVIMENTO')  [0].INTEIRO;
        result ['ORCAMENTO_TIPO_OPERACAO'] =    Number (services.filter (serv => serv.ORIGEM === 'ORCAMENTOTIPO')       [0].INTEIRO);
        result ['ORCAMENTO_TIPO_VENDA'] =       Number (services.filter (serv => serv.ORIGEM === 'ORCAMENTOVENDA')      [0].INTEIRO);
        result ['ORCAMENTO_NATUREZA'] =         Number (services.filter (serv => serv.ORIGEM === 'ORCAMENTONATUREZA')   [0].INTEIRO);
        result ['SERVICO_ID'] =                 Number (services.filter (serv => serv.ORIGEM === 'SERVICO')             [0].INTEIRO);
        result ['FILA_CAMPO_ID'] =              Number (services.filter (serv => serv.ORIGEM === 'FILACAMPO')           [0].INTEIRO);
        result ['FILA_LAB_ID'] =                Number (services.filter (serv => serv.ORIGEM === 'FILALAB')             [0].INTEIRO);
        result ['EMPRESA'] =                    Number (services.filter (serv => serv.ORIGEM === 'EMPRESA')             [0].INTEIRO);

        return result;
    
    }



    errorTreatment (error) {
        this.setState ({ loading: false });

        Swal.fire ({
            button: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Encontramos um problema...',
            text: error.message,
            icon: 'error'
        });
    }



    clearForm () {

        let arr = document.querySelectorAll ('svg[data-testid="CloseIcon"]');

        for (let i in arr) {
            if (
                arr [i]
                && typeof arr [i] === 'object'
                && !(
                    arr [i].
                        parentElement.
                        parentElement.
                        parentElement.
                        parentElement.
                        parentElement.
                        classList.
                            toString ().
                            includes ('parceiroEquipamento')
                )
            ) {

                arr [i].parentElement.click ();
            }
        }

        this.equipamentoRef.current.setState ({

            fabricante           : '',
            modelo               : '',
            serie                : '',

            contratoLista        : [],
            equipamentoLista     : [],
            enderecoLista        : [],
            contratoEscolhido    : -1,
            equipamentoEscolhido : -1,

            popupAbertoSet       : false,
            popupParcSet         : undefined,
            popupEquipSet        : undefined

        });

        this.setState ({

            loading         : false,
            isSaved         : false,
            equipamento     : undefined,

            invoiceID       : -1,
            contrato        : -1,
            contato         : -1,
            clienteEscolhido: -1,
            clienteLista    : [],
            contatoLista    : []
            
        });

    }

}
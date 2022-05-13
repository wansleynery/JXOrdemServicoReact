class GrupoEquipamento extends React.Component {

    constructor (props) {
        super (props);

        this.state = {

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
            popupEquipSet        : undefined,
            popupParceiroLista   : undefined,
            popupEquipamentoLista: undefined

        };
    }

    componentDidMount () {
        this.getEquipamentos ();

        if (!this.state.popupParceiroLista) {
            this.localizarParceiro ('');
        }
    }

    render () {
        const inputRender = true;

        return (
            <div className= { `w-100` }>

                {
                    inputRender &&
                    <Input readonly
                        title= { 'Equipamento' }
                        value= {
                            this.state.equipamentoEscolhido > -1
                                ? this.state.equipamentoLista [0] ['label']
                                : ''
                        }
                        className= { 'w-75' }
                    />
                }

                {
                    !inputRender &&
                    <Select clear
                        title=      { 'Equipamento' }
                        action=     { () => openApp ('br.com.sankhya.menu.adicional.AD_EQUIPAMENTO', { ID: 0 }) }
                        options=    { this.state.equipamentoLista }
                        className=  { `w-75` }

                        onRefresh=  { this.getEquipamentos.bind (this) }
                        onChange=   { this.selecionaEquipamento.bind (this) }
                        onForceChange= { this.atualizaContrato.bind (this) }
                        onClear=    { () => this.selecionaEquipamento () }
                    />
                }

                <Button
                    variant=    { 'outlined' }
                    className=  { `w-25` }
                    onClick=    {
                        () => {
                            this.props.clearForm ();
                            this.setState ({ popupAbertoSet: true });
                        }
                    }
                >
                    Localizar Equipamento
                </Button>

                <Popup
                    title=      { 'Localizar Equipamento' }
                    open=       { this.state.popupAbertoSet }
                    onClose=    {
                        () => {
                            this.setState ({
                                popupEquipamentoLista: [],
                                popupAbertoSet: false
                            });
                            this.atualizaEquipamentoLista (false);
                        }
                    }
                    style=      {{ height: 'auto', width: '700px' }}
                    component=  {(
                        <div>
                            <Select
                                title=          { 'Parceiro' }
                                noOptionsText=  { 'Digite para localizar...' }
                                selectClassName={ 'parceiroEquipamento' }
                                options=        { this.state.popupParceiroLista || [] }
                                onInputChange=  { inputed => this.localizarParceiro (inputed) }
                                onChange=       { parceiro => this.atualizaEquipamentoLista (parceiro) }
                                onClear=        { () => this.atualizaEquipamentoLista () }
                            />

                            <Selectable single
                                options= { this.state.popupEquipamentoLista }
                                onChange= { equipamentos => this.setState ({ popupEquipSet: equipamentos [0] }) }
                            />

                            <Button
                                variant=    { 'outlined' }
                                className=  { 'full' }
                                onClick= {
                                    () => this.state.popupEquipSet
                                        ? this.selecionaEquipamento ({ value: this.state.popupEquipSet })
                                        : null
                                }
                            >
                                Escolher
                            </Button>
                        </div>
                    )}
                />

                <Input readonly
                    title= { 'Fabricante' }
                    value= { this.state.fabricante }
                    className= { 'w-50' }
                />

                <Input readonly
                    title= { 'Modelo' }
                    value= { this.state.modelo }
                    className= { 'w-50' }
                />
                
                <Input readonly
                    title= { 'Número de Série' }
                    value= { this.state.serie }
                    className= { 'w-50' }
                />

                <Select autoSelect
                    title= { 'Contrato' }
                    options= { this.state.contratoLista }
                    onChange= { this.selecionaContrato.bind (this) }
                    className= { 'w-50' }
                />

                <Input readonly
                    title= { 'Endereco' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].ENDERECO : '' }
                />

                <Input readonly
                    title= { 'Complemento' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].COMPLEMENTO : '' }
                    className= { 'w-50' }
                />
                
                <Input readonly
                    title= { 'Bairro' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].BAIRRO : '' }
                    className= { 'w-50' }
                />

                <Input readonly smallLabel
                    title= { 'CEP' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].CEP : '' }
                    className= { 'w-25' }
                />

                <Input readonly
                    title= { 'Cidade' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].CIDADE : '' }
                    className= { 'w-50' }
                />
                
                <Input readonly smallLabel
                    title= { 'UF' }
                    value= { this.state.enderecoLista.length ? this.state.enderecoLista [0].UF : '' }
                    className= { 'w-25' }
                />

            </div>
        );
    }

    getEquipamentos () {
        host.loadFile (`${ globalFullUrl }sql/equipamento.sql`).then (equipamentoQuery =>
            query.
                select (
                    equipamentoQuery.format ({ where: '' })).
                then (equipamentos =>
                    this.setState ({ equipamentoLista: equipamentos }))
        );
    }
    async selecionaEquipamento (item) {

        if (item) {
            let equipamento;

            if (!item.SERIE) {
    
                let equipamentoQuery = await host.loadFile (`${ globalFullUrl }sql/equipamento.sql`);
                equipamento = (
                    await query.
                        select (
                            equipamentoQuery.format ({ where: `AND eq.ID = ${ item.value }` })
                        )
                ) [0];
            }
            else {
                equipamento = item;
            }

            this.setState ({
                equipamentoEscolhido: equipamento.value,
                equipamentoLista: [ equipamento ],
                equipamento: equipamento,
                popupAbertoSet: false,

                popupParcSet: undefined,
                popupEquipSet: undefined,
                popupEquipamentoLista: undefined,

                fabricante  : equipamento.FABRICANTE,
                modelo      : equipamento.MODELO,
                serie       : equipamento.SERIE
            });

            this.props.callback (equipamento);

            this.getEnderecos (equipamento.value);
            this.getContratos (equipamento.value);

        }
        else {

            this.setState ({

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
                popupEquipSet        : undefined,
                popupEquipamentoLista: undefined

            });

            this.props.clearForm ();
            
            this.getEquipamentos ();
        }

        this.localizarParceiro ('');

    }

    getEnderecos (equipamento) {
        host.loadFile (`${ globalFullUrl }sql/enderecos.sql`).then (enderecoQuery =>
            query.select (enderecoQuery.format ({ equipamento: equipamento })).
                then (enderecos => this.setState ({ enderecoLista: enderecos }))
        );
    }

    
    getContratos (equipamento) {
        host.loadFile (`${ globalFullUrl }sql/contratos.sql`).then (contratoQuery =>
            query.select (contratoQuery.format ({ equipamento: equipamento })).
                then (contratos => this.setState ({ contratoLista: contratos }))
        );
    }
    selecionaContrato (item) {
        this.setState ({ contratoEscolhido: item ? item.value : -1 });
    }
    atualizaContrato (equipamento) {
        this.getContratos (equipamento);
        this.selecionaContrato (undefined);

        globalThis.clearContact ();
        globalThis.clearLabel ();
    }

    async atualizaEquipamentoLista (parceiro = null) {

        if (this.state.popupAbertoSet && parceiro) {

            const equipamentosQuery = await host.loadFile (`${ globalFullUrl }sql/equipamentoCustom.sql`);
            const equipamentos = await query.select (
                equipamentosQuery.format ({
                    where: parceiro ? `AND par.CODPARC = ${ parceiro.value  } ` : ' '
                })
            );

            this.setState ({ popupEquipamentoLista: equipamentos }, () => this.localizarParceiro (''));

        } else this.setState ({ popupEquipamentoLista: undefined }, () => this.localizarParceiro (''));

    }

    async localizarParceiro (info) {

        const parceiroQuery = await host.loadFile (`${ globalFullUrl }sql/parceiroEquipamento.sql`);
        const parceiros = await query.select (
            parceiroQuery.format ({ info: info })
        );

        this.setState ({ popupParceiroLista: parceiros });
    }
}
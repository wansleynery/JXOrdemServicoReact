class GrupoGeral extends React.Component {

    constructor (props) {
        super (props);

        this.state = {

            empresaLista: [],
            empresaEscolhida: -1,

            contatoEscolhido: -1,
            osInterna: false,

            prioridadeLista: [],
            prioridadeEscolhida: -1

        };
    }

    componentDidMount () {

        this.getPrioridades ();
        this.getEmpresas ();

        if (this.props.contatos.length > 0)
            this.selecionaContato (this.props.contatos [0]);

        globalThis.clearContact = () => this.selecionaContato (undefined);

    }

    componentDidUpdate () {

        if (this.props.contatos.length < 0 && this.state.contatoEscolhido !== -1)
            this.setState ({ contatoEscolhido: -1 });

    }

    render () {
        return (
            <div className= { `w-100` }>

                <Select required
                    title= { 'Empresa' }
                    options= { this.state.empresaLista }

                    onChange= { this.selecionaEmpresa.bind (this) }
                    onClear= { () => this.selecionaEmpresa () }
                    className= { `w-75` }
                />

                <Slider
                    label= { 'OS Interna' }
                    checked= { this.state.osInterna }
                    onChange= { value => this.setState ({ osInterna: value }) }
                    className= { `w-25` }
                />

                <Input readOnly
                    title=  { 'Cliente' }
                    value=  { this.props.cliente }
                />

                <Input readOnly
                    title=  { 'CPF / CNPJ' }
                    value=  { this.props.documento }
                />

                <Input readOnly
                    title=  { 'Telefone' }
                    value=  { this.props.telefone }
                />

                <Select required
                    title=      { 'Contato' }
                    options=    { this.props.contatos }
                    action=     { this.props.idCliente ? () => openApp ('br.com.sankhya.core.cad.parceiros', { CODPARC: this.props.idCliente }) : undefined }
                    className=  { 'select-contatos' }
                    noOptionsMessage= { 'Selecione um Cliente que possua Contatos' }
                    
                    onRefresh=  { this.props.refresh }
                    onChange=   { this.selecionaContato.bind (this) }
                    onClear= { () => this.selecionaContato () }
                />

                <Select required
                    title= { 'Prioridade' }
                    index= { 1 }
                    options= { this.state.prioridadeLista }

                    onChange= { this.selecionaPrioridade.bind (this) }
                    onClear= { () => this.selecionaPrioridade () }
                />

            </div>
        );
    }

    getEmpresas () {
        host.loadFile (`${ globalFullUrl }sql/empresa.sql`).then (empresaQuery =>
            query.select (empresaQuery).then (empresas => this.setState ({ empresaLista: empresas }))
        );
    }
    selecionaEmpresa (item) {
        this.setState ({ empresaEscolhida: item ? item.value : -1 });
    }

    getPrioridades () {
        host.loadFile (`${ globalFullUrl }sql/prioridade.sql`).then (prioridadeQuery =>
            query.select (prioridadeQuery).then (prioridades => this.setState ({ prioridadeLista: prioridades }))
        );
    }
    selecionaPrioridade (item) {
        this.setState ({ prioridadeEscolhida: item ? item.value : -1 });
    }

    selecionaContato (item) {
        this.setState ({ contatoEscolhido: item ? item.value : -1 });
    }

}
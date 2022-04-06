class GrupoDescricao extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            dataPrevista: new Date (),
            descricao: undefined,

            ocorrenciaLista: [],
            ocorrenciaEscolhida: -1
        };
    }

    
    componentDidMount () {
        this.getOcorrencias ();
    }

    render () {
        return (

            <div className= { `w-100` }>

                <Select required
                    title= { 'Ocorrência' }
                    className= { `w-50` }
                    options= { this.state.ocorrenciaLista }

                    onChange= { this.selecionaOcorrencia.bind (this) }
                    onClear= { () => this.selecionaOcorrencia () }
                />

                <Input required
                    title= { 'Data Prevista' }
                    type= { 'date' }
                    className= { 'w-50' }
                    value= { this.state.dataPrevista }

                    onChange= { newDate => this.setState ({ dataPrevista: newDate }) }
                />

                <Textarea required
                    title= { 'Descrição' }
                    placeholder= { 'Descrição detalhada do problema' }

                    onInput= { value => this.setState ({ descricao: value }) }
                    onBlur= { value => this.setState ({ descricao: value }) }
                />

            </div>

        );
    }

    async getOcorrencias () {

        const ocorrenciaQuery   = await host.loadFile (`${ globalFullUrl }sql/ocorrencias.sql`);
        const ocorrencias       = await query.select (ocorrenciaQuery);

        this.setState ({ ocorrenciaLista: ocorrencias });

    }
    selecionaOcorrencia (item) {
        this.setState ({
            ocorrenciaEscolhida: item ? item.value : -1
        });
    }
}
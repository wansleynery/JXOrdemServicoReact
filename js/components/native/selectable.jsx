
class Selectable extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            selectedValues: new Set ()
        }
    }

    render () {
        return (

            <List dense className= { `${ this.props.className ||  '' }` }>

                {
                    this.props.options
                    && this.props.options.map ((option, index) => {
                        return (

                            <ListItem button
                                key=    { index }
                                onClick={ () => this.changeValue (option.value) }
                            >
                                <ListItemText primary= { `${option.label}` } />

                                <ListItemSecondaryAction>
                                    {
                                        this.props.single
                                        ? (
                                            <Radio
                                                checked=  { this.state.selectedValues && this.state.selectedValues.size > 0 && this.state.selectedValues.has (option.value) }
                                                onChange= { () => this.changeValue (option.value) }
                                                name=     { 'radio-button' }
                                                value=    { option.value }
                                                edge=     { 'end' }
                                            />
                                        )
                                        : (
                                            <Checkbox
                                                checked=  { this.state.selectedValues && this.state.selectedValues.size > 0 && this.state.selectedValues.has (option.value) }
                                                onChange= { () => this.changeValue (option.value) }
                                                edge=     { 'end' }
                                            />
                                        )
                                    }
                                    
                                </ListItemSecondaryAction>
                            </ListItem>

                        );
                    })
                }

            </List>

        );
    }

    changeValue (value) {

        let newSelectedValues = undefined;

        // Valida se ja existe o valor, nesse caso sendo o cenario de deselecao
        if (
            !this.props.single
            && this.state.selectedValues
            && this.state.selectedValues.size > 0
            && this.state.selectedValues.has (value)
        ) {
            newSelectedValues = new Set ([ ...this.state.selectedValues ])
            newSelectedValues.delete (value);
        }

        // Se nao foi setado nenhum valor, eh o cenario da criacao ou mudanca de selecao
        if (!newSelectedValues) {
            newSelectedValues = (
                this.props.single
                    ? new Set ()
                    : new Set ([ ...this.state.selectedValues ])
            )
            newSelectedValues.add (value);
        }

        this.setState ({
            selectedValues: newSelectedValues
        });

        this.props.onChange ([ ...newSelectedValues ]);
    }
}
/**
 * this.props.title         - Title of Autocomplete
 * this.props.value         - Current (initial) value
 * this.props.placeholder   - Placeholder of Input
 * this.props.className     - CSS classes
 */
 class Textarea extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            valid: false
        }
    }

    render () {
        
        const isRequired = Boolean (this.props.required);
        const isValid = Boolean (this.state.valid);

        return (
            <div className= { `input-group mb-3 h-auto ${ this.props.className ? this.props.className : 'w-100' }` }>

                <div className= { 'input-group-prepend' }>
                    <span className= { 'input-group-text' } id= { 'basic-addon1' }>
                        { this.props.title }
                    </span>
                </div>

                <textarea
                    readOnly=       { this.props.readonly || this.props.readOnly }
                    disabled=       { this.props.disabled }
                    defaultValue=   { this.props.value ? this.props.value : '' }

                    placeholder=    { this.props.placeholder || this.props.title }
                    className=      { 'form-control rct-input thin' }

                    onChange=       { event => {
                                            this.props.onChange && this.props.onChange (event.target.value);
                                            this.setState ({ value: event.target.value.length ? event.target.value : undefined });
                                        }
                                    }
                    onBlur=         { event => {
                                            this.props.onBlur && this.props.onBlur (event.target.value);
                                            this.setState ({ value: event.target.value.length ? event.target.value : undefined });
                                        }
                                    }
                    onInput=        { event => {
                                            this.props.onInput && this.props.onInput (event.target.value)
                                            this.setState ({ value: event.target.value.length ? event.target.value : undefined });
                                        }
                                    }
                />

                {
                    !isValid && isRequired && <FormHelperText className= { 'text-danger' }> Required * </FormHelperText>
                }

            </div>
        );

    }
}
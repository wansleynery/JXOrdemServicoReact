/**
 * this.props.title         - Title of Autocomplete
 * this.props.type          - Type of input field
 * this.props.value         - Current (initial) value
 * this.props.placeholder   - Placeholder of Input
 * this.props.className     - CSS classes
 */
class Input extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {

        return (
            <div className= { `input-group mb-3 ${ this.props.className ? this.props.className : 'w-100' }` }>

                <div className= { 'input-group-prepend' } style= { this.props.smallLabel ? { width: '100px' } : {} }>
                    <span className= { 'input-group-text' } id= { 'basic-addon1' }>
                        { this.props.title }
                    </span>
                </div>

                <input
                    readOnly=       { this.props.readonly || this.props.readOnly }
                    disabled=       { this.props.disabled }
                    defaultValue=   { this.getDefaultValue () }

                    type=           { this.props.type ? this.props.type : 'text' }
                    placeholder=    { this.props.placeholder || this.props.title }
                    className=      { 'form-control rct-input' }

                    onChange=       { event =>
                        this.props.onChange && this.props.onChange (
                            this.props.type && this.props.type === 'date'
                            ? new Date (event.target.value.replace (/-/g, '\/'))
                            : event.target.value
                        )
                    }
                    onBlur=         { event => this.props.onBlur && this.props.onBlur (event.target.value) }
                    onInput=        { event => this.props.onInput && this.props.onInput (event.target.value) }
                />

            </div>
        );
    }

    getDefaultValue () {

        if (this.props.type && this.props.type === 'date') {

            if (this.props.value)
                return this.props.value.toJSON ().substr (0, 10);
            else
                return new Date ().toJSON ().substr (0, 10);

        }
        else {
            if (this.props.value) {
                return this.props.value;
            }
        }

        return '';
    }
}
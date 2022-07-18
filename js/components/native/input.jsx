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
                        {
                            this.props.action
                            ? (
                                <div
                                    className= { 'input-group-text input-action' }
                                    onClick= { this.props.action }
                                >
                                    { this.props.title }
                                </div>
                            )
                            : (
                                <div className= { 'input-group-text input-standard' } >
                                    { this.props.title }
                                </div>
                            )
                        }
                        {
                            this.props.onRefresh ?
                            <svg
                                width=      { '16' }
                                height=     { '16' }
                                fill=       { 'currentColor' }
                                className=  { 'bi bi-arrow-repeat' }
                                viewBox=    { '0 0 16 16' }

                                onClick=    { this.props.onRefresh }
                            >
                                <path
                                    d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                                />
                                <path
                                    fillRule= { 'evenodd' }
                                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                />
                            </svg> : <></>
                        }
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
                return this.props.value.toJSON ().substring (0, 10);
            else
                return new Date ().toJSON ().substring (0, 10);

        }
        else {
            if (this.props.value) {
                return this.props.value;
            }
        }

        return '';
    }
}
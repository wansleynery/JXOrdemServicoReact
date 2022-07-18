/**
 * this.props.title         - Title of Autocomplete
 * this.props.value         - Current (initial) value
 * this.props.placeholder   - Placeholder of Input
 * this.props.options       - Options of list
 * this.props.fieldToDisplay - Field to be show on Datalist Options
 * this.props.onChange      - OnChange Method
 * this.props.onInput       - OnInput Method
 * this.props.className     - CSS classes
 * 
 * React-Select options pattern:
 * const options = [
 *     { value: '1', label: 'One' },
 *     { value: '2', label: 'Two' },
 *     { value: '3', label: 'Three' },
 *     ...
 * ];
 */
 class Select extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            value: undefined,
            label: undefined
        }
    }

    render () {

        const commonPlaceholder     = (<div> { this.props.placeholder || this.props.title } </div>);
        const requiredPlaceholder   = (<span className= { 'text-danger' }> Required * </span>);

        const isRequired            = Boolean (this.props.required);
        const isValid               = Boolean (this.state.valid);

        return (
            <div className= { `input-group mb-3 ${ this.props.className ? this.props.className : 'w-100' }` }>

                <div className= { 'input-group-prepend' } style= { this.props.smallLabel ? { width: '100px' } : {} }>
                    <span className= { 'input-group-text' }>
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

                <Autocomplete
                    autoSelect= { this.props.autoSelect }
                    options=    { this.props.options }
                    className=  { this.props.selectClassName ?? '' }
                    disabled=   { this.isDisabled () }
                    onOpen=     { this.props.onOpen && this.props.onOpen () }
                    onChange=   {
                        (_event, newValue, reason) => {
                            if (newValue && this.state.value != newValue && this.props.options.length) {
                                this.props.onChange && this.props.onChange (newValue);
                                this.props.onForceChange && this.props.onForceChange (newValue);

                                this.setState ({ value: newValue, label: newValue.label });
                            }

                            if (this.props.onClear && reason === 'clear') {
                                this.props.onClear (newValue);
                            }
                        }
                    }
                    inputValue= {
                        this.state.label
                        && this.state.label.length
                            ? this.state.label : ''
                    }
                    onInputChange= {
                        (_event, value) => this.setInputChange (value)
                    }
                    renderInput= {
                        params => <TextField { ...params } label= { !isValid && isRequired ? requiredPlaceholder : commonPlaceholder } />
                    }
                />

            </div>
        );
    }

    isDisabled () {
        return (this.props.disabled || this.props.readOnly || this.props.readonly) || false;
    }

    setInputChange (value) {
        this.props.onInputChange && this.props.onInputChange (value);

        if (this.state.label != value)
            this.setState ({ label: value });
    }
}
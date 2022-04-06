class Slider extends React.Component {

    render () {
        return (
            <FormGroup>
                <FormControlLabel
                    label= { this.props.label }
                    control= {
                        <Switch
                            defaultChecked= { this.props.checked }
                            onChange=       {
                                event => this.props.onChange (event.target.checked)
                            }
                        />
                    }
                />
            </FormGroup>
        );
    }

}
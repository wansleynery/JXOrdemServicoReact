class Group extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            expanded: this.props.expanded || false
        };
    }

    render () {
        const { forwardedRef } = this.props;

        const expandedIcon = (
            <Icon path= { `M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z` } />
        );

        return (
            <div className= { `float-left ${ this.props.className ? this.props.className : 'w-100' }` }>

                <Accordion square
                    expanded= { this.state.expanded }
                    disabled= { this.props.disabled || false }
                    onChange= { this.props.onChange ? this.props.onChange : () => {} }
                >

                    <AccordionSummary
                        id= { 'panel1a-header' }
                        expandIcon={ expandedIcon }
                        onDoubleClick= { () => this.setState ({ expanded: !this.state.expanded }) }
                    >
                        <Typography> { this.props.title } </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <this.props.component ref= { forwardedRef } { ...this.props } />
                    </AccordionDetails>

                </Accordion>

            </div>
        );
    }

}
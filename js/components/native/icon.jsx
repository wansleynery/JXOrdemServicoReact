/**
 * this.props.title         - Title of Autocomplete
 * this.props.path          - Icon SVG drawing path
 * this.props.disabled      - Disabled status
 * this.props.extended      - Layout width appearance
 * this.props.className     - CSS classes
 */
class Icon extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {

        return (
            <SvgIcon>
                <path d={ this.props.path || '' } />
            </SvgIcon>
        );

    }
}
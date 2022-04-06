/**
 * this.props.title         - Title of Autocomplete
 * this.props.path          - Icon SVG drawing path
 * this.props.disabled      - Disabled status
 * this.props.extended      - Layout width appearance
 * this.props.className     - CSS classes
 */
class FlyButton extends React.Component {

    render () {

        let desabilitado = this.props.disabled ? ' disabled ' : this.props.className || ``;
        let cor = this.props.primary ? ' flyprimary ' : '';

        return (
            <Tooltip title= { this.props.tooltip ? this.props.tooltip : '' }>
                <Fab
                    variant=    { this.props.extended ? 'extended' : 'round' }
                    color=      { this.getColor () }
                    className=  { desabilitado + cor }

                    onClick=    { !this.props.disabled ? this.props.onClick : () => {} }
                >
                    { this.props.path && <Icon path={ this.props.path } />}
                    { this.props.title }
                </Fab>
            </Tooltip>
        );

    }

    getColor () {
        switch (true) {
            case this.props.primary: {
                return 'primary';
            }
            case this.props.secondary: {
                return 'secondary';
            }
            default: {
                return '';
            }
        }
    }
}
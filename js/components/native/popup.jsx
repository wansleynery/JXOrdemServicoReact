class Popup extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (

            <Dialog
                open= { this.props.open }
                onClose= { this.props.onClose }
                className= { 'dialog-popup' }
            >
                <DialogTitle> { this.props.title } </DialogTitle>

                { this.props.component }

            </Dialog>

        );
    }
}
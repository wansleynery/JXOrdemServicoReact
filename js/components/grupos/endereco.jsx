class GrupoEndereco extends React.Component {

    render () {

        return (
            <div className= { `w-100` }>
                {
                    this.props.enderecos.length > 0 &&
                    <Grid footless rows= { this.props.enderecos } />
                }
            </div>
        );
    }

    

}
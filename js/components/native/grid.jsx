class Th extends React.Component {
    render = () => <th> { this.props.title } </th>;
}

class Td extends React.Component {
    render = () => <td> { this.props.title } </td>
}

class THead extends React.Component {
    render = () =>
        <thead>
            <tr>
                { this.props.columns.map ((item, th_i) => <Th key={ `th_${ th_i }` } title= { item } />) }
            </tr>
        </thead>
}
class TFoot extends React.Component {
    render = () =>
        <tfoot>
            <tr> { this.props.columns.map ((item, tf_i) => <Th key={ `th_${ tf_i }` } title= { item } />) } </tr>
        </tfoot>
}

class TBody extends React.Component {
    render = () => 
        <tbody>
            {
                this.props.rows &&
                this.props.rows.length > 0 &&
                this.props.rows.map ((row, tb_i) =>
                    <tr
                        key= { `tr_${ tb_i }` }
                        className= { `${
                            this.props.highlight
                            && Object.values (this.props.highlight) [0]
                            && row == Object.values (this.props.highlight) [0]
                                ? 'highlighted'
                                : '' 
                        }` }
                    >
                        {
                            Object.values (row).filter (r => r && r.length > 0).length
                            ? Object.keys (row).map ((item, tr_i) => <Td key={ `td${ tr_i }` } title= { row [item] } />)
                            : Object.keys (row).map ((_v, tr_i) => <td key= { `td${ tr_i }` } className= { 'd-none' }></td>)
                        }
                    </tr>
                )
            }
        </tbody>
}

class Grid extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        const rows = this.props.rows;

        const columns = Object.keys (this.props.rows [0]);

        return (
            <table id= { this.props.rootId } className= { 'ui celled table display' }>

                <THead columns= { columns } />

                <TBody rows= { rows } highlight= { this.props.highlight } />

                {
                    !this.props.footless &&
                    <TFoot columns= { columns } />
                }

            </table>
        );
    }
}
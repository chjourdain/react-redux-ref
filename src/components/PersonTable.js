import React from 'react'
import {Link} from 'react-router';

// Stateless cell components for Table component

var columns = [{key: "id", label: "Id", sort:true},
    {key: "nom", label: "Nom", sort:true},
    {key: "prenom", label: "Prénom", sort:true},
    {key: "matricule", label: "Matricule", sort:true},
    {key: "qualite", label: "Qualité", sort:true},
    {key: "numTelFix", label: "Num. tél. fixe"},
    {key: "numTelPort", label: "Num. tél. port."},
    {key: "nomSociete", label: "Société", sort:true},
    {key: "dateEntree", label: "Date d\'entrée"},
    {key: "dateSortie", label: "Date de sortie"}];


class PersonTable extends React.Component {
    componentWillMount() {
        this.props.fetchData(this.props.username, this.props.password)
    }

    handleFilterStringChange(e) {
        e.preventDefault();
        this.props.filterBy(e.target.value)
    }

    handleSortClick(label, key) {
        const sortFunc = () => this.props.sortBy(key);
        return <a onClick={sortFunc}>{label}</a>
    }

    doesMatch(str) {
        return (key) => (key + '').toLowerCase().indexOf(str) !== -1
    }

    filterData() {
        const {data, filterString} = this.props;
        const str = filterString.toLowerCase();
        return str !== ''
            ? data.filter((r) => Object.values(r).some(this.doesMatch(str)))
            : data
    }

    sortData() {
        const {data, sortKey, sortDesc} = this.props;
        const multiplier = sortDesc ? -1 : 1;
        data.sort((a, b) => {
            const aVal = (a[sortKey]).toString().toLowerCase().trim() || 0;
            const bVal = (b[sortKey]).toString().toLowerCase().trim() || 0;
            return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
        });
        return this
    }

    errorMessageRender() {
        if (this.props.error !== '') {
            return (
                <div class="alert alert-danger">
                    {this.props.error}
                </div>)
        }
    }


    render() {
        if (this.props.username == '') {
            this.props.logout();
        }
        const {isFetching, filterString} = this.props;
        console.log('in render of PersonTable');
        const data = this.sortData().filterData();
        //const data = this.props.data;
        return (
            <section className="content">
                  <div className="row"><div className="col-lg-4">  <div className="form-group">
                        <label>Filtre</label>
                <input className='form-control filter-input' value={filterString}
                       onChange={::this.handleFilterStringChange}
                       type='text' placeholder='Filter Rows'
                       autoCorrect='off' autoCapitalize='off' spellCheck='false'/>
                </div></div></div><br />

                <table className="t table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        {  columns.map((column)=> {
                            const selected = (column.key === this.props.sortKey)? (this.props.sortDesc) ? 'reactable-header-sort-desc':'reactable-header-sort-asc' : ''
                            const clickFunc = () => this.props.sortBy(column.key);
                            if(column.sort){return <th key={"thkey"+column.label}><a className={selected} onClick={clickFunc}>{column.label}</a></th>}
                            return <th key={"thkey"+column.label}>{column.label}</th>
                        })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    { data.map((person)=> {
                        return (

                            <tr key={person['id'] + person['dateEntree']}>

                                {columns.map((column) => {
                                    const key = column.key;
                                    return (
                                        <td> <Link to={"/edit/"+person['id']}>{person[key]}</Link></td>)
                                })}
                                </tr>)
                    })
                    }
                    </tbody>
                </table>
                {isFetching && data.length === 0 &&
                <div className="spinner">
                    <div className="cube1"></div>
                    <div className="cube2"></div>
                </div>}
                {!isFetching && data.length === 0 &&
                <h4 className='center'>Aucun résultat</h4>}
            </section>
        )
    }
}

PersonTable.propTypes = {
    // actions
    fetchData: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    filterBy: React.PropTypes.func.isRequired,

    // state data
    filterString: React.PropTypes.string.isRequired,
    sortKey: React.PropTypes.string.isRequired,
    sortDesc: React.PropTypes.bool.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

export default PersonTable

import React from 'react'
import { connect } from 'react-redux'

import { set } from '../modules/productsListFilters'

import { Input } from 'antd'

function ms2p(state, ownProps) {
    var filters = state.productsListFilters
    return { filters }
}
function md2p(dispatch) {
    return {
        onSubmit: (filters) => {
            dispatch(set(filters))
        }
    }
}

class ProductsListFilters extends React.Component {
    render() {

        var { name } = this.props.filters

        return (
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                <Input.Search defaultValue={name} placeholder="Name or barcode" name="name" onChange={this.handleChange.bind(this)} onSearch={this.handleSearch.bind(this)} />
            </form>
        )
    }
    handleSearch(value) {
        this.props.onSubmit({ name: value })
    }
    handleSubmit(ev) {
        (ev.preventDefault && ev.preventDefault())
        this.props.onSubmit(ev)
    }
    handleChange(ev) {
        var { name, value } = ev.target
        this.props.onSubmit({
            [name]: value
        })
    }
    handleReset(ev) {
        this.props.onSubmit({
            name: undefined
        })
    }
}

export default connect(ms2p, md2p)(ProductsListFilters)

import React from 'react'
import { connect } from 'react-redux'

import { set } from '../modules/productsListFilters'

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
        console.log('ProductsListFilters.render')

        var { name } = this.props.filters

        return (
            <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <input placeholder="name" name="name" onChange={this.handleChange.bind(this)} value={name || ''} />
                <button type="reset" onClick={this.handleReset.bind(this)}>R</button>
            </form>
        )
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
            name : undefined
        })
    }
}

export default connect(ms2p, md2p)(ProductsListFilters)

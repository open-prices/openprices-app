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
            <form className="form-inline shadow" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                <i className="fa fa-search" style={{
                    position: 'relative', width: 0, left: '1rem'
                }} />
                <input className="form-control" placeholder="name" name="name" onChange={this.handleChange.bind(this)} value={name || ''} style={{
                    paddingLeft: '3rem'
                }} />
                {(run => {
                    if (!name) return null
                    return (
                        <i className="fa fa-times" style={{
                            position: 'relative', width: 0, right: '2rem',
                            color: 'indianred'
                        }} onClick={this.handleReset.bind(this)} />
                    )
                })(name)}
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
            name: undefined
        })
    }
}

export default connect(ms2p, md2p)(ProductsListFilters)

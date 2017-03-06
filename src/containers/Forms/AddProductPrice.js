import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { FormGroup, ButtonGroup, Card } from '../../components/UI'

import * as API from '../../api/products'
import * as Products from '../../modules/products'


class AddProductPrice extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState() {
        return { step: 0 }
    }

    render() {

        var { step, redirect } = this.state
        var { product } = this.props

        if (redirect) {
            return <Redirect to={redirect.to} />
        }

        if (!product) return null

        switch (step) {
            case 0: {
                var defaultDate = new Date().toISOString().substr(0, 10)
                return (
                    <Card>
                        <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} ref={el => this.form = el}>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Barcode</label>
                                <div className="col-sm-8">
                                    <input type="hidden" name="barcode" defaultValue={product.barcode} required />
                                    <p className="form-control-static">{product.barcode}</p>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Name</label>
                                <div className="col-sm-8">
                                    <input type="hidden" name="name" defaultValue={product.name} required />
                                    <p className="form-control-static">{product.name}</p>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Price</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control" name="price" step={0.01} required autoFocus />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Date</label>
                                <div className="col-sm-8">
                                    <input type="date" className="form-control" name="date" defaultValue={defaultDate} required />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Vendor</label>
                                <div className="col-sm-8">
                                    <VendorsSelect name="vendor" className="form-control" />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="col-sm-offset-4 col-sm-8">
                                    <ButtonGroup>
                                        <button className="btn btn-default">Add</button>
                                    </ButtonGroup>
                                </div>
                            </FormGroup>
                        </form>
                    </Card>
                )
            }
            default: {
                return null
            }
        }

    }

    handleSubmit(ev) {
        ev.preventDefault()
        var fd = new FormData(this.form)
        var price = fd.get('price')
        var date = new Date(fd.get('date')).toISOString()
        var vendor = fd.get('vendor')
        return API.createProductPrice(this.props.barcode, price, vendor, date).then(price => {
            this.setState({
                redirect: {
                    to: '/products/' + this.props.barcode + '/prices'
                }
            })
        })
    }

}

export default connect((state, { barcode }) => {
    var product = state.products.productsByBarcode[barcode]
    return { product }
}, (dispatch, { barcode }) => {
    API.getProduct(barcode).then(product => {
        var action = Products.add(product)
        dispatch(action)
    })
    return {}
})(AddProductPrice)

var VendorsSelect = connect((state) => {
    var { vendorsById } = state.vendors
    var vendors = state.vendors.vendors.map(id => vendorsById[id])
    return { vendors }
}, (dispatch)=>{
    var Vendors = require('../../modules/vendors')
    var API = require('../../api/vendors')
    API.getVendors().then(vendors => {
        vendors.map(v => {
            dispatch(Vendors.add(v))
        })
    })
})(props => {
    var { vendors, className, name, style } = props
    return (
        <select className={className} name={name} style={style}>
            {vendors.map((v, i) => (<option key={i} value={v.code}>{v.name}</option>))}
        </select>
    )
})
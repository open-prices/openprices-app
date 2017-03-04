import React from 'react'
import { FormGroup, ButtonGroup } from '../../components/UI'

import ProductSelector from '../ProductSelector'


class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState() {
        return {
            step: 0
        }
    }

    render() {

        var { step, product, create } = this.state

        switch (step) {
            case 0: {
                return <ProductSelector onChange={this.handleProductSelectorChange.bind(this)} onProduct={this.handleProductSelectorOnProduct.bind(this)} onCreate={this.handleProductSelectorOnCreate.bind(this)} />
            }
            case 1: {
                return (
                    <div className="form-horizontal">
                        <FormGroup>
                            <label className="col-sm-4 control-label">Barcode</label>
                            <div className="col-sm-8">
                                <input type="hidden" className="form-control" placeholder="Barcode" defaultValue={product.barcode} />
                                <p className="form-control-static">
                                    {product.barcode}
                                    <button className="btn btn-xs" onClick={() => { this.setState(this.getInitialState()) }} style={{
                                        background: 'none', color: 'indianred'
                                    }}>
                                        <i className="fa fa-times" />
                                    </button>
                                </p>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label className="col-sm-4 control-label">Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="Name" defaultValue={product.name} autoFocus />
                            </div>
                        </FormGroup>
                    </div>
                )
            }
        }

    }

    handleProductSelectorChange() {
        this.setState({
            create: false,
            product: null,
            step: 0
        })
    }
    handleProductSelectorOnProduct(product) {
        this.setState({
            create: false,
            product,
            step: 1
        })
    }
    handleProductSelectorOnCreate(product) {
        this.setState({
            create: true,
            product,
            step: 1
        })
    }
}

export default AddProduct

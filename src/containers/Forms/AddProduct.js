import React from 'react'
import { Link } from 'react-router-dom'

import { FormGroup, ButtonGroup } from '../../components/UI'
import { Card } from 'antd'

import ProductSelector from '../ProductSelector'

import * as API from '../../api/products'


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
                    <Card>
                        <div className="form-horizontal">
                            <FormGroup>
                                <label className="col-sm-4 control-label">Barcode</label>
                                <div className="col-sm-8">
                                    <input type="hidden" className="form-control" placeholder="Barcode" defaultValue={product.barcode} required />
                                    <p className="form-control-static">
                                        {product.barcode}
                                        <button className="btn btn-xs" onClick={() => { this.setState(this.getInitialState()) }} style={{
                                            background: 'none', color: 'indianred',
                                        }}>
                                            <i className="fa fa-times" />
                                        </button>
                                    </p>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label className="col-sm-4 control-label">Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Name" defaultValue={product.name} onChange={this.handleProductNameChange.bind(this)} autoFocus required />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className="col-sm-offset-4 col-sm-8">
                                    <ButtonGroup>
                                        <button className="btn btn-default" onClick={this.handleProductSave.bind(this)}>Save</button>
                                        <button className="btn btn-default" onClick={this.handleProductSaveGoto.bind(this)}>Save and price</button>
                                    </ButtonGroup>
                                </div>
                            </FormGroup>
                        </div>
                    </Card>
                )
            }
            case 2: {
                return (
                    <Card>
                        <h4>Saved!</h4>
                        <p>{create ? 'Created' : 'Edited'} product <strong>{product.name}</strong></p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi sequi quod deserunt esse aliquam! Quia culpa temporibus, quaerat consequuntur similique veritatis fugiat? Exercitationem placeat dolorum, fugiat nemo. Molestiae earum, totam.</p>
                        <Link className="btn btn-default" to={'/products/' + product.barcode}>Go to product</Link>
                        <pre>{JSON.stringify(this.state.product, null, 2)}</pre>
                        <pre>{JSON.stringify(this.state.product_diff, null, 2)}</pre>
                        <pre>{JSON.stringify(this.state.product_db, null, 2)}</pre>
                    </Card>
                )
            }
            default: {
                return null
            }
        }

    }

    handleProductSave(ev) {
        ev.preventDefault()
        var product = this.getUpdatedProduct()
        return API.createProduct(product.barcode, product.name).then(product => {
            this.setState({
                step: 2,
                product_db: product
            })
        })
    }
    handleProductSaveGoto(ev) {
        return this.handleProductSave(ev)
    }

    getUpdatedProduct() {
        var { product, product_diff } = this.state
        return Object.assign({}, product, product_diff)
    }

    handleProductNameChange(ev) {
        ev.preventDefault()
        var { value } = ev.target
        var { product_diff = {} } = this.state
        product_diff.name = value
        this.setState({ product_diff })
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

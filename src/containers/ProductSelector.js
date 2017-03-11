import React from 'react'
import * as API from '../api/products'

import { ButtonGroup } from '../components/UI'
import { Card } from 'antd'

class ProductSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            barcode: '',
            products: []
        }
    }
    render() {
        var { barcode, products, loading } = this.state
        return (
            <div>
                <Card>
                    <input className="form-control" type="text" onChange={this.handleBarcodeChange.bind(this)} placeholder="barcode" autoFocus />
                    <span className="help-block">Start typing a barcode to find a product</span>
                </Card>
                {(run => {
                    if (!run) return null
                    return (
                        <Card>
                            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-around' }}>
                                {barcode.length < 2 ? null : (
                                    <button className="btn btn-default btn-sm" disabled={loading} onClick={this.handleProductCreate.bind(this, barcode)}>
                                        <i className="fa fa-plus" />
                                        <span> {barcode}</span>
                                    </button>
                                )}
                                {(run => {
                                    if (!run) return null
                                    var product = products.length !== 1 ? products.find(p => p.barcode === barcode) : products[0]
                                    if (!product) return null
                                    return (
                                        <button className="btn btn-default btn-sm" disabled={loading} onClick={this.handleProductFound.bind(this, product)}>
                                            <i className="fa fa-pencil" />
                                            <span> {product.name} ({product.barcode})</span>
                                        </button>
                                    )

                                })(!!barcode.length)}
                            </ButtonGroup>
                            {(run => {
                                if (!run) return null
                                return (
                                    <div>
                                        <span>Products matching {barcode}</span>
                                        <ProductsSelect disabled={loading} products={products} />
                                    </div>
                                )
                            })(barcode.length && (1 < products.length))}
                        </Card>
                    )
                })(!(barcode.length < 2))}
            </div>
        )
    }
    handleProductFound(product) {
        if (this.state.loading) return
        this.props.onProduct(product)
    }
    handleProductCreate(barcode) {
        if (this.state.loading) return
        this.props.onCreate({
            barcode
        })
    }
    handleBarcodeChange(ev) {
        this.props.onChange()

        clearTimeout(this.timeout)

        var barcode = ev.target.value

        this.setState({
            barcode,
            loading: true
        }, () => {
            var t = setTimeout(() => {
                this.findProducts(barcode).then(products => {
                    this.setState({
                        products,
                        loading: false
                    })
                })
            }, 500)
            this.timeout = t
        })
    }
    findProducts(barcode = '') {
        if (barcode.length < 2) return Promise.resolve([])
        return API.getProducts().then(products => {
            return products.filter(product => {
                var match = (product.barcode.toString().indexOf('' + barcode) !== -1)
                return match
            })
        })
    }
}

export default ProductSelector

function ProductsSelect(props) {

    var { products, disabled } = props
    console.log(products)

    if (products.length === 0) return null

    var size = (products.length < 10) ? products.length : 10
    return (
        <select disabled={disabled} className="form-control" name="product" size={size}>
            {products.sort((a, b) => {
                return (a.name || '').localeCompare(b.name || '')
            }).map(product => (
                <option key={product.barcode} value={product.barcode}>{product.name} ({product.barcode})</option>
            ))}
        </select>
    )
}
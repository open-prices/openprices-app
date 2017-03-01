import React from 'react'
import * as API from '../api/products'

class ProductSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            barcode: '',
            products: []
        }
    }
    render() {
        var { barcode, products } = this.state
        return (
            <div>
                <input className="form-control" type="text" onChange={this.handleBarcodeChange.bind(this)} placeholder="barcode" autoFocus />
                {barcode.length < 2 ? 'Type a barcode' : null}
                {barcode.length && (1 < products.length) ? <ProductsSelect products={products} /> : null}
                {barcode.length && (products.length === 1) ? (
                    <button className="form-control btn btn-default btn-sm" onClick={this.handleProductFound.bind(this, products[0])}>
                        {products[0].name} ({products[0].barcode})
                    </button>
                ) : null}
                {barcode.length && !products.length ? (
                    <div>create {barcode}</div>
                ) : null}
            </div>
        )
    }
    handleProductFound(product) {
        if (this.state.loading) return
        this.props.onProduct(product)
    }
    handleBarcodeChange(ev) {
        var barcode = ev.target.value
        this.setState({
            barcode,
            loading : true
        }, () => {
            this.findProducts(barcode).then(products => {
                this.setState({
                    products,
                    loading : false
                })
            })
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

    var { products } = props
    console.log(products)

    if (products.length === 0) return null

    var size = (products.length < 10) ? products.length : 10
    return (
        <select className="form-control" name="product" size={size}>
            {products.map(product => (
                <option key={product.barcode} value={product.barcode}>{product.name} ({product.barcode})</option>
            ))}
        </select>
    )
}
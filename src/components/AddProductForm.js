import React from 'react'
import { Link } from 'react-router-dom'

import { FormGroup, ButtonGroup } from '../components/UI'

import ProductSelector from '../containers/ProductSelector'

class AddProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            create: false
        }
    }
    render() {
        var { product } = this.state
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <ProductSelector onChange={this.handleProductSelectorChange.bind(this)} onProduct={this.handleProductFound.bind(this)} onCreate={this.handleProductCreate.bind(this)} />
                    {JSON.stringify(this.state, null, 2)}
                </FormGroup>
            </form>
        )
    }
    handleSubmit(ev) {
        ev.preventDefault()
    }
    handleProductSelectorChange() {
        this.setState({
            create : false,
            product: null
        })
    }
    handleProductFound(product) {
        this.setState({
            create: false,
            product
        })
    }
    handleProductCreate(product) {
        this.setState({
            create: true,
            product
        })
    }
}

export default AddProductForm

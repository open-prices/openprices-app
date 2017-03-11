import React from 'react'
import { Link } from 'react-router-dom'

import {
    Button,
    Card,
    Table
} from 'antd'
var ButtonGroup = Button.Group

class ProductsList extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentWillMount() {
        this.reload()
    }
    render() {

        var { match, products } = this.props
        var { loading } = this.state

        return (
            <Card title={'Products'} extra={(
                <Button onClick={this.reload.bind(this)} shape="circle" size="small" ghost type="primary">
                    {loading ? <i className="fa fa-spinner fa-pulse" /> : <i className="fa fa-refresh" />}
                </Button>
            )}>
                <Table dataSource={this.dataSource()} columns={this.columns()} size="small" pagination={{ pageSize: 5 }} />
            </Card>
        )
    }
    dataSource() {
        var { products } = this.props
        return products.map(product => {
            return Object.assign({
                key : product.barcode
            }, product)
        })
    }
    columns() {
        return [{
            title: 'Barcode', dataIndex: 'barcode', key: 'barcode'
        }, {
            title: 'Name', dataIndex: 'name', key: 'name'
        }, {
            title: 'Price', dataIndex: 'price', key: 'price'
        }, {
            title: 'Actions', dataIndex: 'barcode', key: 'actions',
            render: (barcode) => {
                return (
                    <ButtonGroup>
                        <Button size="small">
                            <Link to={'/products/' + barcode + '/prices'}>prices</Link>
                        </Button>
                        <Button size="small">
                            <Link to={'/products/' + barcode + '/vendors'}>vendors</Link>
                        </Button>
                    </ButtonGroup>
                )
            }
        }]
    }
    reload() {
        this.setState({ loading: true })
        return this.props.loadProducts().then(products => {
            this.setState({ loading: false })
        })
    }
}

export default ProductsList

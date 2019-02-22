import React from 'react'
import { Link } from 'react-router-dom'
import { Motion, spring } from 'react-motion'

import {
    Button,
    Card,
    Table
} from 'antd'

class ProductsList extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentWillMount() {
        this.reload()
    }
    render() {

        var { loading } = this.state

        return (
            <Card title={'Products'} extra={(
                <Button onClick={this.reload.bind(this)} shape="circle" size="small" ghost type="primary">
                    {loading ? <i className="fa fa-spinner fa-pulse" /> : <i className="fa fa-refresh" />}
                </Button>
            )}>
                <Motion defaultStyle={{
                    opacity: 0,
                    h: 0
                }} style={{
                    opacity: spring(1, {
                        stiffness: 70, damping: 50
                    }),
                    h : spring(1, {
                        stiffness: 70
                    })
                }}>
                    {style => {
                        var x = style.h
                        if (x < 1) {
                            style.maxHeight = (x * window.innerHeight) + 'px'
                            style.overflow = 'hidden'
                        }
                        return <Table style={style} dataSource={this.dataSource()} columns={this.columns()} size="small" pagination={{ pageSize: 10 }} />
                    }}
                </Motion>
            </Card>
        )
    }
    dataSource() {
        var { products } = this.props
        return products.map(product => {
            return Object.assign({
                key: product.barcode
            }, product)
        })
    }
    columns() {
        return [{
            title: 'Barcode', dataIndex: 'barcode', key: 'barcode',
            render: barcode => <Link to={'/products/' + barcode + '/prices'}>{barcode}</Link>
        }, {
            title: 'Name', dataIndex: 'name', key: 'name'
        }, {
            title: 'Price', dataIndex: 'price', key: 'price'
        }, {
            title: 'Updated at', dataIndex: 'updatedAt', key: 'updatedAt',
            render: date => <RelativeDate date={date} />
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

function RelativeDate(props) {
    var moment = require('moment')
    return <span>{moment(props.date).fromNow()}</span>
}
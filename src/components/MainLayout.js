import React from 'react'
import { Link, Route } from 'react-router-dom'
import { List } from './UI'
import ProductsRouter from '../routes/Products'


var links = [{
    name: 'Home',
    path: '/'
}, {
    name: 'Products',
    path: '/app/products'
}, {
    name: 'Vendors',
    path: '/app/vendors'
}]

function Sidebar(props) {
    return <div style={{
        backgroundColor: 'gainsboro',
        padding: '1rem',
        width: '10%'
    }} {...props}></div>
}
function Content(props) {
    return <div style={{
        padding: '1rem',
        width: '90%'
    }} {...props}></div>
}

class MainLayout extends React.Component {
    componentWillMount(){
        window.addEventListener('resize', this._update.bind(this))
    }
    componentWillUmount(){
        window.removeEventListener('resize', this._update.bind(this))
    }
    _update(){
        this.setState({})
    }
    render() {
        var { match } = this.props
        return (
            <div className="MainLayout" style={{ height: window.innerHeight, overflow: 'hidden' }}>
                <div>NavBar goes here</div>
                <div className="flex" style={{ height: '100%' }}>
                    <Sidebar>
                        <List>
                            {links.map(({ name, path, absolute }) => (
                                <div key={path}>
                                    <Link to={path}>{name}</Link>
                                </div>
                            ))}
                        </List>
                    </Sidebar>
                    <Content>
                        <Route path={match.url + '/products'} component={ProductsRouter} />
                    </Content>

                </div>
            </div>
        )
    }
}

export default MainLayout

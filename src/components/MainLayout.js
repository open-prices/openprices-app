import React from 'react'
import { NavLink, Route } from 'react-router-dom'

import { Card } from './UI'
import ProductsRouter from '../routes/Products'
import VendorsRouter from '../routes/Vendors'

import Navbar from '../containers/Navbar'
import LoginForm from '../components/LoginForm'



function Sidebar(props) {
    return <div className="bg-15" style={{
        padding: '1rem',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }} {...props}></div>
}
function Content(props) {
    return <div {...props} style={Object.assign({
        padding: '0.5rem 1rem 1rem',
        width: '100%'
    }, props.style)}></div>
}

class MainLayout extends React.Component {
    componentWillMount() {
        window.addEventListener('resize', this._update.bind(this))
    }
    componentWillUmount() {
        window.removeEventListener('resize', this._update.bind(this))
    }
    _update() {
        this.setState({})
    }
    render() {
        return (
            <div className="MainLayout max-height">
                <div style={{ height: '9%' }}>
                    <Navbar />
                </div>
                <div className="flex" style={{ height: '91%', backgroundColor: 'gainsboro' }}>
                    <Sidebar>
                        <ul className="nav nav-pills nav-stacked">
                            <li>
                                <NavLink to="/products" activeStyle={{ color: 'white', backgroundColor: 'hsla(190, 100%, 40%, 1)' }}>
                                    P
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/vendors" activeStyle={{ color: 'white', backgroundColor: 'hsla(190, 100%, 40%, 1)' }}>
                                    V
                                </NavLink>
                            </li>
                        </ul>
                    </Sidebar>
                    <Content style={{ overflow: 'hidden' }}>
                        <div className="flex" style={{ height: '100%' }}>
                            <Card style={{ backgroundColor: 'hsla(270, 50%, 80%, 1)', width:'100%' }}>
                                <Route path={'/products'} component={ProductsRouter} />
                                <Route path={'/vendors'} component={VendorsRouter} />
                                <Route path={'/login'} render={(props) => (
                                    <Card>
                                        <LoginForm {...props} />
                                    </Card>
                                )} />
                            </Card>
                        </div>
                    </Content>

                </div>
            </div>
        )
    }
}

export default MainLayout

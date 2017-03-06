import React from 'react'
import { NavLink, Route } from 'react-router-dom'

import { Card } from './UI'
import ProductsRouter from '../routes/Products'
import VendorsRouter from '../routes/Vendors'

import Navbar from '../containers/Navbar'
import LoginForm from '../containers/Forms/Login'
import RegisterForm from '../containers/Forms/Register'



function Sidebar(props) {
    return <div className="bg-15" style={{
        padding: '0.5rem 0rem',
        //boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }} {...props}></div>
}
function Content(props) {
    return <div {...props} style={Object.assign({
        padding: '1rem',
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
            <div className="MainLayout max-height" style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div>
                    <Navbar />
                </div>
                <div className="flex" style={{ flexGrow: '1' }}>
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
                    <Content style={{ overflow: 'auto' }}>
                        <div className="flex" style={{ height: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <Route path={'/about'} component={About} />
                                <Route path={'/products'} component={ProductsRouter} />
                                <Route path={'/vendors'} component={VendorsRouter} />
                                <Route path={'/user'} component={require('../containers/User').default} />
                                <Route path={'/login'} render={(props) => (
                                    <div className="flex" style={{ height: '100%', alignItems: 'center' }}>
                                        <div style={{ margin: '0 auto' }}>
                                            <LoginForm {...props} />
                                        </div>
                                    </div>
                                )} />
                                <Route path={'/register'} render={(props) => (
                                    <div className="flex" style={{ height: '100%', alignItems: 'center' }}>
                                        <div style={{ margin: '0 auto' }}>
                                            <RegisterForm {...props} />
                                        </div>
                                    </div>
                                )} />
                            </div>
                        </div>
                    </Content>

                </div>
            </div>
        )
    }
}

export default MainLayout

function About(props) {
    var product = {
        name: 'Nescafe dolca SUAVE 170g'
    }
    return (
        <Card>
            <h4>Saved!</h4>
            <p>Created product <strong>{product.name}</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi sequi quod deserunt esse aliquam! Quia culpa temporibus, quaerat consequuntur similique veritatis fugiat? Exercitationem placeat dolorum, fugiat nemo. Molestiae earum, totam.</p>
        </Card>
    )
}
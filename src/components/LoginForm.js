import React from 'react'
import { Link } from 'react-router-dom'

import { FormGroup, ButtonGroup, Card } from '../components/UI'

class LoginForm extends React.Component {
    render() {
        return (
            <Card>
                <div className="" style={{
                    //boxShadow: 'none', marginBottom: 0
                }}>
                    <div className="panel-heading" style={{ borderBottom: '1px solid gainsboro' }}>
                        <h4>User Login</h4>
                    </div>
                    <div className="panel-body">
                        <form ref={el => this.el = el} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                            <FormGroup>
                                <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
                            </FormGroup>
                            <FormGroup>
                                <ButtonGroup>
                                    <button className="btn btn-default text-bold">Login</button>
                                    <Link to="/reset" className="btn text-gainsboro text-bold">Forgot password</Link>
                                </ButtonGroup>
                            </FormGroup>
                        </form>
                    </div>
                    <div className="panel-footer" style={{
                        padding: 0, backgroundColor: 'inherit'
                    }}>
                        <Link to="/register" className="btn text-gainsboro" style={{
                            fontSize: '1rem'
                        }}>Register</Link>
                    </div>
                </div>
            </Card>
        )
    }
    handleSubmit(ev) {
        ev.preventDefault()
        var fd = new FormData(this.el)
        var username = fd.get('username')
        var password = fd.get('password')
        this.props.onSubmit(username, password)
    }
}

export default LoginForm

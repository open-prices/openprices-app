import React from 'react'
import { Link } from 'react-router-dom'

import { FormGroup, ButtonGroup, Card } from '../components/UI'

import * as API from '../api/auth'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {

        var { error = {} } = this.state || {}
        var { fields = {} } = error

        return (
            <Card>
                <div className="panel-heading" style={{ borderBottom: '1px solid gainsboro' }}>
                    <h4>Registration Form</h4>
                </div>
                <div className="panel-body">
                    <form ref={el => this.el = el} onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                        <FormGroup className={(fields.username || fields.password) ? 'has-error shake' : ''}>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" required />
                        </FormGroup>
                        <FormGroup className={fields.nickname ? 'has-error shake' : ''}>
                            <input type="nickname" className="form-control" id="nickname" name="nickname" placeholder="nickname" required />
                        </FormGroup>
                        <FormGroup>
                            <ButtonGroup>
                                <button className="btn btn-default text-bold">Register</button>
                            </ButtonGroup>
                        </FormGroup>
                    </form>
                </div>
                <div className="panel-footer" style={{ padding: 0, backgroundColor: 'inherit' }}>
                    <Link to="/login" className="btn text-gainsboro" style={{
                        fontSize: '1rem'
                    }}>Login</Link>
                </div>
            </Card>
        )
    }
    handleSubmit(ev) {
        ev.preventDefault()

        this.setError({}, () => {

            var fd = new FormData(this.el)
            var username = fd.get('username')
            var password = fd.get('password')
            var nickname = fd.get('nickname')

            console.log(username, password, nickname)

            API.register(username, password, nickname).then(user => {
                this.setState({ user })
            }).catch(err => {
                this.setError(err.response.data)
            })

        })
    }
    setError(error, cb) {
        this.setState({ error }, cb)
    }
}

export default RegisterForm

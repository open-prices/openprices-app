import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-inverse" style={{ marginBottom: 0, borderRadius: 0 }}>
                <div className="container-fluid">
                    <div className="flex" style={{ padding: '0.25rem 1rem', justifyContent: 'space-between' }}>
                        <div className="navbar-text"></div>
                        <div className="navbar-brand">
                            <Link className="navbar-link text-decoration-none" to="/" style={{
                                color: 'white', fontWeight: 'bolder'
                            }}>
                                OpenPrices.org
                            </Link>
                        </div>
                        <div>
                            <Link className="btn btn-sm btn-default navbar-btn" to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar

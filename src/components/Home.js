import React from 'react'
import { Link } from 'react-router-dom'

var Home = React.createClass({
    getInitialState() {
        return {}
    },
    render() {
        return (
            <div className="bg-red text-align-center text-family-bold" style={{
                margin: '10rem auto',
                borderRadius: '6px'
            }}>
                <Link className="text-white text-decoration-none" to="/app">
                    <h1 style={{ margin: 0, fontSize: '10em' }}>
                        <span className="text-white">OpenPrices</span>
                        <span className="text-white" style={{ fontSize: '75%' }}>.org</span>
                    </h1>
                </Link>
            </div>
        )
    }
})

export default Home

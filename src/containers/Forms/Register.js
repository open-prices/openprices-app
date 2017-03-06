import { connect } from 'react-redux'

import Form from '../../components/RegisterForm'

import * as User from '../../modules/user.js'

function ms2p(state, ownProps) {
    return {}
}
function md2p(dispatch, ownProps) {
    
    dispatch(User.clear())

    return {}
    
}

export default connect(ms2p, md2p)(Form)

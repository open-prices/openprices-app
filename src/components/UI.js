import React from 'react'

export function List(props) {
    return <div {...props} className="list-group"></div>
}
export function ListItem(props) {
    return <div {...props} className="list-group-item"></div>
}

export function ButtonGroup(props) { return <div {...props} className="btn-group"></div> }
export function FormGroup(props) { return <div {...props} className="form-group"></div> }
export function StaticControl(props) {
    var labelWidth = props.labelWidth || props.size || 2
    return (
        <FormGroup>
            <label className={'col-sm-' + labelWidth + ' control-label'}>{props.label}</label>
            <div className={'col-sm-' + (12 - labelWidth)}>
                <p className="form-control-static">{props.value}</p>
            </div>
        </FormGroup>
    )
}

/**
 * ICONS
 */
var Icon = exports.Icon = (props) => {

    var type = Icon.normalizeType(props.type).map(t => 'fa-' + t).join(' ')

    return <i {...props} className={'fa ' + type} />

}
Icon.propTypes = { type: React.PropTypes.any.isRequired }
Icon.normalizeType = (type) => {

    var types = Array.isArray(type) ? type : type.split(' ')

    types = types.map(str => str.trim())

    var cleanTypes = types.filter((e, i) => {
        return types.indexOf(e) === i
    })

    return cleanTypes

}

var Spinner = exports.Spinner = function Spinner(props) {
    return <Icon {...props} type={['spinner', 'pulse']} />
}

var LIcon = exports.LIcon = function LIcon(props) {
    return props.loading ? <Spinner {...props} /> : <Icon {...props} />
}

export function RoleIcon(props) {
    switch (props.role || props.action) {

        case 'clear':
        case 'erase':
        case 'reset':
            return <Icon {...props} type="trash" />

        case 'search':
        case 'submit':
            return <LIcon {...props} type="search" />

        case 'next':
        case 'next-page':
            return <Icon {...props} type="chevron-right" />

        case 'previous':
        case 'previous-page':
            return <Icon {...props} type="chevron-left" />

        case 'upload':
            return <LIcon {...props} type="cloud-upload" />

        default:
            return <Icon {...props} type="exclamation-triangle" style={{ color: 'red' }}>[{props.role || props.action}]</Icon>

    }
}
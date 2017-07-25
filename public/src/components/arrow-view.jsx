import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const ArrowPath = styled.path`
    stroke-width:2;
    stroke:green;
    fill:white;
`

@observer
class ArrowView extends React.Component {
    render() {
        const { from, to } = this.props.arrow
        const [x1, y1, x2, y2] = [
            from.x + from.width / 2,
            from.y + 30,
            to.x + to.width / 2,
            to.y + 30
        ]
        return <ArrowPath d={`M${x1} ${y2} L${x2} ${y2}`}></ArrowPath>
    }
}

export default ArrowView
import React from 'react'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

import ArrowView from './arrow-view.jsx'
import BoxView from './box-view.jsx'

@inject('store')
@observer
class CanvasView extends React.Component {

    render() {
        const { store } = this.props
        return (
            <Canvas>
                <Svg>
                    {store.arrows.map(arrow =>
                        <ArrowView arrow={arrow} key={arrow.id} />)}
                </Svg>
                {
                    store.boxes.map(box =>
                        <BoxView store={store} box={box} key={box.id} />)
                }
            </Canvas>
        )
    }
}

const Canvas = styled.div`
    width:100%;
    height:100%;

`
const Svg = styled.svg`
    position:absolute;
    width:100%;
    height:100%;
`
export default CanvasView
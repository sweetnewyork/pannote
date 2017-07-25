import React from 'react'
import { DraggableCore } from 'react-draggable'
import styled from 'styled-components'

import { inject } from 'mobx-react'

import Box from '../stores/box.js'

const Icon = styled.div`
    position:relative;
    cursor: pointer;
    margin: 0.5rem;
    padding: 0.5rem;
    text-align: center;
    color: #fff;
    background-color: #999;
    transition: color 0.6s, background-color 0.6s;
    &:hover, &:active{
        color:#999;
        background-color: transparent;
    }
`

@inject('store')
class IconView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            clientX: 0,
            clientY: 0
        }
    }

    handleDrag = (e, dragInfo) => {
        this.setState({
            clientX: this.state.clientX + dragInfo.deltaX,
            clientY: this.state.clientY + dragInfo.deltaY
        })
    }

    handleStart = () => {

    }

    handleStop = (e, dragInfo) => {
        const box = new Box('New Box', dragInfo.x - 160, dragInfo.y - 24)
        this.props.store.addBox(box)
        this.setState({
            clientX: 0,
            clientY: 0
        })
    }

    render() {
        return (
            <DraggableCore onDrag={this.handleDrag}
                onStart={this.handleStart}
                onStop={this.handleStop}>
                <Icon style={{
                    transform: 'translate(' + this.state.clientX + 'px,' + this.state.clientY + 'px)'
                }}>
                    {this.props.children}
                </Icon>
            </DraggableCore>
        )
    }
}

export default IconView
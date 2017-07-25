import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import { DraggableCore } from 'react-draggable'
import styled from 'styled-components'
import { action } from 'mobx'
import { observer } from 'mobx-react'

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
]

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
]

@observer
class BoxView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdited: false,
            editorState: EditorState.createEmpty()
        }
    }

    handleChange = (editorState) => {
        this.setState({ editorState })
    }

    handleClick = (e) => {
        const { store } = this.props
        if (store.selection !== this) {
            store.setSelection(this)
        } else {
            this.setState({ isEdited: true })
        }
        e.stopPropagation()
    }

    handleDrag = (e, dragInfo) => {
        if (!this.state.isEdited) {
            this.props.box.increase(dragInfo.deltaX, dragInfo.deltaY)
        }
    }

    toggleBlockType = (blockType) => {
        this.handleChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle = (inlineStyle) => {
        this.handleChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const { box } = this.props,
            { editorState } = this.state
        return (
            <DraggableCore onDrag={this.handleDrag}>
                <Box style={{ left: box.x + 'px', top: box.y + 'px' }}
                    onClick={this.handleClick} onBlur={this.handleBlur}>
                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />
                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div style={{
                        borderTop: '1px solid #ddd',
                        marginTop: '0.5rem',
                        paddingTop: '1rem'
                    }}>
                        <Editor editorState={editorState} onChange={this.handleChange} />
                    </div>
                </Box>
            </DraggableCore>
        )
    }
}

export default BoxView

const BlockStyleControls = (props) => {
    const { editorState } = props
    const selection = editorState.getSelection()
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()
    return (
        <div>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    )
}

class StyleButton extends React.Component {
    constructor() {
        super()
    }

    handleToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    };

    render() {
        return (
            <Button onMouseDown={this.handleToggle} active={this.props.active}>
                {this.props.label}
            </Button>
        )
    }
}

const Box = styled.div`
    position:absolute;
    padding:1rem;
    width:20rem;
    border:solid 2px #011935;
    background-color:#fff;
`

const Button = styled.span`
    color: ${props => props.active ? '#333' : '#999'};
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0.25rem 0;
    display: inline-block;
`
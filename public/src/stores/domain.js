import { observable, action } from 'mobx'
import Box from './box'

class Store {
    @observable boxes = []
    @observable arrows = []
    @observable selection = null

    constructor(){
        this.boxes = []
        this.arrows = []
        this.selection = null
    }

    serializeBox(box) {
        return { ...box }
    }

    serializeArrow(arrow) {
        return {
            id: arrow.id,
            to: arrow.to.id,
            from: arrow.from.id
        }
    }

    serializeState() {
        return {
            boxes: this.boxes.map(this.serializeBox),
            arrows: this.arrows.map(this.serializeArrow),
            selection: this.selection ? this.selection.id : null
        }
    }

    @action deserializeState(data) {
        const findBox = id => this.boxes.find(box => box.id === id)
        this.boxes = data.boxes.map(box => new Box(box.name, box.x, box.y, box.id))
        this.arrows = data.arrows.map(arrow => ({
            id: arrow.id,
            from: findBox(arrow.from),
            to: findBox(arrow.to)
        }))
        this.selection = findBox(data.selection)
    }

    @action addBox(box) {
        this.boxes.push(box)
    }

    @action setSelection(box){
        this.selection = box
    }
}

export default Store
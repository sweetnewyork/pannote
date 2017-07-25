import { action, computed, observable } from 'mobx'
import { randomUuid } from '../utils'

class Box {
    id
    @observable name = 'Box'
    @observable x = 0
    @observable y = 0
    @computed get width() {
        const length = this.name.length * 16
        return length < 256 ? length : 256
    }

    constructor(name, x, y, id = randomUuid()) {
        this.name = name
        this.x = x
        this.y = y
        this.id = id
    }

    @action increase(x, y) {
        this.x += x
        this.y += y
    }
}

export default Box
class Frames {
    constructor() {
        this.frames = []
    }

    add_frame(rolls) {
        this.frames.push(rolls)
    }

    frame_count() {
        return this.frames.length
    }

    
}

module.exports = Frames;
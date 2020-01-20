class Sprite {
    constructor(a) {
        // SRC, order,delay,group
        this.img = new Image();
        this.img.src = a.src;
        this.order = a.order;
        this.delay = a.delay;
        this.group = a.group;
    }
}

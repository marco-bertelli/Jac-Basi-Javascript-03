export class Queue {
    queue;

    constructor() {
        this.queue = []
    }

    add(item) {
        this.queue.push(item);
    }

    getLength() {
        return this.queue.length;
    }

    removeFirst() {
        this.queue.splice(0, 1)
    }

    getNextClient() {
        return this.queue[0]
    }
}
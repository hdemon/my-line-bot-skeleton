let array = [];

class Queue {
  enqueue(entity) {
    // use some queue you like
    array.push(entity);

  }

  dequeue(entity) {
    // use some queue you like
    return array.shift();
  }

  list() {
    return array;
  }
}

module.exports = Queue;

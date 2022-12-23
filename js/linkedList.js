class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

class List {
  constructor() {
    this.head = {}
    this.tail = null
    this.size = 0
  }

  getTail(node) {
    if (node.next == null) return node

    return this.getTail(node.next)
  }

  getSize(node) {
    let size = 1
  
    if (!node.hasOwnProperty('next')) return 0
    if (node.next == null) return size
  
    return size + this.getSize(node.next)
  }

  reload(head) {
    this.tail = this.getTail(head)
    this.size = this.getSize(head)
  }

  append(value) {
    if (this.size == 0) {
      Object.assign(this.head, new Node(value))
    } else {
      let tail = this.tail
      tail.next = Object.assign({}, new Node(value))
    }

    this.reload(this.head)
  }

  prepend(value) {
    if (this.size == 0) {
      this.append(value)
    } else {
      let tail = this.head

      this.head = Object.assign({}, new Node(value))
      this.head.next = tail
    }

    this.reload(this.head)
  }

  at(index, node = this.head) {
    if (index == 0) return node

    return this.at(index - 1, node.next)
  }

  pop() {
    if (this.size == 0) return null

    if (this.size > 2) {
      let newTail = this.at(this.size - 2)

      newTail.next = null
    } else {
      this.head = {}
    }

    this.reload(this.head)
  }

  contains(value, node = this.head) {
    if (node.value == value) return true
    if (node.next == null) return false

    return this.contains(value, node.next)
  }

  find(value, index = 0) {
    let node = this.at(index)

    if (!this.contains(value)) return null
    if (node.value == value) return index

    return this.find(value, index + 1)
  }

  toString() {
    if (this.size == 0) return null

    let string = ''

    for (let node = this.head; node; node = node.next) {
      string += `( ${node.value} ) -> `
    }

    return string += 'null'
  }

  insertAt(value, index) {
    if (index > this.size) return null

    if (index == 0) {
      this.prepend(value)
    } else if (index == this.size) {
      this.append(value)
    } else {
      let prev = this.at(index - 1)
      let next = this.at(index)
      let node = Object.assign({}, new Node(value))

      node.next = next
      prev.next = node
      
      this.reload(this.head)
    }
  }

  removeAt(index) {
    if (index >= this.size) return null
    if (index == this.size - 1) this.pop()

    if (index > 0 && index < this.size) {
      let prev = this.at(index - 1)
      let next = this.at(index + 1)

      prev.next = next
    } else if (index == 0) {
      let oldHead = this.head
      this.head = oldHead.next
    }

    this.reload(this.head)
  }
}

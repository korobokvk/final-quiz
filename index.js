// const palindrome = 'aabbaa'
// const a = 'abca'
// const b = 'aacb'
// // If string is palindrome
// function isPalindrome(str) {
//   for (let i = 0; i < str.length / 2; i++) {
//     if (str.charAt(i) !== str.charAt(str.length - 1 - i)) {
//       return false
//     }
//   }
//   return true
// }
// console.log(isPalindrome(palindrome))

// // if string is anagram to another string
// function isAnagram(a, b) {
//   if (a.length !== b.length) return false
//   const mapA = new Map()
//   for (let i = 0; i < a.length; i++) {
//     if (mapA.has(a[i])) {
//       let val = mapA.get(a[i])
//       mapA.set(a[i], val + 1)
//     } else {
//       mapA.set(a[i], 1)
//     }
//   }
//   for (let i = 0; i < b.length; i++) {
//     if (!mapA.has(b[i])) return false
//     if (mapA.get(b[i]) === 0) return false
//     let val = mapA.get(b[i])
//     mapA.set(b[i], val - 1)
//   }
//   return true
// }
// console.log(isAnagram(a, b))

// 1. Соответстиве массивам
function isExist(child, parent) {
  const hashChildArray = new Set(child)
  for (let i = 0; i < parent.length / 2; i++) {
    hashChildArray.delete(parent[parent.length - 1 - i])
    hashChildArray.delete(parent[i])
  }
  if (hashChildArray.size) {
    return false
  } else {
    return true
  }
}
console.log(isExist([1, 2, 3, 4, 5, 6, 13], [13, 1, 2, 3, 4, 6, 6, 5, 7, 45, 34]), 'exist')

////////////////////////////?*****************************?///////////////////////////////////
/**
 *
 * 2. Перемещение отрицательных чисел в конец односвязного списка
 */
function Node(value) {
  // Конструктор узла
  this.value = value
  this.next = null
}
function SingleList() {
  // Инициализация класса "список"
  this._length = 0
  this.head = null
  this.message = {
    nonNegative: 'Negative value is non-existent',
    empty: 'List is empty',
  }
}

SingleList.prototype.add = function(value) {
  // Добавление в список
  const node = new Node(value)
  let currentNode = this.head

  if (!currentNode) {
    this.head = node
    this._length++

    return node
  }

  while (currentNode.next) {
    currentNode = currentNode.next
  }

  currentNode.next = node
  this._length++
  return node
}

SingleList.prototype.searchNodeAt = function(position) {
  // Поиск узла по индексу
  const length = this._length

  let currentNode = this.head
  let count = 1

  if (length === 0 || position < 1 || position > length) {
    throw new Error(this.message.empty)
  }

  while (count < position) {
    currentNode = currentNode.next
    count++
  }

  return currentNode
}
//Поиск негативных значений
SingleList.prototype.findNegative = function() {
  let currentNode = this.head
  const length = this._length
  let count = 0
  if (!currentNode) {
    throw new Error(this.message.empty)
  }
  const arrOfVal = []

  while (count < length) {
    count++
    if (currentNode && currentNode.value < 0) {
      arrOfVal.push(currentNode.value)
    }
    currentNode = currentNode && currentNode.next
  }

  if (count === length) {
    for (let i = 0; i < arrOfVal.length; i++) {
      this.swapToEnd(arrOfVal[i])
    }
  }
}
SingleList.prototype.remove = function(position) {
  // Удаление узла
  let currentNode = this.head
  const length = this._length
  let count = 0
  let beforeNodeToDelete = null
  let nodeToDelete = null
  let deletedNode = null

  if (position < 0 || position > length) {
    throw new Error(this.message.empty)
  }

  if (position === 1) {
    this.head = currentNode.next
    deletedNode = currentNode
    currentNode = null
    this._length--

    return deletedNode
  }

  while (count < position) {
    beforeNodeToDelete = currentNode
    nodeToDelete = currentNode.next
    count++
  }

  beforeNodeToDelete.next = nodeToDelete.next
  deletedNode = nodeToDelete
  nodeToDelete = null
  this._length--
  return deletedNode
}
// Перемещение элемента в конец списка
SingleList.prototype.swapToEnd = function(value) {
  let temp = this.head
  let prevToFindable
  let nextToFindable
  let findable
  let lustElem

  while (temp) {
    if (temp.next && temp.next.value === value) {
      prevToFindable = temp
      findable = temp.next
      nextToFindable = findable.next
      prevToFindable.next = nextToFindable
    }

    if (!temp.next) {
      findable.next = null
      lustElem = temp
      lustElem.next = findable
      temp = null
    }

    temp = temp && temp.next
  }
}

const newList = new SingleList()
newList.add(12)
newList.add(10)
newList.add(-14)
newList.add(23)
newList.add(-10)
newList.add(10)
newList.findNegative()
console.log(newList.head) // Result

//////////////////?********************?//////////////////////////////
// GRAPH CYCLE
const vertexes = []
const graphMatrix = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]
let finalVertexes = -1
function findVertexes(current) {
  for (let i = 0; i < graphMatrix[current].length; i++) {
    if (graphMatrix[current][i] === 1) {
      vertexes.push(current)
      if (i === current || ~vertexes.indexOf(i)) {
        finalVertexes = i
        return true
      }
      const isFinish = !!findVertexes(i)
      if (isFinish) return true
    }
  }
  vertexes.pop()
  return false
}
function cycles() {
  if (!findVertexes(0)) return false
  let resultStr = ''
  let next = -1
  while (next !== finalVertexes) {
    next = vertexes.pop()
    resultStr += ` ${next}`
  }
  return resultStr
}
console.log(cycles())
/////////////////***************************/////////////////////
//Utils
function Queue() {
  this.items = []
  this.enqueue = (element) => {
    this.items.push(element)
  }
  this.dequeue = () => {
    if (this.isEmpty()) return undefined
    return this.items.shift()
  }
  this.isEmpty = () => {
    return this.items.length === 0
  }
}

function findIndex(arr, data) {
  let index

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].data === data) {
      index = i
    }
  }
  return index
}

// Init constructor
function TreeNode(data) {
  this.data = data
  this.parent = null
  this.children = []
}
function Tree(data) {
  const node = new TreeNode(data)
  this._root = node
}

Tree.prototype.DFS = function(cb) {
  ;(function recursive(currentNode) {
    for (let i = 0; i < currentNode.children.length; i++) {
      recursive(currentNode.children[i])
    }
    cb(currentNode)
  })(this._root)
}

Tree.prototype.BFS = function(callback) {
  var queue = new Queue()

  queue.enqueue(this._root)

  currentTree = queue.dequeue()

  while (currentTree) {
    if (currentTree.children) {
      for (var i = 0; i < currentTree.children.length; i++) {
        queue.enqueue(currentTree.children[i])
      }
    }

    callback(currentTree)
    currentTree = queue.dequeue()
  }
}

Tree.prototype.contains = function(callback, traversal) {
  traversal.call(this, callback)
}

Tree.prototype.add = function(data, toData, traversal) {
  const children = new TreeNode(data)
  let parent = null

  const cb = function(node) {
    if (node.data === toData) {
      parent = node
    }
  }

  this.contains(cb, traversal)

  if (parent) {
    parent.children.push(children)
    children.parent = parent
  }
}

Tree.prototype.remove = function(data, fromData, traversal) {
  let parent = null
  let childToRemove = null
  let index

  const callback = function(node) {
    if (node.data === fromData) {
      parent = node
    }
  }

  this.contains(callback, traversal)

  if (parent) {
    index = findIndex(parent.children, data)

    if (index === undefined) {
      throw new Error('Node to remove does not exist.')
    } else {
      childToRemove = parent.children.splice(index, 1)
    }
  } else {
    throw new Error('Parent does not exist.')
  }

  return childToRemove
}

Tree.prototype.removeDuplicate = function() {
  const dataSet = new Set()
  const cb = (node) => {
    if (dataSet.has(node.data)) {
      this.remove(node.data, node.parent.data, this.DFS)
    } else {
      dataSet.add(node.data)
    }
  }
  this.BFS(cb)
}

const tree = new Tree(1)
tree.add(2, 1, tree.DFS)
tree.add(3, 2, tree.DFS)
tree.add(4, 2, tree.DFS)
tree.add(5, 4, tree.DFS)
tree.add(5, 4, tree.DFS)
tree.add(5, 4, tree.DFS)
tree.add(6, 3, tree.DFS)
tree.add(6, 3, tree.DFS)
tree.add(6, 3, tree.DFS)
tree.removeDuplicate()
console.log(tree._root)

/////////////////////************************************/////////////////////////////////
function findPalindrome(string) {
  const length = string.length
  let result = ''

  const center = function(left, right) {
    while (left >= 0 && right < length && string[left] === string[right]) {
      left--
      right++
    }

    return string.slice(left + 1, right)
  }

  for (let i = 0; i < length - 1; i++) {
    let oddPal = center(i, i + 1)
    let evenPal = center(i, i)
    if (oddPal.length > result.length) result = oddPal
    if (evenPal.length > result.length) result = evenPal
  }
  return result
}

console.log(findPalindrome('nannoonisredder'))

function FastScanner (words) {
  this.root = buildTree(words)
}

function buildTree (words) {
  // 词汇去重
  words = dedupAndSort(words)
  const root = {
    next: {}, // 子节点指针
    val: null, // 当前节点的字符，null表示根节点
    back: null, // 跳跃指针，也称失败指针
    parent: null, // 父节点指针,
    accept: false // 是否形成了一个完整的词汇，中间节点也可能为true
  }

  for (let i = 0; i < words.length; i++) {
    addWord(root, words[i])
  }

  fallbackAll(root)
  return root
}

function dedupAndSort (words) {
  // 砍掉空格
  words = words.map(function (word) {
    return word.trim()
  })
  // 滤掉空串
  words = words.filter(function (word) {
    return word.length > 0
  })
  const seen = {}
  const out = []
  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    if (!seen[word]) {
      seen[word] = true
      out[out.length] = word
    }
  }
  return out.sort()
}

function addWord (root, word) {
  let current = root
  for (let i = 0; i < word.length; i++) {
    const c = word[i]
    const next = current.next[c]
    if (!next) {
      current.next[c] = {
        next: {},
        val: c,
        accept: false,
        back: root,
        parent: current
      }
    }
    current = current.next[c]
  }
  current.accept = true
}

function fallbackAll (root) {
  let curExpands = Object.values(root.next)
  while (curExpands.length > 0) {
    const nextExpands = []
    for (let i = 0; i < curExpands.length; i++) {
      const node = curExpands[i]
      for (const c in node.next) {
        nextExpands.push(node.next[c])
      }
      const parent = node.parent
      let back = parent.back
      while (back != null) {
        // 匹配父节点的跳跃节点的子节点
        const child = back.next[node.val]
        if (child) {
          node.back = child
          break
        }
        back = back.back
      }
    }
    curExpands = nextExpands
  }
}

function fallback (root, word) {
  let current = root.next[word[0]]
  for (let i = 1; i < word.length; i++) {
    const c = word[i]
    const parent = current.parent
    let back = parent.back
    while (back != null) {
      // 匹配父节点的跳跃节点的子节点
      const child = back.next[current.val]
      if (child) {
        current.back = child
        break
      }
      back = back.back
    }
    current = current.next[c]
  }
}

function selectLongest (offsetWords) {
  const stands = {}
  for (let i = 0; i < offsetWords.length; i++) {
    const offword = offsetWords[i]
    const word = stands[offword[0]]
    if (!word || word.length < offword[1].length) {
      stands[offword[0]] = offword[1]
    }
  }
  const offsets = Object.keys(stands).map(function (key) {
    return parseInt(key)
  }).sort(function (a, b) {
    return a - b
  })
  return offsets.map(function (off) {
    return [off, stands[off]]
  })
}

// 从子节点往上直到根结点，收集单词
function collect (node) {
  const word = []
  while (node.val != null) {
    word.unshift(node.val)
    node = node.parent
  }
  return word.join('')
}

FastScanner.prototype.add = function add (word) {
  word = word.trim()
  if (word.length == 0) {
    return
  }
  addWord(this.root, word)
  fallback(this.root, word)
}

// 定位子节点
FastScanner.prototype.locate = function locate (word) {
  let current = this.root.next[word[0]]
  for (let i = 1; i < word.length; i++) {
    const c = word[i]
    current = current.next[c]
    if (current == null) {
      break
    }
  }
  return current
}

FastScanner.prototype.hits = function hits (content, options) {
  const offWords = this.search(content, options)
  const seen = {}
  for (let i = 0; i < offWords.length; i++) {
    const word = offWords[i][1]
    const count = seen[word] || 0
    seen[word] = count + 1
  }
  return seen
}

FastScanner.prototype.search = function search (content, options) {
  const offWords = []
  let current = this.root
  options = options || {}
  for (let i = 0; i < content.length; i++) {
    const c = content[i]
    let next = current.next[c]
    if (!next) {
      // 当前分支上找不到，跳到其它分支上找
      let back = current.back
      while (back != null) {
        next = back.next[c]
        if (next) {
          break
        }
        back = back.back
      }
    }
    if (next) {
      let back = next
      do {
        // 收集匹配的词汇
        if (back.accept) {
          const word = collect(back)
          offWords.push([i - word.length + 1, word])
          // 只选第一个词
          if (options.quick) {
            return offWords
          }
        }
        back = back.back
      } while (back != this.root)
      current = next
      continue
    }
    // 重置
    current = this.root
  }
  // 同一个位置选最长的
  if (options.longest) {
    return selectLongest(offWords)
  }
  return offWords
}

module.exports = FastScanner

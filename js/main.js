let sentenceCounter = 1
let tagClock = 0
const tags = ['a',
              'abbr',
              'acronym',
              'address',
              'area',
              'b',
              'base',
              'basefont',
              'bdo',
              'big',
              'blockquote',
              // 'br', removed because it makes objects disappear
              'button',
              'caption',
              'center',
              'cite',
              'code',
              // 'col', removed because it makes objects disappear
              // 'colgroup', removed because it makes objects disappear
              'dd',
              'del',
              'dfn',
              'dir',
              'div',
              'dl',
              'dt',
              'em',
              'fieldset',
              'font',
              // 'form', removed because it makes objects disappear
              // 'frame', removed because it makes objects disappear
              // 'frameset', removed because it makes objects disappear
              // 'head', removed because it makes objects disappear
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'hr',
              'i',
              // 'img', removed because it causes a deadend
              // 'input', removed because it causes a deadend
              'ins',
              'kbd',
              'label',
              'legend',
              'li',
              // 'link', removed because it makes objects disappear
              'map',
              'menu',
              // 'meta', removed because it makes objects disappear
              'object',
              'ol',
              'p',
              //'param', removed because it makes objects disappear
              'pre',
              'q',
              's',
              'samp',
              'small',
              'span',
              'strike',
              'strong',
              'sub',
              'sup',
              'table',
              'tbody',
              'td',
              'tfoot',
              'th',
              'thead',
              'tr',
              'tt',
              'u',
              'ul',
              'var']

const getRandomHtmlTag = () => tags[Math.floor(Math.random() * tags.length)]

const nestSentence = (e) => {
  const tag = getRandomHtmlTag()
  const elem = document.createElement(tag)
  elem.textContent = e.target.textContent
  elem.style.minWidth = 10 + 'px'
  elem.style.minHeight = 10 +'px'
  e.target.textContent = ''
  e.target.appendChild(elem)
}

const createNewSentence = (e) => {
  const tag = getRandomHtmlTag()
  const elem = document.createElement(tag)
  elem.textContent = `Sentence ${sentenceCounter} contained within some HTML tags, up to you!`
  sentenceCounter++
  elem.style.position = 'absolute'
  elem.style.top = e.clientY + 'px'
  elem.style.left = e.clientX +'px'
  elem.style.minWidth = 10 + 'px'
  elem.style.minHeight = 10 +'px'
  document.body.appendChild(elem)
}

const duplicateItem = (item) => {

}

const handleClick = (e) => {
  if (e.target === document.documentElement) {
    createNewSentence(e)
  }
  else {
    nestSentence(e)
  }
}

const iterateToBottom = (elem) => {
  let parent = elem
  while (elem.children.length > 0) {
    parent = elem
    elem = elem.children[0]
  }
  return {elem: elem, parent: parent}
}

const handleKey = (e) => {
  if (e.key === 'ArrowDown') {
    Array.from(document.body.children).forEach(item => nestSentence({ target: iterateToBottom(item).elem}))
  }
  if (e.key === 'ArrowLeft') {
    Array.from(document.body.children).forEach(item => {
      const res = iterateToBottom(item)
      res.parent.appendChild(res.elem.cloneNode(true))
    })
  }
}

document.addEventListener('mousedown', handleClick)
document.addEventListener('keydown', handleKey)

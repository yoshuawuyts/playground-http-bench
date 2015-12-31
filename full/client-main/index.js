const markdown = require('virtual-markdown')
const h = require('virtual-dom/h')
const path = require('path')
const fs = require('fs')

module.exports = render

function render () {
  return h('div#body', [
    h('section#content', createMarkdown())
  ])
}

function createMarkdown () {
  const file = fs.readFileSync(path.join(__dirname, 'content.md'), 'utf8')
  return markdown(file)
}

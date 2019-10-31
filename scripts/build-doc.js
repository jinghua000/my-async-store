const jsdoc2md = require('jsdoc-to-markdown')
const dmd = require('dmd')
const path = require('path')
const fs = require('fs')
const docPath = path.join(__dirname, '../docs/API_DOCUMENTATION.md')
const filePath = path.join(__dirname, '../dist/my-async-store.esm.js')
const f = require('shadow-fns')

let __docs__

function write (data) {
  fs.writeFile(docPath, data, 'utf8', err => {
    if (err) throw err
  })
}

function makeNav () {
  let str = ''

  __docs__.forEach(elem => {
    str += `- [${elem.id}](#${elem.id})`
    str += '  \n\n'
  })

  return str
}

function filterOptions (arr) {

  __docs__ = arr

  return arr.map(elem => {
    elem.scope = void 0
    elem.kind = void 0

    return elem
  })
}

function generateMarkdown () {
  return new Promise(resolve => {
    jsdoc2md
      .getTemplateData({ files: filePath })
      // .then(f.trace('input'))
      .then(filterOptions)
      // .then(f.trace('ouput'))
      .then(dmd)
      .then(resolve)
  })
}

function enrich (doc) {
  return [
    `# API documentation  \n\n`,
    `All methods bellow export from the package.  \n\n`,
    makeNav(),
    doc
  ].join('')
}

function build () {
  generateMarkdown()
    .then(enrich)
    .then(write)
}

build()
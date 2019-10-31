const jsdoc2md = require('jsdoc-to-markdown')
const dmd = require('dmd')
const path = require('path')
const fs = require('fs')
const docPath = path.join(__dirname, '../docs/API_DOCUMENTATION.md')
const filePath = path.join(__dirname, '../dist/my-async-store.esm.js')

function write (data) {
  fs.writeFile(docPath, data, 'utf8', err => {
    if (err) throw err
  })
}

function generateMarkdown () {
  return new Promise(resolve => {
    jsdoc2md
      .getTemplateData({ files: filePath })
      .then(dmd)
      .then(resolve)
  })
}

function build () {
  generateMarkdown()
    .then(write)
}

build()
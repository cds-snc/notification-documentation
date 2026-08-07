'use strict'

// Assigns heading ids that match VuePress's slugify so that
// remark-validate-links resolves anchors the same way the rendered site does.
// VuePress strips diacritics (e.g. "Types de clés" -> "types-de-cles") while
// remark-validate-links' default github-slugger keeps them, which caused valid
// site links to be reported as broken (and invalid ones to pass).
// Slugify mirrors @vuepress/shared-utils.

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’–—<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

function slugify(str) {
  return str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()
}

function textOf(node) {
  if (typeof node.value === 'string') return node.value
  if (node.children) return node.children.map(textOf).join('')
  return ''
}

module.exports = function remarkVuepressSlug() {
  return function transformer(tree) {
    const used = Object.create(null)

    walk(tree)

    function walk(node) {
      if (node.type === 'heading') {
        const base = slugify(textOf(node))
        let unique = base
        let i = 2
        while (used[unique]) {
          unique = base + '-' + i
          i++
        }
        used[unique] = true

        const data = node.data || (node.data = {})
        const props = data.hProperties || (data.hProperties = {})
        data.id = unique
        props.id = unique
      }

      if (node.children) {
        node.children.forEach(walk)
      }
    }
  }
}

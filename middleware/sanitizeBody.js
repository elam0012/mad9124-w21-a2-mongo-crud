const debug = require('debug')('sanitize:body')
const xss = require('xss')

const stripTags = payload => {
  let attributes = {...payload}
  for (let key in attributes) {
    if (attributes[key] instanceof Array) {
      attributes[key] = attributes[key].map(element => {
        return typeof element === 'string' ? sanitize(element) : stripTags(element)
      })
    } else if (attributes[key] instanceof Object) {
      attributes[key] = stripTags(attributes[key])
    } else {
      attributes[key] = sanitize(attributes[key])
    }
  }
  return attributes
}

const sanitize = sourceString => {
  return xss(sourceString, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script']
  })
}

module.exports = (req, res, next) => {
  debug({body: req.body.data})
  const {id, _id, ...attributes} = req.body.data
  debug({attributes})
  const sanitizedBody = stripTags(attributes)
  debug({sanitizedBody: sanitizedBody})
  req.sanitizedBody = sanitizedBody
  next()
}
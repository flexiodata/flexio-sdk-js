var _ = require('../lodash-local')
var util = require('../util')

// .create(columns_array)
// .create(vfs_file, [mime_type])
// .create(vfs_file, columns_array)

var create = function(p0, p1) {

  if (Array.isArray(p0)) {
    var params = {
      content_type: "application/vnd.flexio.table",
      columns: p0
    }

  } else {

    var params = {
      path: p0
    }

    if (p1 !== undefined) {
      if (Array.isArray(p1)) {
        params.columns = p1
      } else {
        params.content_type = p1
      }
    }

    return _.assign({}, params, { op: 'create' })
  }
}

create.toCode = function(json, Flexio) {
  var params = util.getTaskParams(json)
  var path = JSON.stringify(params.path) || undefined
  var content_type = JSON.stringify(params.content_type) || undefined
  var columns = JSON.stringify(params.columns) || undefined

  if (path !== undefined) {

    if (columns !== undefined) {
      return 'create(' + path + ', ' + columns + ')'
    } else if (content_type !== undefined) {
      return 'create(' + path + ', ' + content_type + ')'
    } else {
      return 'create(' + path + ')'
    }

  } else {

    if (columns !== undefined) {
      return 'create(' + columns + ')'
    } else if (content_type !== undefined) {
      return ''
    }
  }

}

module.exports = create

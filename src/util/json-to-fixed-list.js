// individual lodash includes
import assign from 'lodash.assign'
import map from 'lodash.map'
import forEach from 'lodash.foreach'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'
import isNumber from 'lodash.isnumber'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import mapValues from 'lodash.mapvalues'

// emulate lodash syntax
var _ = {
  assign,
  map,
  forEach,
  isArray,
  isString,
  isNumber,
  isObject,
  isFunction,
  mapValues
}

var default_cfg = {
  show_header: true,
  spacing: 1
}

var valuesToLengths = function(arr) {
  return _.map(arr, (a) => {
    return _.mapValues(a, (val, key) => {
      if (_.isObject(val) || _.isArray(val) || _.isFunction(val))
        return ''
         else if (_.isString(val))
        return val.length
         else
        return val.toString().length
    })
  })
}

var getColumnWidths = function(arr, cfg) {
  var retval = {}

  _.forEach(arr, (a) => {
    _.forEach(a, (len, key) => {
      if (retval[key])
        retval[key] = Math.max(len, retval[key])
         else
        retval[key] = len
    })
  })

  // take into account header widths
  if (cfg.show_header === true)
  {
    _.forEach(retval, (len, key) => {
      retval[key] = Math.max(len, key.length)
    })
  }

  // add spacing to column width
  _.forEach(retval, (len, key) => {
    retval[key] = len + cfg.spacing
  })

  return retval
}

var renderList = function(arr, cfg, lengths) {
  var retval = ''

  if (cfg.show_header === true)
  {
    _.forEach(lengths, (len, key) => {
      retval += (key + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'

    _.forEach(lengths, (len, key) => {
      retval += ('-'.repeat(len) + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  }

  _.forEach(arr, (a) => {
    _.forEach(a, (val, key) => {
      var len = lengths[key]
      retval += (val + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  })

  return retval
}

export default (items, cfg) => {
  var cfg = _.assign({}, default_cfg, cfg)

  if (cfg.show_header !== false)
    cfg.show_header = true

  if (!_.isNumber(cfg.spacing))
    cfg.spacing = 1

  if (!_.isArray(items) || items.length == 0)
    return ''

  var lengths = getColumnWidths(valuesToLengths(items), cfg)
  return renderList(items, cfg, lengths)
}

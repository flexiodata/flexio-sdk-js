// individual lodash includes
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
  map,
  forEach,
  isArray,
  isString,
  isNumber,
  isObject,
  isFunction,
  mapValues
}

var getLengths = function(arr) {
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

var reduceToMaxLengths = function(arr) {
  var retval = {}

  _.forEach(arr, (a) => {
    _.forEach(a, (val, key) => {
      if (retval[key])
        retval[key] = Math.max(val, retval[key])
         else
        retval[key] = val
    })
  })

  return retval
}

var arrayToList = function(arr, show_header, spacing, max_lengths) {
  var retval = ''


  if (show_header === true)
  {
    _.forEach(max_lengths, (val, key) => {
      var len = val + spacing
      retval += (key + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'

    _.forEach(max_lengths, (val, key) => {
      var len = val + spacing
      retval += ('-'.repeat(val) + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  }

  _.forEach(arr, (a) => {
    _.forEach(a, (val, key) => {
      var len = max_lengths[key] + spacing
      retval += (val + ' '.repeat(len)).substr(0, len)
    })

    retval += '\n'
  })

  return retval
}

export default (arr, show_header, spacing) => {
  if (show_header !== false)
    show_header = true

  if (!_.isNumber(spacing))
    spacing = 1

  if (!_.isArray(arr) || arr.length == 0)
    return ''

  var max_lengths = reduceToMaxLengths(getLengths(arr))
  return arrayToList(arr, show_header, spacing, max_lengths)
}

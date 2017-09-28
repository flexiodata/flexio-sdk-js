import _ from 'lodash'
import { TASK_TYPE_CONVERT } from '../constants/task-type'

// token delimiters; other types of delimiters are allowed as well
const DELIMITER_NONE              = '{none}'
const DELIMITER_COMMA             = '{comma}'
const DELIMITER_SEMICOLON         = '{semicolon}'
const DELIMITER_PIPE              = '{pipe}'
const DELIMITER_TAB               = '{tab}'
const DELIMITER_SPACE             = '{space}'

// token text qualifiers
const TEXT_QUALIFIER_NONE         = '{none}'
const TEXT_QUALIFIER_SINGLE_QUOTE = '{single-quote}'
const TEXT_QUALIFIER_DOUBLE_QUOTE = '{double-quote}'

// conversion formats
const FORMAT_DELIMITED_TEXT = 'delimited'
const FORMAT_FIXED_LENGTH   = 'fixed'
const FORMAT_JSON           = 'json'
const FORMAT_RSS            = 'rss'
const FORMAT_PDF            = 'pdf'
const FORMAT_TABLE          = 'table'

// shorthand conversion strings (auto-configure)
const SHORTHAND_CSV = 'csv'
const SHORTHAND_TSV = 'tsv'

// task definition function
var convert = (input, output) => {
  var type = TASK_TYPE_CONVERT

  var task = {
    type,
    params: {}
  }

  var csv_format = {
    format: FORMAT_DELIMITED_TEXT,
    delimiter: DELIMITER_COMMA,
    header: true,
    qualifier: TEXT_QUALIFIER_DOUBLE_QUOTE
  }

  var tsv_format = {
    format: FORMAT_DELIMITED_TEXT,
    delimiter: DELIMITER_TAB,
    header: true,
    qualifier: TEXT_QUALIFIER_NONE
  }

  // convert input

  if (_.isString(input))
  {
    if (input == SHORTHAND_CSV)
      _.set(task, 'params.input', csv_format)
       else if (input == SHORTHAND_TSV)
      _.set(task, 'params.input', tsv_format)
       else
      _.set(task, 'params.input.format', input)
  }
   else if (_.isObject(input))
  {
    _.set(task, 'params.input', input)
  }

  // convert output

  if (_.isString(output))
  {
    if (output == SHORTHAND_CSV)
      _.set(task, 'params.output', csv_format)
       else if (output == SHORTHAND_TSV)
      _.set(task, 'params.output', tsv_format)
       else
      _.set(task, 'params.output.format', output)
  }
   else if (_.isObject(output))
  {
    _.set(task, 'params.output', output)
  }

  return task
}

export default convert

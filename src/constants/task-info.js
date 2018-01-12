import * as ops from './task-op'

/* task info */

const CALC_FIELD = {
  name: 'Calculation',
  op: ops.TASK_OP_CALC,
  icon: 'flash_on',
  bg_color: 'bg-task-green'
}

const COMMENT = {
  name: 'Comment',
  op: ops.TASK_OP_COMMENT,
  icon: 'comment',
  bg_color: 'bg-task-blue'
}

const CONVERT = {
  name: 'Convert',
  op: ops.TASK_OP_CONVERT,
  icon: 'settings',
  bg_color: 'bg-task-blue'
}

const COPY = {
  name: 'Copy',
  op: ops.TASK_OP_COPY,
  icon: 'content_copy',
  bg_color: 'bg-task-orange'
}

const CREATE = {
  name: 'Copy',
  op: ops.TASK_OP_CREATE,
  icon: 'content_copy',
  bg_color: 'bg-task-orange'
}

const CUSTOM = {
  name: 'Custom',
  op: ops.TASK_OP_CUSTOM,
  icon: 'build',
  bg_color: 'bg-task-orange'
}

const DISTINCT = {
  name: 'Distinct',
  op: ops.TASK_OP_DISTINCT,
  icon: 'clear_all',
  bg_color: 'bg-task-green'
}

const DUPLICATE = {
  name: 'Duplicate',
  op: ops.TASK_OP_DUPLICATE,
  icon: 'content_copy',
  bg_color: 'bg-task-green'
}

const EMAIL_SEND = {
  name: 'Email',
  op: ops.TASK_OP_EMAIL_SEND,
  icon: 'mail_outline',
  bg_color: 'bg-task-blue'
}

const EXECUTE = {
  name: 'Execute',
  op: ops.TASK_OP_EXECUTE,
  icon: 'code',
  bg_color: 'bg-task-purple'
}

const FIND_REPLACE = {
  name: 'Find/Replace',
  op: ops.TASK_OP_FIND_REPLACE,
  icon: 'find_replace',
  bg_color: 'bg-task-orange'
}

const FILTER = {
  name: 'Filter',
  op: ops.TASK_OP_FILTER,
  icon: 'filter_list',
  bg_color: 'bg-task-green'
}

const GROUP = {
  name: 'Group',
  op: ops.TASK_OP_GROUP,
  icon: 'functions',
  bg_color: 'bg-task-green'
}

const INPUT = {
  name: 'Input',
  op: ops.TASK_OP_INPUT,
  icon: 'input',
  bg_color: 'bg-task-blue'
}

const INSERT = {
  name: 'Input',
  op: ops.TASK_OP_INSERT,
  icon: 'input',
  bg_color: 'bg-task-blue'
}

const LIMIT = {
  name: 'Limit',
  op: ops.TASK_OP_LIMIT,
  icon: 'play_for_work',
  bg_color: 'bg-task-green'
}

const LIST = {
  name: 'List',
  op: ops.TASK_OP_LIST,
  icon: 'play_for_work',
  bg_color: 'bg-task-green'
}

const MERGE = {
  name: 'Merge',
  op: ops.TASK_OP_MERGE,
  icon: 'call_merge',
  bg_color: 'bg-task-green'
}

const NOP = {
  name: 'No Op.',
  op: ops.TASK_OP_NOP,
  icon: 'build',
  bg_color: 'bg-task-orange'
}

const OUTPUT = {
  name: 'Output',
  op: ops.TASK_OP_OUTPUT,
  icon: 'input',
  bg_color: 'bg-task-blue'
}

const PROMPT = {
  name: 'Prompt',
  op: ops.TASK_OP_PROMPT,
  icon: 'info_outline',
  bg_color: 'bg-task-blue'
}

const R = {
  name: 'R',
  op: ops.TASK_OP_R,
  icon: '',
  bg_color: 'bg-task-purple'
}

const READ = {
  name: 'Rename',
  op: ops.TASK_OP_READ,
  icon: 'input',
  bg_color: 'bg-task-orange'
}

const RENAME = {
  name: 'Rename',
  op: ops.TASK_OP_RENAME,
  icon: 'edit',
  bg_color: 'bg-task-orange'
}

const RENDER = {
  name: 'Render',
  op: ops.TASK_OP_RENDER,
  icon: 'web',
  bg_color: 'bg-task-orange'
}

const REQUEST = {
  name: 'Request',
  op: ops.TASK_OP_REQUEST,
  icon: 'http',
  bg_color: 'bg-task-blue'
}

const SEARCH = {
  name: 'Search',
  op: ops.TASK_OP_SEARCH,
  icon: 'search',
  bg_color: 'bg-task-green'
}

const SELECT = {
  name: 'Select',
  op: ops.TASK_OP_SELECT,
  icon: 'view_carousel',
  bg_color: 'bg-task-orange'
}

const SEQUENCE = {
  name: 'Sequence',
  op: ops.TASK_OP_SEQUENCE,
  icon: 'view_carousel',
  bg_color: 'bg-task-orange'
}

const SET = {
  name: 'Select',
  op: ops.TASK_OP_SET,
  icon: 'view_carousel',
  bg_color: 'bg-task-orange'
}

const SORT = {
  name: 'Sort',
  op: ops.TASK_OP_SORT,
  icon: 'sort_by_alpha',
  bg_color: 'bg-task-green'
}

const TRANSFORM = {
  name: 'Transform',
  op: ops.TASK_OP_TRANSFORM,
  icon: 'transform',
  bg_color: 'bg-task-orange'
}

const WRITE = {
  name: 'Rename',
  op: ops.TASK_OP_WRITE,
  icon: 'input',
  bg_color: 'bg-task-orange'
}

/* exports */

//export const TASK_INFO_CALC_FIELD    = CALC_FIELD
export const TASK_INFO_COMMENT       = COMMENT
export const TASK_INFO_CONVERT       = CONVERT
//export const TASK_INFO_COPY          = COPY
export const TASK_INFO_CREATE        = CREATE
//export const TASK_INFO_CUSTOM        = CUSTOM
//export const TASK_INFO_DISTINCT      = DISTINCT
//export const TASK_INFO_DUPLICATE     = DUPLICATE
export const TASK_INFO_EMAIL_SEND    = EMAIL_SEND
export const TASK_INFO_EXECUTE       = EXECUTE
//export const TASK_INFO_FIND_REPLACE  = FIND_REPLACE
//export const TASK_INFO_FILTER        = FILTER
//export const TASK_INFO_GROUP         = GROUP
export const TASK_INFO_INPUT         = INPUT
export const TASK_INFO_INSERT        = INSERT
export const TASK_INFO_LIMIT         = LIMIT
export const TASK_INFO_MERGE         = MERGE
//export const TASK_INFO_NOP           = NOP
export const TASK_INFO_OUTPUT        = OUTPUT
//export const TASK_INFO_PROMPT        = PROMPT
//export const TASK_INFO_R             = R
export const TASK_INFO_READ          = READ
//export const TASK_INFO_RENAME        = RENAME
export const TASK_INFO_RENDER        = RENDER
export const TASK_INFO_REQUEST       = REQUEST
//export const TASK_INFO_SEARCH        = SEARCH
//export const TASK_INFO_SELECT        = SELECT
export const TASK_INFO_SEQUENCE      = SEQUENCE
export const TASK_INFO_SET           = SET
//export const TASK_INFO_SORT          = SORT
//export const TASK_INFO_TRANSFORM     = TRANSFORM
export const TASK_INFO_WRITE         = WRITE

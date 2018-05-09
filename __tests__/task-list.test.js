var Flexio = require('../sdk-test-config')


test('Flexio.task.list; code to object', () => {
  expect(
    Flexio.task.list('/')
  ).toEqual(
    { op: 'list', params: { path: '/' } }
  )
})


test('Flexio.task.list; object to code', () => {
  var obj = { op: 'list', path: '/' }

  expect(
    Flexio.task.list.toCode(obj)
  ).toEqual(
    `list("/")`
  )
})

test('Flexio.task.list; object to code (with params subnode)', () => {
  var obj = { op: 'list', params: { path: '/' } }

  expect(
    Flexio.task.list.toCode(obj)
  ).toEqual(
    `list("/")`
  )
})

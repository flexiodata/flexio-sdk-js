var Flexio = require('../sdk-test-config')


test('Flexio.task.list; code to object', () => {
  expect(
    Flexio.task.list('/')
  ).toEqual(
    { op: 'list', path: '/' }
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

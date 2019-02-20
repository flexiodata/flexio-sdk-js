var Flexio = require('../sdk-test-config')


test('Flexio.task.read; code to object', () => {
  expect(
    Flexio.task.read('/connection/file.txt')
  ).toEqual(
    { op: 'read', path: '/connection/file.txt' }
  )
})


test('Flexio.task.read; object to code', () => {
  var obj = { op: 'read', path: '/connection/file.txt' }

  expect(
    Flexio.task.read.toCode(obj)
  ).toEqual(
    `read("/connection/file.txt")`
  )
})

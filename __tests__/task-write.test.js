var Flexio = require('../sdk-test-config')


test('Flexio.task.write; code to object', () => {
  expect(
    Flexio.task.write('/connection/file.txt')
  ).toEqual(
    { op: 'write', path: '/connection/file.txt' }
  )
})


test('Flexio.task.write; object to code', () => {
  var obj = { op: 'write', path: '/connection/file.txt' }

  expect(
    Flexio.task.write.toCode(obj)
  ).toEqual(
    `write("/connection/file.txt")`
  )
})

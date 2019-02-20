var Flexio = require('../sdk-test-config')


test('Flexio.task.connect; code to object', () => {
  expect(
    Flexio.task.connect({type: 'sftp'})
  ).toEqual(
    { op: 'connect', type: 'sftp' }
  )
})


test('Flexio.task.connect; object to code', () => {
  var obj = { op: 'connect', type: 'sftp' }

  expect(
    Flexio.task.connect.toCode(obj)
  ).toEqual(
    `connect({"type":"sftp"})`
  )
})

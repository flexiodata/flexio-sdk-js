var Flexio = require('../sdk-test-config')


test('Flexio.task.echo; code to object', () => {
  expect(
    Flexio.task.echo('hello')
  ).toEqual(
    { op: 'echo', msg: 'hello' }
  )
})


test('Flexio.task.echo; object to code', () => {
  var obj = { op: 'echo', msg: 'hello' }

  expect(
    Flexio.task.echo.toCode(obj)
  ).toEqual(
    `echo("hello")`
  )
})

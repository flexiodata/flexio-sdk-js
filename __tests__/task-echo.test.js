var Flexio = require('../src/main.js')


test('Flexio.task.; code to object', () => {
  expect(
    Flexio.task.echo('hello')
  ).toEqual(
    { op: 'echo', params: { msg: 'hello' }}
  )
})


test('Flexio.task.echo; object to code', () => {
  var obj = { op: 'echo', params: { msg: 'hello' }}

  expect(
    Flexio.task.echo.toCode(obj)
  ).toEqual(
    `echo("hello")`
  )
})

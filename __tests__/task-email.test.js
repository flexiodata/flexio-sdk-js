var Flexio = require('../sdk-test-config')


test('Flexio.task.email; code to object', () => {
  expect(
    Flexio.task.email({to: 'hello@flex.io'})
  ).toEqual(
    { op: 'email', params: { to: 'hello@flex.io' } }
  )
})


test('Flexio.task.email; object to code', () => {
  var obj = { op: 'email', params: { to: 'hello@flex.io' } }

  expect(
    Flexio.task.email.toCode(obj)
  ).toEqual(
     `email({
  "to": "hello@flex.io"
})`
  )
})


test('Flexio.task.email; code to object with connection parameter', () => {
  expect(
    Flexio.task.email('my-connection', {to: 'hello@flex.io'})
  ).toEqual(
    { op: 'email', params: { connection: 'my-connection', to: 'hello@flex.io' } }
  )
})


test('Flexio.task.email; object to code with connection parameter', () => {
  var obj = { op: 'email', params: { connection: 'my-connection', to: 'hello@flex.io' } }

  expect(
    Flexio.task.email.toCode(obj)
  ).toEqual(
     `email({
  "connection": "my-connection",
  "to": "hello@flex.io"
})`
  )
})
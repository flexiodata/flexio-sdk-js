var Flexio = require('../sdk-test-config')


test('Flexio.task.dump; code to object', () => {
  expect(
    Flexio.task.set('key','value')
  ).toEqual(
    {"op": "set", "var": "key", "value": "value"}
  )
})


test('Flexio.task.dump; object to code', () => {
  var obj = {"op": "set", "var": "key", "value": "value" }

  expect(
    Flexio.task.set.toCode(obj)
  ).toEqual(
    `set("key", "value")`
  )
})

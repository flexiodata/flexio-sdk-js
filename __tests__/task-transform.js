var Flexio = require('../sdk-test-config')


test('Flexio.task.echo; code to object', () => {
  expect(
    Flexio.task.transform({"columns":["givenname","surname","streetaddress","city"],"operations":[{"operation":"case","case":"upper"}]})
  ).toEqual(
    {"op":"transform","params":{"operations":[{"operation":"case","case":"upper"}],"columns":["givenname","surname","streetaddress","city"]}}
  )
})


test('Flexio.task.echo; object to code', () => {
  var obj = {"op":"transform","params":{"operations":[{"operation":"case","case":"upper"}],"columns":["givenname","surname","streetaddress","city"]}}

  expect(
    Flexio.task.transform.toCode(obj)
  ).toEqual(
    `transform({"operations":[{"operation":"case","case":"upper"}],"columns":["givenname","surname","streetaddress","city"]})`
  )
})

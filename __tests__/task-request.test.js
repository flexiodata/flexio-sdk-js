var Flexio = require('../sdk-test-config')


test('Flexio.task.list; code to object', () => {
  expect(
    Flexio.task.request('https://www.flex.io')
  ).toEqual(
    {"op": "request", "url": "https://www.flex.io"}
  )
})


test('Flexio.task.list; object to code', () => {
  var obj = {"op": "request", "url": "https://www.flex.io"}

  expect(
    Flexio.task.request.toCode(obj)
  ).toEqual(
    `request("https://www.flex.io")`
  )
})


test('Flexio.task.list; code to object', () => {
  expect(
    Flexio.task.request({url:'https://www.flex.io',method:'GET'})
  ).toEqual(
    {"op": "request", "url": "https://www.flex.io", "method": "GET"}
  )
})


test('Flexio.task.list; object to code', () => {
  var obj = {"op": "request", "url": "https://www.flex.io", "method": "GET"}

  expect(
    Flexio.task.request.toCode(obj)
  ).toEqual(
    `request({
  "url": "https://www.flex.io",
  "method": "GET"
})`
  )
})

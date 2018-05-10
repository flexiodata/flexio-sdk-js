var Flexio = require('../sdk-test-config')



test('Flexio.pipe(); initialization', () => {
  expect(
    (new Flexio.pipe({op:'sequence', items: [{op:'echo',msg:'Hello'}]})).getTasks()
  ).toEqual(
    [{"msg": "Hello", "op": "echo"}]
  )
})


test('Flexio.pipe(); initialization, verify deep clone', () => {

  var task = {op:'sequence', items: [{op:'echo',msg:'Hello'}]}
  var pipe = new Flexio.pipe(task)
  task.items[0].msg = 'HELLO'

  expect(
    pipe.getTasks()
  ).toEqual(
    [{"msg": "Hello", "op": "echo"}]
  )
})

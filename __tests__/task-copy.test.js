var Flexio = require('../sdk-test-config')


test('Flexio.task.copy; code to object', () => {
  expect(
    Flexio.task.copy('a.txt', '/dest')
  ).toEqual(
    { op: 'copy', from: 'a.txt', to: '/dest' }
  )
})

test('Flexio.task.copy; object to code', () => {
  var obj = { op: 'copy', from: 'a.txt', to: '/dest' }

  expect(
    Flexio.task.copy.toCode(obj)
  ).toEqual(
    `copy("a.txt", "/dest")`
  )
})

test('Flexio.task.copy; object to code (with params subnode)', () => {
  var obj = { op: 'copy', params: { from: 'a.txt', to: '/dest' } }

  expect(
    Flexio.task.copy.toCode(obj)
  ).toEqual(
    `copy("a.txt", "/dest")`
  )
})





test('Flexio.task.copy; code to object with array', () => {
  expect(
    Flexio.task.copy(['a.txt','b.txt'], '/dest')
  ).toEqual(
    { op: 'copy', from: ['a.txt','b.txt'], to: '/dest' }
  )
})

test('Flexio.task.copy; object to code with array', () => {
  var obj = { op: 'copy', from: ['a.txt','b.txt'], to: '/dest' }

  expect(
    Flexio.task.copy.toCode(obj)
  ).toEqual(
    `copy(["a.txt","b.txt"], "/dest")`
  )
})

test('Flexio.task.copy; object to code with array (with params subnode)', () => {
  var obj = { op: 'copy', params: { from: ['a.txt','b.txt'], to: '/dest' } }

  expect(
    Flexio.task.copy.toCode(obj)
  ).toEqual(
    `copy(["a.txt","b.txt"], "/dest")`
  )
})

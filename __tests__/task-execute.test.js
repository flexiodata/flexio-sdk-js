var Flexio = require('../sdk-test-config')


test('Flexio.task.execute; execute("javascript", ...)', () => {
  expect(
    Flexio.task.execute('javascript', '1+1')
  ).toEqual(
    { op: 'execute', params: { lang: 'javascript', code: 'MSsx' }}
  )
})

test('Flexio.task.execute; javascript(...)', () => {
  expect(
    Flexio.task.javascript('1+1')
  ).toEqual(
    { op: 'execute', params: { lang: 'javascript', code: 'MSsx' }}
  )
})

test('Flexio.task.execute; javascript(...)', () => {
  expect(
    Flexio.task.javascript(function(context) { context.output.write('Hello') })
  ).toEqual(
    { op: 'execute', params: { lang: 'javascript', code: 'ZXhwb3J0cy5mbGV4aW9faGFuZGxlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7CiAgICBjb250ZXh0Lm91dHB1dC53cml0ZSgnSGVsbG8nKTsKICB9' }}
  )
})


test('Flexio.task.execute; execute("python", ...)', () => {
  expect(
    Flexio.task.execute('javascript', '1+1')
  ).toEqual(
    { op: 'execute', params: { lang: 'javascript', code: 'MSsx' }}
  )
})


test('Flexio.task.execute; python(...)', () => {
  expect(
    Flexio.task.python('1+1')
  ).toEqual(
    { op: 'execute', params: { lang: 'python', code: 'MSsx' }}
  )
})


var Flexio = require('../src/main.js')


test('Flexio.task.echo; code to object', async () => {

  var pipe = Flexio.pipe().echo("Hello")

  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("Hello")
})


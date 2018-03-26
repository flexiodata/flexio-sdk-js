var Flexio = require('../sdk-test-config')

test('Flexio.task.echo; test posting JSON data', async () => {

  var pipe = Flexio.pipe()
                   .echo('Hello ${form.name}!')

  var response = await pipe.run({ data: { name: 'World' } })
  var result = response.text

  expect(result).toEqual("Hello World!")
})


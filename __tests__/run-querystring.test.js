var Flexio = require('../sdk-test-config')

test('Flexio.task.echo; test posting JSON data', async () => {

  var pipe = Flexio.pipe()
                   .javascript(function(context) {
                      context.output.write('Hello ' + context.form.name + '!')
                   })

  var response = await pipe.run({ data: { name: 'World' } })
  var result = response.text

  expect(result).toEqual("Hello World!")
})


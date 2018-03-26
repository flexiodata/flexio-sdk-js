var Flexio = require('../sdk-test-config')

test('Flexio.task.echo; test query string', async () => {

  var pipe = Flexio.pipe()
                   .javascript(function(context) {
                      context.output.write('Hello ' + context.query.name + '!')
                   })

  var response = await pipe.run({ query: { name: 'World' } })
  var result = response.text

  expect(result).toEqual("Hello World!")
})


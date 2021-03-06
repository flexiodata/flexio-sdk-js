var Flexio = require('../sdk-test-config')

jest.setTimeout(20000)

test('test posting query string data', async () => {

  var pipe = Flexio.pipe()
                   .javascript(function(context) {
                      context.output.write('Hello ' + context.query.name + '!')
                      context.end()
                   })

  var response = await pipe.run({ query: { name: 'World' } })
  var result = response.text

  expect(result).toEqual("Hello World!")
})


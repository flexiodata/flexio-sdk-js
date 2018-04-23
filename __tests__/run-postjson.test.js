var Flexio = require('../sdk-test-config')

test('test posting JSON data', async () => {

  var pipe = Flexio.pipe()
                   .echo('TODO')

  var response = await pipe.run({ data: { name: 'World' } })
  var result = response.text

  expect(result).toEqual("TODO")
})


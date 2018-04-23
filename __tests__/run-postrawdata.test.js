var Flexio = require('../sdk-test-config')
var FormData = require('form-data')

test('Flexio.task.echo; test posting JSON data', async () => {

  var form = new FormData();
  form.append('name', 'World');

  var pipe = Flexio.pipe()
                   .echo('You posted "${input}"')

  var response = await pipe.run({ data: "Test123" })
  var result = response.text

  expect(result).toEqual('You posted "Test123"')
})


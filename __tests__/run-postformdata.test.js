var Flexio = require('../sdk-test-config')
var FormData = require('form-data')

test('Flexio.task.echo; test posting a FormData object', async () => {

  var form = new FormData();
  form.append('name', 'World');

  var pipe = Flexio.pipe()
                   .echo('Hello, ${form.name}!')

  var response = await pipe.run({ data: form })
  var result = response.text

  expect(result).toEqual("Hello, World!")
})


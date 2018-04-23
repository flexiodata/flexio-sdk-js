var Flexio = require('../sdk-test-config')
var FormData = require('form-data')

test('test posting a FormData object', async () => {

  var form = new FormData();
  form.append('name', 'World');

  var pipe = Flexio.pipe()
                   .echo('Hello, ${form.name}!')

  var response = await pipe.run({ data: form })
  var result = response.text

  expect(result).toEqual("Hello, World!")
})



test('test posting a plain object as form data using "form" config element', async () => {

  var pipe = Flexio.pipe()
                   .echo('Hello, ${form.name}!')

  var response = await pipe.run({ form: {name:'World'} })
  var result = response.text

  expect(result).toEqual("Hello, World!")
})


test('test posting a plain object as form data using "data" config element and content-type', async () => {

  var pipe = Flexio.pipe()
                   .echo('Hello, ${form.name}!')

  var response = await pipe.run({ data: {name:'World'}, content_type:'application/x-www-form-urlencoded' })
  var result = response.text

  expect(result).toEqual("Hello, World!")
})


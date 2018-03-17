var Flexio = require('../src/main.js')


test('Pipe execution; .foreach() with posted JSON', async () => {

  var pipe = Flexio.pipe()
               .foreach(Flexio.pipe().set('result', '${result}${input.name}'))
               .echo("${result}")

  var response = await pipe.run({data:[{"name":"111"},{"name":"222"},{"name":"333"}]})
  var result = response.text

  expect(result).toEqual("111222333")
})


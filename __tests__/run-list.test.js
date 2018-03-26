var Flexio = require('../sdk-test-config')

test('Pipe execution; .list()', async () => {

  var pipe = Flexio.pipe().list('/home*')

  var response = await pipe.run()
  var result = response.data

  expect(result).toEqual(
    [{"name":"home","path":"/home","size":null,"modified":"2017-01-20T10:00:01+0000","type":"DIR"}]
  )
})


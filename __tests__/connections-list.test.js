var Flexio = require('../src/main.js')


Flexio.setup(require('../sdk-test-config.js').apikey)

test('Flexio.connection.list', (done) => {

  Flexio.connections.list().then((connections) => {

    expect(
      connections.length
    ).toBeGreaterThanOrEqual(1)

    done()
  })

})

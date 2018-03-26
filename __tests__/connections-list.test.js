var Flexio = require('../sdk-test-config')


test('Flexio.connections.list', (done) => {

  Flexio.connections.list().then((connections) => {

    expect(
      connections.length
    ).toBeGreaterThanOrEqual(1)

    done()
  })

})

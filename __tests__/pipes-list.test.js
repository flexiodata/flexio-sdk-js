var Flexio = require('../sdk-test-config')

test('Flexio.pipes.list', (done) => {

  Flexio.pipes.list().then((pipes) => {

    expect(
      pipes.length
    ).toBeGreaterThanOrEqual(1)

    done()
  })

})

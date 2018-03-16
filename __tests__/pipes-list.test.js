var Flexio = require('../src/main.js')


Flexio.setup(require('../sdk-test-config.js').apikey)

test('Flexio.pipes.list', (done) => {

  Flexio.pipes.list().then((pipes) => {

    expect(
      pipes.length
    ).toBeGreaterThanOrEqual(1)

    done()
  })

})

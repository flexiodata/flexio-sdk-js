
const code = `
Flexio.pipe()
  .javascript(function(input, output) {
    output.write('Hello World!')
  })
  .run(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .javascript(function(input, output) {
      output.write('Hello World!')
    })
    .run(callback)
}

export default {
  title: 'Run some basic Javascript code',
  code,
  fn
}


const code = `
Flexio.pipe()
  .javascript(function(context) {
    context.output.write('Hello World!')
  })
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .javascript(function(context) {
      context.output.write('Hello World!')
    })
    .run(callback)
}

export default {
  title: 'Run some basic Javascript code',
  code,
  fn
}

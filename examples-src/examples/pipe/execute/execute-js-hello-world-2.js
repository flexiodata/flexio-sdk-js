
const code = `
  Flexio.pipe()
    .javascript((context) => {
      context.output.write("Hello, world.")
    })
    .javascript((context) => {
      var data = context.input.read()
      context.output.write(data.toUpperCase())
    })
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .javascript((context) => {
      context.output.write("Hello, world.")
    })
    .javascript((context) => {
      var data = context.input.read()
      context.output.write(data.toUpperCase())
    })
    .run(callback)
}

export default {
  title: 'Simple Input/Output with Javascript jobs',
  code,
  fn
}

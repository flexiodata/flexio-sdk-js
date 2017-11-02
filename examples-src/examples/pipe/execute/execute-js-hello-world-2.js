
const code = `
Flexio.pipe()
  .javascript((input,output) => {
    output.write("Hello, world.")
  })
  .javascript((input,output) => {
    var data = input.read()
    output.write(data.toUpperCase())
  })
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .javascript((input,output) => {
      output.write("Hello, world.")
    })
    .javascript((input,output) => {
      var data = input.read()
      output.write(data.toUpperCase())
    })
    .run(callback)
}

export default {
  title: 'Simple Input/Output with Javascript jobs',
  code,
  fn
}

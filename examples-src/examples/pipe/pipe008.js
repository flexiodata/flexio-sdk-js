
const code = `
Flexio.pipe()
  .javascript(function() { return 'Hello World!' })
  .run(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .javascript(function() { return 'Hello World!' })
    .run(callback)
}

export default {
  title: 'Run a basic javascript script',
  code,
  fn
}

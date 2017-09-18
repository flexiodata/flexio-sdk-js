
const code = `
Flexio.pipe()
  .load('example-pipe-alias')
  .run(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .load('example-pipe-alias')
    .run(callback)
}

export default {
  title: 'Run an existing pipe',
  code,
  fn
}

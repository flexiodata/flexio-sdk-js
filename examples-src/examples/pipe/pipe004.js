
const code = `
Flexio.pipe()
  .load('example-pipe-alias')
  .run(function(err, process) {
    console.log(process)
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

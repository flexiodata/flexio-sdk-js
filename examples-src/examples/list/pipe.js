
const code = `
Flexio.pipes.list(function(err, pipes) {
  console.log(pipes)
})`

const fn = (Flexio, callback) => {
  Flexio.pipes.list(callback)
}

export default {
  title: 'Pipes',
  code,
  fn
}

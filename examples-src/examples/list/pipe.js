
const code = `
Flexio.pipes().load(function(err, pipes) {
  console.log(pipes)
})`

const fn = (Flexio, callback) => {
  Flexio.pipes().load(callback)
}

export default {
  title: 'Pipes',
  code,
  fn
}

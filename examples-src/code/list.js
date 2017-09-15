
const connections = {
  title: 'Connections',
  code: `
Flexio.connections().load(function(err, connections) {
  console.log(connections)
})`,
  fn: (Flexio, callback) => {
    Flexio.connections().load(callback)
  }
}

const pipes = {
  title: 'Pipes',
  code: `
Flexio.pipes().load(function(err, pipes) {
  console.log(pipes)
})`,
  fn: (Flexio, callback) => {
    Flexio.pipes().load(callback)
  }
}

export default [
  connections,
  pipes
]

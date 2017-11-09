
const code = `
Flexio.connections.list(function(err, connections) {
  console.log(connections)
})`

const fn = (Flexio, callback) => {
  Flexio.connections.list(callback)
}

export default {
  title: 'Connections',
  code,
  fn
}


const code = `
Flexio.connections().load(function(err, connections) {
  console.log(connections)
})`

const fn = (Flexio, callback) => {
  Flexio.connections().load(callback)
}

export default {
  title: 'Connections',
  code,
  fn
}

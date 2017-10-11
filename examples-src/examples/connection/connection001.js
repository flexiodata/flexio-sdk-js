
const code = `
Flexio.connection()
  .save({
    name: 'My Connection'
  }, function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .save({
      name: 'My Connection'
    }, callback)
}

export default {
  title: 'Create a connection',
  code,
  fn
}


const code = `
Flexio.connection()
  .save({
    name: 'test',
    description: 'test123',
    connection_info: {
      headers: {
        'Authorization': 'Bearer test123'
      }
    }
  }, function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .save({
      name: 'test',
      description: 'test123',
      connection_info: {
        headers: {
          'Authorization': 'Bearer test123'
        }
      }
    }, callback)
}

export default {
  title: 'Create a connection',
  code,
  fn
}

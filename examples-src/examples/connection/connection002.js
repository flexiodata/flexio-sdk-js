
const code = `
Flexio.connection()
  .headers({
    'Authorization': 'Bearer test123'
  })
  .save({
    name: 'test',
    description: 'test123'
  }, function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .headers({
      'Authorization': 'Bearer test123'
    })
    .save({
      name: 'test',
      description: 'test123'
    }, callback)
}

export default {
  title: 'Create a connection',
  code,
  fn
}

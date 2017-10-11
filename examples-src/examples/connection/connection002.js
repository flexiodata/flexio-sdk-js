
const code = `
Flexio.connection()
  .url('https://api.example.com')
  .headers({
    'Authorization': 'Bearer customtoken',
    'MyCustom': 'HeaderValue'
  })
  .save({
    name: 'Custom Headers'
  }, function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .url('https://api.example.com')
    .headers({
      'Authorization': 'Bearer customtoken',
      'MyCustom': 'HeaderValue'
    })
    .save({
      name: 'Custom Headers'
    }, callback)
}

export default {
  title: 'Create a connection with custom headers',
  code,
  fn
}

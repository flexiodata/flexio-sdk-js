
const code = `
Flexio.connection()
  .url('https://api.example.com')
  .auth('basic')
  .username('myusername')
  .password('mypassword')
  .save(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .url('https://api.example.com')
    .auth('basic')
    .username('myusername')
    .password('mypassword')
    .save(callback)
}

export default {
  title: "Create a connection with 'basic' authentication",
  code,
  fn
}

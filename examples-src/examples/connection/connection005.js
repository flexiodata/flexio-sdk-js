
const code = `
Flexio.connection()
  .url('https://api.example.com')
  .auth('bearer')
  .token('yourbearertoken')
  .save(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .url('https://api.example.com')
    .auth('bearer')
    .token('yourbearertoken')
    .save(callback)
}

export default {
  title: "Create a connection with 'bearer token' authentication",
  code,
  fn
}


const code = `
Flexio.connection()
  .url('https://now.httpbin.org')
  .save(function(err, connection) {
    Flexio.pipe()
      .request(connection.eid)
      .run(function(err, result) {
        console.log(result)
      })
  })
`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .url('https://now.httpbin.org')
    .save(function(err, connection) {
      Flexio.pipe()
        .request(connection.eid)
        .run(callback)
    })
}

export default {
  title: 'Request using a connection',
  code,
  fn
}

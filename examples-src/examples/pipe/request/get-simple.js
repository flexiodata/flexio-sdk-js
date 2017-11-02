
const code = `
Flexio.pipe()
  .request({
    method: 'GET',
    url: 'https://now.httpbin.org'
  })
  .run(function(err, response) {
    console.log(response.data)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .request({
      method: 'GET',
      url: 'https://now.httpbin.org'
    })
    .run(callback)
}

export default {
  title: 'GET request with no parameters',
  code,
  fn
}

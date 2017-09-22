
const code = `
Flexio.pipe()
  .request({
    method: 'GET',
    url: 'https://now.httpbin.org'
  })
  .run(function(err, process) {
    console.log(process)
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

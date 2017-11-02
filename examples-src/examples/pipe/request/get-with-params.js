
const code = `
Flexio.pipe()
  .request({
    method: 'GET',
    url: 'https://httpbin.org/get',
    params: {
      foo: 'bar',
      munch: 'rank'
    }
  })
  .run(function(err, response) {
    console.log(response.data)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .request({
      method: 'GET',
      url: 'https://httpbin.org/get',
      params: {
        foo: 'bar',
        munch: 'rank'
      }
    })
    .run(callback)
}

export default {
  title: 'GET request with parameters',
  code,
  fn
}

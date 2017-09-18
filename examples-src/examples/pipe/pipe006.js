
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
  .run(function(err, result) {
    console.log(result)
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

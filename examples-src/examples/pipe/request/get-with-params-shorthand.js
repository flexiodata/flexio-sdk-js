
const code = `
Flexio.pipe()
  .request('https://httpbin.org/get', {
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
    .request('https://httpbin.org/get', {
      params: {
        foo: 'bar',
        munch: 'rank'
      }
    })
    .run(callback)
}

export default {
  title: 'Request shorthand with parameters',
  code,
  fn
}

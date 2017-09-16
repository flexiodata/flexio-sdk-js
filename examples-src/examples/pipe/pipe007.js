
const code = `
Flexio.pipe()
  .request({
    method: 'POST',
    url: 'https://httpbin.org/post',
    data: {
      foo: 'bar',
      munch: 'rank'
    }
  })
  .run(function(err, process) {
    console.log(process)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .request({
      method: 'POST',
      url: 'https://httpbin.org/post',
      data: {
        foo: 'bar',
        munch: 'rank'
      }
    })
    .run(callback)
}

export default {
  title: 'POST request with data',
  code,
  fn
}

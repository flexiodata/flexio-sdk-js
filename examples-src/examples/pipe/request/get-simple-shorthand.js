
const code = `
Flexio.pipe()
  .request('https://now.httpbin.org')
  .run(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .request('https://now.httpbin.org')
    .run(callback)
}

export default {
  title: 'Request shorthand with no parameters',
  code,
  fn
}

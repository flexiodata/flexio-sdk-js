
const code = `
Flexio.pipe()
  .request('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')
  .convert('delimited', 'json')
  .run(function(err, response) {
    console.log(response.data)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .request('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')
    .convert('delimited', 'json')
    .run(callback)
}

export default {
  title: 'Dead-simple CSV to JSON conversion in two lines of code',
  code,
  fn
}

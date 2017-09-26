
const code = `
Flexio.pipe()
  .input('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')
  .convert('delimited', 'json')
  .run(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .input('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')
    .convert('delimited', 'json')
    .run(callback)
}

export default {
  title: 'Dead-simple CSV to JSON conversion in two lines of code',
  code,
  fn
}

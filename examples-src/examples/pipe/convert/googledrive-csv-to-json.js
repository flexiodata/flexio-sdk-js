
const code = `
Flexio.pipe()
  .input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])
  .convert('delimited', 'json')
  .run(function(err, response) {
    console.log(response.data)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])
    .convert('delimited', 'json')
    .run(callback)
}

export default {
  title: 'Read a CSV file from Google Drive and convert it to JSON',
  code,
  fn
}


const code = `
Flexio.pipe()
  .input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])
  .convert('delimited', 'table')
  .select('VEND_NAME', 'DUE_DATE')
  .limit(10)
  .convert('table', 'json')
  .output('dropbox', 'flexio-dropbox', '/test_data')
  .run(function(err, response) {
    console.log(response.data)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])
    .convert('delimited', 'table')
    .select('VEND_NAME', 'DUE_DATE')
    .limit(10)
    .convert('table', 'json')
    .output('dropbox', 'flexio-dropbox', '/test_data')
    .run(callback)
}

export default {
  title: 'Move a file from Google Drive to Dropbox with modifications',
  code,
  fn
}

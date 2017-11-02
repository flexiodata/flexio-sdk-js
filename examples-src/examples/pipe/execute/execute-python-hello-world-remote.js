
const code = `
Flexio.pipe()
  .execute('https://raw.githubusercontent.com/flexiodata/examples/master/functions/hello-world.py')
  .email(
    'flexio@mailinator.com',
    'Flex.io JS SDK Test (remote Python) - ' + (new Date()).toString(),
    'This is a test using Python code from a remote file...',
    null,
    'attachment'
  )
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .execute('https://raw.githubusercontent.com/flexiodata/examples/master/functions/hello-world.py')
    .email(
      'flexio@mailinator.com',
      'Flex.io JS SDK Test (remote Python) - ' + (new Date()).toString(),
      'This is a test using Python code from a remote file...',
      null,
      'attachment'
    )
    .run(callback)
}

export default {
  title: 'Create and execute a remote python script and email its result as an attachment',
  code,
  fn
}

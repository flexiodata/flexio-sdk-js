
const code = `
Flexio.pipe()
  .execute('https://raw.githubusercontent.com/flexiodata/functions/master/python/hello-world.py')
  .email({
    to: 'flexio@mailinator.com',
    subject: 'Flex.io JS SDK Test (remote Python) - ' + (new Date()).toString(),
    body_text: 'This is a test using Python code from a remote file...',
    data: 'attachment'
  })
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .execute('https://raw.githubusercontent.com/flexiodata/functions/master/python/hello-world.py')
    .email({
      to: 'flexio@mailinator.com',
      subject: 'Flex.io JS SDK Test (remote Python) - ' + (new Date()).toString(),
      body_text: 'This is a test using Python code from a remote file...',
      data: 'attachment'
    })
    .run(callback)
}

export default {
  title: 'Create and execute a remote python script and email its result as an attachment',
  code,
  fn
}

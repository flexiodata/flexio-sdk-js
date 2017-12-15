
const code = `
var inline_python_code = \`
def flexio_handler(context):
    writer = context.output.create(name='Hello')
    if 'message' in context.input.env:
        writer.write(context.input.env['message'])
    else:
        writer.write('Hello, World!')
\`

Flexio.pipe()
  .execute(inline_python_code)
  .email({
    to: 'flexio@mailinator.com',
    subject: 'Flex.io JS SDK Test (inline Python) - ' + (new Date()).toString(),
    body_text: 'This is a test using inline Python code...',
    data: 'attachment'
  })
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  var inline_python_code = `
def flexio_handler(context):
    writer = context.output.create(name='Hello')
    if 'message' in context.input.env:
        writer.write(context.input.env['message'])
    else:
        writer.write('Hello, World!')
`
  Flexio.pipe()
    .execute(inline_python_code)
    .email({
      to: 'flexio@mailinator.com',
      subject: 'Flex.io JS SDK Test (inline Python) - ' + (new Date()).toString(),
      body_text: 'This is a test using inline Python code...',
      data: 'attachment'
    })
    .run(callback)
}

export default {
  title: 'Create and execute an inline python script and email its result as an attachment',
  code,
  fn
}


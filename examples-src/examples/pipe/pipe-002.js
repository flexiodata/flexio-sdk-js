
const code = `
var inline_python_code = "\\
def flexio_handler(input, output):\\n\\
    writer = output.create(name='Hello')\\n\\
    if 'message' in input.env:\\n\\
        writer.write(input.env['message'])\\n\\
    else:\\n\\
        writer.write('Hello, World!')"

Flexio.pipe()
  .execute(inline_python_code)
  .email('flexio@mailinator.com', 'Flex.io JS SDK Test - ' + (new Date()).toString(), 'This is a test using inline Python code...', null, 'attachment')
  .run(function(err, process) {
    console.log(process)
  })`

const fn = (Flexio, callback) => {

var inline_python_code = "\
def flexio_handler(input, output):\n\
    writer = output.create(name='Hello')\n\
    if 'message' in input.env:\n\
        writer.write(input.env['message'])\n\
    else:\n\
        writer.write('Hello, World!')"

Flexio.pipe()
  .execute(inline_python_code)
  .email('flexio@mailinator.com', 'Flex.io JS SDK Test - ' + (new Date()).toString(), 'This is a test using inline Python code...', null, 'attachment')
  .run(callback)
}

export default {
  title: 'Create a message from a remote python script and email it as an attachment',
  code,
  fn
}


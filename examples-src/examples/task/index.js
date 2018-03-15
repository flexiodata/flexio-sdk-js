import Flexio from '../../../src/flexio'

let tasks = []

tasks.push({
  title: 'Input (Web Link)',
  description: "Flexio.task.input('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')",
  obj: Flexio.task.input('https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv')
})

tasks.push({
  title: 'Input (Google Drive)',
  description: "Flexio.task.input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])",
  obj: Flexio.task.input('googledrive', 'flexio-google-drive', ['/test_data/data_payment.csv'])
})

tasks.push({
  title: 'Output (Dropbox)',
  description: "Flexio.task.output('dropbox', 'flexio-dropbox', '/test_data')",
  obj: Flexio.task.output('dropbox', 'flexio-dropbox', '/test_data')
})

tasks.push({
  title: 'Convert (best guess)',
  description: 'Flexio.task.convert()',
  obj: Flexio.task.convert()
})

tasks.push({
  title: 'Convert from delimited to JSON',
  description: "Flexio.task.convert('delimted', 'json')",
  obj: Flexio.task.convert('delimted', 'json')
})

tasks.push({
  title: 'Convert from CSV to JSON',
  description: "Flexio.task.convert('csv', 'json')",
  obj: Flexio.task.convert('csv', 'json')
})

tasks.push({
  title: 'Convert from CSV to table',
  description: "Flexio.task.convert('csv', 'table')",
  obj: Flexio.task.convert('csv', 'table')
})

tasks.push({
  title: 'Email',
  description: "Flexio.task.email({ to: 'fxtest101@mailinator', subject: 'Subject of email', body_text: 'This is the body text' })",
  obj: Flexio.task.email({ to: 'fxtest101@mailinator', subject: 'Subject of email', body_text: 'This is the body text' })
})

tasks.push({
  title: 'Execute a remote python script',
  description: "Flexio.task.execute('https://raw.githubusercontent.com/flexiodata/functions/master/python/hello-world.py')",
  obj: Flexio.task.execute('https://raw.githubusercontent.com/flexiodata/functions/master/python/hello-world.py')
})

var description = `
Flexio.task.javascript(function(context) {
  context.output.write('Hello World!')
})`

tasks.push({
  title: 'Execute Javascript (shorthand)',
  description,
  obj: Flexio.task.javascript(function(context) {
    context.output.write('Hello World!')
  })
})

tasks.push({
  title: 'Filter',
  description: "Flexio.task.filter(\"vend_no = '000042'\")",
  obj: Flexio.task.filter("vend_no = '000042'")
})

tasks.push({
  title: 'Limit',
  description: "Flexio.task.limit(10)",
  obj: Flexio.task.limit(10)
})

var description = `
Flexio.task.request({
  method: 'GET',
  url: 'https://httpbin.org/get',
  params: {
    foo: 'bar',
    munch: 'rank'
  }
})`

tasks.push({
  title: 'Request',
  description,
  obj: Flexio.task.request({
    method: 'GET',
    url: 'https://httpbin.org/get',
    params: {
      foo: 'bar',
      munch: 'rank'
    }
  })
})

tasks.push({
  title: 'Select',
  description: "Flexio.task.select('vend_no', 'vend_name', 'amt_paid')",
  obj: Flexio.task.select('vend_no', 'vend_name', 'amt_paid')
})

tasks.push({
  title: 'Sleep',
  description: "Flexio.task.sleep(5)",
  obj: Flexio.task.sleep(5)
})

tasks.push({
  title: 'Transform',
  description: "Flexio.task.transform({ 'operation': 'case', 'case': 'upper' })",
  obj: Flexio.task.transform({ 'operation': 'case', 'case': 'upper' })
})

tasks.push({
  title: 'Transform',
  description: `Flexio.task.transform({
  columns: ['vend_no', 'vend_name'],
  operations: [{ operation: 'case', case: 'upper' }]
})`,
  obj: Flexio.task.transform({
    columns: ['vend_no', 'vend_name'],
    operations: [{ operation: 'case', case: 'upper' }]
  })
})

export default tasks

var Flexio = require('../src/main.js')

//Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { baseUrl: 'https://www.flex.io/api/v1' })
//Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { debug: true })
Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { baseUrl: 'https://localhost/api/v1', debug: true, insecure: true })

var cmd = Flexio.task.fromJSON({
  type: 'flexio.convert',
  params: {
    input: {
      format: 'delimited',
      delimiter: '{comma}',
      header: true,
      qualifier: '{double-quote}'
    },
    output: {
      format: 'json'
    }
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.convert',
  params: {
    input: {
      format: 'table'
    },
    output: {
      format: 'pdf'
    }
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.echo',
  params: {
    msg: 'test123'
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.email',
  params: {
    to: ['test@email.com'],
    body_text: 'This is my message',
    subject: 'This is my subject'
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.execute',
  params: {
    "lang": "python",
    "code": "ZGVmIGZsZXhpb19oYW5kbGVyKGNvbnRleHQpOg0KICAgIGNvbnRleHQub3V0cHV0LmNvbnRlbnRfdHlwZSA9ICJ0ZXh0L3BsYWluIg0KICAgIGNvbnRleHQub3V0cHV0LndyaXRlKCdIZWxsbyBXb3JsZCEnKQ=="
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.execute',
  params: {
    "lang": "javascript",
    "code": "ZXhwb3J0cy5mbGV4aW9faGFuZGxlciA9IGZ1bmN0aW9uKGNvbnRleHQpIHsNCiAgICBjb250ZXh0Lm91dHB1dC5jb250ZW50X3R5cGUgPSAidGV4dC9wbGFpbiINCiAgICBjb250ZXh0Lm91dHB1dC53cml0ZSgnSGVsbG8sIFdvcmxkIScpDQp9"
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.filter',
  params: {
    where: "vend_name = 'BOISE FIELDS'"
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.limit',
  params: {
    value: 10
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.read',
  params: {
    path: '/msq8162lp5rw/mulch123.csv'
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.render',
  params: {
    url: 'https://www.flex.io',
    format: 'png',
    width: 800,
    height: 600,
    scrollbars: false
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.request',
  params: {
    method: 'GET',
    url: 'https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv'
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.select',
  params: {
    columns: ['test','test2','test3']
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.select',
  params: {
    columns: ['test']
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.sleep',
  params: {
    value: 10
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.write',
  params: {
    path: '/msq8162lp5rw/bwilliams/mulch124.csv'
  }
})

console.log(cmd)

var cmd = Flexio.task.fromJSON({
  type: 'flexio.unknown',
  params: {
    p1: 'test',
    p2: 'test2',
    p3: {
      p4: 'test3',
      p5: 'test4'
    }
  }
})

console.log(cmd)

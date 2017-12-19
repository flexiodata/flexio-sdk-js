var Flexio = require('../src/main.js')

//Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { baseUrl: 'https://www.flex.io/api/v1' })
//Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { debug: true })
Flexio.setup('nbnxsyjzwzmtsbwnzgmy', { baseUrl: 'https://localhost/api/v1', debug: true, insecure: true })

var echoCommand = function(json) {
  console.log(Flexio.task.toCode(json) + '\n----------')
}

var json = {
  op: 'convert',
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
}

echoCommand(json)

var json = {
  op: 'convert',
  params: {
    input: {
      format: 'table'
    },
    output: {
      format: 'pdf'
    }
  }
}

echoCommand(json)

var json = {
  op: 'echo',
  params: {
    msg: 'test123'
  }
}

echoCommand(json)

var json = {
  op: 'email',
  params: {
    to: ['test@email.com'],
    body_text: 'This is my message',
    subject: 'This is my subject'
  }
}

echoCommand(json)

var json = {
  op: 'execute',
  params: {
    "lang": "python",
    "code": "ZGVmIGZsZXhpb19oYW5kbGVyKGNvbnRleHQpOg0KICAgIGNvbnRleHQub3V0cHV0LmNvbnRlbnRfdHlwZSA9ICJ0ZXh0L3BsYWluIg0KICAgIGNvbnRleHQub3V0cHV0LndyaXRlKCdIZWxsbyBXb3JsZCEnKQ=="
  }
}

echoCommand(json)

var json = {
  op: 'execute',
  params: {
    "lang": "javascript",
    "code": "ZXhwb3J0cy5mbGV4aW9faGFuZGxlciA9IGZ1bmN0aW9uKGNvbnRleHQpIHsNCiAgICBjb250ZXh0Lm91dHB1dC5jb250ZW50X3R5cGUgPSAidGV4dC9wbGFpbiINCiAgICBjb250ZXh0Lm91dHB1dC53cml0ZSgnSGVsbG8sIFdvcmxkIScpDQp9"
  }
}

echoCommand(json)

var json = {
  op: 'filter',
  params: {
    where: "vend_name = 'BOISE FIELDS'"
  }
}

echoCommand(json)

var json = {
  op: 'limit',
  params: {
    value: 10
  }
}

echoCommand(json)

var json = {
  op: 'read',
  params: {
    path: '/msq8162lp5rw/mulch123.csv'
  }
}

echoCommand(json)

var json = {
  op: 'render',
  params: {
    url: 'https://www.flex.io',
    format: 'png',
    width: 800,
    height: 600,
    scrollbars: false
  }
}

echoCommand(json)

var json = {
  op: 'request',
  params: {
    method: 'GET',
    url: 'https://raw.githubusercontent.com/flexiodata/data/master/mockaroo/names-and-ip-addresses.csv'
  }
}

echoCommand(json)

var json = {
  op: 'select',
  params: {
    columns: ['test','test2','test3']
  }
}

echoCommand(json)

var json = {
  op: 'select',
  params: {
    columns: ['test']
  }
}

echoCommand(json)

var json = {
  op: 'sleep',
  params: {
    value: 10
  }
}

echoCommand(json)

var json = {
  op: 'write',
  params: {
    path: '/msq8162lp5rw/bwilliams/mulch124.csv'
  }
}

echoCommand(json)

var json = {
  op: 'unknown',
  params: {
    p1: 'test',
    p2: 'test2',
    p3: {
      p4: 'test3',
      p5: 'test4'
    }
  }
}

echoCommand(json)

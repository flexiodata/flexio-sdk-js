
const code = `
Flexio.pipe()
  .render('https://www.flex.io')
  .run(function(err, response) {
     // image returned as response.blob
     // or response.buffer on node.js
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .render('https://www.flex.io')
    .run(callback)
}

export default {
  title: 'Render a webpage',
  code,
  fn
}

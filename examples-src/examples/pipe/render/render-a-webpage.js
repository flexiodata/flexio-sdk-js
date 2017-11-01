
const code = `
Flexio.pipe()
  .render('https://www.flex.io')
  .run(function(err, result) {
    console.log(result)
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

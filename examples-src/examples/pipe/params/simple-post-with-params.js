
const code = `
Flexio.pipe()
  .params({
    first_name: 'John',
    last_name: 'Smith'
  })
  .echo('Hello \$\{first_name\} \$\{last_name\}!')
  .run(function(err, response) {
    console.log(response.text)
  })`

const fn = (Flexio, callback) => {
  Flexio.pipe()
    .params({
    first_name: 'John',
    last_name: 'Smith'
    })
    .echo('Hello ${first_name} ${last_name}!')
    .run(callback)
}

export default {
  title: 'Simple POST to pipe',
  code,
  fn
}

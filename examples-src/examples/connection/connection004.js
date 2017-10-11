
const code = `
Flexio.connection()
  .url('https://api.example.com')
  .auth('oauth2')
  .token('youroauthtoken')
  .save(function(err, result) {
    console.log(result)
  })`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .url('https://api.example.com')
    .auth('oauth2')
    .token('youroauthtoken')
    .save(callback)
}

export default {
  title: "Create a connection with 'oauth2' authentication",
  code,
  fn
}

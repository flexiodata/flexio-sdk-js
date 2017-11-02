
const code = `
Flexio.connection()
  .auth('basic')
  .url('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_ID/Messages.json')
  .username('YOUR_ACCOUNT_ID')
  .password('YOUR_PASSWORD')
  .formData({ 'From': 'YOUR_SENDING_PHONE_NUMBER' })
  .save(function(err, connection) {
    Flexio.pipe()
      .request('POST', connection.eid, null, { 'To': 'YOUR_RECEIVING_PHONE_NUMBER', 'Body': 'Hi there! This message is sent from Flex.io' })
      .run(function(err, result) {
        console.log(result.data)
      })
  })
`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .auth('basic')
    .url('https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_ID/Messages.json')
    .username('YOUR_ACCOUNT_ID')
    .password('YOUR_PASSWORD')
    .formData({ 'From': 'YOUR_SENDING_PHONE_NUMBER' })
    .save(function(err, connection) {
      Flexio.pipe()
        .request('POST', connection.eid, null, { 'To': 'YOUR_RECEIVING_PHONE_NUMBER', 'Body': 'Hi there! This message is sent from Flex.io' })
        .run(callback)
    })
}

export default {
  title: "Send a text message routing Twilio's API via Flex.io connection",
  code,
  fn
}

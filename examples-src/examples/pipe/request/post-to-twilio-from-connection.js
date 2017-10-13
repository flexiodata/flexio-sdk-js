
const code = `
Flexio.connection()
  .auth('basic')
  .url('https://api.twilio.com/2010-04-01/Accounts/AC2d49f28df410d5072bea29896af1168d/Messages.json')
  .username('AC2d49f28df410d5072bea29896af1168d')
  .password('13820312b157c75e64239f599147eae2')
  .formData({ 'From': '+16147686186' })
  .save(function(err, connection) {
    Flexio.pipe()
      .request('POST', connection.eid, null, { 'To': '+16308868205', 'Body': 'Hi there! This message is sent from Flex.io' })
      .run(function(err, result) {
        console.log(result)
      })
  })
`

const fn = (Flexio, callback) => {
  Flexio.connection()
    .auth('basic')
    .url('https://api.twilio.com/2010-04-01/Accounts/AC2d49f28df410d5072bea29896af1168d/Messages.json')
    .username('AC2d49f28df410d5072bea29896af1168d')
    .password('13820312b157c75e64239f599147eae2')
    .formData({ 'From': '+16147686186' })
    .save(function(err, connection) {
      Flexio.pipe()
        .request('POST', connection.eid, null, { 'To': '+16308868205', 'Body': 'Hi there! This message is sent from Flex.io' })
        .run(callback)
    })
}

export default {
  title: "Send a text message routing Twilio's API via Flex.io connection",
  code,
  fn
}

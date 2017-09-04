
import $ from 'jquery'

var base = {
  name: 'Javascript SDK Process',
  description: 'Created from the Flex.io Javascript SDK',
  task: [
    {
      type: 'flexio.input',
      metadata: {
        connection_type: 'http'
      },
      params: {
        items: [
          {
            path: 'https://static.pexels.com/photos/51387/mount-everest-himalayas-nuptse-lhotse-51387.jpeg'
          }
        ]
      }
    },
    {
      type: 'flexio.output',
      metadata: {
        connection_type: 'stdout'
      },
      params: {
        connection: 'stdout'
      }
    }
  ]
}

export default () => {
  return Object.assign({}, base, {
    run(success_cb, error_cb) {
      $.ajax({
        type: 'POST',
        url: 'https://test.flex.io/api/v1/pipes',
        beforeSend: function(xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer crbdqtptwthytgtdksgz')
        },
        data: base,
        dataType: 'json',
        success: function () {
          alert('Success!')
        },
        error: function () {
          alert('Something went wrong.')
        }
      })

      return this
    }
  })
}

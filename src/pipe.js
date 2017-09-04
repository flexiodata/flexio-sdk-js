import axios from 'axios'

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
      axios({
        url: 'https://test.flex.io/api/v1/pipes',
        method: 'POST',
        headers: {
          'Authorization': 'Bearer gnffbxwtrrqfkvxdmrjs'
        },
        data: base
      })
      .then(function (response) {
        alert('Success!')
      })
      .catch(function (error) {
        alert('Something went wrong.')
      })

      return this
    }
  })
}

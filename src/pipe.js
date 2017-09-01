
import axios from 'axios'

// Set config defaults when creating the instance
var axios_auth = axios.create({
  baseURL: 'https://www.flex.io/api/v1'
})

// Alter defaults after instance has been created
axios_auth.defaults.headers.common['Authorization'] = 'Bearer kmzdxtzwybzyqrqjbrnm'

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
    run() {
      axios_auth.post('https://www.flex.io/api/v1/pipes/flexio-chicago-crime-v1/run?stream=0', { year: 2016 })
      return this
    }
  })
}

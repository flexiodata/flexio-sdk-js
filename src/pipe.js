
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
      return this
    }
  })
}

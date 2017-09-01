
const version = require('../package.json').version

export default {
  version() {
    return 'Flex.io Javascript SDK v' + version
  }
}

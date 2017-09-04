import axios from 'axios'

var base = {
  name: 'New JS SDK Pipe',
  description: '',
  task: []
}

var echo = function(msg) {
  if (window && window.console)
    window.console.log(msg)
     else
    alert(msg)
}

export default (auth_token) => {
  return Object.assign({}, base, {
    saveAs(params, successCb, errorCb) {
      Object.assign(this, params)

      axios({
        url: 'https://test.flex.io/api/v1/pipes',
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + auth_token },
        data: base // TODO: change this to `_.pick(this, ...)`
      })
      .then((response) => {
        echo('Success!')

        if (typeof successCb == 'function')
          successCb(response)
      })
      .catch((error) => {
        echo('Something went wrong...')

        if (typeof errorCb == 'function')
          errorCb(response)
      })

      return this
    }
  })
}

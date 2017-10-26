<template>
  <div class="mv4">
    <div class="pa3 bg-near-white br1 box-shadow">
      <h4 class="mt0" v-if="title.length > 0">{{title}}</h4>
      <div v-if="description.length > 0">
        <pre><code class="db ph3">{{description}}</code></pre>
        <div class="mv3 bb b--black-10"></div>
      </div>
      <textarea class="w-100 h5 pa1 ba b--black-10 code" style="font-size: 13px" spellcheck="false" v-model="editable_code" v-if="isEditable"></textarea>
      <pre class="overflow-x-auto" v-highlightjs="code_trimmed" v-else><code class="javascript"></code></pre>
      <div v-if="showRun">
        <button class="mt3 border-box no-select pointer ttu b ba f6 ph3 pv2 br1 white bg-blue b--blue darken-10" @click="run">Run</button>
      </div>
      <div class="mt3" v-if="is_loading">
        <div class="bb b--black-10"></div>
        <div class="mt3">
          <vue-simple-spinner class="dib v-mid" size="34" line-bg-color="#ddd"></vue-simple-spinner>
          <span class="v-mid fw6 dark-gray ml1">Running...</span>
        </div>
      </div>
      <div class="mt3" v-else-if="has_result">
        <div class="bb b--black-10"></div>
        <h4>Output</h4>
        <div class="overflow-y-auto" style="max-height: 30rem">
          <pre v-highlightjs="result"><code class="javascript"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../src/util'
  import Flexio from '../src/flexio'
  import VueSimpleSpinner from 'vue-simple-spinner'

  var editable_code = `Flexio.pipe()
    .javascript(function(input, output) {
      output.write('Hello World!')
    })
    .run(callback)`

  export default {
    props: {
      'title': {
        type: String,
        default: ''
      },
      'description': {
        type: String,
        default: ''
      },
      'code': {
        type: String,
        default: ''
      },
      'fn': {
        type: Function,
        default: () => {
          return function() { alert('No function specified!') }
        }
      },
      'is-editable': {
        type: Boolean,
        default: false
      },
      'show-run': {
        type: Boolean,
        default: true
      }
    },
    components: {
      VueSimpleSpinner
    },
    data() {
      return {
        result: '',
        editable_code,
        is_loading: false
      }
    },
    computed: {
      has_result() {
        return this.result.length > 0
      },
      code_trimmed() {
        return this.code.trim()
      }
    },
    methods: {
      run() {
        if (typeof this.fn == 'function')
        {
          this.is_loading = true

          var fn = this.fn

          if (this.isEditable)
          {
            fn = (Flexio, callback) => {
              eval(this.editable_code)
            }
          }

          fn.call(this, Flexio, (err, result) => {
            this.is_loading = false
            this.result = JSON.stringify(result, null, 2)
            util.debug.call(this, this.result)
          }, (result) => {
            this.is_loading = false
          })
        }
      }
    }
  }
</script>

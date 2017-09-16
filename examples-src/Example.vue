<template>
  <div class="mv3">
    <div class="pa3 bg-near-white br1 box-shadow">
      <h4 class="mt0">{{title}}</h4>
      <pre class="overflow-x-auto" v-highlightjs="code_trimmed"><code class="javascript"></code></pre>
      <div class="overflow-x-auto mt3" v-if="has_result">
        <h4 class="mt0">Output</h4>
        <pre v-highlightjs="result"><code class="javascript"></code></pre>
      </div>
      <div class="mt3" v-else-if="is_loading">
        <vue-simple-spinner class="dib v-mid" size="34" line-bg-color="#ddd"></vue-simple-spinner>
        <span class="v-mid fw6 dark-gray ml1">Running...</span>
      </div>
      <div v-else-if="showRun">
        <button class="mt3 border-box no-select pointer ttu b ba f6 ph3 pv2 br1 white bg-blue b--blue darken-10" @click="run">Run</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Flexio from '../src/flexio'
  import VueSimpleSpinner from 'vue-simple-spinner'

  export default {
    props: {
      'title': {
        type: String,
        default: 'Example Title'
      },
      'api-key': {
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
      'show-run': {
        type: Boolean,
        default: true
      }
    },
    components: {
      VueSimpleSpinner
    },
    watch: {
      apiKey(val, old_val) {
        Flexio.setup(val)
      }
    },
    data() {
      return {
        result: '',
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
    mounted() {
      Flexio.setup(this.apiKey)
    },
    methods: {
      run() {
        if (typeof this.fn == 'function')
        {
          this.is_loading = true

          this.fn.call(this, Flexio, (err, result) => {
            this.is_loading = false
            this.result = JSON.stringify(result, null, 2)
            console.log(this.result)
          }, (result) => {
            this.is_loading = false
          })
        }
      }
    }
  }
</script>
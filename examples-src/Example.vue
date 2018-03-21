<template>
  <div class="mv4">
    <div class="pa3 bg-near-white br1 box-shadow">
      <h4 class="mt0" v-if="title.length > 0">{{title}}</h4>
      <div v-if="description.length > 0">
        <pre><code class="db ph3">{{description}}</code></pre>
        <div class="mv3 bb b--black-10"></div>
      </div>
      <textarea class="w-100 h5 pa1 ba b--black-10 code" style="font-size: 13px; outline: none" spellcheck="false" v-model="editable_code" v-if="isEditable"></textarea>
      <pre class="overflow-x-auto" v-else><code class="javascript">{{code_trimmed}}</code></pre>
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
      <div class="mt3" v-else-if="has_text_result || has_image_result">
        <div class="bb b--black-10"></div>
        <h4>Output</h4>
        <div class="overflow-y-auto" style="max-height: 30rem" v-if="has_text_result">
          <pre><code class="javascript">{{result}}</code></pre>
        </div>
        <img :src="img_src" v-if="has_image_result" />
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import util from '../src/util'
  import Flexio from '../src/flexio'
  import VueSimpleSpinner from 'vue-simple-spinner'

  var editable_code = `Flexio.pipe()
    .echo('Hello, World!')
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
        img_src: '',
        editable_code,
        is_loading: false
      }
    },
    computed: {
      has_image_result() {
        return this.img_src.length > 0
      },
      has_text_result() {
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
            this.result = ''
            this.img_src = ''

            var content_type = _.get(result, 'contentType', '')

            if (content_type.substr(0,6) == 'image/') {
              var url_creator = window.URL || window.webkitURL
              this.img_src = url_creator.createObjectURL(result.blob)
            } else if (content_type == 'application/json') {
              this.result = JSON.stringify(result.data, null, 2)
            } else if (content_type.length > 0 && _.has(result, 'buffer')) {
              // result is a pipe response, including blob, buffer, etc.
              this.result = result.text
            } else {
              // result is JSON
              this.result = JSON.stringify(result, null, 2)
            }

            this.is_loading = false
            //util.debug(this.result)

          }, (result) => {
            this.is_loading = false
          })
        }
      }
    }
  }
</script>

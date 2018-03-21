<template>
  <div id="app">
    <div class="fixed top-0 w-100 z-1 flex-none flex flex-row items-center pv3 ph4 bg-blue white">
      <div class="flex-fill">
        <a :href="'https://github.com/flexiodata/flexio-sdk-js/releases/tag/v'+version" class="no-underline underline-hover" style="color: white">Flex.io Javascript SDK {{version}}</a>
      </div>
      <div class="flex-none">
        <a href="https://github.com/flexiodata/flexio-sdk-js" rel="noopener" target="_blank" title="View on Github"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="32" height="32" viewBox="0 0 16 16"><path d="M8 .198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.47 7.59.4.075.548-.173.548-.384 0-.19-.008-.82-.01-1.49-2.227.485-2.696-.943-2.696-.943-.364-.924-.888-1.17-.888-1.17-.726-.497.055-.486.055-.486.802.056 1.225.824 1.225.824.714 1.223 1.872.87 2.328.665.072-.517.28-.87.508-1.07-1.776-.202-3.644-.888-3.644-3.954 0-.874.313-1.588.824-2.148-.083-.202-.357-1.015.077-2.117 0 0 .672-.215 2.2.82.64-.177 1.323-.266 2.003-.27.68.004 1.365.093 2.004.27 1.527-1.035 2.198-.82 2.198-.82.435 1.102.162 1.916.08 2.117.512.56.822 1.274.822 2.147 0 3.072-1.872 3.748-3.653 3.946.288.248.544.735.544 1.48 0 1.07-.01 1.933-.01 2.196 0 .213.145.462.55.384 3.178-1.06 5.467-4.057 5.467-7.59 0-4.418-3.58-8-8-8z"></path></svg></a>
      </div>
    </div>
    <div class="flex-fill flex flex-column flex-row items-stretch">
      <div class="flex flex-row flex-column flex-none items-stretch br-l bb bb-0-l b--black-10 pv0 ph3-l overflow-auto trans-pm" style="padding-top: 6rem; padding-bottom: 6rem; min-width: 12rem; display: none">
        Nav items go here...
      </div>

      <div class="flex-fill relative center ph4" style="padding-top: 6rem; padding-bottom: 6rem; max-width: 1152px">
        <h1 class="mt0">Flex.io Javascript SDK v{{version}}</h1>

        <h2 class="mt5 mb0 pb2 bb b--light-gray">API Key</h2>

        <p class="lh-copy">Flexio SDK calls require an API key. A default API key is provided to test the following calls. Feel free to <a href="https://www.flex.io/app/signup" target="_blank">sign up for Flex.io</a> to use your own API key in order to test these calls with your Flex.io account:</p class="lh-copy">
        <form>
          <div class="flex flex-row items-center mt2">
            <div class="flex flex-row items-center w-60 mr3">
              <label class="flex-none mr2">Server:</label>
              <input type="text" class="flex-fill border-box ttl ba b--black-10 f6 pa2 w5 code" v-model="base_url">
            </div>
            <div class="flex flex-row items-center w-40">
              <label class="flex-none mr2">API Key:</label>
              <input type="text" class="flex-fill border-box ttl ba b--black-10 f6 pa2 w5 code" v-model="api_key">
            </div>
          </div>
        </form>

        <h2 class="mt5 mb0 pb2 bb b--light-gray">Live Editor</h2>

        <example
          :title="'Create Your Own...'"
          :is-editable="true"
        />

        <h2 class="mt5 mb0 pb2 bb b--light-gray">Setup</h2>

        <example
          title="Initialize Flex.io JS SDK with your API key"
          code="Flexio.setup('YOUR API KEY GOES HERE')"
          :show-run="false"
        />

        <h2 class="mt5 mb0 pb2 bb b--light-gray">Collections</h2>

        <example
          v-for="(example, index) in list_examples"
          :title="example.title"
          :code="example.code"
          :fn="example.fn"
        />

        <h2 class="mt5 mb0 pb2 bb b--light-gray">Connections</h2>

        <example
          v-for="(example, index) in connection_examples"
          :title="example.title"
          :code="example.code"
          :fn="example.fn"
        />

        <h2 class="mt5 nb4 pb2 bb b--light-gray">Pipes</h2>

        <div v-for="(category, index) in pipe_examples">
          <h3 class="mt5 light-silver">{{category.title}}</h3>
          <example
            v-for="(example, index) in category.items"
            :title="example.title"
            :code="example.code"
            :fn="example.fn"
          />
        </div>

        <h2 class="mt5 mb0 pb2 bb b--light-gray">Tasks</h2>

        <example
          v-for="(example, index) in task_examples"
          :title="example.title"
          :description="example.description"
          :code="JSON.stringify(example.obj, null, 2)"
          :show-run="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Flexio from '../src/flexio'
  import Example from './Example.vue'
  //import list_examples from './examples/list'
  //import connection_examples from './examples/connection'
  //import pipe_examples from './examples/pipe'
  //import task_examples from './examples/task'
  const list_examples = []
  const connection_examples = []
  const pipe_examples = []
  const task_examples = []

  var version = Flexio.version

  var base_url = 'https://localhost:8080/api/v1'
  var api_key = 'xtdkxpcjwzkpgkhkcmhx'
  var debug = true

  export default {
    name: 'app',
    components: {
      Example
    },
    watch: {
      api_key(val, old_val) {
        Flexio.setup(val, { baseUrl: this.base_url, debug })
      },
      base_url(val, old_val) {
        Flexio.setup(this.api_key, { baseUrl: val, debug })
      }
    },
    data() {
      return {
        version,
        api_key,
        base_url,
        list_examples,
        connection_examples,
        pipe_examples,
        task_examples
      }
    },
    mounted() {
      Flexio.setup(api_key, { baseUrl: base_url, debug })
    }
  }
</script>

<style>
  html, body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 100%;
  }

  pre {
    font-family: Consolas, monaco, monospace;
    font-size: 13px;
    margin: 0;
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: #357edd;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .flex-fill {
    flex: 1 1;
    min-width: 0; /* 1 */
    min-height: 0; /* 1 */
  }

  .darken-10:hover,
  .darken-10:focus {
    box-shadow: inset 9999px 9999px rgba(0,0,0,0.10);
  }

  .darken-10:active {
    box-shadow: inset 9999px 9999px rgba(0,0,0,0.20);
  }

  .hljs {
    background-color: #f4f4f4; /* match .bg-near-white */
    padding: 0 1rem;
  }

  .box-shadow {
    box-shadow: 0 1px 4px -1px rgba(0,0,0,0.4);
  }
</style>

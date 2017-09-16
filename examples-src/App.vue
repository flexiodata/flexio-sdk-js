<template>
  <div id="app" class="pa3 center" style="max-width: 1152px;">
    <h1 class="mt0 pb2 bb b--black-10">Flex.io Javascript SDK v{{version}}</h1>

    <h2>API Key</h2>

    <p class="lh-copy">Flexio SDK calls require an API key. A default API key is provided to test the following calls. Feel free to <a href="https://www.flex.io/app/signup" target="_blank">sign up for Flex.io</a> to use your own API key in order to test these calls with your Flex.io account:</p class="lh-copy">
    <form>
      <div class="flex flex-row items-center mt2">
        <label class="mr2">Use this API key:</label>
        <input type="text" class="border-box ttl ba b--black-20 f6 pa2 w5 code" v-model="api_key">
      </div>
    </form>

    <h2>Setup</h2>

    <example
      title="Initialize Flex.io JS SDK with your API key"
      code="Flexio.setup('YOUR API KEY GOES HERE')"
      :show-run="false"
    ></example>

    <h2>Lists</h2>

    <example
      v-for="(example, index) in list_examples"
      :title="example.title"
      :code="example.code"
      :fn="example.fn"
      :api-key="api_key"
    ></example>

    <h2>Pipes</h2>

    <example
      v-for="(example, index) in pipe_examples"
      :title="example.title"
      :code="example.code"
      :fn="example.fn"
      :api-key="api_key"
    ></example>
  </div>
</template>

<script>
  import Flexio from '../src/flexio'
  import Example from './Example.vue'
  import list_examples from './examples/list'
  import pipe_examples from './examples/pipe'

  var version = Flexio.version
  var api_key = 'crhxftrjzjdjcbfvdcqg'

  export default {
    name: 'app',
    components: {
      Example
    },
    data() {
      return {
        version,
        api_key,
        list_examples,
        pipe_examples
      }
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

    box-shadow: 0 2px 4px -2px rgba(0,0,0,0.5);
  }
</style>

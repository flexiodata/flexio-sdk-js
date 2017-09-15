<template>
  <div id="app">
    <h1>Hello, World!</h1>
  </div>
</template>

<script>
  import Example from './Example.vue'

  export default {
    name: 'app',
    components: {
      Example
    }
  }
</script>

<style>
  html, body {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 100%;
  }

  html {
    height: 100%;
  }

  body {
    overflow: auto;
    position: relative;
  }

  .b--moon-gray {
    border-color: #ccc;
  }

  .flex-fill {
    flex: 1 1;
    min-width: 0; /* 1 */
    min-height: 0; /* 1 */
  }

  .darken-10:hover,
  .darken-10:focus {
    box-shadow: inset 9999px 9999px rgba(0,0,0,0.10)
  }

  .darken-10:active {
    box-shadow: inset 9999px 9999px rgba(0,0,0,0.20)
  }

  .lh-1 {
    line-height: 1;
  }
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
p,h1,h2,h3,h4,h5,h6{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-size: 14px;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #c5c5c5;
}
.wrap{
  display: flex;
  margin: 20px 0;
  padding: 10px 30px 20px;
}
.content{
  width: 96%;
  margin: auto;
}
.tools{
  margin: 20px 0;
}
.warn {
  color: #E18A3B !important;
}
.err {
  color: #DA281F !important;
}
#nprogress .spinner {
  display: none;
  width: 0;
  height: 0;
}
#nprogress .spinner-icon {
  display: none;
  width: 0;
  height: 0;
  animation: none;
  -webkit-animation: none;
}
</style>

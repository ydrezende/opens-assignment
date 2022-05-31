<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      Tipo:
      <select v-model="scramble_type">
        <option value="proximity">Mais próximo</option>
        <option value="distance">Mais distante</option>
        <option value="random">Aleatório</option>
      </select>
    </div>
    <scramble-info :type="scramble_type"/>
  </div>
</template>

<script>
import ScrambleInfo from './components/ScrambleInfo.vue'

export default {
  name: 'App',
  components: {
    ScrambleInfo
  },
  data() {
    return {
      scramble_type: 'proximity',
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

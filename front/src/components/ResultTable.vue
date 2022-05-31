<template>
  <table>
    <tr v-for="pair in result" :key="pair">
      <td width="150">Nome: {{ pair[0].name }}</td>
      <td width="500">Localização: {{ pair[0].location }}</td>
      <td width="150">Par: {{ pair[1].name }}</td>
      <td width="500">Par Localização: {{ pair[1].location }}</td>
    </tr>
  </table> 
</template>

<script>
export default {
  props: [
    'result'
  ]
}
</script>
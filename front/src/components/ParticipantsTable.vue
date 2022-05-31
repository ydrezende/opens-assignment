<template>
  <table>
    <tr v-for="entry in entries" :key="entry">
      <td width="200">Nome: {{ entry.name }}</td>
      <td width="300">Localização: {{ entry.location }}</td>
    </tr>
  </table> 
</template>

<script>
export default {
  props: [
    'entries'
  ]
}
</script>
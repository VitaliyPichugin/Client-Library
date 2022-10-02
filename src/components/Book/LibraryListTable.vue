<template>
  <td>
    <v-simple-table >
      <template >
        <tbody>
        <tr v-for="(item, i) in data.library" :key="i">
          <td class="text-left"><v-icon >mdi-book</v-icon>{{ item.name }}</td>
          <td class="text-right"><v-chip>Stock {{ item.pivot.stock }}</v-chip></td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </td>
</template>

<script>
export default {
  name: "LibraryListTable",
  props: ['data'],
}
</script>

<style lang="scss">
tr:hover{
  background-color: unset !important;
}
</style>

<template>
  <td>
    <v-list tag='ul'>
        <v-list-item tag='li' v-for="(item, i) in data.library" :key="i">
          <v-list-item-icon class="ma-3">
            <v-icon >mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item class="pa-0 ml-0">
            {{ item.name }}<strong class="pa-1 ml-1"> {{'in stock: ' + item.pivot.stock}}</strong>
          </v-list-item>
        </v-list-item>
    </v-list>
  </td>
</template>

<script>
export default {
  props: ['data'],
  name: "LibraryList",
}
</script>

<style lang="scss">
tbody {
  ul {
    background-color: inherit !important;
  }
}
</style>
<template>
  <v-dialog
      :value="true"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Delete book?
      </v-card-title>
      <v-card-text>Are you sure you wanna delete {{book.title}}?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            @click="$emit('close')"
            text
        >
          No
        </v-btn>
        <v-btn
            @click="remove(book.id, book.pivot.library_id)"
            color="red darken-1"
            text
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AppStorage from "@/helpers/AppStorage";
export default {
  props: ['book'],
  methods: {
    remove(id, lib_id) {
      axios.delete(`${api}/api/book/${id}/${lib_id}`, AppStorage.getHeader())
          .then(() => {
            this.$store.dispatch('GET_DATA')
            this.$emit('close')
            this.$store.commit('SHOW_SNACK_BAR', 'Deleted Book!')
          })
          .catch((error) => {
            this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
          })
    },
  },
}
</script>

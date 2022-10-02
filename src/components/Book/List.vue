<template>
  <div>
    <v-simple-table v-if="RESULT_SEARCH.length">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left" colspan="1">
            Author
          </th>
          <th class="text-left" colspan="2">
            Libs
          </th>
        </tr>
        </thead>
        <tbody>
        <Book v-for="book in RESULT_SEARCH" :data="book" :key="book.id"/>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-actions v-else class="justify-center">
      No result!
    </v-card-actions>
  </div>
</template>

<script>
import Book from "@/components/Library/Book";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {Book},
  name: "List",
  computed: {
    ...mapGetters([
      'RESULT_SEARCH'
    ]),
  },
  methods: {
    ...mapActions([
      'SEARCH_BOOK'
    ]),
  },
}
</script>

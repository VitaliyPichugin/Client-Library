<template>
  <div>
    <v-simple-table v-if="books.length">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left" >
            Author
          </th>
          <th class="text-left" colspan="4">
            Stock
          </th>
        </tr>
        </thead>
        <tbody>
        <Book v-for="book in books" :data="book" :likes="likes" :key="book.id"/>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-actions v-else class="justify-center">
      No books!
    </v-card-actions>
  </div>
</template>

<script>
import Book from "@/components/Library/Book";
export default {
  name: "ListBooks",
  components: {Book},
  props: ['books', 'likes'],
}
</script>
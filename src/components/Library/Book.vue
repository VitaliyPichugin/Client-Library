<template>
    <tr>
      <td>{{ data.title }}</td>
      <td>{{ data.description }}</td>
      <td>{{ data.author }}</td>
      <td v-if="$route.name !== 'Search'">{{ data.pivot.stock }}</td>
      <!--<LibraryList :data="data"/>-->
      <LibraryListTable :data="data"/>
      <td v-if="USER">
        <v-btn
              v-if="!LIKES.includes(data.id)"
              icon
              color="blue"
              @click="LIKE(data.id)"
          >
            <v-icon>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn
              v-else
              icon
              color="yellow"
              @click="LIKE(data.id)"
          >
            <v-icon>
              mdi-flag
            </v-icon>
          </v-btn>
      </td>
      <book-menu v-if="USER" :book="data"/>
    </tr>
</template>

<script>
import LibraryList from "@/components/Book/LibraryList";
import LibraryListTable from "@/components/Book/LibraryListTable";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Book",
  components: {
    LibraryList,
    LibraryListTable,
    'book-menu': require('@/components/Book/BookMenu').default
  },
  props: ['data'],
  computed: {
    ...mapGetters([
      'LIKES',
      'USER'
    ])
  },
  methods:{
    ...mapActions([
      'LIKE',
    ]),
  }
}
</script>
<template>
  <div>
    <div v-if="USER">
      <v-btn elevation="2" @click="dialog = true" class="mt-5 ml-2">Add Book</v-btn>
      <v-btn elevation="2" @click="dialog_lib = true" class="mt-5 ml-2">Add Library</v-btn>
    </div>
    <v-expansion-panels class="pt-3" multiple>
      <v-expansion-panel v-for="lib in LIB_DATA">
        <v-expansion-panel-header>
          {{lib.name}}
          <LibraryMenu v-if="USER" :lib="lib" class="text-right"></LibraryMenu>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
         <ListBooks :books="lib.books"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <AddBook :dialog="dialog"/>
    <AddLibrary :dialog="dialog_lib" />
  </div>
</template>

<script>
import ListBooks from "@/components/Library/ListBooks";
import {mapActions, mapGetters} from "vuex";
import AddBook from "@/components/Dialog/AddBook";
import AddLibrary from "@/components/Dialog/AddLibrary";
import LibraryMenu from "@/components/Library/LibraryMenu";
export default {
  name: "List",
  components: {LibraryMenu, AddBook, ListBooks, AddLibrary},
  data: () => ({
    dialog: false,
    dialog_lib: false,
  }),
  methods:{
    ...mapActions([
        'GET_LIKES',
        'GET_DATA',
    ]),
  },
  computed: {
    ...mapGetters([
        'LIB_DATA',
        'USER'
    ])
  },
  created() {
    this.GET_DATA();
    if (this.USER) {
      this.GET_LIKES();
    }
  }
}
</script>
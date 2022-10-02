<template>
  <v-row justify="center">
    <v-dialog
        :value="true"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit lib: {{library.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Title"
                    v-model="library.name"
                    append-icon="mdi-content-save"
                    prepend-icon="mdi-bookmark-box-multiple"
                    @click:append="updateTitle"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-list v-if="library.books.length" class="mt-0 pt-0">
                  <v-subheader>Books</v-subheader>
                  <v-list-item-group
                      color="primary"
                  >
                    <v-list-item
                        v-for="(item, i) in library.books"
                        :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon >mdi-book</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name + '  (in stock: ' + item.stock + ')'"></v-list-item-title>
                      </v-list-item-content>
                      <v-btn
                          fab
                          dark
                          small
                          color="red"
                          @click="detachBook(item.id, item.lib_id)"
                      >
                        <v-icon dark>
                          mdi-minus
                        </v-icon>
                      </v-btn>

                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-card-actions v-else class="justify-center">
                  No books!
                </v-card-actions>
              </v-col>
              <v-col cols="12">
                <v-autocomplete v-if=" this.books.length"
                    :items="books"
                    item-text="name"
                    item-value="id"
                    label="Add Books"
                    v-model="library.books"
                    multiple
                    return-object
                    @change="attachBook()"
                    required>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="$emit('close')"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppStorage from "@/helpers/AppStorage";
import {mapMutations, mapGetters} from "vuex";
export default {
  name: "EditLibrary",
  props: ['lib'],
  data: () => ({
    library: {
      books: [{}],
      name: '',
    },
    books: {},
  }),
  computed: {
    ...mapGetters([
      'BOOKS_FOR_LIB',
    ])
  },
  methods: {
    updateTitle(){
      axios.put(`${api}/api/library/update/${this.lib.id}`, {name: this.library.name}, AppStorage.getHeader())
          .then( () => {
            this.$store.dispatch('GET_DATA')
            this.$store.commit('SHOW_SNACK_BAR', 'Update library name!')
          })
          .catch((error) => {
            this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
          })
    },
    attachBook(){
      axios.put(`${api}/api/library/attach/${this.lib.id}`, this.library.books, AppStorage.getHeader())
          .then( () => {
            this.$store.dispatch('GET_DATA')
            this.$store.commit('SHOW_SNACK_BAR', 'Added new books to library!')
          })
          .catch((error) => {
            this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
          })
    },
    detachBook(book_id, lib_id) {
      axios.post(`${api}/api/library/detach/${book_id}/${lib_id}`, AppStorage.getHeader())
          .then(() => {
            this.$store.dispatch('GET_DATA')
            this.library.books = this.library.books.filter(item => item.id !== book_id );
            this.$store.commit('SHOW_SNACK_BAR', 'Deleted books from library!')
          })
          .catch((error) => {
            this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
          });
    },
    getAllBooks(){
      axios.get(`${api}/api/book/all`, AppStorage.getHeader())
          .then((res) => {
            this.books = res.data.map((item) => {
              item.lib_id = this.lib.id;
              item.name = item.title;
              item.stock = 1;
              delete item.title;
              return item;
            })
          })
          .catch((error) => {
            console.log(error)
          });
    },
    ...mapMutations(['SET_BOOKS_FOR_LIB']),
  },
  mounted() {
    this.getAllBooks();
    this.SET_BOOKS_FOR_LIB(this.lib.id);
    this.library.name = this.lib.name;
    this.library.books = this.BOOKS_FOR_LIB;
  }
}
</script>
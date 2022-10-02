<template>
  <v-row justify="center">
    <v-dialog
        :value="true"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Title*"
                    v-model="book.title"
                    required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Description*"
                    v-model="book.description"
                    required>
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Author*"
                    v-model="book.author"
                    required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Stock*"
                    v-model="book.stock"
                    required>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                    :items="LIB_DATA"
                    item-text="name"
                    item-value="id"
                    label="Libs*"
                    v-model="book.libs"
                    multiple
                    return-object
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
          <v-btn
              color="blue darken-1"
              text
              @click="save()"
          >
            Save
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
  name: "EditBook",
  props: ['data'],
  data: () => ({
    book: {
      libs: [{}],
      title: '',
      author: '',
      description: '',
      stock: 1,
    }
  }),
  computed: {
    ...mapGetters([
      'LIB_DATA',
      'LIBS_FOR_BOOK',
    ])
  },
  methods: {
    save(){
      this.book.libs = this.book.libs.map(item => {
        if(item.book_id === this.data.id && item.id === this.data.pivot.library_id){
          item.stock = this.book.stock;
        }
        return item
      });
      axios.put(`${api}/api/book/${this.data.id}`, this.book, AppStorage.getHeader())
          .then( () => {
            this.$store.dispatch('GET_DATA')
            this.$emit('close')
            this.$store.commit('SHOW_SNACK_BAR', 'Edited book!')
          })
          .catch((error) => {
            this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
            this.$emit('close')
          })
    },
    ...mapMutations(['SET_LIBS_FOR_BOOK']),
  },
  mounted() {
    this.SET_LIBS_FOR_BOOK(this.data.id);
    this.book.title = this.data.title;
    this.book.author = this.data.author;
    this.book.description = this.data.description;
    this.book.stock = this.data.pivot.stock;
    this.book.current_lib = this.data.pivot.library_id;
    this.book.libs = this.LIBS_FOR_BOOK;
  }
}
</script>
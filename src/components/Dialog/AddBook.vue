<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Book</span>
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
                    multiple
                    v-model="book.libs"
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
              @click="close"
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
import {mapGetters} from "vuex";
export default {
  name: "AddBook",
  props: ['dialog'],
  data: () => ({
    book: {
      libs: [],
      title: '',
      author: '',
      description: '',
      stock: 1,
    }
  }),
  computed: {
    ...mapGetters([
      'LIB_DATA'
    ])
  },
  methods: {
    close(){
      this.$parent.dialog = false;
    },
    save(){
      if(AppStorage.getUser()) {//if the session has not expired
        axios.post(`${api}/api/book`, this.book, AppStorage.getHeader())
            .then(() => {
              this.$store.dispatch('GET_DATA')
              this.$store.commit('SHOW_SNACK_BAR', 'Added Book!')
            })
            .catch((error) => {
              this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
            })
      }else{
        this.$store.commit('SET_USER', false)
        this.$store.commit('SHOW_SNACK_BAR', 'Session expired!');
      }
      this.$parent.dialog = false;
    }
  },
}
</script>
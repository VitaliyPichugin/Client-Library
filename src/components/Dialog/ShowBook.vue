<template>
  <v-row justify="center">
    <v-dialog
        :value="true"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Detail book</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Title"
                    v-model="book.title"
                    readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Description"
                    v-model="book.description"
                    readonly>
                </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Author"
                    v-model="book.author"
                    readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Stock"
                    v-model="book.stock"
                    readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                    :items="LIB_DATA"
                    item-text="name"
                    readonly
                    item-value="id"
                    label="Lib"
                    v-model="book.lib"
                    return-object>
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
import {mapGetters} from "vuex";
export default {
  name: "ShowBook",
  props: ['data'],
  data: () => ({
    book: {
      lib: [],
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
  },
  mounted() {
    this.book.title = this.data.title;
    this.book.author = this.data.author;
    this.book.description = this.data.description;
    this.book.stock = this.data.pivot.stock;
    this.book.lib = {
      id: this.data.pivot.library_id,
      name: this.LIB_DATA.filter(task => task.id === this.data.pivot.library_id)[0]['name']
    }
  }
}
</script>
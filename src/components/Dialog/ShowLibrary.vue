<template>
  <v-row justify="center">
    <v-dialog
        :value="true"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Detail Lib</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Title"
                    v-model="lib.name"
                    readonly>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-list v-if="lib.books.length" class="mt-0 pt-0">
                  <v-subheader>Books</v-subheader>
                  <v-list-item-group
                      color="primary"
                  >
                    <v-list-item
                        v-for="(item, i) in lib.books"
                        :key="i"
                    >
                      <v-list-item-icon>
                        <v-icon >mdi-book</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.title + '  (in stock: ' + item.pivot.stock + ')'"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-card-actions v-else class="justify-center">
                  No books!
                </v-card-actions>
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
  name: "ShowLibrary",
  props: ['lib'],
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
}
</script>
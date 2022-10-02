<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Library</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Name*"
                    v-model="lib.name"
                    required>
                </v-text-field>
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
              @click="save"
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
export default {
  name: "AddLibrary",
  props: ['dialog'],
  data: () => ({
    lib: {
      name: '',
    }
  }),
  methods: {
    close(){
      this.$parent.dialog_lib = false;
    },
    save() {
      if (AppStorage.getUser()) {//if the session has not expired
        if (this.lib.name) {
          axios.post(`${api}/api/library`, this.lib, AppStorage.getHeader())
              .then(() => {
                this.$store.dispatch('GET_DATA')
                this.$parent.dialog_lib = false;
                this.$store.commit('SHOW_SNACK_BAR', 'Added Library!')
              })
              .catch((error) => {
                this.$store.commit('SHOW_SNACK_BAR', error.response.data.message || 'Error!')
              })
        } else {
          this.$store.commit('SHOW_SNACK_BAR', 'Empty field!')
        }
      }else {
        this.$store.commit('SET_USER', false)
        this.$store.commit('SHOW_SNACK_BAR', 'Session expired!');
      }
    }
  },
}
</script>
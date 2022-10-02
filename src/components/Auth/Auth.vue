<template>
  <v-dialog v-if="!USER" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>
    <v-card v-if="!reg">
      <v-card-title>
        <span class="text-h5">Auth</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="Email*"
                  required
                  v-model="form.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="form.password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="login()">Sign In</v-btn>
        <v-btn color="blue darken-1" text @click="reg = true">Sign Up</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title>
        <span class="text-h5">Auth</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="Name*"
                  required
                  v-model="form.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Email*"
                  required
                  v-model="form.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Password*"
                  type="password"
                  required
                  v-model="form.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Confirm Password*"
                  type="password"
                  required
                  v-model="form.password_confirmation"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="signup()">Create</v-btn>
        <v-btn color="blue darken-1" text @click="reg = false">Sign in</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
  <v-menu v-else >
    <template v-slot:activator="{ on, attrs }">
      <v-chip
          v-bind="attrs"
          v-on="on"
          class="text-h6" >
        Hi, {{USER}}!
      </v-chip>
    </template>
    <v-list>
      <v-list-item @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import User from "@/helpers/User";
import {mapGetters} from "vuex";
export default {
  name: "Auth",
  data: () => ({
    dialog: false,
    reg: false,
    form: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    },
  }),
  methods: {
    signup() {
      axios.post(`${api}/api/auth/signup`, this.form)
          .then(res => {
            if (!res.data.access_token) {
              this.$store.commit('SHOW_SNACK_BAR', res.data)
            } else {
              User.responseAfterLogin(res)
              this.dialog = false;
              this.$store.dispatch('LOGIN', User.name())
              this.$store.dispatch('GET_LIKES')
              this.$store.commit('SHOW_SNACK_BAR', 'Successful signup!')
            }
          }).catch(error => this.$store.commit('SHOW_SNACK_BAR', error.response.data.error))
    },
    login() {
      if (this.form.email && this.form.password) {
        axios.post(`${api}/api/auth/login`, this.form)
            .then(res => {
              User.responseAfterLogin(res)
              this.dialog = false;
              this.$store.dispatch('LOGIN', User.name())
              this.$store.dispatch('GET_LIKES')
              this.$store.commit('SHOW_SNACK_BAR', 'Successful login!')
            })
            .catch(error => this.$store.commit('SHOW_SNACK_BAR', error.response.data.error))
      } else {
        this.$store.commit('SHOW_SNACK_BAR', 'Empty field!')
      }
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$store.dispatch('LOGOUT')
      this.$store.commit('SHOW_SNACK_BAR', 'Successful logout!')
    },
  },
  computed:{
    ...mapGetters([
        'USER'
    ])
  },
}
</script>
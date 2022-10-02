import Vue from 'vue'
import Vuex from 'vuex'

import AppStorage from "@/helpers/AppStorage";

import book from "@/store/actions/book";
import library from "@/store/actions/library";
import search from "@/store/actions/search";
import mutations from "@/store/mutations/mutations";
import getters from "@/store/getters/getters";
import user from "@/store/actions/user";

const actions = {
  ...book,
  ...library,
  ...search,
  ...user
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: AppStorage.getUser(),
    appTitle: process.env,
    libsForBook: [{}],
    booksForLib: [{}],
    likes: [],
    data: {},
    search: '',
    search_res: {},
    snackbar: {
      show: false,
      text: ''
    },
  },
  getters,
  mutations,
  actions,
  modules: {
  }
})

<template>
  <v-text-field
    v-model="text"
    @input="setSearchText(text)"
    @keyup="SEARCH_BOOK(text)"
    class="expanding-search mt-1"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    filled
    dense
    clearable>
  </v-text-field>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  data: () => ({
    text: '',
  }),
  methods: {
    ...mapActions([
      'SEARCH_BOOK',
        'GET_LIKES',
    ]),
    setSearchText(){
      this.$router.replace({path: "/search", query:{text: this.text}})
    }
  },
  computed:{
    ...mapGetters([
        'USER'
    ])
  },
  mounted() {
    this.text = this.$route.query.text || '';
    if(this.text){
      this.SEARCH_BOOK(this.text)
    }
    if(this.USER) {
      this.GET_LIKES()
    }
  },
}
</script>


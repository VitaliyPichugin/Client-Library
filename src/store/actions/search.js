export default {
    SEARCH_BOOK({commit}, value) {
        if(value) {
            axios.get(`${api}/api/search/${value}`)
                .then(res => {
                    commit('SET_SEARCH_RESULT', res.data);
                })
                .catch((error) => {
                    commit('SHOW_SNACK_BAR', error.message || 'Error!');
                })
        }
    }
}
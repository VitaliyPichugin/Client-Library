export default {
    GET_DATA({commit}) {
        axios.get(`${api}/api/library`)
            .then(res => {
                commit('SET_DATA', res.data);
            })
            .catch((error) => {
                commit('SHOW_SNACK_BAR', error.message || 'Error!');
            })
    },
}
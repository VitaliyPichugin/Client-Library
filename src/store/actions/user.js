export default {
    LOGIN({commit}, val) {
        commit('SET_USER', val);
    },
    LOGOUT({commit}) {
        commit('SET_USER', false);
    },
}
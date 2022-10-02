import AppStorage from "@/helpers/AppStorage";

export default {
    LIKE({commit}, id) {
        if (!AppStorage.getUser()) {
            commit('SET_USER', false)
            commit('SHOW_SNACK_BAR', 'Session expired!');
        } else {
            let data = [];
            axios.post(`${api}/api/book/like`, {id: id}, AppStorage.getHeader())
                .then(res => {
                    data['data'] = res.data;
                    data['id'] = id;
                    commit('SET_LIKE', data);
                })
                .catch((error) => {
                    commit('SHOW_SNACK_BAR', error.message || 'Error!');
                })
        }
    },
    GET_LIKES({commit}) {
        if (!AppStorage.getUser()) {
            commit('SET_USER', false)
            commit('SHOW_SNACK_BAR', 'Session expired!');
        } else {
            axios.get(`${api}/api/book/likes`, AppStorage.getHeader())
                .then(res => {
                    commit('SET_LIKES', res.data);
                })
                .catch((error) => {
                    commit('SHOW_SNACK_BAR', error.message || 'Error!');
                })
        }
    },
}
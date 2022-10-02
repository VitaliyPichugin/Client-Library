class AppStorage {
    storeToken(token) {
        localStorage.setItem('token', token);
    }

    storeUser(user) {
        localStorage.setItem('user', user);
    }

    store(token, user) {
        this.storeToken(token)
        this.storeUser(user)
    }

    getHeader() {
        if (this.getToken()) {
            return {headers: {Authorization: `Bearer ${this.getToken()}`}}
        } else {
            this.$store.commit('SHOW_SNACK_BAR', 'User not logged in')
        }
    }

    clear() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    getToken() {
        return localStorage.getItem('token') || false;
    }

    getUser() {
        return localStorage.getItem('user') || false;
    }
}
export default AppStorage = new AppStorage();
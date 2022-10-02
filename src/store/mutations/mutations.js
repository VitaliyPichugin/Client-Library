export default {
    SET_LIKE: (state, data) => {
        if (data['data'] === 1) {
            state.likes.push(data['id']);
        } else {
            let index = state.likes.indexOf(data['id']);
            if (index !== -1) {
                state.likes.splice(index, 1);
            }
        }
    },
    SET_LIKES: (state, data) => {
        state.likes = data;
    },
    SET_DATA: (state, data) => {
        state.data = data;
    },
    SET_SEARCH_RESULT: (state, value) => {
        state.search_res = value
    },
    SET_USER: (state, value) => {
        state.user = value
    },
    DELETE_BOOK(state, id) {
        state.data = state.data.filter(book => book.id !== id)
    },
    SET_LIBS_FOR_BOOK(state, book_id) {
        state.libsForBook = setData(state).filter(item => item.book_id === book_id).map((item) => {
            let res = {};
            res.id = item.lib_id;
            res.name = item.lib_name;
            res.stock = item.stock;
            res.book_id = book_id;
            return res;
        });
    },
    SET_BOOKS_FOR_LIB(state, lib_id) {
        state.booksForLib = setData(state).filter(item => item.lib_id === lib_id).map((item) => {
            let res = {};
            res.id = item.book_id;
            res.lib_id = item.lib_id;
            res.name = item.book_name;
            res.stock = item.stock;
            return res;
        });
    },
    SHOW_SNACK_BAR(state, text) {
        let timeout = 0
        if (state.snackbar.show) {
            state.snackbar.show = false
            timeout = 300
        }
        setTimeout(() => {
            state.snackbar.show = true
            state.snackbar.text = text
        }, timeout)
    },
    HIDE_SNACK_BAR(state) {
        state.snackbar.show = false
    },
}
function setData (state) {
    let res = [{}];
    for (let i in state.data) {
        for (let k in state.data[i]['books']) {
            let data = {
                'lib_id': state.data[i].id,
                'lib_name': state.data[i].name,
                'book_id': state.data[i]['books'][k]['id'],
                'book_name': state.data[i]['books'][k]['title'],
                'stock': state.data[i]['books'][k]['pivot']['stock'],
            };
            res.push(data)
        }
    }
    return res;
}
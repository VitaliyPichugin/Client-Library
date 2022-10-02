import Vue from 'vue'
import VueRouter from 'vue-router'
import LibraryView from "@/views/LibraryView";
import SearchView from "@/views/SearchView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: LibraryView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
  }
]

const router = new VueRouter({
  routes
})

export default router

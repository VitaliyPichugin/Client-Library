<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Library System
          </v-list-item-title>
          <v-list-item-subtitle>
            V1.0
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <Auth/>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Auth from "@/components/Auth/Auth";
import Snackbar from "@/components/Shared/Snackbar";
export default {
  components: {Snackbar, Auth},
  data: () => ({
    drawer: null,
    items: [
      {title: 'Library', icon: 'mdi-bookmark-box-multiple', to: '/'},
      {title: 'Search', icon: 'mdi-magnify', to: 'search'},
    ],
  }),
}
</script>
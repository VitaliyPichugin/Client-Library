<template>
  <td >
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="dark"
            icon
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <EditLibrary
        v-if="dialogs.edit"
        @close="dialogs.edit = false"
        :lib="lib"
    />
    <DeleteLibrary
        v-if="dialogs.delete"
        @close="dialogs.delete = false"
        :lib="lib"
    />
    <ShowLibrary
        v-if="dialogs.show"
        @close="dialogs.show = false"
        :lib="lib"
    />
  </td>
</template>

<script>
import EditLibrary from "@/components/Dialog/EditLibrary";
import ShowLibrary from "@/components/Dialog/ShowLibrary";
import DeleteLibrary from "@/components/Dialog/DeleteLibrary";
export default {
  components: {
    EditLibrary,
    DeleteLibrary,
    ShowLibrary
  },
  props: ['lib'],
  data: () => ({
    dialogs: {
      edit: false,
      delete: false,
      show: false,
    },
    items: [
      {
        title: 'Edit',
        icon: 'mdi-pencil',
        click() {
          this.dialogs.edit = true
        }
      },
      {
        title: 'Delete',
        icon: 'mdi-delete',
        click() {
          this.dialogs.delete = true
        }
      },
      {
        title: 'Detail',
        icon: 'mdi-eye',
        click() {
          this.dialogs.show = true
        }
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
    }
  },
}
</script>
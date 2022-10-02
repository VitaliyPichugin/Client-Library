<template>
  <td  v-if="$route.name !== 'Search'">
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
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
    <EditBook
        v-if="dialogs.edit"
        @close="dialogs.edit = false"
        :data="book"
    />
    <DeleteBook
        v-if="dialogs.delete"
        @close="dialogs.delete = false"
        :book="book"
    />
    <ShowBook
        v-if="dialogs.show"
        @close="dialogs.show = false"
        :data="book"
    />
  </td>
</template>

<script>
import EditBook from '@/components/Dialog/EditBook';
import DeleteBook from '@/components/Dialog/DeleteBook';
import ShowBook from "@/components/Dialog/ShowBook";
export default {
  components: {
    EditBook,
    DeleteBook,
    ShowBook
  },
  props: ['book'],
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
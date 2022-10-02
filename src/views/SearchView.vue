<template>
  <div>
    <SearchField/>
    <List/>
  </div>
</template>

<script>
import SearchField from "@/components/Search/SearchField";
import List from "@/components/Book/List";
export default {
  name: "Search",
  components: {List,  SearchField}
}
</script>
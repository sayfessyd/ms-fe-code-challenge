<template>
  <div>
    <Header></Header>
    <Table></Table>
  </div>
</template>

<script>
  import Header from "./components/Header.vue";
  import Table from "./components/Table.vue";
  export default {
    name: "App",
    components: {
      Header,
      Table
    }
  };
</script>
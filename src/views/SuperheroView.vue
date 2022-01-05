<template>
  <div class="superheroView">
    Heroes
    <SearchField></SearchField>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue';
import SearchField from '@/components/SearchField.vue';
import {defineComponent} from "vue"; // @ is an alias to /src

export default defineComponent({
  name: 'SuperheroView',
  components: {
    HelloWorld,
    SearchField,
  },
})
// export default class SuperheroView extends Vue {}
</script>

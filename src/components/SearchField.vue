<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Title</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-on:keyup.enter="searchForHero"
          v-model="hero.name"
          name="name"
        />
      </div>
      <button @click="searchForHero" class="btn btn-success">Search</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <!--      <span>{{ hero.biography }}</span>-->
      <table class="table table-striped table-bordered table-rounded">
        <thead>
        <tr>
          <th>Alias</th>
          <th>Full Name</th>
          <th>First Appearance</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hero in results" :key="hero.id">
          <td>{{ hero.name }}</td>
          <td>{{ hero.biography['full-name'] }}</td>
          <td>{{ hero.biography['first-appearance'] }}</td>
          <!--          <td>{{ hero.biography.firstAppearance }}</td>-->
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import HeroDataService from '@/services/HeroDataService';
// import TutorialDataService from '@/services/TutorialDataService';
import Hero from '@/types/Hero';
import http from '@/http-common';
import { defineComponent } from 'vue';
import ResponseData from '@/types/ResponseData';

export default defineComponent({
  name: 'SearchField',
  data() {
    return {
      submitted: false,
      title: 'Sweet!',
      hero: {
        id: -1,
        name: '',
        powerstats: '',
        biography: {
          fullName: '',
          firstAppearance: '',
        },
      } as Hero,
      results: {},
    };
  },
  methods: {
    getByName(name: string): Promise<never> {
      return http.get(`/search/${name}`);
    },

    searchForHero() {
      this.getByName(this.hero.name)
        .then((response: ResponseData) => {
          // this.hero = response.data;
          if (response.data.response === 'error') {
            console.log('nope!');
          }
          console.log(response.data);
          this.results = response.data.results;
          this.hero.biography = response.data.results.biography;
          this.submitted = true;

          console.log(this.results);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
});

</script>

<style lang="scss" scoped>
table {
  color: black;
  background-color: white;
  border-color: black;
  border-style: solid;
  border-width: 0 1px 1px 1px;
  border-radius: 5px;
  border-collapse: separate;
  border-spacing: 0;
  display: table;
  overflow: auto;
  width: 80%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
table thead th {
  color: white;
  background-color: black;
  font-weight: bold;
  font-size: 0.8em;
  padding: 5px 10px;
  vertical-align: bottom;
}
table thead th:first-child {
  border-top-left-radius: 5px;
  border-right: 1px solid #fff;
}
table thead th:last-child {
  border-top-right-radius: 5px;
  border-left: 1px solid #fff;
}
table tbody td {
  border-top: 1px solid gray;

  border-left: 1px solid #000;
  border-right: 1px solid #000;

  padding: 5px 10px;
  vertical-align: top;
}
table tbody td:first-child  {
  border-left: 0 solid #000;
}
table tbody td:last-child  {
  border-right: 0 solid #000;
}
table tbody tr:nth-child(2n) {
  background-color: lightgray;
}
</style>

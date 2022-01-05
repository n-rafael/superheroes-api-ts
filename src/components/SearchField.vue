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
import { Component, Vue } from 'vue-property-decorator';
// import HeroDataService from '@/services/HeroDataService';
// import TutorialDataService from '@/services/TutorialDataService';
import Hero from '@/types/Hero';
import http from '@/http-common';

@Component
export default class SearchField extends Vue {
  private hero: Hero = {
    id: null,
    name: '',
    powerstats: '',
    biography: {
      fullName: '',
      firstAppearance: '',
    },
  };

  private submitted = false;

  private results: any;

  static getByName(name: string) {
    return http.get(`/search/${name}`);
  }

  searchForHero() {
    const data = {
      name: this.hero.name,
      biography: this.hero.biography,
    };

    // TutorialDataService.getAll();
    // console.log(TutorialDataService.type, TutorialDataService.singletonMethod());

    SearchField.getByName(this.hero.name)
      .then((response) => {
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
      .catch((e) => {
        console.log(e);
      });
  }

  newHero() {
    this.submitted = false;
    this.hero = {} as Hero;
  }
}

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
    border-left: 0px solid #000;
  }
  table tbody td:last-child  {
    border-right: 0px solid #000;
  }
  table tbody tr:nth-child(2n) {
    background-color: lightgray;
  }
</style>

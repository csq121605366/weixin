<template>
  <section class="container">

    <!-- house -->
    <div class="house" ref="house">
      <div class="house_items" @click="focusHouse(item)" v-for="(item,$index) in houses" :key="$index">
        <div class="house_desc">
          <div class="house_words">{{item.words}}</div>
          <div class="house_cname">{{item.cname}}</div>
          <div class="house_name">{{item.name}}</div>
        </div>
      </div>
    </div>

    <!-- characters -->
    <div class="characters">
      <div class="characters_title">主要人物</div>
      <div class="characters_section">
        <div class="characters_items" v-for="(item,$index) in characters" :key="$index" @click="showCharacter(item)">
          <img :src="item.avatar" alt="">
          <div class="characters_desc">
            <div class="characters_cname">{{item.cname}}</div>
            <div class="characters_name">{{item.name}}</div>
            <div class="characters_playedBy">{{item.playedBy}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- city -->
    <div class="city">
      <div class="city_title">维斯特洛</div>
      <div class="city_intro">手热每集前权器民生何交应现。历时她么商性党向根北段对金。目至利例看那运性全五整高色没界太。管最历进片县争单特各外周多水。干权系究根开示准革住组西影加处处。林七书美本同思较名马和严效斗情议济。文列用经历者工书界快北内论口。</div>
      <div class="city_item" v-for="(item,$index) in cities" :key="$index">
        <div class="city_title">{{item.title}}</div>
        <div class="city_body">{{item.body}}</div>
      </div>
    </div>

  </section>
</template>

<script>
import { fetchHouses, fetchCharacters, fetchCities } from '../util/axios';
export default {
  head() {
    return {
      title: '冰火脸谱'
    }
  },
  data() {
    return {
      houses: [],
      characters: [],
      cities: []
    }
  },
  compouted: {
  },
  methods: {
    focusHouse(item){
      this.$router.push({ path: '/house', query: { id: item._id } })
    },
    showCharacter() {
      this.$router.push({ path: '/character', query: { id: item._id } })
    },
    getHouses() {
      fetchHouses().then(res => {
        this.houses = res.data;
      })
    },
    getCharacters() {
      fetchCharacters().then(res => {
        this.characters = res.data;
      })
    },
    getCities() {
      fetchCities().then(res => {
        this.cities = res.data;
      })
    }
  },
  created() {
    this.getHouses();
    this.getCharacters();
    this.getCities();
  }
}
</script>

<style lang="scss">
@import '../static/style/index';
</style>


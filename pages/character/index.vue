<template>
<section class="container">
    <div v-if="character" class="character-header">
        {{character.images.length}}
        <!-- <img :src="character.images[character.images.length-1]" alt=""> -->
        <div class="media">
            <img :src="character.profile" alt="">
            <div class="desc">
                <div class="names">
                    <p class="cname">{{character.cname}}</p>
                    <p class="name">{{character.name}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="charater-body">
    <div class="intro">
        <p>{{character.intro}}</p>
    </div>
    <div class="stills">
        <img v-for="(item,index) in character.images" :key="index" :src="item" alt="">
    </div>
    <div class="items" v-for="(item,index) in character.sections" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="body" >{{item.content}}</div>
    </div>
    </div>
</section>
</template>

<script>
import { mapState } from "vuex";
import { fetchCharacter } from "../../util/axios";
export default {
  head() {
    return {
      title: "家族详情"
    };
  },
  data() {
    return {
      character: null
    };
  },
  computed: {},
  beforeCreate() {
    let id = this.$route.query.id;
    console.log(id);
    fetchCharacter(id).then(res => {
      this.character = res.data;
    //   console.log(this.character);
    });
  }
};
</script>

<style lang="scss">
// @import "../../static/style/character";
</style>

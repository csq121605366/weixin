<template>
<section class="container">
    <div class="house-media">
        <div class="desc">
            <div class="words">{{house.words}}</div>
            <div class="name">{{house.name}}</div>
        </div>
    </div>
    <div class="house-body">
        <div class="title">{{house.cname}}</div>
        <div class="body">{{house.intro}}</div>
        <div class="title">主要角色</div>
        <div class="items" v-for="(item,index) in house.swornMembers" :key="index">
            <div class="members">
                <img src="item.profile" alt="">
                <div class="desc">
                    <div class="cname"></div>
                    <div class="intro"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="house-histroy" v-for="(item,index) in house.sections" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="content" v-for="(text,num) in item.content" :key="num">{{text}}</div>
    </div>
</section>
</template>

<script>
import { mapState } from "vuex";
import { fetchHouses, fetchCharacters, fetchCities } from "../../util/axios";
export default {
  head() {
    return {
      title: "家族详情"
    };
  },
  computed: {
    ...mapState({
      house: "showHouse"
    })
  },
  beforeCreate() {
    let id = this.$route.query.id;
  }
};
</script>

<style lang="scss">
@import "../../static/style/house";
</style>

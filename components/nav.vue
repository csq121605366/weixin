<template>
		<nav v-if="navVisible" id="nav">
			<nuxt-link v-for="(item,index) in navList" :to="item.path" :key="index">
				<div v-if="index==0">
					<img v-if="activeRoute !==item.name" src="~assets/img/home.png" alt="">
					<img v-else src="~assets/img/home-selected.png" alt="">
				</div>
				<div v-if="index==1">
					<img v-if="activeRoute !==item.name" src="~assets/img/shopping.png" alt="">
					<img v-else src="~assets/img/shopping-selected.png" alt="">
				</div>
				<div v-else>
					<img v-if="activeRoute !==item.name" src="~assets/img/user.png" alt="">
					<img v-else src="~assets/img/user-selected.png" alt="">
				</div>
			</nuxt-link>
		</nav>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        {
          path: "/",
          name: "index",
          text: "脸谱"
        },
        {
          path: "/shopping",
          name: "shopping",
          text: "周边手办"
        },
        {
          path: "/user",
          name: "user",
          text: "我的账户"
        }
      ]
    };
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
    navVisible() {
      return ["index", "shopping", "user"].indexOf(this.activeRoute) > -1;
    }
  }
};
</script>

<style>

</style>

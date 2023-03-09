import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SignedInHome from '../views/SignedInHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: [
      {
        title: "Cloudpunchd | Watch, Track, Share"
      },
      {
        name: "description",
        content: "Welcome to Cloudpunchd, watch, track, and share films."
      },
      {
        name: "keywords",
        content: "cloudpunchd, movies, movie, social, track, watchlist, watched, film, films"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
  {
    path: '/home',
    name: 'SignedInHome',
    component: SignedInHome,
    meta: [
      {
        title: "Cloudpunchd | Watch, Track, Share"
      },
      {
        name: "description",
        content: "Welcome to Cloudpunchd, watch, track, and share films."
      },
      {
        name: "keywords",
        content: "cloudpunchd, movies, movie, social, track, watchlist, watched, film, films"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

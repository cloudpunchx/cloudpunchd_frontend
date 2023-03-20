import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SignedInHome from '../views/SignedInHome.vue'
import UserProfile from '../views/UserProfile.vue'
import EditProfile from '../views/EditProfile.vue'
import WatchList from '../views/WatchList.vue'
import MoviePage from '../views/MoviePage.vue'
import SearchResults from '../views/SearchResults.vue'

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
        content: "Cloudpunchd, track your love for movies."
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
        content: "Cloudpunchd, track your love for movies."
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
    path: '/user/:username',
    name: 'UserProfile',
    component: UserProfile,
    meta: [
      {
        title: "Cloudpunchd | Profile"
      },
      {
        name: "description",
        content: "User profile page."
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
    path: '/settings',
    name: 'EditProfile',
    component: EditProfile,
    meta: [
      {
        title: "Cloudpunchd | Edit Profile"
      },
      {
        name: "description",
        content: "Edit profile information."
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
    path: '/:username/watchlist',
    name: 'WatchList',
    component: WatchList,
    meta: [
      {
        title: "Cloudpunchd | Watchlist"
      },
      {
        name: "description",
        content: "User Watch List."
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
    path: '/movie/:movieName/:movieId',
    name: 'MoviePage',
    component: MoviePage,
    meta: [
      {
        title: "Cloudpunchd | "
      },
      {
        name: "description",
        content: "Detailed Movie Page, add to watchlist, add to watched."
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
    path: '/search/:query',
    name: 'SearchResults',
    component: SearchResults,
    meta: [
      {
        title: "Cloudpunchd | Search"
      },
      {
        name: "description",
        content: "Search Results for Cloudpunchd"
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

router.beforeEach((to,from,next)=>{
  // Get all meta tags 
  let metaTags = document.querySelectorAll('meta');
  // Loop through the tags and remove each
  // for OF is vanilla Javascript so that's what we have to use (vue is for in loops) and this page is PURE JAVASCRIPT
  for (let tag of metaTags){
    tag.remove();
  }
  // to.meta (navigating TO.meta.title)
  let newTags = to.meta;
  document.querySelector('title').innerText = newTags[0].title;

  // i zero is the title obj that we don't need here
  for (let i = 1; i<newTags.length; i++){
    document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
                                                      `<meta name:"${newTags[i].name}" description="${newTags[i].content}">`);
  }
  document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
                                                    `<meta charset="utf-8">
                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                    <meta name="viewport" content="width=device-width,initial-scale=1.0">`
                                                    );
  next();
  from;
})


export default router

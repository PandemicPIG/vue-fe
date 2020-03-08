import Vue from 'vue'
import VueRouter from 'vue-router'
import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      ulist: UserList,
      uedit: UserEdit
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

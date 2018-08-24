const tab1 = { template: '<div>foo</div>' }
const tab2 = { template: '<div>bar</div>' }

const routes = [
  { path: '/tab1', component: tab1 },
  { path: '/tab2', component: tab2 }
]

const router = new VueRouter({
  routes: routes
})

const app = new Vue({
  router,
  el:'#app'
})


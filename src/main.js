import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "amfe-flexible"

import { Button } from 'vant';
import { NavBar } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { Tab, Tabs } from 'vant';
import { Cell } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Cell);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(NavBar);
Vue.use(Button);

Vue.config.productionTip = false

import * as API from '@/api'

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')

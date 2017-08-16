import Index from "./Index.vue";
import Search from "./Search.vue";

const Vue = require('vue');
const VueRouter = require('vue-router');

Vue.use(VueRouter);

Vue.directive('focus',{
    priority: 100,
    bind: function() {
      const self = this;
      this.bound = true;

      Vue.nextTick(function() {
        if (self.bound === true) {
          self.el.focus();
        }
      });
    },
    unbind: function(){
      this.bound = false;
    }
});

var App = Vue.extend({});

var router = new VueRouter();

router.map({
    '/': {
        component: Index,
        name: 'index'
    },
    '/search': {
        component: Search,
        name: 'search'
    }
});

router.start(App, 'body');

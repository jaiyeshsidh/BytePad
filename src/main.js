const Vue = require('vue');
import Autocomplete from './Autocomplete.vue';
const VueResource = require('vue-resource');
const _ = require('underscore');

Vue.use(VueResource);

Vue.directive('focus',{
    priority: 100,
    bind: function() {
      var self = this;
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

new Vue({
    el: 'body',

    components: { Autocomplete },

    data: {
        subjects : [],
        value: ''
    },

    ready: function(){
      this.fetchSubjectList();
    },

    methods: {
      fetchSubjectList: function() {
        this.$http.get('http://testapi.silive.in/api/subject_detail').then(response => {
          //console.log(response.headers);
          return response.json();
        }, response => {
          //console.log(response)
        }).then(json => {
          //console.log(json);
          var subjectName = _.pluck(json,'SubjectName');
          var subjectCode = _.pluck(json,'SubjectCode');
          subjectName = _.map(subjectName, function(val,key) {
            //return v.toLowerCase();
            return val + ' - ' + subjectCode[key];
          });
          this.subjects = subjectName;
        });
      }
    }

});

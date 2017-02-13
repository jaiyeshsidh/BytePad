var Vue = require('vue');
import Autocomplete from './Autocomplete.vue';
var VueResource = require('vue-resource');
var _ = require('underscore');

Vue.use(VueResource);

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

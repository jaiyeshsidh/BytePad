const Vue = require('vue');
import Autocomplete from './Autocomplete.vue';
import Questionpapers from './Questionpapers.vue'

const VueResource = require('vue-resource');

const _ = require('underscore');

// using vue-resource with Vue
Vue.use(VueResource);

export default {
    components: {
      Autocomplete,
      Questionpapers
    },
    data: function() {
        return {
          subjects : [],
          value: '',
          allPapers: []
        }
    },

    ready: function(){
      this.fetchSubjectList();
      if (this.$route.name == "search"){
        this.fetchQuestionPapers(this.$route.query.subjectID)
      }
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
      },
      fetchQuestionPapers: function(subjectID) {
        // console.log("infetchPapers")
        this.$http.get("http://testapi.silive.in/api/get_list_?subject_id=" + subjectID).then(response => {
          return response.json()
        }, response => {
          if(response){
            console.log("Error is "+response)
          }
        }).then(json => {
          // this.set(data,questionPapers,json);
          // console.log(json);
          this.allPapers = json;
        });
      }
    }

}

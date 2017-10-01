import * as _ from "underscore";
import Vue from "vue";
import VueResource from "vue-resource";

import Autocomplete from "./Autocomplete.vue";
import Questionpapers from "./Questionpapers.vue";

// using vue-resource with Vue
Vue.use(VueResource);

export default {
  components: {
    Autocomplete,
    Questionpapers
  },
  data: function() {
    return {
      selectionIndex: 0,
      subjects: [],
      allPapers: [],
      examType: -1,
      session: -1,
      paperType: -1,
      semester: -1,
    };
  },

  ready: function() {
    this.fetchSubjectList();
    if (this.$route.name === "search") {
      this.fetchQuestionPapers(Number(this.$route.query.subjectID));
    }
  },

  methods: {
    fetchSubjectList: function() {
      this.$http
        .get("https://testapi.silive.in/api/subject_detail")
        .then(
          (response) => {
            return response.json();
          },
          (error) => {
            if (error)
              console.log(response);
          }
        ).then((json) => {
          this.subjects = _.map(json, function(obj) {
            return {subjectName: obj.SubjectName, id: obj.Id};
          });
        });
    },

    fetchQuestionPapers: function(id) {
      const subjectID = id === 0 ? null : id;

      this.$http
        .get("https://testapi.silive.in/api/get_list_?subject_id=" + subjectID)
        .then(
          (response) => {
            return response.json();
          },
          (error) => {
            if (error) {
              console.log("Error is " + error);
            }
          }
        )
        .then((json) => {
          this.allPapers = json;
        });
    },

    resetAll: function() {
      this.examType = this.session = this.paperType = this.semester = -1;
    },

    searchPapers: function() {
      this.fetchQuestionPapers(this.selectionIndex);
    },

    closeModal: function() {
      this.$els.modalclosebutton.click();
    }
  }
};

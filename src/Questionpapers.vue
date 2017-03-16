<script>
import Vue from 'vue';

const _ = require('underscore');

const VueResource = require('vue-resource');

Vue.use(VueResource);


export default {
  data() {
    return {
      examType: "",
      session: "",
      paperType: "",
      semester: ""
    }
  },

  props: {
    papers: []
  },

  computed: {
    subjectPapers: function() {
      var newPapers = _.map(this.papers, function(val) {
        var temp = {}

        // Exam type for each paper
        switch (val.exam_type_id) {
          case 1:
            temp.examType = "UT"
            break;
          case 2:
            temp.examType = "PUT"
            break;
          case 3:
            temp.examType = "ST1"
            break;
          case 4:
            temp.examType = "ST2"
            break;
        }

        // Session for the papers
        switch (val.session_id) {
          case 1:
            temp.session = "2010-11"
            break;
          case 2:
            temp.session = "2011-12"
            break;
          case 3:
            temp.session = "2012-13"
            break;
          case 4:
            temp.session = "2013-14"
            break;
          case 5:
            temp.session = "2014-15"
            break;
          case 6:
            temp.session = "2015-16"
            break;
        }

        // add question paper or solution type
        temp.paperType = val.paper_type == 1 ? "question paper" : "solution";

        // add semester type even or odd
        temp.semester = val.semester == 1 ? "even" : "odd";

        temp.subjectCodeId = val.subject_code_id

        temp.fileName = val.file_url

        temp.fileUrl = "http://testapi.silive.in/PaperFileUpload/" + encodeURIComponent(val.file_url)

        return temp;
      });

      // Sort all elements based on selection
      var check = {};
      if(this.examType)
        check.examType = this.examType
      if(this.session)
        check.session = this.session
      if(this.paperType)
        check.paperType = this.paperType
      if(this.semester)
        check.semester = this.semester

      newPapers = _.where(newPapers, check);

      return newPapers;
    }
  },

  filters: {
    removeDoc: function(value) {
      return value.substr(0, value.lastIndexOf("."))
    }
  },

  methods: {
    resetAll: function() {
      this.examType = this.session = this.paperType = this.semester = ""
    }
  }
}
</script>

<template>
  <div class="row" style="position:relative">
    <div class="col-md-10">
    <ul class="list-group">
      <li class="list-group-items" v-for="paper in subjectPapers">
        <div class="well">
          <a :href="paper.fileUrl">{{paper.fileName | removeDoc}}</a>
        </div>
      </li>
    </ul>
  </div>
  <div class="col-md-2">
    <div class="form-group">
      <label for="examtype">Exam Type</label>
      <select id="examtype" class="form-control" v-model="examType">
        <option>UT</option>
        <option>PUT</option>
        <option>ST1</option>
        <option>ST2</option>
      </select>
    </div>
    <div class="form-group">
      <label for="session">Session</label>
      <select id="session"class="form-control" v-model="session">
        <option>2015-16</option>
        <option>2014-15</option>
        <option>2013-14</option>
        <option>2012-13</option>
        <option>2011-12</option>
        <option>2010-11</option>
      </select>
    </div>
    <div class="well">
      <div class="radio">
        <label><input type="radio" v-model="semester" value="even">Even</label>
      </div>
      <div class="radio">
        <label><input type="radio" v-model="semester" value="odd">Odd</label>
      </div>
    </div>
    <div class="well">
      <div class="radio">
        <label><input type="radio" v-model="paperType" value="question paper">Question Paper</label>
      </div>
      <div class="radio">
        <label><input type="radio" v-model="paperType" value="solution">Solution</label>
      </div>
    </div>
    <button class="btn btn-primary" type="button" name="button" @click="resetAll">Reset All</button>
  </div>
</div>
</template>

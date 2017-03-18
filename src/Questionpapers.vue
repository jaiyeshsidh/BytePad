<script>
import Vue from 'vue';
import Pagination from './Pagination.vue';

const _ = require('underscore');

const VueResource = require('vue-resource');

Vue.use(VueResource);


export default {
  components : { Pagination },

  data() {
    return {
      examType: 0,
      session: 0,
      paperType: 0,
      semester: 0,
      pageOne: {
                currentPage: 1,
                totalItemsPerPage: 5
              }
    }
  },

  props: {
    papers: []
  },

  computed: {
    totalItems: function() {
      return this.subjectPapers.length;
    },

    papersVisible: function() {
      return this.subjectPapers.slice((this.pageOne.currentPage-1)*this.pageOne.totalItemsPerPage, this.pageOne.currentPage*this.pageOne.totalItemsPerPage);
    },

    subjectPapers: function() {
      var newPapers = _.map(this.papers, function(val) {
        var temp = {}

        temp.examType = val.exam_type_id

        temp.session = val.session_id

        // add question paper or solution type
        temp.paperType = val.paper_type

        // add semester type even or odd
        temp.semester = val.semester

        temp.subjectCodeId = val.subject_code_id

        temp.fileType = val.file_url.substr(val.file_url.lastIndexOf('.')+1, val.file_url.length)

        temp.fileName = val.file_url

        temp.fileUrl = "http://testapi.silive.in/PaperFileUpload/" + encodeURIComponent(val.file_url)

        temp.openUrl = temp.fileType == "doc" ? "http://docs.google.com/viewer?url=" + temp.fileUrl : temp.fileUrl

        return temp;
      });

      // Sort all elements based on selection
      var check = {};
      if(this.examType != 0)
      check.examType = this.examType
      if(this.session != 0)
      check.session = this.session
      if(this.paperType != 0)
      check.paperType = this.paperType
      if(this.semester != 0)
      check.semester = this.semester

      newPapers = _.where(newPapers, check);

      return newPapers;
    }
  },

  filters: {

    removeExt: function(value) {
      return value.substr(0, value.lastIndexOf("."))
    }
  },

  methods: {
    resetAll: function() {
      this.examType = this.session = this.paperType = this.semester = ""
    },

    pdfType: function(type) {
      return type == 'pdf'
    },

    pageOneChanged (pageNum) {
            this.pageOne.currentPage = pageNum
        }
  }
}
</script>

<template>
  <div class="row" style="position:relative">
    <div class="col-md-10">
      <template v-if="totalItems">
        <ul class="list-group">
          <li class="list-group-items" v-for="paper in papersVisible">
            <div class="well row" :class="{'pdftype': pdfType(paper.fileType)}">
              <a class="col-md-8" :href="paper.fileUrl">{{paper.fileName | removeExt}}</a>
              <a :href="paper.openUrl" class="btn btn-info btn-sm col-md-2" target="_blank">
                <span class="glyphicon glyphicon-open-file"></span> Open File
              </a>
              <a :href="paper.fileUrl" class="btn btn-info btn-sm col-md-2" :download="paper.fileUrl">
                <span class="glyphicon glyphicon-download-alt"></span> Download
              </a>
            </div>
          </li>
        </ul>

        <pagination :current-page="pageOne.currentPage"
        :total-items="totalItems"
        :items-per-page="pageOne.totalItemsPerPage"
        @page-changed="pageOneChanged">
      </pagination>
    </template>
    <div class="well" v-else>
      No papers found
    </div>
  </div>
  <div class="col-md-2">
    <div class="form-group">
      <label for="examtype">Exam Type</label>
      <select id="examtype" class="form-control" v-model="examType">
        <option :value="0">All Exams</option>
        <option :value="1">UT</option>
        <option :value="2">PUT</option>
        <option :value="3">ST1</option>
        <option :value="4">ST2</option>
      </select>
    </div>
    <div class="form-group">
      <label for="session">Session</label>
      <select id="session"class="form-control" v-model="session">
        <option :value="0">All Years</option>
        <option :value="6">2015-16</option>
        <option :value="5">2014-15</option>
        <option :value="4">2013-14</option>
        <option :value="3">2012-13</option>
        <option :value="2">2011-12</option>
        <option :value="1">2010-11</option>
      </select>
    </div>
    <div class="well">
      <div class="checkbox">
        <label><input type="checkbox" v-model="paperType" :true-value="1" :false-value="0">Question Paper</label>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" v-model="paperType" :true-value="2" :false-value="0">Solution</label>
      </div>
    </div>
    <div class="well">
      <div class="checkbox">
        <label><input type="checkbox" v-model="semester" :true-value="1" :false-value="0">Even</label>
      </div>
      <div class="checkbox">
        <label><input type="checkbox" v-model="semester" :true-value="2" :false-value="0">Odd</label>
      </div>
    </div>
    <button class="btn btn-primary" type="button" name="button" @click="resetAll">Reset All</button>
  </div>
</div>
</template>

<style media="screen">
.pdftype a {
  color: red
}
</style>

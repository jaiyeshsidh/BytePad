<script>
import * as _ from "underscore";
import Vue from 'vue';
import VueResource from "vue-resource";

import Pagination from './Pagination.vue';

Vue.use(VueResource);

export default {
  components : { Pagination },

  data() {
    return {
      pageOne: {
        currentPage: 1,
        totalItemsPerPage: 5
      }
    }
  },

  props: {
    papers: [],
    examType: {
      type: String|Number,
      required: true
    },
    session: {
      type: String|Number,
      required: true
    },
    paperType: {
      type: String|Number,
      required: true
    },
    semester: {
      type: String|Number,
      required: true
    },
  },

  computed: {
    totalItems: function() {
      return this.subjectPapers.length;
    },

    papersVisible: function() {
      return this.subjectPapers.slice((this.pageOne.currentPage-1)*this.pageOne.totalItemsPerPage, this.pageOne.currentPage*this.pageOne.totalItemsPerPage);
    },

    subjectPapers: function() {
      let newPapers = this.papers.map((val) => {
        let temp = {};

        switch(val.exam_type_id) {
          case 1: temp.examType = "UT";
          break;
          case 2: temp.examType = "PUT";
          break;
          case 3: temp.examType = "ST-1";
          break;
          case 4: temp.examType = "ST-2";
          break;
        }

        temp.session = `${2009 + val.session_id}-${2010 + val.session_id}`;

        // add question paper or solution type
        temp.paperType = val.paper_type === 1 ? "Question Paper" : "Solution";

        // add semester type even or odd
        temp.semester = val.semester === 1 ? "Even" : "Odd";

        temp.subjectCodeId = val.subject_code_id;

        temp.fileType = val.file_url.substr(val.file_url.lastIndexOf('.')+1, val.file_url.length);

        temp.fileName = val.file_url.replace("/", "-");

        temp.fileUrl = "http://testapi.silive.in/PaperFileUpload/" + temp.examType + "/" + encodeURIComponent(val.file_url);

        temp.openUrl = temp.fileType == "doc" ? "http://docs.google.com/viewer?url=" + temp.fileUrl : temp.fileUrl;

        return temp;
      });

      // Sort all elements based on selection
      var check = {};
      if (this.examType !== 0 && this.examType !== -1)
        check.examType = this.examType;
      if (this.session !== 0 && this.session !== -1)
        check.session = this.session;
      if (this.paperType !== -1)
        check.paperType = this.paperType;
      if (this.semester !== -1)
        check.semester = this.semester;

      newPapers = _.where(newPapers, check);
      this.pageOne.currentPage = 1;


      return newPapers;
    }
  },

  filters: {

    removeExt: function(value) {
      return value.substr(0, value.lastIndexOf("."))
    }
  },

  methods: {
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
<div id="content-body" class="container">

      <template v-if="totalItems">

          <ul class="list-group">
            <li class="list-group-items" v-bind:key="paper.fileName" v-for="paper in papersVisible">
            <!-- Single Item -->
                <div class="thumbnail single-list" :class="{'pdftype': pdfType(paper.fileType)}">
                    <div class="div-info">
                        <div class="div-1">

                            <h1><a :href="paper.openUrl" target="_blank" >{{paper.fileName | removeExt}}</a></h1>

                            <p style="margin:0;"> Tags :
                                <span>{{paper.examType}}</span>
                                <span>{{paper.semester}}</span>
                                <span>{{paper.session}}</span>
                                <span>{{paper.paperType}}</span>
                                <span>{{paper.fileType}}</span>
                            </p>
                        </div>
                        <div class="div-2">
                            <div class="text-center" style="padding:6px; margin:0 10px; border-bottom: 2px solid #dedede;">
                                <span class="sub-text">Exam Type :</span>
                                <span class="text-sub">{{paper.examType}}</span>
                            </div>
                            <div class="text-center" style="padding:6px;">
                                <span class="sub-text">Semester :</span>
                                <span class="text-sub">{{paper.semester}}</span>
                            </div>
                        </div>
                        <div class="div-3">
                            <div class="text-center" style="padding:6px; margin:0 10px; border-bottom: 2px solid #dedede;">
                                <span class="sub-text">Session :</span>
                                <span class="text-sub">{{paper.session}}</span>
                            </div>
                            <div class="text-center" style="padding:6px;">
                                <span class="sub-text">Paper Type :</span>
                                <span class="text-sub">{{paper.paperType}}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="div-download">
                        <a :href="paper.fileUrl" :download="paper.fileUrl"><img src="asset/images/download.png" class="center-block"></a>
                        <a :href="paper.openUrl"  target="_blank"><p>View</p></a>
                    </div>
                    <div class="div-2-3-bar">
                        <span>{{paper.examType}}</span>
                        <span>{{paper.semester}}</span>
                        <span>{{paper.session}}</span>
                        <span>{{paper.paperType}}</span>
                        <span>{{paper.fileType}}</span>
                    </div>
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
</template>

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
    <div class="col-md-12">
      <template v-if="totalItems">
        <ul class="list-group">
          <li class="list-group-items" v-bind:key="paper.fileName" v-for="paper in papersVisible">
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

  </div>
</template>



=========================================================================
=========================================================================
=========================================================================
=========================================================================
=========================================================================
=========================================================================

<div class="thumbnail single-list" v-if="totalItems">
            <div class="div-info">
                <div class="div-1">
                    <a :href="paper.openUrl" target="_blank"><h1 v-bind:key="paper.fileName" v-for="paper in papersVisible"></h1></a>
                    <p style="margin:0;"> Tags :
                        <span :class="{'pdftype': pdfType(paper.fileType)}></span>
                        <span>Lorem Ipsum</span>
                        <span>Lorem Ipsum</span>
                        <span>Lorem Ipsum</span>
                    </p>
                </div>
                <div class="div-2">
                    <div class="text-center" style="padding:6px; margin:0 10px; border-bottom: 2px solid #dedede;">
                        <span class="sub-text">Exam Type :</span>
                        <span class="text-sub">PUT</span>
                    </div>
                    <div class="text-center" style="padding:6px;">
                        <span class="sub-text">Semester :</span>
                        <span class="text-sub">Odd Semester</span>
                    </div>
                </div>
                <div class="div-3">
                    <div class="text-center" style="padding:6px; margin:0 10px; border-bottom: 2px solid #dedede;">
                        <span class="sub-text">Session :</span>
                        <span class="text-sub">2011 - 2012</span>
                    </div>
                    <div class="text-center" style="padding:6px;">
                        <span class="sub-text">Paper Type :</span>
                        <span class="text-sub">Answer Sheet</span>
                    </div>
                </div>
            </div>
            <div class="div-download">
                <a :href="paper.fileUrl" :download="paper.fileUrl"><img src="asset/images/download.png" class="center-block"></a>
                <p>125 kb</p>
            </div>
            <div class="div-2-3-bar">
                <span>PUT</span>
                <span>Odd Semester</span>
                <span>2011 - 2012</span>
                <span>Answer Sheet</span>
            </div>
        </div>


=========================================================================
=========================================================================
=========================================================================
=========================================================================
=========================================================================
=========================================================================








<style media="screen">
.pdftype a {
  color: red
}
</style>
<style>
        html,body{
        height: 100%;
        padding: 0;
    }
    .mob-container{
        padding:20px 0; 
        background-color:#242c2d;
    }
    #example{
        margin: 0 0 0 30px !important; 
        width:calc(100% - 300px) !important; 
        border-radius:0px !important;
    }
    .in-mob-search span{
        padding: 20px;
        border-radius:0 0 0 10px;
    }
    @media(max-width:768px){
        #example{
            width: calc(100% - 245px) !important;
        }
    }
    .thumbnail  {
        margin-bottom: 12px;
    }
    .single-list{
        background-color: #efefef;
        padding: 10px 20px;
        /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.26);*/
        border: 0 !important;
    }
    .single-list:hover{
        background-color: #ececec;
    }
    .single-list .div-info{
        display: inline-block;
        width: calc(100% - 124px);
    }
    .single-list .div-download{
        display: inline-block;
        width: 120px;
        vertical-align: sub;
    }
    .div-download img{
        height: 50px;
    }
    .div-download p{
        margin: 0;
        font-size: 12px;
        text-align: center;
    }
    .div-1{
        display: inline-block;
        width: 50%;
        vertical-align: top;
    }
    .div-1 h1{
        font-size: 22px;
        margin-top: 10px;
    }
    .div-1 p{
        font-size: 12px;
        font-weight: bold;
        color:#797979;
    }
    .div-1 span{
        font-size: 10px;
        color: #000;
        background-color: #cecece;
        padding: 3px 12px;
        margin: 1px 3px;
        display: inline-block;
        border-radius: 20px;
    }
    .div-2{
        display: inline-block;
        width: 23.9%;
        /*border-left: 2px solid #dedede;
        border-right: 2px solid #dedede;*/
    }
    .text-sub{
        font-size: 15px;
    }
    .div-3{
        display: inline-block;
        width: 23.9%;
        /*border-right: 2px solid #dedede;*/
    }
    .sub-text{
        font-size: 12px;
        font-weight: bold;
        color: #797979;
    }
    #main-qwerty{
        overflow:auto;
            padding-bottom: 120px;
            padding-top: 180px;
    }
    /*Opera Fix*/
    body:before {
        content:"";
        height:100%;
        float:left;
        width:0;
        margin-top:-32767px;
    }
    @media (min-width: 768px){
        #main-qwerty{
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
    }
    @media(max-width:768px){
        
    }
    .search-pad{
        padding:6px 20px;
    }
    .span-search{
        padding:0 10px
    }
    @media(max-width: 600px){
        .span-search{
            padding: 0;
        }
        .search-pad{
            padding:6px 8px;
        }
    }
    .div-2-3-bar span{
        display: none;
    }
    .container{
        padding-left: 5px;
        padding-right: 5px;
    }
    </style>

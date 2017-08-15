<script>
import Vue from 'vue';
import Main from './main.js';

export default Main
</script>
<script src="./main.js"></script>






<template>
   

    <div style="position:fixed; top:0px; left:0px; width:100%;">
        <div class="mob-container">
            <div class="container">
                <img src="asset/images/bytepad-logo-name.png" style=""/>
                
                <div id="header" class="alt-header" >
                    <div class="header-search-inner" style="display:inline;">
                        <div id="input-holder" style="display:inline;">
                            <div class="search-input" style="display:inline;">
                                <!--input type="text" id="example" name="Search" placeholder="Enter Subject NAME or SUBJECT-CODE"-->
                                <autocomplete :suggestions="subjects" :selection.sync="value" @get-papers="fetchQuestionPapers"></autocomplete>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <div style="background-color:#ffc113;">
            <div id="detail-refine" class="search-pad container container-refine " style=" text-align:right;">
                <span>Refine your Search</span> 
                <span class="fa fa-long-arrow-right span-search"></span>
                <select id="examtype" v-model="examType">
                    <option selected disabled>Exam Type</option>
                    <option :value="0" >All Exams</option>
                    <option :value="1">UT</option>
                    <option :value="2">PUT</option>
                    <option :value="3">ST2</option>
                    <option :value="4">ST1</option>
                </select>
                <!-- Changed Values -->
                <select id="session" v-model="session">
                    <option selected disabled>Session</option>
                    <option :value="0" >All Years</option>
                    <option :value="1">2010-2011</option>
                    <option :value="2">2011-2012</option>
                    <option :value="3">2012-2013</option>
                    <option :value="4">2013-2014</option>
                    <option :value="5">2014-2015</option>
                    <option :value="6">2015-2016</option>
                    <option :value="7">2016-2017</option>
                </select>
                <select id="select-paper" v-model="paperType">
                    <option selected disabled>Paper Type</option>
                    <option :value="0">Question Paper</option>
                    <option :value="1">Answer Paper</option>
                </select>
                <select id="sem" v-model="semester">
                    <option selected disabled>Semester</option>
                    <option :value="0">Even Semester</option>
                    <option :value="1">Odd Semester</option>
                </select>
                <div style="display:inline;">
                    <button type="submit" value="Go">Go</button>
                    <button type="reset" value="Reset" @click="resetAll">Reset</button>
                </div>
                
            </div>
        </div>
    </div>
    <div id="mob-search">
        <div class="in-mob-search">
            <span data-toggle="modal" data-target="#myModal" class="fa fa-search">
            </span>
        </div>
    </div>
    <div class="modal fade" id="myModal" role="dialog" style="display: none;">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>  
    </div>
  </div>
   <questionpapers :papers="allPapers"></questionpapers>

</template>

<style>
        
        .mob-container{
            padding:20px 0; 
            background-color:#242c2d;
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
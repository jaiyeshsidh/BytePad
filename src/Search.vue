<script>
import Main from './main.js';

export default Main
</script>
<script src="./main.js"></script>

<template>
    <div>
        <div style="position:fixed; top:0px; left:0px; width:100%;">
            <div class="mob-container">
                <div class="container">
                    <img src="asset/images/bytepad-logo-name.png" style="" />

                    <div id="header" class="alt-header">
                        <div class="header-search-inner" style="display:inline;">
                            <div id="input-holder" style="display:inline;">
                                <div class="search-input" style="display:inline;">
                                    <autocomplete :suggestions="subjects" :selection.sync="selectionIndex" @search-papers="searchPapers"></autocomplete>
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
                        <option selected disabled :value="-1">Exam Type</option>
                        <option :value="0">All Exams</option>
                        <option value="UT">UT</option>
                        <option value="PUT">PUT</option>
                        <option value="ST-1">ST1</option>
                        <option value="ST-2">ST2</option>
                    </select>
                    <!-- Changed Values -->
                    <select id="session" v-model="session">
                        <option selected disabled :value="-1">Session</option>
                        <option :value="0">All Years</option>
                        <option>2010-2011</option>
                        <option>2011-2012</option>
                        <option>2012-2013</option>
                        <option>2013-2014</option>
                        <option>2014-2015</option>
                        <option>2015-2016</option>
                        <option>2016-2017</option>
                        <option>2017-2018</option>
                    </select>
                    <select id="select-paper" v-model="paperType">
                        <option selected disabled :value="-1">Paper Type</option>
                        <option>Question Paper</option>
                        <option>Solution</option>
                    </select>
                    <select id="sem" v-model="semester">
                        <option selected disabled :value="-1">Semester</option>
                        <option>Even Semester</option>
                        <option>Odd Semester</option>
                    </select>
                    <div style="display:inline;">
                        <!-- <button type="submit" value="Go">Go</button> -->
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
        <div class="modal fade" id="myModal" role="dialog" style="display: none;background-color:#fff;">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content" style="background-color:transparent;">
                    <div class="modal-body" style="padding:0px;">
                        <div id="mob-search-input">
                            <autocomplete :suggestions="subjects" :selection.sync="selectionIndex" @search-papers="searchPapers" @close-modal="closeModal"></autocomplete>
                        </div>
                        <div class="mob-refine">
                            <p style="text-align: center;margin-top: 20px;font-size: 12px;"> Refine Your Search Result more precisely</p>
                            <select id="examtype" v-model="examType">
                                <option selected disabled :value="-1">Exam Type</option>
                                <option :value="0">All Exams</option>
                                <option value="UT">UT</option>
                                <option value="PUT">PUT</option>
                                <option value="ST-1">ST1</option>
                                <option value="ST-2">ST2</option>
                            </select>
                            <!-- Changed Values -->
                            <select id="session" v-model="session">
                                <option selected disabled :value="-1">Session</option>
                                <option :value="0">All Years</option>
                                <option>2010-2011</option>
                                <option>2011-2012</option>
                                <option>2012-2013</option>
                                <option>2013-2014</option>
                                <option>2014-2015</option>
                                <option>2015-2016</option>
                                <option>2016-2017</option>
                            </select>
                            <select id="select-paper" v-model="paperType">
                                <option selected disabled :value="-1">Paper Type</option>
                                <option>Question Paper</option>
                                <option>Solution</option>
                            </select>
                            <select id="sem" v-model="semester">
                                <option selected disabled :value="-1">Semester</option>
                                <option>Even Semester</option>
                                <option>Odd Semester</option>
                            </select>
                            <div style="display:inline;">
                                <button type="button" data-dismiss="modal" class="btn btn-default search-btn" @click="searchPapers">Search</button>
                                <button class="mob-reset-btn" type="reset" value="Reset" @click="resetAll">Reset</button>
                                <button class="mob-reset-btn" data-dismiss="modal" style="display:inline;padding: 20px 25px; position: fixed; top: 0; right: 0; color: #242c2d; margin: 5px; background-color: #ffc113;" v-el:modalclosebutton>X</button>
                            </div>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
        <questionpapers :papers="allPapers" :exam-type="examType" :session="session" :paper-type="paperType" :semester="semester"></questionpapers>
        
    </div>
</template>

<style type="text/css">
.mob-container {
    padding: 20px 0;
    background-color: #242c2d;
}

@media (max-width:768px){
  #search-focus input{
    width: calc(100% - 70px) !important;
    display: inline-block;
    background-image: none !important;
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}

.thumbnail {
    margin-bottom: 12px;
}

.single-list {
    background-color: #efefef;
    padding: 10px 20px;
    /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.26);*/
    border: 0 !important;
}

.single-list:hover {
    background-color: #ececec;
}

.single-list .div-info {
    display: inline-block;
    width: calc(100% - 124px);
}

.single-list .div-download {
    display: inline-block;
    width: 120px;
    vertical-align: -webkit-baseline-middle;
}

.div-download img {
    height: 50px !important;
}

.div-download p {
    margin: 0;
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
}

.div-1 {
    display: inline-block;
    width: 50%;
    vertical-align: -webkit-baseline-middle;
}

.div-1 h1 {
    font-size: 18px;
    margin-top: 4px;
}

.div-1 p {
    font-size: 12px;
    font-weight: bold;
    color: #797979;
}

.div-1 span {
    font-size: 10px;
    color: #000;
    background-color: #cecece;
    padding: 3px 12px;
    margin: 1px 3px;
    display: inline-block;
    border-radius: 20px;
}

.div-2 {
    display: inline-block;
    width: 23.9%;
    vertical-align: -webkit-baseline-middle;
    /*border-left: 2px solid #dedede;
    border-right: 2px solid #dedede;*/
}

.text-sub {
    font-size: 15px;
}

.div-3 {
    display: inline-block;
    width: 23.9%;
    vertical-align: -webkit-baseline-middle;
    /*border-right: 2px solid #dedede;*/
}

.sub-text {
    font-size: 12px;
    font-weight: bold;
    color: #797979;
}

#main-qwerty {
    overflow: auto;
    padding-bottom: 120px;
    padding-top: 180px;
}



/*Opera Fix*/

body:before {
    content: "";
    height: 100%;
    float: left;
    width: 0;
    margin-top: -32767px;
}

@media (min-width: 768px) {
    #main-qwerty {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}

.search-pad {
    padding: 6px 20px;
}

.span-search {
    padding: 0 10px
}

@media(max-width: 600px) {
    .span-search {
        padding: 0;
    }
    .search-pad {
        padding: 6px 8px;
    }
}

.div-2-3-bar span {
    display: none;
}

.container {
    padding-left: 5px;
    padding-right: 5px;
}

header .header-search-inner input+h6 {
    text-align: center;
    opacity: 0.9;
    transition: opacity 1s ease;
}

header .header-search-inner input:focus+h6 {
    opacity: 0;
}

header .header-search-inner:focus {}

header .header-search-inner input {
    width: 100%;
    height: 50px;
    color: #000;
    border-radius: 300px;
    outline: none;
    border: 0px;
    padding-left: 30px;
    padding-right: 60px;
    background-image: url(../images/search-icon.png);
    background-size: 4%;
    background-position: 95%;
    background-repeat: no-repeat;
    margin-top: 48vh;
    -webkit-transition: margin-top 0.7s ease-in-out;
    transition: margin-top 0.7s ease-in-out;
}

header .header-search-inner input:focus {
    outline: none;
    margin-top: 15vh;
}
</style>
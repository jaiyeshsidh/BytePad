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
                            <div id="search-focus" style="display:inline;">
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
                    <option value="select">Select Exam Type</option>
                    <option :value="0">All Exams</option>
                    <option :value="1">UT</option>
                    <option :value="2">PUT</option>
                    <option :value="3">ST2</option>
                    <option :value="4">ST1</option>
                </select>
                <!-- Changed Values -->
                <select id="session" v-model="session">
                    <option>Select Session</option>
                    <option :value="0">All Years</option>
                    <option :value="1">2010-2011</option>
                    <option :value="2">2011-2012</option>
                    <option :value="3">2012-2013</option>
                    <option :value="4">2013-2014</option>
                    <option :value="5">2014-2015</option>
                    <option :value="6">2015-2016</option>
                    <option :value="7">2016-2017</option>
                </select>
                <select id="select-paper" v-model="paperType">
                    <option>Select Paper</option>
                    <option :value="0">Question Paper</option>
                    <option :value="1">Answer Paper</option>
                </select>
                <select id="sem" v-model="semester">
                    <option>Select Semester</option>
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
    <questionpapers :papers="allPapers"></questionpapers>

</template>


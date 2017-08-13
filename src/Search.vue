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
                <select name="Exam Type" >
                    <option value="select">Select Exam Type</option>
                    <option>All Exams</option>
                    <option>UT</option>
                    <option>PUT</option>
                    <option>ST2</option>
                    <option>ST1</option>
                </select>
                <select>
                    <option>Select Session</option>
                    <option>2011-2012</option>
                    <option>2012-2013</option>
                    <option>2013-2014</option>
                    <option>2014-2015</option>
                    <option>2015-2016</option>
                    <option>2016-2017</option>
                </select>
                <select>
                    <option>Select Paper</option>
                    <option>Question Paper</option>
                    <option>Answer Paper</option>
                </select>
                <select>
                    <option>Select Semester</option>
                    <option>Even Semester</option>
                    <option>Odd Semester</option>
                </select>
                <div style="display:inline;">
                    <button type="submit" value="Go">Go</button>
                    <button type="reset" value="Reset">Reset</button>
                </div>
            </div>
        </div>
    </div>
    <questionpapers :papers="allPapers"></questionpapers>


</template>

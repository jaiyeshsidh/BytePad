<script>
import Vue from 'vue';
import Main from './main.js';

export default Main
</script>
<script src="./main.js"></script>
<template>
  <div id="header">
      <div class="header-search-inner" >
          <div id="input-holder">
              <div class="branding"
                   v-link="'/'"
              >
                  <img src="asset/images/bytepad-logo.png" class="img-responsive center-block">
                  <h1>Bytepad<p>Powered by SOFTWARE INCUBATOR</p></h1>
              </div>
              <!--input type="text" name="Search" placeholder="Enter Subject NAME or SUBJECT-CODE"-->
              <autocomplete
              :suggestions="subjects"
              :selection.sync="value"
              @get-papers="fetchQuestionPapers"
              ></autocomplete>

              <h6>Eg. Power Electronics or NAS-201 or Maths III</h6>
          </div>
      </div>
  </div>
  <questionpapers :papers="allPapers"></questionpapers>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var router = new VueRouter();

export default {

    data() {
        return {
            open: false,
            current: 0
        }
    },

    props: {
        suggestions: {
            type: Array,
            required: true
        },

        selection: {
            type: String,
            required: true,
            twoWay: true
        }
    },

    computed: {
        matches() {
            return this.suggestions.filter((str) => {
                return str.toLowerCase().indexOf(this.selection.toLowerCase().replace('-','')) >= 0;
            }).slice(0,7);
        },

        openSuggestion() {
            return this.selection !== "" &&
                   this.matches.length != 0 &&
                   this.open === true;
        }
    },

    methods: {
        enter(e) {
            // console.log(e.target.value);
            if(this.matches.length > 0 && e.target.value) {
                this.selection = this.matches[this.current];
                this.open = false;

            } else {
              var subjectID = this.suggestions.indexOf(this.selection) + 1;
              // console.log(subjectID);
              if(subjectID){
                router.go('/search?subjectID=' + subjectID);
                this.$dispatch('get-papers', subjectID);
              } else {
                router.go('/search?subjectID=' + null);
                this.$dispatch('get-papers', null);
              }
              this.selection = "";
            }
        },

        up() {
            if(this.current > 0)
                this.current--;
        },

        down() {
            if(this.current < this.matches.length)
                this.current++;
        },

        isActive(index) {
            return index === this.current;
        },

        change() {
          if (this.open == false) {
                this.open = true;
                this.current = 0;

            }
        },

        blur() {
          this.open = false;
        },

        focus() {
          this.open = true;
        },

        suggestionClick(index, event) {
            // var self = this;
            this.selection = this.matches[this.current];
            this.open = false;
            var subjectID = this.suggestions.indexOf(this.selection) + 1;
            this.$els.search.focus();
        },



        mouseover(index) {
          this.current = index
        }
    }
}

</script>
<template>
<div style="position:relative" v-bind:class="{'open':openSuggestion}">
    <input type="text" v-model="selection" name="search" placeholder="Enter Subject NAME or SUBJECT-CODE" autocomplete="off"
        @keydown.enter = 'enter'
        @keydown.down = 'down'
        @keydown.up = 'up'
        @input = 'change'
        v-focus
        v-el:search
    />
    <ul class="dropdown-menu col-md-6" style="margin-left: 25%">
        <li class="row" v-for="suggestion in matches"
            v-bind:class="{'active': isActive($index)}"
            @mouseover="mouseover($index)"
        >
            <a href="#" @click.prevent="suggestionClick($index, $event)">{{ suggestion }}</a>
        </li>
    </ul>
</div>
</template>

<style>
header .header-search-inner input + h6{
  text-align: center;
  opacity: 0.9;
  transition: opacity 1s ease;
}

header .header-search-inner input:focus + h6{
  opacity: 0;
}

header .header-search-inner:focus{

}
header .header-search-inner input{
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

header .header-search-inner input:focus{
  outline: none;
  margin-top: 15vh;
}


</style>

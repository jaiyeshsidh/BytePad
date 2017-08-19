<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

var router = new VueRouter();

export default {
    
    data() {
        return {
            open: false,
            current: 0,
            selectionText: "",
        }
    },
    
    props: {
        suggestions: {
            type: Array,
            required: true
        },

        selection: {
            type: Number,
            required: true,
            twoWay: true,
        }
    },

    computed: {
        matches() {
            const termToMatch = new RegExp(this.selectionText.replace("-",""), "i");
            return this.suggestions.filter((obj) => {
                return termToMatch.test(obj.subjectName);
                // return obj.subjectName.toLowerCase().indexOf(this.selectionText.toLowerCase().replace('-','')) >= 0;
            }).slice(0,7);
        },

        openSuggestion() {
            return this.selectionText !== "" &&
                   this.matches.length != 0 &&
                   this.open === true;
        }
    },

    methods: {
        enter() {
            if (this.matches.length > 0 && this.openSuggestion) {
                this.makeSelection();
            } else {
                router.go("/search?subjectID=" + this.selection);
                this.$dispatch("search-papers");
                this.selectionText = "";
                this.selection = 0;
                this.$dispatch("close-modal");
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
            this.makeSelection();
            this.$els.search.focus();
        },

        mouseover(index) {
          this.current = index
        },

        makeSelection() {
            this.selection = this.matches[this.current].id;
            this.selectionText = this.matches[this.current].subjectName;
            this.current = 0;
            this.open = false;
        }
    }
}

</script>
<template>
<div style="position:relative" v-bind:class="{'open':openSuggestion}">
    <input type="text" v-model="selectionText" name="search" placeholder="Enter Subject NAME or SUBJECT-CODE" autocomplete="off" autofocus
        @keydown.enter = 'enter'
        @keydown.down = 'down'
        @keydown.up = 'up'
        @input = 'change'
        v-focus
        v-el:search
    />
    <button type="button" id="mob-home-search"><span class="fa fa-search" style="font-size:18px;"></span></button></a>
    <ul class="dropdown-menu">
        <li class="row" v-bind:key="match" v-for="match in matches"
            v-bind:class="{'active': isActive($index)}"
            @mouseover="mouseover($index)"
        >
            <a href="#" @click.prevent="suggestionClick($index, $event)">{{ match.subjectName }}</a>
        </li>
    </ul>
</div>
</template>


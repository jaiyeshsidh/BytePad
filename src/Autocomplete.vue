<script>
import Vue from 'vue';

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
                var subjectID = this.suggestions.indexOf(this.selection);
                //console.log(a);

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

        suggestionClick(index) {
            // console.log('hey');
            this.selection = this.matches[this.current];
            this.open = false;
            var subjectID = this.suggestions.indexOf(this.selection);
            // console.log(subjectID);
        },



        mouseover(index) {
          this.current = index
        }
    }
}

</script>
<template>
<div style="position:relative" v-bind:class="{'open':openSuggestion}">
    <input type="text" v-model="selection" name="search" placeholder="Enter Subject NAME or SUBJECT-CODE"
        @keydown.enter = 'enter'
        @keydown.down = 'down'
        @keydown.up = 'up'
        @input = 'change'
        v-focus
    />
    <ul class="dropdown-menu" style="">
        <li v-for="suggestion in matches"
            v-bind:class="{'active': isActive($index)}"
            @mouseover="mouseover($index)"
        >
            <a href="#" @click="suggestionClick($index)">{{ suggestion }}</a>
        </li>
    </ul>
</div>
</template>

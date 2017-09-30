<script type="text/javascript">
export default {

  props: {

    // Current Page
    currentPage: {
      type: Number,
      required: true
    },

    // Total number of pages
    totalPages: Number,

    // Items per page
    itemsPerPage: Number,

    // Total items
    totalItems: Number,

    // Visible Pages
    visiblePages: {
      type: Number,
      default: 5,
      coerce: (val) => parseInt(val)
    }

  },

  computed: {
    lastPage () {
      if (this.totalPages) {
        return this.totalPages;
      } else {
        return this.totalItems % this.itemsPerPage === 0
        ? this.totalItems / this.itemsPerPage
        : Math.floor(this.totalItems / this.itemsPerPage) + 1
      }
    },

    paginationRange () {
      /**
      * Code for pagination range here
      */
      // let start =
      // this.currentPage - this.visiblePages / 2 <= 0
      // ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
      // ? Math.ceil(this.lastPage - this.visiblePages + 1)
      // : Math.ceil(this.currentPage - this.visiblePages / 2)
      let start = 1;

      if (this.currentPage > (this.visiblePages) / 2) {
        start = this.currentPage - Math.floor(this.visiblePages / 2);

        if (this.currentPage > (this.lastPage - this.visiblePages / 2)) {
          start = this.lastPage > this.visiblePages
          ? (this.lastPage - this.visiblePages) + 1
          : 1;
        }
      }

      let range = [];

      for (let i = 0; i < this.visiblePages && start + i <= this.lastPage; i++) {
        range.push(start + i);
      }

      return range;
    }
  },

  methods: {
    activePage (pageNum) {
      return this.currentPage === pageNum ? 'active' : ''
    },

    pageChanged (pageNum) {
      this.$dispatch('page-changed', pageNum)
    }
  }

}

</script>

<template>
  <div class="text-center">
    <ul class="pagination">
      <li>
        <a href="#" @click.prevent="pageChanged(1)" aria-label="First Page">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="n in paginationRange" :class="activePage(n)" :key="n">
        <a href="#" @click.prevent="pageChanged(n)">{{ n }}</a>
      </li>
      <li>
        <a href="#" @click.prevent="pageChanged(lastPage)" aria-label="Last Page">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<template>
  <div class="flex w-screen">
    <div class="min-w-64 w-64 max-w-64">
      <NotesMenuSideBar 
      @navigate-page="navigatePage"
      @add-note="addNote" />
    </div>
    <div>
      <NotesHome v-if="page === 'home'" />
      <NotesMyNotes v-if="page === 'notes'" class="mt-10" />
    </div>
  </div>
</template>

<script lang="ts">

export default {

  data() {
    return {
      page:  "home",
    }
  },
  methods: {
    navigatePage(page: string){
      this.page = page
    },
    addNote() {
    }
  }
}
</script>

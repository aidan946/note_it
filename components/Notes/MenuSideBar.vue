<template>
  <div class="h-full divide-y divide-solid">
    <div class="drawer-side">
      <label 
        for="my-drawer-2" 
        class="drawer-overlay"
      >
      </label> 
      <ul class="menu p-4 w-48 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li @click="$emit('addNote')">
          <a>Add Note</a>
        </li>
        <li @click="$emit('navigatePage', 'home')">
          <a>Home</a>
        </li>
        <li @click="$emit('navigatePage', 'notes')">
          <a>My Notes</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  name: "MenuSideBar",
  emits: ['navigatePage', 'addNote'],
  data() {
    return {
      edit:false,
      noteTitle: this.title,
      noteTag: this.tag,
      noteBody: this.body,
    }
  },
  methods: {
    submit() {
      this.$emit('navigatePage')
      this.$emit('addNote')
    }
  }
}
</script>

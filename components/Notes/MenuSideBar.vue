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
        <li>
          <NuxtLink to="/notes/home">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/notes/my-notes">My Notes</NuxtLink>
        </li>
      </ul>
      <div class="divider"></div> 
        <li class="flex">
          <a>My Tags: <button class="btn btn-ghost btn-circle avatar" @click="$emit('addTag')">+</button></a>
        </li>
    </div>
  </div>
</template>

<script lang="ts">
export default{
  name: "MenuSideBar",
  emits: ['addNote','addTag'],
  data() {
    return {
      edit:false,
    }
  },
  methods: {
    submit() {
      this.$emit('addNote')
      this.$emit('addTag')
    }
  }
}
</script>

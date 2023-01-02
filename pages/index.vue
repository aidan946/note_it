<template>
  <div>
    <HeaderBar />
    <NotesBoard v-if="user" />
    <Auth v-else />
  </div>
</template>

<script setup>
  const user = useSupabaseUser()
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  body {
    font-family: 'Noto Sans', sans-serif;
  }
</style>
<template>
  <div class="antialiased m-4 text-slate-500 dark:text-slate-400 bg-slate-900">
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
    background-color: rgb(15 23 42);
  }
  body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
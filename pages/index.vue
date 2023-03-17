<template>
  <div data-theme="night">
    <HeaderBar v-if="user" />
    <div></div>
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
    background-color: rgb(15 23 41);
  }
  body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
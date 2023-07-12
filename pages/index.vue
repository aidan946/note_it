<template>
  <div data-theme="night">
    <Auth />
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const { data: { user } } = await supabase.auth.getUser()

if (user) navigateTo('/notes/home')
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

body {
  font-family: 'Noto Sans', sans-serif;
  background-color: rgb(15 23 41);
}

body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>

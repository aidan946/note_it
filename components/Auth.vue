<template>
  <form
    class="row flex-center flex"
    @submit.prevent="handleLogin"
  >
    <div class="col-6 form-widget">
      <h1 class="header">
        Supabase + Nuxt 3
      </h1>
      <p class="description">
        Sign in via magic link with your email below
      </p>
      <div>
        <input
          v-model="email"
          class="inputField"
          type="email"
          placeholder="Your email"
        />
        <br />
        <input
          v-model="password"
          class="inputField"
          type="password"
          placeholder="Your password"
        />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Login'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup>
  const supabase = useSupabaseClient()

  const loading = ref(false)
  const email = ref('')
  const password = ref('')
  let { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password
})
</script>
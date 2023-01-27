<template>
  <form
    class="row flex-center flex"
    @submit.prevent="handleLogin"
  >
    <div class="col-6 form-widget">
      <h1 class="header">
        Authent
      </h1>
      <div>
        <input
          v-model="email"
          class="input input-bordered w-full max-w-xs"
          type="email"
          placeholder="Your email"
        />
        <br />
        <input
          v-model="password"
          class="input input-bordered w-full max-w-xs"
          type="password"
          placeholder="Your password"
        />
      </div>
      <div class="mt-2">
        <button 
          class="btn btn-primary"
          @click="login()"
        >
          Login
        </button>
        <button 
          class="btn btn-outline btn-primary ml-2"
          @click="signup()"
        >
          Sign Up
        </button>
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
  async function login() {
    console.log("Login")
    let { data, error } = await supabase.auth.signInWithPassword({
      email: '',
      password: ''
    })
  }
  async function signup() {
    console.log("Signup")
    let { data, error } = await supabase.auth.signUp({
      email: '',
      password: ''
    })
  }
</script>
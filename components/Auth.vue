<template>
  <form
    class="row flex-center flex"
    @submit.prevent="handleLogin"
  >
    <div class="col-6 form-widget">
      <h1 class="header">
        Authentication
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
        <span>{{ error }}</span>
      </div>
      <div class="mt-2">
        <button 
          class="btn btn-primary"
          @click="login"
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

<script>
export default {
  data() {
    const loading = ref(false)
    const email = ref('')
    const password = ref('')
    const error = ref('')

    return {
      loading,
      email,
      password,
      error
    }
  }, 
  methods: {
    async login() {
      console.log("Logged")
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })
      if (error) this.error = error
    },
    async  signup() {
      console.log("Signup")
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password
      })
      if (error) this.error = error

    }
  }
}
</script>
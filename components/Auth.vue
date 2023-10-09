<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="flex min-h-screen justify-center items-center ml-auto mr-auto">
      <div class="card bg-neutral shadow-2xl p-24 mr-32">
        <h1 class="font-mono text-8xl">Note-It!</h1>
      </div>
      <div class="flex min-h-screen justify-center items-center ml-auto mr-auto">
        <div class="form-widget card bg-neutral shadow-2xl">
          <div class="card-body">
            <input v-model="email" class="input input-bordered w-full max-w-xs" type="email" placeholder="Your email" />
            <br />
            <input v-model="password" class="input input-bordered w-full max-w-xs" type="password"
              placeholder="Your password" />
            <br />
            <span>{{ error }}</span>

            <div class="card-actions">
              <button class="btn btn-primary" @click="login">
                Login
              </button>
              <button class="btn btn-outline btn-primary ml-2" @click="signup()">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
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
      if (error) {
        console.log('Error message:', error.response.body.error_description)
        this.error = error
      } else {
        navigateTo('/notes/home')
      }

    },
    async signup() {
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

<template>
  <div class="navbar bg-base-100 w-screen">
    <div class="navbar-start">
      <div class="dropdown">
        <label 
          tabindex="0" 
          class="btn btn-ghost btn-circle"
        >
          <span> &lt; </span>
        </label>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost normal-case text-xl">Notes</a>
      <span>|</span>
      <a class="btn btn-ghost normal-case text-xl">Kanban</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
      <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="https://avatars.githubusercontent.com/u/68595713?s=40&v=4" />
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a @click="logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    async  logout() {
      const supabase = useSupabaseClient()
      let { error } = await supabase.auth.signOut()
      if (error) console.log(error) 
    }
  }
}
</script>

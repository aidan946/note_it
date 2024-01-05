<template>
  <HeaderBar />
  <div>
    <form v-if="user" class="form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="user.email" disabled />
      </div>
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" />
      </div>
      <div>
        <label for="website">Website</label>
        <input id="website" v-model="website" type="website" />
      </div>

      <div>
        <input type="submit" class="button primary block" :value="loading ? 'Loading ...' : 'Update'"
          :disabled="loading" />
      </div>

      <div>
        <button class="button block" :disabled="loading" @click="signOut">
          Sign Out
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const client = useSupabaseClient()
const user = useSupabaseUser();

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

async function updateProfile() {
  try {
    if (user.value) {
      loading.value = true
      const updates = {
        id: user.value.id,
        username: username.value,
        website: website.value,
        avatar_url: avatar_path.value,
        updated_at: new Date(),
      }
      let { error } = await client.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) throw error
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

async function signOut() {
  try {
    loading.value = true
    let { error } = await client.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

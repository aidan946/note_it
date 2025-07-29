<template>
  <div>
    <HeaderBar />
    <div class="w-screen mt-2">
      <div class="card w-96 bg-neutral text-neutral-content">
        <div class="card-body items-center text-center">
          <h2 class="card-title">
            Cookies!
          </h2>
          <p>We are using cookies for no reason.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              Accept
            </button>
            <button class="btn btn-ghost">
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

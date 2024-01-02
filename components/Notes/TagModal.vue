<template>
  <div class="card-compact rounded-lg w-96 bg-neutral text-neutral-content">
    <div class="card-body">
      <div class="relative">
        <h1 class="text-2xl">Tags</h1>
        <a class="btn btn-sm btn-circle absolute right-0 top-0" @click="$emit('addTag')">
          ✕
        </a>
      </div>
      <div class="bg-gray-700 rounded p-4">
        <div>
          Add new tag:
          <div class="mt-4 flex justify-center">
            <input type="text" v-model="tagName" placeholder="Type here" class="input w-48 max-w-xs"
              @keyup.enter="createNewTag(this.tagName)" />
            <button class="btn btn-sm btn-success rounded-lg ml-4 mt-2" @click="createNewTag(this.tagName)"> Add </button>
          </div>
        </div>
        <div class="divider"></div>
        <div class="pb-1">
          My Tags:
        </div>
        <ul class="menu menu-sm" v-for="tag in tags" :key="tag.id">
          <li>
            <div class="flex">
              <a>{{ tag.name }}</a>
              <button class="btn btn-sm btn-error rounded-lg mr-0 ml-auto" @click="deleteTag(tag.id)">
                <i class="ri-delete-bin-7-fill"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()

const { data: tags } = await useAsyncData('tags', async () => {
  if (user) {
    const { data } = await client.from('tags').select('id, name').eq('user_id', user.value.id)
    if (data) {
      return data
    }
  }
})

async function createNewTag(name: string) {
  if (user) {
    const { data } = await client
      .from('tags')
      .insert([
        { name: name, user_id: user.value.id },
      ])
      .select('id, name')
    if (data) {
      tags.value.push(data[0])
    }
  }
}

async function deleteTag(id: number) {
  await client
    .from('tags')
    .delete()
    .eq('id', id)
  let newTags = tags.value.filter(i => i.id != id)
  tags.value = newTags
}
</script>


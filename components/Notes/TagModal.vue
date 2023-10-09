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
            <button class="btn-sm btn-success rounded-lg ml-4 mt-2" @click="createNewTag(this.tagName)"> Add </button>
          </div>
        </div>
        <div class="divider"></div>
        <div class="pb-1">
          My Tags:
        </div>
        <ul class="menu menu-sm" v-for="tag in this.tags" :key="tag.id">
          <li>
            <div class="flex">
              <a>{{ tag.name }}</a>
              <button class="btn-sm btn-error rounded-lg mr-0 ml-auto" @click="deleteTag(tag.id)">
                <i class="ri-delete-bin-7-fill"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'remixicon/fonts/remixicon.css'
export default {
  name: "TagModal",
  data() {
    return {
      tagName: null,
      tags: {},
    }
  },
  created() {
    const supabase = useSupabaseClient()
    useAsyncData('tags', async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('tags').select('id, name').eq('user_id', user.id)
        if (data) {
          this.tags = data
        }
      }
    })
  },
  methods: {
    closeModal() {

    },
    async createNewTag(name: string) {
      const supabase = useSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('tags')
          .insert([
            { name: name, user_id: user.id },
          ])
          .select('id, name')
        if (data) {
          this.tags.push(data[0])
          this.tagName = null
        }
      }
    },
    async deleteTag(id: number) {
      const supabase = useSupabaseClient()

      let { data: note_tags, error } = await supabase
        .from('note-tags')
        .select('id')
        .eq('tag_id', id)
      await supabase
        .from('tags')
        .delete()
        .eq('id', note_tags.id)
      console.log(note_tags)
      //let newDatabaseTags = this.tags.filter((i: { id: number }) => i.id != id)
      //this.tags = newDatabaseTags

    },
  }
}
</script>


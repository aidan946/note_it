<template>
  <div style="display: inline;">
    <div>
      <input v-model="form.title" />
      <label>Title</label>
      <input v-model="form.tag" />
      <label>Tag</label>
      <textarea v-model="form.body" />
      <label>Title</label>
      <button @click="addNote">
        Add a note
      </button>
    </div>
    <div v-for="note in databaseNotes">
      <Note
        :id="note.id"
        :title="note.title"
        :tag="note.tag"
        :body="note.body"
        @delete-note="deleteNote"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

let { data: databaseNotes } = await supabase
  .from('notes')
  .select('id, title, tag, body')
</script>

<script lang="ts">

export default {

  data() {
    
    return {
      form : {
      title: '',
      tag: '',
      body: ''
  }
    }
  },
  methods: {
    async addNote() {
      const supabase = useSupabaseClient()  
      const { data } = await supabase
      .from('notes')
      .insert([
        { title: this.form.title, tag: this.form.tag, body: this.form.body },
      ])
    },
    async deleteNote(id) {
      console.log("")
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
    }
  }
}
</script>

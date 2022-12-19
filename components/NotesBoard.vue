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
    <div v-for="note in notes">
      <Note 
        :title="note.title"
        :tag="note.tag"
        :body="note.body"
      />
    </div>
    <div v-for="note in databaseNotes">
      <Note 
        :title="note.title"
        :tag="note.tag"
        :body="note.body"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

let { data: databaseNotes } = await supabase
  .from('notes')
  .select('title, tag, body')
</script>

<script lang="ts">

const notes = [
      {
        title: "Test title",
        tag:"Tag 1",
        body:" Body"
      },
      {
        title:"Test title the Second!",
        tag:"Tag 2",
        body:" Body 2, the superior one..."
      }
    ]
export default {

  data() {
    
    return {
      notes,
      form : {
      title: '',
      tag: '',
      body: ''
  }
    }
  },
  methods: {
    async addNote() {
      console.log(this.form)
      const newNote = {
        title: this.form.title,
        tag: this.form.tag,
        body: this.form.body
      }
      const { data, error } = await supabase
      .from('notes')
      .insert([
        { title: 'test title', body: 'test' },
      ])
    },
    deleteNote(self) {
      this.notes.splice(self)
    }
  }
}
</script>

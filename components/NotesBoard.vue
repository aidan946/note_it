<template>
  <div style="display: inline;">
    <div>
      <input v-model="form.title" />
      <label>Title</label>
      <input v-model="form.tag" />
      <label>Tag</label>
      <textarea v-model="form.body" />
      <label>Title</label>
      <button @click="addNote">Add a note</button>
    </div>
    <div v-for="note in notes">
      <Note 
        :title="note.title"
        :tag="note.tag"
        :body="note.body"
      />
    </div>
  </div>
</template>

<script lang="ts">
const { data } = await useAsyncData(async (nuxtApp) => {
    // fetch and return all "example" records...
    const records = await nuxtApp.$pb.collection('notes').getFullList();

    return structuredClone(records);
  })

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
const note = {
  title: "Test title a 3rd time!",
  tag:"Tag 3, maybe?",
  body:" Body, so big, it's almost like a 3rd one.. ay?"
}
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
    addNote() {
      this.notes.push(this.form)
    },
    deleteNote(self) {
      this.notes.splice(self)
    }
  }
}
</script>
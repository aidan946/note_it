<template>
  <div class="dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
    <div v-if="edit === false">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
        {{ noteTitle }}
      </h1>
      <h3 class="text-slate-900 dark:text-white mt-2 text-base font-medium tracking-tight">
        {{ noteTag }}
      </h3>
      <p class="text-slate-500 dark:text-slate-400 mt-3 text-sm">
        {{ noteBody }}
      </p>
      <div class="centre-buttons">
        <button 
          class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none " 
          @click="edit = true"
        >
          Edit
        </button>
        <button 
          class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
          @click="$emit('deleteNote', id)"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-if="edit === true">
      <input 
        v-model="noteTitle" 
        class="mt-2 px-2 py-1 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <input 
        v-model="noteTag" 
        class="mt-2 px-2 py-1 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <textarea 
        v-model="noteBody" 
        class="mt-3 px-2 py-1 bg-slate-800 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
      />
      <div class="centre-buttons">
        <button 
          class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
          @click="edit = false"
        >
          Cancel
        </button>
        <button 
          class="py-2 px-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none"
          @click="submitEdit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: "Note",
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    }, 
    tag: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  },
  emits: ['deleteNote'],
  data() {
    return {
      edit:false,
      noteTitle: this.title,
      noteTag: this.tag,
      noteBody: this.body,
    }
  },
  methods: {
    submit() {
      this.$emit('deleteNote') 
    },
    async submitEdit() {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .update({ title: this.noteTitle, tag: this.noteTag, body: this.noteBody })
        .eq('id', this.id)
      this.edit = false
    }
  }
}
</script>

<style>
  body{
    max-width: 30rem;
  }
  .centre-buttons{
    text-align: center;
  }
  .centre-buttons button{
  margin: 1rem;
  }

  .note{
    padding: 0.5rem;
    border: 1px solid black;
    border-radius: 10px;
  }
  
</style>

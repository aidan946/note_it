<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div>
    <div v-if="loadModal" class="
        absolute
        inset-0
        flex
        items-center
        justify-center
        bg-gray-700 bg-opacity-50
        z-10
      ">
      <div class="card-compact rounded-lg w-fit bg-neutral text-neutral-content">
        <div class="card-body">
          <div class="relative">
            <p>{{ noteTitle }}</p>
            <a class="btn btn-sm btn-circle absolute right-0 top-0" @click="toggleModal">
              ✕
            </a>
          </div>
          <div class="bg-gray-700 rounded p-4">
            <div class="divider" />
            <p>{{ noteBody }}</p>
          </div>
          <div class="card-actions justify-end mr-0">
            <button class="btn-sm btn-primary rounded-lg" @click="submitEdit">
              <i class="ri-save-fill"></i>
            </button>
            <button class="btn-sm btn-error rounded-lg" @click="$emit('deleteNote', id)">
              <i class="ri-delete-bin-7-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-compact rounded-lg w-96 bg-neutral text-neutral-content v-0">
      <div class="card-body">
        <div class="flex">
          <p>{{ noteTitle }}</p>
        </div>
        <p>{{ noteBody }}</p>
        <div class="card-actions justify-end mr-0">
          <button class="btn-sm btn-success rounded-lg" @click="toggleModal">
            <i class="ri-edit-box-fill"></i>
          </button>
          <button class="btn-sm btn-primary rounded-lg" @click="submitEdit">
            <i class="ri-save-fill"></i>
          </button>
          <button class="btn-sm btn-error rounded-lg" @click="$emit('deleteNote', id)">
            <i class="ri-delete-bin-7-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
export default {
  name: "Note",
  components: {
    EditorContent,
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
  },
  emits: ['deleteNote'],
  data(props) {
    const loadModal = false
    return {
      selectedValue: '',
      loadModal,
      noteID: props.id,
      noteTitle: props.title,
      noteBody: props.body,
    }
  },
  created() {
    const supabase = useSupabaseClient()
    useAsyncData('tags', async () => {
      const { data: { user } } = await supabase.auth.getUser()
      this.noteTags = []
      this.selectTags = []
      if (user) {
        const { data } = await supabase.from('note-tags').select('tag_id').eq('note_id', this.noteID)
        if (data) {
          for (const i of data) {
            let { data: databaseTags } = await supabase.from('tags').select('id, name, color').eq('id', i.tag_id)
            if (databaseTags) {
              this.noteTags.push(databaseTags[0])
            }
          }
        }
        const { data: userTags } = await supabase.from('tags').select('id, name')
      }
    })
  },
  methods: {
    toggleModal() {
      if (this.loadModal == true) {
        this.loadModal = false
      } else {
        this.loadModal = true
      }
    },
    submit() {
      this.$emit('deleteNote')
    },
    async submitEdit() {
      const supabase = useSupabaseClient()
      await supabase
        .from('notes')
        .update({ title: this.titleEditor.getHTML(), body: this.editor.getHTML() })
        .eq('id', this.id)
      // Flash success here
    },
    async addNoteTag(value) {
      console.log(this.selectedValue)
    }
  }
}
</script>

<style lang="scss">
body {
  max-width: 30rem;
}

.centre-buttons {
  text-align: center;
}

.centre-buttons button {
  margin: 1rem;
}

ul[data-type="taskList"] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    >label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    >div {
      flex: 1 1 auto;
    }
  }
}

.menu-item {
  border-radius: 0.4rem;

  &.is-active,
  &:hover {
    color: #0D0D0D;
    background-color: #FFF;
  }
}
</style>

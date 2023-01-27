<template>
  <div class="card-compact rounded-lg w-96 bg-neutral text-neutral-content">
    <div class="card-body">
      <div class="flex">
        <editor-content :editor="titleEditor" />
      </div>
      <editor-content :editor="bodyEditor" />
      <div class="flex space-x-2">
        <div v-for="tag in tags">
          <div class="badge badge-primary">{{ tag.name }}</div>
        </div>
      </div>
      <div class="card-actions justify-end mr-0">
        <button 
          class="btn-sm btn-primary rounded-lg" 
          @click=""
        >
          <i class="ri-edit-box-fill"></i>
        </button>
        <button 
          class="btn-sm btn-primary rounded-lg" 
          @click="submitEdit"
        >
          <i class="ri-save-fill"></i>
        </button>
        <button 
          class="btn-sm btn-primary rounded-lg"
          @click="$emit('deleteNote', id)"
        >
          <i class="ri-delete-bin-7-fill"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import 'remixicon/fonts/remixicon.css'
export default{
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
    }
  },
  emits: ['deleteNote'],
  setup(props) {

    const noteID = props.id;
    const noteTitle = props.title;
    const noteBody = props.body;

    const tags = ref([])
    const modal = false

    const titleEditor = useEditor({
      content: noteTitle,
      extensions: [
        Document,
        Heading.configure({
          HTMLAttributes: {
            class: 'card-title text-3xl bold mb-3'
          },
        }),
        Text,
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  focus:outline-none',
        },
      },
    })

    const bodyEditor = useEditor({
      content: noteBody,
      extensions: [
        Document,
        Paragraph.configure({
          HTMLAttributes: {
          },
        }),
        Text,
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  focus:outline-none pb-2',
        },
      },
    })

    onMounted(async () => {
      const supabase = useSupabaseClient()
      const { data } = await supabase.from('tags').select('name').eq('note_id', noteID)
      if (data) {
        tags.value = data  
      }
    });

    return {
      noteTitle,
      noteBody,
      titleEditor,
      bodyEditor,
      tags
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
        .update({ title: this.titleEditor.getHTML(), body: this.bodyEditor.getHTML() })
        .eq('id', this.id)
        // Flash success here
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
</style>

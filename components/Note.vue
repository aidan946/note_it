<template>
  <div class="card w-96 bg-neutral text-neutral-content">
    <div class="card-body">
      <div class="flex">
        <editor-content class="" :editor="titleEditor" />
      </div>
      <editor-content class="" :editor="bodyEditor" />
      <div class="card-actions justify-end">
        <button 
          class="btn btn-primary " 
          @click="submitEdit"
        >
          Save
        </button>
        <button 
          class="btn btn-primary"
          @click="$emit('deleteNote', id)"
        >
          Delete
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
    
    const noteId = props.id;
    const noteTitle = props.title;
    const noteBody = props.body;

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
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl  focus:outline-none p-3',
        },
      },
    })

    return {
      noteTitle,
      noteBody,
      titleEditor,
      bodyEditor
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

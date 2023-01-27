<template>
  <div 
    v-if="editor"
    class="editor border rounded p-2"
  >
    <NotesEditorMenuBar :editor="editor" />
    <editor-content 
      class="editor__content text-white"
      :editor="editor" 
    />
  </div>
</template>

<script>

import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'


export default {
  components: {
    EditorContent,
  },

  setup() {
    const editor = useEditor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit, TaskItem, TaskList
      ],
    })

    return { editor }
  },
}
</script>

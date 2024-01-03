<template>
  <div class="editor border rounded-lg">
    <div class="card-compact rounded-lg bg-neutral text-neutral-content">
      <div class="card-body">
        <div class="flex mt-3">
          <editor-content :editor="titleEditor" />
        </div>
        <editor-content :editor="editor" />
        <div class="flex space-x-2">
        </div>
        <div class="card-actions justify-end mr-0">
          <button class="btn btn-sm btn-primary rounded-lg" @click="saveNote">
            <i class="ri-save-fill"></i>
          </button>
          <button class="btn btn-sm btn-error rounded-lg" @click="resetNote">
            <i class="ri-delete-bin-7-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Heading from '@tiptap/extension-heading'
import Text from '@tiptap/extension-text'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { useEditor, EditorContent } from '@tiptap/vue-3'

const client = useSupabaseClient()
const user = useSupabaseUser()

const titleEditor = ref(useEditor({
  content: "Title",
  extensions: [
    Document,
    Heading.configure({
      HTMLAttributes: {
        class: 'card-title text-2xl bold mb-3'
      },
    }),
    Text,
  ],
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none',
    },
  },
}))
const editor = ref(useEditor({
  content: "Body",
  extensions: [
    Document,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    Paragraph.configure({
      HTMLAttributes: {
      },
    }),
    Text,
  ],
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none pb-2',
    },
  },
}))

async function saveNote() {
  const { data } = await client
    .from('notes')
    .insert([
      { title: titleEditor.value.getHTML(), body: editor.value.getHTML(), user_id: user.value.id },
    ])
    .select('id, title, body')
  titleEditor.value.chain().focus().setContent("Title").run()
  editor.value.chain().focus().setContent("Body").run()
}

async function resetNote() {
  titleEditor.value.chain().focus().setContent("Title").run()
  editor.value.chain().focus().setContent("Body").run()
}
</script>

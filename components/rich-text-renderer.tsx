"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

interface RichTextRendererProps {
  content: string
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
    ],
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert",
      },
    },
  })

  if (!editor) {
    return null
  }

  return <EditorContent editor={editor} />
}


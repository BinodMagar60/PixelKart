// Tiptap.jsx
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'

import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, List, UnderlineIcon } from 'lucide-react'


interface TiptapTypes {
    descriptionValue: string,
    setDescriptionValue: React.Dispatch<React.SetStateAction<string>>
}

const Tiptap = ({descriptionValue, setDescriptionValue}: TiptapTypes) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
      }),
      Underline,
      BulletList,
      ListItem,
    ],
    content: `<p>${descriptionValue}</p>`,
    onUpdate: ({ editor }) => {
    const html = editor.getHTML()
    setDescriptionValue(html)
  },
  })

  if (!editor) return null

  return (
    <div className="border rounded space-y-2 border-gray-300">
      <div className="flex gap-2 px-4 py-2 bg-gray-50 border-b border-gray-300">
      <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`cursor-pointer p-1 rounded-md hover:bg-gray-200 ${editor.isActive('bold') ? 'font-bold text-blue-500' : ''}`}
        >
          <Bold size={18}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`cursor-pointer p-1 rounded-md hover:bg-gray-200 ${editor.isActive('italic') ? 'italic text-blue-500' : ''}`}
        >
          <Italic size={18}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`cursor-pointer p-1 rounded-md hover:bg-gray-200 ${editor.isActive('underline') ? 'underline text-blue-500' : ''}`}
        >
          <UnderlineIcon size={18}/>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`cursor-pointer p-1 rounded-md hover:bg-gray-200 ${editor.isActive('bulletList') ? 'text-blue-500' : ''}`}
        >
          <List size={18}/>
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[200px] p-4 focus:outline-none" />
    </div>
  )
}

export default Tiptap

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon,
  List, 
  ListOrdered, 
  Highlighter,
  Undo,
  Redo,
  Type,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  Quote
} from 'lucide-react';
import { useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const COLORS = [
  { name: 'Noir', value: '#000000' },
  { name: 'Rouge DSFR', value: '#CE0500' },
  { name: 'Bleu DSFR', value: '#000091' },
  { name: 'Vert DSFR', value: '#18753C' },
  { name: 'Orange', value: '#B34000' },
  { name: 'Violet', value: '#6B21A8' },
  { name: 'Gris', value: '#666666' },
];

const HIGHLIGHT_COLORS = [
  { name: 'Jaune', value: '#FFEB3B' },
  { name: 'Vert clair', value: '#C8E6C9' },
  { name: 'Bleu clair', value: '#BBDEFB' },
  { name: 'Rose', value: '#F8BBD9' },
  { name: 'Orange clair', value: '#FFE0B2' },
];

export function RichTextEditor({ label, value, onChange, placeholder, rows = 4 }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-5 space-y-1',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-5 space-y-1',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-4 border-[#000091] pl-4 italic text-gray-600 my-2',
          },
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Highlight.configure({ 
        multicolor: true,
        HTMLAttributes: {
          class: 'px-1 rounded',
        },
      }),
      TextStyle,
      Color,
      Underline,
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none px-4 py-3',
        style: `min-height: ${rows * 32}px`,
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  const ToolbarButton = useCallback(({ 
    onClick, 
    isActive, 
    disabled,
    title, 
    children,
    activeClass = 'bg-[#000091] text-white'
  }: { 
    onClick: () => void; 
    isActive?: boolean;
    disabled?: boolean;
    title: string; 
    children: React.ReactNode;
    activeClass?: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded transition-colors
        ${isActive 
          ? activeClass 
          : disabled
            ? 'text-gray-300 cursor-not-allowed'
            : 'hover:bg-gray-200 text-gray-700'
        }
      `}
      title={title}
    >
      {children}
    </button>
  ), []);

  if (!editor) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
        <div className="border-2 border-[#000091] rounded-lg p-4 bg-gray-50 animate-pulse h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm focus-within:border-[#000091] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 bg-gray-50 border-b border-gray-200">
          {/* Titres */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Titre 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Titre 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Titre 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph') && !editor.isActive('heading')}
            title="Paragraphe"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Formatage texte */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Gras (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Italique (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Souligné (Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Listes */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Liste à puces"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            title="Liste numérotée"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Citation"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Surlignage avec menu */}
          <div className="relative group">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFEB3B' }).run()}
              isActive={editor.isActive('highlight')}
              activeClass="bg-yellow-300 text-gray-800"
              title="Surligner"
            >
              <Highlighter className="w-4 h-4" />
            </ToolbarButton>
            
            {/* Dropdown couleurs surlignage */}
            <div className="absolute top-full left-0 mt-1 hidden group-hover:flex bg-white border-2 border-[#000091] rounded-lg shadow-lg p-2 gap-1 z-10">
              {HIGHLIGHT_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => editor.chain().focus().toggleHighlight({ color: color.value }).run()}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
              <button
                type="button"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform bg-white text-xs font-bold text-red-500"
                title="Supprimer surlignage"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Couleurs de texte */}
          <div className="flex items-center gap-1">
            <Type className="w-4 h-4 text-gray-500" />
            {COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => editor.chain().focus().setColor(color.value).run()}
                className={`w-5 h-5 rounded border-2 hover:scale-110 transition-transform ${
                  editor.isActive('textStyle', { color: color.value }) ? 'border-[#000091] ring-2 ring-blue-300' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetColor().run()}
              className="w-5 h-5 rounded border-2 border-gray-300 hover:scale-110 transition-transform bg-white text-[8px] font-bold text-gray-500"
              title="Couleur par défaut"
            >
              A
            </button>
          </div>

          <div className="flex-1" />

          {/* Undo/Redo */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Annuler (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rétablir (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <div className="bg-white relative">
          <EditorContent 
            editor={editor} 
            className={`
              [&_.ProseMirror]:outline-none 
              [&_.ProseMirror_p]:my-1 
              [&_.ProseMirror_h1]:text-2xl
              [&_.ProseMirror_h1]:font-bold
              [&_.ProseMirror_h1]:text-[#000091]
              [&_.ProseMirror_h1]:my-3
              [&_.ProseMirror_h2]:text-xl
              [&_.ProseMirror_h2]:font-bold
              [&_.ProseMirror_h2]:text-gray-800
              [&_.ProseMirror_h2]:my-2
              [&_.ProseMirror_h3]:text-lg
              [&_.ProseMirror_h3]:font-semibold
              [&_.ProseMirror_h3]:text-gray-700
              [&_.ProseMirror_h3]:my-2
              [&_.ProseMirror_ul]:list-disc 
              [&_.ProseMirror_ul]:pl-5 
              [&_.ProseMirror_ul]:my-2
              [&_.ProseMirror_ol]:list-decimal 
              [&_.ProseMirror_ol]:pl-5
              [&_.ProseMirror_ol]:my-2
              [&_.ProseMirror_li]:my-1
              [&_.ProseMirror_blockquote]:border-l-4
              [&_.ProseMirror_blockquote]:border-[#000091]
              [&_.ProseMirror_blockquote]:pl-4
              [&_.ProseMirror_blockquote]:italic
              [&_.ProseMirror_blockquote]:text-gray-600
              [&_.ProseMirror_blockquote]:my-2
              [&_.ProseMirror_mark]:px-1
              [&_.ProseMirror_mark]:rounded
            `}
          />
          
          {/* Placeholder */}
          {editor.isEmpty && placeholder && (
            <div className="absolute top-3 left-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import * as React from 'react'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2,
  Undo,
  Redo
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({ content, onChange, placeholder = 'Start typing...' }: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [history, setHistory] = React.useState<string[]>([content])
  const [historyIndex, setHistoryIndex] = React.useState(0)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    saveToHistory()
  }

  const saveToHistory = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      if (newContent !== history[historyIndex]) {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(newContent)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      }
    }
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex]
        onChange(history[newIndex])
      }
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex]
        onChange(history[newIndex])
      }
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleBlur = () => {
    saveToHistory()
  }

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content
    }
  }, [content])

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('formatBlock', 'h1')}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('formatBlock', 'h2')}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('insertUnorderedList')}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => execCommand('insertOrderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleUndo}
          disabled={historyIndex <= 0}
        >
          <Undo className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleRedo}
          disabled={historyIndex >= history.length - 1}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className={cn(
          "p-4 min-h-[400px] focus:outline-none prose max-w-none",
          "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4",
          "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3",
          "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2",
          "[&_p]:mb-3",
          "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-3",
          "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-3",
          "[&_li]:mb-1"
        )}
        onInput={handleInput}
        onBlur={handleBlur}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  )
}

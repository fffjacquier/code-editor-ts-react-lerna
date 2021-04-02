import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'
import codeShift from 'jscodeshift'
import Highlighter from 'monaco-jsx-highlighter'

import './code-editor.css'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

    // to highlight jsx in the editor
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    )
    // avoid the errors on each key typed in the editor
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    )
  }

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue()

    // format that value with prettier
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '') // remove prettier last line added

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted)
  }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: 'on',
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="dark"
        language="javascript"
        height="100%"
      />
    </div>
  )
}

export default CodeEditor

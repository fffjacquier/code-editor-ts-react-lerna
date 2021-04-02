import React, { useEffect, useRef } from 'react'
import './preview.css'

interface PreviewProps {
  code: string
  err: string
}

const html = `
  <html>
    <head>
      <style>html { background-color: white; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>

        const handleError = (err) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color:red;"><h4>Runtime error</h4>' + err +  '</div>'
          // throw err;
          console.error(err)
        };

        window.addEventListener('error', (event) => {
          // prevent uncaught error message
          event.preventDefault();
          handleError(event.error)
        })

        window.addEventListener('message', (event) => {
          try {
            eval(event.data)
          } catch (err) {
            handleError(err)
          }
        }, false);

      </script>
    </body>
  </html>
`

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<any>()

  useEffect(() => {
    // reset iframe content
    iframeRef.current.srcdoc = html
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  err && console.log(err)

  return (
    <div className="preview-wrapper">
      <iframe ref={iframeRef} title="preview" sandbox="allow-scripts" srcDoc={html} />
      {err && <div className="preview-error">{err}</div>}
    </div>
  )
}

export default Preview

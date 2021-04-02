import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'

import './resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth * 0.8)

  useEffect(() => {
    let timer: any
    const listener = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)
        if (window.innerWidth * 0.8 < width) {
          setWidth(window.innerWidth * 0.8)
        }
      }, 100)
    }
    window.addEventListener('resize', listener)

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      window.removeEventListener('resize', listener)
    }
  }, [width])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.8, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
    }
  } else {
    resizableProps = {
      minConstraints: [Infinity, 40],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable

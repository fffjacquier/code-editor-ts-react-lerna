import { useSelector } from './useSelector'

export const useCumulativeCode = (cellId: string) => {
  return useSelector((state) => {
    const { data, order } = state?.cells
    const orderedCells = order.map((id: string) => data[id])

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root')

        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            // assume it's JSX
            _ReactDOM.render(value, root)
          } else {
            root.innerHTML = JSON.stringify(value)
          }
        } else {
          root.innerHTML = value
        }
      };
    `
    const showFuncNoop = 'var show = () => {}'

    const cumulativeCodeArr = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCodeArr.push(c.id === cellId ? showFunc : showFuncNoop)
        cumulativeCodeArr.push(c.content)
      }
      if (c.id === cellId) {
        break
      }
    }

    return cumulativeCodeArr
  }).join('\n')
}

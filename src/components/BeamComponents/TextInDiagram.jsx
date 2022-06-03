import React from 'react'

const TextInDiagram = ({X0, Y0, fontSize, xText, yText, text}) => (
<text
fontSize={fontSize}
x={X0 + xText}
y={Y0 + yText}>
  {text}
  </text>
)
export default TextInDiagram;
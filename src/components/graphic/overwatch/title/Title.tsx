import React from 'react'
import titlePlate from './TitlePlate.png'

const titleBox = {
  position: 'absolute',
  top: '-20px',
  left: '50%',
  marginLeft: '-141px', // Width of the image divided by 2
} as React.CSSProperties

const tileText = {
  listStyle: 'none',
  position: 'relative',
  top: '28px',
  textAlign: 'center',
} as React.CSSProperties

export default function Caster({ title }: { title: string }) {
  return (
    <div style={titleBox}>
      <div style={tileText}>{title}</div>
      <img src={titlePlate} alt='Title' />
    </div>
  )
}

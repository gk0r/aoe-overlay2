import React from 'react'
import casterPlate from './CasterPlate.png'

const casterBox = {
  position: 'absolute',
  bottom: '1rem',
} as React.CSSProperties

const casterNames = {
  listStyle: 'none',
  position: 'relative',
  top: '95px',
  left: '110px',
} as React.CSSProperties

export default function Caster(props: CasterArray) {
  // Do not render the box if there are no caster names
  if (props.casters[0] === '' && props.casters[1] === '') return <></>

  const casterList = props.casters.map((caster, index) => (
    <div style={{ padding: '0.3rem' }} key={index}>
      {caster}
    </div>
  ))

  return (
    <div style={casterBox}>
      <div style={casterNames}>{casterList}</div>

      <img src={casterPlate} alt='Casters' />
    </div>
  )
}

interface CasterArray {
  casters: string[]
}

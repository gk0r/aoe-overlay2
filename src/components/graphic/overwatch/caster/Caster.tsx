import React from 'react'
import casterPlate from './CasterPlate.png'

const casterBox = {
  position: 'absolute',
  bottom: '0px',
  left: '50%',
  marginLeft: '-242px', // Width of the image divided by 2
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
    <li style={{ padding: '0.3rem' }} key={index}>
      {caster}
    </li>
  ))

  return (
    <div style={casterBox}>
      <ul style={casterNames}>{casterList}</ul>
      <img src={casterPlate} alt='Casters' />
    </div>
  )
}

interface CasterArray {
  casters: string[]
}

import React from 'react'
import sponsorPlate from './MyRepublicWhite.png'

const sponsorBox = {
  position: 'absolute',
  bottom: '10px',
  right: '10%',
} as React.CSSProperties

export default function Sponsor() {
  return (
    <div style={sponsorBox}>
      <img src={sponsorPlate} alt='Sponsor' width='200px' />
    </div>
  )
}

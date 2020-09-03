import React from 'react'
import sponsorPlate from './SponsorPlate.png'

const sponsorBox = {
  position: 'absolute',
  bottom: '0px',
  right: '0%',
} as React.CSSProperties

export default function Sponsor() {
  return (
    <div style={sponsorBox}>
      <img src={sponsorPlate} alt='Sponsor' />
    </div>
  )
}

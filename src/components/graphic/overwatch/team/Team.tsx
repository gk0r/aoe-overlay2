import React from 'react'
import AttackingTeaamPlate from './TopLeftPlateBlank.png'
import DefendingTeamPlate from './TopRightPlateBlank.png'
import AttackLogo from './AttackLogo.png'
import DefenseLogo from './DefenseLogo.png'

const top = '15px'
const position = 'absolute'
const logoW = 35,
  logoH = 35,
  fontFamily = 'FuturaPTHeavyOblique, Arial, sans-serif',
  roleLogoTop = '12px',
  defLogoOffset = '670px',
  attLogoOffset = '665px'

const attackingTeamBox = {
  position,
  fontFamily,
  top: '10px',
  left: '0%',
} as React.CSSProperties

const attackingTeamName = {
  position,
  top,
  left: '90px',
} as React.CSSProperties

const attackingTeamScore = {
  position,
  top,
  left: '600px',
} as React.CSSProperties

const defendingTeamBox = {
  position,
  fontFamily,
  top: '10px',
  right: '0%',
} as React.CSSProperties

const defendingTeamName = {
  position,
  top,
  textAlign: 'right',
  right: '90px',
} as React.CSSProperties

const defendingTeamScore = {
  position,
  top,
  right: '600px',
} as React.CSSProperties

export default function Team(props: Teams) {
  console.log(props)
  return (
    <>
      <div style={attackingTeamBox}>
        <img src={AttackingTeaamPlate} alt='Attacking Team' />
        <img
          style={{ position, top: '5px', left: '25px' }}
          src={props.attackingTeam.logo.url}
          alt='Attacking Team Logo'
          width={logoW}
          height={logoH}
        />
        <RoleLogo team={props.attackingTeam} status={'ATTACK'} />
        <div style={attackingTeamName}>{props.attackingTeam.name}</div>
        <div style={attackingTeamScore}>{props.attackingTeam.score}</div>
      </div>
      <div style={defendingTeamBox}>
        <img src={DefendingTeamPlate} alt='Defending Team' />
        <img
          style={{ position, top: '5px', right: '25px' }}
          src={props.defendingTeam.logo.url}
          alt='Defending Team Logo'
          width={logoW}
          height={logoH}
        />
        <RoleLogo team={props.defendingTeam} status={'DEFEND'} />
        <div style={defendingTeamName}>{props.defendingTeam.name}</div>
        <div style={defendingTeamScore}>{props.defendingTeam.score}</div>
      </div>
    </>
  )
}

function RoleLogo({ team, status }: { team: any; status: any }) {
  console.log(JSON.stringify(team))
  if (status === 'ATTACK' && team.role === 'ATTACK') {
    return (
      <img
        style={{ position, top: roleLogoTop, left: attLogoOffset }}
        src={AttackLogo}
        alt='Attacking Team Role'
      />
    )
  } else if (status === 'ATTACK' && team.role === 'DEFEND') {
    return (
      <img
        style={{ position, top: roleLogoTop, left: defLogoOffset }}
        src={DefenseLogo}
        alt='Defending Team Role'
      />
    )
  } else if (status === 'DEFEND' && team.role === 'ATTACK') {
    return (
      <img
        style={{ position, top: roleLogoTop, right: attLogoOffset }}
        src={AttackLogo}
        alt='Defending Team Role'
      />
    )
  } else if (status === 'DEFEND' && team.role === 'DEFEND') {
    return (
      <img
        style={{ position, top: roleLogoTop, right: defLogoOffset }}
        src={DefenseLogo}
        alt='Defending Team Role'
      />
    )
  } else {
    return <></>
  }
}

interface Teams {
  attackingTeam: {
    logo: {
      name: string
      url: string
    }
    name: string
    score: number
    role: string
  }
  defendingTeam: {
    logo: {
      name: string
      url: string
    }
    name: string
    score: number
    role: string
  }
}

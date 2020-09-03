import React from 'react'
import AttackingTeaamPlate from './L_TeamPlateScore.png'
import DefendingTeamPlate from './R_TeamPlateScore.png'

const top = '15px'
const position = 'absolute'

const attackingTeamBox = {
  position,
  top,
  left: '0%',
} as React.CSSProperties

const attackingTeamName = {
  position,
  top,
  textAlign: 'right',
  right: '80px',
} as React.CSSProperties

const attackingTeamScore = {
  position,
  top,
  left: '355px',
  color: 'white',
} as React.CSSProperties

const defendingTeamBox = {
  position,
  top,
  right: '0%',
} as React.CSSProperties

const defendingTeamName = {
  position,
  top,
  left: '80px',
} as React.CSSProperties

const defendingTeamScore = {
  position,
  top,
  right: '355px',
  color: 'white',
} as React.CSSProperties

export default function Team(props: Teams) {
  console.log(props)
  return (
    <>
      <div style={attackingTeamBox}>
        <img src={AttackingTeaamPlate} alt='Attacking Team' />
        <div style={attackingTeamName}>
          {props.attackingTeam.name.toUpperCase()}
        </div>
        <div style={attackingTeamScore}>{props.attackingTeam.score}</div>
      </div>
      <div style={defendingTeamBox}>
        <img src={DefendingTeamPlate} alt='Defending Team' />
        <div style={defendingTeamName}>
          {props.defendingTeam.name.toUpperCase()}
        </div>
        <div style={defendingTeamScore}>{props.defendingTeam.score}</div>
      </div>
    </>
  )
}

interface Teams {
  attackingTeam: {
    logo: {
      name: string
      url: string
    }
    name: string
    score: number
  }
  defendingTeam: {
    logo: {
      name: string
      url: string
    }
    name: string
    score: number
  }
}

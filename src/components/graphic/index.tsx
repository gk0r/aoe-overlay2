import React from 'react'
import Caster from './overwatch/caster/Caster'
import CasterVAL from './valorant/caster'
import Team from './overwatch/team/Team'
import TeamVal from './valorant/team/Team'
import Title from './overwatch/title/Title'
import Sponsor from './overwatch/sponsor/Sponsor'
import SponsorVal from './valorant/sponsor/Sponsor'

import { useQuery, gql } from '@apollo/client'

export const GET_DATA = gql`
  {
    attackingTeam {
      name
      score
      logo {
        name
        url
      }
      role
    }
    defendingTeam {
      name
      score
      logo {
        name
        url
      }
      role
    }
    round {
      title
      casters
    }
    logos {
      name
      url
    }
    theme
  }
`

export default function DataLoader() {
  const { loading, error, data } = useQuery(GET_DATA, {
    pollInterval: 1000,
  })

  if (loading) return <></> // I don't think I need to do anything on loading - this will happen very quickly and in the background tab.
  if (error) return <p>Error :(</p>

  switch (data.theme) {
    case 'OWD':
      return <GraphicOWD data={data} />
    case 'VAL':
      return <GraphicVAL data={data} />
    default:
      return <GraphicOWD data={data} />
  }
}

function GraphicOWD({ data }: any) {
  return (
    <div className='graphic OWD'>
      <Title title={data.round.title} />
      <Team
        attackingTeam={data.attackingTeam}
        defendingTeam={data.defendingTeam}
      />
      <Caster casters={data.round.casters} />
      <Sponsor />
    </div>
  )
}

function GraphicVAL({ data }: any) {
  return (
    <div className='graphic VAL'>
      <TeamVal
        attackingTeam={data.attackingTeam}
        defendingTeam={data.defendingTeam}
      />
      <CasterVAL casters={data.round.casters} />
      <SponsorVal />
    </div>
  )
}

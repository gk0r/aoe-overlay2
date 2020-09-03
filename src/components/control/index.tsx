import React from 'react'
import { GET_DATA } from '../graphic'
import { useQuery } from '@apollo/client'
import { Container } from 'semantic-ui-react'

import MatchDetails from './MatchDetails'
import TeamDetails from './TeamDetails'

export default function DataLoader() {
  const { loading, error, data, refetch } = useQuery(GET_DATA)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Container>
      <MatchDetails data={data} />
      <TeamDetails data={data} refetch={refetch} />
    </Container>
  )
}

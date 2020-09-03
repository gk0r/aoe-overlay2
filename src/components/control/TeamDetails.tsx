import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  Form,
  Grid,
  Segment,
  Button,
  Header,
  Image,
  Input,
  Icon,
  Dropdown,
  Select,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { GET_DATA } from '../graphic'

const ATTACKING_TEAM = gql`
  mutation updateAttackingTeam($teamInput: TeamInput, $logoInput: LogoInput) {
    updateAttackingTeam(teamInput: $teamInput, logoInput: $logoInput) {
      name
      score
      logo {
        url
      }
      role
    }
  }
`
const DEFENDING_TEAM = gql`
  mutation updateDefendingTeam($teamInput: TeamInput, $logoInput: LogoInput) {
    updateDefendingTeam(teamInput: $teamInput, logoInput: $logoInput) {
      name
      score
      logo {
        url
      }
      role
    }
  }
`
const SWAP_TEAMS = gql`
  mutation swapTeams {
    swapTeams {
      attackingTeam {
        name
        score
        role
      }
      defendingTeam {
        name
        score
        role
      }
    }
  }
`
const UPLOAD = gql`
  mutation upload($file: Upload!) {
    upload(file: $file)
  }
`

export default function TeamDetails({ data, refetch }: any) {
  const [attTeamName, setAttTeamName] = useState(data.attackingTeam.name)
  const [attTeamScore, setAttTeamScore] = useState(data.attackingTeam.score)
  const [attTeamLogo, setAttTeamLogo] = useState('/logos/placeholder.png')
  const [attTeamRole, setAttTeamRole] = useState(data.attackingTeam.role)
  const [defTeamName, setDefTeamName] = useState(data.defendingTeam.name)
  const [defTeamScore, setDefTeamScore] = useState(data.defendingTeam.score)
  const [defTeamLogo, setDefTeamLogo] = useState('/logos/placeholder.png')
  const [defTeamRole, setDefTeamRole] = useState(data.defendingTeam.role)

  const [updateAttackingTeam] = useMutation(ATTACKING_TEAM, {
    variables: {
      teamInput: {
        name: attTeamName,
        score: attTeamScore,
        role: attTeamRole,
      },
      logoInput: { url: attTeamLogo },
    },
  })

  const [updateDefendingTeam] = useMutation(DEFENDING_TEAM, {
    variables: {
      teamInput: {
        name: defTeamName,
        score: defTeamScore,
        role: defTeamRole,
      },
      logoInput: { url: defTeamLogo },
    },
  })

  const [swapTeams] = useMutation(SWAP_TEAMS)
  const [upload] = useMutation(UPLOAD)

  function swapTeamState() {
    const oldAttacker = { attTeamName, attTeamScore, attTeamLogo, attTeamRole }
    const oldDefender = { defTeamName, defTeamScore, defTeamLogo, defTeamRole }
    setAttTeamName(oldDefender.defTeamName)
    setAttTeamScore(oldDefender.defTeamScore)
    setAttTeamLogo(oldDefender.defTeamLogo)
    setAttTeamRole(oldDefender.defTeamRole)
    setDefTeamName(oldAttacker.attTeamName)
    setDefTeamScore(oldAttacker.attTeamScore)
    setDefTeamLogo(oldAttacker.attTeamLogo)
    setDefTeamRole(oldAttacker.attTeamRole)
  }

  function uploadFile(event: any) {
    const file = event.target.files[0]
    upload({ variables: { file } })
    setTimeout(function () {
      refetch()
    }, 300)
  }

  useEffect(() => {
    if (attTeamLogo) {
      updateAttackingTeam()
    }
  }, [attTeamLogo, attTeamRole, updateAttackingTeam])

  useEffect(() => {
    if (defTeamLogo) {
      updateDefendingTeam()
    }
  }, [defTeamLogo, defTeamRole, updateDefendingTeam])

  return (
    <Grid columns={3}>
      <Grid.Row verticalAlign={'middle'}>
        <Grid.Column width={6}>
          <Segment>
            <Form>
              <Header as='h3'>Left Team</Header>
              <Form.Group>
                <Form.Input
                  label='Team Name'
                  width={12}
                  value={attTeamName}
                  onChange={(e) => {
                    setAttTeamName(e.target.value)
                  }}
                  onBlur={updateAttackingTeam as any}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Score'
                  width={6}
                  value={attTeamScore}
                  onChange={(e) => {
                    setAttTeamScore(parseInt(e.target.value))
                  }}
                  onBlur={updateAttackingTeam as any}
                />
                <TeamRoleSymbolDropdown
                  role={attTeamRole}
                  setRole={setAttTeamRole}
                />
              </Form.Group>
              <Form.Group>
                <Image src={attTeamLogo} size='small' />
              </Form.Group>
              <Form.Group>
                <TeamLogoDropdown
                  logos={data.logos}
                  setTeamLogo={setAttTeamLogo}
                />
              </Form.Group>
              <Form.Group>
                <Input type='file' width={12} onChange={uploadFile} />
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4} textAlign='center'>
          <SwapAndOpenGraphicButtons
            swapTeams={swapTeams}
            swapTeamState={swapTeamState}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment>
            <Form>
              <Header as='h3'>Right Team</Header>
              <Form.Group>
                <Form.Input
                  label='Team Name'
                  width={12}
                  value={defTeamName}
                  onChange={(e) => {
                    setDefTeamName(e.target.value)
                  }}
                  onBlur={updateDefendingTeam as any}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  label='Score'
                  width={6}
                  value={defTeamScore}
                  onChange={(e) => {
                    setDefTeamScore(parseInt(e.target.value))
                  }}
                  onBlur={updateDefendingTeam as any}
                />
                <TeamRoleSymbolDropdown
                  role={defTeamRole}
                  setRole={setDefTeamRole}
                />
              </Form.Group>
              <Form.Group>
                <Image src={defTeamLogo} size='small' />
              </Form.Group>
              <Form.Group>
                <TeamLogoDropdown
                  logos={data.logos}
                  setTeamLogo={setDefTeamLogo}
                />
              </Form.Group>
              <Form.Group>
                <Input type='file' width={12} onChange={uploadFile} />
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function SwapAndOpenGraphicButtons({ swapTeams, swapTeamState }: any) {
  return (
    <>
      <Button
        primary
        fluid
        onClick={(e) => {
          swapTeams()
          swapTeamState()
        }}
      >
        <Icon name='arrow left' />
        Swap Teams
        <Icon name='arrow right' />
      </Button>
      <div style={{ marginTop: '1rem' }}>
        <Button fluid color='orange' as={Link} to='/graphic' target='_blank'>
          <Icon name='folder open outline' />
          Open streaming overlay
        </Button>
      </div>
    </>
  )
}

function TeamLogoDropdown({ logos = [], setTeamLogo }: any) {
  const options = logos.map((logo: any) => {
    return {
      key: logo.name,
      text: logo.name,
      value: logo.url,
      image: { avatar: false, src: logo.url },
    }
  })

  return (
    <Dropdown
      placeholder='Team logos'
      openOnFocus
      closeOnEscape
      selection
      clearable
      fluid
      options={options}
      onChange={(e, data) => setTeamLogo(data.value)}
    />
  )
}

function TeamRoleSymbolDropdown({
  role,
  setRole,
}: {
  role: any
  setRole: any
}) {
  const options = [
    { key: 1, text: 'Attack', value: 'Attack' },
    { key: 2, text: 'Defend', value: 'Defend' },
    { key: 3, text: 'None', value: 'None' },
  ]

  return (
    <>
      <Form.Field
        label='Role (Att / Def)'
        control={Select}
        text={role}
        options={options}
        //@ts-ignore
        onChange={(e, data) => setRole(data.value)}
      />
    </>
  )
}

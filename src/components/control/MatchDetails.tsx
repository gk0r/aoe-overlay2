import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form, Segment } from 'semantic-ui-react'

const TITLE = gql`
  mutation updateTitle($title: String) {
    setTitle(title: $title)
  }
`
const CASTERS = gql`
  mutation updateCasters($casters: [String]) {
    setCasters(casters: $casters)
  }
`

const THEME = gql`
  mutation setTheme($theme: String) {
    setTheme(theme: $theme)
  }
`

export default function MatchDetails({ data }: any) {
  const [updateTitle] = useMutation(TITLE)
  const [updateCasters] = useMutation(CASTERS)
  const [updateTheme] = useMutation(THEME)
  const [title, setTitle] = useState(data.round.title || 'AOE Match')
  const [theme, setTheme] = useState(data.theme)
  const [mainCaster, updateMainCaster] = useState(
    data.round.casters[0] || 'AOE Caster'
  )
  const [supportingCaster, updateSupportingCaster] = useState(
    data.round.casters[1] || 'AOE Caster'
  )

  function onBlur() {
    updateCasters({ variables: { casters: [mainCaster, supportingCaster] } })
  }

  const options = [
    { key: 'OWD', value: 'OWD', text: 'Overwatch Dark' },
    { key: 'OWL', value: 'OWL', text: 'Overwatch Light', disabled: true },
    { key: 'VAL', value: 'VAL', text: 'Valorant' },
  ]

  return (
    <Segment>
      <Form>
        <Form.Group>
          <Form.Input
            fluid
            label='Match title'
            placeholder='Match title'
            width={8}
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            onBlur={(e: any) => updateTitle({ variables: { title } })}
          />
          <Form.Select
            fluid
            label='Overlay theme'
            options={options}
            width={3}
            value={theme}
            onChange={(e, data: any) => {
              setTheme(data.value)
              updateTheme({ variables: { theme: data.value } })
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label='Caster 1'
            placeholder='Caster 1'
            width={4}
            value={mainCaster}
            onChange={(e) => updateMainCaster(e.target.value)}
            onBlur={onBlur}
          />
          <Form.Input
            fluid
            label='Caster 2'
            placeholder='Caster 2'
            width={4}
            value={supportingCaster}
            onChange={(e) => updateSupportingCaster(e.target.value)}
            onBlur={onBlur}
          />
        </Form.Group>
      </Form>
    </Segment>
  )
}

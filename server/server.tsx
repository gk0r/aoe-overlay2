const { ApolloServer, gql } = require('apollo-server')
const { createWriteStream, existsSync, mkdirSync, readdir } = require('fs')
const { promises: fs } = require('fs')
const path = require('path')

const typeDefs = gql`
  type Team {
    name: String
    score: Int
    logo: Logo
    role: Role
  }

  enum Role {
    Attack
    Defend
    None
  }

  type Teams {
    attackingTeam: Team
    defendingTeam: Team
  }

  type Round {
    casters: [String]
    title: String
  }

  type Logo {
    name: String
    url: String
  }

  type Query {
    attackingTeam: Team
    defendingTeam: Team
    round: Round
    logos: [Logo]
    theme: String
  }

  input TeamInput {
    name: String
    score: Int
    role: Role
  }

  input LogoInput {
    name: String
    url: String
  }

  type Mutation {
    updateAttackingTeam(teamInput: TeamInput, logoInput: LogoInput): Team
    updateDefendingTeam(teamInput: TeamInput, logoInput: LogoInput): Team
    swapTeams: Teams
    setCasters(casters: [String]): [String]
    setTitle(title: String): String
    upload(file: Upload!): Boolean
    setTheme(theme: String): String
  }
`

let teams = {
  attackingTeam: {
    name: 'Attacking Team',
    score: 0,
    logo: {
      name: 'Alpha',
      url: '/logos/fire_scale.png',
    },
    role: 'None',
  },
  defendingTeam: {
    name: 'Defending Team',
    score: 0,
    logo: {
      name: 'Bravo',
      url: '/logos/kraken_academy.png',
    },
    role: 'None',
  },
}

let title = 'Round 1'
let casters = ['@AOE Caster', '@AOE Caster']
let logos = [
  { name: 'Alpha', url: '/logos/alpha.png' },
  { name: 'Bravo', url: '/logos/bravo.png' },
]
let theme = 'OWD'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    attackingTeam: () => teams.attackingTeam,
    defendingTeam: () => teams.defendingTeam,
    round: () => {
      return { title, casters }
    },
    logos: async () => {
      try {
        // const directoryPath = path.join(__dirname, '..', 'public', 'logos')
        const directoryPath = path.join(
          __dirname,
          '..',
          process.env.LOGO_PATH,
          'logos'
        )

        const files = await fs.readdir(directoryPath)
        return files.map((file) => {
          return { name: file, url: '/logos/' + file }
        })
      } catch (err) {
        console.error('Error occured while reading directory!', err)
      }
    },
    theme: () => theme,
  },
  Mutation: {
    updateAttackingTeam: (_, { teamInput, logoInput }) => {
      Object.assign(teams.attackingTeam, teamInput)
      Object.assign(teams.attackingTeam.logo, logoInput)
      return teams.attackingTeam
    },
    updateDefendingTeam: (_, { teamInput, logoInput }) => {
      Object.assign(teams.defendingTeam, teamInput)
      Object.assign(teams.defendingTeam.logo, logoInput)
      return teams.defendingTeam
    },
    swapTeams: () => {
      const newTeam = {
        defendingTeam: teams.attackingTeam,
        attackingTeam: teams.defendingTeam,
      }
      teams = newTeam
      return teams
    },
    setCasters: (_, args) => {
      casters = args.casters
      return casters
    },
    setTitle: (_, args) => {
      title = args.title
      return title
    },
    upload: async (_, { file }) => {
      const upload = await processUpload(file)
    },
    setTheme: (_, args) => (theme = args.theme),
  },
}

async function processUpload(upload) {
  const { createReadStream, filename, mimetype } = await upload
  const stream = createReadStream()
  const file = await storeUpload({ stream, filename, mimetype })
  return file
}

async function storeUpload({ stream, filename, mimetype }) {
  const path = `${process.env.LOGO_PATH}/logos/${filename}`
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => {
        logos.push({ name: filename, url: '/logos/' + filename }) // Push to state
        resolve({ path, filename, mimetype })
      })
      .on('error', reject)
  )
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

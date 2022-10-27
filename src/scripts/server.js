// Fake server

const DEFAULT_PAGINATOR_STEP = 20

const isPersonsMatch = (person, targetPerson) => {
  return Object.entries(targetPerson).every(([key, value]) => {
    if (typeof value === 'string') {
      return person[key]
        .toLocaleLowerCase()
        .startsWith(value.trim().toLocaleLowerCase())
    }

    if (typeof value === 'number') {
      return `${person[key]}`.startsWith(`${value}`)
    }

    if (typeof value === 'boolean') {
      return person[key] === value
    }

    return true
  })
}

const filterPersons = (persons, targetPerson) => {
  if (!targetPerson) {
    return persons
  }

  return persons.filter((person) => isPersonsMatch(person, targetPerson))
}

class Server {
  listeners = []

  constructor() {
    this.init()
  }

  async init() {
    const file = await fetch(
      'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json'
    )

    return file.json()
  }

  async getFile() {
    return this.init()
  }

  async getPersons({
    offset = 0,
    count = DEFAULT_PAGINATOR_STEP,
    person,
  } = {}) {
    const file = await this.getFile()
    const filteredFile = filterPersons(file, person)

    const resultData =
      offset <= filteredFile.length
        ? filteredFile.slice(offset, offset + count)
        : null

    return {
      data: resultData,
      currentOffset: resultData ? offset + count : offset,
    }
  }
}

export const server = new Server()

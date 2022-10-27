import './scroller'
import { screenIntersector } from './screenIntersector'
import { server } from './server'
import { personTable } from './personTable'

const textField = document.querySelector('.search-bar__textfield')
const searchForm = document.querySelector('.search-bar')
const listContainerElement = document.querySelector(
  '.table > .table__scroll-link'
)

let shouldUpdate = true
let person = null
let offset = 0
let prevSearch = null

const updateTable = async () => {
  if (!shouldUpdate) {
    return
  }

  shouldUpdate = false

  const data = await server.getPersons({
    person,
    offset,
  })

  offset = data.currentOffset

  if (data.data) {
    personTable.append(data.data)
  }
}

const handleSearchSubmit = async (e) => {
  e.preventDefault()
  const value = textField.value

  if (prevSearch === value) {
    return
  }

  const [name, gender, survived, age] = value.split(',')

  prevSearch = value

  person = {
    name,
    gender,
    age: Number(age) || undefined,
    survived: survived ? !/no/i.test(survived) : undefined,
  }

  shouldUpdate = true
  personTable.clear()
  offset = 0

  await updateTable()
}

searchForm.addEventListener('submit', handleSearchSubmit)

const main = async () => {
  await updateTable()

  screenIntersector(listContainerElement, async () => {
    await updateTable()
    shouldUpdate = true
  })
}

main()

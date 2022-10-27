class PersonTable {
  constructor() {
    this.root = document.querySelector('.table')
    this.body = document.querySelector('.table > .table__body')
  }

  getRowElement({ name, gender, age, survived }) {
    const rowElement = document.createElement('div')
    rowElement.classList.add('table__row')

    const content = ` <div class="table__cell">${name}</div>
    <div class="table__cell">${gender}</div>
    <div class="table__cell">${survived ? 'yes' : 'no'}</div>
    <div class="table__cell">${age}</div>`

    rowElement.innerHTML = content

    return rowElement
  }

  append(persons) {
    this.body.append(...persons.map(this.getRowElement))
  }

  clear() {
    this.body.innerHTML = ''
  }
}

export const personTable = new PersonTable()

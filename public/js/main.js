const notesEl = document.querySelector('#notes')
const loadingEl = document.querySelector('#loading')
let loading = false

const getNotesFromBackend = async () => {
  loading = true
  const res = await fetch('https://notion-nodejs.onrender.com/notes')
  const data = await res.json()
  loading = false
  return data
}

const addNotesToDom = async () => {
  const notes = await getNotesFromBackend()

  if (!loading) {
    loadingEl.innerHTML = ''
  }

  notes.forEach((notes) => {
    const div = document.createElement('div')
    div.className = 'notes'
    div.innerHTML = `
      <h3>${notes.title}</h3>
      <ul>
        <li><strong>Release Date: </strong> ${notes.date}</li>
        <li><strong>Description: </strong> ${notes.description}</li>
      </ul>
      <div class="tags">${notes.tags}</div>
    `
    notesEl.appendChild(div)
  })
}

addNotesToDom()

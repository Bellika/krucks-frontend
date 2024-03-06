import { useEffect, useState } from 'react'
import { Note as NoteModel} from './models/note';
import Note from './components/Note';

function App() {
  const [count, setCount] = useState(0)
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes () {
      try {
        const response = await fetch("http://localhost:5000/api/notes", { method: "GET", headers: { 'Content-Type': 'application/json' } })
        const notes = await response.json();
        console.log(notes)
        setNotes(notes);
      } catch (error) {
        console.error(error)
      }
    }
      loadNotes();
  }, []);

  return (
    <>
      <h1>Krucks</h1>
      {notes.map(note => (
        <Note note={note} key={note._id}/>
      ))}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App

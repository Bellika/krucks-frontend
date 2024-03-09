import { useEffect, useState } from 'react'
import { Note as NoteModel} from './models/note';
import Note from './components/Note';
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes () {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error)
      }
    }
      loadNotes();
  }, []);

  const handleCloseAddNoteDialog = () => {
    setShowAddNoteDialog(false);
  }

  return (
    <>
      <h1>Krucks</h1>

      <button onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </button>

      {notes.map(note => (
        <Note note={note} key={note._id}/>
      ))}
      
      { showAddNoteDialog &&
          <AddNoteDialog 
          onClose={handleCloseAddNoteDialog}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
          />
      }
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import { Note as NoteModel} from './models/note';
import Note from './components/Note';
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from './components/AddEditNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);
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

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Krucks</h1>

      <button onClick={() => setShowAddNoteDialog(true)}>
        Add new note
      </button>

      {notes.map(note => (
        <Note 
        note={note} 
        key={note._id}
        onDeleteNoteClicked={deleteNote}
        onNoteClicked={setNoteToEdit}
        />
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
      { noteToEdit && 
        <AddNoteDialog
        noteToEdit={noteToEdit}
        onClose={() => setNoteToEdit(null)}
        onNoteSaved={(updateNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote));
          setNoteToEdit(null);
        }}
        />
      }
    </>
  )
}

export default App

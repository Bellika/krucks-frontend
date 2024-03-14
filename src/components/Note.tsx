import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel) => void,
    onDeleteNoteClicked: (note: NoteModel) => void,
}

const Note = ({ note, onNoteClicked, onDeleteNoteClicked }: NoteProps) => {
    const {
        title,
        text,
    } = note;

    return(
        <div 
        className={styles.noteCard}
        onClick={() => onNoteClicked(note)}
        >
            <div>{title}</div>
            <br/>
            <div className={styles.cardText}>{text}</div>
            <button onClick={(e) => {
                onDeleteNoteClicked(note);
                e.stopPropagation();
                }}>Delete</button>
        </div>
    )
}

export default Note;
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from "../models/note";

interface NoteProps {
    note: NoteModel,
}

const Note = ({ note }: NoteProps) => {
    const {
        title,
        text,
    } = note;

    return(
        <div className={styles.noteCard}>
            <div>{title}</div>
            <br/>
            <div className={styles.cardText}>{text}</div>
        </div>
    )
}

export default Note;
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";

interface AddEditNoteDialogProps {
    noteToEdit?: Note, 
    onClose: () => void, 
    onNoteSaved: (note: Note) => void,
}

const AddEditNoteDialog = ({ noteToEdit, onClose, onNoteSaved }: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState : {isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });
    
    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div>
            <h1>{noteToEdit ? "Edit note" : "Add note"}</h1>

            <form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Required"})}
                ></input>
                <br />
                <textarea
                    rows={5}
                    placeholder="Text"
                    {...register("text")}
                ></textarea>
            </form>
            <button
                type="submit"
                form="addEditNoteForm"
                disabled={isSubmitting}
            >
                Save
            </button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default AddEditNoteDialog
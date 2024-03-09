import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import { Note } from "../models/note";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
    onClose: () => void;
    onNoteSaved: (note: Note) => void,
}

const AddNoteDialog = ({ onClose, onNoteSaved }: AddNoteDialogProps) => {

    const { register, handleSubmit, formState : {isSubmitting} } = useForm<NoteInput>();
    
    async function onSubmit(input: NoteInput) {
        try {
            const noteResponse = await NotesApi.createNote(input)
            onNoteSaved(noteResponse);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Add Note</h1>

            <form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
                form="addNoteForm"
                disabled={isSubmitting}
            >
                Save
            </button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default AddNoteDialog
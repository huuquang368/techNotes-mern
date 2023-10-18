import { useGetNotesQuery } from "./noteApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p className="errmsg">{error?.data?.message}</p>;
  }
  console.log(notes.ids, notes.ids?.length);

  return (
    <>
      {isSuccess && (
        <table className="table table--notes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th note__status">
                Complete
              </th>
              <th scope="col" className="table__th note__created">
                Created
              </th>
              <th scope="col" className="table__th note__updated">
                Updated
              </th>
              <th scope="col" className="table__th note__title">
                Title
              </th>
              <th scope="col" className="table__th note__description">
                Description
              </th>
              <th scope="col" className="table__th note__username">
                Owner
              </th>
              <th scope="col" className="table__th note__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.ids?.length > 0 &&
              notes.ids?.map((id) => <Note key={id} noteId={id} />)}
          </tbody>
        </table>
      )}
    </>
  );
};
export default NotesList;

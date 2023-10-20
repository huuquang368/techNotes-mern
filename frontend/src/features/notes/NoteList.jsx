import { useGetNotesQuery } from "./noteApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p className="errmsg">{error?.data?.message}</p>;
  }
  // only see note assigned to current user
  // admin & manager call see all note
  const filterIds =
    isAdmin || isManager
      ? [...notes.ids]
      : notes?.ids?.filter(
          (nodeId) => notes.entities[nodeId].username === username
        );

  return (
    <>
      {isSuccess && (
        <table className="table table--notes">
          <thead className="table__thead">
            <tr>
              <th className="table__th note__status">Complete</th>
              <th className="table__th note__created">Created</th>
              <th className="table__th note__updated">Updated</th>
              <th className="table__th note__title">Title</th>
              <th className="table__th note__description">Description</th>
              <th className="table__th note__username">Owner</th>
              <th className="table__th note__edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {notes.ids?.length > 0 &&
              filterIds?.map((id) => <Note key={id} noteId={id} />)}
          </tbody>
        </table>
      )}
    </>
  );
};
export default NotesList;

import User from "./User";
import { useGetUsersQuery } from "./userApiSlice";

function UserList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 20000, // re-query data each 20s
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true, // remount component will refetch the change
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p className="errmsg">{error?.data?.message}</p>;
  }
  return (
    <>
      {isSuccess && (
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th className="table__th user__username">Username</th>
              <th className="table__th user__roles">Roles</th>
              <th className="table__th user__edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.ids?.length &&
              users.ids?.map((id) => <User key={id} userId={id} />)}
          </tbody>
        </table>
      )}
    </>
  );
}

export default UserList;

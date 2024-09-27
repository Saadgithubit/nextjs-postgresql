import UserAdd from "./adduser";
import EditAndDelete from "./editdelete";
import { getAllUser } from "./lib/action";

export default async function Home() {
  const { users } = await getAllUser();

  return (
    <div>
      <div className="flex justify-center items-start py-4 gap-6">
        <UserAdd />
      </div>
      {users && users.map((item) => {
        const { id, firstName, lastName, email, createdAt } = item
        const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        return (
          <div key={id} className="border-2 w-1/3 mx-auto py-4">
            <div className="flex gap-4 p-3">
              <h1>Id:</h1>
              <span>{id}</span>
            </div>
            <div className="flex gap-4 p-3">
              <h1>FullName:</h1>
              <span>{`${firstName} ${lastName}`}</span>
            </div>
            <div className="flex gap-4 p-3">
              <h1>Email:</h1>
              <span>{email}</span>
            </div>
            <div className="flex gap-4 p-3">
              <h1>Register Date:</h1>
              <span>{formattedDate}</span>
            </div>
            <EditAndDelete id={id} />
          </div>
        )
      })}
    </div>
  );
}

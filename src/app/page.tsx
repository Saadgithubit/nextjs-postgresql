import EditAndDelete from "./editdelete";
import { addUser, getAllUser } from "./lib/action";

export default async function Home() {
  const { users } = await getAllUser();

  return (
    <div>
      <div className="flex justify-center items-start py-4 gap-6">
        <form action={addUser} className="w-1/3 space-y-4 border-2 p-4">
          <h1 className="text-2xl font-semibold text-blue-500 text-center">Add User</h1>
          <input className="w-full border-2 p-4" placeholder="First Name" name="firstName" type="text" />
          <input className="w-full border-2 p-4" placeholder="Last Name" name="lastName" type="text" />
          <input className="w-full border-2 p-4" placeholder="Email" name="email" type="text" />
          <button className="bg-blue-500 text-white rounded-lg px-8 py-4">Add User</button>
        </form>
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

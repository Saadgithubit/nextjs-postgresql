import UserAdd from "../components/addusers/adduser";
import { getAllUser } from "../lib/action";


export default async function Home() {
    const { users } = await getAllUser();

    return (
        <UserAdd allUsers={users} />
    );
}

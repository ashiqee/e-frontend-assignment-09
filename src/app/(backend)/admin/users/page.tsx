import { getAllUsers } from "@/services/AdminServices/ManageUser";
import UserManangementTable from "../../components/UserManagementTable";


export default async function  UsersManage() {

    const users = await getAllUsers()

    console.log(users);
    

    return (
        <div>Users Management


            {/* users table  */}

            <UserManangementTable users={users}/>
        </div>
    );
}
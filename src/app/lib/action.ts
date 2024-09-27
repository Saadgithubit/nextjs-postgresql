'use server'

import User from "../models/User";
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    id?: number
}

export async function getAllUser() {
    try {
        const response = await User.findAll();
        const data = response.map(user => user.get({ plain: true }))
        const users = data.sort((a, b) => Number(b.id) - Number(a.id));
        return { users: users };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to get users');
    }
}

export async function addUser({ firstName, lastName, email }: FormData) {
    try {
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
        });
        const { users } = await getAllUser()
        return { success: true, message: 'User Add Successfully', users: users }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Something Went Wrong in User Add!!!' }
    }
}

export async function updateUser({ firstName, lastName, email, id }: FormData) {
    try {
        await User.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
            { where: { id: id } })
        const { users } = await getAllUser()
        return { success: true, message: 'User Update Successfully', users: users }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, message: 'Something Went Wrong in User Update!!!' }
    }

}
export async function deleteUser(id: number) {
    try {
        const deletedCount = await User.destroy({ where: { id: id }, limit: 1 });
        if (deletedCount === 0) {
            return { success: false, message: 'No user found with that ID' }

        } else {
            const { users } = await getAllUser()
            return { success: true, message: 'User Deleted Successfully', users: users }
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Something Went Wrong in User Delete!!!' }
    }

}
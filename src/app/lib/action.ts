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
        const users = await User.findAll();
        return { users: users.map(user => user.get({ plain: true })) };
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
        return { success: true, message: 'User Add Successfully' }
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
        return { success: true, message: 'User Update Successfully' }
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
            return { success: true, message: 'User Deleted Successfully' }
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Something Went Wrong in User Delete!!!' }
    }

}
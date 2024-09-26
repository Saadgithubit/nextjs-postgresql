'use server'

import { redirect } from "next/navigation";
import User from "../models/User";

export async function getAllUser() {
    try {
        const users = await User.findAll();
        return { users };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to get users');
    }
}

export async function addUser(formData: any) {
    const { firstName, lastName, email } = Object.fromEntries(formData);
    try {
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
        });
        redirect('/')
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateUser(formData: any) {
    const { firstName, lastName, email, id } = Object.fromEntries(formData);
    try {
        const updatedUser = await User.update({
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
            { where: { id: id } })
        redirect('/')
    } catch (error) {
        console.error('Error:', error)
    }

}
export async function deleteUser(id: number) {
    try {
        const deletedCount = await User.destroy({ where: { id: id }, limit: 1 });
        console.log(deletedCount);

        if (deletedCount === 0) {
            alert('No user found with that ID')
        } else {
            console.log(`User with ID ${id} deleted successfully.`);
            redirect('/')
        }
    } catch (error) {
        console.error('Error:', error);
    }

}
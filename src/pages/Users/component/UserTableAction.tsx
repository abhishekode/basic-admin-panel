import React from 'react';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import { IUser, UserRole } from '@/components/common/Interfaces';
import { useNavigate } from 'react-router-dom';
import DeleteAlertModel from '@/components/common/model/DeleteAlertModel';
import { toast } from 'react-toastify';

interface UserTableActionProps {
    data: IUser;
    forUserRole: UserRole;
    fetchUsers: () => void;
}

const UserTableAction: React.FC<UserTableActionProps> = ({ data, forUserRole, fetchUsers }) => {
    const [isDeleteUser, setIsDeleteUser] = React.useState<boolean>(false)
    const navigate = useNavigate()


    // const navigateToUserProfile = (id: string) => {
    //     navigate(`/user/profile/${id}`)
    // }

    const toggleDeleteAlertModel = () => {
        setIsDeleteUser(!isDeleteUser)
    }
    const handleDeleteUser = async () => {
        const updateData = { email: data.email }
        try {
            // const res = await UserMainAPI.toggleActivateAccount(updateData)
            // if (res.status) {
            //     toast.success(res.message, {
            //         position: toast.POSITION.TOP_RIGHT,
            //         autoClose: 1000,
            //     });
            //     fetchUsers();
            // }

        } catch (error: any) {
            toast.error(error?.message || "Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        } finally {
            setIsDeleteUser(false);
        }


    }

    return (
        <div>
            {isDeleteUser && <DeleteAlertModel isOpen={isDeleteUser} onDelete={handleDeleteUser} toggleModal={toggleDeleteAlertModel} deleteFor={forUserRole} />}
            <div className="flex gap-x-3 whitespace-nowrap capitalize mt-1">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded bg-blue-600 text-white p-1"

                >
                    <MdRemoveRedEye className='text-xl' />
                </button>
                <button
                    className="hover:bg-red-500 font-bold rounded bg-red-600 text-white p-1"
                    onClick={toggleDeleteAlertModel}
                >
                    <MdDelete className='text-xl' />
                </button>
            </div>
        </div>
    );
};

export default UserTableAction;

import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { IAdmin } from '../common/Interfaces';
import AddNewAdmin from './AddNewAdmin';
import DeleteAlertModel from '../common/model/DeleteAlertModel';
import { AdminAPI } from '@/utils/api.method';
import { toast } from 'react-toastify';

interface AdminTableActionProps {
    data: IAdmin;
    fetchAdmins: () => void;
}

const AdminTableAction: React.FC<AdminTableActionProps> = ({ data, fetchAdmins }) => {
    const [isEditAdmin, setIsEditAdmin] = React.useState<boolean>(false)
    const [isDeleteAdmin, setIsDeleteAdmin] = React.useState<boolean>(false)


    const toggleModal = () => {
        setIsEditAdmin(!isEditAdmin);
    }

    const toggleDeleteAlertModel = () => {
        setIsDeleteAdmin(!isDeleteAdmin)
    }

    const handleDeleteAdmin = () => {
        AdminAPI.deleteById(data._id).then((res) => {
            if(res.status){
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000,
    
                });
                fetchAdmins();
            }

        })
    }

    

    return (
        <div>
            {isDeleteAdmin && <DeleteAlertModel isOpen={isDeleteAdmin} onDelete={handleDeleteAdmin} toggleModal={toggleDeleteAlertModel} deleteFor='admin' />}
            {isEditAdmin && <AddNewAdmin isOpen={isEditAdmin} toggleModal={toggleModal} fetchAdmins={fetchAdmins} updateAdminData={data} />}
            <div className="flex gap-x-3 whitespace-nowrap capitalize mt-1 items-center h-full">
                <button
                    className="bg-gray-500 hover:bg-gray-700 font-bold rounded bg-blue-600 text-white p-1"
                    onClick={toggleModal}
                >
                    <MdModeEdit className="text-xl" />
                </button>
                <button
                    className="hover:bg-red-500 font-bold rounded bg-red-600 text-white p-1"
                    onClick={toggleDeleteAlertModel}
                >
                    <MdDelete className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default AdminTableAction;

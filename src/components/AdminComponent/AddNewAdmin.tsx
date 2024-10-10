import React from 'react'
import BaseModal from '../common/model'
import { useForm } from 'react-hook-form';
import { IAdmin, NewAdminAddRequest } from '../common/Interfaces';
import { AdminAPI } from '@/utils/api.method';
import { toast } from 'react-toastify';
import { TfiEmail } from 'react-icons/tfi';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaPhone } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';

interface AddNewAdminProps {
    isOpen: boolean;
    toggleModal: () => void;
    fetchAdmins: () => void;
    updateAdminData?: IAdmin;
}
const AddNewAdmin: React.FC<AddNewAdminProps> = (
    { isOpen, toggleModal, fetchAdmins, updateAdminData }
) => {
    const [isPassword, setIsPassword] = React.useState<boolean>(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewAdminAddRequest>({
        defaultValues: updateAdminData ? {
            firstName: updateAdminData.firstName,
            lastName: updateAdminData.lastName,
            phoneNumber: updateAdminData.phoneNumber,
            email: updateAdminData.email,
            isActive: updateAdminData.isActive,
        } : {},
    });

    const onSubmit = async (data: NewAdminAddRequest) => {
        try {
            let res: any;
            if (updateAdminData?._id) {
                res = await AdminAPI.updateById(updateAdminData?._id, {
                    isActive: data.isActive || false,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email
                });

            } else {
                res = await AdminAPI.addNew(data);
            }
            if (res.status) {
                toast.success(`admin ${updateAdminData?._id ? 'update' : 'add'} successfully`);
                fetchAdmins()
                toggleModal()
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            });
        }
    };

    const togglePassword = () => {
        setIsPassword(!isPassword);
    };

    return (
        <div className='container mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <BaseModal isOpen={isOpen} toggleModal={toggleModal} heading={updateAdminData ? "Update admin" : "Add new admin"}>
                <div className="w-full">
                    <div className="w-full p-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium">
                                    name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        {...register("firstName", { required: true })}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <FaUser />
                                    </span>
                                </div>
                                {errors.firstName && (
                                    <div className="text-sm text-red-600">First Name is required</div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium">
                                    name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        {...register("lastName", { required: true })}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <FaUser />
                                    </span>
                                </div>
                                {errors.lastName && (
                                    <div className="text-sm text-red-600">Last Name is required</div>
                                )}
                            </div>

                            {!updateAdminData?._id && <div className="mb-4">
                                <label className="mb-2.5 block font-medium">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", { required: true })}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <TfiEmail />
                                    </span>
                                </div>
                                {errors.email && (
                                    <div className="text-sm text-red-600">Email is required</div>
                                )}
                            </div>}

                            {!updateAdminData?._id && <div className="mb-6">
                                <label className="mb-2.5 block font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={isPassword ? "password" : "text"}
                                        placeholder="6+ Characters, 1 Capital letter"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        {...register("password", { required: true })}
                                    />

                                    <span className="absolute right-4 top-4 cursor-pointer" onClick={togglePassword}>
                                        {isPassword ? <BsEye /> : <BsEyeSlash />}
                                    </span>
                                </div>
                                {errors.password && (
                                    <div className="text-sm text-red-600">Password is required</div>
                                )}
                            </div>}
                            <div className="mb-4">
                                <label className="mb-2.5 block font-medium">
                                    Phone
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        placeholder="Enter your number"
                                        {...register("phoneNumber", { required: true })}
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />

                                    <span className="absolute right-4 top-4">
                                        <FaPhone />
                                    </span>
                                </div>
                                {errors.phoneNumber && (
                                    <div className="text-sm text-red-600">Phone is required</div>
                                )}
                            </div>

                            {updateAdminData?._id && <div className="mb-6 flex gap-4 items-center">
                                <label className="block font-medium">
                                    Is Active
                                </label>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="rounded-lg border"
                                        {...register("isActive", { required: false })}
                                    />
                                </div>
                                {errors.isActive && (
                                    <div className="text-sm text-red-600">isActive is required</div>
                                )}
                            </div>}
                            <div className="mb-5">
                                <input
                                    type="submit"
                                    value={updateAdminData ? "Update admin" : "Add New Admin"}
                                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </BaseModal>
        </div>
    )
}

export default AddNewAdmin
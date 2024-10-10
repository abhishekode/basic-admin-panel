import { IUser, IUserResponse, SignupType, UserRole } from '@/components/common/Interfaces'
import DefaultLayout from '@/layout/DefaultLayout'
import React, { useState } from 'react'
import { listAllUsers } from '@/utils/api.method'
import { toast } from 'react-toastify'
import { AgGridReact } from 'ag-grid-react'
import UserTableAction from './component/UserTableAction'
import SwitchInput from '@/components/ui/Switch'
import { UserQueryDto } from '@/components/common/Interfaces/api.request-interface'
import Pagination from '@/components/common/ui/PaginationFooter'
import FilterUsers from '@/components/filters/FilterUsers'
import { FilterBar } from '@/components/filters'
import { MdEmail } from 'react-icons/md'
import { radDateFormatter } from '@/utils'
import BreadCrumb from '@/components/common/ui/BreadCrumb'
import LoadingUI from '@/components/common/ui/Loading'
import { UserMainAPI } from '@/utils/api/user.api'
import FbIcon from '@/static/images/icon/facebook.svg'
import GoogleIcon from '@/static/images/icon/google.svg'
import AppleIcon from '@/static/images/icon/apple.svg'
import { users } from '@/utils/data/fake-data'

interface UserListProps {
    forUserRole: UserRole;
}

const UserList: React.FC<UserListProps> = ({ forUserRole }) => {
    const [state, setState] = React.useState<IUserResponse>({
        userData: users,
        total: 0
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<UserQueryDto>({});
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | boolean | any }>({});

    const toggleFilterModal = () => {
        if (!state.userData?.length) {
            toast.warn('User Data is not available')
            return
        }
        setIsOpenFilter(!isOpenFilter)
    }
    const handleFilterChange = <K extends keyof UserQueryDto>(name: K, value: UserQueryDto[K]) => {
        setFilter({ ...filter, [name]: value });
    }

    const handleClearFilter = () => {
        setFilter({})
        setActiveFilters({})
        fetchUsers()
    }

    const colDefs: any = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            sortable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
            sortable: true,
            valueGetter: (params: { data: IUser }) => `${params?.data?.phone}`
        },
        { field: 'email', headerName: 'Email', flex: 1, sortable: true },
        {
            field: 'createdAt',
            headerName: 'Created',
            flex: 1,
            sortable: true,
            cellRenderer: (params: { data: IUser }) => {
                const date = params?.data?.createdAt as Date
                return (
                    <div className="flex items-center h-full">
                        {radDateFormatter(date)}
                    </div>
                );
            }
        },
        
        {
            field: 'Actions',
            flex: 0.6,
            filter: true,
            cellRenderer: (params: { data: IUser }) => {
                return <UserTableAction data={params.data} forUserRole={forUserRole} fetchUsers={fetchUsers} />;
            },
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 0.5,
            sortable: true,
            cellRenderer: (params: { data: IUser }) => {
                const active = !params.data.isActive as boolean;

                const handleSwitchChange = async () => {
                    const data = { email: params.data.email }
                    // const res = await UserMainAPI.toggleActivateAccount(data)
                    // if (res.status) {
                    //     toast.success(res.message)
                    // }
                    // fetchUsers()
                };

                return (
                    <div className="flex items-center h-full">
                        <SwitchInput
                            initialValue={active}
                            onChange={handleSwitchChange}
                        />
                    </div>
                );
            },
        },
    ];

    const fetchUsers = async (query?: UserQueryDto) => {
        try {
            setIsLoading(true)
            // const res = await listAllUsers({ role: forUserRole, ...query })
            // if (res.status) {
            //     setState(res.result)
            // }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
            })
        } finally {
            setIsLoading(false)
        }
    }


    const filterUserData = async () => {
        setActiveFilters(filter);
        await fetchUsers(filter);
    };

    React.useEffect(() => {
        fetchUsers()
    }, [])

    const handleFilterCancel = async (filterKey: string) => {
        const updatedFilters = { ...activeFilters };
        delete updatedFilters[filterKey];
        setActiveFilters(updatedFilters);
        setFilter(updatedFilters)
        await fetchUsers(updatedFilters);
    };


    return (
        <DefaultLayout>
            {isOpenFilter && <FilterUsers
                isOpen={isOpenFilter}
                toggleModal={toggleFilterModal}
                clearFilter={handleClearFilter}
                handleFilter={handleFilterChange}
                state={filter}
                applyFilter={filterUserData}
            />}
            <BreadCrumb pageName={forUserRole} />
            <div className="container">
                <div className="flex gap-4 mb-8 justify-end">
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={toggleFilterModal}>Filter</h1>
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={handleClearFilter}>Clear Filter</h1>
                </div>
                {Object.entries(activeFilters).length > 0 && <FilterBar activeFilters={activeFilters} onFilterCancel={handleFilterCancel} />}
                <div className="w-full h-full">
                    <div className="ag-theme-quartz h-[500px] pb-4">
                        {!isLoading ?
                            <AgGridReact
                                className="w-full"
                                rowData={state.userData}
                                columnDefs={colDefs} />
                            : <LoadingUI />
                        }
                    </div>
                    <div className='relative z-1 -mt-4'>
                        {state.userData?.length > 0 &&
                            <Pagination getRequestData={fetchUsers} total={state.total} />
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default UserList
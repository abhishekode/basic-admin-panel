import React, { useState } from 'react'
import DefaultLayout from '@/layout/DefaultLayout'
import { AdminAPI } from '@/utils/api.method'
import { IAdminResponse } from '@/components/common/Interfaces'
import AddNewAdmin from '@/components/AdminComponent/AddNewAdmin'
import ListAdmin from '@/components/AdminComponent/ListAdmin';
import Pagination from '@/components/common/ui/PaginationFooter'
import { toast } from 'react-toastify'
import { FilterAdminQuery } from '@/components/common/Interfaces/filter.interface'
import AdminFilter from '@/components/filters/AdminFilter'
import { FilterBar } from '@/components/filters'
import BreadCrumb from '@/components/common/ui/BreadCrumb'
import { admins } from '@/utils/data/fake-data'

const Admin = () => {
    const [openAdminForm, setOpenAdminForm] = React.useState(false)
    const [state, setState] = React.useState<IAdminResponse>({
        allAdmins: admins,
        total: 3
    })

    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
    const [filter, setFilter] = useState<FilterAdminQuery>({});
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: string | boolean | any }>({});


    const toggleFilterModal = () => {
        if (!state.allAdmins?.length) {
            toast.warn('Admin Data is not available')
            return
        }
        setIsOpenFilter(!isOpenFilter)
    }
    const handleFilterChange = <K extends keyof FilterAdminQuery>(name: K, value: FilterAdminQuery[K]) => {
        setFilter({ ...filter, [name]: value });
    }

    const handleClearFilter = () => {
        setFilter({})
        setActiveFilters({})
        fetchAdmins()
    }

    const fetchAdmins = async (query?: any) => {
        try {
            // const res = await AdminAPI.getAll(query)
            // if (res.status) {
            //     setState(res.result)
            // }
        } catch (error: any) {
            toast.error(error.message || 'something went wrong', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000, 
            })
        }
    }

    React.useEffect(() => {
        fetchAdmins()
    }, [])

    const toggleModal = () => {
        setOpenAdminForm(!openAdminForm)
    }



    const filterData = async () => {
        setActiveFilters(filter)
        await fetchAdmins(filter);
    };


    const handleFilterCancel = async (filterKey: string) => {
        const updatedFilters = { ...activeFilters };
        delete updatedFilters[filterKey];
        setActiveFilters(updatedFilters);
        setFilter(updatedFilters)
        await fetchAdmins(updatedFilters);
    };

    return (
        <DefaultLayout>
            <div className="container">
                <BreadCrumb pageName='admin' />
                {isOpenFilter &&
                    <AdminFilter
                        isOpen={isOpenFilter}
                        toggleModal={toggleFilterModal}
                        clearFilter={handleClearFilter}
                        handleFilter={handleFilterChange}
                        state={filter}
                        applyFilter={filterData}
                    />}
                {openAdminForm && <AddNewAdmin isOpen={openAdminForm} toggleModal={toggleModal} fetchAdmins={fetchAdmins} />}
                <div className="flex gap-4 mb-8 justify-end">
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={toggleFilterModal}>Filter</h1>
                    <h1 className='text-xl rounded border bg-blue-500 text-gray px-5 py-1 cursor-pointer' onClick={handleClearFilter}>Clear Filter</h1>
                    <button onClick={toggleModal}>
                        <h4 className="text-xl rounded border bg-blue-500 text-gray px-5 py-1">
                            Add New Admin
                        </h4>
                    </button>
                </div>
                {Object.entries(activeFilters).length > 0 && <FilterBar activeFilters={activeFilters} onFilterCancel={handleFilterCancel} />}
                <div className="w-full h-full">
                    <ListAdmin adminData={state.allAdmins} fetchAdmins={fetchAdmins} />
                </div>
                {state.allAdmins?.length > 0 &&
                    <div className='relative z-1 -mt-4'>
                        <Pagination getRequestData={fetchAdmins} total={state.total} />
                    </div>
                }
            </div>
        </DefaultLayout>
    )
}

export default Admin
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import { IUser, UserRole } from '@/components/common/Interfaces';
import { getUserProfile } from '@/utils/api.method';
import { toast } from 'react-toastify';
import DefaultLayout from '@/layout/DefaultLayout';
import { getUserProfileTabs } from '@/components/Users/helper';
import UserProfileData from '@/components/Users/UserProfileData';
import DriverDocumentList from '@/components/Driver/DocumentList';
import DriverCarList from '@/components/Driver/CarList';
import { IoReturnUpBack } from 'react-icons/io5';
import BankList from '@/components/Driver/BankList';
import CardList from '@/components/Passenger/CardList';
import DriverTripList from '@/components/Driver/DriverTripList';
import PassengerTrip from '@/components/Passenger/PassengerTrip';
import BreadCrumb from '@/components/common/ui/BreadCrumb';
import DriverEarning from '@/components/Driver/DriverEarning';

const SingleUserDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const userId = params.id as string;
    const [userData, setUserData] = React.useState<IUser>()
    const [activeTab, setActiveTab] = React.useState<string>("d1")

    if (!userId) {
        return <NotFound />;
    }

    const getUserData = async () => {
        try {
            const res = await getUserProfile(userId);
            if (res.status) {
                setUserData(res.result)
                if (res.result.role === UserRole.Driver) {
                    setActiveTab('d1')
                } else {
                    setActiveTab('p1')
                }
            }
        } catch (error: any) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000, 
            })
        }
    }

    React.useEffect(() => {
        getUserData()
    }, [])

    const handleTabClick = (key: string) => {
        setActiveTab(key);
    };

    const tabsToShow = getUserProfileTabs(userData?.role);
    const tabComponents: any = {
        'd1': <DriverDocumentList />,
        'd2': <DriverCarList />,
        'd3': <DriverTripList />,
        'd4': <BankList />,
        'd5': <DriverEarning />,
        'p1': <PassengerTrip />,
        'p2': <CardList />,
    };

    const tabContent = tabComponents[activeTab] || null;

    return (
        <DefaultLayout>
            <BreadCrumb pageName={userData?.role || ''} />
            <div className="mb-5 flex justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className='border px-4 py-1 rounded hover:text-blue-700'
                >
                    <IoReturnUpBack className='text-2xl' />
                </button>
                
            </div>
            <div className="w-full h-full">
                <div className="flex z-20 bg-white flex-col px-10">
                    <div className="">
                        <UserProfileData user={userData} />
                    </div>
                    <div className="w-full bg-white rounded-md">
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 h-18 border-b border-stone-300 mb-6">
                            {tabsToShow.map(tab => (
                                <li
                                    className={`${activeTab === tab.key ? 'border-blue-500 text-blue-500 dark:border-blue-300 dark:text-blue-300' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'} inline-flex items-center justify-center p-3 border-b-2 rounded-t-lg group cursor-pointer`}
                                    key={tab.key}
                                    onClick={() => handleTabClick(tab.key)}
                                >
                                    <span className='text-xl'>{tab.Icon}</span>
                                    <span className='ml-1 text-base font-semibold'>{tab.label}</span>

                                </li>
                            ))}
                        </ul>
                        <div className="px-4 min-h-100">
                            {tabContent}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout >
    )
}

export default SingleUserDetails
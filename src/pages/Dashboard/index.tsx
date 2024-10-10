import React from 'react';
import CardDataStats from '@/components/CardDataStats';
import DefaultLayout from '@/layout/DefaultLayout';
import BreadCrumb from '@/components/common/ui/BreadCrumb';
import { GiTakeMyMoney } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { FaCarOn } from "react-icons/fa6";
import DriverIcon from '@/static/images/user/driver.png'
import PassengerIcon from '@/static/images/user/passenger.png'

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <BreadCrumb pageName='' />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Trip Payments" total={`${100}$`} rate="0.43%" levelUp>
          <GiTakeMyMoney className='text-5xl fill-primary dark:fill-white' />
        </CardDataStats>
        <CardDataStats title="Total Trip Requests" total={`${200}`} rate="4.35%" levelUp>
          <FaCar className='text-3xl fill-primary dark:fill-white' />
        </CardDataStats>
        <CardDataStats title="Total Confirm Trips" total={`${120}`} rate="2.59%" levelUp>
          <FaCarOn className='text-3xl fill-primary dark:fill-white' />
        </CardDataStats>
        <CardDataStats title="Total Drivers" total={`${112}`} rate="0.95%" levelUp>
          <img src={DriverIcon} alt="driver-icon" />
        </CardDataStats>
        <CardDataStats title="Total Passengers" total={`${212}`} rate="0.95%" levelUp>
          <img src={PassengerIcon} alt="passenger-icon" />
        </CardDataStats>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;

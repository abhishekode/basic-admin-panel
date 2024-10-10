import React from 'react'
import { IUser } from '../common/Interfaces'
import userSix from '@/static/images/user/user-06.png';

interface UserProfileDataProps {
  user?: IUser;
}
const UserProfileData: React.FC<UserProfileDataProps> = ({ user }) => {
  return (
    <div className="overflow-hidden rounded-md h-full">
      <div className="flex gap-5 items-center">
        <div className="z-30 h-28 w-28 rounded-full bg-white/20 p-1 backdrop-blur sm:p-3">
          <div className="relative drop-shadow-2">
            <img src={user?.profileImg || userSix} alt="profile" />

          </div>
        </div>
        <div className="mt-4 ">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white first-letter:uppercase">
            {user?.firstName} {user?.lastName}
          </h3>
          <div className="flex gap-2"> <span className='font-semibold'>Role: </span> <p className='first-letter:uppercase'>{user?.role}</p></div>
          <div className="">
            <p className="w-180">
              <span className='font-semibold'>Description: </span>
              {user?.description ? user.description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga asperiores non ab voluptate numquam provident autem similique laboriosam eum iusto?'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileData
import { UserRole } from '@/components/common/Interfaces'
import UserList from '.'

const PassengerList = () => {
    return (
        <div>
            <UserList forUserRole={UserRole.Passenger}/>
        </div>
      )
}

export default PassengerList
import UserList from '.'
import { UserRole } from '@/components/common/Interfaces'

const DriverList = () => {
  return (
    <div>
      <UserList forUserRole={UserRole.Driver} />
    </div>
  )
}

export default DriverList
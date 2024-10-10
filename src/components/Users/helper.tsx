import { FaCar, FaSitemap } from "react-icons/fa";
import { UserRole } from "../common/Interfaces";
import { IoDocumentAttach } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";

export const getUserProfileTabs = (role?: UserRole) => {
  const userProfileTabs = [];

  if (role === UserRole.Driver) {
    userProfileTabs.push(
      {
        key: 'd1',
        label: 'Document',
        Icon: <IoDocumentAttach />,
        title: 'Documents',
      },
      {
        key: 'd2',
        label: 'Cars',
        Icon: <FaCar />,
        title: 'Cars',
      },
      {
        key: 'd3',
        label: 'Driver Trip',
        Icon: <FaSitemap />,
        title: 'Driver Trip',
      },
      {
        key: 'd4',
        label: 'Bank Account',
        Icon: <MdEmojiTransportation />,
        title: 'Bank Account',
      },
      {
        key: 'd5',
        label: 'Driver Earning',
        Icon: <MdEmojiTransportation />,
        title: 'Driver Earning',
      }
    );
  }
  if (role === UserRole.Passenger) {
    userProfileTabs.push(
      {
        key: 'p1',
        label: 'Passenger Preferences',
        Icon: <MdEmojiTransportation />,
        title: 'Passenger Preferences',
      },
      {
        key: 'p2',
        label: 'Payment Card',
        Icon: <FaSitemap />,
        title: 'Payment Card',
      }
    );
  }

  return userProfileTabs;
};

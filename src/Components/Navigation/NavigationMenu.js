import { Home } from "@mui/icons-material"
import { Explore } from "@mui/icons-material"
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
export const navigationMenu= [

    {
        title:"Home",
        icon:<Home />,
        path:"/home"
    },
    {
        title:"Explore",
        icon:<Explore />,
        path:"/explore"
    },
    {
        title:"Notifications",
        icon:<NotificationsIcon/>,
        path:"/notification"
    },{
        title:"Messages",
        icon:<MessageIcon/>,
        path:"/Chats"
    }
    ,{
        title:"Lists",
        icon:<ListAltIcon/>,
        path:"/lists"
    },
    {
        title:"Communities",
        icon:<GroupIcon/>,
        path:"/communities"
    }
    
    ,{
        title:"Verified",
        icon:<VerifiedIcon/>,
        path:"/verify"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },

    {
        title:"More",
        icon:<PendingIcon/>,
        path:"/more"
    }
]
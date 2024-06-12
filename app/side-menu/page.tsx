'use client'
import {Box, Typography} from "@mui/material";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
//import {usePathname} from "next/navigation";
import {useState} from "react";

const Logo = () => (
    <Box
        p={2}
        display="flex"
        alignItems="center"
        sx={{
            backgroundColor: "#6573c3",
            textWrap: "nowrap"
        }}
    >
        <LocalConvenienceStoreIcon
            fontSize="large"
            sx={{
                color: "white",
                marginRight: "0.5rem"
            }}
        />
        <Typography
            variant="h5"
            component="span"
            sx={{
                color: "white"
            }}
        >
            Shop System
        </Typography>
    </Box>
)

export default function SideMenu() {
    //const pathname = usePathname()
    const [pathname, setPathname] = useState<string>('/');

    function getPageName() {
        switch (pathname) {
            case '/product':
                return 'Product'
            case '/work-schedule':
                return 'Work Schedule'
            case '/staff':
                return 'Staff'
            case '/system-setting':
                return 'System Setting'
            default:
                return ''
        }
    }

    return (
        <Box display="flex">
            <Box
                component="nav"
                height="100vh"
                bgcolor="primary"
                style={{
                    backgroundColor: "#7c88cc"
                }}
            >
                <Logo />
                <ul>
                    <Box
                        component="li"
                        pl={5}
                        py={2}
                        sx={{
                            borderBottom: '1px solid white',
                            '&:hover': {
                                opacity: 0.7
                            },
                            backgroundColor: pathname === '/product' ? '#afaffa' : 'transparent'
                        }}
                        onClick={() => setPathname('/product')}
                    >
                        <HomeRepairServiceIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: 'relative',
                                top: -3
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                                color: "white"
                            }}
                        >
                            Product
                        </Typography>
                    </Box>
                    <Box
                        component="li"
                        pl={5}
                        py={2}
                        sx={{
                            borderBottom: '1px solid white',
                            '&:hover': {
                                opacity: 0.7
                            },
                            backgroundColor: pathname === '/work-schedule' ? '#afaffa' : 'transparent'
                        }}
                        onClick={() => setPathname('/work-schedule')}
                    >
                        <CalendarMonthIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: 'relative',
                                top: -3
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                                color: "white"
                            }}
                        >
                            Work Schedule
                        </Typography>
                    </Box>
                    <Box
                        component="li"
                        pl={5}
                        py={2}
                        sx={{
                            borderBottom: '1px solid white',
                            '&:hover': {
                                opacity: 0.7
                            },
                            backgroundColor: pathname === '/staff' ? '#afaffa' : 'transparent'
                        }}
                        onClick={() => setPathname('/staff')}
                    >
                        <PeopleIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: 'relative',
                                top: -3
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                                color: "white"
                            }}
                        >
                            Staff
                        </Typography>
                    </Box>
                    <Box
                        component="li"
                        pl={5}
                        py={2}
                        sx={{
                            borderBottom: '1px solid white',
                            '&:hover': {
                                opacity: 0.7
                            },
                            backgroundColor: pathname === '/system-setting' ? '#afaffa' : 'transparent'
                        }}
                        onClick={() => setPathname('/system-setting')}
                    >
                        <BuildIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem",
                                position: 'relative',
                                top: -3
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            component="span"
                            sx={{
                                color: "white"
                            }}
                        >
                            System Setting
                        </Typography>
                    </Box>
                </ul>
            </Box>
            <Box
                component="main"
                sx={{
                    backgroundColor: "#fffafa"
                }}
                width="100%"
                m={2}
            >
                <Typography variant="h3" sx={{ color: "#6573c3"}}>
                    {
                        getPageName()
                    }
                </Typography>
            </Box>
        </Box>

    )
}
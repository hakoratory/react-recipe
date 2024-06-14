'use client'
import {Box, Typography} from "@mui/material";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
//import {usePathname} from "next/navigation";
import React, {MouseEventHandler, ReactElement, useState} from "react";
import {SvgIconComponent} from "@mui/icons-material";

const Logo = () => (
    <Box
        p={2}
        sx={{
            backgroundColor: "#6573c3",
            textWrap: "nowrap"
        }}
    >
        <LocalConvenienceStoreIcon
            fontSize="large"
            sx={{
                color: "white",
                marginRight: "0.5rem",
                position: 'relative',
                top: -5
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

const MenuIcon = ({MuiIcon}: {MuiIcon: SvgIconComponent}) => {
    const iconStyle = {
        color: "white",
        marginRight: "0.5rem",
        position: 'relative',
        top: -3
    }
    return (
        <MuiIcon fontSize="large" sx={{...iconStyle}}/>
    )
}

const MenuItem = ({itemName, onClick, Icon, isHighlight}: {itemName: string, onClick: MouseEventHandler<HTMLLIElement>, Icon: ReactElement, isHighlight: boolean}) => {
    return (
        <Box
            component="li"
            pl={5}
            py={2}
            sx={{
                borderBottom: '1px solid white',
                '&:hover': {
                    opacity: 0.7
                },
                backgroundColor: isHighlight ? '#afaffa' : 'transparent'
            }}
            onClick={onClick}
        >
            {Icon}
            <Typography
                variant="subtitle1"
                component="span"
                sx={{
                    color: "white"
                }}
            >
                {itemName}
            </Typography>
        </Box>
    )
}

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
                    <MenuItem
                        itemName="Product"
                        onClick={() => setPathname('/product')}
                        Icon={<MenuIcon MuiIcon={HomeRepairServiceIcon}/>}
                        isHighlight={pathname === '/product'}
                    />
                    <MenuItem
                        itemName="Work Schedule"
                        onClick={() => setPathname('/work-schedule')}
                        Icon={<MenuIcon MuiIcon={CalendarMonthIcon}/>}
                        isHighlight={pathname === '/work-schedule'}
                    />
                    <MenuItem
                        itemName="Staff"
                        onClick={() => setPathname('/staff')}
                        Icon={<MenuIcon MuiIcon={PeopleIcon}/>}
                        isHighlight={pathname === '/staff'}
                    />
                    <MenuItem
                        itemName="System Setting"
                        onClick={() => setPathname('/system-setting')}
                        Icon={<MenuIcon MuiIcon={BuildIcon}/>}
                        isHighlight={pathname === '/system-setting'}
                    />
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
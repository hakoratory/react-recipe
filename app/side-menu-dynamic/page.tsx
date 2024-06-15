'use client'
import {Box, Icon, Typography} from "@mui/material";
//import {usePathname} from "next/navigation";
import React, {MouseEventHandler, useState} from "react";

const Logo = () => (
    <Box
        p={2}
        sx={{
            backgroundColor: "#6573c3",
            textWrap: 'nowrap',
            display: 'flex',
            alignItems: 'center',
        }}
    >
        <Icon
            sx={{
                fontSize: '2rem',
                color: 'white',
                marginRight: "0.5rem",
            }}
        >
            local_convenience_store
        </Icon>
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

const menuItems = [
    {
        url: '/product',
        itemName: 'Product',
        icon: 'home_repair_service'
    },
    {
        url: '/work-schedule',
        itemName: 'Work Schedule',
        icon: 'calendar_month'
    },
    {
        url: '/staff',
        itemName: 'Staff',
        icon: 'people'
    },
    {
        url: '/system-setting',
        itemName: 'System Setting',
        icon: 'build'
    },
]

const MenuIcon = ({iconName}: { iconName: string }) => {
    const iconStyle = {
        fontSize: '1.8rem',
        color: "white",
        marginRight: "0.5rem",
    }
    return (
        <Icon sx={{...iconStyle}}>{iconName}</Icon>
    )
}

const MenuItem = ({itemName, onClick, iconName, isHighlight}: {
    itemName: string,
    onClick: MouseEventHandler<HTMLLIElement>,
    iconName: string,
    isHighlight: boolean
}) => {
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
                backgroundColor: isHighlight ? '#afaffa' : 'transparent',
                display: 'flex',
                alignItems: 'center',
            }}
            onClick={onClick}
        >
            <MenuIcon iconName={iconName}/>
            <Typography
                variant="subtitle1"
                component="span"
                sx={{
                    color: "white",
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
                <Logo/>
                <ul>
                    {
                        menuItems.map((menuItem, index) => (
                            <MenuItem
                                key={index}
                                itemName={menuItem.itemName}
                                onClick={() => setPathname(menuItem.url)}
                                iconName={menuItem.icon}
                                isHighlight={pathname === menuItem.url}
                            />
                        ))
                    }
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
                <Typography variant="h3" sx={{color: "#6573c3"}}>
                    {
                        getPageName()
                    }
                </Typography>
            </Box>
        </Box>

    )
}
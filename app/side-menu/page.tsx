import {Box, Typography} from "@mui/material";
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';

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
    return (
        <Box display="flex">
            <Box
                component="nav"
                display="flex"
                flexDirection="column"
                height="100vh"
                bgcolor="primary"
                style={{
                    backgroundColor: "#7c88cc"
                }}
            >
                <Logo />
                <ul>
                    <Box component="li" display="flex" alignItems="center" ml={3} my={3}>
                        <HomeRepairServiceIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem"
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
                    <Box component="li" display="flex" alignItems="center" ml={3} my={3}>
                        <CalendarMonthIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem"
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
                    <Box component="li" display="flex" alignItems="center" ml={3} my={3}>
                        <PeopleIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem"
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
                    <Box component="li" display="flex" alignItems="center" ml={3} my={3}>
                        <BuildIcon
                            fontSize="large"
                            sx={{
                                color: "white",
                                marginRight: "0.5rem"
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
                <Typography variant="h3" sx={{ color: "#6573c3"}}>Product</Typography>
            </Box>
        </Box>

    )
}
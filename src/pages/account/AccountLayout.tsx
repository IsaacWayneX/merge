import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
// import SideNav from '@/components/account/SideNav';
import Stack from '@mui/material/Stack';

// import AccountHeaderComponent from '@/components/AccountHeader';
import { useUserStore } from '@/state/userStore';
import Container from '@mui/material/Container';
import SideNav from '@/components/sunday/SideNav';
import kolors from '@/constants/kolors';


const AccountLayout = () => {
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    if (!isLoggedIn) return <Navigate replace to={"/auth/login"} />;

    const [value, setValue] = useState(1);

    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname.includes("admin/users")) setValue(2);
        if (pathname.includes("admin/products")) setValue(3);
        // if (pathname.includes("admin/store")) setValue(4);
        if (pathname.includes("admin/marketing")) setValue(5);
        if (pathname.includes("admin/ad-manager")) setValue(6);
        // if (pathname.includes("admin/coupon")) setValue(7);
        // if (pathname.includes("admin/contacts")) setValue(8);
        if (pathname.includes("admin/merchant")) setValue(9);
        // Isaac's paths
        if (pathname.includes("admin/store")) setValue(10);
        if (pathname.includes("admin/library")) setValue(11);
        if (pathname.includes("admin/bonded")) setValue(12);
        if (pathname.includes("admin/dates")) setValue(13);
        if (pathname.includes("admin/places")) setValue(14);
    }, [pathname]);


    const menuItems = [
        {
            title: 'Dashboard',
            status: value == 1 ? true : false,
            baseLink: "/admin/"
        },
        {
            title: 'Users',
            status: value == 2 ? true : false,
            baseLink: "/admin/users"
        },
        {
            title: 'Products',
            status: value == 3 ? true : false,
            baseLink: "/admin/products"
        },
        {
            title: 'Marketing',
            status: value == 5 ? true : false,
            baseLink: "/admin/marketing"
        },
        {
            title: 'Ad Manager',
            status: value == 6 ? true : false,
            baseLink: "/admin/ad-manager"
        },
        {
            title: 'Merchant',
            status: value == 9 ? true : false,
            baseLink: "/admin/merchant"
        },
        // Isaacs
        {
            title: 'Store',
            status: value == 10 ? true : false,
            baseLink: "/admin/store"
        },
        {
            title: 'Library',
            status: value == 11 ? true : false,
            baseLink: "/admin/library"
        },
        {
            title: 'Bonded',
            status: value == 12 ? true : false,
            baseLink: "/admin/bonded"
        },
        {
            title: 'Dates',
            status: value == 13 ? true : false,
            baseLink: "/admin/dates"
        },
        {
            title: 'Places',
            status: value == 14 ? true : false,
            baseLink: "/admin/places"
        },
       
    ];


    return (
        <Stack direction="row" justifyContent="space-between"
            bgcolor={kolors.bg}
        >
            <Box sx={{ display: {xs: "none", md: "initial"} }} >
                <SideNav 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                />
            </Box>

            <Container component="main" maxWidth="lg"
                sx={{ 
                    maxWidth: { xs: "100vw", md: "calc(100vw - 233px)" },
                }}
            >
                {/* <AccountHeaderComponent 
                    menuItems={menuItems} 
                    value={value}
                    setValue={setValue}
                /> */}
                
                <Box>
                    <Outlet />
                </Box>
            </Container>
        </Stack>
    );
};

export default AccountLayout;
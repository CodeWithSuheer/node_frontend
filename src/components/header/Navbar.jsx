import { useNavigate } from 'react-router-dom';
import React from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { logoutuserAsync, setAuthenticated } from '../../features/authSlice.jsx';

export default function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.auth.userDetails);
    const loading = useSelector((state) => state.auth.loading);

    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        try {
            await dispatch(logoutuserAsync());
            dispatch(setAuthenticated(false));
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }


    const menuItems = [
        "Log Out",
    ];

    return (
        <Navbar disableAnimation isBordered>
            {/* <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent> */}

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    {/* <img src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/Untitled_design_1.png?v=1709215783" alt="" className='h-14 mr-0' /> */}
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center" style={{ maxWidth: '100%' }}>
                <NavbarBrand className='cursor-pointer' onClick={() => navigate("/")}>
                    <img src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/Untitled_design_1.png?v=1709215783" alt="" className='h-20 mr-4' />
                </NavbarBrand>
                {/* <NavbarItem>
                    <Link color="foreground" href="#">
                        Products
                    </Link>
                </NavbarItem> */}
            </NavbarContent>

            <NavbarContent justify="end">
                {user ? (
                    <NavbarItem>
                        <Button onClick={handleLogout} isLoading={loading} color="warning" variant="flat" style={{ outline: 'none' }}>
                            Logout
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem>
                            <Button onClick={() => navigate("login")} as={Link} color="primary" variant="flat" style={{ outline: 'none' }}>
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button onClick={() => navigate("signup")} as={Link} color="warning" variant="flat" style={{ outline: 'none' }}>
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

import { useState } from 'react';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import AuthService from '../services/auth.service';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const user = AuthService.getCurrentUser();
    const isCustomer = !user ? false : user.roles.includes("ROLE_USER");
    const isAdmin = !user ? false : user.roles.includes("ROLE_ADMIN");

    function logOut() {
        AuthService.logout();
    }

    return (
        <Navbar color="transparent" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="/"
                        rel="noreferrer"
                    >
                        <div className="flex items-center flex-shrink-0 text-white mr-6">
                            <span className="font-semibold text-xl tracking-tight">EthnicEats</span>
                        </div>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                            {user || isCustomer ? (
                                <>
                                    <NavLink
                                        href="/home"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        href="/cart"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        Cart
                                    </NavLink>
                                    <NavLink
                                        href="/account"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        Account
                                    </NavLink>
                                    {isAdmin ? (
                                        <>
                                            <NavLink
                                                href="/add"
                                                rel="noreferrer"
                                                ripple="light"
                                            >
                                                Add Product
                                            </NavLink>
                                        </>
                                    ) : (<></>)}
                                    <NavLink
                                        href="/login"
                                        rel="noreferrer"
                                        ripple="light"
                                        onClick={logOut}
                                    >
                                        LogOut
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        href="/register"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        Register
                                    </NavLink>
                                    <NavLink
                                        href="/login"
                                        rel="noreferrer"
                                        ripple="light"
                                    >
                                        Login
                                    </NavLink>
                                </>
                            )
                            }
                            <NavLink
                                href="/contact"
                                rel="noreferrer"
                                ripple="light"
                            >
                                Contact
                            </NavLink>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}

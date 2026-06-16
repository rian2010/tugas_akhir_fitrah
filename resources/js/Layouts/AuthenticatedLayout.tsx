import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

type User = {
    name: string;
    email: string;
};

type PageProps = {
    auth: {
        user: User;
        roles: string[];
    };
};

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {

    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const roles: string[] = auth.roles; // Direct assignment since it's already an array

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const hasRole = (role: string) => roles.includes(role);

    const navItems = [
        {
            label: 'Dashboard',
            routeName: 'rt.index',
            roles: ['rt'],
        },
        {
            label: 'Dashboard',
            routeName: 'warga.index',
            roles: ['warga'],
        },
        {
            label: 'Data Warga',
            routeName: 'data.index',
            roles: ['warga'],
        },
        {
            label: 'Surat',
            routeName: 'surat.index',
            roles: ['warga'],
        },
        {
            label: 'Riwayat Pengajuan',
            routeName: 'riwayat.index',
            roles: ['warga'],
        },
        {
            label: 'Pendataan Warga',
            routeName: 'data-warga.index',
            roles: ['rt'],
        },
        {
            label: 'Verifikasi Surat',
            routeName: 'verifikasi-surat.index',
            roles: ['rt']
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <img src='/images/logo.jpeg' className='w-16 h-16' />
                                </Link>
                            </div>
                            <div className="hidden sm:flex sm:ms-10 sm:space-x-8">
                                {navItems.map((item) => {
                                    const allowed = item.roles.some(role => hasRole(role));
                                    if (!allowed) return null;
                                    return (
                                        <NavLink
                                            key={item.routeName}
                                            href={route(item.routeName)}
                                            active={route().current(item.routeName)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
                                        {user.name}
                                        <svg className="ms-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    {showingNavigationDropdown ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {showingNavigationDropdown && (
                    <div className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            {navItems.map((item) => {
                                const allowed = item.roles.some(role => hasRole(role));
                                if (!allowed) return null;
                                return (
                                    <ResponsiveNavLink
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        active={route().current(item.routeName)}
                                    >
                                        {item.label}
                                    </ResponsiveNavLink>
                                );
                            })}
                        </div>
                        <div className="border-t border-gray-200 pt-4 pb-1">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

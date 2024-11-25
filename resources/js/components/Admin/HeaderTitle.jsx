import { Head, usePage } from '@inertiajs/react';

const HeaderTitle = () => {
    const defaultTitle = "Admin panel - Quick CMS";
    const { url } = usePage();

    const title = () => {
        if (url.endsWith('/admin')) {
            return "Dashboard - Quick CMS";
        }
        if (url.includes('/admin/users')) {
            return "Users - Quick CMS";
        }
        if (url.includes('/admin/albums')) {
            return "Albums - Quick CMS";
        }
        if (url.includes('/admin/album_categories')) {
            return "Album categories - Quick CMS";
        }
        if (url.includes('/admin/pages')) {
            return "Pages - Quick CMS";
        }
        if (url.includes('/admin/products')) {
            return "Products - Quick CMS";
        }
        if (url.includes('/admin/categories')) {
            return "Categories - Quick CMS";
        }
        if (url.includes('/admin/orders')) {
            return "Orders - Quick CMS";
        }
        if (url.includes('/admin/shipping-methods')) {
            return "Shipping - Quick CMS";
        }
        if (url.includes('/admin/files')) {
            return "Files - Quick CMS";
        }
        if (url.includes('/admin/settings')) {
            return "Settings - Quick CMS";
        }
        if (url.includes('/admin/profile')) {
            return "Profile - Quick CMS";
        }
        if (url.includes('/login')) {
            return "Login - Quick CMS";
        }
        if (url.includes('/register')) {
            return "Register - Quick CMS";
        }
        if (url.includes('/password/reset')) {
            return "Reset password - Quick CMS";
        }
        return defaultTitle;
    }

    return (
        <>
            <Head>
                <title>{title()}</title>
            </Head>
        </>
    )
}

export default HeaderTitle
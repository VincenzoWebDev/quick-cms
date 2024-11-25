import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from "@/components/Admin/AlertErrors";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const ArticlesContent = () => {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);
    return (
        <Layout>
            <h2>Articoli</h2>
            <AlertErrors message={message} />
        </Layout>
    )
}

export default ArticlesContent;
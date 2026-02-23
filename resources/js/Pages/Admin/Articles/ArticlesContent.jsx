import Layout from "@/Layouts/Admin/Layout";
import AlertErrors from "@/components/Admin/AlertErrors";
import { SectionHeader } from "@/components/Admin/Index";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const ArticlesContent = () => {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash.message);
    return (
        <Layout>
            <SectionHeader
                title="Articoli"
                subtitle="Sezione editoriale del pannello amministrativo."
            />
            <AlertErrors message={message} />
        </Layout>
    )
}

export default ArticlesContent;

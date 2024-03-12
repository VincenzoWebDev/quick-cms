import Layout from "@/Layouts/Admin/Layout";
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import { Editor } from "@tinymce/tinymce-react";
import { EDITOR_CONFIG, API_KEY_EDITOR } from '@/constants/constants.js';

const PageEdit = ({ page, user_auth }) => {
    const { data, setData, patch, errors } = useForm({
        title: page.title,
        content_editor: page.content ?? '',
        meta_title: page.meta_title ?? '',
        meta_description: page.meta_description ?? '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleEditorChange = (content, editor) => {
        setData('content_editor', content);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('pages.update', page.id));
    }

    return (
        <Layout user_auth={user_auth}>
            <h2>Modifica pagina</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Nome pagina</label>
                    <input type="text" name="title" id="title" className="form-control" value={data.title}
                        placeholder="Nome pagina" onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <Editor apiKey={API_KEY_EDITOR}
                        init={EDITOR_CONFIG}
                        onEditorChange={handleEditorChange}
                        value={data.content_editor}
                    />
                </div>

                {/* <div className="mb-3">
                    <label htmlFor="content">Descrizione</label>
                    <textarea name="content" id="content_editor" className="form-control" placeholder="Descrizione" value={data.content} onChange={handleInputChange}></textarea>
                </div> */}

                <div className="mb-3">
                    <label htmlFor="meta_title">Meta title</label>
                    <input type="text" name="meta_title" id="meta_title" className="form-control" placeholder="Meta title"
                        value={data.meta_title} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="meta_description">Meta description</label>
                    <input type="text" name="meta_description" id="meta_description" className="form-control"
                        placeholder="Meta description" value={data.meta_description} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <button className="btn cb-primary me-3">Modifica</button>
                    <Link href={route('pages.index')} className="btn btn-secondary">Torna indietro</Link>
                </div>
            </form>
        </Layout>
    );
}

export default PageEdit;
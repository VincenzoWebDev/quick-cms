import React from 'react';
import Layout from "@/Layouts/Admin/Layout";
import { Link, useForm } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import { Editor } from "@tinymce/tinymce-react";
import { EDITOR_CONFIG, API_KEY_EDITOR } from '@/constants/constants.js';

const PageCreate = ({ user_auth }) => {

    const { data, setData, post, errors } = useForm({
        title: '',
        content_editor: '',
        meta_title: '',
        meta_description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    }

    const handleEditorChange = (content, editor) => {
        setData('content_editor', content);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pages.store'), { ...data, content_editor: content });
    }

    return (
        <Layout user_auth={user_auth}>
            <h2>Inserisci una nuova pagina</h2>
            <InputErrors errors={errors} />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title">Nome pagina</label>
                    <input type="text" name="title" id="title" className="form-control" placeholder="Titolo pagina"
                        value={data.title} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <Editor apiKey={API_KEY_EDITOR} initialValue=''
                        init={EDITOR_CONFIG}
                        onEditorChange={handleEditorChange}
                    />
                </div>
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
                    <button className="btn cb-primary me-3">Inserisci</button>
                    <Link href={route('pages.index')} className="btn btn-secondary">Torna indietro</Link>
                </div>
            </form>
        </Layout >
    )
}

export default PageCreate;
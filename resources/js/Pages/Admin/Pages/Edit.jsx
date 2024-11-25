import Layout from "@/Layouts/Admin/Layout";
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import InputErrors from '@/components/Admin/InputErrors';
import { Editor } from "@tinymce/tinymce-react";
import { EDITOR_CONFIG, API_KEY_EDITOR } from '@/constants/constants.js';

const PageEdit = ({ page, pageLayout }) => {
    const { data, setData, patch, errors, processing } = useForm({
        title: page.title,
        content_editor: page.content ?? '',
        layout_id: page.layout_id ?? '',
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
        <Layout>
            <h2>Modifica pagina</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title">Nome pagina</label>
                            <input type="text" name="title" id="title" className="form-control" value={data.title}
                                placeholder="Nome pagina" onChange={handleInputChange} />
                        </div>

                        <div className="mb-3">
                            <label>Descrizione</label>
                            <Editor apiKey={API_KEY_EDITOR}
                                init={EDITOR_CONFIG}
                                onEditorChange={handleEditorChange}
                                value={data.content_editor}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="layout_id">Layout</label>
                            <select name="layout_id" id="layout_id" className="form-select"
                                value={data.layout_id} onChange={handleInputChange}>
                                {pageLayout.map((layout) => (
                                    <option key={layout.id} value={layout.id}>{layout.name}</option>
                                ))}
                            </select>
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
                            <button className="btn cb-primary me-3" disabled={processing}>{processing ? 'In corso...' : 'Modifica'}</button>
                            <Link href={route('pages.index')} className="btn btn-secondary">Torna indietro</Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    );
}

export default PageEdit;
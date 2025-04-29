import Layout from "@/Layouts/Admin/Layout";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { InputErrors } from "@/components/Admin/Index";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Edit = ({ pageLayout }) => {
    const { errors, flash } = usePage().props;
    useEffect(() => {
        if (flash?.message) {
            if (flash.message.tipo === "success") {
                toast.success(flash.message.testo);
            } else if (flash.message.tipo === "danger") {
                toast.error(flash.message.testo);
            }
        }
    }, [flash]);

    const { data, setData } = useForm({
        name: pageLayout.name,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("settings.layouts.update", pageLayout.id), {
            ...data,
            _method: "patch",
            forceFormData: true,
        });
    };

    return (
        <Layout>
            <h2>Modifica layout</h2>
            <InputErrors errors={errors} />

            <div className="row">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Nome layout"
                                value={data.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <button className="btn cb-primary me-3">
                                Modifica
                            </button>
                            <Link
                                href={route("settings.layouts.index")}
                                className="btn btn-secondary"
                            >
                                Torna indietro
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </Layout>
    );
};
export default Edit;

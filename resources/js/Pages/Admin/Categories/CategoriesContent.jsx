import { ButtonDelete, ButtonEdit, AlertErrors, CategoryDelete, CategoryDeleteSelected, SectionHeader } from "@/components/Admin/Index";
import Layout from "@/Layouts/Admin/Layout"
import { useState, useEffect } from "react"
import { Link, useForm } from "@inertiajs/react";

const CategoriesContent = ({ categories, flash }) => {

    const { delete: formDelete } = useForm();
    const [message, setMessage] = useState(flash.message);
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [, setSelectAll] = useState(false);
    const [selectedParent, setSelectedParent] = useState('');
    const [parentQuery, setParentQuery] = useState('');
    const [childQuery, setChildQuery] = useState('');
    const selectedParentCategory = categories.find(category => category.id === parseInt(selectedParent, 10));
    const parentCategoryIds = categories.map(category => category.id);
    const selectedParentChildren = selectedParentCategory?.children || [];
    const selectedParentChildIds = selectedParentChildren.map(child => child.id);
    const filteredParentCategories = categories.filter(category =>
        category.name.toLowerCase().includes(parentQuery.toLowerCase())
    );
    const filteredChildren = selectedParentChildren.filter(child =>
        child.name.toLowerCase().includes(childQuery.toLowerCase())
    );
    const isAllParentsChecked = parentCategoryIds.length > 0 && parentCategoryIds.every(id => selectedRecords.includes(id));
    const isAllChildrenChecked = selectedParentChildIds.length > 0 && selectedParentChildIds.every(id => selectedRecords.includes(id));

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const handleCheckboxChange = (e, categoryId) => {
        if (e.target.checked) {
            setSelectedRecords(prevSelectedRecords => [...new Set([...prevSelectedRecords, categoryId])]);
        } else {
            setSelectedRecords(prevSelectedRecords => prevSelectedRecords.filter(id => id !== categoryId));
        }
    };

    const handleSelectAllCatChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setSelectedRecords(prevSelectedRecords => {
            if (isChecked) {
                return [...new Set([...prevSelectedRecords, ...parentCategoryIds])];
            }
            return prevSelectedRecords.filter(id => !parentCategoryIds.includes(id));
        });
    };

    const handleSelectAllChildChange = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        setSelectedRecords(prevSelectedRecords => {
            if (isChecked) {
                return [...new Set([...prevSelectedRecords, ...selectedParentChildIds])];
            }
            return prevSelectedRecords.filter(id => !selectedParentChildIds.includes(id));
        });
    };

    // funzione per eliminare una categoria
    const handleDelete = (e) => {
        CategoryDelete({ e, formDelete, setMessage })
    }

    // funzione per eliminare le categorie selezionate
    const handleDeleteSelected = (e) => {
        CategoryDeleteSelected({ e, formDelete, setMessage, selectedRecords, setSelectedRecords, setSelectAll })
    }

    return (
        <Layout>
            <SectionHeader
                title="Categorie"
                subtitle="Gestisci categorie principali e sotto-categorie dello shop."
                primaryAction={
                    <Link href={route('categories.create')} className="btn cb-primary">
                        Inserisci una nuova categoria
                    </Link>
                }
                showBulkAction={selectedRecords.length > 0}
                bulkCount={selectedRecords.length}
                onBulkAction={handleDeleteSelected}
            />
            <AlertErrors message={message} />

            <div className="row g-4 categories-page">
                <div className="col-xl-5 col-lg-6">
                    <div className="card shadow-2-strong categories-scroll-card categories-panel-card">
                        <div className="card-body">
                            <div className="categories-panel-head">
                                <div>
                                    <h5>Categorie principali</h5>
                                    <small>Seleziona una categoria per gestire i figli</small>
                                </div>
                                <span className="categories-count-pill">{categories.length}</span>
                            </div>

                            <div className="categories-parent-toolbar">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={handleSelectAllCatChange}
                                        checked={isAllParentsChecked}
                                    />
                                    <label className="form-check-label">Seleziona tutte</label>
                                </div>

                                <div className="categories-search-box">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Cerca categoria padre..."
                                        value={parentQuery}
                                        onChange={(e) => setParentQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {filteredParentCategories.length > 0 ? (
                                <div className="categories-parent-list">
                                    {filteredParentCategories.map(category => (
                                        <div
                                            key={category.id}
                                            className={`categories-parent-item ${selectedParentCategory?.id === category.id ? 'is-active' : ''}`}
                                        >
                                            <div className="categories-parent-main">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={category.id}
                                                        onChange={(e) => handleCheckboxChange(e, category.id)}
                                                        checked={selectedRecords.includes(category.id)}
                                                    />
                                                </div>

                                                <button
                                                    type="button"
                                                    className="categories-parent-open"
                                                    onClick={() => setSelectedParent(String(category.id))}
                                                >
                                                    <div className="categories-parent-meta">
                                                        <strong>{category.name}</strong>
                                                        <small>ID #{category.id}</small>
                                                    </div>
                                                    <span className="categories-child-count">
                                                        {category.children.length} figli
                                                    </span>
                                                </button>
                                            </div>

                                            <div className="action-buttons">
                                                <Link href={route('categories.edit', category.id)} className="action-icon-link">
                                                    <ButtonEdit />
                                                </Link>
                                                <form onSubmit={handleDelete} className="d-inline" id={category.id}>
                                                    <ButtonDelete />
                                                </form>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='categories-empty-state categories-empty-state-compact'>
                                    <i className="fa-regular fa-folder-open"></i>
                                    <span>Nessuna categoria trovata</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-xl-7 col-lg-6">
                    <div className="card shadow-2-strong categories-scroll-card categories-panel-card">
                        <div className="card-body">
                            <div className="categories-panel-head">
                                <div>
                                    <h5>Sotto-categorie</h5>
                                    <small>Gestione dettagliata delle categorie figlie</small>
                                </div>
                                <span className="categories-count-pill">{filteredChildren.length}</span>
                            </div>

                            <div className="categories-filter-wrap">
                                <label htmlFor="cat" className="form-label mb-1">Categoria padre</label>
                                <select name="cat" id="cat" className="form-select" value={selectedParent}
                                    onChange={(e) => {
                                        setSelectedParent(e.target.value);
                                    }}>
                                    <option value=''>Seleziona una categoria</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedParentCategory && (
                                <div className="categories-selected-parent">
                                    <span>Categoria selezionata:</span>
                                    <strong>{selectedParentCategory.name}</strong>
                                </div>
                            )}

                            {selectedParentCategory && (
                                <div className="categories-child-toolbar">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            onChange={handleSelectAllChildChange}
                                            checked={isAllChildrenChecked}
                                        />
                                        <label className="form-check-label">Seleziona tutti i figli</label>
                                    </div>

                                    <div className="categories-search-box">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cerca sotto-categoria..."
                                            value={childQuery}
                                            onChange={(e) => setChildQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {selectedParentCategory && filteredChildren.length > 0 ? (
                                <div className="table-responsive admin-table-shell">
                                    <table className="table table-hover mb-0 admin-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <div className="form-check d-flex justify-content-center align-items-center">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            onChange={handleSelectAllChildChange}
                                                            checked={isAllChildrenChecked}
                                                        />
                                                    </div>
                                                </th>
                                                <th scope="col">Id</th>
                                                <th scope="col">Sotto-categoria</th>
                                                <th scope="col" className="text-center">Operazioni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredChildren.map(child => (
                                                <tr key={child.id} className="align-middle">
                                                    <th scope="row" className='col-md-2 py-1'>
                                                        <div className="form-check d-flex justify-content-center align-items-center">
                                                            <input className="form-check-input" type="checkbox" value={child.id}
                                                                onChange={(e) => handleCheckboxChange(e, child.id)}
                                                                checked={selectedRecords.includes(child.id)} />
                                                        </div>
                                                    </th>
                                                    <th scope="row" className='col-md-2 py-1'>{child.id}</th>
                                                    <td scope="row" className='col-md-4 py-1'>{child.name}</td>
                                                    <td scope="row" className="text-center col-md-4 py-1">
                                                        <div className="action-buttons justify-content-center">
                                                            <Link href={route('categories.edit', child.id)} className="action-icon-link">
                                                                <ButtonEdit />
                                                            </Link>
                                                            <form onSubmit={handleDelete} className="d-inline" id={child.id}>
                                                                <ButtonDelete />
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='categories-empty-state'>
                                    <i className="fa-regular fa-folder-open"></i>
                                    {!selectedParentCategory && <span>Seleziona una categoria padre</span>}
                                    {selectedParentCategory && <span>Nessuna sotto-categoria disponibile</span>}
                                    {!selectedParentCategory && <small>Scegli una categoria dalla colonna sinistra per iniziare</small>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoriesContent

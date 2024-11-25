import { CategoryCombo } from "@/components/Admin/Index";
import { usePage } from "@inertiajs/react";
const InfoTab = ({ data, handleChange, categories, selectedFatherCat, selectedChildCat, handleCatsChange }) => {
    const url = usePage().url;

    return (
        <div className={`tab-pane fade active show`} id="info-tab-pane" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Nome prodotto</label>
                <input type="text" name="name" id="name" className="form-control" placeholder="Nome prodotto" value={data.name || ''} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">Descrizione</label>
                <textarea name="description" id="description" className="form-control" placeholder="Descrizione" value={data.description || ''} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label fw-bold">Prezzo</label>
                <input type="number" name="price" id="price" className="form-control" placeholder="Prezzo" autoComplete="current-price" value={data.price || ''} onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="stock" className="form-label fw-bold">Stock</label>
                {url.endsWith('edit') ? null : <label className="form-label text-muted">&nbsp;- Lascia "0" se ci sono varianti</label>}
                <input type="number" name="stock" id="stock" className="form-control" placeholder="Stock" autoComplete="current-stock" value={data.stock || ''} onChange={handleChange} />
            </div>

            <CategoryCombo categories={categories} selectedFatherCat={selectedFatherCat} selectedChildCat={selectedChildCat} handleCatsChange={handleCatsChange} />
        </div>
    )
}

export default InfoTab;

const SeoTab = ({ data, handleSeoChange }) => {
    const MAX_TITLE_LENGTH = 60;
    const MAX_DESCRIPTION_LENGTH = 160;
    const MAX_KEYWORDS_WORDS = 10;

    const countWords = (text) => text.split(',').map(word => word.trim()).filter(word => word.length > 0).length;

    return (
        <div className={`tab-pane fade show`} id="seo-tab-pane" role="tabpanel" aria-labelledby="seo-tab" tabIndex="0">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="meta_title" className="form-label fw-bold">Meta title</label>
                        <input type="text" name="meta_title" id="meta_title" className="form-control" placeholder="Meta title" value={data.meta_title || ''} onChange={handleSeoChange}
                            maxLength={MAX_TITLE_LENGTH} />
                        <p>{data.meta_title != null ? data.meta_title.length : 0}/{MAX_TITLE_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="meta_description" className="form-label fw-bold">Meta description</label>
                        <textarea name="meta_description" id="meta_description" className="form-control" placeholder="Meta description" value={data.meta_description || ''} onChange={handleSeoChange}
                            maxLength={MAX_DESCRIPTION_LENGTH} />
                        <p>{data.meta_description != null ? data.meta_description.length : 0}/{MAX_DESCRIPTION_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="meta_keywords" className="form-label fw-bold">Meta keywords</label>
                        <input type="text" name="meta_keywords" id="meta_keywords" className="form-control" placeholder="Meta keywords" value={data.meta_keywords || ''} onChange={handleSeoChange} />
                        <p>{data.meta_keywords != null ? countWords(data.meta_keywords) : 0}/{MAX_KEYWORDS_WORDS} parole</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="canonical_url" className="form-label fw-bold">Url canonico</label>
                        <input type="text" name="canonical_url" id="canonical_url" className="form-control" placeholder="Url canonico" value={data.canonical_url || ''} onChange={handleSeoChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="og_title" className="form-label fw-bold">og title</label>
                        <input type="text" name="og_title" id="og_title" className="form-control" placeholder="og title" value={data.og_title || ''} onChange={handleSeoChange}
                            maxLength={MAX_TITLE_LENGTH} />
                        <p>{data.og_title != null ? data.og_title.length : 0}/{MAX_TITLE_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="og_description" className="form-label fw-bold">og description</label>
                        <textarea name="og_description" id="og_description" className="form-control" placeholder="og description" value={data.og_description || ''} onChange={handleSeoChange}
                            maxLength={MAX_DESCRIPTION_LENGTH} />
                        <p>{data.og_description != null ? data.og_description.length : 0}/{MAX_DESCRIPTION_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="og_image" className="form-label fw-bold">og image</label>
                        <input type="text" name="og_image" id="og_image" className="form-control" placeholder="og image" value={data.og_image || ''} onChange={handleSeoChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="twitter_title" className="form-label fw-bold">twitter title</label>
                        <input type="text" name="twitter_title" id="twitter_title" className="form-control" placeholder="twitter title" value={data.twitter_title || ''} onChange={handleSeoChange}
                            maxLength={MAX_TITLE_LENGTH} />
                        <p>{data.twitter_title != null ? data.twitter_title.length : 0}/{MAX_TITLE_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="twitter_description" className="form-label fw-bold">twitter description</label>
                        <textarea name="twitter_description" id="twitter_description" className="form-control" placeholder="twitter description" value={data.twitter_description || ''} onChange={handleSeoChange}
                            maxLength={MAX_DESCRIPTION_LENGTH} />
                        <p>{data.twitter_description != null ? data.twitter_description.length : 0}/{MAX_DESCRIPTION_LENGTH} caratteri</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="twitter_image" className="form-label fw-bold">twitter image</label>
                        <input type="text" name="twitter_image" id="twitter_image" className="form-control" placeholder="twitter image" value={data.twitter_image || ''} onChange={handleSeoChange} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SeoTab;
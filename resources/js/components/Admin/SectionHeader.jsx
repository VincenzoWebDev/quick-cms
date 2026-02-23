const SectionHeader = ({
  title,
  subtitle,
  primaryAction = null,
  showBulkAction = false,
  bulkActionLabel = 'Elimina selezionati',
  bulkCount = 0,
  onBulkAction,
}) => {
  return (
    <section className="page-hero admin-section-hero mb-3">
      <div className="admin-section-header">
        <div className="admin-section-title-wrap">
          <h2>{title}</h2>
          {subtitle && <p className="admin-section-subtitle">{subtitle}</p>}
        </div>

        <div className="admin-section-actions">
          {primaryAction}
          <button
            type="button"
            className={`btn btn-danger admin-bulk-btn ${showBulkAction ? 'is-visible' : ''}`}
            onClick={onBulkAction}
            disabled={!showBulkAction}
            aria-hidden={!showBulkAction}
          >
            {bulkActionLabel}
            {bulkCount > 0 ? ` (${bulkCount})` : ''}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;

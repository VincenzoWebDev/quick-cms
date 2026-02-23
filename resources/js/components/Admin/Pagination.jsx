import { Link, useForm } from '@inertiajs/react';

const Pagination = ({ links, sortBy, sortDirection, perPage, q, rotta }) => {
  const { get } = useForm();

  const handlePageChange = (url, sortBy, sortDirection, perPage, q) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const page = urlParams.get('page') || 1;
    get(route(rotta, { page, sortBy, sortDirection, perPage, q }), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const maxPagesToShow = 5;
  const trimmedLinks = links.slice(1, -1);
  const activeIndex = trimmedLinks.findIndex((link) => link.active);
  const firstIndex = Math.max(0, activeIndex - Math.floor(maxPagesToShow / 2));
  const lastIndex = Math.min(trimmedLinks.length - 1, firstIndex + maxPagesToShow - 1);
  const previousLink = links[0];
  const nextLink = links[links.length - 1];

  return (
    <div className="d-flex justify-content-center my-3 pagination">
      {previousLink && (
        <Link
          preserveScroll
          href={previousLink.url || '#'}
          className="mx-1 btn cb-primary"
          onClick={(e) => {
            e.preventDefault();
            if (previousLink.url) {
              handlePageChange(previousLink.url, sortBy, sortDirection, perPage, q);
            }
          }}
        >
          {previousLink.label.replace(/&laquo; Precedente/g, '<')}
        </Link>
      )}

      {trimmedLinks.slice(firstIndex, lastIndex + 1).map((link, index) => (
        <Link
          preserveScroll
          key={index}
          href={link.url || '#'}
          className={`${link.active ? 'active' : ''} mx-1 btn cb-primary`}
          onClick={(e) => {
            e.preventDefault();
            if (link.url) {
              handlePageChange(link.url, sortBy, sortDirection, perPage, q);
            }
          }}
        >
          {link.label}
        </Link>
      ))}

      {nextLink && (
        <Link
          preserveScroll
          href={nextLink.url || '#'}
          className="mx-1 btn cb-primary"
          onClick={(e) => {
            e.preventDefault();
            if (nextLink.url) {
              handlePageChange(nextLink.url, sortBy, sortDirection, perPage, q);
            }
          }}
        >
          {nextLink.label.replace(/Successiva &raquo;/g, '>')}
        </Link>
      )}
    </div>
  );
};

export default Pagination;

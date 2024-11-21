import { ArrowIosBack, ArrowIosForward} from '@momecap/ui-kit-snapmoment'
import { usePagination } from '@/shared/ui/pagination/hooks/usePaginationLogic';

import s from './Pagination.module.scss';

import { PageLink } from './pageLink/PageLink';

type Props = {
  pageNumber: number;
  // eslint-disable-next-line no-unused-vars
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
};

export const Pagination = ({ pageNumber, setPageNumber, totalPages }: Props) => {
  const pageNumbers = usePagination({
    pageNumber,
    totalPages
  });

  return (
    <div aria-label={'Pagination'} className={s.pagination}>
      <PageLink className={s.icon} disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>
        <ArrowIosBack />
      </PageLink>
      {pageNumbers.map((pageNum, index) => {
        return (
          <PageLink
            active={pageNum === pageNumber}
            disabled={isNaN(pageNum)}
            key={index}
            onClick={() => setPageNumber(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum.toString() : '...'}
          </PageLink>
        );
      })}
      <PageLink
        className={s.icon}
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        <ArrowIosForward />
      </PageLink>
    </div>
  );
};

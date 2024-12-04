import { useMemo } from 'react';

type UsePaginationArgs = {
  pageNumber: number;
  totalPages: number;
};
export const usePagination = ({
  pageNumber = 1,
  totalPages // 100
}: UsePaginationArgs) => {
  return useMemo(() => {
    const paginationLength = 7; // length of pagination
    const pagesInARow = 3; // acceptable count of pages in a row if there would be ellipses

    if (totalPages <= paginationLength) {
      return range(1, totalPages);
    }
    // case ellipsis МНОГОТОЧИЕ logic
    else {
      const firstPage = 1;
      // deducted -- how many elements should show on the sides
      const deductedMaxLength = paginationLength - pagesInARow; // 7 - 3 = 4 // means that we need 4 elements in the array
      const sideLength = Math.ceil(deductedMaxLength / 2); // now we know how many elements should show on the sides

      // case 1 - ellipsis in the middle
      if (pageNumber - firstPage < sideLength || totalPages - pageNumber < sideLength) {
        const leftSide = range(firstPage, sideLength + 1);
        const rightSide = range(totalPages - sideLength, totalPages);

        return [...leftSide, NaN, ...rightSide];
      }

      // case 2 - ellipsis on both sides
      else if (pageNumber - firstPage >= deductedMaxLength && totalPages - pageNumber >= deductedMaxLength) {
        const deductedSideLength = sideLength - 1;
        const midArray = range(pageNumber - deductedSideLength, pageNumber + 1);

        return [firstPage, NaN, ...midArray, NaN, totalPages];
      }

      // case 3 - ellipsis in the beginning or in the end of array
      else {
        return getEllipsedArray(pageNumber, firstPage, totalPages, paginationLength);
      }
    }
  }, [pageNumber, totalPages]);
};
function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
}

function getEllipsedArray(pageNumber: number, firstPage: number, totalPages: number, remainedLength: number) {
  const isNearFirstPage = pageNumber - firstPage < totalPages - pageNumber;

  if (isNearFirstPage) {
    const beginningArray = range(firstPage, pageNumber + 1);

    for (let i = 1; i <= pageNumber + 1; i++) {
      remainedLength -= 1;
    }
    remainedLength -= 1;
    const endArray = range(totalPages - (remainedLength - 1), totalPages);

    return [...beginningArray, NaN, ...endArray];
  } else {
    for (let k = totalPages; k >= pageNumber - 1; k--) {
      remainedLength -= 1;
    }
    const beginningArray = range(firstPage, remainedLength - 1);
    const endArray = range(pageNumber - 1, totalPages);

    return [...beginningArray, NaN, ...endArray];
  }
}

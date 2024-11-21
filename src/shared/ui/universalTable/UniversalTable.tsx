import React, {ReactNode, useMemo} from 'react';

import { clsx } from 'clsx';

import s from './UniversalTable.module.scss';
import {TableParts, Typography} from "@momecap/ui-kit-snapmoment";
import {AdditionalDataSingleObj} from "@/pagesComponents/usersList/UsersList";
import {EmptyTable} from "@/shared/ui/universalTable/ui/EmptyTable";
import {Loading} from "@/shared/ui";
import {useQueryParams} from "@/shared/lib/hooks/useQueryParams";

interface UniversalTableProps<T> {
  colsStyles?: string;
  data: T[];
  tHeadStyles?: string;
  customRows?: ReactNode;
  emptyTableMessage?: string;
  isLoading?: boolean;
  disableHoverHeaderStyle: string;
  handleSortClick: (title: string) => void
}

// Функция для создания заголовка колонки таблицы на основе типа данных. Добавление пробелов перед заглавными буквами,
const getHeader = (value: string) => {
  return value
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * Принимает любые данные. Generic T - Интерфейс для ОДНОГО ОБЪЕКТА из массива объектов таблицы. На основе типа будут созданы заголовки колонок.
 * * data - массив данных любой структуры
 * * theadStyles - стили строки заголовка (например высота строки head, ширина колонок (nth-child)
 * @constructor
 */
// Универсальный компонент таблицы
export const UniversalTable = <T extends object>(
  props: UniversalTableProps<T>
) => {
  const { colsStyles, data, customRows, tHeadStyles, emptyTableMessage = 'No data', isLoading, handleSortClick, disableHoverHeaderStyle } = props;

  // Создаем заголовки и колонки на основе ключей первого элемента данных
  // Заголовки колонок
  const headers = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map((key) =>
        key === 'lastColumnWithButtons' ? '' : key
      ) as string[]; // Заголовки строк
    } else {
      return [];
    }
  }, [data]);

  // Колонки данных
  const columns = useMemo(() => {
    return data.length > 0 ? Object.keys(data[0]) as (keyof T)[] : []; // Все ключи из объектов данных в виде массива
  }, [data]);

  const handleIsBlockHead = (title: string) => {
    return title.toLowerCase() === 'username' || title.length === 0
  }

  const headClickHandler = (title: string) => () => {
    if(!handleIsBlockHead(title)){
      handleSortClick(title)
    }
  }

  return (
    <div className={s.tableContainer}>
      <TableParts.Root className={s.table}>
        <TableParts.Head className={clsx(tHeadStyles)}>
          <TableParts.Row>
            {headers.map((header) => (
              <TableParts.HeadCell className={clsx(colsStyles, handleIsBlockHead(header) && disableHoverHeaderStyle)} key={header} onClick={headClickHandler(header)} >
                <Typography variant={'medium_text_14'}>{getHeader(header as string)}</Typography>
              </TableParts.HeadCell>
            ))}
          </TableParts.Row>
        </TableParts.Head>
        {
          isLoading ? (
            <EmptyTable dataLength={columns.length}>
              <Loading />
            </EmptyTable>
          ) : (
            <>
              {data && data.length !== 0 ? (
                <TableParts.Body>
                  {
                    customRows ? (
                      <>
                        {customRows}
                      </>
                    ) : (
                      <>
                        {data.map((row, rowIndex) => (
                          <TableParts.Row key={rowIndex}>
                            {columns.map((column, colIndex) => (
                              <TableParts.Cell className={colsStyles} key={`${rowIndex}-${column as string}`}>
                                {React.isValidElement(row[column]) ? (
                                  row[column]
                                ) : (
                                  <Typography variant={'medium_text_14'}>{row[column] as string}</Typography>
                                )}
                              </TableParts.Cell>
                            ))}
                          </TableParts.Row>
                        ))}
                      </>
                    )
                  }
                </TableParts.Body>
              ) : (
                <EmptyTable dataLength={columns.length}>
                  <Typography variant={'medium_text_14'} className={s.empty}>{emptyTableMessage}</Typography>
                </EmptyTable>
              )}
            </>
          )
        }
      </TableParts.Root>
    </div>
  );
};

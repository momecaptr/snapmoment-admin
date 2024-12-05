import React, {ReactNode, useMemo} from 'react';

import { clsx } from 'clsx';

import s from './UniversalTable.module.scss';
import {ArrowIosDownOutline, TableParts, Typography} from "@momecap/ui-kit-snapmoment";
import {EmptyTable} from "./ui/EmptyTable";
import {Loading} from "../../ui/loading/Loading";

interface UniversalTableProps<T> {
  colsStyles?: string;
  data: T[];
  tHeadStyles?: string;
  customRows?: ReactNode;
  emptyTableMessage?: string;
  isLoading?: boolean;
  disableHoverHeaderStyle?: string;
  handleSortClick: (title: string) => void;
  currentSortBy?: string,
  globalStyle?: string
}

// Функция для создания заголовка колонки таблицы на основе типа данных. Добавление пробелов перед заглавными буквами,
const getHeader = (value: string) => {
  return value
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * **Универсальная таблица** для этого проекта.
 *
 * Принимает любые данные. Generic T - Интерфейс для _одного объекта_ из массива объектов таблицы.
 * На основе типа будут созданы заголовки колонок.
 *
 * **Примечание**: передавать тип T необязательно благодаря TypeScript type inference, который выводит тип на основе `data: T[]`.
 *
 * @param {Object} props - Свойства компонента.
 * @param {T[]} props.data - _Массив данных любой структуры._
 * @param {string} [props.tHeadStyles] - _Стили строки заголовка_ (например, высота строки или ширина колонок через `nth-child`).
 * @param {string} [props.colsStyles] - _Стили для колонок_ (можно настроить ширину каждой колонки).
 * @param {ReactNode} [props.customRows] - _Кастомные строки таблицы_ (можно вместо `data` передать свои строки).
 * @param {string} [props.emptyTableMessage='No data'] - _Сообщение для пустой таблицы._
 * @param {boolean} [props.isLoading=false] - _Флаг загрузки данных._
 * @param {string} [props.disableHoverHeaderStyle] - _Стили для задизейбленных заголовков колонок_ (например, отключение подсветки при наведении).
 * @param {Function} props.handleSortClick - _Обработчик клика на заголовок колонки._
 * @param {string} [props.currentSortBy] - _Параметр, по которому выполнена сортировка._
 * @param {string} [props.globalStyle] - _Глобальные стили для таблицы_ (например, для добавления отступов снаружи).
 * @example
 * const obj = {userName: 'John', lastName: 'Doe', age: 30};
 * // Функция getHeaders переведет это в следующее
 * userName -> User name
 * lastName -> Last name
 */
// Универсальный компонент таблицы
export const UniversalTable = <T extends object>(
  props: UniversalTableProps<T>
) => {
  const { colsStyles, data, customRows, tHeadStyles, emptyTableMessage = 'No data', currentSortBy, isLoading, handleSortClick, disableHoverHeaderStyle, globalStyle } = props;

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
    return title.toLowerCase() === 'username' || title.length === 0 // Мы тут проверяем на соответствие username или пустой строке -- по этим двум названиям столбцов сортирвку делать не надо
  }

  const headClickHandler = (title: string) => () => {
    if(!handleIsBlockHead(title)){
      handleSortClick(title)
    }
  }

  return (
    <div className={clsx(globalStyle, s.tableContainer)}>
      <TableParts.Root className={s.table}>
        <TableParts.Head className={clsx(tHeadStyles)}>
          <TableParts.Row>
            {headers.map((header) => (
              <TableParts.HeadCell className={clsx(colsStyles, handleIsBlockHead(header) && disableHoverHeaderStyle)} key={header} onClick={headClickHandler(header)} >
                <div className={s.cellWrapper}>
                  <Typography as={'button'} variant={'medium_text_14'}>
                    {getHeader(header as string)}
                  </Typography>
                  {(currentSortBy === `${header}-asc` || currentSortBy === `${header}-desc`) && (
                    <ArrowIosDownOutline
                      className={`${s.arrow} ${currentSortBy.includes('asc') ? s.rotate : ''}`}
                    />
                  )}
                </div>
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

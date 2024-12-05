import {GetAllPaymentsQuery} from "@/graphql/queries/payments/getAllPayments.generated";
import {ApolloError} from "@apollo/client";
import {combineFirstLastName, formatDate, MAIN_DOMAIN, selectOptionsForPagination, useQueryParams} from "@/shared/lib";
import {ReactElement} from "react";
import s from "@/entities/usersListTable/UsersListTable.module.scss";
import {CircleBackslashIcon} from "@radix-ui/react-icons";
import {personOutline, personOutlineWhite, PictureOutline, Typography} from "@momecap/ui-kit-snapmoment";
import {UsersListTableDropDownButton} from "@/entities/usersListTable/ui/UsersListTableDropDownButton";
import {Loading, PaginationWithSelect, UniversalTable} from "@/shared/ui";
import * as React from "react";
import Image from "next/image";
import {formatSubscriptionType} from "@/shared/lib/helpers/transformData";

type Props = {
  data: GetAllPaymentsQuery | undefined,
  loading: boolean,
  error: ApolloError | undefined
  globalStyle?: string
}

export const PaymentsListTable = (props: Props) => {
  const { data, loading, error, globalStyle } = props

  const {setSortByQuery, currentSortBy} = useQueryParams()

  type TransformedPaymentsDataSingleObj = {
    userName: ReactElement,
    dateAdded: string;
    amount: number | null | undefined,
    subscription: string;
    paymentMethod: string
  }

  const transformedData: TransformedPaymentsDataSingleObj[] = data
    ? data.getPayments.items.map((item) => {
      return {
        userName: (
          <>
            <div className={s.userNameCell}>
              <div className={s.userNameImgWrapper}>
                <Image src={item.avatars?.[1]?.url || personOutlineWhite } alt={item?.userName || 'No username'} width={24} height={24} className={s.img}/>
              </div>
              <Typography variant={'medium_text_14'}>
                {item.userName}
              </Typography>
            </div>
          </>
        ),
        dateAdded: formatDate(item.createdAt),
        amount: item.amount,
        subscription: formatSubscriptionType(item.type),
        paymentMethod: item.paymentMethod as string
      };
    })
    : [];

  const handleSortClick = (title: string) => {
    if(title.length > 0) {
      setSortByQuery(title);
    }
  }

  if(loading){
    return <Loading/>
  }

  return (
    <div>
      А это таблица
      <UniversalTable<TransformedPaymentsDataSingleObj>
        disableHoverHeaderStyle={s.disableHoverHeaderStyle}
        data={transformedData}
        handleSortClick={handleSortClick}
        currentSortBy={currentSortBy}
        colsStyles={s.columnsWidth}
        globalStyle={s.marginTableBtm}
      />
    </div>
  );
};
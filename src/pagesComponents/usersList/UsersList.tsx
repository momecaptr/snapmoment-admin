import {UsersListTable} from "@/entities/usersListTable/UsersListTable";

export type AdditionalDataSingleObj = {
  isBlocked?: boolean; // Дополнительный флаг для отображения
};

export const UsersList = () => {

  return (
    <div>
      <h1>Некоторое дерьмо</h1>
      <UsersListTable />
    </div>
  );
};
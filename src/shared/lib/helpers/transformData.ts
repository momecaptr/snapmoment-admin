// Transformation data for table
export const formatDate = (value: Date) => new Date(value).toLocaleDateString('ru-RU');

/**
 * Трансформируем имя пользователя в нормальный вид, комбинируя firstName и lastName. Если ничего нет, то возвращаем разное в зависимости от флага isNullToReturn
 * @param firstName
 * @param lastName
 * @param isNullToReturn - по умолчанию false. Если false, то возвращаем 'N/A', а если поставим true, то вернет null
 */
export const combineFirstLastName = ({firstName, lastName, isNullToReturn = false} : { firstName: string | null | undefined, lastName: string | null | undefined, isNullToReturn?: boolean }) => {
  let value
  if(firstName && firstName.length > 0) {
    value = firstName
    if(lastName && lastName.length > 0) {
      value = `${firstName} ${lastName}`
    }
  } else {
    value = isNullToReturn ? null : 'N/A'
  }
  return value
}



// Transformation capitalized subscriptionType to normal - DAY - 1 day, MONTHLY - 1 month, WEEKLY - 7 days
export const formatSubscriptionType = (value: string) => {
  const types: Record<string, string> = { DAY: '1 day', MONTHLY: '1 month', WEEKLY: '7 days' };

  return types[value] || value;
};
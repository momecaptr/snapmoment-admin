// Transformation data for table
export const formatDate = (value: Date) => new Date(value).toLocaleDateString('ru-RU');

// Transform name to NORMAL from FIRSTNAME LASTNAME to complete and normal userName for table
export const combineFirstLastName = ({firstName, lastName} : { firstName: string | null | undefined, lastName: string | null | undefined }) => {
  let value
  if(firstName && firstName.length > 0) {
    value =firstName
    if(lastName && lastName.length > 0) {
      value = `${firstName} ${lastName}`
    }
  } else {
    value = 'N/A'
  }
  return value
}

// Transformation capitalized subscriptionType to normal - DAY - 1 day, MONTHLY - 1 month, WEEKLY - 7 days
export const formatSubscriptionType = (value: string) => {
  const types: Record<string, string> = { DAY: '1 day', MONTHLY: '1 month', WEEKLY: '7 days' };

  return types[value] || value;
};
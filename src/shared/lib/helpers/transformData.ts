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
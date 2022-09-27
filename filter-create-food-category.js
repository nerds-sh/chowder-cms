export const FilterCreateOnlyForAdmin = (session,inputData) => {
  console.log('inputData', inputData);
  console.log('session', session);
  
  return inputData.user.connect && inputData.user.connect.id === session.itemId
}
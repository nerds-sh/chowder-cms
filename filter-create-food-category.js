export const FilterCreateOnlyForAdmin = (session,inputData) => {
  
    return inputData.user.connect && inputData.user.connect.id === session.itemId
}
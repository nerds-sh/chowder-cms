export const FilterRestaurantsFoodCategories = (session) => {
    console.log(session)
    return { user: {id: { equals: session.itemId } } } 
}
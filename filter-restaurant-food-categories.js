export const FilterRestaurantsFoodCategories = (session) => {
    return { user: {id: { equals: session.itemId } } } 
}
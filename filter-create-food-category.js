export async function FilterCreateOnlyForAdmin(session, inputData, context) {
    console.log(context)
    const user = await context.query.User.findOne({
        where: { id: session.itemId},
        query: "id name restaurants{ id }"
    })
    console.log(user, "Haideeee")
    console.log(inputData.restaurant.connect.id, 'input data')
    
    return user.restaurants.some(restaurant => restaurant.id === inputData.restaurant.connect.id)
}

export function FilterAdminFoodCategory (session) {
    
    return { restaurant: {user: { id: {equals: session.itemId}}}}
}

export const FilterAdminRestaurants = (session) => {
    return {user: {id: { equals: session.itemId}}}
}
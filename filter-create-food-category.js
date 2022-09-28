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

export async function FilterAdminRestaurants (session, context ) {
    const users = await context.query.User.findMany({
        where: { id: session.itemId },
        query: 'id name restaurants{ id }'
    })
    
    return true
}
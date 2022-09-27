export const FilterAdminUsers = (session) => {
    return {id: { equals: session.itemId } }
}
import { users } from "./data";

export async function insertSeedData(context) {
    console.log(`🌱 Inserting seed data`);

    const createAuthor = async (authorData) => {
        let user = await context.query.User.findOne({
            where: {email: authorData.email},
            query: 'id',
        });

        if (!user) {
            user = await context.query.User.createOne({
                data: authorData,
                query: 'id',
            });
        }
    };
    
    for (const user of users) {
        console.log(`👩 Adding user: ${user.name}`);
        await createAuthor(user);
    }
}
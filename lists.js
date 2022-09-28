import { config, list } from '@keystone-6/core';
import { text, password, checkbox, relationship } from '@keystone-6/core/fields';

import { isAdmin, session } from './auth';
import { FilterRestaurantsFoodCategories } from './filter-restaurant-food-categories';
import { FilterCreateOnlyForAdmin } from './filter-create-food-category';
import { FilterAdminUsers } from './filter-admin-users';

export const lists = {
    User: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ 
          validation: { isRequired: true }, 
          isIndexed: 'unique',
          isFilterable:  true }),
        password: password({ validation: { isRequired: true } }),
        isAdmin: checkbox ({ validation: { isRequired: true }, }),
      },
        access: {
          operation: {
            create: isAdmin,
            delete: isAdmin,
          },
          filter: {
            query: ({session}) => FilterAdminUsers(session),
         },
        }
    }),
    FoodCategory: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            user: relationship({
                ref: 'User',
                ui: {
                  hideCreate: true,
                  removeMode: 'disconnect',
                },
              }),
        },
        access: {
            operation: {
                create: isAdmin,
                update: isAdmin,
                delete: isAdmin,
              },
             filter: {
                query: ({session}) => FilterRestaurantsFoodCategories(session),
             },
             item: {
                 create: ({ session, inputData }) => FilterCreateOnlyForAdmin(session, inputData),
             }
        }
    }),
  }
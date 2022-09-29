import { config, list } from '@keystone-6/core';
import { text, password, checkbox, relationship, image } from '@keystone-6/core/fields';

import { isAdmin } from './auth';
import {FilterAdminFoodCategory, FilterAdminRestaurants, FilterCategoryFood} from './filters';
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
        isAdmin: checkbox ({ validation: { isRequired: true } }),
        restaurants: relationship({ ref: "Restaurant.user", many: true, 
            ui: {
                hideCreate: true
            } })
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
    Restaurant: list({
        fields: {
            name: text({validation: { isRequired:true }}),
            photo: image({ storage: 'my_local_images' }),
            user: relationship({
                ref: 'User.restaurants',
                ui: {
                    hideCreate: true,
                    removeMode: 'disconnect',
                },
                many: false
            }),
        },
        access: {
            operation: {
                create: isAdmin,
                update: isAdmin,
                delete: isAdmin,
            },
        filter: {
            query: ({ session} ) => FilterAdminRestaurants(session)
        },
        },
    }),
    FoodCategory: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            restaurant: relationship({
                ref: 'Restaurant',
                ui: {
                  hideCreate: true,
                  removeMode: 'disconnect',
                },
                many:false
              }),
        },
        access: {
            operation: {
                create: isAdmin,
                update: isAdmin,
                delete: isAdmin,
              },
            filter: {
                query: ({ session } ) => FilterAdminFoodCategory(session)
            },
        }
    }),
    Food: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        price: text({validation: { isRequired: true }}),
        photo: image({ storage: 'my_local_images' }),
        ingredients: text({validation: { isRequired: true }}),
        category: relationship({
            ref: 'FoodCategory',
            ui: {
              hideCreate: true,
              removeMode: 'disconnect',
            },
            many:false
          }),
    },
    access: {
        operation: {
            create: isAdmin,
            update: isAdmin,
            delete: isAdmin,
          },
        filter: {
            query: ({ session } ) => FilterCategoryFood(session)
        },
    }
    })
    
  }
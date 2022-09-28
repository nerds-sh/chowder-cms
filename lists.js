import { config, list } from '@keystone-6/core';
import { text, password, checkbox, relationship } from '@keystone-6/core/fields';

import { isAdmin, session } from './auth';
import { FilterRestaurantsFoodCategories } from './filter-restaurant-food-categories';
import {FilterAdminRestaurants, FilterCreateOnlyForAdmin} from './filter-create-food-category';
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
        }
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
            item:{
                create: ({session, inputData, context}) => FilterCreateOnlyForAdmin(session, inputData, context)
            }
        }
    }),
    
  }
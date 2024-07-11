export default {
    path: '/recipes',
    component: () => import('../views/recipe/RecipeListView.vue'),
    children: [
      {
        path: '',
        name: '/recipeform',
        component: () => import('../views/recipe/RecipeForm.vue')
      },
      {
        path: '',
        name: '/favourites',
        component: () => import('../views/recipe/RecipeFavouritesView.vue')
      },
      {
        path: ':id',
        name: '/recipeDetails',
        component: () => import('../views/recipe/RecipePageView.vue')
      },
    ]
  }
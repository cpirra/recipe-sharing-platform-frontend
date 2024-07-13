export default [
  {
    path: '/recipes',
    name: 'RecipeList',
    component: () => import('../views/recipe/RecipeListView.vue')
  },
  {
    path: '/recipes/new',
    name: 'RecipeForm',
    component: () => import('../views/recipe/RecipeForm.vue')
  },
  {
    path: '/recipes/favourites',
    name: 'RecipeFavourites',
    component: () => import('../views/recipe/RecipeFavouritesView.vue')
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetails',
    component: () => import('../views/recipe/RecipePageView.vue')
  }
]

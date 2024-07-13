export default {
  path: '/recipes',
  component: () => import('../views/recipe/RecipeListView.vue'),
  children: [
    {
      path: 'new',
      name: 'RecipeForm',
      component: () => import('../views/recipe/RecipeForm.vue')
    },
    {
      path: 'favourites',
      name: 'RecipeFavourites',
      component: () => import('../views/recipe/RecipeFavouritesView.vue')
    },
    {
      path: ':id',
      name: 'RecipeDetails',
      component: () => import('../views/recipe/RecipePageView.vue')
    }
  ]
}

const recipeViews = {
  RecipeCreate: 'RecipeCreate.vue',
  RecipeFavourites: 'RecipeFavouritesView.vue',
  RecipeLatest: 'RecipeLatestView.vue',
  RecipeTrendy: 'RecipeTrendyView.vue',
  commented: 'RecipeMostCommented.vue',
  reviewed: 'RecipeMostReviews.vue',
  RecipeDetails: 'RecipeDetailView.vue',
  RecipeEdit: 'RecipeEdit.vue'
}

const routes = [
  { path: '/recipes/new', name: 'RecipeCreate' },
  { path: '/recipes/favourites', name: 'RecipeFavourites' },
  { path: '/recipes/latest', name: 'RecipeLatest' },
  { path: '/recipes/trendy', name: 'RecipeTrendy' },
  { path: '/recipes/commented', name: 'commented' },
  { path: '/recipes/reviewed', name: 'reviewed' },
  { path: '/recipes/:id', name: 'RecipeDetails' },
  { path: '/recipes/edit/:id', name: 'RecipeEdit' }
].map((route) => ({
  ...route,
  component: () => import(`../views/recipe/${recipeViews[route.name]}`)
}))

export default routes

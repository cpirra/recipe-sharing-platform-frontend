const recipeViews = {
  RecipeForm: 'RecipeForm.vue',
  RecipeFavourites: 'RecipeFavouritesView.vue',
  RecipeLatest: 'RecipeLatestView.vue',
  RecipeTrendy: 'RecipeTrendyView.vue',
  commented: 'RecipeMostCommented.vue',
  reviewed: 'RecipeMostReviews.vue',
  RecipeDetails: 'RecipeDetailView.vue'
};

const routes = [
  { path: '/recipes/new', name: 'RecipeForm' },
  { path: '/recipes/favourites', name: 'RecipeFavourites' },
  { path: '/recipes/latest', name: 'RecipeLatest' },
  { path: '/recipes/trendy', name: 'RecipeTrendy' },
  { path: '/recipes/commented', name: 'commented' },
  { path: '/recipes/reviewed', name: 'reviewed' },
  { path: '/recipes/:id', name: 'RecipeDetails' }
].map(route => ({
  ...route,
  component: () => import(`../views/recipe/${recipeViews[route.name]}`)
}));

export default routes;


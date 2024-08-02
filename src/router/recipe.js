<<<<<<< HEAD
const recipeViews = {
  RecipeList: 'RecipeListView.vue',
  RecipeForm: 'RecipeForm.vue',
  RecipeFavourites: 'RecipeFavouritesView.vue',
  RecipeLatest: 'RecipeLatestView.vue',
  RecipeTrendy: 'RecipeTrendyView.vue',
  commented: 'RecipeMostCommented.vue',
  reviewed: 'RecipeMostReviews.vue',
  RecipeDetails: 'RecipeDetailView.vue'
};

const routes = [
  { path: '/recipes', name: 'RecipeList' },
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
=======
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
    // meta: { requiresAuth: true }
  },

  {
    path: '/edit-recipe/:id',
    name: 'EditRecipe',
    component: () => import('../components/Recipe/EditRecipe.vue')
  },
  {
    path: '/recipes/favourites',
    name: 'RecipeFavourites',
    component: () => import('../views/recipe/RecipeFavouritesView.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/recipes/latest',
    name: 'RecipeLatest',
    component: () => import('../views/recipe/RecipeLatestView.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/recipes/trendy',
    name: 'RecipeTrendy',
    component: () => import('../views/recipe/RecipeTrendyView.vue')
    // meta: { requiresAuth: true }
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetails',
    component: () => import('../views/recipe/RecipeDetailView.vue'),
    props: true
  }
]
>>>>>>> f9141cc956f1b43009da24b7ff211a826192f978

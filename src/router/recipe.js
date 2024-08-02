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

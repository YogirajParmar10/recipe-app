import { Router } from "express";

import {
  deleteRecipe,
  getRecipes,
  postRecipes,
  updateRecipe,
} from "../controllers/recipes";

const router: Router = Router();

router.get("/", getRecipes);

router.post("/recipes/:userId", postRecipes);

router.put("/recipes/:recipeId", updateRecipe);

router.delete("/recipes/:userID/:recipeId", deleteRecipe);

export default router;

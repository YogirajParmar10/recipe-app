import { NextFunction, Request, Response } from "express";

import User from "../models/user";
import Recipe from "../models/recipes";
import Ingredient from "../models/ingredients";
import RecipeIngredients from "../models/recipeIngredients";
import { log } from "console";

export const getRecipes = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipes = await Recipe.findAll();
    if (!recipes) {
      return res.status(404).json({ message: "No recipes found" });
    }
    return res.status(201).json({ recipes: recipes });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const postRecipes = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const name: string = req.body.name;
  const description: string = req.body.description;
  const userId: string = req.params.userId;
  const ingredients: [] = req.body.ingredients;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error("No user found!");
      throw error;
    }
    const recipe = await Recipe.create({
      name: name,
      description: description,
      userId: userId,
    });
    const recipeId = recipe.dataValues.id;
    for (let i = 0; i < ingredients.length; i++) {
      await RecipeIngredients.create({
        recipeId: recipeId,
        ingredientId: ingredients[i],
      });
    }
    res.status(201).json({ message: "recipe created successfully" });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const updateRecipe = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.recipeId;
  const name = req.body.name;
  const description = req.body.description;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("UnAuthorized!");
      throw error;
    }
    await Recipe.update(
      {
        name: name,
        description: description,
      },
      { where: { id: id } }
    );
    res.status(200).json({ message: "recipe updated successfully!" });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const deleteRecipe = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error("UnAuthorized!");
      throw error;
    }
    const recipe = await Recipe.findByPk(recipeId);
    await recipe!.destroy();
    res.status(200).json({ message: "recipe deleted successfully!" });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

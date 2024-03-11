import { NextFunction, Request, Response } from "express";

import Recipe from "../models/recipes";

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

  try {
    await Recipe.create({
      name: name,
      description: description,
    });
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

  try {
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
  try {
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

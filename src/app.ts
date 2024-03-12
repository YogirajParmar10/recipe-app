import express, { Request, Response, NextFunction } from "express";
import bodyParser, { json } from "body-parser";

import recipeRouter from "./routes/recipes";
import authRouter from "./routes/auth";

import User from "./models/user";
import Recipe from "./models/recipes";
import Ingredient from "./models/ingredients";
// import MesurementQty from "./models/mesurement-qty";
// import MesurementUnit from "./models/mesurement-unit";

import sequelize from "./util/database";

const app: express.Application = express();

app.use(bodyParser.json());

app.use(recipeRouter);
app.use(authRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  User.findByPk(1)
    .then((user) => {
      // req.user = user;
      console.log(user);
    })
    .catch((err) => console.log(err));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

User.hasMany(Recipe);
Recipe.belongsTo(User, { constraints: true });
Ingredient.belongsToMany(Recipe, { through: "recipeIngredients" });
Recipe.belongsToMany(Ingredient, { through: "recipeIngredients" });

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        email: "teste@test.com",
        name: "tester",
        password: "test123",
      });
    }
    return user;
  })
  .then((result) => {
    app.listen(3030);
  })
  .catch((err) => {
    console.log(err);
  });

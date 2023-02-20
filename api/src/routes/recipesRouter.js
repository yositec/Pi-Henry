const { Router } = require("express");
const {
  getApiInfoById,
  getDbInfoById,
  getAllInfo,
} = require("../controllers/Recipes");
const { Recipe, Diet } = require('../db')

const router = Router();

router.get("/", async (req, res) => {

  const { name } = req.query;
  let allInfo = await getAllInfo();
  
  if (name) {
    try {
      let filteredRecipe = await allInfo.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      filteredRecipe.length
        ? res.status(200).send(filteredRecipe)
        : res.status(404).send("Recipe not found");
    } catch (error) {
      return res.status(400).send("Something went wrong");
    }
  } else {
    res.send(allInfo);
  }
});

router.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe.length > 10) {
      let recipeDb = await getDbInfoById(idRecipe);
      return res.status(200).send(recipeDb);
    }

    let recipeApi = await getApiInfoById(idRecipe);
    let recipeDetail = {
      image: recipeApi.data.image,
      name: recipeApi.data.title,
      diets: recipeApi.data.diets,
      summary: recipeApi.data.summary,
      healthScore: recipeApi.data.healthScore,
      steps: recipeApi.data.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
          ingredients: e.ingredients,
        };
      }),
    };

    return res.status(200).send(recipeDetail);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }

});

router.post("/", async (req, res) => {
  const { name, summary, healthScore, steps, image, dietTypes } = req.body;
  if (!name || !summary || !healthScore || !steps || !dietTypes)
    return res.status(400).send("Missing data");

  const newRecipe = await Recipe.create({
    name,
    summary,
    healthScore,
    steps,
    image,
  });

  let getDiet = await Diet.findAll({
    where: {
      name: dietTypes,
    },
  });

});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.send("Recipe deleted");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
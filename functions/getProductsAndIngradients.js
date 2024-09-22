exports = async function(arg){
  const axios = require("axios").default;
  try {
    const posterApi = context.values.get("posterApi");
    const posterToken = context.values.get("posterToken");
    const productsUrl = "menu.getProducts";
    const ingredientsUrl = "menu.getIngredients"

    //Тип товара: 1 — полуфабрикат, 2 — тех.карта, 3 — товар
    //Тип списываемого объекта: товар — 1, тех.карта — 2, полуфабрикат — 3, ингредиент — 4, модификатор товара — 5
    const productsMap = {
      1: 3,
      2: 2,
      3: 1
    }

    console.log('Starting to get ingradients and products!')

    const unwisedIngredients = [14, 17, 4, 6, 7, 8, 15, 18];
    
    const productsResponse = await axios(`${posterApi}${productsUrl}?token=${posterToken}`);
    const ingredientsResponse = await axios(`${posterApi}${ingredientsUrl}?token=${posterToken}`);

    const result = productsResponse.data.response.map(({product_name, product_id, type }) => ({name: product_name, id: product_id, type: productsMap[type]}));
    result.push(...ingredientsResponse.data.response
                .filter(({category_id}) => (!unwisedIngredients.includes(category_id)))
                .map(({ingredient_name, ingredient_id, type}) => ({name: ingredient_name, id: ingredient_id, type: 4})))
    return result;
  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);
    return { error: err };
  }
};
const guard = require("../../guard");
const { Product } = require("./products.model");
const { ProductVal } = require("./products.joi");

module.exports = (app) => {
  app.get("/products", guard, async (req, res) => {
    res.send(await Product.find());
  });

  app.get("/products/:id", guard, async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    console.log("elia");
    if (!product) {
      return res.status(403).send("Product not found");
    }

    res.send(product);
  });

  app.post("/products", guard, async (req, res) => {
    const { name, price, discount } = req.body;

    const validate = ProductVal.validate(req.body, { abortEarly: false });

    if (validate.error) {
      const errors = validate.error.details.map((x) => x.message);
      return res.status(403).send(errors);
    }

    const product = new Product({ name, price, discount });
    const obj = await product.save();

    res.send(obj);
  });

  app.delete("/products/:id", guard, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
    } catch (err) {
      return res.status(403).send("Product not found");
    }

    res.send();
  });

  app.put("/products/:id", guard, async (req, res) => {
    const { name, price, discount } = req.body;

    if (!name || !price || !discount) {
      return res.status(403).send("required parameters missing");
    }

    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(403).send("Product not found");
    }

    product.name = name;
    product.price = price;
    product.discount = discount;

    product.save();

    res.send();
  });
};

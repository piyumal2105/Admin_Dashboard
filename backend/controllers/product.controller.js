import Product from "../models/product.model.js";

//Generate Unique product id
const generateStokeId = async () => {
  const lastStokeDetails = await Product.find()
    .sort({ _id: -1, "isDeleted.count": 0 })
    .limit(1);

  if (lastStokeDetails.length == 0) {
    return "PRD-1";
  }

  const stockId = lastStokeDetails.map((data) => {
    return data.product_id;
  });

  const oldStockId = parseInt(stockId[0].split("-")[1]);
  const newStokeId = oldStockId + 1;
  return `PRD-${newStokeId}`;
};

//Add items in to the DB
export const addProduct = async (req, res) => {
  try {
    const customStockId = await generateStokeId();
    const product_id = customStockId;
    const productName = req.body.name;
    const productBrand = req.body.brand;
    const productPrice = req.body.price;
    const productDescription = req.body.description;
    const productCategory = req.body.category;
    const productCode = req.body.code;
    const productQuantity = req.body.quantity;
    const productAdded_date = req.body.added_date;
    const productExpire_date = req.body.expire_date;
    const productSupplier = req.body.supplier;
    const productImage = req.body.image;

    const newProduct = await Product.create({
      product_id: product_id,
      name: productName,
      brand: productBrand,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      code: productCode,
      quantity: productQuantity,
      added_date: productAdded_date,
      expire_date: productExpire_date,
      supplier: productSupplier,
      image: productImage,
    });
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get all added data
export const getAllItems = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
    console.log(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

//Get by id
export const getProductById = async (req, res) => {
  const product_id = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

//Update Product details
export const updateProduct = async (req, res) => {
  const product_id = req.params.id;
  console.log(req.body);
  const updateFields = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    code: req.body.code,
    quantity: req.body.quantity,
    added_date: req.body.added_date,
    expire_date: req.body.expire_date,
    supplier: req.body.supplier,
    image: req.body.image,
  };
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      updateFields,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product", error });
  }
};

//Update Use Product
export const updateUseProduct = async (req, res) => {
  const product_id = req.params.id;

  console.log(req.body);
  const updateFields = {
    quantity: req.body.quantity,
  };

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      product_id,
      updateFields,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Product", error });
  }
};

//Delete product
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const productDelete = await Product.findByIdAndDelete(_id);

    if (!productDelete) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Product", error });
  }
};

import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

// CRUD get all data
productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  try {
    const results = await collection.find().toArray();
    return res.status(200).json({
      data: results,
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while get the products",
    });
  }
});

// CRUD get data from path parameter
productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  try {
    const results = await collection.findOne({ _id: productId });
    return res.status(200).json({
      data: results,
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while get the products",
    });
  }
});

// CRUD create data base on endpoint
productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productsData = { ...req.body };
  try {
    await collection.insertOne(productsData);
    return res.status(201).json({
      message: "Product has been created successfully",
    });
  } catch {
    return res.status(500).json({
      message: "An error occurred while creating the product",
    });
  }
});

// CRUD update data by path parameter
productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = new ObjectId(req.params.id);
  const newProduct = { ...req.body };
  try {
    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProduct,
      }
    );
    return res.json({message: "Product has been updated successfully"})
  } catch {
    return res.json({message: "An error occurred while update the product"})
  }
});

// CRUD delete data by path parameter
productRouter.delete("/:id", async (req, res) => {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id)
    try{
        await collection.deleteOne({_id : productId})
        return res.json({message: "Product has been deleted successfully"})
    }catch{
        return res.json({message: "An error occurred while delete the product"})
    }
});

export default productRouter;
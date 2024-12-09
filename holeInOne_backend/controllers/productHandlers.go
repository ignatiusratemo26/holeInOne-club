package controllers

import (
	"context"
	"encoding/json"
	"holeInOne_backend/data"
	"holeInOne_backend/models"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var productsCollection *mongo.Collection

func init() {
	client := data.GetMongoClient()
	productsCollection = client.Database("holeInOneDB").Collection("products")
}

func GetProductsHandler(w http.ResponseWriter, r *http.Request) {
	cursor, err := productsCollection.Find(context.TODO(), bson.M{})
	if err != nil {
		http.Error(w, "Failed to retrieve products", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	var products []models.Product
	if err = cursor.All(context.TODO(), &products); err != nil {
		http.Error(w, "Failed to parse products", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(products)
}

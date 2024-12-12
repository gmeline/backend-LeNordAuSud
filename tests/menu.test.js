const request = require("supertest");
const sequelize = require("../config/db");
const app = require("../app");

beforeAll(async () => {
  await sequelize.sync(); 
});

afterAll(async () => {
  await sequelize.close(); 
});

//Test qui permet de vérifier que la route GET /menu renvoie correctement une liste d'éléments du menu avec les ropriétés attendues (nom, prix, description) et un status de réponse 200
describe("GET /menu", () => {
  it("devrait retourner une liste d'éléments du menu", async () => {
    const response = await request(app).get("/menu");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0); 
    expect(response.body[0]).toHaveProperty("name"); 
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("description");
  });
});

//Test qui permet de vérifier que la route POST /menu ajoute correctement un nouvel élément au menu, en renvoyant un status de 201 et en vérifiant que les propriétés name et price de l'élément ajouté sont correctes.
describe("POST /menu", () => {
    it("devrait ajouter un élément au menu", async () => {
      const newItem = {
        name: "Frites épicées",
        price: 3.5,
        description: "Des frites avec une touche épicée.",
      };
  
      const response = await request(app)
        .post("/menu")
        .send(newItem)
        .set("Accept", "application/json");
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("name", newItem.name); 
      expect(response.body).toHaveProperty("price", newItem.price); 
    });
  });
  
//Test qui permet de vérifer qu ela route POST /menu renvoie une erreur 400 si les informations essentielles, comme le nom ou le prix, sont manquantes dans la requêtes
describe("POST /menu", () => {
    it("devrait renvoyer une erreur si le nom ou le prix est manquant", async () => {
      const invalidItem = {
        description: "Frites sans nom et prix",
      };
  
      const response = await request(app)
        .post("/menu")
        .send(invalidItem)
        .set("Accept", "application/json");
  
      expect(response.status).toBe(400); 
      expect(response.body).toHaveProperty("error"); 
    });
  });
  
import app from "../src/index";
import supertest from "supertest";

describe("POST /fruits", () => {
	it("given an invalid object it should return 422", async () => {
		const body = {};
		const result = await supertest(app).post("/fruits").send(body);
		const status = result.status;
		expect(status).toEqual(422);
	});

	it("given an item already registed it should return 409", async () => {
		const body = {
			name: "maça",
			price: "2",
		};
		await supertest(app).post("/fruits").send(body);
		const result = await supertest(app).post("/fruits").send(body);
		const status = result.status;
		expect(status).toEqual(409);
	});
});

describe("GET /fruits:id", () => {
	it("given an invalid id it should return 404", async () => {
		const id = 0;
		const result = await supertest(app).post(`/fruits/${id}`).send();
		const status = result.status;
		expect(status).toEqual(404);
	});
});

var request = require('supertest');
var app = require('./app');

describe("POST /url/short", () => {

    describe("Shorten a URL", () => {

        test("Shorten an URL (www.youtube.com) - 200 response ", async () => {
            const response = await request(app).post("/url/short").send({"fullUrl" : "www.youtube.com"})
            expect(response.statusCode).toBe(200)
        })

        test("Shorten an URL (google.com) - 200 response", async() => {
            const response = await request(app).post("/url/short").send({"fullUrl" : "google.com"})
            expect(response.statusCode).toBe(200)
        })

    })

})


describe("GET /url/short", () => {
    describe("Retrieve all of the url that has been shortened", () => {

        test("Retrieves all of URL that was shortened - 200 response" , async() => {
            const response = await request(app).get("/url/short")
            expect(response.statusCode).toBe(200)
        })

    })
})



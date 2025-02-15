const url = "http://localhost:3000/api/v1/status"

test("Get to api/v1/status should return 200", async () => {
    const res = await fetch(url)

    expect(res.status).toBe(200);


    const body = await res.json()
    expect(body.updated_at).toBeDefined();
    expect(body.updated_at).toEqual(new Date(body.updated_at).toISOString())

    expect(body.dependencies.database.version).toEqual("16.0")
    expect(body.dependencies.database.max_connection).toBeDefined();
    expect(body.dependencies.database.max_connection).toEqual(100)
    expect(body.dependencies.database.opened_connection).toEqual(1)

})
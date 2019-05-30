test('Devo conhecer as principais assertivas do jest', () => {
    let number = null
    expect(number).toBe(null)
    expect(number).toBeNull()
    expect(number).toEqual(null)
    
    number = 10
    expect(number).toBe(10)
    expect(number).toBeGreaterThan(9)
    expect(number).toBeLessThan(11)
    expect(number).toStrictEqual(10)
})

test('Devo saber trabalhar com objetos', () => {
    let obj = { name : 'Samuel', mail : 'samuel@mail.com' }

    expect(obj).toHaveProperty('name')
    expect(obj).toHaveProperty('name', 'Samuel')
    expect(obj.name).toBe('Samuel')
    
    let obj2 = { name : 'Samuel', mail : 'samuel@mail.com' }
    expect(obj).toEqual(obj2)
    expect(obj2).toBe(obj2)
})
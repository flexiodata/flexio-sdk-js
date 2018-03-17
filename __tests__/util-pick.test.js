var _ = require('../src/lodash-local.js')


test('_.pick; pick one existing property', () => {
  expect(
    _.pick({a:1,b:2}, ['a'])
  ).toEqual(
    {a:1}
  )
})


test('_.pick; pick two existing properties', () => {
  expect(
    _.pick({a:1,b:2}, ['a','b'])
  ).toEqual(
    {a:1,b:2}
  )
})


test('_.pick; pick non-existant property', () => {
  expect(
    _.pick({a:1,b:2}, ['c'])
  ).toEqual(
    {}
  )
})

test('_.pick; combination of existant and non-existant properties', () => {
  expect(
    _.pick({a:1,b:2}, ['a','c'])
  ).toEqual(
    {a:1}
  )
})

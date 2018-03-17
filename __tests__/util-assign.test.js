var _ = require('../src/lodash-local.js')


test('_.assign; overwrite property', () => {
  expect(
    _.assign({a:1}, {a:2})
  ).toEqual(
    {a:2}
  )
})

test('_.assign; append property', () => {
    expect(
      _.assign({a:1}, {b:2})
    ).toEqual(
      {a:1,b:2}
    )
  })
  

test('_.assign; overwrite property, third parameter', () => {
    expect(
      _.assign({a:1}, {b:2}, {b:3})
    ).toEqual(
      {a:1,b:3}
    )
  })
  
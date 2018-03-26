var _ = require('../src/lodash-local.js')


test('_.get; get a property', () => {
  expect(
    _.get({a:1}, 'a')
  ).toEqual(
    1
  )
})

test('_.get; get a default', () => {
  expect(
    _.get({a:1}, 'b', 2)
  ).toEqual(
    2
  )
})

test('_.get; get a default with null source', () => {
  expect(
    _.get(null, 'b', 2)
  ).toEqual(
    2
  )
})

test('_.get; get an array element', () => {
  expect(
    _.get([1,2,3], '[0]', 111)
  ).toEqual(
    1
  )
})

test('_.get; get a default from an array', () => {
  expect(
    _.get([1,2,3], '[3]', 111)
  ).toEqual(
    111
  )
})

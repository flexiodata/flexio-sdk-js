var Flexio = require('../src/main.js')


test('A.1. Pipe execution; for loop receiving information from post stdin json', async () => {

  var pipe = Flexio.pipe()
               .foreach(Flexio.pipe().set('result', '${result}${input.name}'))
               .echo("${result}")

  var response = await pipe.run({data:[{"name":"111"},{"name":"222"},{"name":"333"}]})
  var result = response.text

  expect(result).toEqual("111222333")
})




test('A.2. Pipe execution; for loop iterating over json array with default iterator name "item"', async () => {

  var pipe = Flexio.pipe()
              .echo([111,333,555])
              .foreach(Flexio.pipe().dump('${item}'))

  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("111333555")
})




test('A.3. Pipe execution; for loop iterating over json array with custom iterator name "moo"', async () => {

  var pipe = Flexio.pipe()
              .echo([111,333,555])
              .foreach('moo : input', Flexio.pipe().dump('${moo}'))

  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("111333555")
})




test('A.4. Pipe execution; for loop iterating over a table with custom iterator name "moo"', async () => {

  var pipe = Flexio.pipe()
              .echo("col1,col2,col3\nRow1Col1,Row1Col2,Row1Col3\nRow2Col1,Row2Col2,Row2Col3\nRow3Col1,Row3Col2,Row3Col3\n")
              .convert('csv','table')
              .foreach('moo : input', Flexio.pipe().dump('${moo.col2}'))
  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("Row1Col2Row2Col2Row3Col2")
})



test('A.5. Pipe execution; for loop iterating over a table with custom iterator name "moo"', async () => {

  var pipe = Flexio.pipe()
              .set('my_array', [111,333,555])
              .foreach('moo : my_array', Flexio.pipe().dump('${moo}'))
  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("111333555")
})


test('A.6. Pipe execution; for loop iterating over a table with custom iterator name "moo"', async () => {

  var pipe = Flexio.pipe()
              .set('my_multidimensional_array', [
                  [ 'aaa', 'bbb', 'ccc' ],
                  [ 'ddd', 'eee', 'fff' ],
                  [ 'ggg', 'hhh', 'iii' ]
              ])
              .foreach('row : my_multidimensional_array',
                  Flexio.pipe().foreach('value : row',
                      Flexio.pipe().dump('${value}')))
  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("aaabbbcccdddeeefffggghhhiii")
})


test('A.7. Pipe execution; for loop iterating over a table with custom iterator name "moo"', async () => {

  var pipe = Flexio.pipe()
              .set('my_multidimensional_array', [
                  { data: [ 'aaa', 'bbb', 'ccc' ] },
                  { data: [ 'ddd', 'eee', 'fff' ] },
                  { data: [ 'ggg', 'hhh', 'iii' ] }
              ])
              .foreach('row : my_multidimensional_array',
                  Flexio.pipe().foreach('value : row.data',
                      Flexio.pipe().dump('${value}')))
  var response = await pipe.run()
  var result = response.text

  expect(result).toEqual("aaabbbcccdddeeefffggghhhiii")
})

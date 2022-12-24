const List = require('./linkedList')

const shopping = new List()

test('remember to get milk', () => {
  expect(shopping.contains('almond milk')).toBe(false)
  shopping.append('almond milk')
})

test('double check list', () => {
  expect(shopping.find('peanut butter')).toBeNull()
  shopping.prepend('peanut butter')
  expect(shopping.contains('peanut butter')).toBe(true)
})

test('prioritize item', () => {
  shopping.append('spinach')
  shopping.pop()
  shopping.insertAt('spinach', 1)
  expect(shopping.toString()).toBe('( peanut butter ) -> ( spinach ) -> ( almond milk ) -> null')
})

test('get first and last item', () => {
  expect(shopping.head.value).toBe('peanut butter')
  shopping.append('grapes')
  shopping.prepend('tomatoes')
  expect(shopping.at(0).value).toBe('tomatoes')
  expect(shopping.tail).toStrictEqual({value: 'grapes', next: null})
})

test('count items', () => {
  expect(shopping.size).toBe(5)
})

test('look out of bounds', () => {
  expect(shopping.removeAt(10)).toBeNull()
})


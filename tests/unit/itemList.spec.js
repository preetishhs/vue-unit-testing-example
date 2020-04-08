import { shallowMount } from '@vue/test-utils'
import ItemList from '@/components/ItemList'

const props = {
  list: [{ id: 1, title: 'test 1' }, { id: 2, title: 'test 2' }],
  remove: jest.fn()
}
describe('Testing itemList', () => {
  test('test if the list gets rendered', () => {
    const wrapper = shallowMount(ItemList, {
      propsData: props
    })
    expect(wrapper.findAll('li')).toHaveLength(2)
  })
  test('test if the list gets rendered', () => {
    const wrapper = shallowMount(ItemList, {
      propsData: props
    })
    wrapper
      .findAll('li')
      .at(0)
      .trigger('click')
    expect(props.remove).toHaveBeenCalledWith(props.list[0].id)
  })
})

import { mount } from "@vue/test-utils";
import Table from '@/components/Table.vue'

describe('Table.vue', () => {
  it('renders correctly', () => {
    const comp = mount(Table)
    expect(comp.html()).toMatchSnapshot();
  })
})

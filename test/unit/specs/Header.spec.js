import { mount } from "@vue/test-utils";
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('renders correctly', () => {
    const comp = mount(Header)
    expect(comp.html()).toMatchSnapshot();
  })
  it('renders correctly after changing the title state', () => {
    const comp = mount(Header)
    comp.setData({ title: "Hello!" });
    expect(comp.html()).toMatchSnapshot();
  })
})


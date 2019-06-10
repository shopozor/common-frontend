import ValidityIcon from '../ValidityIcon'
import { mountQuasar } from '../../../../unit-tests/utils'

describe('Validity Icon', () => {
  const wrapper = mountQuasar(ValidityIcon)

  it('displays a "valid" icon if knowError: false', () => {
    wrapper.setProps({mandatory: true, knowError: false, showError: true})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: true, knowError: false, showError: false})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: false, showError: true})
    expect(wrapper.contains('#valid')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: false, showError: false})
    expect(wrapper.contains('#valid')).toBe(true)
  })

  it('displays a "error" icon if knowError: true, showError: true', () => {
    wrapper.setProps({mandatory: true, knowError: true, showError: true})
    expect(wrapper.contains('#error')).toBe(true)
    wrapper.setProps({mandatory: false, knowError: true, showError: true})
    expect(wrapper.contains('#error')).toBe(true)
  })

  it('displays a "mandatory" icon if mandatory: true, knowError: true, showError: false', () => {
    wrapper.setProps({mandatory: true, knowError: true, showError: false})
    expect(wrapper.contains('#mandatory')).toBe(true)
  })

  it('displays nothing if mandatory: false, knowError: true, showError: false', () => {
    wrapper.setProps({mandatory: false, knowError: true, showError: false})
    expect(wrapper.contains('i')).toBe(false)
  })
})

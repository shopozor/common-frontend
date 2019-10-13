import fillHeight from '../FillHeight'
import sinon from 'sinon'

describe('FillHeight mixin', () => {
  var headerHeight = 10
  var footerHeight = 10
  var windowHeight = 100

  it('provides a fillHeight data which corresponds to available display height', () => {
    expect(fillHeight.data().fillHeight).toBeTruthy()
  })

  it('has a setFillHeight method that sets the value of fillHeight data to window height minus header height and footer height', () => {
    const getElements = sinon.stub(document, 'getElementsByClassName')
    getElements.withArgs('q-header').returns({
      item: () => {
        return { scrollHeight: headerHeight }
      }
    })
    getElements.withArgs('q-footer').returns({
      item: () => {
        return { scrollHeight: footerHeight }
      }
    })

    window.innerHeight = windowHeight

    fillHeight.methods.setFillHeight()
    /**
     * NOTE:
     * "this.fillHeight = ..." called in "setFillHeight" method does not change "data().fillHeight" value,
     * but creates a property "fillHeight" in "methods" object
     *  */
    expect(fillHeight.methods.fillHeight).toBe(80)
  })

  it('has "mounted" method which calls "setFillHeight" and sets an event listener that updates fillHeight on a window resize', () => {
    /**
     * NOTE:
     * Again, using "this.setFillHeight()" in "mounted" breaks the mixin, when not used in a vue component
     * I must artificially create the referenced function.
     * There might be a cleaner way to do that.
     */
    fillHeight.setFillHeight = jest.fn()
    jest.spyOn(window, 'addEventListener')
    fillHeight.mounted()
    expect(fillHeight.setFillHeight).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', fillHeight.setFillHeight)
  })
})

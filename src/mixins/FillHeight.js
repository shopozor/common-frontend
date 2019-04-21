export default {
  data () {
    return {
      fillHeight: window.innerHeight
    }
  },
  methods: {
    setFillHeight () {
      const header = document.getElementsByClassName('q-header').item(0)
      const footer = document.getElementsByClassName('q-footer').item(0)
      const headerHeight = header === null ? 0 : header.scrollHeight
      const footerHeight = footer === null ? 0 : footer.scrollHeight
      this.fillHeight = window.innerHeight - headerHeight - footerHeight
    }
  },
  mounted () {
    this.setFillHeight()
    window.addEventListener('resize', this.setFillHeight)
  }
}

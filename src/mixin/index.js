export default {
  data() {
    return {
      siftName: '',
      siftTime: '',
      loading: false,
      tableData: [{}],
      total: 0,
      current: 1,
      size: 10,
      dialog: false
    }
  },
  computed: {
    pagination() {
      const {current, size} = this
      return {current, size}
    }
  },
}
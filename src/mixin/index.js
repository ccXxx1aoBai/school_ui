import { exportExcel } from '@/api/index'

export default {
  data() {
    return {
      siftName: '',
      siftTime: '',
      siftYear: '',
      siftType: '',
      siftDept: '',
      siftRole: '',
      deptList: [],
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
  watch: {
    pagination(val) {
      this.getList(false)
    }
  },
  methods: {
    handleExport(type) {
      exportExcel(type).then(res => {
        console.log(res);
        const url = URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.download = decodeURIComponent(res.headers['filename'])
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
    }
  }
}
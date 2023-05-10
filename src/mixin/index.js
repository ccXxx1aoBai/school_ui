import { exportExcel } from '@/api/index'

export default {
  data() {
    return {
      siftId: '',
      siftName: '',
      siftTime: '',
      siftYear: '',
      siftType: '',
      siftDept: '',
      siftRole: '',
      siftMajor: '',
      siftClazz: '',
      siftLabel: '',
      siftValue: '',
      siftStatus: '',
      siftSubject: '',
      startTime: '',
      endTime: '',
      deptList: [],
      loading: false,
      tableData: [],
      total: 0,
      current: 1,
      size: 20,
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
      this.getList(true)
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
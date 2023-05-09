<template>
  <div>
    <div class="wrap">
      <div class="content">
        <div class="tools">
          <el-row>
            <el-col :span="3">
              <el-select v-model="siftYear">
                <el-option v-for="year in yearList" :key="year" :value="year"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="getList(true)">查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="table">
          <div class="row">
            <div class="col" style="min-height: auto;">星期一</div>
            <div class="col" style="min-height: auto;">星期二</div>
            <div class="col" style="min-height: auto;">星期三</div>
            <div class="col" style="min-height: auto;">星期四</div>
            <div class="col" style="min-height: auto;">星期五</div>
            <div class="col" style="min-height: auto;">星期六</div>
            <div class="col" style="min-height: auto;">星期日</div>
          </div>
          <div v-if="courses.length != 0">
            <div class="row" v-for="row in 5" :key="row">
              <div class="col" v-for="col in 7" :key="col">
                <div v-for="(item, index) in courses[col - 1][row - 1]" :key="index">
                  <p>{{ item.subject }}</p>
                  <p>
                    <span>{{ item.teacher }}</span>
                    <span>{{ item.position }}</span>
                  </p>
                  <p>{{ item.week }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin'
import {
  getYearList,
  getTeacherCourse
} from '@/api/course'
export default {
  name: '',
  data() {
    return {
      yearList: [],
      courses: []
    }
  },
  mixins: [mixin],
  created() {
    const curdate = new Date()
    const year = curdate.getFullYear()
    this.siftYear = curdate.getMonth() < 6 ? `${(year - 1)}-${year}-2` : `${(year)}-${(year + 1)}-1`
    this.getList(true)
    getYearList().then(res => {
      if(res.data.code === 200) {
        this.yearList = res.data.data
      }
    })
  },
  methods: {
    getList(load) {
      this.loading = load
      const params = {}
      params.id = 'DFDFEAAAFHNXa1bcf55a5c0022fc8519' || this.$store.getters.uid
      params.siftTime = this.siftYear
      getTeacherCourse(params).then(res => {
        this.loading = false
        const { code, data } = res.data
        if(code === 200) {
          setTimeout(() => {
            data.map(item => {
              item.week = item.week.split(',').sort((a, b) => {
                return a - b
              }) + ''
              return item
            })
            const weeks = []
            for(let i = 0; i < 7; i++) {
              weeks.push([])
            }
            for(let i = 0; i < 7; i++) {
              const day = data.filter(item => {
                return item.day == i
              })
              for(let j = 0; j < 5; j++) {
                const time = day.filter(item => {
                  return item.time == j
                })
                weeks[i][j] = time
              }
            }
            this.courses = weeks
          }, 0)
        }
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tools {
  margin-bottom: 20px;

  &::v-deep .el-col{
    margin: 0 10px;
  }
}
.content{
  width: 90%;
  margin: auto;

  .table {
    height: 700px;
  }
  .row {
    display: flex;

    .col {
      justify-content: center;
      width: 100%;
      min-height: 80px;
      border-top: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;
      padding: 10px;
      box-sizing: border-box;
      text-align: center;

      &:first-child {
        border-left: 1px solid #eeeeee;
      }
    }

    &:last-child {
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
const dateType = [
  {
    value: '0',
    label: '全部'
  },{
    value: '1',
    label: '单周',
  },{
    value: '2',
    label: '双周',
  }
]

const weeks = [
  {
    value: '1',
    label: '周一'
  },{
    value: '2',
    label: '周二'
  },{
    value: '3',
    label: '周三'
  },{
    value: '4',
    label: '周四'
  },{
    value: '5',
    label: '周五'
  },{
    value: '6',
    label: '周六'
  },{
    value: '7',
    label: '周日'
  }
]

const date = [
  {
    value: '1',
    label: '一二节'
  },{
    value: '2',
    label: '三四节'
  },{
    value: '3',
    label: '五六节'
  },{
    value: '4',
    label: '七八节'
  },{
    value: '5',
    label: '九十节'
  },
]

weeks.map(week => {
  week.children = date
})

dateType.map(dat => {
  dat.children = weeks
})

export default dateType
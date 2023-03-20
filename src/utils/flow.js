export const setFlow = (data, type) => {
  const flows = ['新建', '班主任审核', '学院审核', '学生办审核', '归档']
  const rs = []
  let i = 0
  do {
    rs.push({
      name: flows[i]
    })
    i++
  }while(i < parseInt(type) + 2)
  rs.push({
    name: '归档'
  })
  if(data) {
    for(let i = 0; i < data.length; i++) {
      const { result, opinion, createTime, nodeCode } = data[i]
      const { name } = rs[i]
      rs[i] = {
        name,
        result,
        opinion,
        createTime,
        nodeCode
      }
    }
  }
  console.log(rs);
  return rs
}
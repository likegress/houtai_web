const Mock = require("mockjs")
const Random = Mock.Random;
const table = Mock.mock({
  "tableData|10": [
    {
      "id|+1": 1,
      date: () => Mock.mock("@date()"),
      title: () => Mock.mock("@csentence(5)"),
      author: () => Random.cname(),
      price: () => Random.integer(1000, 10000),
      checked: true,
      "star|1": [1, 2, 3, 4, 5],
    },
  ],
});
//获取
Mock.mock("/api/adusTable","get",()=>{
    const data = Mock.mock({
      "tableArr|10": [
        {
          "id|+1": 1,
          date: () => Mock.mock("@date()"),
          title: () => Mock.mock("@csentence(5)"),
          author: () => Random.cname(),
          price: () => Random.integer(1000, 10000),
          checked: true,
          "star|1": [1, 2, 3, 4, 5],
        },
      ],
    });
    return {data,table}
})

//删除接口
Mock.mock(/\/api\/delete\?id=\d/,"delete",(options)=>{
  let id = options.url.split("=")[1];
  let tableArr = table.tableData;
  let index = tableArr.findIndex((i) => id == i.id);
  tableArr.splice(index, 1);
  return {
    status: "200",
    message: "删除成功",
    tableArr,
  };
})

//修改接口
Mock.mock("/api/update","put",(config)=>{
  let body= JSON.parse(config.body);

  let tableArr = table.tableData;
  let i = tableArr.findIndex((i) => i.id == body.id);
  tableArr[i] = body;
  return tableArr;
})

//添加接口
Mock.mock(/\/api\/add/,"post",(config)=>{
  const body = JSON.parse(config.body);
  let tableArr = table.tableData;
  body.id = tableArr.length+1
  tableArr.push(body);
  return {
    status: "200",
    message: "添加成功",
    tableArr,
  };
})




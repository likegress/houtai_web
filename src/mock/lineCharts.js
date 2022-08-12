const Mock = require("mockjs");
Mock.mock(/\/api\/lineCharts/,"get",()=>{
    let data = Mock.mock({
      "line1|7": [() => Mock.Random.integer(100, 1200)],
      "line2|7": [() => Mock.Random.integer(30, 2000)],
    });

    return data
})
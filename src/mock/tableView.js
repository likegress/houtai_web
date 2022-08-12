const Mock = require("mockjs");
const Random = Mock.Random;
const tableData = Mock.mock({
  "tableData|7": [
    {
      title: () => Random.string(5, 10),
      price: () => Random.float(100, 10000, 2, 2),
      address: () => Random.county(true),
      "type|1": ["info", "success", "primary", "danger", "warning"],
      flag:false,
      titleOrigin:""
    },
  ],
});
Mock.mock(/\/api\/table/, "get", () => {
  return tableData;
});

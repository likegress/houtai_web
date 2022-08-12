let Mock = require("mockjs")
Mock.mock("/api/login", "post", (options) => {
//   console.log(JSON.parse(options.body));
  let { username, password } = JSON.parse(options.body);
//    console.log(username, password);
    if (username === "admin" && password == 123456) {
      return {
        status: 200,
        message: "success",
        data: {
          username,
          password,
          token:"234sdaasfdqwe123"
        },
      };
    }else {
      return {
        status: 501,
        message: "fail",
      };
    }
});
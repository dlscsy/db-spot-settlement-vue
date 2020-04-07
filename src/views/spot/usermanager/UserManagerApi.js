import request1 from "utils/request1";

/**
 * @Description: demo
 * @Author chenyue
 * @Date 2020/3/5 15:00
 */
export default class UserManagerApi {

  static getAllInfo(queryParam) {
    return request1("/main/userController/getAllInfo", "post", queryParam)
  }

  static deleteInfo(ids) {
    return request1("/main/userController/deleteInfo", "post", ids)
  }

  static addInfo(userItem) {
    return request1("/main/userController/addInfo", "post", userItem)
  }

  static updateInfo(userItem) {
    return request1("/main/userController/updateInfo", "post", userItem)
  }
}

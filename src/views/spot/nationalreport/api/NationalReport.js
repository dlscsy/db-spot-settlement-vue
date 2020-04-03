import request from '@/utils/request'
/**
  *@name: 中心上报页面 api
  *@Authror: wangwei
  *@Date: 2020/04/03
*/
export default class NationalReportApi {
    static getAllInfo(queryParam) {
        return request({
            url: '',
            method: 'post',
            data: queryParam
        })
    }
}

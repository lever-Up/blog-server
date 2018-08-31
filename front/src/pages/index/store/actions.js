import qs from 'qs';
import request from '../../../utils/request';
import utils from '../../../utils';

let SET_PARAM = 'SET_PARAM';

export default {
    // 查询列表
    async queryList({commit, state}, params) {
        let ret = await request(`url`);
        if(ret && ret.code === 0) {
            commit(SET_PARAM, {
                dataList: []
            })
        }
    }
}
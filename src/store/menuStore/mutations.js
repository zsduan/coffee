export const mutations = {

  changeData(state, data) {
    //data: 载荷
    //data.key: 修改数据的名称
    //data.value: 修改的数据

    state[data.key] = data.value;
  }
  

}
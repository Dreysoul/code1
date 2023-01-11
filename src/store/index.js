import { userProfilesAPI } from "@/request/api";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	// 定义数据
	state: {
		showLoginModel: false, //登录框
		isLogined: localStorage.getItem("x-auth-token") ? true : false, //判断是否登录成功
		cartTotal: 0, //购物车
		userInfo: {
			//登录用户
			nickName: "张三",
			coin: 0,
			headImg: require("../assets/img/userImg.f8bbec5e.png"),
		},
	},
	// 相当于计算属性
	getters: {},
	// 唯一改变数据的地方
	mutations: {
		// state修改的对象，val修改后的值
		changeShowLoginModel(state, val) {
			state.showLoginModel = val;
		},
		changLogined(state, val) {
			state.isLogined = val;
		},
		// 改变购物车
		changeCartTotal(state, val) {
			state.cartTotal = val;
		},
		// 用户信息
		changeUserInfo(state, val) {
			state.userInfo = val;
		},
	},
	// 异步获取数据
	actions: {
	async	asyncChangeUserInfo (context) {
			// 发送请求获取数据
			let res = await userProfilesAPI()
			console.log(res);
			if (res.code == 0) {
				context.commit('changeCartTotal', res.data.cartTotal)//跟新购物车
				context.commit('changeUserInfo',res.data.userInfo)//更新用户信息
			}
			
		}
	},
	// 模块
	modules: {},
});

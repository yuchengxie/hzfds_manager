import Mock from 'mockjs';
import homeApi from './home';

//设置延时 200-1000ms 请求到数据
Mock.setup({
  timeout:'200-2000'//接口随机延时，延时时间可能不一样
})

//首页相关
//拦截的是 /home/getData
Mock.mock(/\/home\/getData/,'get',homeApi.getStatisticalData);



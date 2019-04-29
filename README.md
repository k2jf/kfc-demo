# kfc-demo

## 功能
集成kfc的各个组件，用于演示目的。

## 维护者
zhanghao

## 使用说明

### 环境要求：
- npm 3或以上版本
- git 1.8或以上版本
- 需要启动kbc服务

<<<<<<< HEAD
### 下载代码
```bash
git clone git@github.com:k2jf/kfc-demo.git
```
=======
| 属性         | 说明     | 类型   | 默认值 |
| ----------- | -------- | ------ | ------ |
| title | 图表标题 | String | -      |
| path | 请求参数 | String | 'filestore://' |
| queueName | 请求参数 | String | 'default_queue' |
| selectType | 请求参数 | String | -      |
| selectTable | 请求参数 | String | -      |
| wfid | 请求参数 | String | '140604' |
| wtid | 请求参数 | String | '140604006' |
| startTime | 请求参数 | String | '2019-01-11 00:00:00.000' |
| endTime | 请求参数 | String | '2019-01-11 23:59:59.000' |
>>>>>>> d8194b0e6dc8dbe6ee94219ac9035d577b91efc0

### 启动服务
```bash
cd kfc-demo
npm install
npm run serve
```
<<<<<<< HEAD

### 访问首页
=======
<template>
  <TimeSeries
    :title="title"
    :path="path"
    :queueName="queueName"
    :selectType="selectType"
    :selectTable="selectTable"
    :wfid="wfid"
    :wtid="wtid"
    :startTime="startTime"
    :endTime="endTime"
  />
</template>

<script>
import TimeSeries from '@/components/kfc-kmx-tsdw-chart'

export default {
  components: {
    TimeSeries
  },
  data () {
    return {
      title: '新疆哈密烟墩大二期整装天润风电场-F084机组',
      path: 'filestore://',
      queueName: 'default_queue',
      selectType: 'ts,wfid,wtid,WTUR_WSpd_Ra_F32,WTUR_Temp_Ra_F32',
      selectTable: 'gw_scada_7s_extension',
      wfid: '140604',
      wtid: '140604006',
      startTime: '2019-01-11 00:00:00.000',
      endTime: '2019-01-11 23:59:59.000'
    }
  }
}
</script>
>>>>>>> d8194b0e6dc8dbe6ee94219ac9035d577b91efc0
```
http://localhost:8080/home
```
# kfc-auth
授权管理

# Authorization

## 功能
用于用户角色授权

## 维护者
youli

## 示例
```
<template>
    <Authorization />
</template>

<script>
    import Authorization from '@/components/kfc-auth'
    components: {
        Authorization
    },
    export default {
    data () {
        return {
        }
    },
    }
</script>

```

## src/api/auth.js
```
module.exports = {
  api: {
    // 授权管理
    resourceTypes: '/auth-service/v1/resourcetypes',
    roles: '/auth-service/v1/roles',
    users: '/auth-service/v1/users',
    permissions: '/auth-service/v1/permissions',
    resourceinfos: '/auth-service/v1/resourceinfos',
    // 时序
    timeSeries: '/batch-rest/dataset',
    // pas
    pasService: '/pas/services/hdfs/browse',
    pasDownload: '/pas/services/hdfs/download'
  }
}


```

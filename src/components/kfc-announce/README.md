# kfc-announce
component to manage system messages as well as show them in floating bar

## maintainer
zhangzhenbang

## install
```bash
git remote add -f kfc-announce git@github.com:k2jf/kfc-announce.git
git subtree add -P src/components/kfc-announce kfc-announce master --squash
```
Since this project contains two components, namely a **manager** and a 
**display**, so you should refer to them by locating the sub-folders.

> the manager -- `import KfcAnnounceManager from '@/components/kfc-announce/manager'`  
> the display -- `import KfcAnnounceDisplay from '@/components/kfc-announce/display'`

## use case

  ### the manager 
  *the manager* provides a view to manage announces.
  
```vue
<template>
  <AnnounceManager />  <!-- yes, you ONLY need that -->
</template>

<script>
import AnnounceManager from '@/components/kfc-announce/manager'
export default {
  name: 'Home',
  components: {
    AnnounceManager
  }
}
</script>

```
  
  ### the display 
  *the display* provides a floating bar to display announces. Note that the position
  as well as the width **should be specified by user** using pure css. 

```vue
<template>
  <div>
    <AnnounceDisplay style="..."/>
  </div>
</template>

<script>
import AnnounceDisplay from '@/components/kfc-announce/display'

export default {
  name: 'Home',
  components: {
    AnnounceDisplay
  }
}
</script>
```

## limitation
- backend is needed to supply announces, thus this project **cannot run** without 
  backend-related APIs
- currently the sliding animation is rough and stiffy. Further work is needed to 
  make it more natural.
- *the display* is not auto-synced. The contents are only fetched once per load. 

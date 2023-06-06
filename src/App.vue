<script setup>
import { onMounted } from 'vue'
import apiUtils from '@/api/apiUtils'

onMounted(() => {
  apiUtils.post('/democrs/cheque/GetChequeList').then((res) => {
    console.log('沒有 test: ', res)
  })
  apiUtils.post('/democrs/cheque/GetChequeList', {}, 'test').then((res) => {
    console.log('有 test: ', res)
  })
})
</script>

<template>
  <div></div>
</template>

<style scoped></style>

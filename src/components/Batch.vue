<script setup>
import { ElNotification } from 'element-plus'
import { DataAnalysis, Delete, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useBaseURL } from '@/baseURL.js'
import axios from 'axios'

const baseURL = useBaseURL()
const upload = ref()
const file = ref()
const isClear = ref(true)
const isLoading = ref(false)
const result = ref({})

const analyse = () => {
  isClear.value = false
  isLoading.value = true
  axios.post(baseURL.value.model + '/file_predict', {
      file: file.value.raw
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response.data)
      result.value = response.data
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: '网络错误',
        message: '请检查网络连接后重试',
        type: 'error',
      })
      isClear.value = true
    }).finally(() => {
      isLoading.value = false
    })
}

const clear = () => {
  file.value = null
  upload.value.clearFiles()
  isClear.value = true
}

const changeFile = (f) => {
  file.value = f
}

const exportResult = () => {
  const downloadURL = baseURL.value.model + result.value['fusion_file_url']
  // window.open(downloadURL)

  fetch(downloadURL, {
      method: 'get',
      responseType: 'arraybuffer',
  }).then(res => {
      if (res.status !== 200) {
          return res.json()
      }
      return res.arrayBuffer()
  }).then(blobRes => {
      const e = new Blob([blobRes], {
          type: 'application/octet-stream',
          'Content-Disposition':'attachment'
      })
      const link = window.URL.createObjectURL(e)
      let a = document.createElement('a')
      a.href = link;
      a.download = '批量辨识报告.json'
      a.click();
  }).catch(err => {
      console.error(err)
  })
}
</script>

<template>
  <div class="content-div">
    <el-row style="margin: 1rem auto; max-width: 60rem;">
      <h1 style="margin-top: 0">批量辨识</h1>
      <el-row style="width: 100%">
        <el-upload
          ref="upload"
          drag
          action="/"
          style="width: 100%;"
          accept=".json"
          :limit="1"
          :auto-upload="false"
          :on-change="changeFile"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将文件拖拽至此处或<em>点击此处上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              仅接受json格式的文件
            </div>
          </template>
        </el-upload>
      </el-row>
    </el-row>

    <el-row justify="center" style="margin: 3rem 0;">
      <el-button type="primary" size="large" :icon="DataAnalysis" @click="analyse" v-if="!isLoading" :disabled="file == null">分析</el-button>
      <el-button type="primary" size="large" loading v-if="isLoading">分析中</el-button>
      <el-button type="danger" size="large" :icon="Delete" @click="clear">清空</el-button>
    </el-row>

    <el-row style="margin: 1rem auto; max-width: 60rem;">
      <el-card class="box-card" style="width: 100%; margin: 1rem 0;">
        <template #header>
          <div class="card-header">
            <span>辨识结果</span>
            <span style="float: right;" v-if="!isClear && !isLoading"><el-button type="warning" @click="exportResult">导出</el-button></span>
          </div>
        </template>
        <el-empty v-if="isClear" description="无结果" />
        <el-skeleton v-if="isLoading" :rows="5" animated />
        <div v-if="!isClear && !isLoading" style="text-align: center;">
          <el-table :data="result.fusion_res" style="width: 100%">
            <el-table-column prop="idx" label="ID" width="50" />
            <el-table-column label="内容">
              <template #default="scope">
                <el-popover
                  placement="top-start"
                  :width="500"
                  trigger="hover"
                  :content="scope.row.content"
                >
                  <template #reference>
                    <span>{{ scope.row.content.slice(0, 50) }}...</span>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="预测结果" width="100">
              <template #default="scope">
                <el-popover
                  placement="top-start"
                  :width="220"
                  trigger="hover"
                >
                  <template #reference>
                    <el-tag :type="scope.row.final_pred == 'fake' ? 'danger' : 'success'">
                      {{ scope.row.final_pred == 'fake' ? '虚假' : '真实' }}
                    </el-tag>
                  </template>
                  <p>综合真实概率：{{ (scope.row.final_real_pred * 100).toFixed(2) }}%</p>
                  <p>综合虚假概率：{{ (scope.row.final_fake_pred * 100).toFixed(2) }}%</p>
                  <p>ARG 真实概率：{{ (scope.row.argd_real * 100).toFixed(2) }}%</p>
                  <p>ARG 虚假概率：{{ (scope.row.argd_fake * 100).toFixed(2) }}%</p>
                  <p>NEP 真实概率：{{ (scope.row.nep_real * 100).toFixed(2) }}%</p>
                  <p>NEP 虚假概率：{{ (scope.row.nep_fake * 100).toFixed(2) }}%</p>
                  <p>RAG 真实概率：{{ (scope.row.rag_real * 100).toFixed(2) }}%</p>
                  <p>RAG 虚假概率：{{ (scope.row.rag_fake * 100).toFixed(2) }}%</p>
                  <p>EDG 真实概率：{{ (scope.row.edg_real * 100).toFixed(2) }}%</p>
                  <p>EDG 虚假概率：{{ (scope.row.edg_fake * 100).toFixed(2) }}%</p>
                  <p>Disturb 真实概率：{{ (scope.row.Disturb_real * 100).toFixed(2) }}%</p>
                  <p>Disturb 虚假概率：{{ (scope.row.Disturb_fake * 100).toFixed(2) }}%</p>
                  <p>CrossVal 真实概率：{{ (scope.row.CrossVal_real * 100).toFixed(2) }}%</p>
                  <p>CrossVal 虚假概率：{{ (scope.row.CrossVal_fake * 100).toFixed(2) }}%</p>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<style scoped>
.content-div {
  width: 100%;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 1.5rem;
}

.el-button {
  font-size: 1rem;
  margin: 0 1rem;
}

.el-textarea {
  font-size: 1.2rem;
}
</style>

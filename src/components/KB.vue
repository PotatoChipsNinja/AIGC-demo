<script setup>
import { ElNotification } from 'element-plus'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { useBaseURL } from '@/baseURL.js'
import axios from 'axios'

const baseURL = useBaseURL()
const upload = ref()
const file = ref()
const addVisible = ref(false)
const docs = ref({})
// const docs = ref({
//     "code": 200,
//     "msg": "success",
//     "data": [
//         {
//             "kb_name": "hallucination",
//             "file_name": "news/news_chunk_18.csv",
//             "file_ext": ".csv",
//             "file_version": 1,
//             "document_loader": "CSVLoader",
//             "docs_count": 10000,
//             "text_splitter": "ChineseRecursiveTextSplitter",
//             "create_time": "2024-10-28T15:42:54",
//             "in_folder": true,
//             "in_db": true,
//             "file_mtime": 1730125307.795797,
//             "file_size": 4017936,
//             "custom_docs": false,
//             "No": 1
//         },
//         {
//             "kb_name": "hallucination",
//             "file_name": "news/news_chunk_9.csv",
//             "file_ext": ".csv",
//             "file_version": 1,
//             "document_loader": "CSVLoader",
//             "docs_count": 10000,
//             "text_splitter": "ChineseRecursiveTextSplitter",
//             "create_time": "2024-10-28T14:42:43",
//             "in_folder": true,
//             "in_db": true,
//             "file_mtime": 1730125307.439797,
//             "file_size": 4124422,
//             "custom_docs": false,
//             "No": 2
//         }
//     ]
// })

const getDocs = (isRefresh) => {
  axios.get(baseURL.value.kb + '/knowledge_base/list_files', {
      params: {
        knowledge_base_name: 'hallucination'
      }
    }).then((response) => {
      docs.value = response.data
      if (isRefresh) {
        ElNotification({
          title: '刷新成功',
          message: '已显示最新文档列表',
          type: 'success',
        })
      }
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: '网络错误',
        message: '请检查网络连接后重试',
        type: 'error',
      })
    })
}

const downloadDoc = (row) => {
  const downloadURL = baseURL.value.kb + '/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=' + row.file_name
  window.open(downloadURL)
}

const deleteDoc = (row) => {
  axios.post(baseURL.value.kb + '/knowledge_base/delete_docs', {
      knowledge_base_name: 'hallucination',
      file_names: [row.file_name],
      delete_content: true
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      ElNotification({
        title: '删除成功',
        message: '已将知识文件从知识库中删除',
        type: 'success'
      })
      getDocs(false)
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: '网络错误',
        message: '请检查网络连接后重试',
        type: 'error',
      })
    })
}

const changeFile = (f) => {
  file.value = f
}

const clear = () => {
  file.value = null
  upload.value.clearFiles()
}

const addDoc = () => {
  axios.post(baseURL.value.kb + '/knowledge_base/upload_docs', {
      files: file.value.raw,
      knowledge_base_name: 'hallucination'
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      ElNotification({
        title: '新增成功',
        message: '已将知识文件添加至知识库',
        type: 'success'
      })
      addVisible.value = false
      clear()
      getDocs(false)
    }).catch((error) => {
      console.log(error)
      ElNotification({
        title: '网络错误',
        message: '请检查网络连接后重试',
        type: 'error',
      })
    })
}

onMounted(() => {
  getDocs(false)
})
</script>

<template>
  <el-dialog v-model="addVisible" title="新增知识文件" style="width: 40%;">
    <el-upload
      ref="upload"
      drag
      action="/"
      style="width: 100%;"
      accept=".csv"
      :limit="1"
      :auto-upload="false"
      :on-change="changeFile"
      :on-remove="clear"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖拽至此处或<em>点击此处上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          仅接受csv格式的文件
        </div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="addDoc" :disabled="file == null">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <div class="content-div">
    <el-row style="margin: 1rem auto 0 auto; max-width: 80%;">
      <h1 style="margin-top: 0">知识管理</h1>
    </el-row>

    <el-row style="margin: 0 auto; max-width: 80%;">
      <!-- 靠右设置新增和刷新按钮 -->
      <div style="width: 100%; text-align: right; margin-bottom: 1rem;">
        <el-button
          type="primary"
          icon="Plus"
          @click="addVisible = true"
        >
          新增
        </el-button>
        <el-button
          type="warning"
          icon="Refresh"
          @click="getDocs(true)"
        >
          刷新
        </el-button>
      </div>

      <el-table :data="docs.data" style="width: 100%">
        <el-table-column prop="No" label="序号" width="100" />
        <el-table-column prop="file_name" label="文件名" width="250" />
        <el-table-column prop="file_ext" label="格式" width="120" />
        <el-table-column prop="docs_count" label="文档数" width="120" />
        <el-table-column prop="text_splitter" label="文本分割器" width="250" />
        <el-table-column prop="create_time" label="创建时间" width="200" />
        <el-table-column prop="file_size" label="文件大小" width="120" />
        <el-table-column fixed="right" label="操作" min-width="200">
          <template #default="scope">
            <el-button
              plain
              size="small"
              type="primary"
              @click="downloadDoc(scope.row)"
            >
              下载
            </el-button>

            <el-popconfirm
              title="确定删除该文件吗？"
              confirm-button-text="是"
              cancel-button-text="否"
              @confirm="deleteDoc(scope.row)"
            >
              <template #reference>
                <el-button
                  plain
                  size="small"
                  type="danger"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
</style>

<script setup>
import { ElNotification } from 'element-plus'
import { DataAnalysis, Delete, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useBaseURL } from '@/baseURL.js'
import axios from 'axios'

const baseURL = useBaseURL()
const options = ref(['glm-4-plus', 'baichuan2-7b', 'qwen-72b', 'baichuan3turbo', 'xverse-13b', 'moonshot', 'yi-34b', 'abab5.5', 'chinesellama2-13b', 'ernie-3.5', 'qwen-14b', 'ernie-4', 'baichuan4', 'abab6.5s-chat', 'baichuan2-13b', 'abab6.5', 'chatglm2-6b', 'qwen2.5-72b-instruct', 'xverse-65b', 'hunyuan-pro', 'Doubao-pro-32k-240828', 'iflyspark-13b', 'chinesellama2-7b', 'chatglm3-6b', 'chatglm4', 'sensechat'])
const model = ref('')
const text = ref('')
const isClear = ref(true)
const isLoading = ref(false)
const reportVisible = ref(false)
const time = ref('')
const result = ref({})
// const result = ref({
//     "idx": 0,
//     "content": "#两会声音#【崔波委员：新时代应大力弘扬勤劳奋斗俭朴节约传统美德】“千百年来，我国劳动人民总结出了‘历览前贤国与家，千载经验克己奉公’的谚语，这是我们中华民族的传统美德。在新时代，我们更应该弘扬勤劳奋斗、俭朴节约的优秀品质，让这种精神代代相传。”崔波委员说。\\n为此，崔波委员建议，国家应加强对传统美德的宣传和教育，将其纳入国民教育体系，让更多年轻人树立正确的价值观。同时，他还呼吁全社会共同参与，从自身做起，从点滴细节中践行勤劳奋斗、俭朴节约的美德，共同为国家的繁荣发展贡献力量。",
//     "argd_real": 0.18864008784294128,
//     "argd_fake": 0.8113599419593811,
//     "argd_pred": "fake",
//     "nep_real": 1.3271983512197494e-10,
//     "nep_fake": 1,
//     "nep_pred": "fake",
//     "rag_real": 0,
//     "rag_fake": 1,
//     "rag_pred": "fake",
//     "rag_retrieve_docs": [
//         "出处 [1] [news/news_chunk_6.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_6.csv) \n\ncontent: 【新华社副总编：激发全社会崇德向善的力量】崇德向善，是我们这个民族的底色，也是应当恪守的底线！为富不仁的“老板”、黑心造假者、贪贿官员，绝对不是这个社会的主流。我们应以“官风”之变促民风转变，以“官德”示范社会公德。“官风”决定民风，“官德”影响民德。慎海雄\ntime: 2013-12-08 16:45:05\nid: 3653275876207096\n\n",
//         "出处 [2] [news/news_chunk_18.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_18.csv) \n\ncontent: 【新华社评论员：奏响新时代的奋斗壮歌】劳动光荣，创造伟大。奋斗者既是时代进步的推动者，也应是发展成果的获益者。发扬奋斗精神，要坚持以奋斗者为本的价值取向，通过完善制度保障、加大执行力度保护劳动者合法权益，让劳动者得到应有的回报和尊重，营造热爱劳动、崇尚劳动、关爱劳动者的良好社会氛\ntime: 2019-05-01 14:13:56\nid: 4367141929492454\n\n",
//         "出处 [3] [news/news_chunk_3.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_3.csv) \n\ncontent: 两会要节俭，更要务实正如民主也有成本一样，开会必然有成本，关键是要让公众觉得花得值，要看得见为了纳税人利益而唇枪舌剑的预算辩论，看到代表委员经过细致调研后拿出来的高质量提案议案……否则,公众就会觉得“不值”，再少的花费，公众也觉得“白花了钱”。O两会要节俭更要务实_新华每日电讯\ntime: 2013-02-28 14:16:00\nid: 3550682688717742\n\n"
//     ],
//     "edg_real": 0.06257082521915436,
//     "edg_fake": 0.9374292492866516,
//     "edg_pred": "fake",
//     "Disturb_real": 0,
//     "Disturb_fake": 1,
//     "Disturb_pred": "fake",
//     "CrossVal_real": 0.09420135617256165,
//     "CrossVal_fake": 0.905798614025116,
//     "CrossVal_pred": "fake",
//     "final_real_pred": 0.05756871156122952,
//     "final_fake_pred": 0.9424313008785248,
//     "final_pred": "fake",
//     "explain_output": [
//         {
//             "特征名": "feature_80",
//             "重要性": "1.5000837",
//             "特征值": "0.5",
//             "常模": "1.5013936464373046"
//         },
//         {
//             "特征名": "feature_0",
//             "重要性": "0.8903689",
//             "特征值": "1.8103448275862069",
//             "常模": "1.8000719675768602"
//         },
//         {
//             "特征名": "feature_35",
//             "重要性": "0.8388247",
//             "特征值": "116.0",
//             "常模": "64.20072443181817"
//         },
//         {
//             "特征名": "feature_41",
//             "重要性": "0.7798143",
//             "特征值": "8.0",
//             "常模": "6.602442613639765"
//         },
//         {
//             "特征名": "feature_30",
//             "重要性": "0.5912195",
//             "特征值": "0.16666666666666666",
//             "常模": "0.04185804544719985"
//         }
//     ]
// })

const analyse = () => {
  isClear.value = false
  isLoading.value = true
  axios.post(baseURL.value.model + '/full_predict', {
      text: text.value,
      model_name: model.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      console.log(response.data)
      result.value = response.data
      time.value = new Date().toLocaleString()
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
  text.value = ''
  model.value = ''
  result.value = {}
  isClear.value = true
}

const ragDocProc = (doc) => {
  return doc.split('\n\ncontent: ')[1].split('\ntime: ')[0]
}
</script>

<template>
  <el-dialog v-model="reportVisible" title="辨识结果报告" style="width: 60%;">
    <div id="printMe" v-if="!isClear">
      <el-descriptions
        class="margin-top"
        :column="6"
        size="large"
        border
      >
        <el-descriptions-item span="3">
          <template #label>
            <div class="cell-item" style="min-width: 10rem;">
              <el-icon style="margin-right: 8px">
                <setting />
              </el-icon>
              检测类型
            </div>
          </template>
          精细辨识
        </el-descriptions-item>
        <el-descriptions-item span="3">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <timer />
              </el-icon>
              检测时间
            </div>
          </template>
          {{ time }}
        </el-descriptions-item>
        <el-descriptions-item span="6">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <document />
              </el-icon>
              文本内容
            </div>
          </template>
          {{ text }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              综合预测标签
            </div>
          </template>
          {{ result['final_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              综合真实概率
            </div>
          </template>
          {{ (result['final_real_pred'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              综合虚假概率
            </div>
          </template>
          {{ (result['final_fake_pred'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              ARG预测标签
            </div>
          </template>
          {{ result['argd_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              ARG真实概率
            </div>
          </template>
          {{ (result['argd_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              ARG虚假概率
            </div>
          </template>
          {{ (result['argd_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              NEP预测标签
            </div>
          </template>
          {{ result['nep_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              NEP真实概率
            </div>
          </template>
          {{ (result['nep_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              NEP虚假概率
            </div>
          </template>
          {{ (result['nep_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              RAG 预测标签
            </div>
          </template>
          {{ result['rag_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              RAG 真实概率
            </div>
          </template>
          {{ (result['rag_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              RAG 虚假概率
            </div>
          </template>
          {{ (result['rag_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              EDG 预测标签
            </div>
          </template>
          {{ result['edg_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              EDG 真实概率
            </div>
          </template>
          {{ (result['edg_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              EDG 虚假概率
            </div>
          </template>
          {{ (result['edg_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              Disturb 预测标签
            </div>
          </template>
          {{ result['Disturb_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              Disturb 真实概率
            </div>
          </template>
          {{ (result['Disturb_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              Disturb 虚假概率
            </div>
          </template>
          {{ (result['Disturb_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <collection-tag />
              </el-icon>
              CrossVal 预测标签
            </div>
          </template>
          {{ result['CrossVal_pred'] == 'fake' ? '虚假信息' : '真实信息' }}
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              CrossVal 真实概率
            </div>
          </template>
          {{ (result['CrossVal_real'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="2">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              CrossVal 虚假概率
            </div>
          </template>
          {{ (result['CrossVal_fake'] * 100).toFixed(2) }}%
        </el-descriptions-item>
        <el-descriptions-item span="6" v-for="doc in result['rag_retrieve_docs']" :key="doc">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <document />
              </el-icon>
              证据文档 {{ result['rag_retrieve_docs'].indexOf(doc) + 1 }}
            </div>
          </template>
          {{ ragDocProc(doc) }}
        </el-descriptions-item>
        <div v-for="feature in result['explain_output']" :key="feature">
          <el-descriptions-item span="2">
            <template #label>
              <div class="cell-item">
                <el-icon style="margin-right: 8px">
                  <setting />
                </el-icon>
                {{ feature['特征名'] }}
              </div>
            </template>
            {{ feature['特征值'] }}
          </el-descriptions-item>
          <el-descriptions-item span="2">
            <template #label>
              <div class="cell-item">
                <el-icon style="margin-right: 8px">
                  <odometer />
                </el-icon>
                重要性
              </div>
            </template>
            {{ feature['重要性'] }}
          </el-descriptions-item>
          <el-descriptions-item span="2">
            <template #label>
              <div class="cell-item">
                <el-icon style="margin-right: 8px">
                  <odometer />
                </el-icon>
                常模
              </div>
            </template>
            {{ feature['常模'] }}
          </el-descriptions-item>
        </div>
        <el-descriptions-item v-show="false"></el-descriptions-item>
      </el-descriptions>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="warning" v-print="'#printMe'">导出</el-button>
        <el-button type="primary" @click="reportVisible = false">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <div class="content-div">
    <el-row style="margin: 1rem auto; max-width: 60rem;">
      <h1 style="margin-top: 0">精细辨识</h1>
      <el-row style="width: 100%;">
        <el-form-item label="生成模型：">
          <el-select
            v-model="model"
            placeholder="请选择模型名"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-input
          v-model="text"
          :rows="6"
          type="textarea"
          placeholder="请输入待分析生成文本"
      />
    </el-row>

    <el-row justify="center" style="margin: 3rem 0;">
      <el-button type="primary" size="large" :icon="DataAnalysis" @click="analyse" v-if="!isLoading" :disabled="text.length == 0 || model == ''">分析</el-button>
      <el-button type="primary" size="large" loading v-if="isLoading">分析中</el-button>
      <el-button type="danger" size="large" :icon="Delete" @click="clear">清空</el-button>
    </el-row>

    <el-row style="margin: 1rem auto; max-width: 60rem;">
      <el-card class="box-card" style="width: 100%; margin: 1rem 0;">
        <template #header>
          <div class="card-header">
            <span style="font-size: 1.2rem;">辨识结果</span>
          </div>
        </template>
        <el-empty v-if="isClear" description="无结果" />
        <el-skeleton v-if="isLoading" :rows="5" animated />
        <div v-if="!isClear && !isLoading" style="text-align: center;">
          <div class="demo-progress">
            <el-progress type="dashboard" :percentage="Math.round(result['final_real_pred'] * 100)" :status="result['final_pred'] == 'fake' ? 'exception' : 'success'">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">可信度</span>
              </template>
            </el-progress>
          </div>
          <el-result
            :title="result['final_pred'] == 'fake' ? '该文本为虚假信息' : '该文本为真实信息'"
            sub-title="结果仅供参考，不作为最终判定依据"
            style="padding: 0 0 2rem 0;"
          >
            <template #icon><div></div></template>
          </el-result>
          <el-button type="primary" size="large" :icon="Search" @click="reportVisible = true" text bg round>详细报告</el-button>
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

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>

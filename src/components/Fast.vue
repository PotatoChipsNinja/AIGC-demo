<script setup>
import { ElNotification } from 'element-plus'
import { DataAnalysis, Delete, Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useBaseURL } from '@/baseURL.js'
import axios from 'axios'

const baseURL = useBaseURL()
const text = ref('')
const isClear = ref(true)
const isLoading = ref(false)
const reportVisible = ref(false)
const time = ref('')
const featureDesc = ref(["", "平均每词字符数", "平均每句词数", "平均每句单字词数", "平均每句双字词数", "平均每句三字以上词数", "停用词占词数比例", "独特词数比例", "平均每句标点符号数", "平均每句逗号数", "逗号数占比", "平均每句句号数", "句号数占比", "平均每句冒号数", "冒号数占比", "平均每句分号数", "分号数占比", "平均每句问号数", "问号数占比", "平均每句感叹号数", "感叹号数占比", "平均每句破折号数", "破折号数占比", "平均每句上引号数", "上引号数占比", "平均每句下引号数", "下引号数占比", "平均每句上圆括号数", "上圆括号数占比", "平均每句下圆括号数", "下圆括号数占比", "平均每句上方括号数", "上方括号数占比", "平均每句下方括号数", "下方括号数占比", "平均每段字符数", "平均每段词数", "平均每段句数", "平均每句单字重复率", "平均每句双字重复率", "平均每句三字重复率", "平均每句实词数", "平均每句虚词数", "平均每句形容词数", "形容词占比", "平均每句介词数", "介词占比", "平均每句副词数", "副词占比", "平均每句名词数", "名词占比", "平均每句动词数", "动词占比", "平均每句助动词数", "助动词占比", "平均每句连词数", "连词占比", "平均每句并列连词数", "并列连词占比", "平均每句限定词数", "限定词占比", "平均每句感叹词数", "感叹词占比", "平均每句数词数", "数词占比", "平均每句PART数", "PART占比", "平均每句代词数", "代词占比", "平均每句专有名词数", "专有名词占比", "平均每句标点符号数", "标点符号占比", "平均每句从属连词数", "从属连词占比", "平均每句特殊符号数", "特殊符号占比", "平均每句其他词性", "其他词性占比", "平均每句空格", "空格占比", "平均每句实体数", "重复过的实体占所有独特实体数的比率", "平均每句人名实体数", "人名实体占比", "平均每句国家/宗教/政治团体实体数", "国家/宗教/政治团体实体占比", "平均每句设施实体数", "设施实体占比", "平均每句组织实体数", "组织实体占比", "平均每句GPE实体数", "GPE实体占比", "平均每句地点实体数", "地点实体占比", "平均每句产品实体数", "产品实体占比", "平均每句事件实体数", "事件实体占比", "平均每句艺术作品实体数", "艺术作品实体占比", "平均每句法律实体数", "法律实体占比", "平均每句语言实体数", "语言实体占比", "平均每句日期实体数", "日期实体占比", "平均每句时间实体数", "时间实体占比", "平均每句百分比实体数", "百分比实体占比", "平均每句货币实体数", "货币实体占比", "平均每句数量实体数", "数量实体占比", "平均每句序数实体数", "序数实体占比", "平均每句基数实体数", "基数实体占比", "主-主实体转移", "主-宾实体转移", "主-其他实体转移", "主-无实体转移", "宾-主实体转移", "宾-宾实体转移", "宾-其他实体转移", "宾-无实体转移", "其他-主实体转移", "其他-宾实体转移", "其他-其他实体转移", "其他-无实体转移", "无-主实体转移", "无-宾实体转移", "无-其他实体转移", "无-无实体转移"])
const result = ref({})
// const result = ref({
//     "idx": 0,
//     "content": "你好",
//     "argd_real": 0.9178980588912964,
//     "argd_fake": 0.08210188150405884,
//     "argd_pred": "real",
//     "nep_real": 3.4802548043444403e-07,
//     "nep_fake": 0.9999996423721313,
//     "nep_pred": "fake",
//     "rag_real": 0,
//     "rag_fake": 1,
//     "rag_pred": "fake",
//     "rag_retrieve_docs": [
//         "出处 [1] [news/news_chunk_5.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_5.csv) \n\ncontent: 人民日报：让信息“飞”一会儿信息以秒杀的节奏呼啸而至，新闻以“最新”、“突发”、“快讯”等名义滚滚而来，要第一时间辨明真假、判断虚实，对任何人而言都难度极大。信息传播越快、越简单，越需要给真相一点时间、给判断一点时间。让信息“飞”一会儿，真相才会得到沉淀，情绪也会理性一些。\ntime: 2013-11-04 13:11:00\nid: 3640900829880121\n\n",
//         "出处 [2] [news/news_chunk_9.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_9.csv) \n\ncontent: 微议录：让真相“飞”一会儿第一时间辨明真假、判断虚实，对任何人而言都难度极大。盲目同情所谓弱者并不可取，每个人也都倾向去验证自己最初的判断，让信息“飞”一会儿，以理性而非情绪判断，给真相一点时间，事实才会得到沉淀。感谢@时空099@九尾小狐oooO@V慧眼识敏V@广东塞壬等网友微议。\ntime: 2015-05-14 23:17:00\nid: 3842541009303045\n\n",
//         "出处 [3] [news/news_chunk_4.csv](http://127.0.0.1:7861/knowledge_base/download_doc?knowledge_base_name=hallucination&file_name=news%2Fnews_chunk_4.csv) \n\ncontent: 给真相一点时间网络传播“快时代”，人们往往习惯快速反应，贴标签、下结论，当事情最终呈现不同结果，咳嗽两声便一哄而散。信息传播越快越简单，越需要让思考慢一些，多一些交叉质证，很多臆断就不攻自破。每个人都行色匆匆无暇思考的时代，有必要让脚步慢一些，让头脑冷静些。（人民日报）\ntime: 2013-07-02 10:25:00\nid: 3595560563180826\n\n"
//     ],
//     "final_real_pred": 0.3059661356389256,
//     "final_fake_pred": 0.6940338412920634,
//     "final_pred": "fake",
//     "explain_output": [
//         {
//             "特征名": "feature_6",
//             "重要性": "1.397",
//             "特征值": "1.0",
//             "常模": "0.8170333130728413"
//         },
//         {
//             "特征名": "feature_128",
//             "重要性": "1.3040209",
//             "特征值": "0.0",
//             "常模": "0.6736351753154303"
//         },
//         {
//             "特征名": "feature_126",
//             "重要性": "0.78334075",
//             "特征值": "0.0",
//             "常模": "0.0771183277194976"
//         },
//         {
//             "特征名": "feature_40",
//             "重要性": "0.6245715",
//             "特征值": "1.0",
//             "常模": "18.366217683035238"
//         },
//         {
//             "特征名": "feature_34",
//             "重要性": "0.5705355",
//             "特征值": "2.0",
//             "常模": "127.14327967171718"
//         }
//     ]
// })

const analyse = () => {
  isClear.value = false
  isLoading.value = true
  axios.post(baseURL.value.model + '/fast_predict', {
      text: text.value
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
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
          快速辨识
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
        <el-descriptions-item span="6">
          <template #label>
            <div class="cell-item">
              <el-icon style="margin-right: 8px">
                <odometer />
              </el-icon>
              语言学特征
            </div>
          </template>
          <el-descriptions
            style="margin: -12px -15px;"
            :column="6"
            size="large"
            border
          >
            <div v-for="feature in result['explain_output']" :key="feature">
              <el-descriptions-item span="2">
                <template #label>
                  <div class="cell-item">
                    <el-icon style="margin-right: 8px">
                      <setting />
                    </el-icon>
                    {{ featureDesc[parseInt(feature['特征名'].split("feature_")[1])] }}
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
          </el-descriptions>
        </el-descriptions-item>
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
      <h1 style="margin-top: 0">快速辨识</h1>
      <el-input
          v-model="text"
          :rows="6"
          type="textarea"
          placeholder="请输入待分析生成文本"
      />
    </el-row>

    <el-row justify="center" style="margin: 3rem 0;">
      <el-button type="primary" size="large" :icon="DataAnalysis" @click="analyse" v-if="!isLoading" :disabled="text.length == 0">分析</el-button>
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

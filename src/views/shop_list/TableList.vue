<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="4" :sm="24">
              <a-form-item label="商品ID">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item label="商品名称">
                <a-input v-model="queryParam.name" placeholder=""/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="4" :sm="24">
                <a-form-item label="门店域名">
                  <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="24">
                <a-form-item label="商品状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">已上架</a-select-option>
                    <a-select-option value="1">已下架</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" >上架</a-button>
        <a-button type="danger" >下架</a-button>
        <a-button type="primary" >推荐</a-button>
        <a-button type="danger" >取消推荐</a-button>
        <a-button type="primary" >审核通过</a-button>
        <a-button type="danger" >审核不通过</a-button>
        <a-button type="primary" >会员限购</a-button>
        <a-button icon="delete" type="danger" >批量删除</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="id" slot-scope="text">
          {{ text }}
        </span>
        <span slot="name" slot-scope="text">
          {{ text }}
        </span>
        <span slot="domain" slot-scope="text">
          {{ text }}
        </span>
        <span slot="numberOrders" slot-scope="text">
          {{ text }}
        </span>
        <span slot="numberSells" slot-scope="text">
          {{ text }}
        </span>
        <span slot="originalPrice" slot-scope="text">
          {{ text }}
        </span>
        <span slot="pic" slot-scope="text">
          {{ text }}
        </span>
        <span slot="stores" slot-scope="text">
          {{ text }}
        </span>
        <span slot="views" slot-scope="text">
          {{ text }}
        </span>
        <span slot="statusStr" slot-scope="text">
          {{ text }}
        </span>
        <span slot="pic" slot-scope="text">
          {{ text }}
        </span>
        <span slot="pic" slot-scope="text">
          {{ text }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDetail(record)">详情</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a style="color:red" @click="handleSub(record)">删除</a>
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
      <step-by-step-modal ref="modal" @ok="handleOk"/>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getGoodslist, getRoleList } from '@/api/manage'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    // id
    title: '商品ID',
    dataIndex: 'id'
  },
  {
    // name
    title: '商品名称',
    dataIndex: 'name'
  },
  // {
  //   // barCode
  //   title: '条形码',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  // {
  //   // categoryId
  //   title: '类别ID',
  //   dataIndex: 'no'
  // },
  {
    // domain
    title: '门店域名',
    dataIndex: 'domain'
  },
  // {
  //   // characteristic
  //   title: '商品特征',
  //   dataIndex: 'no'
  // },
  // {
  //   // commission
  //   title: '佣金',
  //   dataIndex: 'no'
  // },
  // {
  //   // commissionType
  //   title: '佣金类型',
  //   dataIndex: 'no'
  // },
  // {
  //   // gotScore
  //   title: '积分',
  //   dataIndex: 'no'
  // },
  // {
  //   // gotScoreType
  //   title: '积分类型',
  //   dataIndex: 'no'
  // },
  // {
  //   // kanjia
  //   title: '砍价',
  //   dataIndex: 'no'
  // },
  // {
  //   // kanjiaPrice
  //   title: '砍价价格',
  //   dataIndex: 'no'
  // },
  // {
  //   // logisticsId
  //   title: '物流',
  //   dataIndex: 'no'
  // },
  // {
  //   // minPrice
  //   title: '最低价',
  //   dataIndex: 'no'
  // },
  // {
  //   // minScore
  //   title: '最低积分',
  //   dataIndex: 'no'
  // },
  // {
  //   // numberFav
  //   title: '不详',
  //   dataIndex: 'no'
  // },
  // {
  //   // numberGoodReputation
  //   title: '信誉度',
  //   dataIndex: 'no'
  // },
  {
    // numberOrders
    title: '订单数量',
    dataIndex: 'numberOrders'
  },
  {
    // numberSells
    title: '售出数量',
    dataIndex: 'numberSells'
  },
  {
    // originalPrice
    title: '原价',
    dataIndex: 'originalPrice'
  },
  // {
  //   // paixu
  //   title: '排序',
  //   dataIndex: 'updatedAt',
  //   sorter: true
  // },
  {
    // pic
    title: '商品图片',
    dataIndex: 'pic'
  },
  // {
  //   // pingtuan
  //   title: '拼团',
  //   dataIndex: 'no'
  // },
  // {
  //   // pingtuanPrice
  //   title: '拼团价',
  //   dataIndex: 'no'
  // },
  // {
  //   // recommendStatus
  //   title: '推荐状态',
  //   dataIndex: 'no'
  // },
  // {
  //   // shopId
  //   title: '门店ID',
  //   dataIndex: 'no'
  // },
  // {
  //   // status
  //   title: '状态',
  //   dataIndex: 'no'
  // },
  {
    // stores
    title: '库存',
    dataIndex: 'stores'
  },
  // {
  //   // userId
  //   title: '用户ID',
  //   dataIndex: 'no'
  // },
  {
    // views
    title: '浏览数',
    dataIndex: 'views'
  },
  // {
  //   // weight
  //   title: '重量',
  //   dataIndex: 'no'
  // },
  // {
  //   // videoId
  //   title: '视频ID',
  //   dataIndex: 'no'
  // },
  // {
  //   // tags
  //   title: '标签',
  //   dataIndex: 'no'
  // },
  // {
  //   // propertyIds
  //   title: '不详',
  //   dataIndex: 'no'
  // },
  // {
  //   // recommendStatusStr
  //   title: '推荐状态',
  //   dataIndex: 'no'
  // },
  {
    // statusStr
    title: '商品状态',
    dataIndex: 'statusStr'
  },
  // {
  //   // dateAdd
  //   title: '添加时间',
  //   dataIndex: 'no'
  // },
  // {
  //   // dateStart
  //   title: '开始时间',
  //   dataIndex: 'no'
  // },
  // {
  //   // dateUpdate
  //   title: '更新时间',
  //   dataIndex: 'no'
  // },
  // {
  //   // content
  //   title: '描述',
  //   dataIndex: 'no'
  // },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data () {
    this.columns = columns
    return {
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getGoodslist(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleDetail (record) {
      this.$router.push({ name: 'ShopDetail', params: record })
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.$router.push({ name: 'ShopEdit', params: record })
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>

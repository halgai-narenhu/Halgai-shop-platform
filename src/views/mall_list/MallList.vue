<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="店铺编号">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="店铺状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">正常</a-select-option>
                  <a-select-option value="1">禁用</a-select-option>
                  <a-select-option value="2">待审核</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="店铺名称">
                  <a-input v-model="queryParam.mallname" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="店铺类型">
                  <a-input v-model="queryParam.malltype" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="店铺地址">
                  <a-input v-model="queryParam.address" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button icon="search" type="primary" @click="$refs.table.refresh(true)">搜索</a-button>
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
        <!-- <a-button type="primary" icon="plus" @click="handleAdd">添加</a-button> -->
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
          <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="name" slot-scope="text">
          <ellipsis :length="8" tooltip>{{ text }}门店</ellipsis>
        </span>
        <span slot="mallAdminUserId" slot-scope="text">
          {{ text }}
        </span>
        <span slot="vipPlanCd" slot-scope="text">
          {{ text }}
        </span>
        <span slot="lang" slot-scope="text">
          {{ text }}
        </span>
        <span slot="shopLevelID" slot-scope="text">
          {{ text | levelFilter }}
        </span>
        <span slot="isCompany" slot-scope="text">
          {{ text | companyFilter }}
        </span>
        <span slot="dataUpdate" slot-scope="text">
          {{ text }}
        </span>
        <span slot="dataAdd" slot-scope="text">
          {{ text }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">删除</a>
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
import { getRoleList, getServiceList } from '@/api/manage'

import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'

const columns = [
  {
    title: '#',
    scopedSlots: { customRender: 'serial' }
  },
  {
    // 字段id
    title: 'id',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    // 字段name
    title: '门店名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    // domain
    title: '门店域名',
    dataIndex: 'domain'
  },
  {
    // mallAdminUserId
    title: '用户ID',
    dataIndex: 'mallAdminUserId'
  },
  {
    // status
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    // lang
    title: '语言',
    dataIndex: 'lang',
    scopedSlots: { customRender: 'lang' }
  },
  {
    // shopLevelID
    title: '门店级别',
    dataIndex: 'shopLevelID',
    scopedSlots: { customRender: 'shopLevelID' }
  },
  {
    // vipPlanCd
    title: 'VIP剩余天数',
    dataIndex: 'vipPlanCd',
    customRender: (text) => text + ' 天'
  },
  {
    // isCompany
    title: '个人/公司',
    dataIndex: 'isCompany',
    scopedSlots: { customRender: 'isCompany' }
  },
  {
    // dataAdd
    title: '登录日期',
    dataIndex: 'dataAdd'
  },
  {
    // dataUpdate
    title: '更新日期',
    dataIndex: 'dataUpdate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
const companyMap = {
  0: { text: '个人' },
  1: { text: '公司' }
}
const levelMap = {
  0: { text: '白银' },
  1: { text: '黄金' },
  2: { text: '铂金' },
  3: { text: '钻石' }
}
const statusMap = {
  0: {
    status: 'success',
    text: '正常'
  },
  1: {
    status: 'processing',
    text: '禁用'
  },
  2: {
    status: 'default',
    text: '待审核'
  }
}

export default {
  name: 'MallList',
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
        return getServiceList(requestParameters)
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    companyFilter (type) {
      return companyMap[type].text
    },
    levelFilter (type) {
      return levelMap[type].text
    },
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
    // handleAdd () {
    //   this.$router.push('/mall_management/mall-list/AddMall')
    // },
    handleEdit (record) {
      console.log('recordddd', record)
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id) {
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
      if (record) {
        this.$message.info(`删除成功`)
      } else {
        this.$message.error(`删除失败`)
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

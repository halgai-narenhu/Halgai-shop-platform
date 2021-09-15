<template>
  <a-modal
    title="门店管理"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model" label="ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="门店名称">
          <a-input v-decorator="['name']" />
        </a-form-item>
        <a-form-item label="门店域名">
          <a-input v-decorator="['domain']" />
        </a-form-item>
        <a-form-item label="用户id">
          <a-input v-decorator="['mallAdminUserId']" disabled />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-decorator="['status']" >
            <a-radio-button :value="0">
              正常
            </a-radio-button>
            <a-radio-button :value="1">
              禁用
            </a-radio-button>
            <a-radio-button :value="2">
              待审核
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="语言">
          <a-input v-decorator="['lang']" />
        </a-form-item>
        <a-form-item label="门店级别">
          <a-select v-decorator="['shopLevelID']">
            <a-select-option :value="0">
              白银
            </a-select-option>
            <a-select-option :value="1">
              黄金
            </a-select-option>
            <a-select-option :value="2">
              铂金
            </a-select-option>
            <a-select-option :value="3">
              钻石
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="VIP剩余天数">
          <a-input suffix="天" v-decorator="['vipPlanCd']"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['name', 'id', 'domain', 'mallAdminUserId', 'status', 'lang', 'shopLevelID', 'vipPlanCd', 'isCompany', 'dataAdd', 'dataUpdate']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))
    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>

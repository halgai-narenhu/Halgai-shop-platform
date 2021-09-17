<template>
  <a-modal
    title="编辑分类"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item v-show="model" label="编号">
          <a-input v-decorator="['id']" disabled />
        </a-form-item>
        <a-form-item v-show="!model" label="编号">
          <a-input v-decorator="['id', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="名称">
          <a-input v-decorator="['name', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item label="类型">
          <a-input v-decorator="['type']" />
        </a-form-item>
        <a-form-item label="图标">
          <a-input v-decorator="['icon']" />
        </a-form-item>
        <a-form-item label="域名">
          <a-input v-decorator="['domain']" />
        </a-form-item>
        <a-form-item label="状态">
          <a-radio-group v-decorator="['isUse', { initialValue: '禁用' }]" >
            <a-radio-button :value="'启用'">
              启用
            </a-radio-button>
            <a-radio-button :value="'禁用'">
              禁用
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="添加时间">
          <a-input v-decorator="['dateAdd']" />
        </a-form-item>
        <a-form-item label="更新时间">
          <a-input v-decorator="['dateUpdate']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name', 'type', 'icon', 'domain', 'isUse', 'dateAdd', 'dateUpdate']

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

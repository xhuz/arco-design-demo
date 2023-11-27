<script setup>
import { reactive, ref } from 'vue';
import {
  Modal,
  Button,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Checkbox,
  DatePicker,
  Slider,
  Select,
  Option,
  Row,
  Col,
  Space,
  Divider,
} from '@arco-design/web-vue';
import UploadBtn from './components/upload-btn.vue';

const visible = ref(false);

const formData = reactive({
  selected: 0,
  title: '',
  attachment: null,
  mode: 1,
  score: 1,
  assign: [],
  per: 0,
  completeness: {
    key: 1,
    value: 1,
  },
});

const open = () => {
  visible.value = true;
};

const close = () => {
  visible.value = false;
};
</script>

<template>
  <Button type="primary" @click="open">打开弹窗</Button>
  <Modal :visible="true" title="新增作业" title-align="start" :width="900">
    <Form :model="formData" label-align="left" auto-label-width>
      <FormItem label="选择在线测试" field="selected" required>
        <Select placeholder="请选择分组方案">
          <Option :value="1">组1</Option>
          <Option :value="2">组2</Option>
        </Select>
      </FormItem>
      <FormItem label="标题" field="title" required>
        <Input></Input>
      </FormItem>
      <FormItem label="作业附件" field="attachment">
        <UploadBtn></UploadBtn>
      </FormItem>

      <FormItem>
        <Button type="text">
          <template #icon>
            <icon-plus />
          </template>
          说明
        </Button>
        <Button type="text">
          <template #icon>
            <icon-plus />
          </template>
          知识点
        </Button>
        <Button type="text">
          <template #icon>
            <icon-plus />
          </template>
          OBE指标
        </Button>
      </FormItem>

      <FormItem label="作业形式" field="mode">
        <RadioGroup v-model="formData.mode">
          <Radio :value="1">个人作业</Radio>
          <Radio :value="2">分组作业</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="评分方式" field="score" :content-flex="false">
        <div class="score-setting">
          <Row align="stretch">
            <Col class="col-bg" :span="6">评分方式</Col>
            <Col class="col-bg" :span="8"><Checkbox>教师评阅</Checkbox></Col>
            <Col class="col-bg" :span="8" flex="auto"
              ><Checkbox>学生互评</Checkbox></Col
            >
          </Row>
          <Row align="stretch">
            <Col class="col-bg" :span="6">成绩占比</Col>
            <Col :span="8"><Input style="width: 80%"></Input>%</Col>
            <Col :span="8" flex="auto"><Input style="width: 80%"></Input>%</Col>
          </Row>
          <Row align="stretch">
            <Col class="col-bg" :span="6">评分设置</Col>
            <Col :span="8"></Col>
            <Col :span="8" flex="auto">
              <div><Checkbox>匿名评分</Checkbox></div>
              <div><Checkbox>仅提交作业可参与</Checkbox></div>
              <div><Checkbox>未完成互评扣分</Checkbox></div>
            </Col>
          </Row>
          <Row align="stretch">
            <Col class="col-bg" :span="6">量规</Col>
            <Col :span="16"
              ><Select>
                <Option>123</Option>
              </Select></Col
            >
          </Row>
        </div>
      </FormItem>

      <FormItem label="发放" field="assign" :content-flex="false">
        <div class="assign-sub-course-settings">
          <Space direction="vertical" fill>
            <FormItem label="发放班级">
              <Select multiple>
                <Option>A班</Option>
                <Option>B班</Option>
              </Select>
            </FormItem>
            <FormItem label="作业截止时间" required>
              <DatePicker></DatePicker>
            </FormItem>
            <h3>学生互评设置</h3>
            <FormItem label="互评时间至">
              <Space>
                <DatePicker></DatePicker>
                <span>至</span>
                <DatePicker></DatePicker>
              </Space>
            </FormItem>
            <FormItem label="评阅份数">
              <Space>
                <Input></Input>
                <span>份 / 组</span>
              </Space>
            </FormItem>
          </Space>
        </div>
        <div>
          <Button type="text">
            <template #icon>
              <icon-plus />
            </template>
            添加
          </Button>
        </div>
      </FormItem>

      <Divider></Divider>

      <FormItem label="成绩比例" field="per">
        <Slider
          style="width: 360px"
          show-input
          :marks="{ '36.5': '36.5', 100: '100' }"
        ></Slider
        >%
        <template #extra>
          <span>(总成绩比例不能超过100%，剩余11.4%)</span>
        </template>
      </FormItem>
      <FormItem label="完成指标" field="completeness">
        <RadioGroup v-model="formData.completeness.key">
          <Radio :value="1">无</Radio>
          <Radio :value="2">有</Radio>
        </RadioGroup>
        <Select v-model="formData.completeness.value" style="width: 200px">
          <Option :value="1">提交作业</Option>
        </Select>
        <template #extra>
          <div class="completeness-tips" v-if="formData.completeness.key === 2">
            设置「完成指标」后，学生需达到条件才算完成。该活动将自动纳入学习分析的完成度统计，并作为学生学习进度的分母条件
          </div>
        </template>
      </FormItem>
    </Form>
    <template #footer>
      <Button type="primary">保存</Button>
      <Button @click="close">取消</Button>
    </template>
  </Modal>
</template>

<style>
* {
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
.completeness-tips {
  width: 280px;
  padding: 12px 16px;
  border-radius: 3px;
  background: #e9e9e9;
  position: relative;
  margin-left: 60px;
  margin-top: 10px;

  &::before {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    background: #e9e9e9;
    transform: rotate(45deg);
    position: absolute;
    top: -4px;
    left: 30px;
  }
}

.assign-sub-course-settings {
  width: 80%;
  border: 1px solid var(--unnamed, #dfdfdf);
  padding: 15px;
  border-radius: 4px;
}

.score-setting {
  width: 80%;
  border: 1px solid var(--unnamed, #dfdfdf);
  border-radius: 4px;
  overflow: hidden;

  .arco-row:not(:last-child) {
    border-bottom: 1px solid #dfdfdf;
  }

  .arco-col {
    padding: 15px;
  }

  .arco-row > .arco-col:not(:last-child) {
    border-right: 1px solid #dfdfdf;
  }

  .col-bg {
    background: var(--f-1-disable, #f7f7f7);
  }
}

:deep(.arco-slider-marks) {
  top: -15px;
  font-size: 12px;
}

:deep(.arco-slider.arco-slider-with-marks) {
  margin-bottom: 0;
  padding: 5px;
}

:deep(.arco-slider) {
  display: flex;
}
</style>

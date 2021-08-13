<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
    <el-form-item label="战斗机的数目" prop="combatCnt">
      <el-input v-model="ruleForm.combatCnt" placeholder="请输入至少5架飞机"></el-input>
    </el-form-item>
    <el-form-item label="预警机的数目" prop="awacsCnt">
      <el-input v-model="ruleForm.awacsCnt" placeholder="请输入至少5架飞机"></el-input>
    </el-form-item>
    <el-form-item label="战斗机初始作战区域" prop="combatInitRegion">
      <el-select v-model="ruleForm.combatInitRegion" placeholder="请选择作战区域">
        <el-option label="远" value="远"></el-option>
        <el-option label="中" value="中"></el-option>
        <el-option label="近" value="近"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预警机初始作战区域" prop="awacsInitRegion">
      <el-select v-model="ruleForm.awacsInitRegion" placeholder="请选择作战区域">
        <el-option label="远" value="远"></el-option>
        <el-option label="中" value="中"></el-option>
        <el-option label="近" value="近"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="战斗机初始作战任务" prop="combatInitTask">
      <el-select v-model="ruleForm.combatInitTask" placeholder="请选择作战任务">
        <el-option label="佯攻" value="佯攻"></el-option>
        <el-option label="巡逻" value="巡逻"></el-option>
        <el-option label="空地攻击" value="空地攻击"></el-option>
        <el-option label="空中拦截" value="空中拦截"></el-option>
        <el-option label="态势收集与回传" value="态势收集回传"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="预警机初始作战任务" prop="awacsInitTask">
      <el-select v-model="ruleForm.awacsInitTask" placeholder="请选择作战任务">
        <el-option label="预警探测" value="预警探测"></el-option>
        <el-option label="态势收集与指挥" value="态势收集指挥"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否添加噪声" prop="isAddNoise">
      <el-radio v-model="ruleForm.isAddNoise" label="true">是</el-radio>
      <el-radio v-model="ruleForm.isAddNoise" label="false">否</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">生成数据</el-button>
      <el-button @click="resetForm('ruleForm')">重新配置</el-button>
    </el-form-item>
  </el-form>
</template>

<style>
form[class=demo-ruleForm]{
  width: 980px;
}
</style>

<script>
import generateData from '../api/generateData';

export default {
  name: 'dataConfig',
  data() {
    return {
      ruleForm: {
        combatCnt: '',
        awacsCnt: '',
        combatInitRegion: '',
        awacsInitRegion: '',
        combatInitTask: '',
        awacsInitTask: '',
        isAddNoise: 'true',
      },
      rules: {
        combatCnt: [
          { required: true, message: '请输入飞机数量', trigger: 'blur' },
        ],
        awacsCnt: [
          { required: true, message: '请输入飞机数量', trigger: 'blur' },
        ],
        combatInitRegion: [
          { required: true, message: '请选择作战区域', trigger: 'change' },
        ],
        awacsInitRegion: [
          { required: true, message: '请选择作战区域', trigger: 'change' },
        ],
        combatInitTask: [
          { required: true, message: '请选择作战任务', trigger: 'change' },
        ],
        awacsInitTask: [
          { required: true, message: '请选择作战任务', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          generateData(this.ruleForm).then((res) => {
            console.log(res);
            // this.$emit('transmission', [this.ruleForm.combatCnt, this.ruleForm.awacsCnt]);
            localStorage.setItem('fighterNum', this.ruleForm.combatCnt);
            localStorage.setItem('warningNum', this.ruleForm.awacsCnt);
            // 箭头函数下的this，不知道会不会指向错乱
            this.$router.push({ name: 'dataPlot' });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
        return true;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

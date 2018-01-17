<template>
  <div>
    <el-table :data="account_data" border style="width: 100%">

    <el-table-column prop="id" label="用户ID" width="70px"></el-table-column>
    <el-table-column prop="username" label="用户名"></el-table-column>
    <el-table-column label="是否超级管理员">
      <template slot-scope="scope">
        <span style="margin-left: 10px" v-if="!!scope.row.is_admin">是</span>
        <span style="margin-left: 10px" v-else>否</span>
        
      </template>
    </el-table-column>
    <el-table-column prop="account_invite_code" label="邀请码"></el-table-column>
    <el-table-column prop="account_end_time" label="截止时间"></el-table-column>
    <el-table-column label="赠送时间">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.account_extra_time }} 天</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="330px">
      <template slot-scope="scope">
        <el-button size="mini" type="success" v-if="!scope.row.is_admin"
          @click="handleSetAdmin(scope.$index, scope.row)">设置管理员</el-button>
        <el-button size="mini" type="warning" v-else
          @click="handleCancelAdmin(scope.$index, scope.row)">取消管理员</el-button>
          
          <el-button size="mini" type="primary"
          @click="handleSetInviteCode(scope.$index, scope.row)">设置邀请码 </el-button>
          <el-button size="mini" type="danger"
          @click="handleRecharge(scope.$index, scope.row)">赠送天数</el-button>
      </template>
    </el-table-column>
    
  </el-table>

  <el-dialog title="赠送提示" :visible.sync="rechargeDialogFormVisible" width="400px">
  <el-form :model="rechargeForm">
    <el-form-item label="赠送天数" :label-width="formLabelWidth">
      <el-input v-model="rechargeForm.day" auto-complete="off"></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="rechargeDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm()">确 定</el-button>
  </div>
  
</el-dialog>
  </div>
</template>
<script>
import{getCustomers, setAdmin, setExtraDays, setInviteCode, setAdminNormal} from '@/api/api'
export default {
  data(){
    return {
      account_data:[],
      rechargeDialogFormVisible: false,
        rechargeForm: {
          day: 1
          
        },
        formLabelWidth: '80px',
        user_row:'',
      
    }
  },
  created () {
    this.get_customers();
  },
  methods: {
    get_customers(){
      getCustomers().then(
        (resData) => {
          this.account_data = resData.results;
        }
      )
    },
    //设置管理员
    handleSetAdmin(index, row) {
      var param = {
        id: row.id
      }
      setAdmin(param).then(
        (resData) => {
          if(resData && resData.status == 'ok'){
            this.$message.success('设置管理员成功');   
            this.get_customers();   //刷新列表   
          }else{
            this.$message.success('设置管理员失败');  
          }
        }
      )
    },
    //取消管理员
    handleCancelAdmin(index, row) {
      var param = {
        id: row.id
      }
      setAdminNormal(param).then(
        (resData) => {
          if(resData && resData.status == 'ok'){
            this.$message.success('取消管理员成功');   
            this.get_customers();   //刷新列表   
          }else{
            this.$message.success('取消管理员失败');  
          }
        }
      )
    },
    
    //赠送天数
    handleRecharge(index, row) {
      console.log(index, row);
      this.rechargeForm.money = ''; //重置赠送金额

      this.user_row = row;
      this.rechargeDialogFormVisible = true;
    },
    //设置邀请码
    handleSetInviteCode(index, row){
      var param = {
        id: row.id
      }
      setInviteCode(param).then(
        (resData) => {
          if(resData && resData.status == 'ok'){
            this.$message.success('设置邀请码成功');   
            this.get_customers();   //刷新列表   
          }else{
            this.$message.success('设置邀请码失败');  
          }
        }
      )
    },
    confirm(){
      console.log(this.user_row);
      this.confrimRecharge();
    },
    //确认赠送天数
    confrimRecharge(done) {
     this.$confirm(`认赠送 ${this.rechargeForm.day} 天？`)
          .then(_ => {
            var param = {
              id: this.user_row.id
            }
            var reqData = {
              "day": this.rechargeForm.day
            }
            setExtraDays(param, reqData).then(
              (resData) =>{
                if(resData && resData.status == 'ok'){
                  this.$message.success('赠送成功');   
                  this.get_customers();   //刷新列表   
                }else{
                  this.$message.success('赠送失败');  
                }
                        
              }
            )
            this.rechargeDialogFormVisible = false;
            done();
          })
          .catch(_ => {});
    },
   
  }
}
</script>
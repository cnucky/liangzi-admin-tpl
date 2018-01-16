<template>
  <div>
    <el-table :data="account_data" border style="width: 100%">

    <el-table-column prop="id" label="用户ID"></el-table-column>
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
        <span style="margin-left: 10px">{{ scope.row.account_extra_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleSetAdmin(scope.$index, scope.row)">设置管理员</el-button>
          <el-button size="mini" type="primary"
          @click="handleSetInviteCode(scope.$index, scope.row)">设置邀请码 </el-button>
          <el-button size="mini" type="danger"
          @click="handleRecharge(scope.$index, scope.row)">充值</el-button>
      </template>
    </el-table-column>
    
  </el-table>

  <el-dialog title="充值提示" :visible.sync="rechargeDialogFormVisible" width="400px">
  <el-form :model="rechargeForm">
    <el-form-item label="充值金额" :label-width="formLabelWidth">
      <el-input v-model="rechargeForm.money" auto-complete="off"></el-input>
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
import{getCustomers, setExtraDays} from '@/api/api'
export default {
  data(){
    return {
      account_data:[],
      rechargeDialogFormVisible: false,
        rechargeForm: {
          money: ''
          
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
        console.log(index, row);
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
      console.log(index, row);
    },
    confirm(){
      console.log(this.user_row);
      this.confrimRecharge();
    },
    //确认赠送天数
    confrimRecharge(done) {
     this.$confirm('确认充值？')
          .then(_ => {
            var param = {
              id: this.user_row.id
            }
            var reqData = {
              "is_admin": this.user_row.is_admin,
              "vpnname": this.user_row.vpnname
            }
            setExtraDays(param, reqData).then(
              (resData) =>{
                
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
/**
* @Description:
* @Author chenyue
* @Date 2020/3/5 14:00
*/
<template>
  <el-row style="background-color: white; height: 87vh; padding: 20px 24px 8px">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="用户名称">
        <el-input v-model="queryParam.data.itemName" placeholder="请输入用户名称" />
        <span>{{queryParam.data.itemName}}</span>
      </el-form-item>
      <el-form-item>
        <el-button style="min-width:98px" type="primary" @click="getAllInfo">查询</el-button>
        <!--        v-on:click-->
      </el-form-item>
      <el-form-item>
        <el-button style="min-width:98px" type="primary" @click="addInfo">新建</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="min-width:98px" type="primary" @click="deleteInfo">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-scrollbar style="height: 70vh">
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
      >
        <el-table-column type="selection" label="选择" width="55" />
        <el-table-column
          prop="id"
          label="序号"
          :show-overflow-tooltip="true"
          align="center"
        />
        <el-table-column
          prop="userName"
          :show-overflow-tooltip="true"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="realName"
          :show-overflow-tooltip="true"
          label="姓名"
          align="center"
        />
        <el-table-column
          prop="passWord"
          :show-overflow-tooltip="true"
          label="密码"
          align="left"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-tooltip content="删除" placement="top">
              <el-button size="mini" type="danger" style="margin-left: 3px" icon="el-icon-delete" title="删除" @click="deleteInfo" />
            </el-tooltip>
            <el-tooltip content="编辑" placement="top">
              <el-button size="mini" type="primary" style="margin-left: 3px" icon="el-icon-edit" @click="updateInfo(scope.row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <el-footer>
      <el-pagination
        :current-page="queryParam.pageInfo.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryParam.pageInfo.pageSize"
        :total="queryParam.pageInfo.size"
        layout="total, sizes, prev ,pager, next, jumper"
        style="margin-top: 15px;text-align: center;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-footer>
    <el-dialog title="新建交易信息"
               :visible.sync="addDialogVisible"
               width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="序号" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input type="textarea" v-model="ruleForm.realname"></el-input>
        </el-form-item>
        <el-form-item>
          <span style="margin-left: 90px">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">关闭</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改交易信息"
               :visible.sync="updateDialogVisible"
               width="30%">
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
        <el-form-item label="序号" prop="id">
          <el-input v-model="ruleForm1.id"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm1.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm1.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input type="textarea" v-model="ruleForm1.realname"></el-input>
        </el-form-item>
        <el-form-item>
          <span style="margin-left: 90px">
            <el-button type="primary" @click="submitFormupdate('ruleForm1')">确认</el-button>
            <el-button @click="resetForm1('ruleForm1')">关闭</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog>
      <component />
    </el-dialog>
  </el-row>

</template>
<script>
  import api from 'views/spot/usermanager/UserManagerApi.js'
  const reg = /[^\a-\z\A-\Z0-9_，,。、\u4E00-\u9FA5]/g
  const userItem = {
    id: '',
    username: '',
    password: '',
    realname: ''
  }
  export default {
    filters: {
      pubFilter: function(value) {
        if (value === 1) {
          return '是'
        }
        if (value === 0) {
          return '否'
        }
      },
      typeFilter: function(value) {
        //1：整型，2：字符串，3：浮点型；4：时间；5：生效时间；6：菜单型；7:布尔型；8：主体id
        if (value === 1) {
          return '整型'
        }
        if (value === 2) {
          return '字符串'
        }
        if (value === 3) {
          return '浮点型'
        }
        if (value === 4) {
          return '时间'
        }
        if (value === 5) {
          return '生效时间'
        }
        if (value === 6) {
          return '菜单型'
        }
        if (value === 7) {
          return '布尔型'
        }
        if (value === 8) {
          return '主体id'
        }
      }
    },
    data() {
      return {
        options: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        ruleForm: {
          id: '',
          username: '',
          password: '',
          realname: ''
        },
        ruleForm1: {
          id: '',
          username: '',
          password: '',
          realname: ''
        },
        userItem: {
          id: '',
          username: '',
          password: '',
          realname: ''
        },
        tableChecked: [], // 选中的表格行数据
        tableData:[],//表格展示的数据
        ids: [], // 批量删除的id组
        updateDialogVisible: false, // 控制修改显示
        addDialogVisible: false, // 控制新增显示
        queryParam: {
          data: {
            itemName: ''
          },
          pageInfo: {
            pageNum: 1,
            pageSize: "10",
            size: 0,
            startRow: 0,
            endRow: 0,
            pages: 0,
            prePage: 0,
            nextPage: 0,
            isFirstPage: true,
            isLastPage: true,
            hasPreviousPage: false,
            navigatePages: 0,
            navigatepageNums: [],
            navigateFirstPage: 1,
            navigateLastPage: 1,
            total: 0
          }
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 1, max: 12, message: '长度在 1到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          realname: [
            { required: true, message: '请填写姓名', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getAllInfo()
    },
    methods: {
      //查询全部
      getAllInfo() { // 根据条件查询出所有的数据
        if (this.queryParam.data.itemName !== null && this.queryParam.data.itemName !== '') {
          if (reg.test(this.queryParam.data.itemName)) {
            this.$vMessage({
              message: '用户名称不能输入特殊字符',
              type: 'warning',
              duration: 2000
            })
            return false
          }
          if (this.queryParam.data.itemName.length > 12) {
            this.$vMessage({
              message: '用户名称长度不能超过12个字符',
              type: 'warning',
              duration: 2000
            })
            return false
          }
        }
        api.getAllInfo(this.queryParam).then(data => {
          this.tableData = data.data.data.list
          this.queryParam.pageInfo.size = data.data.data.total
        }).catch(err => {
          console.log(err)
        })
      },
      //确认添加
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.userItem.userName = this.ruleForm.username
            this.userItem.passWord = this.ruleForm.password
            this.userItem.realName = this.ruleForm.realname
            api.addInfo(this.userItem).then(data => {
              this.$vMessage({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
            }).catch(err => {
              console.log(err)
            })
            this.addDialogVisible = false
            setTimeout(() => {
              this.queryParam.data.itemName = ''
              this.getAllInfo()
            }, 1000)
          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },
      //过滤
      filtTypes(value) {
        if (value === 1) {
          return '整型'
        }
        if (value === 2) {
          return '字符串'
        }
        if (value === 3) {
          return '浮点型'
        }
        if (value === 4) {
          return '时间'
        }
        if (value === 5) {
          return '生效时间'
        }
        if (value === 6) {
          return '菜单型'
        }
        if (value === 7) {
          return '布尔型'
        }
        if (value === 8) {
          return '主体id'
        }
      },
      //确认修改
      submitFormupdate(formName1) {
        this.$refs[formName1].validate((valid) => {
          if (valid) {
            this.userItem.id = this.ruleForm1.id
            this.userItem.userName = this.ruleForm1.username
            this.userItem.passWord = this.ruleForm1.password
            this.userItem.realName = this.ruleForm1.realname
            api.updateInfo(this.userItem).then(data => {
              this.$vMessage({
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              setTimeout(() => {
                this.queryParam.data.itemName = ''
                this.getAllInfo()
              }, 1000)
            }).catch(err => {
              console.log(err)
            })
            this.updateDialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }

        });
      },
      //关闭模态款
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.addDialogVisible = false
      },
      resetForm1(formName1) {
        this.$refs[formName1].resetFields();
        this.updateDialogVisible = false
      },
      //修改模态框显示
      updateInfo(row) {
        this.ruleForm1.id = row.id
        this.ruleForm1.username = row.userName
        this.ruleForm1.password = row.passWord
        this.ruleForm1.realname = row.realName
        this.updateDialogVisible = true
      },
      //添加模态框显示
      addInfo() { // 新增交易条款信息信息
        this.ruleForm1.id = ""
        this.ruleForm1.username = ""
        this.ruleForm1.password = ""
        this.ruleForm1.realname = ""
        this.addDialogVisible = true
      },
      //删除交易条款
      deleteInfo() { // 批量删除交易序列组名称
        if (this.ids === null || this.ids.length === 0) {
          this.$vMessage({
            message: '请至少选择一条数据',
            type: 'warning',
            duration: 2000
          })
          return false
        }
        this.$confirm('你确定要删除吗?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(res => {
            api.deleteInfo(this.ids).then(res => {
              this.$vMessage({
                type: 'success',
                message: '操作成功!'
              })
              this.ids = []
              setTimeout(() => {
                this.queryParam.data.itemName = ''
                this.getAllInfo()
              }, 1000)
            }).catch(err => {
            })
          })
          .catch(err => {
          })

      },
      //选中序列框
      handleSelectionChange(val) { // 批量删除交易组序列名称
        this.tableChecked = val
        const ObjDefaultValue = {
          id: '' // 交易序列组关联id
        }
        this.tableChecked.forEach(obj => {
          ObjDefaultValue.id = obj.id
          this.ids.push(ObjDefaultValue)
          console.log(ObjDefaultValue)
        })
      },
      // 点击选中整行数据
      handleRowClick(row) {
        this.itemName = row.itemName
        this.id = row.id
      },
      //每页数据改变时
      handleSizeChange(val) {
        this.queryParam.pageInfo.pageSize = val
        this.getAllInfo(this.queryParam)
      },
      //页数改变时
      handleCurrentChange(val) {
        this.queryParam.pageInfo.pageNum = val
        this.getAllInfo(this.queryParam)
      }
    }
  }
</script>
<style scoped>
  .el-input--medium {
    width: 300px;
  }
  .el-select>.el-input {
    width: 300px;
  }
  .el-dialog__title {
    margin-left: 40% !important;
  }
</style>

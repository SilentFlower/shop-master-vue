<!-- 商品类别 -->
<template>
  <el-row class="ClassGood">
    <el-row style="padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">商品类别</span>
        <el-button type="primary" @click="openAddRoot">添加根类
        </el-button>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 60px">
        <el-tree
          v-if="treeStatus"
          lazy
          :props="props"
          :load="loadNode"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
                <span>
                  <el-button
                    v-if="node.level == 1"
                    type="text"
                    size="mini"
                    @click="() => append(node, data)">
                    Append
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => deleteIt(node, data)">
                    Delete
                  </el-button>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => edit(node, data)">
                    Edit
                  </el-button>
                </span>
          </span>
        </el-tree>
      </el-row>
    </el-row>

    <el-drawer
      class="wadasd"
      :visible.sync="addRoot"
      size="40%"
      append-to-body
      direction="rtl"
      @close="close">
      <template slot="title">
        <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
          <span style="font-weight: 500;font-size: 16px;color: #000000">{{myTitle}}</span><span v-if="addForm.parentName != null">({{addForm.parentName}})</span>
        </el-row>
      </template>
      <el-row style="padding-left:20px;padding-right: 20px;padding-bottom:10px;border-bottom: 2px solid #F7F7F7">
        <el-form
          label-position="top"
          :model="addForm"  label-width="80px"
        >
          <el-row>
            <el-form-item>
              <template slot="label">
                <span class="uytrew">类名</span>
              </template>
              <el-col :span="14">
                <el-input v-model="addForm.typeName"></el-input>
              </el-col>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item>
              <template slot="label">
                <span class="uytrew">类别图片</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <img :src="addForm.typePic" width="128px" height="128px"></img>
                </el-col>
                <el-col style="margin-left: 20px" :span="8">
                  <cropUpload @cropFinish="cropFinish"/>
                </el-col>
              </el-row>
            </el-form-item>
          </el-row>

          <el-row >
            <el-form-item>
              <template slot="label">
                <span class="uytrew">备注</span>
              </template>
              <el-col :span="14">
                <el-input
                  :autosize="{ minRows: 6, maxRows: 20}"
                  type="textarea"
                  v-model="addForm.memo"></el-input>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
      <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;padding-right: 10px">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="save">
          提交
        </el-button>
      </el-row>
    </el-drawer>

  </el-row>
</template>
<style>
  .ClassGood {
    padding: 20px 50px 20px 50px;
  }
  .ClassGood .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .uytrew{
    color: #3b5998;
    font-weight: 600;
    font-family: Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  }
</style>
<script>
  import cropUpload from "../../components/upload/crop-upload"
  export default {
    data() {
      return {
        treeStatus:true,
        props: {
          label:'typeName',
          value:'typeId',
          isLeaf:'leafFlag',
        },
        myTitle:'新增根类',
        formData:null,
        addRoot:false,
        addForm:{
          typeId:null,
          parentName:null,
          typeName:null,
          memo:null,
          pic:null,
          typePic:null,
        },

      }
    },
    mounted() {
      this.init();
    },
    methods:{
      deleteIt(node, data){
        this.$confirm('此操作将永久删除该类别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/type/delType?typeId='+node.data.typeId)
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("删除成功")
                this.refreshData();
              }else{
                this.$message.error(res.message)
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      append(node, data){
        this.addForm.typeId = node.data.typeId;
        this.addForm.parentName = node.data.typeName;
        //新增子类
        this.myTitle = '新增子类'
        this.addRoot = true
      },
      edit(node, data){
        this.addForm.typeId = node.data.typeId;
        this.addForm.typeName = node.data.typeName;
        this.addForm.memo = node.data.memo;
        this.addForm.typePic = node.data.typePic+'?'+Math.random();
        this.myTitle = '修改类别'
        this.addRoot = true
      },
      save(){
        this.formData = new FormData();
        this.formData.append('typeName', this.addForm.typeName);
        this.formData.append('memo', this.addForm.memo);
        this.formData.append('typeId', this.addForm.typeId);
        if (this.addForm.pic != null && this.addForm.pic != "") {
          this.formData.append('pic', this.addForm.pic);
        }
        if(this.myTitle == '新增根类'){
          this.addRootType(this.formData)
        }
        if(this.myTitle == '新增子类'){
          this.addChild(this.formData)
        }
        if(this.myTitle == '修改类别'){
          this.editType(this.formData)
        }

      },
      editType(val){
        this.$http.post('/type/editType', val,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("修改成功");
              this.formData = null;
              this.close();
              this.refreshData();
            }
          });
      },
      addRootType(val){
        this.$http.post('/type/addRootType', val,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("新增成功");
              this.formData = null;
              this.close();
              this.refreshData();
            }
          });
      },
      addChild(val){
        this.$http.post('/type/addChildType', val,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("新增成功");
              this.formData = null;
              this.close();
              this.refreshData();
            }
          });
      },
      openAddRoot(){
        this.myTitle = '新增根类'
        this.addRoot = true
      },
      close(){
        this.addRoot = false
        this.addForm.typeId = null;
        this.addForm.typeName = null;
        this.addForm.typePic = null;
        this.addForm.pic = "";
        this.addForm.memo = null;
        this.addForm.parentName = null;
      },
      //初始化
      init(){

      },
      //懒加载刷新
      refreshData(){
        this.treeStatus = false;
        this.$nextTick(() => {
          this.treeStatus = true;
        });

      },
      //懒加载
      loadNode(node, resolve) {
        if (node.level === 0) {
          let nodes = [];
          this.$http.get('/type/getRoot')
            .then(res => {
              if (res.code === 10000) {
                for (let item of res.data) {
                  nodes.push(item);
                }
              }
              resolve(nodes);
            });
        } else {
          let nodes = [];
          this.$http.get('/type/getChildren?parentId=' + node.data.typeId)
            .then(res => {
              if (res.code === 10000) {
                for (let item of res.data) {
                  nodes.push(item);
                }
              }
              resolve(nodes)
            });
        }
      },
      //获取截取图片
      cropFinish(file) {
        this.addForm.pic = file
        let str = URL.createObjectURL(file)
        this.addForm.typePic = str
      },

    },
    components:{
      cropUpload,
    },
  }
</script>

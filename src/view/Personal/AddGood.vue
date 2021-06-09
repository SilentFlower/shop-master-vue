<!-- 商品添加 -->
<template>
  <el-row class="AddGood">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <el-row style="float: left">
        <span class="tit">{{title}}</span>
      </el-row>
    </el-row>
    <el-row style="margin-top: 20px;padding-left: 150px;" type="flex" justify="flex-start">
      <el-form label-position="left" label-width="140px" ref="goodForm" :model="goodForm">
        <el-form-item label="商品类别" prop="typeId">
          <el-cascader
            clearable
            :options="options" :props="props" ref="cas" v-model="goodForm.typeId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input placeholder="请填写店铺网站，将出现在店铺页面" v-model="goodForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsMemo">
          <el-input type="textarea" placeholder="店铺公告在店铺页面展示，建议带上售后方式" v-model="goodForm.goodsMemo"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="goodsPicUrl">
          <el-row type="flex">
            <el-col>
              <el-image :src="goodForm.goodsPic"  style="width: 128px;height: 128px"></el-image>
            </el-col>
            <el-col style="margin-left: 20px">
              <cropUpload @cropFinish="cropFinish"/>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>
    <el-button type="success" @click="save">保存</el-button>

  </el-row>
</template>
<style>
  .AddGood {
    padding: 20px 50px 20px 50px;
  }
  .AddGood .tit {
    width: 95%;
    font-size: 21px;
    font-weight: 700;
    color: #68728c;
    padding: 29px 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: -2px;
  }
  .AddGood .setting{
    margin-left: 50px;
    font-weight: 700;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 34px;
    width: 100px;
    color: #fff;
    background: #386cfa;
    border: none;
    border-radius: 6px;
  }
  .AddGood .ww1{
    vertical-align: middle;
    display: inline-block;
    color: #a2a9ba;
    font-size: 15px;
    font-weight: 500;
    margin-left: 16px;
  }
  .AddGood .ww2{
    display: block;
    margin-top: 20px;
    margin-left: 50px;
    color: #68728c;
    font-size: 30px;
    font-weight: 700;
    margin-top: 14px;
    text-indent: 51px;
  }
  .AddGood .ww3{
    margin-left: 13px;
    font-weight: 700;
    color: #68728c;
    font-size: 14px;
  }
  .AddGood .ww4{
    font-size: 12px;
    font-weight: 500;
    color: #a2a9ba;
  }
  .AddGood .ww5{
    font-weight: 700;
    width: 167px;
    border-radius: 5px;
    height: 50px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    font-weight: 700;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background .8s;
  }
  .AddGood .bb2{
    color: #fff;
    background: #b7c3cd;
    border-radius: 5px;
  }
  .AddGood .bb1{
    color: #fff;
    background: #386cfa;
    border-radius: 5px;
  }
</style>
<script>
  import cropUpload from "../../components/upload/crop-upload"
  export default {
    data() {
      return {
        title:'添加商品',
        options:[],
        formData:null,
        props: {
          label:'typeName',
          value:'typeId',
          leaf:'leafFlag',
          lazy:true,
          lazyLoad:this.myLazyLoad
        },
        //商品表单
        goodForm:{
          goodsId:null,
          typeId:null,
          goodsName:null,
          pic:null,
          goodsMemo:null,
          goodsPic:null,
        },

      }
    },
    mounted() {
      this.getRoot();
    },
    methods:{
      setRow(row){
        console.log(row)
        this.goodForm.typeId = row.typeId
        this.goodForm.goodsId = row.goodsId
        this.goodForm.goodsName = row.goodsName
        this.goodForm.goodsMemo = row.goodsMemo
        this.goodForm.goodsPic = row.goodsPic+'?'+Math.random();
      },
      changeTitle(str){
        this.title = str
      },
      //保存
      save(){
        this.formData = new FormData();
        if (this.$refs.cas.getCheckedNodes(false)[0] != null) {
          this.formData.append('typeId', this.$refs.cas.getCheckedNodes(false)[0].value);
        }
        this.formData.append('goodsName', this.goodForm.goodsName);
        this.formData.append('goodsMemo', this.goodForm.goodsMemo);
        if (this.goodForm.pic != null && this.goodForm.pic != "") {
          this.formData.append('pic', this.goodForm.pic);
        }
        //判断是否为修改
        if (this.goodForm.goodsId != null && this.goodForm.goodsId != "") {
          //修改
          this.formData.append('goodsId', this.goodForm.goodsId);
          this.$http.post('/goods/editGoods', this.formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("修改成功");
                this.$emit('refresh')
              }
            });
        }else{
          //新增
          this.$http.post('/goods/addGoods', this.formData,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("新增成功");
                this.$refs.goodForm.resetFields()
              }
            });
        }

      },
      //完成裁剪
      cropFinish(file){
        this.goodForm.pic = file
        let str = URL.createObjectURL(file)
        this.goodForm.goodsPic = str
      },
      //获取根节点
      getRoot(){
        this.$http.get('/type/getRoot')
          .then(res => {
            if (res.code === 10000) {
              this.options = res.data
            }
          });
      },
      //懒加载
      myLazyLoad(node, resolve) {
        //获取层级
        const {level} = node
        const {children} = node
        const {data} = node
        console.log(node)
        if (!node.root) {
          let nodes = [];
          this.$http.get('/type/getChildren?parentId=' + node.value)
            .then(res => {
              if (res.code === 10000) {
                for (let item of res.data) {
                  nodes.push(item);
                }
              }
              resolve(nodes)
            });
        }
      }
    },
    components:{
      cropUpload
    },
    props:{
      editTitle:String
    },

  }
</script>

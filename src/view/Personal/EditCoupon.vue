<!-- 优惠券管理 -->
<template>
  <el-row class="editCoupon" style="padding: 30px 30px 30px 60px;height: 800px">
    <el-row style="border-bottom: 2px solid #F4F7FE;padding-bottom: 20px">
      <div class="mm4">优惠券管理</div>
    </el-row>
    <el-row style="margin-top: 30px">
      <el-card style="display: flex">
        <el-form>
          <el-row type="flex">
            <el-form-item label="优惠券状态" label-width="100px">
              <el-select  v-model="queryForm.data.expiredFlag" style="width: 100px;margin-left: 1px">
                <el-option label="所有" :value="null">
                </el-option>
                <el-option label="过期" :value="1">
                </el-option>
                <el-option label="未过期" :value="0">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠券启用" label-width="100px">
              <el-select  v-model="queryForm.data.couponFlag" style="width: 100px;margin-left: 1px">
                <el-option label="所有" :value="null">
                </el-option>
                <el-option label="启用" :value="1">
                </el-option>
                <el-option label="未启用" :value="0">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间" label-width="100px">
              <div class="block">
                <el-date-picker
                  v-model="timeTable"
                  unlink-panels
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="优惠券类型" label-width="100px">
              <el-select v-model="queryForm.data.couponUseType">
                <el-option label="所有" :value="null"/>
                <el-option label="折扣优惠券" value="折扣优惠券"/>
                <el-option label="满减优惠券" value="折扣优惠券"/>
              </el-select>
            </el-form-item>
          </el-row>

          <el-row type="flex">
            <el-form-item label="商品名" label-width="100px">
              <el-input v-model="queryForm.data.goodsName">

              </el-input>
            </el-form-item>
            <el-form-item label="优惠券名" label-width="100px">
              <el-input v-model="queryForm.data.couponName">

              </el-input>
            </el-form-item>
            <el-button style="margin-left: 40px" type="primary" @click="getTable">查询</el-button>
          </el-row>
        </el-form>
      </el-card>
      <el-table
        v-loading="loading"
        :data="table"
        :header-cell-style="getHeadClass"
        :row-class-name="judgment"
        border
        style="width: 100%;margin-top: 20px">
        <el-table-column
          prop="couponName"
          label="优惠券">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="couponType"
          label="优惠券类型">
        </el-table-column>
        <el-table-column
          prop="couponLimit"
          label="使用限制">
          <template slot-scope="scope">
            <span>{{scope.row.couponLimit}}元
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="couponValue"
          label="面值">
          <template slot-scope="scope">
            <span>{{scope.row.couponValue}}
              <span v-if="scope.row.couponUseType == '满减优惠券'">元</span>
              <span v-else>折</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="couponNum"
          label="剩余张数">
        </el-table-column>
        <el-table-column
          prop="haveUseCount"
          label="已领取数">
        </el-table-column>
        <el-table-column
          prop="couponDateEnd"
          label="有效期">
          <template slot-scope="scope">
            {{$date.format(new Date(scope.row.couponDateEnd))}}
          </template>
        </el-table-column>
        <el-table-column
          prop="couponDateCreate"
          label="创建时间">
          <template slot-scope="scope">
            {{$date.format(new Date(scope.row.couponDateCreate))}}
          </template>
        </el-table-column>
        <el-table-column
          prop="statusStr"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.couponFlag == 0" type="danger" size="mini">已作废</el-button>
            <el-button v-if="scope.row.couponFlag == 1" type="primary" size="mini" @click="openEdit(scope.row)">修改</el-button>
            <el-button v-if="scope.row.couponFlag == 1" type="danger" size="mini" @click="makeInvalid(scope.row)">作废</el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div style="margin-top: 40px"><img src="static/none_data.bc96383.png" width="131" height="102"></div>
          <div class="mm6">暂无相关数据</div>
        </template>
      </el-table>

      <el-drawer
        class="wadasd"
        :visible.sync="editVisible"
        size="40%"
        append-to-body
        direction="rtl"
        @close="close">
        <template slot="title">
          <el-row style="border-bottom: 2px solid #F7F7F7;padding-bottom: 10px">
            <span style="font-weight: 500;font-size: 16px;color: #000000">修改优惠码信息</span>
          </el-row>
        </template>
        <el-row style="padding-left:20px;padding-right: 20px;padding-bottom:10px;border-bottom: 2px solid #F7F7F7">
          <el-form
            label-position="top"
            :model="editRow"  label-width="80px"
          >
            <el-row>
              <el-col :span="10">
                <el-form-item>
                  <template slot="label">
                    <span class="uytrew">使用限制</span>
                  </template>
                  <el-input v-model="editRow.couponLimit">
                    <template slot="suffix">
                      <span>元</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item>
                  <template slot="label">
                    <span class="jiji">券有效期</span>
                  </template>
                  <div class="block">
                    <el-date-picker
                      v-model="editRow.couponDateEnd"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item>
                  <template slot="label">
                    <span class="uytrew">券价值</span>
                  </template>
                  <el-input v-model="editRow.couponValue">
                    <template slot="suffix">
                      <span v-if="editRow.couponUseType == '满减优惠券'">元</span>
                      <span v-else>折</span>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="2">
                <el-form-item>
                  <template slot="label">
                    <span class="uytrew">券数量</span>
                  </template>
                  <el-input  v-model="editRow.couponNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-row>
        <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;padding-right: 10px">
          <el-button @click="close">
            取消
          </el-button>
          <el-button type="primary" @click="editCoupon">
            提交
          </el-button>
        </el-row>
      </el-drawer>

      <div class="block" style="margin-top: 20px">
        <el-pagination
          @size-change="getTable"
          @current-change="getTable"
          :current-page.sync="queryForm.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size.sync="queryForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>
  </el-row>
</template>
<style>
  .editCoupon .wwf{
    background-color: #7095b1;
  }
  .editCoupon .del{
    background-color: #9a8787;
  }
  .editCoupon .mm4{
    float: left;
    display: inline-block;
    font-size: 18px;
    font-weight: 800;
    color: #68728c;
  }
</style>
<script>
  export default {
    data() {
      return {
        editRow:{
          couponId:null,
          couponDateEnd:null,
          couponNum:null,
          couponLimit:null,
          couponValue:null,
          couponType:null,
          couponUseType:null,
        },
        editVisible:false,
        //输入框填写的内容
        loading:false,
        //订单表的参数
        total:0,
        timeTable:["",""],
        queryForm:{
          pageSize:10,
          pageNumber:1,
          data: {
            //可传值
            couponFlag: 1, //启用标志 1表示启用
            expiredFlag: 0, //过期标志 1表示过期
            startTime: null, //查询的创建时间
            endTime: null, //查询的创建时间
            goodsName: null, //优惠券名
            couponName: null, //优惠券名
            couponUseType:null//优惠券类型
          }
        },
        table:[],
      };
    },
    mounted() {
      //首次加载自动调用
      this.getTable();
    },
    methods:{
      makeInvalid(row){
        this.$confirm('此操作将优惠券作废, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/coupon/makeInvalid',[row.couponId])
            .then(res => {
              if (res.code === 10000) {
                this.$message.success("作废成功")
                this.getGoodsDetails()
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
      openEdit(row){
        this.editRow.couponId = row.couponId;
        this.editRow.couponDateEnd = row.couponDateEnd;
        this.editRow.couponNum = row.couponNum;
        this.editRow.couponLimit = row.couponLimit;
        this.editRow.couponValue = row.couponValue;
        this.editRow.couponUseType = row.couponUseType;
        this.editRow.couponType = row.couponType;
        this.editVisible = true;
      },
      editCoupon(){
        this.$http.post('/coupon/editCoupon', this.editRow)
          .then(res => {
            if (res.code === 10000) {
              this.$message.success("修改成功");
              this.close();
              this.getTable();
            }
          });
      },
      close(){
        this.editVisible = false;
      },
      //访问订单
      getTable(){
        console.log(this.queryForm)
        if (this.timeTable != null) {
          this.queryForm.data.startTime = this.timeTable[0];
          if (this.timeTable[1] != null && this.timeTable[1] != "") {
            this.timeTable[1] = this.timeTable[1].replace(/00:00:00/, "23:59:59");
            this.queryForm.data.endTime = this.timeTable[1];
          }
        }else{
          this.queryForm.data.startTime = null;
          this.queryForm.data.endTime = null;
        }
        if (this.queryForm.data.startTime == "") {
          this.queryForm.data.startTime = null;
        }
        if (this.queryForm.data.endTime == "") {
          this.queryForm.data.endTime = null;
        }
        this.loading = true;
        this.$http.post('/coupon/getListByPage', this.queryForm)
          .then(res => {
            if (res.code === 10000) {
              this.table = res.data.list;
              this.total = res.data.total;
            }
            this.loading = false
          });
      },
      //判断行
      judgment({row, rowIndex}){
        if (row.couponFlag == 0) {
          return 'del';
        }else if(new Date(row.couponDateEnd) < new Date()){
          return 'wwf';
        }
      },
      //表头样式
      getHeadClass(){
        return ' color: #68728c!important;\n' +
          '    font-weight: 700;'+
          'background: rgba(244,247,254,.25);'
      }
    },

  }
</script>

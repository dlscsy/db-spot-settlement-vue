<!--
  @name: 中心上报页面
  @Authror: wangwei
  @Date: 2020/04/03
-->
<template>
    <div>
        <el-card>
            <!-- 第一行 -->
            <el-row>
                <!-- 日期选择器 -->
                <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                                :picker-options="pickerOptions">
                </el-date-picker>
                <!-- 查询按钮 -->
                <el-button type="primary">查询</el-button>
                <el-button type="warning">保存</el-button>
                <el-button type="danger">提交</el-button>
            </el-row>
            <el-divider></el-divider>

            <!-- 第二行 -->
            <el-row>
                <el-tag type="info">上报单位：东北</el-tag>
                <el-tag type="info">上报人：杨巍巍</el-tag>
                <el-tag type="info">上报时间：2020-03-20 09:00:00</el-tag>
            </el-row>
            <el-divider></el-divider>

            <!-- 第三行 -->
            <el-row>
                <el-tabs>
                    <!-- tab页1 -->
                    <el-tab-pane label="跨区通道">
                        <!-- 第三行内第一行-->
                        <el-row :gutter="20">
                            <!-- tab页1 第一列-->
                            <el-col :span="6">
                                <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                                </el-input> -->
                                <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick">
                                </el-tree>
                            </el-col>
                            <!-- tab页1 第二列-->
                            <el-col :span="18">
                                <!-- 表格区域 -->
                                <el-table :data="pointList" border stripe>
                                    <el-table-column label="时刻" prop="time" fixed></el-table-column>
                                    <el-table-column label="0时" prop="time0"></el-table-column>
                                    <el-table-column label="1时" prop="time1"></el-table-column>
                                    <el-table-column label="2时" prop="time2"></el-table-column>
                                    <el-table-column label="3时" prop="time3"></el-table-column>
                                    <el-table-column label="4时" prop="time4"></el-table-column>
                                    <el-table-column label="5时" prop="time5"></el-table-column>
                                    <el-table-column label="6时" prop="time6"></el-table-column>
                                    <el-table-column label="7时" prop="time7"></el-table-column>
                                    <el-table-column label="8时" prop="time8"></el-table-column>
                                    <el-table-column label="9时" prop="time9"></el-table-column>
                                    <el-table-column label="10时" prop="time10"></el-table-column>
                                    <el-table-column label="11时" prop="time11"></el-table-column>
                                    <el-table-column label="12时" prop="time12"></el-table-column>
                                    <el-table-column label="13时" prop="time13"></el-table-column>
                                    <el-table-column label="14时" prop="time14"></el-table-column>
                                    <el-table-column label="15时" prop="time15"></el-table-column>
                                    <el-table-column label="16时" prop="time16"></el-table-column>
                                    <el-table-column label="17时" prop="time17"></el-table-column>
                                    <el-table-column label="18时" prop="time18"></el-table-column>
                                    <el-table-column label="19时" prop="time19"></el-table-column>
                                    <el-table-column label="20时" prop="time20"></el-table-column>
                                    <el-table-column label="21时" prop="time21"></el-table-column>
                                    <el-table-column label="22时" prop="time22"></el-table-column>
                                    <el-table-column label="23时" prop="time23"></el-table-column>
                                </el-table>
                            </el-col>
                        </el-row>
                        <!-- 第三行内第二行-->
                        <el-row>
                            <el-col :span="24">
                                <!--<echart-simple-line style="width:100%"></echart-simple-line>-->
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <!-- tab页2-->
                    <el-tab-pane label="省间通道"></el-tab-pane>
                    <!-- tab页3-->
                    <el-tab-pane label="日前预计划"></el-tab-pane>
                    <!-- tab页4 -->
                    <el-tab-pane label="设备信息">管辖范围内的主要设备（线路、母线、变压器、机组）停电时间和恢复时间</el-tab-pane>
                    <!-- tab页5 -->
                    <el-tab-pane label="其他数据">管辖范围内的切机量、开机方式、负荷水平等影响跨区输电能力的数据</el-tab-pane>
                </el-tabs>

            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "中心上报",
        data() {
            return {
                // title: '现货市场',
                // weightData: '600px',
                // heightData: '400px',

                // 日期选择器
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }]
                },
                value1: '',
                value2: '',

                // 树形控件
                data: [
                    {
                        label: '辽吉断面',
                        children: [
                            {
                                label: '正向限额'
                            },
                            {
                                label: '反向限额'
                            }
                        ]
                    },
                    {
                        label: '吉黑断面',
                        children: [
                            {
                                label: '正向限额'
                            },
                            {
                                label: '反向限额'
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                // 表格数据
                pointList: [
                    {
                        time: '15分',
                        time0: '',
                        time1: '',
                        time2: '',
                        time3: '',
                        time4: '',
                        time5: '',
                        time6: '',
                        time8: '',
                        time9: '',
                        time10: '',
                        time11: '',
                        time12: '',
                        time13: '',
                        time14: '',
                        time15: '',
                        time16: '',
                        time17: '',
                        time18: '',
                        time19: '',
                        time20: '',
                        time21: '',
                        time22: '',
                        time23: ''
                    },
                    {
                        time: '30分',
                        time0: '',
                        time1: '',
                        time2: '',
                        time3: '',
                        time4: '',
                        time5: '',
                        time6: '',
                        time8: '',
                        time9: '',
                        time10: '',
                        time11: '',
                        time12: '',
                        time13: '',
                        time14: '',
                        time15: '',
                        time16: '',
                        time17: '',
                        time18: '',
                        time19: '',
                        time20: '',
                        time21: '',
                        time22: '',
                        time23: ''
                    },
                    {
                        time: '45分',
                        time0: '',
                        time1: '',
                        time2: '',
                        time3: '',
                        time4: '',
                        time5: '',
                        time6: '',
                        time8: '',
                        time9: '',
                        time10: '',
                        time11: '',
                        time12: '',
                        time13: '',
                        time14: '',
                        time15: '',
                        time16: '',
                        time17: '',
                        time18: '',
                        time19: '',
                        time20: '',
                        time21: '',
                        time22: '',
                        time23: ''
                    },
                    {
                        time: '60分',
                        time0: '',
                        time1: '',
                        time2: '',
                        time3: '',
                        time4: '',
                        time5: '',
                        time6: '',
                        time8: '',
                        time9: '',
                        time10: '',
                        time11: '',
                        time12: '',
                        time13: '',
                        time14: '',
                        time15: '',
                        time16: '',
                        time17: '',
                        time18: '',
                        time19: '',
                        time20: '',
                        time21: '',
                        time22: '',
                        time23: ''
                    }
                ]
            }
        },

        computed: {},
        created() {

        },
        beforeCreate() {

        },
        methods: {
            handleNodeClick() {

            }
        }
    }
</script>

<style lang="less" scoped>
    .el-row {
        margin-bottom: 10px;
    }

    .el-tag {
        margin-right: 20px;
    }

    .el-divider--horizontal {
        margin: 8px 0;
        background: 0 0;
        border-top: 1px solid #e8eaec;
    }

    .el-button {
        margin-left: 10px;
    }

    .el-tree {
        height: 260px;
        //background-color: #f2f6fc;
        border: 1px solid #dcdfe6;
    }

    .el-table {
        margin-top: 0;
    }
</style>

<template>
  <div class="hs-contaner-full" style='padding:0;position:relative;height:100%;'>
     <div class='view-wrapper'>
      <div class='paper-view'>
      <hs-form :form='form' :data='formData' editable />
      </div>
    </div>
     <div class='side-wrapper' style='left:0px;border-left:none;'>
         <div class='box-caption'>
              流程图
        </div>
        <div class='graph-wrap'>
          </div>
         <div class='box-caption'>
              流程进度
             </div>
         <div class='node-list'>
         
        表单
      </div>
    </div>
    <div class='side-wrapper' style='right:0px;border-right:none;'>
        <div class='box-caption'>
              数据
        </div>
        <div class='graph-wrap'>
          </div>
          <div class='box-caption'>
              操作
        </div>
    </div>
   
  </div>
</template>

<script>
export default {
  data(){
    return {
      nodeInstances:[{
        name:"初始配置"
      }],
      formData:{},
      form:{
        def:{
          name:{
            control:"input"
          }
        },
        layout:`  <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin-left:0pt; width:473.2pt">
      <tr style="height:15.35pt">
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:94.25pt">
          <p style="line-height:22pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:黑体; font-size:12pt; font-weight:bold">员工考核表</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:54.6pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">编 码</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:79.4pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:Arial; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:21.3pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">编号</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:57.6pt">
          <p style="margin:0pt; orphans:0; padding-left:0.05pt; text-align:center; text-indent:-0.05pt; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">{{name}}</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:22.95pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">页码</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:double; border-top-width:2.25pt; padding-left:5.03pt; padding-right:4.28pt; vertical-align:middle; width:65.25pt">
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.55pt">
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:34.05pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">姓 名</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:49.4pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:54.6pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">所在部门</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:79.4pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:21.3pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">岗位</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:57.6pt">
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; font-weight:bold">行政</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:22.95pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">职称</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:4.28pt; vertical-align:middle; width:65.25pt">
          <p style="margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:151.8pt">
        <td colspan="13"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:4.28pt; vertical-align:top; width:460.15pt">
          <p style="line-height:15pt; margin:7.8pt 0pt 0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">述职报告（</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">主要工作并从</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">工作内容</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">、成绩、</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">状态</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">等方面</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">作出</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">分析</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">与</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">总结</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">，可简述</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">2020</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">年</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">工作</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">或</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">学习计划</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">，</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">请</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">附页</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">，</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">不超过</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">2500字</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">为宜</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">）</span></p>
          <p style="margin:7.8pt 0pt 0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
          <p style="margin:7.8pt 0pt 0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
          <p style="margin:7.8pt 0pt 0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
          <p style="margin:0pt 0pt 3.1pt; orphans:0; text-align:justify; text-indent:2.85pt; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">                                   </span><span
              style="font-family:仿宋_GB2312; font-size:12pt">      </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">本人签名：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">          </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">日期： </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">         </span></p>
        </td>
      </tr>
      <tr style="height:23.5pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:top; width:92.25pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:right; text-indent:43.3pt; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">考核人员</span></p>
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:justify; text-indent:10pt; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">考核内容</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:13pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; letter-spacing:-1pt">分值</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:13pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; letter-spacing:-1pt">自评分</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:53.7pt">
          <p style="line-height:13pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">第一责任人</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:56.7pt">
          <p style="line-height:13pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">第二责任人</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:4.28pt; vertical-align:top; width:146pt">
          <p style="line-height:20pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">备    注</span></p>
        </td>
      </tr>
      <tr style="height:16.5pt">
        <td colspan="10"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:303.35pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; font-weight:bold">职业道德</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">（实行一票否决制，凡存在问题，考核结论即为不</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">称职</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">）</span></p>
        </td>
        <td colspan="3" rowspan="11"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:4.28pt; vertical-align:middle; width:146pt">
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">1、</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">凡遇有职业道德违规事项，必须随时逐级上报，个案处理。</span></p>
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">2</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">、</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt"> “优秀”等级合计得分不宜低于85分，分项得分不宜低于80%，推荐比例一般不应超过25%。</span></p>
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">3</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">、</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">“勤奋敬业精神”（包含工作纪律）分项得分60%以下者，按“不称职”推荐等级。</span></p>
          <p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">服务意识</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">15</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">协作意识</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">15</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">严谨程度</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">10</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">工作质量</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">10</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">工作效率</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">10</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">勤奋敬业精神</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">10</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">支持项目情况</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">15</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">支持部门情况</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">15</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:12pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:19.85pt">
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:92.25pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:center; text-indent:20pt; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">合  计</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:18.05pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">100</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:18.35pt">
        <td colspan="4"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:5.03pt; vertical-align:middle; width:121.1pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">考核人签名/日期</span></p>
        </td>
        <td colspan="2"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:39.45pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
        </td>
        <td
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:53.7pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
        </td>
        <td colspan="3"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:top; width:56.7pt">
          <p style="line-height:11pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:12pt">&#xa0;</span></p>
        </td>
      </tr>
      <tr style="height:82.95pt">
        <td colspan="13"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:4.28pt; vertical-align:top; width:460.15pt">
          <p style="line-height:14pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">推荐等级：优秀（      ）称职（      ）基本称职（       ）不称职（        ）
            </span></p>
          <p style="line-height:14pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">简要评语： </span></p>
          <p style="line-height:20pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
          <p style="margin:0pt 0pt 1.55pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
          <p style="margin:0pt 0pt 1.55pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">                        第一考核责任人签名：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">           </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">日期：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">          </span></p>
        </td>
      </tr>
      <tr style="height:78.4pt">
        <td colspan="13"
          style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:4.28pt; vertical-align:top; width:460.15pt">
          <p style="line-height:14pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">推荐等级：优秀（      ）称职（      ）基本称职（       ）不称职（        ）
            </span></p>
          <p style="line-height:14pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">简要评语： </span></p>
          <p style="line-height:20pt; margin:0pt; orphans:0; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
          <p style="margin:0pt 0pt 1.55pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
          <p style="margin:0pt 0pt 1.55pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">                        第二考核责任人签名：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">           </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">日期：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">          </span></p>
        </td>
      </tr>
      <tr style="height:45.1pt">
        <td colspan="13"
          style="border-bottom-color:#000000; border-bottom-style:double; border-bottom-width:2.25pt; border-left-color:#000000; border-left-style:double; border-left-width:2.25pt; border-right-color:#000000; border-right-style:double; border-right-width:2.25pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:4.28pt; padding-right:4.28pt; vertical-align:top; width:460.15pt">
          <p style="line-height:20pt; margin:0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">考核结论：经综合评价确定考核等级为优秀（  ） 称职（  ） 基本称职（    ） 不称职（    
              ）          </span></p>
          <p style="line-height:20pt; margin:0pt 21pt 7.8pt 0pt; orphans:0; text-align:justify; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">&#xa0;</span></p>
          <p style="line-height:20pt; margin:0pt 21pt 7.8pt 0pt; orphans:0; text-align:center; widows:0"><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">                      考核审定人签名：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">               </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt">日期：</span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt; text-decoration:underline">          </span><span
              style="font-family:仿宋_GB2312; font-size:10.5pt"> </span></p>
        </td>
      </tr>
      <tr style="height:0pt">
        <td style="width:44.85pt; border:none"></td>
        <td style="width:58.2pt; border:none"></td>
        <td style="width:2pt; border:none"></td>
        <td style="width:26.85pt; border:none"></td>
        <td style="width:38.55pt; border:none"></td>
        <td style="width:11.7pt; border:none"></td>
        <td style="width:64.5pt; border:none"></td>
        <td style="width:14pt; border:none"></td>
        <td style="width:32.1pt; border:none"></td>
        <td style="width:21.4pt; border:none"></td>
        <td style="width:47pt; border:none"></td>
        <td style="width:33.75pt; border:none"></td>
        <td style="width:76.05pt; border:none"></td>
      </tr>
    </table>
  </div><br style="clear:both; mso-break-type:section-break; page-break-before:always" />
  <div>
    <p style="margin:0pt"><span style="font-family:仿宋; font-size:10.5pt">附件</span><span
        style="font-family:仿宋; font-size:10.5pt">1</span><span style="font-family:仿宋; font-size:10.5pt">：</span></p>
    <p style="margin:0pt; text-align:center"><span
        style="font-family:仿宋; font-size:14pt; font-weight:bold">2020</span><span
        style="font-family:仿宋; font-size:14pt; font-weight:bold">年</span><span
        style="font-family:仿宋; font-size:14pt; font-weight:bold">度员工考核汇总</span><span
        style="font-family:仿宋; font-size:14pt; font-weight:bold">表</span></p>
    <div style="text-align:center">
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse; margin:0 auto; width:584.1pt">
        <tr style="height:28.8pt">
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">项目部</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">姓名</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">岗位</span></p>
          </td>
          <td
            style="background-color:#00b0f0; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">考核得分</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">综合评述</span><span
                style="font-family:仿宋; font-size:10pt">（</span><span
                style="font-family:仿宋; font-size:10pt">状态</span><span
                style="font-family:仿宋; font-size:10pt">、能力、特点、发展）</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">考核定级</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">考核结论</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">评优推荐</span></p>
          </td>
          <td
            style="background-color:#ffff00; border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; border-top-color:#000000; border-top-style:solid; border-top-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">考核人</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
        <tr style="height:18pt">
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-left-color:#000000; border-left-style:solid; border-left-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.03pt; padding-right:5.03pt; vertical-align:middle; width:27.15pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:37.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:38.05pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:45.65pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:178.1pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:41.3pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
          <td
            style="border-bottom-color:#000000; border-bottom-style:solid; border-bottom-width:0.75pt; border-right-color:#000000; border-right-style:solid; border-right-width:0.75pt; padding-left:5.4pt; padding-right:5.03pt; vertical-align:middle; width:36.25pt">
            <p style="margin:0pt; text-align:center"><span style="font-family:仿宋; font-size:10pt">&#xa0;</span></p>
          </td>
        </tr>
      </table>`,
        option:{
          hideAction:true
        }
      }
    }
  },
 props:['key']
}
</script>

<style lang="less" scoped>
.view-wrapper{
  position: absolute;
  left:300px;
  right:300px;
  top:0;
  bottom:0;
  overflow:auto;
  z-index:1;
}
.paper-view{
  border:1px solid #ccc;
  width:570pt;
  margin:20px auto;
  min-height:1000px;
  background:linear-gradient(to bottom right,#fff,#eee,#fff);
  padding:60px 60px 40px 60px;
  
}

.side-wrapper{
  position:absolute;
  top:0px;
  width:300px;
  min-height:1000px;
  background:#333;
  border-right:1px solid #aaa;
  border-left:1px solid #aaa;
  z-index:2;
}
.box-caption{
    height:30px;
    background:#333;
    color:#fff;
    display: flex;
    align-items: center;
    padding:0 5px;
    border-bottom:1px solid #555;
    z-index:2;
  }
.history{
  margin-right:5px;
  background:#aaa;
  min-height:1000px;
  
}

.graph-wrap{
  height:160px;
  background:#000;
}
</style>
export default {
                layout:`<div>
               
                  <div class='flex-wrap' style='width:100%;justify-content:center;'>
                 <div style='width:60%;border-radius:10px;overflow:hidden;'>
                {{phone}}
                </div>
                <Button class='login-btn' style='height:58px;border-radius:10px !important;margin-left:10px;background: linear-gradient(to bottom right, #1c80c7, #07d3c5);font-size:20px;color:#fff;border:none;overflow:hidden;' @click='submit'>一键注册</Button>
                </div>
                <div style='padding:5px 10px;color:#888;text-align:center;'>账号及临时密码会发送至您的手机, 欢迎试用!</div>
                </div>
               

               
               
                </div> </div>`,
                /**
                 *  <div style='padding:10px;background:linear-gradient(to bottom, rgba(5, 59, 68, 1) 0%, #094155 100%), radial-gradient(at top center, rgba(194, 114, 234, 0.9) 0%, rgba(90, 68, 207, 0.9) 120%) #394865;color:#fff;margin-top:10px;'>
                
                <div class='flex-wrap flex-around'>
                <div>
                     <div style='color:#fff;background:#ffffff33;padding:2px 5px;border-radius:10px;width:100px;margin:0 auto;text-align:center;margin-bottom:10px;'>个人版</div>
                     <div> <Icon type='md-checkmark' style='color:lightgreen' /> <span style=''> 项目管理工具</span><br /><Icon type='md-checkmark' style='color:lightgreen' /> 流程协同工具<br /><Icon type='md-checkmark' style='color:lightgreen' /> 计划任务工具<br /><Icon type='md-checkmark' style='color:lightgreen' /> 文档资料工具<br /><Icon type='md-checkmark' style='color:lightgreen' /> 临时文件存储<br />
                     </div>
                    </div>
                   
                </div>
                 *  <div>
                     <div style='color:#fff;background:#ffffff33;padding:2px 5px;border-radius:10px;width:100px;margin:0 auto;text-align:center;margin-bottom:10px;'>企业版</div><div> <Icon type='md-checkmark' style='color:lightgreen' /> <span style=''> 项目管理工具</span>  <Icon type='md-checkmark' style='color:lightgreen;margin-left:10px;' /> <span style=''> 人力资源管理</span><br /><Icon type='md-checkmark' style='color:lightgreen' /> 流程协同工具 <Icon type='md-checkmark' style='color:lightgreen;margin-left:10px;' /> <span style=''> 经营数据分析</span><br /><Icon type='md-checkmark' style='color:lightgreen' /> 计划任务工具 <Icon type='md-checkmark' style='color:lightgreen;margin-left:10px;' /> <span style=''> 企业档案管理</span><br /><Icon type='md-checkmark' style='color:lightgreen' /> 文档资料工具 <Icon type='md-checkmark' style='color:lightgreen;margin-left:10px;' /> <span style=''> 人力资源管理</span><br /><Icon type='md-checkmark' style='color:lightgreen' /> 临时文件存储<br /></div>
                    </div>
                 */
                def:{
                    phone:{
                        label:'输入手机号',
                        control:'input',
                        option:{
                            required:true,
                            maxlen:11
                        }
                    }
                },
                option:{
                    hideAction:true
                }
              }
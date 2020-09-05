<template>
<Layout style='width:100%;overflow:hidden;position:relative;height:100%;'>


  <Row :key='i' :gutter="10" style='margin:10px;'>
    <Col :span='5'>
        <Card class="panel"  style='width:100%;height:100px;border:none;background:#23334c;color:#fff;border-radius:0;filter:drop-shadow(1px 1px 1px 2px #333);'>
        <div style='padding:10px;padding-top:0;'>
          早上好, <a>{{session.name}}</a>
          <h3>2020年9月1日</h3>
       </div>
      
    </Card>
    <Card class="panel"  style='width:100%;border:none;border-radius:0' padding="5">
      <div class='l-list'>
        
        <div class='action-button'>
          <Icon custom='gzicon gzi-jianbao' color='#45556E' size='32' />
          发布通知
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-xiangmu' color='#45556E' size='32' />
          布置任务
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-Building-' color='#45556E' size='32' />
          创建项目
        </div>

        <div class='action-button'>
          <Icon custom='gzicon gzi-xiangmu2' color='#45556E' size='32' />
          上传档案
        </div>

      </div>
        
         
    </Card>
     <Card class="panel" style="width:100%;border:none;margin-top:10px;position:relative;border-bottom-left-radius:0;border-bottom-right-radius:0;" @on-click='onClickNotice'>
         <Carousel autoplay v-model="value2" loop style='width:100%;margin-bottom:10px;'  autoplay-speed='10000' height='250' dots='outside'>
        <CarouselItem>
            <div class="demo-carousel">关于通知的通知</div>
            <sub>2020/2/3 财务部</sub>
            <p>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的通知大家都见过，一般就是目的、会议的名称、内容、参加人员、会议时间、地点等，要注意的是要把这些写正确，通知错时间地点就是你的失职了。通知还有批转性通知、转发性通知，这类的通知就是有话则长，无话则短，也就是要简明扼要，直接陈述事宜即可。</p>
        </CarouselItem>
        <CarouselItem>
             <div class="demo-carousel">通知</div>
              <sub>2020/2/3 财务部</sub>
            <p>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的通知大家都见过，一般就是目的、会议的名称、内容、参加人员、会议时间、地点等，要注意的是要把这些写正确，通知错时间地点就是你的失职了。通知还有批转性通知、转发性通知，这类的通知就是有话则长，无话则短，也就是要简明扼要，直接陈述事宜即可。</p>
        </CarouselItem>
        <CarouselItem>
             <div class="demo-carousel">通知</div>
              <sub>2020/2/3 财务部</sub>
            <p>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的通知大家都见过，一般就是目的、会议的名称、内容、参加人员、会议时间、地点等，要注意的是要把这些写正确，通知错时间地点就是你的失职了。通知还有批转性通知、转发性通知，这类的通知就是有话则长，无话则短，也就是要简明扼要，直接陈述事宜即可。</p>
        </CarouselItem>
        <CarouselItem>
             <div class="demo-carousel">通知</div>
              <sub>2020/2/3 财务部</sub>
            <p>这种通知要注意把要求和措施部分交待清楚，可以分条也可用小标题的形式，这样才能便于下级执行。会议性的通知大家都见过，一般就是目的、会议的名称、内容、参加人员、会议时间、地点等，要注意的是要把这些写正确，通知错时间地点就是你的失职了。通知还有批转性通知、转发性通知，这类的通知就是有话则长，无话则短，也就是要简明扼要，直接陈述事宜即可。</p>
        </CarouselItem>
    </Carousel>
  <div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div>
     <div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div><div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div><div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div><div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div><div>  <a href='#'>这种通知要注意把要求和措施部 <span style='float:right'>2020/7/12</span></a></div>
       
    </Card>
  <Card class="panel" style="width:100%;border:none;height:280px;margin-top:10px;">
      临时文件/共享文件
    </Card>
    </Col>
    <Col :span='13'>
    <Row :gutter="10">
      <Col :span='6'>
      <Card>
        当前工作
      </Card>
      
      </Col>
      <Col :span='6'>
       <Card>
        紧急/即将到期
      </Card>
      </Col>
      <Col :span='6'>
       <Card>
        已完成
      </Card>
      </Col>
      <Col :span='6'>
       <Card>
        所有工作
      </Card>
      </Col>
    </Row>
    <Card class="panel" style="width:100%;border:none;height:750px;margin-top:10px;">
      <BaseCalendar style='height:600px' />
    </Card>

    </Col></Col>
    <Col :span='6'>
     
    <Card class="panel" style="width:100%;border:none;height:350px;">
      <ButtonGroup>
        <Button type='primary'>进行中</Button>
        <Button>待审核</Button>
        <Button>已完成</Button>
    </ButtonGroup>
        <List>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
            <template slot="action">
                <li>
                    <a href="">Edit</a>
                </li>
                <li>
                    <a href="">More</a>
                </li>
            </template>
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
            <template slot="action">
                <li>
                    <a href="">Edit</a>
                </li>
                <li>
                    <a href="">More</a>
                </li>
            </template>
        </ListItem>
    </List>
    </Card>
    <Card class="panel" style="width:100%;border:none;height:350px;margin-top:10px;">
      <ButtonGroup>
        <Button type='primary'>当前项目</Button>
        <Button>关注项目</Button>
        <Button>历史项目</Button>
    </ButtonGroup>
        <List>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="项目名称" description="This is description, this is description." />
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
            <template slot="action">
                <li>
                    <a href="">Edit</a>
                </li>
                <li>
                    <a href="">More</a>
                </li>
            </template>
        </ListItem>
        <ListItem>
            <ListItemMeta avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" title="This is title" description="This is description, this is description." />
            <template slot="action">
                <li>
                    <a href="">Edit</a>
                </li>
                <li>
                    <a href="">More</a>
                </li>
            </template>
        </ListItem>
    </List>
    </Card>
    </Col>
  </Row>
   
   
    <!-- <div class="panel" style="  width:calc(8.3333% * 7 - 2px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 2 );top:2px;background:rgba(200,200,200,0.7);filter:drop-shadow(1px 1px 2px #333) brightness(1.1);padding:20px;">
      日历
    </div>
    <div class="panel" style="  width:calc(8.3333% * 3 - 8px);height:calc(110px * 6 - 20px);left:calc(8.3333% * 9 + 4px);top:2px;background:#333;color:#fff;padding:20px;">
      待办任务
    </div> -->
    </Layout>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      isConfiguring:false
    }
  },
  computed:{
    ...mapGetters('core',['session'])
  },
  metaInfo:{
    title:'工作台'
  }
}
</script>

<style lang="less" scoped>
.demo-carousel{
  text-align: center;
  font-size:16px;
  margin:5px 0;
  text-overflow: ellipsis;
}

.action-button{
  display:flex;
  flex-direction: column;
  width:60px;
  height:60px;
  font-size:12px;
  align-items: center;
  justify-content: center;
}

.action-button:hover{
  filter:brightness(1.5);
  cursor: pointer;
}

.action-button:active{
  position: relative;
  bottom:-1px;
  right:-1px;
}
</style>
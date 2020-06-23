<template>
   <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotList" :key="item.id">{{item.nm}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="item in cityList" :key="item.index">
                    <h2>{{item.index}}</h2>
                    <ul>
                        <li v-for="data in item.list" :key="data.id">{{data.nm}}</li>
                    </ul>
                </div>
            </div> 
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">
                    {{item.index}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'City',
    data(){
        return{
            cityList:[],
            hotList:[]
        }
    },
    mounted(){
        this.axios.get('/api/cityList').then(res=>{
            var msg=res.data.msg;
            if(msg==='ok'){
                var cities=res.data.data.cities;
                //this.formatCityList(cities);
                let {cityList,hotList} = this.formatCityList1(cities);
                this.cityList=cityList;
                this.hotList=hotList
            }
        })
    },
    methods:{
        //复杂
        formatCityList(cities){
            let cityList=[];
            let hotList=[];
            for(var i=0;i<cities.length;i++){
                var firstLetter=cities[i].py.substring(0,1).toUpperCase();
                if(toCom(firstLetter)){//新添加到索引
                    cityList.push({index:firstLetter,list:[{nm:cities[i].nm,id:cities[i].id}]})
                }
                else{//累加到已有索引index中
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index===firstLetter){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
                        }
                    }
                }
            }
            cityList.sort((pre,next)=>{
                if(pre.index>next.index){
                    return 1;
                }else if(pre.index<next.index){
                    return -1;
                }else{
                    return 0;
                }
            })
            function toCom(firstLetter){
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index===firstLetter){
                        return false;
                    }
                }
                return true;
            }
             console.log(cityList)
        },
        formatCityList1(cities){
            let arr=[];
            let hotList=[];
            for(var i=65;i<91;i++){
                var s=String.fromCharCode(i)
                if(s==='I'||s==='O'||s=='U') continue;
                arr.push(s)
            }
            let cityList=[];
            for(var i=0;i<arr.length;i++){
                if(cities[i].isHot===1){
                    hotList.push(cities[i]);
                }
                var tem=cities.filter(item=>item.py.substring(0,1)===arr[i].toLowerCase())
                cityList.push({index:arr[i],list:tem})
            }
            // console.log(hotList)
            return {
                cityList,
                hotList
            };
        },
        handleToIndex(index){
            // console.log('111')
            let h2=this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
        }
    }
}

</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}

</style>
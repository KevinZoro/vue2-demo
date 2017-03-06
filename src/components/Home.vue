<template>
  <div id="home">
    <navbar></navbar>
    <el-row id="home_row">
        <el-col :span="24" class="book_center"><h1>Welcome to the bookmark system</h1></el-col>
        
        <!--<el-col :span="24">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item,key) in pic_list" :key="key">
                <img :src="image_url+item" alt="" style="width:100%;">
                </el-carousel-item>
            </el-carousel>
        </el-col>-->
    </el-row>
    <el-row style="margin-bottom:10px;">
        <el-col :span="8">bookmarks list</el-col>
        <el-col :span="12"><div class="grid-content"></div></el-col>
        <el-col :span="4">
            <el-button type="primary" @click="newBookmarkVisible=true">Create</el-button>
        </el-col>
    </el-row>

    <template>
        <el-table :data="bookmarks" border style="width:100%">
            <el-table-column fixed prop="createTime" label="日期"></el-table-column>
            <el-table-column prop="name" label="名称" width="120"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="userId" label="所有者"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
        </el-table>
    </template>

    <el-dialog title="Create New Bookmark" v-model="newBookmarkVisible">
         <el-form :model="newBookmark">
            <el-form-item label="Name">
                <el-input v-model="newBookmark.name" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="Content">
                <el-input v-model="newBookmark.content" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Type">
                <el-switch
                    v-model="isPublic"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-text="Pub"
                    off-text="Pri" style="width:50px">
                </el-switch>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="newBookmarkVisible = false">取 消</el-button>
            <el-button type="primary" @click="createNewBookmark">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script> 
    import Navbar from './Navbar.vue'
    export default {
        name: 'home',
        data () {
            return {
                // pic_list:[
                //     "api/containers/container1/download/home_0.jpg",
                //     "api/containers/container1/download/home_1.jpg",
                //     "api/containers/container1/download/home_2.jpg",
                //     "api/containers/container1/download/home_3.jpg",
                //     "api/containers/container1/download/home_4.jpg",
                //     "api/containers/container1/download/home_5.jpg",
                // ],
                // image_url:"http://localhost:3000/",
                newBookmarkVisible:false,
                newBookmark:{
                    name:"",
                    content:"",
                    type:"private"
                },
                isPublic:false
            }
        },
        computed:{
            bookmarks(){
                return this.$store.getters.bookmarks;
            }
        },
        watch:{
            'isPublic':function(val){
                this.newBookmark.type=(val?'public':'private');
            }
        },
        methods:{
            createNewBookmark(){
                this.$store.dispatch('createBookmark',this.newBookmark);
                this.newBookmarkVisible=false;
                this.newBookmark={
                    name:"",
                    content:"",
                    type:"private"
                }
            }
        },
        components:{
            Navbar
        },
        created(){
            this.$store.dispatch('getBookmarks',{});
        }
  }
</script>

<style>
#home_row{
    margin:0 20%;
}
.book_center{
    text-align: center;
}
</style>

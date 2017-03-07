<template>
    <div id="home">
        <navbar></navbar>
        <el-row id="home_row">
            <el-col :span="24" class="book_center">
                <h1>Welcome to the bookmark system</h1>
            </el-col>
        </el-row>
        <el-row style="margin-bottom:10px;">
            <el-col :span="8">bookmarks list</el-col>
            <el-col :span="12">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="newBookmarkVisible=true">Create</el-button>
            </el-col>
        </el-row>

        <template>
            <el-table :data="bookmarks" border style="width:100%">
                <el-table-column fixed prop="createTime" label="Date"></el-table-column>
                <el-table-column prop="name" label="Name" width="120"></el-table-column>
                <el-table-column prop="content" label="Contents"></el-table-column>
                <el-table-column prop="userId" label="Owner"></el-table-column>
                <el-table-column prop="type" label="Type"></el-table-column>
                <el-table-column label="Operations">
                    <template scope="scope">
                        <el-button @click="edit(scope.$index,bookmarks)" type="text" size="small">Edit</el-button>
                        <el-button type="text" size="small">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="page.currentPage" :page-size="page.size" layout="total, prev, pager, next"
                :total="count" style="float:right;">
                </el-pagination>
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
                    <el-switch v-model="isPublic" on-color="#13ce66" off-color="#ff4949" on-text="Pub" off-text="Pri" style="width:50px">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="newBookmarkVisible = false">Cancel</el-button>
                <el-button type="primary" @click="createNewBookmark">Done</el-button>
            </div>
        </el-dialog>

        <el-dialog title="Edit Bookmark" v-model="editBookmarkVisible">
            <el-form :model="editBookmark">
                <el-form-item label="Name">
                    <el-input v-model="editBookmark.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Content">
                    <el-input v-model="editBookmark.content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type">
                    <el-switch v-model="isEditPublic" on-color="#13ce66" off-color="#ff4949" on-text="Pub" off-text="Pri" style="width:50px">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editBookmarkVisible = false">Cancel</el-button>
                <el-button type="primary" @click="editBookmarkInfo">Done</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'
    export default {
        name: 'home',
        data() {
            return {
                newBookmarkVisible: false,
                newBookmark: {
                    name: "",
                    content: "",
                    type: "private"
                },
                editBookmarkVisible: false,
                editBookmark: {
                    name: "",
                    content: "",
                    type: "private",
                },
                isEditPublic: false,
                isPublic: false,

                page: {
                    currentPage: 1,
                    size: 10,
                    // count:20
                }

            }
        },
        computed: {
            bookmarks() {
                return this.$store.getters.bookmarks;
            },
            userId() {
                return this.$store.getters.user.id;
            },
            count() {
                return this.$store.getters.bookmarkCount;
            }
        },
        watch: {
            'isPublic': function (val) {
                this.newBookmark.type = (val ? 'public' : 'private');
            },
            'isEditPublic': function (val) {
                this.editBookmark.type = (val ? 'public' : 'private');
            }
        },
        methods: {
            createNewBookmark() {
                this.$store.dispatch('createBookmark', this.newBookmark);
                this.newBookmarkVisible = false;
                this.newBookmark = {
                    name: "",
                    content: "",
                    type: "private"
                }
                this.isPublic = false;
            },
            edit(index, bookmarks) {
                if (this.userId != bookmarks[index].userId) {
                    this.$notify({
                        title: 'Warning',
                        message: "No Access to modify other's bookmark!",
                        type: 'warning'
                    });
                } else {
                    this.editBookmarkVisible = true;
                    this.editBookmark = bookmarks[index];
                    this.isEditPublic = ((this.editBookmark.type == "private") ? false : true);
                }

            },
            editBookmarkInfo() {//put bookmark info
                this.$store.dispatch('editBookmark', this.editBookmark);
                this.editBookmarkVisible=false;
            },
            handleCurrentChange(val) {//pagination method
                this.page.currentPage = val;
                this.$store.dispatch('getBookmarks', {
                    limit: this.page.size,
                    skip: this.page.size * (this.page.currentPage - 1)
                });
            }
        },
        components: {
            Navbar
        },
        created() {
            this.$store.dispatch('getBookmarks', {
                limit: this.page.size,
                skip: this.page.size * (this.page.currentPage - 1)
            });
            this.$store.dispatch('getBookmarkCount')
        }
    }

</script>

<style>
    #home_row {
        margin: 0 20%;
    }
    
    .book_center {
        text-align: center;
    }
</style>
<template>
  <div class="login-box">
    
    <!-- /.login-logo -->
    <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="card align-self-center col-6">
                <div class="card-body login-card-body ">
                     <div class="login-logo">
                        <b>Administrador</b> Dokimi
                
                
                    </div>
               
                <form @submit.prevent = "pressed">
                    <div class="input-group mb-3">
                        <input type="email" v-model="email" class="form-control" placeholder="Email" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" v-model="password" class="form-control" placeholder="Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        
                    <!-- /.col -->
                        <div class="col-4">
                            <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
                        </div>
                    <!-- /.col -->
                    </div>
                    <div v-if="error" class="row">
                        <div class="alert alert-danger" role="alert">
                            {{ error}}
                        </div>
                    </div>
                </form>

                

                <p class="mb-1">
                    <a href="forgot-password.html">Perdí mi clave</a>
                </p>        
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>


</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    methods: {
        async pressed(){
           try{
                //const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
                const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
                console.log(user);                
                this.$router.replace({name: "secret"});
            }
            catch(err){
                console.log(err);
            }
           // firebase.auth().login
        }
    },
    data(){
        return {
            email: '',
            password: '',
            error: ''
        }
    }

};
</script>

<style lang="scss" scoped></style>

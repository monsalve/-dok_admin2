<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#" @click="rutear('/')">Dokimi</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">                
                    <li class="nav-item">
                        <a class="nav-link" @click="rutear('usuarios')" href="#">Usuarios</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="rutear('jugadores')" href="#">Jugadores</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="rutear('preguntas')" href="#">Preguntas</a>
                        
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="rutear('torneos')" href="#">Torneos</a>
                        
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">                
                    <button class="btn btn-danger" @click="signOut">Salir</button>
                </form>
            </div>
            </nav>
        <div>
            
        </div>
    </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
 
    export default {
        created(){
            firebase.auth().onAuthStateChanged( user =>{
                this.loggedIn = !!user;       
                //console.log(user);
            });
        },
        data(){
            return {
                loggedIn: false
            }
        },
        methods: {

            rutear(ruta_ir){
                //console.log("sdfsfsdfsd");
                this.$router.replace({name: ruta_ir});
            },
            async signOut(){
                try {
                    firebase.auth().signOut();
                    //console.log(data);
                    
                }
                catch(err){
                    console.log(err);
                }
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
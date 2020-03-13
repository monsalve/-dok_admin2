<template>
     <div class="container-flex">
        <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Preguntas</h5>
                <!--<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>-->
                <p class="card-text">Configuraciones de preguntas</p>    

              
                <div class="form-group row">                
                    <div class="col-sm-4 col-md-4 col-4">
                        <input type="text" class="form-control "  v-model="buscar" name="buscar"  id="buscar">                              
                    </div>                  
                    <div class="col-sm-4 col-md-4 col-3">
                        <button type="button" class="btn btn-success" @click="show(1,buscar)" >Buscar</button>
                  
                        <button type="button"  class="btn btn-primary " id="btn_nuevo" data-toggle="modal" data-target="#exampleModalLong" @click="limpiar()">Nuevo</button>
                    </div>
                </div>
            </div>    
              <!-- TABLA LISTADO GENERAL -->
            <div  style="max-width: 95%;" class="table-responsive mr-2 ml-2 pl-2 pr-2">
                <table class="table table-bordered" style ="font-size: 12px !important; padding: 1em !important;">
                    <thead class="thead-dark" >
                        <th>#</th><th>Pregunta</th><th>Opcion A</th><th>Opcion B</th><th>Opcion C</th><th>Opcion D</th>
                        <th>Respuesta</th><th>Pista</th><th>-</th>
                    </thead>
                    <tbody>
                        <tr  v-for="(pregunta, i ) in lista_preguntas"  v-bind:key="i">
                            <td v-text="pregunta.numeral"></td>
                            <td v-text="pregunta.pregunta"></td>   
                            <td v-text="pregunta.opcion_a"></td>   
                            <td v-text="pregunta.opcion_b"></td>
                            <td v-text="pregunta.opcion_c"></td>   
                            <td v-text="pregunta.opcion_d"></td>                               
                            <td v-text="pregunta.respuesta"></td>   
                            <td v-text="pregunta.pista"></td>   
                            <td>
                                <div style="min-width: 78px;">
                                    <!--<template v-if="usuario.status">  -->
                                    <template >
                                        <!--<button type="button" @click="abrirModal('usuario','actualizar',usuario)" class="btn btn-warning btn-sm">
                                            
                                        </button> -->
                                        <button type="button" style="margin-right: 4px; !important"  class="btn btn-warning btn-sm " id="btn_actualiza" data-toggle="modal" data-target="#exampleModalLong" @click="update(pregunta.numeral)"><i class="far fa-edit"></i></button>
                                        &nbsp;                                  
                                        <button type="button" class="btn btn-danger btn-sm" @click="inactivate(pregunta.numeral)">
                                            <i class="far fa-trash-alt"></i>
                                        </button>                                
                                    </template>
                                    <template >
                                        <button type="button" title="Activar Usario" class="btn btn-secondary btn-sm" @click="activate(pregunta.numeral)">
                                        <i class="far fa-check"></i>
                                        </button>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     </div>
</template>

<script>

import * as firebase from "firebase/app";
import "firebase/firestore";

    export default {
        data(){
            return{
                pregunta: '',
                opcion_a: '',
                opcion_b: '',
                opcion_c: '',
                opcion_d: '',
                respesta: '',
                pista: '',
                lista_preguntas: [],
                id_edita: '',               
                nivel: '',
                buscar: 'xx',
                pagina: '',
                counter: 0
            }    
        },
        methods : {
            show(buscar){
                var db = firebase.firestore();
                let me = this;
                console.log(buscar);
			   /*db.collection('preguntas_nivel1').onSnapshot(querySnapshot => {
				    //console.log(querySnapshot);
				    querySnapshot.forEach(prueb => {
					    console.log(prueb);					    
                    })
                    //console.log(querySnapshot);
                });*/
                db.collection('preguntas_nivel1').orderBy('numeral').get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {                        
                        me.lista_preguntas.push(doc.data());
                    });
                    //console.log(me.lista_preguntas);
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
            },

            limpiar(){

            },
            incrementCounter: function (index) {
                this.counter = ++this.counter          
                console.log(index);
            },
            update(id_preg){
                console.log(id_preg);
            }, 
            activate(id_preg){
                console.log(id_preg);
            }, 
            inactivate(id_preg){
                console.log(id_preg);
            }
        }
        ,
        mounted() {               
            //const admin = admin.initializeApp();
            this.show();
            //this.listar_usuarios();            
        }
    }
</script>

<style lang="scss" scoped>
.table .thead-dark th td{ 
    padding: 1em !important;
    
    line-height: 12px !important;    
    
}
</style>
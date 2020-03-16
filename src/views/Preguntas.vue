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
                <!--<button type="button" @click="ajustar()">Ajustar</button>-->
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
                <nav>
                    <ul class="pagination">
                        <li class="page-item" v-if="pagination.current_page > 1">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page - 1,buscar)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page,buscar)" v-text="page"></a>
                        </li>
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(parseInt(pagination.current_page) + 1,buscar)">Sig</a>
                        </li>
                    </ul>
                </nav>
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
                size: 10,
                counter: 0,
                contador:0,
                offset : 10,
                pagination : {
                    'total' : 50,
                    'current_page' : 1,                    
                    'last_page' : 50,
                    'from' : 1,
                    'to' : 10,
                }
            }    
        },
       
         computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            //Calcula los elementos de la paginación
            pagesNumber: function() {
                if(!this.pagination.to) {
                    return [];
                }
                
                var from = this.pagination.current_page - this.offset; 
                if(from < 1) {
                    from = 1;
                }

                var to = from + (this.offset * 2); 
                if(to >= this.pagination.last_page){
                    to = this.pagination.last_page;
                }  

                var pagesArray = [];
                while(from <= to) {
                    pagesArray.push(from);
                    from++;
                }
                return pagesArray;             

            }
        },

        methods : {
            show(pagina,buscar){
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
                
                db.collection('preguntas_nivel1').orderBy('numeral').limit( me.offset).startAfter(10).get()
                .then((snapshot) => {                      
                    //console.log(snapshot);
                    snapshot.forEach((doc) => {                        
                        me.lista_preguntas.push(doc.data());
                        
                    });
                    //console.log(me.lista_preguntas);
                })
                .catch((err) => {
                    console.log('Error getting documents', err);
                });
            },
            ajustar(){
                var db = firebase.firestore();
                let me = this;
                db.collection('preguntas_nivel3').orderBy('numeral').limit( 3000).get()
                .then((snapshot) => {   
                    me.contador = 0;
                    console.log(snapshot);
                    snapshot.forEach((doc) => {               
                        if(doc.data().numeral>500){
                         // db.collection('preguntas_nivel3').doc(doc.id).delete()
                        }         
                        /*else{
                            console.log(doc.data().numeral+" estado = "+doc.data().estado)
                        }
                       // me.lista_preguntas.push(doc.data());
                        //console.log(doc.data().numeral);
                      //  me.lista_preguntas.push(doc.data());
                      /*  me.contador ++;
                        db.collection("preguntas_nivel4").doc(doc.id).set({

                            numeral: me.contador,
                            opcion_a: doc.data().opcion_a,
                            opcion_b: doc.data().opcion_b,
                            opcion_c: doc.data().opcion_c,
                            opcion_d: doc.data().opcion_d,
                            pista: doc.data().pista,
                            pregunta: doc.data().pregunta,
                            respuesta: doc.data().respuesta,
                            estado: "1"
                            
                        })
                       //console.log(doc);*/
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
            },
            cambiarPagina(page,buscar){
                let me = this;
                //Actualiza la página actual
                me.pagination.current_page = page;
                //Envia la petición para visualizar la data de esa página
                me.show(page,buscar);
            }
        }
        ,
        mounted() {               
            //const admin = admin.initializeApp();
            this.show(1,this.buscar);
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
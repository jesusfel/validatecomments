import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentFirestoreService } from '../../services/comment-firestore.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-comentario',
  templateUrl: './lista-comentario.component.html',
  styleUrls: ['./lista-comentario.component.css']
})
export class ListaComentarioComponent implements OnInit {

  comments : any[] = [];
  commentSelected:any = {};

  commentDetailForm: FormGroup;
  //Detail
  commentsDetail : any[] = [];

  loading = false;

  constructor(
    private _commentFirestore: CommentFirestoreService,
    public modal: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
   ) { 
    this.commentDetailForm = fb.group({
      user: [''],
      polarity: [''],
      result: [''],
      fechacreacion: [''],
      comment:['']
    })

   }

  ngOnInit(): void {
    if( localStorage.getItem('usuarioLogueado') === null){
      this.router.navigate(['/']);
    }else{
       this.getComments();
    }
  }

  getComments(){
    this.loading = true;
    this._commentFirestore.getComments().subscribe(data =>{
      this.comments = [];

      data.forEach((element:any) => {
       
        this.comments.push({
         
          id : element.payload.doc.id,
          user: element.payload.doc.data().user,
          comment: element.payload.doc.data().comment,
          polarity: element.payload.doc.data().validation.result.polarity,
          type: element.payload.doc.data().validation.result.type,
          fechacreacion : this.datePipe.transform(new Date(element.payload.doc.data().fechacreacion.seconds*1000) ,'dd/MM/YYYY HH:mm:s'),
          sentences: element.payload.doc.data().validation.sentences
        })
        this.loading = false;
      });
    });
  }

  openDetail(contenido:any, element:any){
    this.commentSelected = element;

    this.commentDetailForm.setValue({
      user: this.commentSelected.user,
      polarity: this.commentSelected.polarity,
      result: this.commentSelected.type,
      fechacreacion:  this.commentSelected.fechacreacion,
      comment: this.commentSelected.comment
    });
    this.commentsDetail = [];
    for(let i=0;i < this.commentSelected.sentences.length;i++){
      console.table(this.commentsDetail[i])
      this.commentsDetail.push({
        sentence : this.commentSelected.sentences[i].sentence,
        polarity : this.commentSelected.sentences[i].sentiment.polarity,
        type: this.commentSelected.sentences[i].sentiment.type
      });
    }
    

    console.table(this.commentsDetail)

    //console.table(this.commentSelected.sentences);
    this.modal.open(contenido, {size:'xl'});
  }
}

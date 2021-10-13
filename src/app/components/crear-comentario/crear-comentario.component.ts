import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentimService } from '../../services/sentim.service';
import { CommentFirestoreService } from '../../services/comment-firestore.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {

  createComment: FormGroup;
  files: any[] = [];
  usuario : string | null;

  loading = false;
  constructor(private _sentimService: SentimService,
    private _commentFirestore: CommentFirestoreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {
    this.usuario = localStorage.getItem('usuarioLogueado') ;
    this.createComment = this.fb.group({
      comment: ['', Validators.required],
      validation: ['']
    });

  }

  ngOnInit(): void {
    if( localStorage.getItem('usuarioLogueado') === null){
      this.router.navigate(['/']);
    }
  }

  validateComment() {
    if (this.createComment.invalid) {
      return;
    }
    this.loading = true;
    const comment = this.createComment.value.comment;
    this._sentimService.validateComment(comment).subscribe((res: any) => {
      this.createComment.setValue({
        comment: comment,
        validation: res
      });
      this.addComment();
    });
  }

  addComment() {

    const comment: any = {
      user: this.usuario,
      comment: this.createComment.value.comment,
      validation: this.createComment.value.validation,
      fechacreacion : new Date()
    }

    this._commentFirestore.addComment(comment).then(() => {
      this.loading = false;
      this.toastr.success('Comentario agregado exitosamente', 'Comentario agregado', { positionClass: 'toast-bottom-right' });

    }).catch(error => {
      console.log(error)
      this.loading = false;
      this.toastr.error('Comentario no pudo ser agregado', 'Comentario no agregado', { positionClass: 'toast-bottom-right' });
    });

  }


  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(target: any) {
    this.prepareFilesList(target.files);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    console.log(files);
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);

      let fileReader = new FileReader();
      fileReader.onload = (e) => {

        console.log(fileReader.result);
        this.createComment.setValue({
          comment: fileReader.result,
          validation: ''
        });
        this.validateComment();
      }
      fileReader.readAsText(item);
    }
  }

}

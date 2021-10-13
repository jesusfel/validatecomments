import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentFirestoreService {

  constructor(private firestore : AngularFirestore) { }

  addComment(comment:any):Promise<any>{
    return this.firestore.collection('comments').add(comment);
  }

  getComments(): Observable<any>{
    let time = new Date();
    console.log(time);
    time.setHours(time.getHours()-12);
    console.log(time);
    return this.firestore.collection('comments', ref => ref.where('fechacreacion', '>', time).orderBy('fechacreacion', 'desc')).snapshotChanges();
  }
}

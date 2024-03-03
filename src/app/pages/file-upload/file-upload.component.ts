import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FileDndDirective } from '../../shared/directives/file-dnd.directive';

@Component({
  selector: 'file-upload',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    FileDndDirective
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Output() filesEvent = new EventEmitter<File[]>();

  files: File[] = [];

  #snackBar = inject(MatSnackBar);

  onFileChange(pFileList: File[]){
    this.files.unshift(...pFileList);
    this.filesEvent.emit(this.files);

    this.#snackBar.open('Successfully added!', 'Close', {
      duration: 2000,
    });
  }

  deleteFile(f: any){
    this.files = this.files.filter(function(w){ return w.name != f.name });
    this.filesEvent.emit(this.files);

    this.#snackBar.open('Successfully delete!', 'Close', {
      duration: 2000,
    });
  }
}

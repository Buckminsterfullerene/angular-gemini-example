import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appFileDnd]',
  standalone: true
})
export class FileDndDirective {
  @Output() private filesChangeEmitter : EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#ddd';
  @HostBinding('style.border-style') private background_border_style = 'dashed';
  @HostBinding('style.border-width') private background_border_width = '0.5px';
  @HostBinding('style.border-radius') private background_border_radius = '10px';

  constructor() { }

  @HostListener('dragover', ['$event']) public onDragOver(e: any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(e: any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#ddd'
  }

  @HostListener('drop', ['$event']) public onDrop(e: any){
    e.preventDefault();
    e.stopPropagation();
    this.background = '#ddd';

    let files = e.dataTransfer.files;
    this.filesChangeEmitter.emit(Array.from(files));
  }
}

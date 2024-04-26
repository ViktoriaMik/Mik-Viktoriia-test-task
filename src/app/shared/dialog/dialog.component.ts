import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  closeDialogWindow() {
    this.isOpen = false;
    this.closeDialog.emit(this.isOpen);
  }
}

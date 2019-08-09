import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent {
  @Input() public success: boolean = false;
  @Input() public formGroup: FormGroup;
  @Input() public errorMessage: string;
  @Input() public buttonText: string = 'Create';
  @Output() public submitEvent = new EventEmitter<void>();

  public submit(form): void {
    this.submitEvent.emit(form);
  }
}

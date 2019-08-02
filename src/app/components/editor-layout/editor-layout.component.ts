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
  @Output() public submitEvent = new EventEmitter<void>();

  public submit(): void {
    this.submitEvent.emit();
  }
}

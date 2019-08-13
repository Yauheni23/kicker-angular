import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DEFAULT_BUTTON_TEXT_EDITOR} from '../../../constants';

@Component({
    selector: 'app-editor-layout',
    templateUrl: './editor-layout.component.html',
    styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent {
    @Input() public success: boolean = false;
    @Input() public formGroup: FormGroup;
    @Input() public errorMessage: string;
    @Input() public buttonText: string = DEFAULT_BUTTON_TEXT_EDITOR;
    @Output() public submitEvent: EventEmitter<HTMLFormElement> = new EventEmitter<HTMLFormElement>();

    submit(form: HTMLFormElement): void {
        this.submitEvent.emit(form);
    }
}

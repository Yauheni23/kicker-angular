import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DEFAULT_BUTTON_TEXT_EDITOR} from '../../../constants';

@Component({
    selector: 'app-editor-layout',
    templateUrl: './editor-layout.component.html',
    styleUrls: ['./editor-layout.component.css']
})
export class EditorLayoutComponent {
    @Input() success: boolean = false;
    @Input() formGroup: FormGroup;
    @Input() errorMessage: string;
    @Input() buttonText: string = DEFAULT_BUTTON_TEXT_EDITOR;
    @Output() submitEvent: EventEmitter<HTMLFormElement> = new EventEmitter<HTMLFormElement>();

    submit(form: HTMLFormElement): void {
        this.submitEvent.emit(form);
    }
}

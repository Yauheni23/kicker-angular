import {FormGroup} from '@angular/forms';
import {EditorService} from '../../services/editor';
import {Message, SNACK_BAR_DURATION} from '../../constants';
import {MatSnackBar} from '@angular/material/snack-bar';

export class Editor<T> {
    formHTMLElement: HTMLFormElement;
    formGroup: FormGroup;
    errorMessage: string = '';

    constructor(private editorService: EditorService<T>, private snackBar: MatSnackBar) {
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSubmit(form: HTMLFormElement): void {
        this.formHTMLElement = form;
        this.editorService.create(this.formGroup.value)
            .subscribe(this.onSuccess, this.onFailed);
    }

    onSuccess(data: T): void {
        this.showSnackBar(Message.success);
        this.formHTMLElement.reset();
        this.errorMessage = '';
    }

    onFailed(error): void {
        this.showSnackBar(Message.failed);
        this.errorMessage = error.error.message;
    }

    clear(): void {
        this.errorMessage = '';
    }

    private showSnackBar(message: string): void {
        this.snackBar.open(message, Message.close, {
            duration: SNACK_BAR_DURATION
        });
    }
}

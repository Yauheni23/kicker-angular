import {FormGroup} from '@angular/forms';
import {EditorService} from '../../services/editor';

export class Editor<T> {
    formHTMLElement: HTMLFormElement;
    formGroup: FormGroup;
    success: boolean = false;
    errorMessage: string = '';

    constructor(private editorService: EditorService<T>) {
        this.onSuccess = this.onSuccess.bind(this);
        this.onFailed = this.onFailed.bind(this);
    }

    onSubmit(form: HTMLFormElement): void {
        this.formHTMLElement = form;
        this.editorService.create(this.formGroup.value)
            .subscribe(this.onSuccess, this.onFailed);
    }

    onSuccess(data: T): void {
        this.formHTMLElement.reset();
        this.success = true;
        this.errorMessage = '';
    }

    onFailed(error): void {
        this.success = false;
        this.errorMessage = error.message;
    }

    clear(): void {
        this.success = false;
        this.errorMessage = '';
    }
}

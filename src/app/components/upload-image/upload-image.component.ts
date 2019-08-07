import {Component, Input} from '@angular/core';
import {serverAddress} from '../../constants';
import {ImageService} from '../../services/image.service';
import {FormControl} from '@angular/forms';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: ['./upload-image.component.css'],
    providers: [ImageService]
})
export class UploadImageComponent {
    @Input() image: FormControl;
    selectedFile: ImageSnippet;

    constructor(private imageService: ImageService) {
    }

    processFile(imageInput: any) {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);

            this.imageService.uploadImage(this.selectedFile.file).subscribe(
                (result) => {
                    this.image.setValue(serverAddress + result.link);
                });
        });

        reader.readAsDataURL(file);
    }

    setColor(element) {
        element.style.color = 'blue';
        element.style.borderColor = 'blue';
    }

    deleteColor(element) {
        element.style.color = '';
        element.style.borderColor = '';
    }
}

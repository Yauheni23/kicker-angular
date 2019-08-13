import {Component, Input} from '@angular/core';
import {MainColor, UrlAddress} from '../../constants';
import {ImageService} from '../../services/image.service';
import {FormControl} from '@angular/forms';
import {ImageSnippet} from '../../utils/image-snippet';

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

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);

            this.imageService.uploadImage(this.selectedFile.file).subscribe(
                (result) => {
                    this.image.setValue(UrlAddress.image + result.link);
                });
        });

        reader.readAsDataURL(file);
    }

    setColor(element) {
        element.style.color = MainColor;
        element.style.borderColor = MainColor;
    }

    deleteColor(element) {
        element.style.color = '';
        element.style.borderColor = '';
    }
}

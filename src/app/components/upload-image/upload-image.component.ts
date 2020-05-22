import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { FormControl } from '@angular/forms';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
    selector: 'app-upload-image',
    templateUrl: './upload-image.component.html',
    styleUrls: [ './upload-image.component.css' ],
    providers: [ ImageService ]
})
export class UploadImageComponent {
    @Input() image: FormControl;
    @Input() disabled = false;

    processFile(imageInput: any) {
        if (this.disabled) {
            return;
        }

        const file: File = imageInput.files[0];
        const contentType = file.type;
        const bucket = new S3(
            {
                accessKeyId: 'AKIAI5E3RYOA3CCSNWSA',
                secretAccessKey: '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',
                region: 'eu-central-1'
            }
        );
        const params = {
            Bucket: 'myimagesforcoursework',
            Key: 'image/' + new Date().getTime(),
            Body: file,
            ACL: 'public-read',
            ContentType: contentType
        };

        bucket.upload(params, (err, data) => {
            if (err) {
                return false;
            }
            this.image.setValue(data.Location);

            return true;
        });
    }
}

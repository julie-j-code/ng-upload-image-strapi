import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable, Observer, Subscription } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { ImageService } from './services/image.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  imageFile: File;
  fileUploadSub: Subscription;
  blobSub: Subscription;
  pleaseWait = false;
  message: string;
  pictureProcessed = false;
  isPreviewVisible = true;
  togglePreviewMessage = 'prévisualisation activée';

  constructor(private imageService: ImageService) { }

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public handleImage(webcamImage: WebcamImage): void {
    this.pictureProcessed = false;
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.blobSub = this.dataURItoBlob(webcamImage.imageAsBase64).subscribe(
      (blob) => {
        const imageBlob: Blob = blob;
        const imageName: string = `${new Date().toISOString()}.jpeg`;
        this.imageFile = new File([imageBlob], imageName, {
          type: 'image/jpeg',
        });
        console.log('imageFile', this.imageFile);
      },
      (err) => console.error(err),
      () => console.log('completed')
    );
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  // Method to convert Base64Data Url as Image Blob
  // https://medium.com/better-programming/convert-a-base64-url-to-image-file-in-angular-4-5796a19fdc21
  dataURItoBlob(dataURI: string): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

  upload() {
    this.pleaseWait = true;
    const formData: FormData = new FormData();
    //!\ Strapi expect files (plural!)
    formData.append('files', this.imageFile, this.imageFile.name);
    this.fileUploadSub = this.imageService.uploadImage(formData).subscribe(
      (imageData: any[]) => {
        console.log('imageData', imageData);
        this.pleaseWait = false;
        this.message = 'image sauvegardée';
        this.pictureProcessed = true;
        this.showMessage({ duration: 2000, message: 'image sauvegardée' })
      },
      (err) => {
        console.error('AppComponent | upload() | err', err);
        this.pleaseWait = false;
      }
    );
  }

  showMessage(options) {
    setTimeout(() => {
      this.message = '';
    }, options.duration);
  }

  togglePreviewVisibility() {
    this.isPreviewVisible = !this.isPreviewVisible;
    this.togglePreviewMessage = this.isPreviewVisible ? 'prévisualisation activée' : 'prévisualisation désactivée'
  }



  ngOnDestroy() {
    this.blobSub.unsubscribe();
    this.fileUploadSub.unsubscribe();
  }
}



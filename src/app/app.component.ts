import { Component } from '@angular/core';

import { WebcamImage, WebcamInitError,WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, Observer  } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-generate-picture';
  public videoOptions: MediaTrackConstraints = {
    width:1024,
    height:576
  };

  // qui au départ sera un tableau vide
  public errors: WebcamInitError[] = [];

  // latest snapshot dans l'hypothèse où plusieures captures sont prises
  // qui sera ultérieurement conservée sur le serveur
  public webcamImage: WebcamImage = null;

  generatedImage: string;

  // webcam snapshot trigger pour déclencher la prise de photo
  // on utilise Subject qui dans le monde de rxjs est un observable et un observeur
  private trigger: Subject<void> = new Subject<void>();

  // lorsqu'on voudra déclencher une prise de photo
  // on appellera une méthode qu'on décide d'appeler :

  public triggerSnapshot(): void{
    this.trigger.next();
  }

  public handleInitError(error:WebcamInitError):void{
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void{
    console.log('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    this.dataURItoBlob(webcamImage.imageAsBase64).subscribe(
      (blob) => {
        const imageBlob: Blob = blob;
        const imageName: string = new Date().toISOString();
        const imageFile: File = new File([imageBlob], imageName, {
          type: 'image/jpeg',
        });
        console.log('imageFile', imageFile);

        this.generatedImage = window.URL.createObjectURL(imageFile);
        console.log('generatedImage', this.generatedImage);
        window.open(this.generatedImage);
      },
      (err) => console.error(err),
      () => console.log('completed')
    );

  }

  public get triggerObservable(): Observable<void>{
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

}

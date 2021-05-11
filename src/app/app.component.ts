import { Component } from '@angular/core';

import { WebcamImage, WebcamInitError,WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

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
  }

  public get triggerObservable(): Observable<void>{
    return this.trigger.asObservable();
  }

}

import { HttpClient } from '@angular/common/http';
import { FilePath } from '@ionic-native/file-path/';
import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the WaifuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-waifu',
  templateUrl: 'waifu.html',
})

export class WaifuPage {
myphoto:any
public waifu;
currentImage: any;
loading: any;
base64Image:string;
photo:string;
public nome:any = [];
data:any = {};


  constructor(
     public navCtrl: NavController,
     private camera: Camera,
     private transfer: FileTransfer, 
     private file: File, 
     private loadingCtrl:LoadingController,
     private filePath : FilePath,
     private platform: Platform,
     private actionSheet: ActionSheetController,
     public http : HttpClient
     ) {
}

takePhoto2(){
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.myphoto = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    // Handle error
  });
}

getImage() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.myphoto = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
    // Handle error
  });
}

cropImage() {
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false,
    allowEdit:true,
    targetWidth:300,
    targetHeight:300
  }

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    this.myphoto = 'data:image/jpeg;base64,' + imageData;
    console.log("Imagedata: " + imageData);
  }, (err) => {
    // Handle error
  });
}

uploadImage(){
  //Show loading
  let loader = this.loadingCtrl.create({
    content: "Uploading..."
  });
  loader.present();

  //create file transfer object
  const fileTransfer: FileTransferObject = this.transfer.create();

  //option transfer
  let options: FileUploadOptions = {
    fileKey: 'photo',
    fileName: this.nome.name,
    chunkedMode: false,
    httpMethod: 'post',
    mimeType: "image/jpeg",
    headers: {}
  }


  //file transfer action
  fileTransfer.upload(this.myphoto, 'http://191.239.245.234/waifu/upload.php', options)
    .then((data) => {
      alert("Success");
      console.log(data)
      loader.dismiss();
      this.submit();
    }, (err) => {
      console.log(err);
      alert("Error");
      loader.dismiss();
    });
}

choosePhoto(){
  let actionSheet = this.actionSheet.create({
    title: 'Selecione uma imagem',
    buttons: [
      {
        text: 'Tirar Foto',
        handler: () =>{
          this.takePhoto(this.camera.PictureSourceType.CAMERA, this.camera.MediaType.PICTURE);
        }
      },
      {
        text: 'Escolher Foto',
        handler: () =>{
          this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY, this.camera.MediaType.PICTURE);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();
}

private takePhoto(source: number =1, mediaType: number = 0){

  const options: CameraOptions = {
    quality: 100,
    mediaType: mediaType,
    sourceType: source,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG
  };
  this.camera.getPicture(options).then((imageData) =>{
    if (source == 0 && this.platform.is('android')) {
      this.getImage();
      console.log(imageData);
      this.filePath.resolveNativePath(imageData)
        .then((filePath) => {
          this.photo = filePath;
          console.log("Path: " + this.photo)
          this.file.resolveLocalFilesystemUrl(filePath).then((files)=>{
            this.nome = files;
            console.log("Aqui: " + this.nome.name)
          })
        })
  
    } else {
      this.photo = imageData;
    }

  })
  .catch((err) =>{
    alert(err);
  })
}

submit() {
  var link = 'http://garrysmod.com.br/php/waifu.php';
  var myData = JSON.stringify({username: 'http://191.239.245.234/waifu/images/' + this.nome.name});
  let loader = this.loadingCtrl.create({
    content: "Processando..."
  });
  loader.present();
  this.http.post(link, myData)
  .subscribe(data => {
    this.waifu = data;
    this.waifu = this.waifu.output_url;
    loader.dismiss();
  this.data.response = data["_body"];
  }, error => {
  console.log("Oooops!");
  loader.dismiss();
  });
  }

  ionViewDidLoad() {

  }

}

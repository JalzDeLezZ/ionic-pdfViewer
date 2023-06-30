import { Injectable } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private file: File, private http: HttpClient) {}

  downloadFile(pdfSrc: any, fileName: String) {
    console.log('downloadFile');

    let dirPath = this.file.externalRootDirectory + '/Download/';
    let file = fileName + '.pdf';

    this.file
      .writeFile(dirPath, file, pdfSrc, { replace: true })
      .then((res) => {
        console.log('File written');
        console.log(res);
      })
      .catch((err) => {
        console.log('File doesnt written');
        console.log(err);
      });
  }

  getFile(fileUrl: any): Observable<any> {
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  createPDFfile(text: String) {
    this.file
      .checkFile(this.file.dataDirectory, 'test.pdf')
      .then((res) => {
        console.log('Directory exists');
        return this.writeFile(text);
      })
      .catch((err) => {
        console.log('Directory doesnt exist');
        return this.file
          .createFile(this.file.dataDirectory, 'test.pdf', false)
          .then((res) => {
            console.log('File created');
            return this.writeFile(text);
          })
          .catch((err) => {
            console.log('File doesnt created');
            console.log(err);
          });
      });
  }

  writeFile(text: any) {
    console.log('writeFile');
    this.file
      .writeFile(this.file.dataDirectory, 'test.pdf', text, { replace: true })
      .then((res) => {
        console.log('File written');
        console.log(res);
      })
      .catch((err) => {
        console.log('File doesnt written');
        console.log(err);
      });
  }
}

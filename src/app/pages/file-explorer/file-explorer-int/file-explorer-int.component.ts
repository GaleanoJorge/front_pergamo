import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-file-explorer-int',
  templateUrl: 'file-explorer-int.component.html',
  styleUrls: ['file-explorer-int.component.scss'],
})

export class FileExplorerIntComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  public hostUrl: string = 'http://34.71.7.149:8090/';
  public ajaxSettings: object = {
    url: this.hostUrl,
    getImageUrl: this.hostUrl + 'GetImage',
    uploadUrl: this.hostUrl + 'Upload',
    downloadUrl: this.hostUrl + 'Download'
  };

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {enableProdMode} from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './twitter.component.html',
    styleUrls: ['./twitter.component.scss']
})
export class TwitterComponent implements OnInit {
    public token: string;
    public message:string;
    constructor(public router: Router,private http:Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    ngOnInit() {
        console.log("twitter init is running ");
    }

   

}

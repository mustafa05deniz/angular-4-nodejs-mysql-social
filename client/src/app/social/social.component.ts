import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Http,HttpModule,Headers, Response,RequestOptions} from '@angular/http';
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private http:Http,public router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let data = params['token'];
      let data2 =data.split('data');
      console.log(data2);
      localStorage.setItem('currentUser', JSON.stringify({token: data2[1] }));
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigate(['/layout/profile']);
    });
  }



}

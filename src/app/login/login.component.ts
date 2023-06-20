import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  constructor(private fb:FormBuilder, private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginform =this.fb.group({
      'email': new FormControl(),
      'password': new FormControl()

    })
  }
 login(){
  this.http.get<any>("http://localhost:3000/signupusers")
  .subscribe(res=>{
    const user = res.find((a:any)=>{
      return a.email === this.loginform.value.email && a.password === this.loginform.value.password   
      });
    if(user){
      alert('login success');
      this.loginform.reset();
     if(user.email==='admin@sd' && user.password === 'admin_12'){
      this.router.navigate(['dashboard']);

     }else{
      this.router.navigate(['user']);

     }

    }
    else{
      alert('user not found');
    }
  },err=>{
   alert("Something went wrong");
  })
 }
}
